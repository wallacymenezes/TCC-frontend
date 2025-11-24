"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onChange?: (value: number) => void
  showValue?: boolean
  className?: string
}

export function Rating({
  value,
  max = 5,
  size = "md",
  interactive = false,
  onChange,
  showValue = false,
  className,
}: RatingProps) {
  const sizes = {
    sm: 14,
    md: 18,
    lg: 24,
  }

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1)
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, index) => (
        <button
          key={index}
          type="button"
          disabled={!interactive}
          onClick={() => handleClick(index)}
          className={cn("transition-colors", interactive && "cursor-pointer hover:scale-110")}
        >
          <Star
            size={sizes[size]}
            className={cn(index < value ? "fill-accent text-accent" : "text-muted-foreground")}
          />
        </button>
      ))}
      {showValue && <span className="ml-2 text-sm text-muted-foreground">{value.toFixed(1)}</span>}
    </div>
  )
}
