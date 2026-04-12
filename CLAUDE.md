# Project Context

## What this is
Shashini's personal online portfolio — a dark-themed, AI-first single-page experience designed to accompany her resume. It flows through a loading screen → hero intro → chat interface where visitors can ask questions about her background, projects, and AI work. Includes a "today in tech" news panel and an AI riddle mini-game. The portfolio targets recruiters and tech leads and is intended to demonstrate solution architecture capability alongside her professional content.

## Tech stack
React + Vite + TypeScript + TailwindCSS + shadcn/ui + Framer Motion → Azure Static Web Apps

## Active feature
[Updated by /sdd-specify — current branch and spec path]

## Non-negotiables
- No `useEffect` for data fetching — TanStack Query only
- No Redux — Zustand is the approved state solution
- No class components — functional components only
- Do not commit `.env` files — use `.env.example` as the template
- `VITE_` prefix required on all environment variables exposed to the client
- Strict TypeScript — no `any`, no implicit `any`, no `ts-ignore` without comment
- TailwindCSS utility classes only — no inline `style={}` for layout
- WCAG AA compliance required — verify contrast ratios before shipping
- Lighthouse score target: ≥ 90 across all categories
- Colour palette fixed: background `#0A0A14`, amber `#F5A623` — do not alter without approval
- Fonts fixed: Syne (headings), DM Sans (body), JetBrains Mono (mono) — do not substitute
- 3-screen flow is fixed: init loader → hero → chat — do not restructure without approval
- AI chat API must stay within Azure free tier limits — design with cost guards
- Human approval required before any deviation from Shashini's stated design decisions

## SDD Workflow

Always follow this sequence. **Never write implementation code before tasks.md is approved.**

### Feature workflow (default)
```
specify → clarify → plan → analyze → tasks → implement → standards → security → review → commit → push
```

### Epic workflow (large, cross-cutting features)
```
specify → clarify → plan → analyze → test → tasks → implement (parallel agents) → standards → security → review → commit → push
```

### Trivial workflow (small single-file changes)
```
specify → implement → standards → commit
```

### Bug fix workflow
```
/sdd-fix (Report → Analyze → Fix → Verify) → commit
```

### Brownfield onboarding (existing projects)
```
/sdd-audit → /sdd-constitution → then feature workflow
```

| Phase | Skill | Output |
|---|---|---|
| 0a | `/sdd-init` | Project scaffold + `.sdd/memory/project.md` |
| 0b | `/sdd-audit` | Brownfield project.md + constitution draft |
| 1 | `/sdd-constitution` | `.sdd/memory/constitution.md` |
| 2 | `/sdd-specify <idea>` | `.sdd/specs/<NNN>-<slug>/spec.md` (with complexity) |
| 3 | `/sdd-clarify` | `.sdd/specs/<NNN>-<slug>/clarifications.md` + changelog |
| 4 | `/sdd-plan <notes>` | `.sdd/specs/<NNN>-<slug>/plan.md` + `research.md` |
| 5 | `/sdd-analyze` | `.sdd/specs/<NNN>-<slug>/analysis.md` |
| 6 | `/sdd-test` | `.sdd/specs/<NNN>-<slug>/test-strategy.md` (Epics) |
| 7 | `/sdd-tasks` | `.sdd/specs/<NNN>-<slug>/tasks.md` (sprint plan for Epics) |
| 8 | `/sdd-implement` | Implementation code (parallel agents for Epics) |
| 9 | `/sdd-fix` | `.sdd/fixes/<NNN>-<slug>/` (bug fix track) |
| 10 | `/sdd-standards` | `.sdd/specs/<NNN>-<slug>/standards-review.md` |
| 11 | `/sdd-security` | `.sdd/specs/<NNN>-<slug>/security-review.md` |
| 12 | `/sdd-review` | `.sdd/specs/<NNN>-<slug>/review.md` |
| 13 | `/sdd-commit` | Commit + PR description |
| 14 | `/sdd-push` | Branch push + PR (worktree-aware) |

## Current status
[Updated manually as you progress through phases]
