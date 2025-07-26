import HistoricalChart from '@/components/HistoricalChart';

const Charts = () => {
  return (
    <div className="min-h-screen bg-converter-bg p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Historical Charts</h1>
          <p className="text-muted-foreground text-lg">
            Track currency trends and historical exchange rates with interactive charts
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Analyze currency performance over time with detailed historical data. 
            Our charts help you identify trends and make informed decisions about currency conversions.
          </p>
        </div>
        
        <HistoricalChart 
          fromCurrency="USD" 
          toCurrency="EUR" 
          currentRate={1} 
        />
      </div>
    </div>
  );
};

export default Charts;