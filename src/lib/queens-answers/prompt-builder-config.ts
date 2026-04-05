/** Categories, follow-up copy, and snippet assembly for Queen's Answers prompt builder. */

/** Optional free-text shown when this option is selected; value is woven into the prompt */
export type PromptBuilderDetailField = {
  label: string
  placeholder: string
  /** Prepended to the user’s typed text in the final prompt */
  promptLeadIn: string
}

export type PromptBuilderOption = {
  id: string
  label: string
  snippet: string
  detailField?: PromptBuilderDetailField
}

export type PromptBuilderCategory = {
  id: string
  title: string
  /** Short line that frames the category in the composed prompt */
  categoryLead: string
  followUpQuestion: string
  options: PromptBuilderOption[]
  /** Shown below primary options when this category is selected */
  refinementQuestion: string
  refinementOptions: PromptBuilderOption[]
}

export const PROMPT_BUILDER_PREFIX =
  "I'm using Queen's Answers to research a course at Queen's."

export const PROMPT_BUILDER_SUFFIX =
  "Please ground the answer in course context and typical student discussions where relevant, and call out uncertainty if sources conflict."

export const PROMPT_BUILDER_CATEGORIES: PromptBuilderCategory[] = [
  {
    id: "grades-difficulty",
    title: "Grades and difficulty",
    categoryLead:
      "I'm asking about workload, grading, and how demanding the course tends to be.",
    followUpQuestion: "What do you want to know about workload and marks?",
    options: [
      {
        id: "overall-difficulty",
        label: "Overall difficulty and time",
        snippet:
          "How hard is this course usually considered, and what's a realistic weekly time commitment?",
        detailField: {
          label: "Which course?",
          placeholder: "Course code or name (optional)",
          promptLeadIn: "I'm asking about ",
        },
      },
      {
        id: "grades-assessments",
        label: "Grades and assessments",
        snippet:
          "What do students say about grading fairness, exam weighting, and the curve if any?",
        detailField: {
          label: "Which course?",
          placeholder: "Course code or name (optional)",
          promptLeadIn: "I'm asking about ",
        },
      },
      {
        id: "easy-elective",
        label: "Easy elective / GPA booster",
        snippet:
          "Is this course seen as an easy elective or a GPA booster, or is that overstated?",
        detailField: {
          label: "Which course?",
          placeholder: "Course code or name (optional)",
          promptLeadIn: "I'm asking about ",
        },
      },
      {
        id: "struggling",
        label: "Worried about keeping up",
        snippet:
          "I'm worried about keeping up—what are the common failure points and how people got through?",
        detailField: {
          label: "Which course?",
          placeholder: "Course code or name (optional)",
          promptLeadIn: "I'm asking about ",
        },
      },
    ],
    refinementQuestion: "What else should the answer take into account?",
    refinementOptions: [
      {
        id: "g101",
        label: "I'm a first-year",
        snippet: "I'm in first year—keep advice accessible for someone new to university.",
      },
      {
        id: "g102",
        label: "Grade-focused",
        snippet: "I'm mainly focused on protecting or raising my GPA.",
      },
      {
        id: "g103",
        label: "Heavy exam weight",
        snippet: "Call out how exam-heavy or final-heavy the grading tends to be.",
      },
      {
        id: "g104",
        label: "No extra context",
        snippet: "",
      },
    ],
  },
  {
    id: "prereqs",
    title: "Prerequisites and eligibility",
    categoryLead:
      "I'm asking about prerequisites, enforcement, and whether I'm eligible to take the course.",
    followUpQuestion: "What constraint are you checking?",
    options: [
      {
        id: "strict-prereqs",
        label: "Strict prerequisites",
        snippet:
          "How strictly are the listed prerequisites enforced in practice?",
        detailField: {
          label: "Which course or program?",
          placeholder: "e.g. CHEM 112, Commerce core",
          promptLeadIn: "Context: ",
        },
      },
      {
        id: "missing-prereq",
        label: "Missing a prerequisite",
        snippet:
          "I haven't taken one of the listed prereqs—what do people say about going in anyway?",
        detailField: {
          label: "Which course or program?",
          placeholder: "e.g. COMM 151 without ECON 110",
          promptLeadIn: "Context: ",
        },
      },
      {
        id: "coreqs",
        label: "Co-requisites and program rules",
        snippet:
          "Are there co-requisites or program rules I should watch for?",
        detailField: {
          label: "Which course or program?",
          placeholder: "e.g. CISC 124 stream",
          promptLeadIn: "Context: ",
        },
      },
      {
        id: "transfer",
        label: "Transfer or exchange",
        snippet:
          "I'm coming from transfer or exchange credits—what alignment issues show up in discussions?",
        detailField: {
          label: "Relevant detail",
          placeholder: "e.g. credits from X, targeting course Y",
          promptLeadIn: "Additional context: ",
        },
      },
    ],
    refinementQuestion: "Narrow it down:",
    refinementOptions: [
      {
        id: "p101",
        label: "Faculty / program specific",
        snippet: "Frame this for my specific faculty or program requirements if possible.",
      },
      {
        id: "p102",
        label: "How to get an override",
        snippet: "Include what students say about permission or waiver paths when prereqs are an issue.",
      },
      {
        id: "p103",
        label: "Timeline pressure",
        snippet: "I'm trying to graduate on time—note any sequencing gotchas.",
      },
      {
        id: "p104",
        label: "No extra context",
        snippet: "",
      },
    ],
  },
  {
    id: "prof-quality",
    title: "Professor quality",
    categoryLead: "I'm asking about the instructor and what students typically say.",
    followUpQuestion: "What aspect matters most?",
    options: [
      {
        id: "teaching-style",
        label: "Teaching style",
        snippet:
          "Summarize the professor's teaching style: clarity, pace, and use of examples.",
        detailField: {
          label: "Which professor or course?",
          placeholder: "e.g. Dr. Smith, PSYC 100",
          promptLeadIn: "Please focus on ",
        },
      },
      {
        id: "grading-exams",
        label: "Grading and exams",
        snippet:
          "How fair are grading and exams, and what formats are people mentioning?",
        detailField: {
          label: "Which professor or course?",
          placeholder: "e.g. MATH 121 with Prof. Lee",
          promptLeadIn: "Please focus on ",
        },
      },
      {
        id: "approachability",
        label: "Approachability",
        snippet:
          "What do students say about accessibility, posting materials, and help outside class?",
        detailField: {
          label: "Which professor or course?",
          placeholder: "e.g. ENGL 100 section 002",
          promptLeadIn: "Please focus on ",
        },
      },
      {
        id: "compare-profs",
        label: "Compared to other professors",
        snippet:
          "How does this instructor compare to other professors who teach the same or similar courses?",
        detailField: {
          label: "Which professors or course?",
          placeholder: "e.g. Chen vs Kim for CISC 124",
          promptLeadIn: "I'm comparing: ",
        },
      },
    ],
    refinementQuestion: "Add a lens:",
    refinementOptions: [
      {
        id: "pf101",
        label: "For large lectures",
        snippet: "Assume a large lecture section context when relevant.",
      },
      {
        id: "pf102",
        label: "Teaching vs grading split",
        snippet: "Separate what's said about teaching quality from what's said about marking harshness.",
      },
      {
        id: "pf103",
        label: "Recent comments",
        snippet: "Emphasize patterns that show up in recent student comments if you can infer them.",
      },
      {
        id: "pf104",
        label: "No extra context",
        snippet: "",
      },
    ],
  },
  {
    id: "course-reviews",
    title: "Course reviews",
    categoryLead: "I'm asking for a structured summary of how students talk about this course.",
    followUpQuestion: "What kind of picture do you want?",
    options: [
      {
        id: "balanced",
        label: "Balanced overview",
        snippet:
          "Give a balanced overview: pros, cons, and who this course is a good fit for.",
        detailField: {
          label: "Which course?",
          placeholder: "e.g. BIOL 102",
          promptLeadIn: "The course is ",
        },
      },
      {
        id: "workload-breakdown",
        label: "Workload breakdown",
        snippet:
          "Break down workload: assignments, projects, midterms, finals, and pacing across the term.",
        detailField: {
          label: "Which course?",
          placeholder: "e.g. STAT 263",
          promptLeadIn: "The course is ",
        },
      },
      {
        id: "negatives",
        label: "Honest negatives",
        snippet:
          "Surface recurring complaints or red flags from student comments (without sensationalizing).",
        detailField: {
          label: "Which course?",
          placeholder: "e.g. PHYS 118",
          promptLeadIn: "The course is ",
        },
      },
      {
        id: "hidden-gems",
        label: "Hidden strengths",
        snippet:
          "Highlight underrated positives or 'hidden gem' aspects people mention.",
        detailField: {
          label: "Which course?",
          placeholder: "e.g. elective code or name",
          promptLeadIn: "The course is ",
        },
      },
    ],
    refinementQuestion: "Tune the review:",
    refinementOptions: [
      {
        id: "cr101",
        label: "Online vs in-person",
        snippet: "Note whether delivery format (online vs in-person) affects opinions if it comes up.",
      },
      {
        id: "cr102",
        label: "Core vs elective",
        snippet: "I'm treating this as a required core course—factor that into the takeaways.",
      },
      {
        id: "cr103",
        label: "Textbook / materials cost",
        snippet: "Mention textbook, software, or extra costs if students bring them up.",
      },
      {
        id: "cr104",
        label: "No extra context",
        snippet: "",
      },
    ],
  },
  {
    id: "compare",
    title: "Compare courses",
    categoryLead:
      "I'm comparing options and want help weighing courses or professors side by side.",
    followUpQuestion: "What comparison are you making?",
    options: [
      {
        id: "substitutes",
        label: "Similar courses / substitutes",
        snippet:
          "I'm choosing between similar courses—compare difficulty, workload, and teaching quality at a high level.",
        detailField: {
          label: "Which courses are you choosing between?",
          placeholder: "e.g. CISC 124 vs CISC 235",
          promptLeadIn: "The courses I'm comparing: ",
        },
      },
      {
        id: "electives",
        label: "Elective vs elective",
        snippet:
          "Help me pick the better elective for my goals given tradeoffs people discuss.",
        detailField: {
          label: "Which electives are you comparing?",
          placeholder: "e.g. MUSC 124, FILM 106, CLST 101",
          promptLeadIn: "The electives I want to compare: ",
        },
      },
      {
        id: "path",
        label: "Path or sequence",
        snippet:
          "Which sequence or pairing fits better for someone with my constraints (time vs depth)?",
        detailField: {
          label: "Which courses or path?",
          placeholder: "e.g. MATH 120 then 121, or a minor pairing",
          promptLeadIn: "Here's what I'm deciding between: ",
        },
      },
      {
        id: "prof-cross",
        label: "Professor comparison",
        snippet:
          "Compare professors across these options based on what students typically say.",
        detailField: {
          label: "Which professors or sections?",
          placeholder: "e.g. Smith vs Jones for BIOL 102",
          promptLeadIn: "I'm comparing: ",
        },
      },
    ],
    refinementQuestion: "How should I compare them?",
    refinementOptions: [
      {
        id: "c101",
        label: "Time commitment first",
        snippet: "Prioritize comparing workload and time demands, then other factors.",
      },
      {
        id: "c102",
        label: "Easier path",
        snippet: "Lean toward whichever option is usually described as the easier or less risky path.",
      },
      {
        id: "c103",
        label: "Learning depth",
        snippet: "Prioritize depth of learning and engagement over ease.",
      },
      {
        id: "c104",
        label: "No extra context",
        snippet: "",
      },
    ],
  },
]

