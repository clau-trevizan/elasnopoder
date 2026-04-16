"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const inputId = id || `input-${label.replace(/\s+/g, "-").toLowerCase()}`;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value !== "");
      props.onBlur?.(e);
    };

    const isFloating = isFocused || hasValue;

    // Check if there's an error class to apply error styling to label
    const hasError = className?.includes("border-[#B84D01]");

    return (
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-14 w-full rounded-lg bg-white px-4 pt-6 pb-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B80F66] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 text-[#1F1D1D]",
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
              : "left-4 top-1/2 -translate-y-1/2 text-base text-muted-foreground"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
