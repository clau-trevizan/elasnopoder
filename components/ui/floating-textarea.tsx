"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const inputId = id || `textarea-${label.replace(/\s+/g, "-").toLowerCase()}`;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value !== "");
      props.onBlur?.(e);
    };

    const isFloating = isFocused || hasValue;

    // Check if there's an error class to apply error styling to label
    const hasError = className?.includes("border-[#B84D01]");

    return (
      <div className="relative">
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "flex min-h-[200px] w-full rounded-lg bg-white px-4 pt-8 pb-3 text-base transition-colors placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B80F66] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none text-[#1F1D1D]",
            hasError ? "border border-[#B84D01] text-[#B84D01]" : "border border-[#DBDBDB]",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute transition-all duration-200 pointer-events-none",
            isFloating
              ? `top-2 left-4 text-[0.75rem] ${hasError ? "text-[#B84D01]" : "text-[#B80F66]"}`
              : "left-4 top-6 text-base text-muted-foreground"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

export { FloatingTextarea };
