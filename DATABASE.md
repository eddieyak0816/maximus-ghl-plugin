# Database Schema

Complete schema for the GHL scheduling plugin. 7 tables total.

---

## Table: `users`

Admin/staff accounts that can log into the plugin.

| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | |
| `name` | VARCHAR(100) NOT NULL | Staff member's name |
| `email` | VARCHAR(100) UNIQUE NOT NULL | Login email |
| `password_hash` | VARCHAR(255) NOT NULL | Hashed password (bcrypt) |
| `role` | ENUM('admin', 'viewer') | Admin can edit; viewer is read-only |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | |

**Indexes:**
- UNIQUE on `email` (fast login lookup)

---

## Table: `team_members`

The 4 people who take appointments.

| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | |
| `name` | VARCHAR(100) NOT NULL | E.g., "John Smith" |
| `email` | VARCHAR(100) NOT NULL | For calendar invites |
| `phone` | VARCHAR(20) NOT NULL | E.g., "+15551234567" — Twilio SMS target |
| `default_buffer_min` | INT DEFAULT 30 | Minutes between appointments (can override per person) |
| `ghl_user_id` | VARCHAR(100) UNIQUE | GHL user ID for two-way sync (set during OAuth) |
| `active` | BOOLEAN DEFAULT TRUE | Soft delete — set to FALSE to remove from rotation |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | |

**Indexes:**
- INDEX on `ghl_user_id` (fast GHL sync)
- INDEX on `active` (filter out inactive quickly)

**Example:**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+15551234567",
  "default_buffer_min": 30,
  "ghl_user_id": "ghl_usr_abc123",
  "active": true
}
```

---

## Table: `team_member_schedules`

Hours each person works per day of the week.

| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | |
| `team_member_id` | INT NOT NULL | FK → `team_members.id` |
| `day_of_week` | TINYINT NOT NULL | 0=Sunday, 1=Monday, ..., 6=Saturday |
| `start_time` | TIME NOT NULL | E.g., "08:00:00" |
| `end_time` | TIME NOT NULL | E.g., "18:00:00" |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | |

**Indexes:**
- COMPOSITE INDEX on (`team_member_id`, `day_of_week`)
- UNIQUE on (`team_member_id`, `day_of_week`) — one schedule per person per day

**Foreign Key:**
- `team_member_id` → `team_members.id` (ON DELETE CASCADE)

**Example:**
```json
{
  "team_member_id": 1,
  "day_of_week": 1,  // Monday
  "start_time": "08:00:00",
  "end_time": "18:00:00"
}
```

**Note:** If a person doesn't work a day, no row exists for that day.

---

## Table: `team_member_blackouts`

Time blocks when a person is unavailable (vacation, sick, etc.).

| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | |
| `team_member_id` | INT NOT NULL | FK → `team_members.id` |
| `start_datetime` | DATETIME NOT NULL | E.g., "2026-07-15 00:00:00" |
| `end_datetime` | DATETIME NOT NULL | Inclusive end (e.g., next day 00:00 for all-day block) |
| `note` | VARCHAR(255) | E.g., "Vacation to Hawaii" |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | |

**Indexes:**
- INDEX on (`team_member_id`, `start_datetime`) — fast range queries

**Foreign Key:**
- `team_member_id` → `team_members.id` (ON DELETE CASCADE)

**Example:**
```json
{
  "team_member_id": 2,
  "start_datetime": "2026-07-20 00:00:00",
  "end_datetime": "2026-07-27 00:00:00",
  "note": "Vacation"
}
```

---

## Table: `hourly_slot_limits`

Max appointments per hour, per day of the week.

| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | |
| `day_of_week` | TINYINT NOT NULL | 0=Sunday, ..., 6=Saturday |
| `hour` | TINYINT NOT NULL | 0–23 (24-hour format) |
| `max_slots` | TINYINT NOT NULL DEFAULT 1 | E.g., 8am can have 2 concurrent appointments |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | |

**Indexes:**
- COMPOSITE INDEX on (`day_of_week`, `hour`)
- UNIQUE on (`day_of_week`, `hour`) — one limit per hour per day

**Example:**
```json
{
  "day_of_week": 1,  // Monday
  "hour": 8,         // 8am
  "max_slots": 2     // Max 2 appointments at 8am on Mondays
}
```

**Note:** If no row exists for an hour, that hour is closed (no slots available). This is the expected pattern.

---

## Table: `appointments`

Booked appointments.

| Column | Type | Notes |
|--------|------|-------|
| `id` | INT PRIMARY KEY AUTO_INCREMENT | |
| `ghl_appt_id` | VARCHAR(100) UNIQUE | GHL appointment ID (for two-way sync) |
| `google_event_id` | VARCHAR(100) UNIQUE | Google Calendar event ID |
| `team_member_id` | INT NOT NULL | FK → `team_members.id` |
| `customer_name` | VARCHAR(100) NOT NULL | From GHL contact |
| `customer_email` | VARCHAR(100) | From GHL contact |
| `customer_phone` | VARCHAR(20) | From GHL contact |
| `start_datetime` | DATETIME NOT NULL | E.g., "2026-07-15 08:00:00" |
| `end_datetime` | DATETIME NOT NULL | Start + 60 minutes (derived, but stored for performance) |
| `status` | ENUM('scheduled', 'completed', 'cancelled') | Tracks lifecycle |
| `source` | ENUM('plugin', 'ghl', 'chatbot') | Where it came from |
| `notes` | TEXT | E.g., "Customer notes from funnel" |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | |
| `updated_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | |

