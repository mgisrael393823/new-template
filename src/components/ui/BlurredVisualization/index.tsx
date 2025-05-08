import React from "react";

// This is a placeholder for the BlurredVisualization component 
// that will show charts/visualizations without blurring
export function BlurredVisualization({ 
  children, 
  title, 
  description 
}) {
  return (
    <div className="border border-[#E8E3D9] rounded-sm p-6 bg-white relative overflow-hidden">
      {/* Title and description */}
      <div className="mb-4">
        <h3 className="text-lg text-center text-[#333333] mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-center text-[#777777]">{description}</p>
        )}
      </div>
      
      {/* Chart content - fully visible */}
      <div className="pt-4">
        {children}
      </div>
    </div>
  );
}