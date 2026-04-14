# Queen's Answers — Prompt Builder

## Purpose

The Prompt Builder helps students compose clearer questions for the Queen's Answers composer (`/queens-answers`). It lives as a gold **hammer** action to the **left** of the main input pill.

## UX

- **Open:** Click the round yellow button (build / hammer icon). A **popover** opens **above** the composer (Radix Popover, portaled).
- **Header:** Title "Prompt Builder", subtitle "Use me to get the best responses to your questions.", **close** (X) top-right.
- **Categories:** Wrapped chips (no horizontal scroll) — Grades and difficulty, Prerequisites and eligibility, Professor quality, Course reviews, Compare courses.
- **Primary follow-up:** A short question plus a **two-column grid** (on `sm+`) of selectable cards (label + snippet). One primary selection; changing category clears primary and refinement.
- **Refinement (dynamic):** Below the primary block, each category shows an extra question and **wrapped pill chips** (optional). Choosing a category updates this block (`key={category.id}`). Refinements tweak the composed prompt when they carry snippet text; “No extra context” adds nothing.
- **Preview:** Multiline read-only preview with natural wrapping. The preview itself does **not** create a nested scroll area, but the panel body can scroll if the full builder would otherwise exceed the viewport.
- **Use prompt:** Inserts the **flattened** prompt into the main question field and closes the popover. Focus moves to the question input (via `onCloseAutoFocus` + ref).

## Interaction with the rest of the page

- Opening the builder **closes** "How it works" if it was open.
- Opening "How it works" **closes** the builder (`useEffect` on `showHowItWorks`).
- While "How it works" is open, the whole composer row (including the builder button) is **inert** / blurred like before.
- **Auth:** Same as the input — unauthenticated users can open the builder and insert text; focus/submit on the field still triggers the sign-in flow.

## Prompt composition

- **Config:** [`src/lib/queens-answers/prompt-builder-config.ts`](../src/lib/queens-answers/prompt-builder-config.ts) — categories, `categoryLead`, `followUpQuestion`, options (`label`, `snippet`, optional `detailField` with `label` / `placeholder` / `promptLeadIn`), refinements, `PROMPT_BUILDER_PREFIX` / `SUFFIX`, `composePrompt()`, `composePromptPreview()`, `buildOptionDetailClause()`.
- **Optional detail text:** Many primary options define a `detailField`; when one is selected, a text input appears under the grid. Typed text is appended after the option snippet using `promptLeadIn` (e.g. elective vs elective → “The electives I want to compare: …”).
- **Insert string:** `composePrompt(categoryId, optionId, refinementId?, optionDetailText?)` — normalized to a single line when inserted into the composer (the composer itself is a multi-line textarea).
- **Preview:** `composePromptPreview(...)` — prefix, body (category lead + primary snippet [+ detail clause] [+ refinement]), suffix separated by blank lines.

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
