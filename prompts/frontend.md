# Frontend Prompts

## Build a Page Layout
```markdown
# Frontend Prompts

## Build a Page Layout
Build the [PAGE NAME] page layout.
- Responsive: mobile-first, breakpoints at sm/md/lg
- Tailwind utility classes only — no custom CSS unless unavoidable
- Use components from /components/ where they already exist
- Server component unless client interaction is required
Output the full page file with its path labeled.

---

## Build a Form
Build a fully functional [FORM NAME] form.

Fields:
- [Field name]: [type], [required/optional], [validation rules]

Requirements:
- Client-side validation with Zod + React Hook Form
- Inline error messages per field
- Disabled submit state while submitting
- Success state after submission
- Error state if server returns an error
- Accessible: proper labels, aria-invalid, error announcements

Connect to this server action / endpoint: [NAME OR PATH]
Output the full component file.

---

## Build a Data Table
Build a data table for [RESOURCE NAME].

Features needed:
- Sorting by column
- Filtering / search
- Pagination (server-side or client-side: [specify])
- Row selection
- Loading skeleton
- Empty state
- Actions per row: [list actions]

Data shape: [paste your TypeScript type here]
Output the full component.

---

## Build a Dashboard Widget
Build a [WIDGET NAME] dashboard widget.
It displays: [describe the data it shows]
Data source: [API endpoint, server action, or prop]

Include:
- Loading skeleton
- Error state with retry option
- Empty state with helpful message
- The actual data display

Output the full component file.

---

## Improve UI/UX of Existing Component
Review this component: [FILE PATH or PASTE]

Identify and fix:
- Accessibility issues (ARIA, keyboard nav, focus management)
- Missing loading / error / empty states
- Poor mobile behavior
- Unnecessary re-renders
- Any TypeScript weaknesses

Explain what you changed and why before outputting.
Then output the full improved file.

---

## Add Animation / Interaction
Add [ANIMATION TYPE] to this component: [FILE PATH]
Use [Framer Motion / CSS transitions].
Respect prefers-reduced-motion.
Output the full updated component file.

---

## Responsive Design Fix
Make this layout fully responsive for mobile, tablet, and desktop.
File: [FILE PATH]
Current problem: [describe what's broken]
Use Tailwind breakpoints (sm / md / lg / xl).
Output the full corrected file.

``` 
