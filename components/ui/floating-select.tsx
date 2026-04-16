import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

const FloatingSelect = React.forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ className, label, id, children, ...props }, ref) => {
    const selectId = id || `select-${label.replace(/\s+/g, "-").toLowerCase()}`;
    
    // Check if there's an error class to apply error styling to label
    const hasError = className?.includes("border-[#B84D01]");

    return (
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "flex h-14 w-full rounded-lg border bg-white px-4 pt-6 pb-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B80F66] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-[#1F1D1D]",
            hasError ? "border-[#B84D01] text-[#B84D01]" : "border-[#DBDBDB]",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <label
          htmlFor={selectId}
          className={cn(
            "absolute top-2 left-4 text-[0.75rem] transition-all duration-200 pointer-events-none",
            hasError ? "text-[#B84D01]" : "text-[#B80F66]"
          )}
        >
          {label}
        </label>
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    );
  }
);

FloatingSelect.displayName = "FloatingSelect";

export { FloatingSelect };
