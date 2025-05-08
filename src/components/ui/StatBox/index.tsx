import React from 'react';

interface StatBoxProps {
  label: string;
  value: string | number;
  description?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export function StatBox({
  label,
  value,
  description,
  className = '',
  variant = 'light'
}: StatBoxProps) {
  const baseStyles = 'p-6 rounded-sm';
  
  const variantStyles = {
    'light': 'bg-[#FCFAF5] border border-[#E8E3D9]',
    'dark': 'bg-[#151617] text-white'
  };
  
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  return (
    <div className={combinedStyles}>
      <h3 className={`text-lg font-semibold mb-2 ${variant === 'dark' ? 'text-white' : 'text-[#333333]'}`}>{label}</h3>
      <p className="text-2xl font-bold mb-1">{value}</p>
      {description && (
        <p className={`text-sm ${variant === 'dark' ? 'text-gray-300' : 'text-[#777777]'}`}>{description}</p>
      )}
    </div>
  );
}