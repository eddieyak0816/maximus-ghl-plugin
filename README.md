# GHL Round Robin Scheduling Plugin

A custom scheduling plugin for GoHighLevel (GHL) that automates round robin appointment assignment for in-home construction estimates.

## Problem

Maximus Digital Marketing manually routes appointments: a lead books through a GHL funnel, and the owner texts a team member to take the job. This is slow and error-prone.

## Solution

This plugin:
- **Auto-assigns** appointments using round robin logic
- **Enforces per-hour slot limits** (e.g., 8am = 2 max, 9am = 4 max)
- **Respects team schedules** (each person has different hours, some work Saturdays)
- **Syncs to Google Calendar** — one shared company calendar shows all appointments
- **SMS notify** — assigned team member gets a text
- **API for chatbot** — AI cancellations call `/api/chatbot/cancel`

## Features

### Booking Widget
- Embeds as an iframe in GHL funnels
- Shows only available slots (respecting slot limits + team availability)
- One-click booking

### Admin Panel
- Manage team member schedules (hours per day)
- Set per-hour slot limits for any hour of the week
- Block off time (vacations, sick days)
- View and manually reassign appointments
- Multi-staff login (JWT auth)

### Backend API
- `/api/availability` — GET available slots for a date range
- `/api/appointments` — POST book, PATCH reassign, DELETE cancel
- `/webhooks/ghl` — catch appointments booked outside the plugin
- `/api/chatbot/cancel` — cancel via AI bot
- `/api/chatbot/reschedule` — reschedule via AI bot

### Google Calendar Sync
- Every appointment syncs to one shared company Google Calendar
- Deletions remove the event
- Reassignments update the event

### Round Robin Engine
- Tracks rotation state per team member
- Picks the next available person in rotation order
- Skips blocked time, different schedules, and buffer conflicts

---

## Tech Stack

- **Backend:** Node.js + Express
- **Database:** MySQL
- **Frontend:** React (booking widget + admin panel)
- **SMS:** Twilio
- **Calendar:** Google Calendar API
- **Auth:** JWT (admin), API key (chatbot)
- **External:** GHL OAuth (webhooks, appointment read/write)

---

## Architecture

```
GHL Funnel  ──► Booking Widget (React iframe)
                        │
                        ▼
               Node.js / Express API
               ┌────────────────────┐
               │  Round Robin Engine │
               │  Slot Limit Checker │
               │  GHL API Client     │
               │  Google Cal Client  │
               │  Twilio SMS Client  │
               └────────┬───────────┘
                        │
                       MySQL
                        │
               ┌────────┴───────────┐
               │  Admin Panel        │
               │  (React, GHL iframe)│
               └────────────────────┘

GHL Webhooks ──► /webhooks/ghl  (catch external bookings)
AI Chatbot   ──► /api/appointments/:id/cancel|reschedule
```

---

## Database

6 tables:
- `users` — staff with admin access
- `team_members` — the 4 people taking appointments
- `team_member_schedules` — hours per day (e.g., Mon 8am–6pm, Sat 9am–5pm)
- `team_member_blackouts` — blocked time (vacations, sick days)
- `hourly_slot_limits` — max appointments per hour (e.g., hour 8 = 2, hour 9 = 4)
- `appointments` — booked appointments
- `settings` — key/value store (round robin state, buffer time, etc.)

See [DATABASE.md](DATABASE.md) for full schema.

---

## Project Status

| Phase | Status | Files |
|-------|--------|-------|
| 1 | In Progress | Project scaffold, DB migrations |
| 2 | Not Started | Core API (availability, booking, round robin) |
| 3 | Not Started | Chatbot cancel/reschedule API |
| 4 | Not Started | Booking widget (React) |
| 5 | Not Started | Admin panel (React) |
| 6 | Not Started | GHL OAuth app setup |
| 7 | Not Started | Google Calendar OAuth |

See [DEVELOPMENT.md](DEVELOPMENT.md) for phase breakdown and current task.

---

## Getting Started

1. Clone the repo
2. Follow [SETUP.md](SETUP.md) to set up your dev environment
3. See [DEVELOPMENT.md](DEVELOPMENT.md) for the current phase and next task
4. [API.md](API.md) documents all endpoints
5. [DATABASE.md](DATABASE.md) documents the schema

---

## Handoff Checklist

Before handing off to another developer:
- [ ] Update `.ai/context.md` with current phase and blockers
- [ ] Update this README and DEVELOPMENT.md with completion status
- [ ] Commit all changes to git with clear messages
- [ ] Ensure SETUP.md runs without errors
- [ ] Leave notes in `.ai/decisions.md` on any trade-offs made

---

## Questions?

See [.ai/context.md](.ai/context.md) for project goals and current status.  
See [.ai/decisions.md](.ai/decisions.md) for architectural decisions made.  
See [.ai/my-preferences.md](.ai/my-preferences.md) for Eddie's working style.
