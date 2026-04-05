/** Categories, follow-up copy, and snippet assembly for Queen's Answers prompt builder. */

export type PromptBuilderOption = {
  id: string
  label: string
  snippet: string
}

export type PromptBuilderCategory = {
  id: string
  title: string
  /** Short line that frames the category in the composed prompt */
  categoryLead: string
  followUpQuestion: string
  options: PromptBuilderOption[]
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
      },
      {
        id: "grades-assessments",
        label: "Grades and assessments",
        snippet:
          "What do students say about grading fairness, exam weighting, and the curve if any?",
      },
      {
        id: "easy-elective",
        label: "Easy elective / GPA booster",
        snippet:
          "Is this course seen as an easy elective or a GPA booster, or is that overstated?",
      },
      {
        id: "struggling",
        label: "Worried about keeping up",
        snippet:
          "I'm worried about keeping up—what are the common failure points and how people got through?",
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
      },
      {
        id: "missing-prereq",
        label: "Missing a prerequisite",
        snippet:
          "I haven't taken one of the listed prereqs—what do people say about going in anyway?",
      },
      {
        id: "coreqs",
        label: "Co-requisites and program rules",
        snippet:
          "Are there co-requisites or program rules I should watch for?",
      },
      {
        id: "transfer",
        label: "Transfer or exchange",
        snippet:
          "I'm coming from transfer or exchange credits—what alignment issues show up in discussions?",
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
      },
      {
        id: "grading-exams",
        label: "Grading and exams",
        snippet:
          "How fair are grading and exams, and what formats are people mentioning?",
      },
      {
        id: "approachability",
        label: "Approachability",
        snippet:
          "What do students say about accessibility, posting materials, and help outside class?",
      },
      {
        id: "compare-profs",
        label: "Compared to other professors",
        snippet:
          "How does this instructor compare to other professors who teach the same or similar courses?",
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
      },
      {
        id: "workload-breakdown",
        label: "Workload breakdown",
        snippet:
          "Break down workload: assignments, projects, midterms, finals, and pacing across the term.",
      },
      {
        id: "negatives",
        label: "Honest negatives",
        snippet:
          "Surface recurring complaints or red flags from student comments (without sensationalizing).",
      },
      {
        id: "hidden-gems",
        label: "Hidden strengths",
        snippet:
          "Highlight underrated positives or 'hidden gem' aspects people mention.",
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
      },
      {
        id: "electives",
        label: "Elective vs elective",
        snippet:
          "Help me pick the better elective for my goals given tradeoffs people discuss.",
      },
      {
        id: "path",
        label: "Path or sequence",
        snippet:
          "Which sequence or pairing fits better for someone with my constraints (time vs depth)?",
      },
      {
        id: "prof-cross",
        label: "Professor comparison",
        snippet:
          "Compare professors across these options based on what students typically say.",
      },
    ],
  },
]

export const PROMPT_BUILDER_DEFAULT_CATEGORY_ID = PROMPT_BUILDER_CATEGORIES[0].id

export function getCategoryById(id: string): PromptBuilderCategory | undefined {
  return PROMPT_BUILDER_CATEGORIES.find((c) => c.id === id)
}

export function composePrompt(categoryId: string | null, optionId: string | null): string {
  if (!categoryId || !optionId) return ""
  const category = getCategoryById(categoryId)
  const option = category?.options.find((o) => o.id === optionId)
  if (!category || !option) return ""
  return [
    PROMPT_BUILDER_PREFIX,
    category.categoryLead,
    option.snippet,
    PROMPT_BUILDER_SUFFIX,
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

/** Multiline preview for the read-only preview UI */
export function composePromptPreview(categoryId: string | null, optionId: string | null): string {
  const flat = composePrompt(categoryId, optionId)
  if (!flat) return ""
  const category = categoryId ? getCategoryById(categoryId) : undefined
  const option = category?.options.find((o) => o.id === optionId)
  if (!category || !option) return flat
  return [
    PROMPT_BUILDER_PREFIX,
    `${category.categoryLead}\n${option.snippet}`,
    PROMPT_BUILDER_SUFFIX,
  ].join("\n\n")
}
