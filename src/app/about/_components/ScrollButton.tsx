"use client"

import { ChevronDown } from "lucide-react"

export function ScrollButton() {
  return (
    <button
      type="button"
      onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
      className="liquid-btn-red group inline-block w-full text-center text-white px-7 py-3 rounded-xl font-medium sm:w-auto"
    >
      <span className="relative z-10 flex items-center justify-center">
        See Features
        <ChevronDown className="ml-2 h-5 w-5 transform group-hover:translate-y-0.5 transition-transform duration-300" />
      </span>
    </button>
  )
}
