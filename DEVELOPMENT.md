# Development Guide — Phases & Current Status

The plugin is built in 7 sequential phases. Each phase builds on the previous one.

---

## Phase 1 — Project Scaffold & Database

**Status:** IN PROGRESS  
**Owner:** Claude Code (AI assistant)  
**Target Completion:** Today

### What This Phase Does
- Initialize Node.js project (`src/`, `package.json`)
- Create `.env.example` template
- Write MySQL schema (6 tables)
- Write migration runner (`src/db/migrate.js`)
- Write seed data script (`src/db/seed.js`)

### Critical Files
- `package.json` — dependencies
- `src/index.js` — Express app entry point
- `src/db/schema.sql` — table definitions
- `src/db/migrate.js` — run migrations
- `.env.example` — template for secrets

### Verification
Run these to confirm Phase 1 is done:
```bash
npm install                    # Install deps
npm run migrate                # Create tables
npm run seed                   # Add sample data
mysql ghl_plugin -e "SHOW TABLES;"  # See 7 tables
```

### Next: Phase 2
Once Phase 1 is complete, start building the Core API.

---

## Phase 2 — Core API (Backend)

**Status:** NOT STARTED  
**Owner:** TBD  
**Blocks:** Phases 3, 4, 5

### What This Phase Does
Build the heart of the plugin: availability checking, round robin logic, and appointment booking.

### Routes to Create

| File | Endpoint | Method | Purpose |
|------|----------|--------|---------|
| `src/routes/availability.js` | `/api/availability` | GET | Show available slots for a date range |
| `src/routes/appointments.js` | `/api/appointments` | POST | Book an appointment |
| `src/routes/appointments.js` | `/api/appointments/:id` | PATCH | Reassign an appointment (admin only) |
| `src/routes/appointments.js` | `/api/appointments/:id` | DELETE | Cancel an appointment |
| `src/webhooks/ghl.js` | `/webhooks/ghl` | POST | Catch GHL appointments (webhook) |

### Services to Create

| File | Purpose |
|------|---------|
| `src/services/roundRobin.js` | Round robin assignment logic |
| `src/services/slotChecker.js` | Check per-hour slot limits |
| `src/services/ghlClient.js` | Call GHL API (create/update/delete appointments) |
| `src/services/googleCalClient.js` | Sync to Google Calendar |
| `src/services/smsService.js` | Send SMS via Twilio |

### Core Logic: Slot Availability

For a given date + hour, a slot is available if:
1. Count of existing appointments in that hour < `hourly_slot_limits.max_slots`
2. At least one team member is:
   - Scheduled to work that day + hour
   - Not blocked off (no blackout covering that time)
   - Not already booked within (60min + buffer_time) of the slot

See [DATABASE.md](DATABASE.md) for schema details.

### Verification
Test with Postman:
```bash
GET /api/availability?date=2026-07-15&hour=9
  Response: { available: true, assigned_to: "John", reason: null }

POST /api/appointments
  Body: { customer_name: "Test", date: "2026-07-15", hour: 9 }
  Response: { id: 123, ghl_appt_id: "ghl_456", google_event_id: "gcal_789" }
```

---

## Phase 3 — Chatbot Cancel/Reschedule API

**Status:** NOT STARTED  
**Depends On:** Phase 2  
**Owner:** TBD

### What This Phase Does
Build two endpoints for the AI chatbot to cancel or reschedule appointments.

