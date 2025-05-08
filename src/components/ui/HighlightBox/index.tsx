import React from 'react';

interface HighlightBoxProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function HighlightBox({ 
  children, 
  variant = 'primary', 
  className = '' 
}: HighlightBoxProps) {
  const variantStyles = {
    primary: 'bg-[#FCFAF5] border-[#E8E3D9]',
    secondary: 'bg-[#F5F5F5] border-[#E0E0E0]'
  };
  
  const combinedStyles = `p-6 border rounded-md mb-8 ${variantStyles[variant]} ${className}`;
  
  return (
    <div className={combinedStyles}>
      {children}
    </div>
  );
}