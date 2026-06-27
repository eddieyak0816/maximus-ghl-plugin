# Task Management & Utility Prompts

## Generate TypeScript Types From a Schema
Generate TypeScript types from [database schema / JSON / API response / Zod schema].
Source: [PASTE THE SCHEMA]

Generate:
- Base type (all fields)
- Insert type (omit auto-generated fields like id, createdAt)
- Update type (all fields optional)
- Select type (public API response — omit sensitive fields)

Output as a single types file at /types/[name].ts

---

## Build a CLI Script
Build a CLI script for [DESCRIBE WHAT IT DOES].
Runtime: [Node.js / Bun / Python]

The script should:
- [Step 1]
- [Step 2]
- Accept these flags/arguments: [list them]
- Validate arguments before running
- Show progress during long operations
- Output a clear success or failure summary

Output the full script and the package.json script entry.

---

## Generate Mock Data / Seed Script
Generate a database seed script for development and testing.
Using: [Faker.js / custom static data]

Generate realistic seed data for:
- [TABLE/RESOURCE]: [N] records with these constraints: [list rules]

Requirements:
- Respects foreign key relationships
- Creates at least one admin user and one regular user
- Idempotent — safe to run multiple times
- Logs what it creates

Output the full seed script.

---

## Explain This Code
Explain [FILE PATH or PASTE CODE] to me.

I want to understand:
- What is the overall purpose of this code?
- Walk me through it step by step
- What are the non-obvious parts and why are they done that way?
- What would break if I changed [SPECIFIC PART]?
- Are there any known limitations or gotchas?

No code output — just a clear explanation.

---

## Migrate Between Technologies
Migrate [FILE PATH or PASTE CODE] from [SOURCE TECH] to [TARGET TECH].

Rules:
- Preserve all existing functionality exactly
- Use idiomatic patterns for the target — don't translate literally
- Flag anything that has no clean equivalent

Explain the key differences in approach before outputting.
Then output the full migrated file.
