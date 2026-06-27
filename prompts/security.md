# Security Prompts

## Harden an API Route
Harden this API route against common attacks: [FILE PATH]

Apply:
- Input validation with Zod (reject unknown fields)
- Rate limiting: [N] requests per [window] per [IP / user]
- Authentication check before any logic runs
- Authorization check (does this user own this resource?)
- Output sanitization (no internal error details to client)
- Request size limits
- SQL injection prevention (parameterized queries only)

Output the fully hardened route file.

---

## OWASP Security Audit
Audit [FILE PATH or FEATURE] for security vulnerabilities.

Check against OWASP Top 10:
1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, command, LDAP)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable and Outdated Components
7. Identification and Authentication Failures
8. Software and Data Integrity Failures
9. Security Logging and Monitoring Failures
10. Server-Side Request Forgery

For each issue found:
- Severity: Critical / High / Medium / Low
- Specific line or pattern that's vulnerable
- Exact fix

Output findings first. Then ask if I want you to apply all fixes.

---

## Implement Row-Level Security
Implement row-level security for [RESOURCE/TABLE].

Rules:
- Users can only [read/write/delete] their own [RESOURCE]
- Admins can [read/write/delete] all [RESOURCE]
- [Any other rules]

Database: [Supabase RLS policies / application-layer checks]

Generate:
- The RLS policies (if Supabase)
- The service layer checks (if application-layer)
- Tests that verify each rule is enforced

---

## Full Code Review
Review this code as a senior engineer: [FILE PATH or PASTE CODE]

Evaluate:
- Correctness — does it do what it claims?
- Security — any vulnerabilities or data exposure risks?
- Performance — any obvious bottlenecks?
- Maintainability — will a junior engineer understand this in 6 months?
- Missing tests or edge cases

Format your review as:
🔴 Critical (must fix)
🟡 Important (should fix)
🟢 Minor (nice to have)

After the review, ask if I want you to apply the fixes.

---

## Accessibility Audit
Audit [COMPONENT FILE or PAGE] for accessibility issues.

Check against WCAG 2.1 AA:
- All images have meaningful alt text
- Interactive elements are keyboard navigable
- Focus order is logical
- Color contrast meets requirements
- Form inputs have associated labels
- Error messages are announced to screen readers
- Modals/dialogs trap focus correctly

List each issue. Then output the fully corrected file.
