import React, { ReactNode } from "react";

// This is a placeholder for the PartialGatedContent component 
// that will show content without gating
interface PartialGatedContentProps {
  visibleContent: ReactNode;
  gatedContent: ReactNode;
  title: string;
  teaser: string;
  previewPoints?: string[];
}

export function PartialGatedContent({ 
  visibleContent, 
  gatedContent,
  title,
  teaser,
  previewPoints = []
}: PartialGatedContentProps) {
  return (
    <div className="relative">
      {/* Visible content at the top */}
      <div className="mb-10">
        {visibleContent}
      </div>
      
      {/* Information section */}
      <div className="mb-12 p-8 bg-[#FCFAF5] border border-[#E8E3D9] rounded-sm relative overflow-hidden">
        <h3 className="text-lg uppercase tracking-wide mb-4 text-[#333333] flex items-center">
          {title}
        </h3>
        
        <p className="text-[#777777] leading-relaxed max-w-3xl mb-6">{teaser}</p>
        
        {previewPoints.length > 0 && (
          <div className="mb-6">
            <h5 className="text-sm uppercase tracking-wide mb-3 text-[#555555]">Key Insights:</h5>
            <ul className="space-y-2">
              {previewPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#E57161] mr-2">•</span>
                  <span className="text-[#777777]">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Previously gated content - now fully visible */}
      <div>
        {gatedContent}
      </div>
    </div>
  );
}