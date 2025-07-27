import TravelMoney from '@/components/TravelMoney';
import SEOHead from '@/components/SEOHead';
import travelHero from '@/assets/travel-hero.jpg';

const Travel = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Travel Money Guide",
    "description": "Essential currency guides and budget calculators for international travel. Get money exchange tips and currency information for popular destinations worldwide.",
    "url": "https://exchangifypro.com/travel",
    "applicationCategory": "TravelApplication",
    "featureList": [
      "Travel currency guides",
      "Budget calculators",
      "Money exchange tips",
      "Destination currency info",
      "Travel money planning"
    ]
  };

  return (
    <div className="min-h-screen bg-converter-bg">
      <SEOHead
        title="Travel Money Guide & Currency Tips | ExchangifyPro"
        description="Essential currency guides and budget calculators for international travel. Get money exchange tips and currency information for popular destinations worldwide."
        keywords="travel money, currency exchange travel, travel budget calculator, international travel money, foreign currency guide, travel currency tips, vacation money planning"
        canonical="https://exchangifypro.com/travel"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img 
          src={travelHero} 
          alt="Airplane landing on tropical island" 
          className="w-full h-full object-cover"
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