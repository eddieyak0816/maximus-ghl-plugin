# DevOps & Automation Prompts

## Build a CI/CD Pipeline
Build a CI/CD pipeline for this project.
Platform: [GitHub Actions / GitLab CI / CircleCI]

Pipeline should:
- On every PR: lint, typecheck, run unit + integration tests
- On merge to main: run all tests + deploy to staging
- On release tag: deploy to production with approval gate
- Fail fast — stop on first failure
- Cache dependencies
- Notify on failure: [Slack / email]

Output all workflow files in full.

---

## Build a Docker Setup
Build a production-grade Docker setup for this project.

Requirements:
- Multi-stage Dockerfile (build stage + lean production stage)
- docker-compose.yml for local development
- .dockerignore
- Health check endpoint in the app
- No secrets baked into image

Output all files in full with comments explaining each section.

---

## Write a Database Migration
Write a database migration for [DESCRIBE THE CHANGE].
Migration system: [Drizzle / Prisma / raw SQL]

Requirements:
- Up migration (apply the change)
- Down migration (reverse it safely)
- Handle existing data: [describe how existing rows should be treated]
- Safe to run on production without downtime

Output the full migration file.

---

## Write an Automation Script
Write a [Node.js / Python / Bash] script to [TASK].

Requirements:
- Idempotent — safe to run multiple times
- Logs errors with enough context to debug
- Handles failures gracefully
- Accepts these flags/arguments: [list them]
- Shows progress during long operations

Output the full script and any config it needs.

---

## Build a Deployment Script
Build a deployment script for [ENVIRONMENT: staging / production].
Platform: [Vercel / Railway / AWS / Fly.io]

Script should:
- Run pre-deploy checks (tests, typecheck)
- Run database migrations before traffic switches
- Deploy with zero downtime
- Run a smoke test after deploy
- Rollback automatically if smoke test fails
- Notify [Slack / email] with deploy status

Output the script and any config files it needs.
