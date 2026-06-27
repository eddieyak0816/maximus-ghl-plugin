# Context

**Project Goal:** Smart booking calendar widget to replace GHL's native Round Robin. Shows multiple available spots per time slot (e.g., "3 spots at noon") instead of hiding slots when one team member books.

**Current Phase:** 1 — Project Scaffold & Backend Setup (IN PROGRESS - RESTARTED WITH CORRECT ARCHITECTURE)

**Client:** Maximus Digital Marketing (construction estimate appointments, 4 Eddie entries with different email addresses)

**Tech Stack:** Node.js (Express), SQLite (minimal), React (widget only), GHL API

**Timeline:** Started 2026-06-26 · Architecture clarified same day

---

## Phases Overview

| Phase | Status | Owner | Est. Time |
|-------|--------|-------|-----------|
| 1 | IN PROGRESS | Claude | Today |
| 2 | Not Started | TBD | Day 2–3 |
| 3 | Not Started | TBD | Day 4 |
| 4 | Not Started | TBD | Day 5–6 |
| 5 | Not Started | TBD | Day 7–8 |
| 6 | Not Started | Manual (Eddie) | Day 9 |
| 7 | Not Started | Manual (Eddie) | Day 10 |

---

## Current Phase (Phase 1) Tasks

- [ ] Initialize Node.js project
- [ ] Create `.env.example`
- [ ] Write MySQL schema (7 tables)
- [ ] Write migration script
- [ ] Write seed data script
- [ ] Verify with SETUP.md steps

---

## Key Docs

- [README.md](../README.md) — Project overview
- [SETUP.md](../SETUP.md) — Developer environment setup
- [DEVELOPMENT.md](../DEVELOPMENT.md) — Phase breakdown and current task
- [DATABASE.md](../DATABASE.md) — Complete schema
- [API.md](../API.md) — Endpoint documentation
- [CLAUDE.md](../CLAUDE.md) — AI working style + preferences
- [Plan](../../plans/you-are-a-ghl-starry-rabbit.md) — Full implementation plan

---

## Key Decisions

See [decisions.md](decisions.md) for architectural choices and trade-offs.

---

## How to Hand Off

1. Update this file with current phase + blockers
2. Commit with message: `"Phase X: [what was done]"`
3. Verify SETUP.md works from scratch
4. Add notes to decisions.md if trade-offs made
