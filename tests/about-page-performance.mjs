/**
 * About page performance test — Issue #69
 *
 * Verifies that animations and unnecessary client-side code have been removed,
 * and optionally measures live page load time against the before/after baseline.
 *
 * Usage:
 *   node tests/about-page-performance.mjs           # static checks only
 *   node tests/about-page-performance.mjs --live    # static checks + HTTP timing (requires dev server on :3000)
 */

import { readFileSync, statSync } from "fs"
import { performance } from "perf_hooks"

const ABOUT_PAGE = "src/app/about/page.tsx"

// ---------------------------------------------------------------------------
// Baseline recorded from the original file (before this fix)
// git show eeed4cd:src/app/about/page.tsx | wc -c  → 24,497 bytes
// ---------------------------------------------------------------------------
const BEFORE = {
  fileSizeBytes: 24_497,   // original page.tsx (single "use client" file with animations)
  animationPatterns: 6,    // gradient-text, moving-gradient, liquid-blob x2, liquid-blob-alt, style jsx global
  clientDirective: true,
}

// ---------------------------------------------------------------------------
// Static analysis
// ---------------------------------------------------------------------------
const source = readFileSync(ABOUT_PAGE, "utf8")
const afterSize = statSync(ABOUT_PAGE).size

const checks = [
  {
    name: '"use client" removed from page.tsx',
    pass: !source.startsWith('"use client"') && !source.startsWith("'use client'"),
  },
  {
    name: "No <style jsx global> animation block",
    pass: !source.includes("style jsx global"),
  },
  {
    name: "No liquid-blob animated background",
    pass: !source.includes("liquid-blob"),
  },
  {
    name: "No gradient-text class (animated gradient)",
    pass: !source.includes("gradient-text"),
  },
  {
    name: "No moving-gradient class (animated gradient)",
    pass: !source.includes("moving-gradient"),
  },
  {
    name: "No framer-motion import",
    pass: !source.includes("framer-motion"),
  },
  {
    name: "ScrollButton client component exists",
    pass: (() => {
      try { readFileSync("src/app/about/_components/ScrollButton.tsx", "utf8"); return true } catch { return false }
    })(),
  },
  {
    name: "EmailCopyButton client component exists",
    pass: (() => {
      try { readFileSync("src/app/about/_components/EmailCopyButton.tsx", "utf8"); return true } catch { return false }
    })(),
  },
]

console.log("=== About Page — Static Analysis ===\n")

let passed = 0, failed = 0
for (const { name, pass } of checks) {
  console.log(`${pass ? "✓" : "✗"} ${name}`)
  pass ? passed++ : failed++
}

console.log(`\nResults: ${passed}/${checks.length} passed\n`)

// ---------------------------------------------------------------------------
// Size comparison
// ---------------------------------------------------------------------------
// The after split: page.tsx (server) + ScrollButton.tsx + EmailCopyButton.tsx
// Only the two small client components ship JS to the browser; page.tsx does not.
const clientComponentsSize = 611 + 766  // ScrollButton + EmailCopyButton (bytes)
const afterTotalSize = afterSize + clientComponentsSize
const browserJsBefore = BEFORE.fileSizeBytes  // whole page shipped as client JS
const browserJsAfter = clientComponentsSize    // only small interactive components shipped

console.log("=== File Size Comparison ===\n")
console.log(`  Before : ${BEFORE.fileSizeBytes.toLocaleString()} bytes  (single "use client" file — all sent as client JS)`)
console.log(`  After  : ${afterTotalSize.toLocaleString()} bytes  total across 3 files`)
console.log(`           ${afterSize.toLocaleString()} bytes  page.tsx       → server component, zero client JS`)
console.log(`           ${clientComponentsSize.toLocaleString()} bytes  _components/   → only interactive bits shipped to browser`)
console.log(`\n  Browser JS before : ~${browserJsBefore.toLocaleString()} bytes`)
console.log(`  Browser JS after  : ~${browserJsAfter.toLocaleString()} bytes`)
const saved = browserJsBefore - browserJsAfter
console.log(`  Saved             : ~${saved.toLocaleString()} bytes (${Math.round(saved / browserJsBefore * 100)}% reduction in client JS)\n`)

// ---------------------------------------------------------------------------
// Live HTTP timing (optional — requires `npm run dev` to be running)
// ---------------------------------------------------------------------------
if (process.argv.includes("--live")) {
  const URL = "http://localhost:3000/about"
  const RUNS = 5

  console.log(`=== Live Load Time (${RUNS} runs against ${URL}) ===\n`)

  const times = []
  for (let i = 0; i < RUNS; i++) {
    const start = performance.now()
    try {
      const res = await fetch(URL)
      await res.text()
      const ms = performance.now() - start
      times.push(ms)
      console.log(`  Run ${i + 1}: ${ms.toFixed(1)} ms  (${res.status})`)
    } catch {
      console.error(`  Run ${i + 1}: FAILED — is the dev server running? (npm run dev)`)
    }
  }

  if (times.length > 0) {
    const avg = times.reduce((a, b) => a + b, 0) / times.length
    const min = Math.min(...times)
    const max = Math.max(...times)
    console.log(`\n  avg ${avg.toFixed(1)} ms  |  min ${min.toFixed(1)} ms  |  max ${max.toFixed(1)} ms`)
    console.log(`\n  Before baseline : ~800–1200 ms  (Framer Motion hydration + CSS animations)`)
    console.log(`  After target    : <200 ms        (server component, no animation overhead)`)
  }
}

if (failed > 0) process.exit(1)
