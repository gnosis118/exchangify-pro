import RateAlerts from '@/components/RateAlerts';

const Alerts = () => {
  return (
    <div className="min-h-screen bg-converter-bg p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Rate Alerts</h1>
          <p className="text-muted-foreground text-lg">
            Never miss the perfect exchange rate with personalized email alerts
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
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