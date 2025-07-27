import RateAlerts from '@/components/RateAlerts';
import alertsHero from '@/assets/alerts-hero.jpg';

const Alerts = () => {
  return (
    <div className="min-h-screen bg-converter-bg">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img 
          src={alertsHero} 
          alt="Smartphone with currency rate alert notifications" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Rate Alerts</h1>
            <p className="text-lg md:text-xl opacity-90">
              Never miss the perfect exchange rate with personalized email alerts
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 -mt-16 relative z-10">
        <div className="bg-converter-bg rounded-lg shadow-lg p-6 mb-8">
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Set up personalized rate alerts to be notified when your target currencies reach specific exchange rates. 
            Never miss an opportunity to convert at your ideal rate.
          </p>
        </div>
        
        <RateAlerts />
      </div>
    </div>
  );
};

export default Alerts;