### Routes to Create

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/chatbot/cancel` | POST | Cancel an appointment |
| `/api/chatbot/reschedule` | POST | Reschedule to a different time |

### Auth
Both endpoints require an API key header:
```
Authorization: Bearer <CHATBOT_API_KEY>
```

### Request/Response Examples

**Cancel:**
```json
POST /api/chatbot/cancel
{
  "appointment_id": 123
}
→ 200 OK
{
  "status": "cancelled",
  "google_event_deleted": true
}
```

**Reschedule:**
```json
POST /api/chatbot/reschedule
{
  "appointment_id": 123,
  "new_date": "2026-07-16",
  "new_hour": 10
}
→ 200 OK
{
  "status": "rescheduled",
  "new_time": "2026-07-16 10:00",
  "assigned_to": "Jane"
}
```

### Verification
Use curl or Postman with API key header.

---

## Phase 4 — Booking Widget (React)

**Status:** NOT STARTED  
**Depends On:** Phase 2  
**Owner:** TBD

### What This Phase Does
Build the frontend widget that embeds in GHL funnels. Customers use it to pick a date and time.

### Flow
1. **Date Picker** — select a date (min: today, max: 30 days out)
2. **Hour Slots** — show available hours for that date (calls `/api/availability`)
3. **Confirmation** — review and click "Book"
4. **Success** — show confirmation + Google Meet link (if provided by GHL)

### Tech
- Create React app in `src/widget/`
- Build in React (functional components, hooks)
- Style with CSS modules (no external UI library)
- Bundle as single `.js` + `.css` file (for iframe embedding)

### Files
- `src/widget/App.js` — main component
- `src/widget/DatePicker.js` — calendar picker
- `src/widget/SlotSelector.js` — hour slots
- `src/widget/ConfirmationStep.js` — review + book
- `src/widget/styles/App.css` — styling
- `public/widget/` — built output

### Verification
Open in browser, pick a date, see available slots, book a test appointment, confirm it appears in admin panel.

---

## Phase 5 — Admin Panel (React)

**Status:** NOT STARTED  
**Depends On:** Phase 2  
**Owner:** TBD

### What This Phase Does
Build the admin dashboard. Staff can manage schedules, see appointments, and manually reassign.

### Pages

| Page | Purpose |
|------|---------|
| **Dashboard** | Overview: appointments this week, round robin queue, alerts |
| **Team Members** | Add/edit team members, set default buffer time |
| **Schedules** | Set hours per day per team member (Mon 8am–6pm, etc.) |
| **Blackouts** | Block off time (vacations, sick days) |
| **Slot Limits** | Set max appointments per hour (8am = 2, 9am = 4, etc.) |
| **Appointments** | List all appointments, click to view details + reassign |
| **Settings** | API keys, Google Calendar ID, round robin reset |

### Auth
- JWT login (email + password)
- Multiple staff can have admin accounts
- Stored in `users` table

### Verification
Log in as admin, create a team member, set a schedule, view appointments.

---

## Phase 6 — GHL OAuth App Setup

**Status:** NOT STARTED  
**Depends On:** Phase 2 complete (ready for integration)  
**Owner:** Eddie (manual setup via GHL dashboard)

### What This Phase Does
Register the plugin as a GHL Marketplace app and set up OAuth + webhooks.

### Steps
1. Go to **app.gohighlevel.com/marketplace**
2. Create a new app
3. Set OAuth redirect URI: `https://your-domain.com/auth/ghl/callback`
4. Set scopes: `calendars.write`, `appointments.write`, `contacts.read`
5. Subscribe to webhooks: `appointment.created`, `appointment.updated`, `appointment.deleted`
6. Get Client ID + Secret, store in `.env`

### What It Does
- OAuth sign-in for users
- Webhooks notify plugin when appointments change in GHL
- Plugin pushes appointments to GHL (two-way sync)

### Verification
Test OAuth flow, trigger a GHL appointment, confirm webhook is received.

---

## Phase 7 — Google Calendar OAuth

**Status:** NOT STARTED  
**Depends On:** Phase 5 complete  
**Owner:** Eddie (manual setup via Google Cloud Console)

### What This Phase Does
Set up one-time OAuth consent for the shared Google Calendar.

### Steps
1. Go to **console.cloud.google.com**
2. Create OAuth 2.0 credentials (Desktop app)
3. Run local auth script to get refresh token
4. Store in `settings` table (key: `google_refresh_token`)

### What It Does
All appointments sync to one shared Google Calendar. The refresh token allows the plugin to create/update/delete events.

### Verification
Book an appointment in the plugin, see it appear in Google Calendar within seconds.

---

## Current Task

**See the [plan file](../../plans/you-are-a-ghl-starry-rabbit.md) for the full implementation plan.**

Phase 1 is currently in progress. Focus on:
1. Node.js project scaffold
2. MySQL schema + migrations
3. Sample seed data

Once Phase 1 is done and verified, Phase 2 (Core API) can begin.

---

## How to Hand Off

Before passing to another developer:
1. Update `.ai/context.md` with completed phase + current status
2. Commit code with clear messages: `"Phase X: [what was done]"`
3. Update this file with completion status
4. Run SETUP.md steps to verify everything works
5. Add notes to `.ai/decisions.md` if any tradeoffs were made

---

## Key Decisions (Trade-offs)

See [.ai/decisions.md](.ai/decisions.md) for architectural choices, why they were made, and any alternatives considered.

Currently documented:
- 2026-06-26 — Tech stack selected: Node.js, MySQL, React
- 2026-06-26 — Project kickoff
