# Testing Prompts

## Write Unit Tests
Write unit tests for [FILE PATH or FUNCTION NAME].
Testing framework: [Vitest / Jest]

Cover:
- The happy path
- All edge cases you can identify
- Error conditions and invalid inputs
- Boundary values

Do not mock what doesn't need to be mocked.
Test names format: "should [expected behavior] when [condition]"
Output the full test file.

---

## Write Integration Tests
Write integration tests for [API ROUTE / SERVER ACTION].
Testing framework: [Vitest / Jest + Supertest]

Test these scenarios:
- Valid input → expected response
- Invalid input → proper validation error
- Unauthenticated request → 401
- Unauthorized request → 403
- [Any domain-specific edge cases]

Use a test database, not production.
Output the full test file.

---

## Write E2E Tests
Write Playwright end-to-end tests for the [FLOW NAME] user flow.

Flow steps:
1. [Step one]
2. [Step two]
3. [Step three]

Requirements:
- Page object model pattern
- Assert on visible outcomes, not implementation details
- Handle async properly — no arbitrary waits
- Test both happy path and one critical failure path

Output the full spec file and any page object files needed.

---

## Audit Test Coverage
Review the tests in [FILE PATH or /tests/ directory].

Identify:
- Functions or branches with no test coverage
- Tests that test implementation details instead of behavior
- Tests that could produce false positives
- Missing edge cases for existing tests

For each gap, write the missing test.
Output a summary of findings, then the new test cases.
