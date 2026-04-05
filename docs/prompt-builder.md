# Queen's Answers — Prompt Builder

## Purpose

The Prompt Builder helps students compose clearer questions for the Queen's Answers composer (`/queens-answers`). It lives as a gold **hammer** action to the **left** of the main input pill.

## UX

- **Open:** Click the round yellow button (build / hammer icon). A **popover** opens **above** the composer (Radix Popover, portaled).
- **Header:** Title "Prompt Builder", subtitle "Use me to get the best responses to your questions.", **close** (X) top-right.
- **Categories:** Horizontal scroll of chips — Grades and difficulty, Prerequisites and eligibility, Professor quality, Course reviews, Compare courses.
- **Follow-up:** Each category shows a short question and **selectable cards** (label + snippet). One option per category at a time; changing category clears the option.
- **Preview:** Multiline read-only preview of the composed prompt (`aria-live="polite"`).
- **Use prompt:** Inserts the **flattened** prompt into the main question field and closes the popover. Focus moves to the question input (via `onCloseAutoFocus` + ref).

## Interaction with the rest of the page

- Opening the builder **closes** "How it works" if it was open.
- Opening "How it works" **closes** the builder (`useEffect` on `showHowItWorks`).
- While "How it works" is open, the whole composer row (including the builder button) is **inert** / blurred like before.
- **Auth:** Same as the input — unauthenticated users can open the builder and insert text; focus/submit on the field still triggers the sign-in flow.

## Prompt composition

- **Config:** [`src/lib/queens-answers/prompt-builder-config.ts`](../src/lib/queens-answers/prompt-builder-config.ts) — categories, `categoryLead`, `followUpQuestion`, options (`label` + `snippet`), `PROMPT_BUILDER_PREFIX` / `SUFFIX`, `composePrompt()`, `composePromptPreview()`.
- **Insert string:** `composePrompt(categoryId, optionId)` — single-line style (normalized spaces) for the `<input>`.
- **Preview:** `composePromptPreview(...)` — prefix, category lead + snippet, suffix separated by blank lines.

## Implementation map

| Piece | Location |
|--------|----------|
| UI (popover, chips, preview, CTA) | [`src/components/queens-answers/prompt-builder-panel.tsx`](../src/components/queens-answers/prompt-builder-panel.tsx) |
| Copy + composition helpers | [`src/lib/queens-answers/prompt-builder-config.ts`](../src/lib/queens-answers/prompt-builder-config.ts) |
| Composer layout + state wiring | [`src/app/queens-answers/page.tsx`](../src/app/queens-answers/page.tsx) |

## Future ideas (out of scope for v1)

- `sessionStorage` for last selections
- Multi-select options
- Inline course code picker
