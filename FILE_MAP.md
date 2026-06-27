# File Map — GHL Plugin
Generated: 2026-06-26T01:59:29.250Z
Client: Maximus Digital Marketing
Tech Stack: Node.js, MySQL, React

## AI Configuration Files
| File | Purpose |
|------|---------|
| chat-rules.md | AI behavior rules — loaded on every message |
| .ai/context.md | Project goal and current sprint |
| .ai/decisions.md | Log of key decisions made |
| .ai/errors.md | Error log |
| .ai/my-preferences.md | Personal preferences for AI responses |
| .ai/work-log.md | Work completed log |

## Prompt Files
| File | Purpose |
|------|---------|
| prompts/prompt-index.md | Routing map — tells AI which prompt file to load |
| prompts/debugging.md | Bug fixes, errors, TypeScript issues |
| prompts/frontend.md | UI, forms, layouts, animations |
| prompts/backend.md | APIs, services, database, auth |
| prompts/testing.md | Unit, integration, E2E tests |
| prompts/refactoring.md | Code cleanup, splitting files |
| prompts/devops.md | CI/CD, Docker, migrations |
| prompts/agents-mcp.md | AI agents, MCP servers, RAG |
| prompts/documentation.md | READMEs, API docs, ADRs |
| prompts/security.md | Hardening, OWASP, RLS |
| prompts/performance.md | Query optimization, caching |
| prompts/analysis-strategy.md | Tech decisions, planning |
| prompts/task-management.md | Types generation, CLI scripts |
| prompts/memory-session.md | Session start/end, error logging |

## Project Documentation Files
| File | Purpose |
|------|---------|
| QUICK_START.md | Quick overview of what's been done + next steps |
| README.md | Project overview + feature summary |
| SETUP.md | Developer environment setup instructions |
| DEVELOPMENT.md | Phase breakdown + current task + verification |
| DATABASE.md | Complete MySQL schema + relationships + examples |
| API.md | All endpoints + auth + error handling + examples |
| CONTRIBUTING.md | How to work on this project + handoff checklist |
| CLAUDE.md | AI working style + project rules (auto-loads) |

## Configuration Files
| File | Purpose |
|------|---------|
| .env.example | Environment variables template (copy to .env) |
| .gitignore | Git ignore patterns (secrets, node_modules, builds) |

## Source Code Files
| File | Purpose | Status |
|------|---------|--------|
| package.json | Node.js dependencies | ✓ Phase 1 |
| .env | Environment variables (copy from .env.example) | Phase 1 |
| src/index.js | Express app entry point | ✓ Phase 1 |
| src/db/setup.js | SQLite setup (minimal database) | ✓ Phase 1 |
| src/services/ghlClient.js | GHL API wrapper | ✓ Phase 1 |
| src/services/roundRobin.js | Round robin logic | ✓ Phase 1 |
| src/routes/availability.js | GET available slots | Phase 2 |
| src/routes/book.js | POST book appointment | Phase 2 |
| src/widget/ | React booking widget | Phase 3 |

---
*Phase 1 complete when npm install works and server starts.*
