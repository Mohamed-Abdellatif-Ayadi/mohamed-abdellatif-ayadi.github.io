import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  level: string;
  className?: string;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ label, value, max, level, className, ...props }, ref) => {
    const percentage = (value / max) * 100;

    return (
      <div className={cn("space-y-4", className)} ref={ref} {...props}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-700 font-medium">{label}</span>
          <span className="text-sm text-gray-500">{level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
