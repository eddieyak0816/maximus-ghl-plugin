# API Documentation

All endpoints for the GHL scheduling plugin.

---

## Base URL

```
http://localhost:3000  (local development)
https://your-domain.com  (production)
```

---

## Auth Methods

### 1. No Auth (Public)
Booking widget and health checks.

### 2. API Key (Chatbot)
Chatbot endpoints use API key header:
```
Authorization: Bearer <CHATBOT_API_KEY>
```

### 3. JWT (Admin)
Admin panel endpoints use JWT token in header:
```
Authorization: Bearer <JWT_TOKEN>
```

Get JWT token via login endpoint (Phase 5).

---

## Endpoints

### Health Check

**GET** `/health`

Returns 200 if server is running.

```bash
curl http://localhost:3000/health
```

Response:
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

### Availability (Public)

**GET** `/api/availability`

Get available slots for a date range.

**Query Params:**
- `date` (required) — ISO date string, e.g., `2026-07-15`
- `hours` (optional) — comma-separated hours, e.g., `8,9,10`. If omitted, returns all hours.

**Response:**
```json
{
  "date": "2026-07-15",
  "slots": [
    {
      "hour": 8,
      "available": true,
      "assigned_to": "John",
      "team_member_id": 1
    },
    {
      "hour": 9,
      "available": true,
      "assigned_to": "Jane",
      "team_member_id": 2
    },
    {
      "hour": 10,
      "available": false,
      "reason": "slot_full"
    },
    {
      "hour": 11,
      "available": false,
      "reason": "closed"
    }
  ]
}
```

**Reasons for unavailable:**
- `slot_full` — max appointments for that hour reached
- `closed` — no hourly limit set for that hour (closed)
- `no_available_staff` — all team members are booked or blocked

---

### Book Appointment (Public)

**POST** `/api/appointments`

Book an appointment for a customer.

**Request Body:**
```json
{
  "date": "2026-07-15",
  "hour": 9,
  "customer_name": "Jane Doe",
  "customer_email": "jane@example.com",
  "customer_phone": "+15551234567",
  "notes": "Optional customer notes from funnel"
}
```

**Response (201 Created):**
```json
{
  "id": 42,
  "ghl_appt_id": "ghl_appt_xyz",
  "google_event_id": "gcal_evt_123",
  "team_member_id": 1,
  "assigned_to": "John",
  "start_datetime": "2026-07-15 09:00:00",
  "end_datetime": "2026-07-15 10:00:00",
  "customer_name": "Jane Doe",
  "sms_sent": true
}
```

**Error (400 Bad Request):**
```json
{
  "error": "slot_unavailable",
  "reason": "No team members available for that time slot"
}
```

**Side Effects:**
- Creates appointment in MySQL
- Creates GHL appointment (via GHL API)
- Creates Google Calendar event
- Sends SMS to assigned team member via Twilio
- Updates round robin state in `settings` table

---

### Get Appointment

**GET** `/api/appointments/:id`

Get details of a single appointment.

**Response:**
```json
{
  "id": 42,
  "ghl_appt_id": "ghl_appt_xyz",
  "google_event_id": "gcal_evt_123",
  "team_member_id": 1,
  "assigned_to": "John",
  "customer_name": "Jane Doe",
  "customer_email": "jane@example.com",
  "customer_phone": "+15551234567",
  "start_datetime": "2026-07-15 09:00:00",
  "end_datetime": "2026-07-15 10:00:00",
  "status": "scheduled",
  "source": "plugin",
  "notes": "Customer notes",
  "created_at": "2026-07-10 14:32:00"
}
```

---

### Reassign Appointment (Admin Only)

**PATCH** `/api/appointments/:id`

Change which team member takes an appointment.

**Auth:** JWT required (`Authorization: Bearer <token>`)

**Request Body:**
```json
{
  "team_member_id": 3
}
```

**Response:**
```json
{
  "id": 42,
  "team_member_id": 3,
  "assigned_to": "Bob",
  "sms_sent": true,
  "google_calendar_updated": true
}
```

**Side Effects:**
- Updates appointment in MySQL
- Updates GHL appointment
- Updates Google Calendar event
- Sends SMS to new team member
- Notifies old team member (optional, via SMS or note)

---

### Cancel Appointment (Public via Chatbot)

**DELETE** `/api/appointments/:id`

Cancel an appointment.

**Auth:** API Key required (`Authorization: Bearer <CHATBOT_API_KEY>`)

**Request Body:**
```json
{
  "reason": "Customer requested cancellation"
}
```

