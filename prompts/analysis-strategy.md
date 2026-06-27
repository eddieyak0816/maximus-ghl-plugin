# Analysis & Strategy Prompts

## Pros/Cons Technology Decision
Analyze pros and cons of [TECH A] vs [TECH B] for this specific use case:
[DESCRIBE YOUR USE CASE]

Consider:
- Performance characteristics
- Developer experience
- Community and ecosystem maturity
- Long-term maintainability
- Fit with existing stack
- Learning curve

Format as a comparison table.
Then give me a direct recommendation in one sentence. No hedging.

---

## Q&A Clarification Mode
Q&A MODE: [DESCRIBE THE TASK YOU WANT DONE]

Ask me clarifying questions before writing any code.
Maximum 3 questions per round.
When you have enough information, say "Ready to build. Confirm?"
Then wait for me to say "go" before proceeding.

---

## Stepwise Task Breakdown
STEP MODE: [DESCRIBE THE COMPLEX TASK]

Break this into individual steps. For each step:
- Step name
- What it does
- Files it will create or modify
- Complexity: Simple / Medium / Complex

Present all steps first. Wait for my approval.
Then execute one step at a time. Wait for me to say "next" before continuing.

---

## Create a Feature Spec
I need to build [FEATURE NAME].
Create a structured spec file at specs/[feature-name].md

Include:
- Overview (what and why)
- Acceptance criteria (how we know it's done)
- Technical requirements
- Data model changes needed
- API / server actions needed
- UI components needed
- Edge cases to handle
- Out of scope
- Dependencies (what must be done first)

---

## Break Down a Large Task
TASK-[ID] is too large for one session.

Break it into subtasks that:
- Each take 30-60 minutes max
- Are independently completable
- Have a clear done state
- Are ordered by dependency

Output the subtask list. Then ask which one to start with.

---

## Generate Architecture Diagram
Generate a Mermaid diagram for [DESCRIBE WHAT TO DIAGRAM].
Base it on the actual codebase structure.
Output the raw Mermaid code block ready to paste into docs/architecture.md.

---

## Batch Processing Script
Build a script to process [DATA TYPE] in batch.
Process description: [WHAT NEEDS TO HAPPEN TO EACH ITEM]

Requirements:
- Handle large volumes efficiently (streaming or chunking)
- Progress reporting
- Error handling per item — one failure should not stop the whole batch
- Retry logic for transient failures
- Summary report at completion (processed, failed, skipped)

Output the full script.
