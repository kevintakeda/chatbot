import { cn } from "@/lib/utils"
import React from "react"

export const InputError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { message?: string }
>(({ className, children, id, message, ...props }, ref) => {

  if (!message) {
    return null
  }

  return (
    <p
      ref={ref}
      id={id}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {message}
    </p>
  )
})
InputError.displayName = "InputError"