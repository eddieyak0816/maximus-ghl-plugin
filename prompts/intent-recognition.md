# Intent Recognition Prompts

## Classify User Intent
Classify the intent of this user message: "[PASTE MESSAGE]"

Return:
- Intent label (e.g. "question", "command", "complaint", "greeting", "clarification")
- Confidence (high / medium / low)
- One-line reason

Keep it short. No extra explanation.

---

## Design an Intent Schema
Design an intent classification schema for a [TYPE OF APP] assistant.

Include:
- A list of intent categories (8–15 intents)
- A short description of each intent
- 2–3 example phrases per intent
- Which intents are most likely to overlap and why

Output as a markdown table.

---

## Generate Training Examples
Generate [N] training examples for the intent: "[INTENT NAME]"

Rules:
- Vary sentence length and phrasing
- Include formal and casual variations
- Avoid repeating the same keywords
- Format: one example per line, no numbering

---

## Handle Ambiguous Intent
The user said: "[PASTE MESSAGE]"

This could mean multiple things. Help me:
- List 2–3 possible intents
- Rank them by likelihood given the context: [DESCRIBE CONTEXT]
- Suggest a clarifying question to ask the user

---

## Build an Intent Router
Build an intent router function in [TypeScript / Python].

Intents to handle:
- [INTENT 1]: [what to do]
- [INTENT 2]: [what to do]
- [INTENT 3]: [what to do]

Input: a plain-text user message
Output: call the right handler function based on detected intent

Use keyword matching as a fallback if confidence is low.
Keep it under 60 lines.

---

## Evaluate Intent Accuracy
I have a set of test messages with expected intents.
[PASTE TEST SET]

For each, tell me:
- Predicted intent (your best guess)
- Match: yes or no
- If wrong, what intent was it likely confused with?

Output as a table.