export const PROMPT_BUILDER_DEFAULT_CATEGORY_ID = PROMPT_BUILDER_CATEGORIES[0].id

export function getCategoryById(id: string): PromptBuilderCategory | undefined {
  return PROMPT_BUILDER_CATEGORIES.find((c) => c.id === id)
}

export function buildOptionDetailClause(
  option: PromptBuilderOption | undefined,
  rawDetail: string
): string {
  const trimmed = rawDetail.trim()
  if (!option?.detailField || !trimmed) return ""
  return `${option.detailField.promptLeadIn}${trimmed}`.trim()
}

export function composePrompt(
  categoryId: string | null,
  optionId: string | null,
  refinementId: string | null = null,
  optionDetailText: string = ""
): string {
  if (!categoryId || !optionId) return ""
  const category = getCategoryById(categoryId)
  const option = category?.options.find((o) => o.id === optionId)
  if (!category || !option) return ""

  const detailClause = buildOptionDetailClause(option, optionDetailText)

  const refinement = refinementId
    ? category.refinementOptions.find((r) => r.id === refinementId)
    : undefined
  const refinementText = refinement?.snippet?.trim() ?? ""

  const parts = [
    PROMPT_BUILDER_PREFIX,
    category.categoryLead,
    option.snippet,
    ...(detailClause ? [detailClause] : []),
    ...(refinementText ? [refinementText] : []),
    PROMPT_BUILDER_SUFFIX,
  ]
  return parts.join(" ").replace(/\s+/g, " ").trim()
}

/** Multiline preview for the read-only preview UI */
export function composePromptPreview(
  categoryId: string | null,
  optionId: string | null,
  refinementId: string | null = null,
  optionDetailText: string = ""
): string {
  const flat = composePrompt(categoryId, optionId, refinementId, optionDetailText)
  if (!flat) return ""
  const category = categoryId ? getCategoryById(categoryId) : undefined
  const option = category?.options.find((o) => o.id === optionId)
  if (!category || !option) return flat
  const detailClause = buildOptionDetailClause(option, optionDetailText)
  const refinement = refinementId
    ? category.refinementOptions.find((r) => r.id === refinementId)
    : undefined
  const refinementText = refinement?.snippet?.trim() ?? ""
  const bodyLines = [category.categoryLead, option.snippet]
  if (detailClause) bodyLines.push(detailClause)
  if (refinementText) bodyLines.push(refinementText)
  const body = bodyLines.join("\n")
  return [PROMPT_BUILDER_PREFIX, body, PROMPT_BUILDER_SUFFIX].join("\n\n")
}
