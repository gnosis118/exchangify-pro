import React from 'react';
import { cn } from '@/lib/utils';

interface MobileViewportWrapperProps {
  children: React.ReactNode;
  className?: string;
  preventZoom?: boolean;
  fixedHeight?: boolean;
}

const MobileViewportWrapper = ({
  children,
  className,
  preventZoom = true,
  fixedHeight = true
}: MobileViewportWrapperProps) => {
  
  React.useEffect(() => {
    if (preventZoom) {
      // Prevent zoom on input focus
      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      };
      
      const handleTouchEnd = (e: TouchEvent) => {
        const now = (new Date()).getTime();
        if (lastTouchEnd && (now - lastTouchEnd) <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      };
      
      let lastTouchEnd = 0;
      
      document.addEventListener('touchstart', handleTouchStart, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [preventZoom]);

  return (
    <div
      className={cn(
        'w-full',
        fixedHeight && 'min-h-screen min-h-[100dvh]', // Use dynamic viewport height
        'overflow-x-hidden', // Prevent horizontal scroll
        className
      )}
    >
      {children}
    </div>
  );
};

export default MobileViewportWrapper;