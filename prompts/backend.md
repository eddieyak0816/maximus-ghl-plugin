# Backend Prompts

## Build a Feature From a Spec
```markdown
# Backend Prompts

## Build a Feature From a Spec
Read specs/[SPEC-FILE].md in full.
Build this feature end to end in this order:
1. Types and interfaces first
2. Database layer (queries/mutations)
3. Service layer (business logic)
4. API layer (routes or server actions)
5. UI components
6. Hook or state management (if needed)
7. Tests

Output each file in full, labeled with its file path.

---

## Build an API Route / Server Action
Build a [server action / API route] for [DESCRIBE WHAT IT DOES].

Requirements:
- Validate all inputs with Zod before any logic runs
- Return typed responses — never raw throws to the client
- Handle these specific error cases: [LIST THEM]
- Log errors appropriately (never log sensitive data)

Output the full file including the Zod schema, the handler, and the TypeScript return type.

---

## Build a Database Query / Mutation
Write the database layer for [DESCRIBE OPERATION].
Use [Drizzle / Prisma] following patterns already in /lib/db/.

Include:
- The query or mutation function, fully typed
- Input validation
- Error handling
- A JSDoc comment explaining what it does

Data access only. No business logic here.
Output the full function.

---

## Design a Service Layer Module
Build the service layer module for [DOMAIN NAME].

This module should:
- Contain all business logic for this domain
- Call db functions from /lib/db/ — never query directly
- Return typed Result objects (not raw throws)
- Be fully independent of the UI layer

Functions needed: [list each function]
Output the full service file.

---

## Build Webhook Handler
Build a webhook handler for [SERVICE].

Requirements:
- Verify the webhook signature before processing anything
- Parse and type the event payload
- Handle these specific events: [LIST EVENTS]
- Be idempotent — handle duplicate events safely
- Log events with context, never log sensitive data

Output the full handler file.

---

## Build a Background Job
Build a background job for [JOB NAME].
What it does: [DESCRIBE]
Trigger: [cron / queue event / manual]
Queue system: [BullMQ / Inngest / other]

Requirements:
- Retry logic with exponential backoff: max [N] attempts
- Structured logging at start, success, and failure
- Timeout after [N] seconds
- Idempotency key: [describe]

Output the full job file.

---

## Build Auth Middleware
Build auth middleware for [DESCRIBE WHAT IT PROTECTS].
Auth system: [Supabase / Better Auth / NextAuth / Clerk]

Requirements:
- Validate session on every protected request
- Return 401 for unauthenticated requests
- Return 403 for unauthorized requests
- Handle these role/permission checks: [LIST THEM]

Output the full middleware file and a usage example.

---

## Build an Email Template
Build an email for [EMAIL NAME / TRIGGER].
Email system: [Resend / Postmark / SendGrid]

Content:
- Subject: [SUBJECT]
- Purpose: [WHAT THIS EMAIL COMMUNICATES]
- Key data it includes: [LIST DATA POINTS]

Requirements:
- React Email template
- Plain text fallback
- Typed send function

Output the template file and the send function separately.

---

## Generate Full CRUD Module
Generate a complete CRUD module for [RESOURCE NAME]:
- Database schema / migration
- TypeScript types
- DB query functions (getAll, getById, create, update, delete)
- Service layer functions
- Server actions or API routes
- Form component (create + edit, shared)
- List component with loading and empty states
- Delete confirmation dialog

Output all files in full, labeled by file path.

``` 

Output the full middleware file and a usage example.

---

## Build an Email Template
Build an email for [EMAIL NAME / TRIGGER].
Email system: [Resend / Postmark / SendGrid]

Content:
- Subject: [SUBJECT]
- Purpose: [WHAT THIS EMAIL COMMUNICATES]
- Key data it includes: [LIST DATA POINTS]

Requirements:
- React Email template
- Plain text fallback
- Typed send function

Output the template file and the send function separately.

---

## Generate Full CRUD Module
Generate a complete CRUD module for [RESOURCE NAME]:
- Database schema / migration
- TypeScript types
- DB query functions (getAll, getById, create, update, delete)
- Service layer functions
- Server actions or API routes
- Form component (create + edit, shared)
- List component with loading and empty states
- Delete confirmation dialog

Output all files in full, labeled by file path.
