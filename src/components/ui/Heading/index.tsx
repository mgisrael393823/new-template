import React from 'react';

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level, children, className = '' }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseStyles = 'font-semibold';
  
  const levelStyles = {
    1: 'text-3xl mb-6',
    2: 'text-2xl mb-4',
    3: 'text-xl mb-3',
    4: 'text-lg mb-2',
    5: 'text-base mb-2',
    6: 'text-sm mb-1'
  };
  
  const combinedStyles = `${baseStyles} ${levelStyles[level]} ${className}`;
  
  return <Tag className={combinedStyles}>{children}</Tag>;
}