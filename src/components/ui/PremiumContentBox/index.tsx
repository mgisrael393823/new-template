import React, { ReactNode } from "react";

interface PremiumContentBoxProps {
  children: ReactNode;
  title: string;
}

export function PremiumContentBox({ children, title }: PremiumContentBoxProps) {
  return (
    <div className="border border-[#E8E3D9] rounded-sm overflow-hidden mb-8">
      <div className="bg-[#151617] text-white p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-6 bg-white">
        {children}
      </div>
    </div>
  );
}