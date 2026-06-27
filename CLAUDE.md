# CLAUDE.md — Project Configuration

This file auto-loads every Claude Code session. Use it to set standing rules, preferences, and context that should persist across conversations.

---

## Communication Style

- Speak in **short, simple terms** (8th grade reading level)
- **Large font** — user has vision constraints
- **ONE action item per message** — wait for confirmation before proceeding
- **Ask questions one at a time** — use option-based prompts, not open-ended text
- Show results, not tool logs or internal thinking
- End major steps with "Do you want more details?"

---

## Code Standards

- **Files under 100 lines** — split when needed; single responsibility per file
- **Modular structure** — easy to test and maintain
- **No premature abstraction** — three similar lines is OK; don't over-engineer
- **Comments only for WHY** — skip "what" comments; code should be self-documenting
- **No backwards-compat hacks** — if something is unused, delete it

---

## Development Workflow

- **Phases are sequential** — finish one layer before starting the next
- **Always ask before writing code** — wait for explicit "Go" signal
- **Update `.ai/context.md` after each phase** — keeps next sessions fast
- **One prompt file per session type** — use `prompts/backend.md` for API, `prompts/frontend.md` for React
- **Test in the real app** — not just unit tests; feature correctness matters

---

## Project Context

**Client:** Maximus Digital Marketing (construction estimates)  
**Goal:** GHL plugin for round robin appointment scheduling with per-hour slot limits  
**Tech Stack:** Node.js, Express, MySQL, React, Twilio, Google Calendar API, GHL OAuth  
**Current Phase:** [[see .ai/context.md for latest status]]

---

## Token-Saving Rules

1. Use `prompts/prompt-index.md` — load only the relevant prompt file per task
2. Keep `.ai/context.md` tight — one summary, not verbose explanation
3. Work in phases — batched context = fewer tokens
4. Be surgical in requests — name files and line numbers, not vague descriptions
5. This file auto-loads, so never paste chat-rules.md again
