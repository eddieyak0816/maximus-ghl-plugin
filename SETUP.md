# Developer Setup Guide

How to get the GHL plugin running locally.

---

## Prerequisites

- **Node.js** v16+ (use `node --version` to check)
- **npm** v7+ (included with Node.js)
- **MySQL** 5.7+ running locally or accessible
- **Git**

---

## Step 1: Clone & Install

```bash
# Clone the repo
git clone <repo-url>
cd "g:\My Drive\Maximus Digital Marketing\GHL Plugin"

# Install dependencies
npm install
```

---

## Step 2: Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Node
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=ghl_plugin

# External Services
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE=+1234567890

GOOGLE_CALENDAR_ID=your-shared-calendar-id@group.calendar.google.com
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token

GHL_API_KEY=your-ghl-key
GHL_LOCATION_ID=your-location-id

# Auth
JWT_SECRET=generate-a-random-string
CHATBOT_API_KEY=generate-a-shared-secret
```

**Note:** Keep `.env` local (in `.gitignore`) — never commit secrets.

---

## Step 3: Database Setup

Create the database:

```bash
mysql -u root -p -e "CREATE DATABASE ghl_plugin;"
```

Run migrations:

```bash
npm run migrate
```

Seed sample data (optional, for testing):

```bash
npm run seed
```

Verify tables exist:

```bash
mysql -u root -p ghl_plugin -e "SHOW TABLES;"
```

You should see 7 tables: `users`, `team_members`, `team_member_schedules`, `team_member_blackouts`, `hourly_slot_limits`, `appointments`, `settings`.

---

## Step 4: Run the Server

```bash
npm run dev
```

You should see:

```
Server running on http://localhost:3000
Database connected
```

---

## Step 5: Test the API

Open another terminal:

```bash
# Check health
curl http://localhost:3000/health

# Get availability for a date
curl "http://localhost:3000/api/availability?date=2026-07-15&hour=9"
```

---

## Troubleshooting

### Database connection fails
- Ensure MySQL is running: `mysql -u root -p -e "SELECT 1;"`
- Check `.env` DB_HOST, DB_USER, DB_PASSWORD
- Verify the database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port 3000 already in use
- Change `PORT` in `.env`, or kill the process:
  ```bash
  lsof -i :3000  # find the PID
  kill -9 <PID>
  ```

### npm install fails
- Delete `node_modules` and `package-lock.json`, then retry:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Migration fails
- Ensure database exists and `.env` is correct
- Check MySQL logs: `mysql -u root -p -e "SHOW ENGINE INNODB STATUS;"`
- Run migrations manually if needed (see `src/db/migrate.js`)

---

## Next Steps

1. See [DEVELOPMENT.md](DEVELOPMENT.md) for the current phase
2. See [API.md](API.md) to understand endpoints
3. See [DATABASE.md](DATABASE.md) for the schema

---

## File Structure

```
src/
├── index.js           # Entry point, Express setup
├── db/
│   ├── schema.sql     # Table definitions
│   └── migrate.js     # Migration runner
├── routes/
│   ├── availability.js
│   ├── appointments.js
│   ├── chatbot.js
│   └── admin.js
├── services/
│   ├── roundRobin.js
│   ├── slotChecker.js
│   ├── ghlClient.js
│   ├── googleCalClient.js
│   └── smsService.js
├── webhooks/
│   └── ghl.js
├── middleware/
│   ├── auth.js        # JWT auth
│   └── apiKey.js      # Chatbot API key auth
└── utils/
    └── logger.js

public/
├── widget/            # Booking widget React build
└── admin/             # Admin panel React build
```

---

## Commands

```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build React apps (widget + admin)
npm run migrate          # Run DB migrations
npm run seed             # Seed sample data
npm test                 # Run tests (when added)
npm run lint             # Check code style
npm run format           # Auto-format code
```