**Response:**
```json
{
  "id": 42,
  "status": "cancelled",
  "google_event_deleted": true,
  "ghl_appt_deleted": true
}
```

**Side Effects:**
- Sets status to 'cancelled' in MySQL
- Deletes from GHL
- Deletes Google Calendar event
- No SMS sent (already cancelled)

---

### Chatbot Cancel Endpoint

**POST** `/api/chatbot/cancel`

Alias for DELETE `/api/appointments/:id` (convenience for AI bot).

**Auth:** API Key required (`Authorization: Bearer <CHATBOT_API_KEY>`)

**Request Body:**
```json
{
  "appointment_id": 42
}
```

**Response:**
```json
{
  "status": "cancelled"
}
```

---

### Chatbot Reschedule Endpoint

**POST** `/api/chatbot/reschedule`

Move an appointment to a different time.

**Auth:** API Key required (`Authorization: Bearer <CHATBOT_API_KEY>`)

**Request Body:**
```json
{
  "appointment_id": 42,
  "new_date": "2026-07-16",
  "new_hour": 10
}
```

**Response:**
```json
{
  "id": 42,
  "new_datetime": "2026-07-16 10:00:00",
  "assigned_to": "John",
  "sms_sent": true
}
```

**Side Effects:**
- Updates appointment start/end times
- Reassigns if a different team member is available for new time
- Updates GHL and Google Calendar
- Sends SMS confirmation to assigned person

---

### GHL Webhook (Inbound)

**POST** `/webhooks/ghl`

GHL calls this when appointments are created/updated/deleted outside the plugin (e.g., via GHL web UI).

**Auth:** GHL signature verification (HMAC)

**Request Body (from GHL):**
```json
{
  "type": "appointment.created",
  "data": {
    "id": "ghl_appt_xyz",
    "contactId": "ghl_contact_abc",
    "status": "scheduled",
    "startTime": "2026-07-15T09:00:00Z",
    "endTime": "2026-07-15T10:00:00Z"
  }
}
```

**Response:**
```json
{
  "status": "synced"
}
```

**Side Effects:**
- Creates/updates appointment in MySQL (if not already there)
- Adds to Google Calendar (if missing)
- Assigns using round robin logic (for new appointments)
- Notifies team member via SMS

**Note:** Plugin listens but does not validate or block webhooks from GHL. Two-way sync is "eventual consistency" — the plugin catches up to GHL.

---

## Error Responses

All errors return JSON with HTTP status code.

**400 Bad Request:**
```json
{
  "error": "validation_error",
  "message": "Missing required field: customer_name"
}
```

**401 Unauthorized:**
```json
{
  "error": "unauthorized",
  "message": "Invalid or missing JWT token"
}
```

**404 Not Found:**
```json
{
  "error": "not_found",
  "message": "Appointment with id 999 does not exist"
}
```

**409 Conflict:**
```json
{
  "error": "slot_unavailable",
  "reason": "Slot is full or no team members available"
}
```

**500 Internal Server Error:**
```json
{
  "error": "internal_error",
  "message": "Database error or external service failure"
}
```

---

## Rate Limiting

Not yet implemented. Add in Phase 2 if needed.

---

## CORS

Booking widget is embedded as iframe, so CORS is configured to allow GHL domain:

```javascript
// In src/index.js
app.use(cors({
  origin: ['https://app.gohighlevel.com', 'http://localhost:3000'],
  credentials: true
}));
```

---

## Pagination

Not yet implemented. For large data sets (list all appointments), add pagination in Phase 5.

---

## Testing Endpoints

Use curl or Postman:

```bash
# Check health
curl http://localhost:3000/health

# Get availability
curl "http://localhost:3000/api/availability?date=2026-07-15"

# Book an appointment
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-07-15",
    "hour": 9,
    "customer_name": "John Test",
    "customer_email": "john@test.com",
    "customer_phone": "+15551234567"
  }'

# Cancel via chatbot (requires CHATBOT_API_KEY)
curl -X POST http://localhost:3000/api/chatbot/cancel \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"appointment_id": 42}'
```

---

## Admin Panel Endpoints (Phase 5)

These are documented in [DEVELOPMENT.md](DEVELOPMENT.md) Phase 5. They include:
- POST `/api/auth/login` — JWT token login
- GET `/api/admin/team-members` — list staff
- POST `/api/admin/team-members` — add staff
- PUT `/api/admin/team-members/:id` — edit schedule
- GET `/api/admin/appointments` — list all (with filters)
- etc.
