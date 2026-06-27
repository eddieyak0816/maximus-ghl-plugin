# Memory & Session Management Prompts

## Workspace Index
Before we start, please index the current workspace using jCodeMunch (mcp__jcodemunch__index_folder) so you can find code efficiently. Use the current working directory as the path. If it's already indexed, do an incremental update. Confirm when done.

---

## Session Start
New session starting.

Read these files before you do anything else:
1. .ai/my-preferences.md — how I want you to communicate
2. .ai/work-log.md — what's been done so far
3. .ai/errors.md — errors already solved
4. .ai/context.md — current state of the project
5. .ai/decisions.md — what's already been decided

When done, respond with:
- One sentence: where the project stands
- One sentence: what was last worked on
- One question: what are we working on today?

Nothing else.

---

## Session End Log
This session is ending. Update the project memory files.

Generate updated versions of:

1. .ai/work-log.md — new entry at the top:
   - What was completed
   - Files changed and how
   - Decisions made
   - Errors encountered
   - Anything left incomplete

2. .ai/context.md — update current state:
   - Current focus
   - What's in progress
   - What's next
   - Active blockers

3. .ai/decisions.md — add any new decisions made this session.

Output all three files in full.

---

## Log a New Error
We just solved an error. Log it to .ai/errors.md.

Use this format:
- Error title: [short descriptive title]
- Symptom: [what the developer sees]
- Root cause: [why it happened]
- Proven fix: [exact solution with code if relevant]
- Frequency estimate: High / Medium / Low

Output the full updated errors.md with this entry added.

---

## Rebuild Context From Scratch
I'm starting fresh in a new chat window and you have no memory of this project.

Read every file in the .ai/ folder.
Then read PROJECT.md and TASKS.md.

When done, give me:
- A 3-sentence summary of what this project is
- A 2-sentence summary of where it currently stands
- The top 3 things in progress or needed next

Then ask what we're working on.

---

## Update My Preferences
I want to update .ai/my-preferences.md.

New preference: [DESCRIBE WHAT YOU WANT CHANGED OR ADDED]

Check if it conflicts with anything already in the file.
If it conflicts, flag it and ask which takes priority.

Output the full updated my-preferences.md file.

---

## Weekly Memory Audit
Perform a memory audit on the .ai/ folder.

Review:
- work-log.md: Up to date? Old completed items cluttering it?
- errors.md: Any errors no longer relevant?
- context.md: Reflects actual current state?
- decisions.md: Any decisions outdated or superseded?
- my-preferences.md: Needs updating?

For each file, flag anything outdated and suggest what to remove or add.
Ask me to confirm before making any changes.
