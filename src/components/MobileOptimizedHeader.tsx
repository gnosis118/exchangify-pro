import { cn } from '@/lib/utils';

interface MobileOptimizedHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  backgroundImage?: string;
  overlay?: boolean;
  centered?: boolean;
}

const MobileOptimizedHeader = ({
  title,
  subtitle,
  description,
  className,
  backgroundImage,
  overlay = true,
  centered = true
}: MobileOptimizedHeaderProps) => {
  const headerContent = (
    <div className={cn(
      "space-y-3 md:space-y-4",
      centered && "text-center",
      backgroundImage && "text-white"
    )}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {title}
      </h1>
      
      {subtitle && (
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium opacity-90">
          {subtitle}
        </h2>
      )}
      
      {description && (
        <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto opacity-80 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );

  if (backgroundImage) {
    return (
      <header className={cn(
        "relative overflow-hidden",
        className
      )}>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {overlay && (
          <div className="absolute inset-0 bg-black/50" />
        )}
        <div className="relative z-10 py-12 md:py-16 lg:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className={cn(
              "flex items-center justify-center min-h-[200px] md:min-h-[300px]",
              centered && "text-center"
            )}>
              {headerContent}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
      "py-8 md:py-12 lg:py-16 px-4",
      className
    )}>
      <div className="container mx-auto max-w-6xl">
        <div className={cn(
          "space-y-4",
          centered && "text-center"
        )}>
          {headerContent}
        </div>
      </div>
    </header>
  );
};

export default MobileOptimizedHeader;