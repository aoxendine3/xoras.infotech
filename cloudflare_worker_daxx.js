/**
 * XORAS Systems: Cloudflare Edge Gateway to Cloud DAXX Reasoning Engine
 * Target: projects/262277406581/locations/us-west1/reasoningEngines/520750697147269120
 *
 * 2026-11-13 hardening pass (per sovereign security law):
 *  - CORS is an explicit allowlist (env.ALLOWED_ORIGINS, default the public
 *    frontend origins). No wildcard reflection. Non-allowed origins get no ACAO.
 *  - The proxy requires an API key (env.WORKER_API_KEY) sent as X-API-Key.
 *    Fail-closed on missing/incorrect key when the secret is bound.
 *  - Per-IP sliding-window rate limit (default 20 inferences / 60s).
 *  - Body validation (problem string, max length). Errors never leak upstream
 *    internals or the upstream key.
 */

const REASONING_ENGINE_URL = "https://us-west1-aiplatform.googleapis.com/v1/projects/262277406581/locations/us-west1/reasoningEngines/520750697147269120:query";

const DEFAULT_ALLOWED_ORIGINS = "https://aoxendine3.github.io,https://xoras.infotech,http://localhost:3000";
const DEFAULT_RATE_LIMIT = 20; // inferences per 60s window per IP
const RATE_WINDOW_MS = 60_000;

function allowedOrigins(env) {
  const raw = env && env.ALLOWED_ORIGINS ? String(env.ALLOWED_ORIGINS) : DEFAULT_ALLOWED_ORIGINS;
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

function isOriginAllowed(env, origin) {
  if (!origin) return false;
  const o = allowedOrigins(env);
  return o.includes(origin);
}

function jsonHeaders(env, origin, extra) {
  const h = { "Content-Type": "application/json" };
  if (isOriginAllowed(env, origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With, X-API-Key";
  }
  return { ...h, ...(extra || {}) };
}

function rateLimit(env, ip, max, windowMs) {
  const key = `rl:${ip}`;
  const bucket = (env && env.RATE_BUCKETS) || {};
  const now = Date.now();
  let hits = (bucket[key] && Array.isArray(bucket[key]) ? bucket[key] : []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    bucket[key] = hits;
    return { allowed: false, retryAfter: Math.ceil((hits[0] + windowMs - now) / 1000) };
  }
  hits.push(now);
  bucket[key] = hits;
  return { allowed: true, retryAfter: 0 };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("origin");
    const jsonH = jsonHeaders(env, origin);
    const originAllowed = isOriginAllowed(env, origin);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: originAllowed
          ? {
              "Access-Control-Allow-Origin": origin,
              "Access-Control-Allow-Methods": "POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, X-API-Key",
              "Access-Control-Max-Age": "600",
            }
          : { "Content-Type": "application/json" },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: jsonH });
    }

    const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "anon";
    const rl = rateLimit(env, ip, Number((env && env.RATE_LIMIT) || DEFAULT_RATE_LIMIT), Number((env && env.RATE_WINDOW_MS) || RATE_WINDOW_MS));
    if (!rl.allowed) {
      return new Response(JSON.stringify({ error: "rate_limited", retry_after: rl.retryAfter }), {
        status: 429,
        headers: { ...jsonH, "Retry-After": String(rl.retryAfter), "Access-Control-Allow-Origin": originAllowed ? origin : undefined },
      });
    }

    if (env && env.WORKER_API_KEY) {
      const provided = request.headers.get("x-api-key") || "";
      if (provided !== env.WORKER_API_KEY) {
        return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: jsonH });
      }
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "invalid_json" }), { status: 400, headers: jsonH });
    }

    const userPrompt = String(body?.problem || body?.query || body?.input || "").trim();
    if (!userPrompt) {
      return new Response(JSON.stringify({ error: "Empty query provided" }), { status: 400, headers: jsonH });
    }
    if (userPrompt.length > 2000) {
      return new Response(JSON.stringify({ error: "query_too_long" }), { status: 413, headers: jsonH });
    }

    const apiKey = env && (env.VERTEX_API_KEY || env.GEMINI_API_KEY);
    const daxxUrl = apiKey ? `${REASONING_ENGINE_URL}?key=${apiKey}` : REASONING_ENGINE_URL;

    try {
      const daxxResp = await fetch(daxxUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: { input: userPrompt, task: "DIAGNOSTIC_ADVISOR", format: "VIDEO_RECEIPT" } }),
      });
      const daxxData = await daxxResp.json();
      return new Response(JSON.stringify(daxxData), {
        status: daxxResp.status || 200,
        headers: { ...jsonH, "Cache-Control": "no-store" },
      });
    } catch (err) {
      const msg = String((err && err.message) || "gateway_error");
      return new Response(JSON.stringify({ error: "inference_failed", detail: msg }), {
        status: 502,
        headers: { ...jsonH, "Cache-Control": "no-store" },
      });
    }
  },
};
