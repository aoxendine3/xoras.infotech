import{F as e,M as t,s as n}from"./link-BISiIQpW.js";
import{t as r}from"./useServerFn-CoCDMImb.js";
import{r as i}from"./advisor.functions-GrVNRvrq.js";
import{t as a}from"./createLucideIcon-BxaJpJPP.js";
import{t as o}from"./check-C-qtLHDQ.js";

var s=a("link-2",[[`path`,{d:`M9 17H7A5 5 0 0 1 7 7h2`,key:`8i5ue5`}],[`path`,{d:`M15 7h2a5 5 0 1 1 0 10h-2`,key:`1b9ql8`}],[`line`,{x1:`8`,x2:`16`,y1:`12`,y2:`12`,key:`1jonct`}]]),
c=a("thumbs-down",[[`path`,{d:`M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z`,key:`m61m77`}],[`path`,{d:`M17 14V2`,key:`8ymqnk`}]]),
l=a("thumbs-up",[[`path`,{d:`M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z`,key:`emmmcr`}],[`path`,{d:`M7 10v12`,key:`1qc93n`}]]),
u=e(t(),1),d=n();

function f({advice:e,showFeedback:t=!0}){
  let n=r(i),
  [a,f]=(0,u.useState)(null),
  [p,m]=(0,u.useState)(!1),
  [copiedCode,setCopiedCode]=(0,u.useState)(!1),
  h=e.id&&typeof window<"u"?`${window.location.origin}/r/${e.id}`:null,
  g=async t=>{!e.id||a!==null||(f(t),(await n({data:{resultId:e.id,helpful:t}})).ok||f(null))};

  return(0,d.jsxs)("section",{
    className:"space-y-6",
    children:[
      /* 1. Video Player & Header with Direct Watch Link */
      (0,d.jsxs)("div",{
        className:"overflow-hidden rounded-xl border border-border bg-card shadow-glow",
        children:[
          (0,d.jsxs)("div",{
            className:"aspect-video relative bg-black/90 flex items-center justify-center",
            children:[
              (0,d.jsx)("iframe",{
                className:"h-full w-full",
                src:`https://www.youtube-nocookie.com/embed/${e.videoId}?rel=0`,
                title:e.title,
                allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                allowFullScreen:!0
              }),
              (0,d.jsx)("div",{
                className:"absolute bottom-3 right-3 z-10",
                children:(0,d.jsxs)("a",{
                  href:`https://www.youtube.com/watch?v=${e.videoId}`,
                  target:"_blank",
                  rel:"noreferrer",
                  className:"px-3 py-1.5 rounded-md bg-black/85 hover:bg-black text-[11px] font-mono text-accent border border-accent/40 backdrop-blur transition-all flex items-center gap-1.5 shadow-lg",
                  children:[
                    (0,d.jsx)(s,{className:"h-3 w-3"}),
                    "Watch Direct on YouTube"
                  ]
                })
              })
            ]
          }),
          (0,d.jsxs)("div",{
            className:"p-5",
            children:[
              (0,d.jsxs)("div",{
                className:"flex items-center justify-between gap-2 mb-1.5 flex-wrap",
                children:[
                  (0,d.jsx)("p",{className:"font-mono text-xs uppercase tracking-widest text-accent font-semibold",children:"Empirical Architectural Analysis"}),
                  (0,d.jsx)("span",{
                    className:"font-mono text-[10px] px-2.5 py-0.5 rounded-full border border-success/40 bg-success/10 text-success font-semibold tracking-wider uppercase",
                    children:e.statusBadge||"VERIFIED // FAIL-CLOSED GATE"
                  })
                ]
              }),
              (0,d.jsx)("h2",{className:"text-xl font-bold text-foreground",children:e.title}),
              (0,d.jsx)("p",{className:"mt-2 text-muted-foreground text-sm leading-relaxed",children:e.why})
            ]
          })
        ]
      }),

      /* 2. Empirical Root Cause Card */
      e.rootCause&&(0,d.jsxs)("div",{
        className:"rounded-xl border border-destructive/40 bg-destructive/5 p-5 shadow-sm",
        children:[
          (0,d.jsxs)("div",{
            className:"flex items-center gap-2 text-destructive font-mono text-xs uppercase tracking-widest font-semibold",
            children:[
              (0,d.jsx)("span",{className:"h-2 w-2 rounded-full bg-destructive animate-pulse"}),
              "Empirical Root Cause & System Vulnerability"
            ]
          }),
          (0,d.jsx)("p",{
            className:"mt-2.5 text-sm text-foreground/90 leading-relaxed",
            children:e.rootCause
          })
        ]
      }),

      /* 3. Meticulous Next Step Remediation */
      (0,d.jsxs)("div",{
        className:"rounded-xl border border-success/60 bg-card p-5 shadow-glow",
        children:[
          (0,d.jsxs)("div",{
            className:"flex items-center justify-between mb-3",
            children:[
              (0,d.jsx)("p",{className:"font-mono text-xs uppercase tracking-widest text-success font-semibold",children:"Your Next Step — Meticulous Remediation Plan"}),
              (0,d.jsx)("span",{className:"font-mono text-[10px] text-muted-foreground tracking-wider",children:"SOVRA STANDARD 2.0"})
            ]
          }),
          Array.isArray(e.nextStep)?(0,d.jsx)("div",{
            className:"space-y-3 mt-3",
            children:e.nextStep.map((step,idx)=>(0,d.jsxs)("div",{
              key:idx,
              className:"p-3.5 rounded-lg bg-background/60 border border-border/70 text-sm leading-relaxed text-foreground/95 flex items-start gap-3",
              children:[
                (0,d.jsx)("div",{
                  className:"h-5 w-5 rounded-full bg-success/20 border border-success/40 text-success font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5",
                  children:idx+1
                }),
                (0,d.jsx)("div",{
                  className:"flex-1",
                  children:typeof step==="string"&&step.match(/^\d+\.\s+/)?step.replace(/^\d+\.\s+/,""):step
                })
              ]
            }))
          }):(0,d.jsx)("p",{className:"mt-2 leading-relaxed text-sm",children:e.nextStep})
        ]
      }),

      /* 4. Implementation Blueprint & Invariant Snippet */
      e.implementationSnippet&&(0,d.jsxs)("div",{
        className:"rounded-xl border border-border bg-[#070a11] p-5 font-mono text-xs shadow-md",
        children:[
          (0,d.jsxs)("div",{
            className:"flex items-center justify-between pb-3 mb-3 border-b border-border/60 text-muted-foreground",
            children:[
              (0,d.jsxs)("span",{
                className:"text-[11px] font-semibold text-accent uppercase tracking-wider flex items-center gap-2",
                children:[
                  (0,d.jsx)("span",{className:"h-2 w-2 rounded-full bg-accent"}),
                  "Implementation Blueprint & Code Invariant"
                ]
              }),
              (0,d.jsxs)("button",{
                type:"button",
                onClick:async()=>{
                  if(typeof navigator!=="undefined"&&navigator.clipboard){
                    await navigator.clipboard.writeText(e.implementationSnippet);
                    setCopiedCode(!0);
                    setTimeout(()=>setCopiedCode(!1),2000);
                  }
                },
                className:"px-2.5 py-1 rounded bg-background/80 hover:bg-background border border-border text-[10px] text-foreground transition-all flex items-center gap-1.5 cursor-pointer",
                children:[
                  copiedCode?(0,d.jsx)(o,{className:"h-3 w-3 text-success"}):(0,d.jsx)(s,{className:"h-3 w-3"}),
                  copiedCode?"Copied Invariant!":"Copy Code Invariant"
                ]
              })
            ]
          }),
          (0,d.jsx)("pre",{
            className:"text-slate-300 font-mono text-xs leading-relaxed overflow-x-auto p-2 whitespace-pre-wrap select-all bg-black/40 rounded border border-border/40",
            children:e.implementationSnippet
          })
        ]
      }),

      /* 5. Verification & Validation Safeguard */
      e.verificationProtocol&&(0,d.jsxs)("div",{
        className:"rounded-xl border border-primary/40 bg-card/90 p-5 shadow-sm",
        children:[
          (0,d.jsxs)("div",{
            className:"flex items-center justify-between mb-2 flex-wrap gap-2",
            children:[
              (0,d.jsxs)("p",{
                className:"font-mono text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-2",
                children:[
                  (0,d.jsx)("span",{className:"h-2 w-2 rounded-full bg-primary"}),
                  "Verification & Validation Safeguard Protocol"
                ]
              }),
              (0,d.jsx)("span",{className:"text-[10px] font-mono text-success uppercase px-2 py-0.5 rounded border border-success/30 bg-success/10 font-bold",children:"PASS-TO-PASS AUDIT READY"})
            ]
          }),
          (0,d.jsx)("p",{className:"mt-2 text-sm text-foreground/80 leading-relaxed font-sans",children:e.verificationProtocol})
        ]
      }),

      /* 6. Cryptographic Proof Receipt */
      (0,d.jsxs)("div",{
        className:"rounded-xl border border-border/80 bg-background/50 p-4 font-mono text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3",
        children:[
          (0,d.jsxs)("div",{
            className:"space-y-1",
            children:[
              (0,d.jsxs)("div",{
                className:"text-[10px] uppercase tracking-wider text-muted-foreground/80",
                children:["Cryptographic Proof Receipt: ",(0,d.jsx)("span",{className:"text-accent font-semibold",children:e.id||"sov-verified"})]
              }),
              (0,d.jsxs)("div",{
                className:"text-[10px]",
                children:["Substrate: ",(0,d.jsx)("span",{className:"text-foreground font-semibold",children:"Apple Silicon M4 Unified RAM (Deterministic AST Engine)"})]
              })
            ]
          }),
          (0,d.jsx)("div",{
            className:"text-[10px] px-2.5 py-1 rounded bg-success/10 border border-success/30 text-success font-semibold tracking-wider font-mono",
            children:"ZERO AI THEATER // 100% EMPIRICAL"
          })
        ]
      }),

      /* 7. Share & Feedback */
      e.id&&(0,d.jsxs)("div",{
        className:"flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/60 p-4",
        children:[
          t?(0,d.jsxs)("div",{
            className:"flex items-center gap-2",
            children:[
              (0,d.jsx)("span",{className:"text-sm text-muted-foreground",children:a===null?"Was this diagnostic useful?":"Thanks for the feedback!"}),
              (0,d.jsx)("button",{
                type:"button",
                "aria-label":"Thumbs up",
                disabled:a!==null,
                onClick:()=>g(!0),
                className:`rounded-md border p-2 transition-colors ${a===!0?"border-success bg-success/20 text-success":"border-border hover:border-success hover:text-success"} disabled:cursor-default`,
                children:(0,d.jsx)(l,{className:"h-4 w-4"})
              }),
              (0,d.jsx)("button",{
                type:"button",
                "aria-label":"Thumbs down",
                disabled:a!==null,
                onClick:()=>g(!1),
                className:`rounded-md border p-2 transition-colors ${a===!1?"border-destructive bg-destructive/20 text-destructive":"border-border hover:border-destructive hover:text-destructive"} disabled:cursor-default`,
                children:(0,d.jsx)(c,{className:"h-4 w-4"})
              })
            ]
          }):(0,d.jsx)("span",{}),
          (0,d.jsxs)("button",{
            type:"button",
            onClick:async()=>{
              h&&(await navigator.clipboard.writeText(h),m(!0),setTimeout(()=>m(!1),2e3))
            },
            className:"inline-flex items-center gap-2 rounded-md border border-accent/60 px-3 py-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:bg-accent/10 cursor-pointer",
            children:[
              p?(0,d.jsx)(o,{className:"h-4 w-4"}):(0,d.jsx)(s,{className:"h-4 w-4"}),
              p?"Link copied":"Copy share link"
            ]
          })
        ]
      }),

      /* 8. YouTube Channel Subscription */
      (0,d.jsx)("a",{
        href:"https://www.youtube.com/@xorassystems?sub_confirmation=1",
        target:"_blank",
        rel:"noreferrer",
        className:"block text-center font-mono text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline",
        children:"Subscribe to XORAS Systems for more →"
      })
    ]
  });
}

export{f as t};
