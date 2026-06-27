# Documentation Prompts

## Document a Module
Write documentation for [FILE PATH or MODULE].

Include:
- A clear overview of what this module does and why it exists
- JSDoc on every exported function (params, return type, example)
- Inline comments on non-obvious logic only
- A usage example at the top showing the most common use case

Do not over-document simple things.
Every comment should add information not obvious from the code.
Output the fully documented file.

---

## Generate a README
Generate a complete README.md for this project.

Include:
- Project name and one-paragraph description
- Key features (bullet list)
- Tech stack
- Prerequisites
- Getting started (clone, install, env setup, run)
- Project structure overview
- Available scripts
- How to run tests
- Environment variables reference
- Contributing guide (brief)

Write for a developer who has never seen this codebase.

---

## Write an Architecture Decision Record (ADR)
Write an ADR for this decision:

Decision: [DESCRIBE THE DECISION]
Context: [Why was this needed?]
Options considered: [What alternatives were evaluated?]
Decision made: [What was chosen and why?]
Consequences: [Trade-offs — what becomes easier, what becomes harder?]

Format as markdown ready to save in docs/decisions/[decision-name].md

---

## Generate API Documentation
Generate API documentation for [ROUTE FILE or ENDPOINT].

For each endpoint, document:
- Method and path
- Description
- Authentication required
- Request body schema (with types, required vs optional)
- Query parameters
- Response schema for success
- Response schema for each error case
- A curl example

Format as Markdown.

---

## Generate Mermaid Diagram
Generate a Mermaid diagram for [DESCRIBE WHAT TO DIAGRAM].

Diagram type options:
- System architecture → graph TD or LR
- Data / request flow → sequenceDiagram
- Database schema → erDiagram
- User flow → flowchart
- State machine → stateDiagram-v2

Output the raw Mermaid code block, ready to paste.
