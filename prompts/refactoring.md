# Refactoring Prompts

## Refactor a File
Refactor [FILE PATH].

Goals:
- [e.g. Reduce complexity / split into smaller functions / improve readability]

Hard rules:
- Do not change external behavior
- Do not change function signatures called by other files
- Keep the same file path and export names
- All existing tests must still pass

Explain what you're changing and why before outputting.
Then output the full refactored file.

---

## Split a Large File
[FILE PATH] has grown too large and needs to be split.
Current responsibility: [describe what the file currently does]

Propose a clean split:
- How many files should it become?
- What is the single responsibility of each new file?
- What are the new file paths?

Wait for my approval of the structure.
Then output each new file in full, plus updated imports in any files that reference the old one.

---

## Eliminate Code Duplication
I have duplicated logic across these files:
- [FILE A]
- [FILE B]
- [FILE C]

Identify the shared logic.
Design a single shared utility, hook, or service that replaces all instances.

Rules:
- The shared code goes in: [suggest path or let AI suggest]
- All original files should import from it
- Do not break any existing behavior

Output: the new shared file + all updated files that use it.

---

## Upgrade Patterns Across Codebase
We've decided to [DESCRIBE PATTERN CHANGE].

Affected files: [list them, or say "all files in /app/"]

For each affected file:
1. Identify what needs to change
2. Apply the new pattern
3. Output the updated file

Start with [FILE NAME] first.
I'll review and confirm before you continue.
