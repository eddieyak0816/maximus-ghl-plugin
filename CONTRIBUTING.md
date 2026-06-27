# Contributing Guide

How to work on the GHL plugin and hand it off cleanly.

---

## Before You Start

1. Read [README.md](README.md) — 5-minute overview
2. Follow [SETUP.md](SETUP.md) — get your environment running
3. Check [DEVELOPMENT.md](DEVELOPMENT.md) — see what phase you're on and what's next
4. Read [CLAUDE.md](CLAUDE.md) — if you're working with Claude (the AI assistant)

---

## Development Workflow

### 1. Pick a Phase

All work is organized into 7 sequential phases. See [DEVELOPMENT.md](DEVELOPMENT.md).

- **Phases 1–5** are code work (backend, database, frontend)
- **Phases 6–7** are external setup (GHL OAuth, Google Calendar OAuth)

Only start a new phase once the previous one is complete and verified.

### 2. Code Standards

**File Size:** Keep files under 100 lines. Split functionality into separate files.

**Responsibility:** Each file should do one thing well.

**No Over-Engineering:** Three similar lines is OK. Don't build abstractions for future code that doesn't exist yet.

**Comments:** Only comment the WHY, not the WHAT. Code names should be self-documenting.

**Naming:** Use clear, descriptive names:
- `calculateSlotAvailability()` not `calc()`
- `formatDatetime()` not `fmt()`
- `appointmentRepository` not `repo` or `db`

**Testing:** For Phases 2–5 (backend/frontend), test in the real app before claiming done. Unit tests alone don't prove features work.

### 3. Keep Docs Updated

After each phase:
- [ ] Update `.ai/context.md` with your phase + blockers
- [ ] Update [DEVELOPMENT.md](DEVELOPMENT.md) with completion status
- [ ] Update [README.md](README.md) if project scope changed
- [ ] Add notes to `.ai/decisions.md` if you made trade-off choices

### 4. Commit Messages

Use clear, descriptive commit messages:

```
"Phase 2: Implement round robin engine and availability API

- Add RoundRobinService with per-hour slot limit checking
- Add GET /api/availability endpoint
- Add slot conflict detection (buffer time, team schedules)
- Verified with Postman tests"
```

Not:
```
"Fix bug"
"WIP"
"Update API"
```

### 5. Git Workflow

```bash
# Create a feature branch for your phase
git checkout -b phase-2-core-api

# Make commits as you work
git add src/services/roundRobin.js
git commit -m "Phase 2: Implement round robin engine..."

# When done, open a PR or merge to main
# Update docs before merging
git add .ai/context.md DEVELOPMENT.md
git commit -m "Phase 2: Update docs with completion"
```

---

## Testing Checklist

### Phase 1 (Database)
```bash
npm run migrate
npm run seed
mysql ghl_plugin -e "SELECT * FROM team_members LIMIT 1;"
# Should see sample data
```

### Phase 2 (Core API)
```bash
npm run dev
# Test in Postman:
GET /api/availability?date=2026-07-15
POST /api/appointments (with sample data)
# Verify appointments created in MySQL
```

### Phase 3 (Chatbot API)
```bash
npm run dev
# Test with API key:
POST /api/chatbot/cancel with Authorization header
# Verify appointment marked cancelled
```

### Phase 4 (Booking Widget)
```bash
npm run dev
# Open http://localhost:3000/widget in browser
# Pick a date, see slots, book an appointment
# Verify appointment created in MySQL + GHL + Google Calendar
```

### Phase 5 (Admin Panel)
```bash
npm run dev
# Open http://localhost:3000/admin in browser
# Log in with test credentials
# Create a team member, set schedule, reassign an appointment
# Verify changes sync to Google Calendar
```

### Phases 6–7 (External Setup)
Manual verification via GHL and Google Cloud dashboards. See [DEVELOPMENT.md](DEVELOPMENT.md) for steps.

---

## Troubleshooting

**"npm install fails"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**"MySQL connection error"**
- Ensure MySQL is running
- Check `.env` has correct credentials
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

**"Port 3000 in use"**
```bash
lsof -i :3000
kill -9 <PID>
```

**"Dependencies out of date"**
```bash
npm outdated
npm update
```

---

## Code Review

Before handing off:

1. **Does it follow standards?** (100-line files, clear naming)
2. **Are docs updated?** (README, DEVELOPMENT.md, DATABASE.md if schema changed)
3. **Does SETUP.md work?** (Test on a fresh machine)
4. **Is the code tested?** (Manual test in the app, not just unit tests)
5. **Are commits clear?** (Descriptive messages, not "WIP")

---

## Communication with Eddie

- **Always wait for approval** before writing code (Eddie says "Go")
- **Ask one question at a time** using option-based choices
- **Keep replies short** — one action per message
- **Use simple language** (8th grade reading level)
- **Show results, not logs** — no tool output or internal thinking
- See [CLAUDE.md](CLAUDE.md) for working style details

---

## Hand-Off Checklist

**Before passing to the next developer:**

- [ ] All tests pass
- [ ] Code follows standards
- [ ] Docs updated (context.md, DEVELOPMENT.md)
- [ ] SETUP.md verified on fresh machine
- [ ] Key decisions added to decisions.md
- [ ] Commits are clear and descriptive
- [ ] No secrets in code or git history
- [ ] All files under 100 lines (or justified)
- [ ] No commented-out code
- [ ] Error handling is appropriate (no over-engineering)

---

## Questions?

- See [README.md](README.md) for project overview
- See [DEVELOPMENT.md](DEVELOPMENT.md) for phase breakdown
- See [DATABASE.md](DATABASE.md) for schema details
- See [API.md](API.md) for endpoint documentation
- Check `.ai/decisions.md` for prior trade-offs
- Check `.ai/work-log.md` for what's been done
