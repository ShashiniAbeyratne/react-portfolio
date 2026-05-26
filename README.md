# shashini.dev — Personal Portfolio

Live at **[shashiniabeyratne.com](https://shashiniabeyratne.com)**

An AI-first personal portfolio built to accompany my resume. Designed to let recruiters and tech leads have a real conversation with an AI that knows my background — rather than reading a static page.

---

## What it does

Three-screen flow:

1. **Init loader** — animated entry screen
2. **Hero** — quick intro with my background and a CTA
3. **Chat** — AI assistant that answers questions about my experience, projects, and goals

The chat screen also includes:
- **Dev Riddles** — a mini-game where questions are generated on-demand by an LLM with randomised seeds for variety
- **Today in Tech** — a live news panel pulling from TechCrunch, The Verge, and Ars Technica via RSS

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite |
| Styling | TailwindCSS v4, Framer Motion |
| Components | shadcn/ui, Radix UI |
| State | Zustand |
| Data fetching | TanStack Query |
| AI | Groq API — Llama 3.3 70B (chat), Llama 3.1 8B (riddles) |
| API | Vercel Serverless Functions |
| Hosting | Vercel |
| DNS | Cloudflare |

---

## Architecture

The AI chat uses a context-stuffed system prompt approach — my professional background, experience, and personality are embedded directly into the system prompt sent to the LLM. No vector database or RAG pipeline needed at this knowledge base size. Simple, fast, and cost-effective on the Vercel hobby plan.

```
Browser → Vercel Serverless Function → Groq API (Llama 3.3 70B)
                                     → RSS feeds (news panel)
                                     → Groq API (Llama 3.1 8B, riddles)
```

API functions live in `/api` and are picked up automatically by Vercel's file-based routing.

---

## The Azure SWA → Vercel migration

This project originally targeted **Azure Static Web Apps** with Azure Functions as the backend. You'll see the Azure workflow files and some `api/src/` source structure left over from that phase.

I migrated to **Vercel** because:

- Groq's API was blocked on Azure SWA's free tier, and alternative free model providers were too slow to be usable
- Vercel's local dev tooling (`vercel dev`) gives a much tighter feedback loop — the serverless functions run locally with near-identical behaviour to production
- Vercel's file-based function routing (`/api/*.ts`) removed build configuration overhead
- The Groq SDK worked cleanly as a dependency without needing custom Azure Function bindings

The migration involved moving the function handlers from `api/src/functions/` (Azure format) to `api/*.ts` (Vercel format) and replacing the Azure SWA CI workflow with Vercel's native GitHub integration.

---

## Challenges worth noting

**Sensitive env vars and local dev**
Vercel marks API keys as "Sensitive" on the dashboard, which prevents them from being added to the Development environment — by design, the Vercel API blocks it. This means `vercel env pull` won't pull them locally, and `.env.local` alone isn't sufficient for `vercel dev`. Workaround for local dev: set the key directly in the terminal session before running `vercel dev`.

**Mobile responsive display heading**
The hero name uses `clamp()` for fluid typography. The initial minimum (`3.2rem`) was too large for narrow screens — the heading overflowed the container and got clipped by `overflow-hidden`. Fixed by lowering the minimum to `2rem` so the `vw`-based value takes over on small viewports.

**Rate limiting**
Server-side in-memory rate limiting (a `Map`-based sliding window) was explored but doesn't work reliably with serverless — each function invocation can be a fresh process with no shared state. The practical solution for a low-traffic portfolio: rely on Groq's own API rate limits, which apply at the key level server-side. The client handles 429 responses from Groq gracefully with user-friendly messages in both the chat and riddle panel. A proper persistent solution (e.g. Upstash Redis with `@upstash/ratelimit`) would be the right call if traffic scaled.

**TypeScript strict mode across two runtimes**
The frontend (Vite/browser) and the API functions (Node.js/Vercel) have separate `tsconfig.json` files. Keeping `strict: true` in both without letting Node types leak into the browser bundle required careful `types` and `include` scoping.

---

## Local development

```bash
# Install dependencies
npm install

# Set your Groq API key (required for AI features — get one free at console.groq.com)
$env:GROQ_API_KEY="your_key_here"   # PowerShell
# or
export GROQ_API_KEY="your_key_here" # bash/zsh

# Run with Vercel dev (serves both frontend and API functions)
vercel dev

# Frontend only (no AI features)
npm run dev
```

> Note: `npm run dev` runs Vite only. The `/api/*` endpoints won't respond unless you use `vercel dev`.

---

## Project structure

```
├── api/                  # Vercel serverless functions
│   ├── _knowledge.ts     # AI system prompt / knowledge base
│   ├── chat.ts           # POST /api/chat
│   ├── news.ts           # GET /api/news
│   └── riddles.ts        # GET /api/riddles
├── src/
│   ├── app/              # Router, providers, App.tsx
│   ├── features/         # Feature-sliced: chat, hero, init-loader, riddle
│   ├── components/ui/    # shadcn/ui components
│   ├── pages/            # Page-level components
│   └── shared/           # Layout, shared utilities
├── vercel.json           # Vercel config + SPA rewrite rule
└── .github/workflows/    # Legacy Azure SWA workflows (unused, kept for history)
```

