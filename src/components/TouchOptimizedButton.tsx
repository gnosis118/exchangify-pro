import { cn } from '@/lib/utils';

interface TouchOptimizedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'touch';
  children: React.ReactNode;
}

const TouchOptimizedButton = ({ 
  variant = 'primary', 
  size = 'touch',
  className,
  children,
  ...props 
}: TouchOptimizedButtonProps) => {
  
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm min-h-[36px]', // Still accessible but smaller
    md: 'h-10 px-4 py-2 min-h-[40px]',
    lg: 'h-11 px-8 min-h-[44px]',
    touch: 'h-12 px-6 py-3 min-h-[48px] min-w-[48px]' // Optimal for mobile
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        'touch-manipulation', // Improves touch responsiveness
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default TouchOptimizedButton;