"use client"

import { Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  email: string
  name: string
}

export function EmailCopyButton({ email, name }: Props) {
  const { toast } = useToast()

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(email).then(() => {
          toast({
            title: "Email copied!",
            description: `${name}'s email has been copied to your clipboard.`,
            duration: 3000,
            variant: "success",
          })
        })
      }}
      className="text-gray-400 dark:text-gray-500 hover:text-brand-navy dark:hover:text-blue-400 transition-colors duration-300"
    >
      <Mail className="h-4 w-4" />
    </button>
  )
}
