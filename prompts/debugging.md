```markdown
# Debugging Prompts

## Fix a Bug
Diagnose the root cause first. Explain it clearly.
Then output the fix as a full file.
Do not change anything unrelated to the bug.

What should happen: [describe expected behavior]
What is actually happening: [describe actual behavior]
Error message (if any): [paste error]
Relevant files: [reference file paths or paste code]
What I've already tried: [list anything already attempted]

---

## Fix TypeScript Errors
Fix all TypeScript errors in [FILE PATH].
- Do not use `any` to silence errors — solve them properly
- Do not change function signatures unless genuinely wrong
- Explain why each error occurred before fixing it
Output the full corrected file.

---

## Performance Investigation
This [component / API route / query] is too slow.
Current behavior: [e.g. "takes 4 seconds to load"]
Target behavior: [e.g. "should load in under 500ms"]
Relevant code: [reference file path or paste]

Investigate and identify:
- The primary bottleneck
- Any N+1 query problems
- Unnecessary re-renders or recomputations
- Missing indexes or caching opportunities

Propose a fix with explanation. Then output the fixed file.

---

## Fix a Failing Test
This test is failing and I need to understand why.
Test file: [FILE PATH]
Test name: "[TEST NAME]"
Failure output: [PASTE OUTPUT]
The code it tests: [FILE PATH]

Diagnose why the test is failing.
Is the test wrong, or is the code wrong?
Fix whichever is incorrect.
Output both files if both need changes.

``` 
