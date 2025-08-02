import TravelMoney from '@/components/TravelMoney';
import SEOHead from '@/components/SEOHead';
import DynamicBreadcrumbSchema from '@/components/DynamicBreadcrumbSchema';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import SemanticHeader from '@/components/SemanticHeader';
import EnhancedInternalLinking from '@/components/EnhancedInternalLinking';
import { getEnhancedMetaDescription } from '@/components/EnhancedSEOMetaDescriptions';
import travelHero from '@/assets/travel-hero.jpg';

const Travel = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Travel Money Guide",
    "description": "Essential currency guides and budget calculators for international travel. Get money exchange tips and currency information for popular destinations worldwide.",
    "url": "https://currencytocurrency.app/travel",
    "applicationCategory": "TravelApplication",
    "featureList": [
      "Travel currency guides",
      "Budget calculators",
      "Money exchange tips",
      "Destination currency info",
      "Travel money planning"
    ]
  };

  const enhancedMeta = getEnhancedMetaDescription('travel');

  return (
    <div className="min-h-screen bg-converter-bg">
      <DynamicBreadcrumbSchema />
      <SEOHead
        title={enhancedMeta.title}
        description={enhancedMeta.description}
        keywords={enhancedMeta.keywords}
        canonical="https://currencytocurrency.app/travel"
        structuredData={structuredData}
      />
      
      <div className="container mx-auto px-4 py-6">
        <BreadcrumbNavigation className="mb-6" />
      </div>
      
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img 
          src={travelHero} 
          alt="International travel money planning tools with currency conversion calculator for vacation budgeting and foreign exchange" 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width="1200"
          height="320"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Travel Money Guide</h1>
            <p className="text-lg md:text-xl opacity-90">
              Essential currency guides and budget calculators for international travel
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 -mt-16 relative z-10">
        <div className="bg-converter-bg rounded-lg shadow-lg p-6 mb-8">
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Plan your international trips with essential currency guides, budget calculators, 
            and money transfer recommendations for popular destinations.
          </p>
        </div>
        
        <TravelMoney />
      </div>
    </div>
  );
};

export default Travel;