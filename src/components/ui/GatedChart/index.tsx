import React, { ReactNode } from "react";

// This is a placeholder for the GatedChart component 
// that will show charts without gating
interface GatedChartProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function GatedChart({ children, title, description }: GatedChartProps) {
  return (
    <div className="relative mb-8">
      {/* Chart header */}
      <div className="mb-4">
        <h3 className="text-lg text-[#333333] mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-[#777777]">{description}</p>
        )}
      </div>
      
      {/* Chart content - fully visible */}
      <div className="border border-[#E8E3D9] p-4 rounded-sm bg-white">
        {children}
      </div>
    </div>
  );
}