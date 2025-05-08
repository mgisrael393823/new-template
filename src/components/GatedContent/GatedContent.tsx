import React from "react";

interface GatedContentProps {
  children: React.ReactNode;
  title: string;
  teaser: string;
}

// Component simply shows content without gating
export function GatedContent({ children, title, teaser }: GatedContentProps) {
  return (
    <div className="relative">
      {/* Content introduction */}
      <div className="mb-10 p-8 bg-[#FCFAF5] border border-[#E8E3D9] rounded-sm relative overflow-hidden">
        <h3 className="text-lg uppercase tracking-wide mb-4 text-[#333333] flex items-center">
          {title}
        </h3>
        <p className="text-[#777777] leading-relaxed max-w-3xl">{teaser}</p>
      </div>
      
      {/* Content - fully visible */}
      <div>
        {children}
      </div>
    </div>
  );
}