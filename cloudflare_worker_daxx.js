/**
 * XORAS Systems: Cloudflare Edge Gateway to Cloud DAXX Reasoning Engine
 * Target: projects/262277406581/locations/us-west1/reasoningEngines/520750697147269120
 */

const REASONING_ENGINE_URL = "https://us-west1-aiplatform.googleapis.com/v1/projects/262277406581/locations/us-west1/reasoningEngines/520750697147269120:query";

export default {
  async fetch(request, env) {
    // 1. Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    try {
      const body = await request.json();
      const userPrompt = body.problem || body.query || body.input || "";

      if (!userPrompt.trim()) {
        return new Response(JSON.stringify({ error: "Empty query provided" }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }

      // Query Cloud DAXX Master Brain
      const apiKey = env.VERTEX_API_KEY || env.GEMINI_API_KEY;
      const daxxUrl = apiKey ? `${REASONING_ENGINE_URL}?key=${apiKey}` : REASONING_ENGINE_URL;

      const daxxPayload = {
        input: {
          input: userPrompt,
          task: "DIAGNOSTIC_ADVISOR",
          format: "VIDEO_RECEIPT"
        }
      };

      const daxxResp = await fetch(daxxUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(daxxPayload)
      });

      const daxxData = await daxxResp.json();

      // Return clean response back to frontend
      return new Response(JSON.stringify(daxxData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-store",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
  },
};
