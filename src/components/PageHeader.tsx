import React from 'react';

// Import header images
import travelHeader from '@/assets/travel-header.jpg';
import currencyHeader from '@/assets/currency-header.jpg';
import chartsHeader from '@/assets/charts-header.jpg';
import alertsHeader from '@/assets/alerts-header.jpg';
import authHeader from '@/assets/auth-header.jpg';

interface PageHeaderProps {
  page: 'travel' | 'currency' | 'charts' | 'alerts' | 'auth';
  title: string;
  subtitle?: string;
}

const headerImages = {
  travel: travelHeader,
  currency: currencyHeader,
  charts: chartsHeader,
  alerts: alertsHeader,
  auth: authHeader,
};

const PageHeader: React.FC<PageHeaderProps> = ({ page, title, subtitle }) => {
  const headerImage = headerImages[page];

  return (
    <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-lg mb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${headerImage})` }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center text-white">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;