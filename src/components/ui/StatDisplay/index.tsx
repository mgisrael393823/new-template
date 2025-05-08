import React from "react";

interface StatDisplayProps {
  label: string;
  value: string | number;
  change?: string | number;
  isPositive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatDisplay({
  label,
  value,
  change,
  isPositive = true,
  size = 'md',
  className = ''
}: StatDisplayProps) {
  const sizeClasses = {
    sm: {
      wrapper: 'p-4',
      label: 'text-xs',
      value: 'text-lg',
      change: 'text-xs'
    },
    md: {
      wrapper: 'p-6',
      label: 'text-sm',
      value: 'text-2xl',
      change: 'text-sm'
    },
    lg: {
      wrapper: 'p-8',
      label: 'text-base',
      value: 'text-3xl',
      change: 'text-base'
    }
  };
  
  return (
    <div className={`bg-white border border-[#E8E3D9] rounded-sm ${sizeClasses[size].wrapper} ${className}`}>
      <p className={`text-[#777777] ${sizeClasses[size].label} mb-1`}>{label}</p>
      <p className={`font-bold ${sizeClasses[size].value} mb-1`}>{value}</p>
      {change && (
        <p className={`${isPositive ? 'text-green-600' : 'text-red-600'} ${sizeClasses[size].change}`}>
          {isPositive ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
  );
}