**Indexes:**
- INDEX on `team_member_id` (quick lookup for a person's appointments)
- INDEX on (`start_datetime`, `status`) (availability checks)
- INDEX on `ghl_appt_id` (webhook sync)
- INDEX on `google_event_id` (Google Calendar sync)

**Foreign Key:**
- `team_member_id` → `team_members.id` (ON DELETE RESTRICT — don't allow deletion if appointments exist)

**Example:**
```json
{
  "id": 42,
  "ghl_appt_id": "ghl_appt_xyz789",
  "google_event_id": "gcal_evt_123",
  "team_member_id": 1,
  "customer_name": "Jane Doe",
  "customer_email": "jane@customer.com",
  "customer_phone": "+15559876543",
  "start_datetime": "2026-07-15 08:00:00",
  "end_datetime": "2026-07-15 09:00:00",
  "status": "scheduled",
  "source": "plugin",
  "notes": "Customer prefers morning slots"
}
```

---

## Table: `settings`

Key/value configuration store.

| Column | Type | Notes |
|--------|------|-------|
| `key` | VARCHAR(100) PRIMARY KEY | E.g., "round_robin_last_assigned" |
| `value` | TEXT NOT NULL | JSON or plain string |
| `updated_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | |

**Indexes:**
- PRIMARY KEY on `key` (fast lookup)

**Expected Keys:**

| Key | Value | Purpose |
|-----|-------|---------|
| `round_robin_last_assigned` | JSON: `{"team_member_id": 1}` | Tracks whose turn is next |
| `google_refresh_token` | String | OAuth refresh token for Google Calendar sync |
| `default_buffer_min` | Int (as string) | Global default buffer time in minutes |
| `ghl_location_id` | String | GHL location/sub-account to sync with |
| `appointment_duration_min` | Int (as string) | Fixed appointment duration (always 60) |

**Example:**
```json
{
  "key": "round_robin_last_assigned",
  "value": "{\"team_member_id\": 3}"
}
```

---

## Relationships

```
team_members (1) ←─────→ (N) team_member_schedules
team_members (1) ←─────→ (N) team_member_blackouts
team_members (1) ←─────→ (N) appointments
hourly_slot_limits (no FK, standalone)
settings (no FK, key/value)
users (no FK, admin accounts)
```

---

## Sample Data

See `src/db/seed.js` for the script that populates:
- 2 admin users
- 4 team members (John, Jane, Bob, Sarah)
- Schedules (Mon–Fri 8am–6pm, Sat 9am–5pm for most)
- Sample hourly limits (2 slots 8–10am, 3 slots 10am–5pm, 1 slot 5–6pm)
- One sample appointment

---

## Migrations

Database changes are tracked in `src/db/migrate.js`. This file:
1. Checks if tables exist
2. Creates tables if missing
3. Runs in idempotent mode (safe to run multiple times)

To reset the database:
```bash
mysql -u root -p ghl_plugin -e "DROP TABLE IF EXISTS appointments, hourly_slot_limits, team_member_blackouts, team_member_schedules, team_members, users, settings;"
npm run migrate
npm run seed
```

---

## Performance Notes

- Appointments table will grow large (thousands of records). Indexes on `team_member_id`, `start_datetime`, `status` are critical.
- Availability queries need fast range scans on `start_datetime` — ensure indexes are used.
- Round robin state is read/written on every booking. Storing in `settings` table (key/value) is fast and simple.
- Consider archiving old appointments (status='completed', >6 months old) if table grows past 100k rows.
