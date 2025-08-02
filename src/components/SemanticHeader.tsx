import React from 'react';
import { cn } from '@/lib/utils';

interface SemanticHeaderProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'hero' | 'section' | 'article' | 'card' | 'sidebar';
}

const SemanticHeader = ({ 
  level, 
  children, 
  className, 
  id,
  variant = 'section' 
}: SemanticHeaderProps) => {
  
  const getHeaderStyles = (level: number, variant: string) => {
    const baseStyles = 'font-bold text-foreground';
    
    const variantStyles = {
      hero: {
        1: 'text-4xl md:text-5xl lg:text-6xl leading-tight',
        2: 'text-3xl md:text-4xl lg:text-5xl leading-tight',
        3: 'text-2xl md:text-3xl lg:text-4xl leading-tight',
        4: 'text-xl md:text-2xl lg:text-3xl leading-tight',
        5: 'text-lg md:text-xl lg:text-2xl leading-tight',
        6: 'text-base md:text-lg lg:text-xl leading-tight'
      },
      section: {
        1: 'text-3xl md:text-4xl leading-tight mb-6',
        2: 'text-2xl md:text-3xl leading-tight mb-4',
        3: 'text-xl md:text-2xl leading-tight mb-3',
        4: 'text-lg md:text-xl leading-tight mb-2',
        5: 'text-base md:text-lg leading-tight mb-2',
        6: 'text-sm md:text-base leading-tight mb-1'
      },
      article: {
        1: 'text-2xl md:text-3xl leading-tight mb-4',
        2: 'text-xl md:text-2xl leading-tight mb-3',
        3: 'text-lg md:text-xl leading-tight mb-2',
        4: 'text-base md:text-lg leading-tight mb-2',
        5: 'text-sm md:text-base leading-tight mb-1',
        6: 'text-xs md:text-sm leading-tight mb-1'
      },
      card: {
        1: 'text-xl md:text-2xl leading-tight',
        2: 'text-lg md:text-xl leading-tight',
        3: 'text-base md:text-lg leading-tight',
        4: 'text-sm md:text-base leading-tight',
        5: 'text-xs md:text-sm leading-tight',
        6: 'text-xs leading-tight'
      },
      sidebar: {
        1: 'text-lg md:text-xl leading-tight',
        2: 'text-base md:text-lg leading-tight',
        3: 'text-sm md:text-base leading-tight',
        4: 'text-xs md:text-sm leading-tight',
        5: 'text-xs leading-tight',
        6: 'text-xs leading-tight'
      }
    };

    return cn(
      baseStyles,
      variantStyles[variant as keyof typeof variantStyles][level as keyof typeof variantStyles.hero],
      className
    );
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return React.createElement(
    Tag,
    {
      className: getHeaderStyles(level, variant),
      id,
    },
    children
  );
};

export default SemanticHeader;