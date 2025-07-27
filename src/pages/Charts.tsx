import HistoricalChart from '@/components/HistoricalChart';
import PageHeader from '@/components/PageHeader';

const Charts = () => {
  return (
    <div className="min-h-screen bg-converter-bg">
      <div className="max-w-6xl mx-auto p-4">
        <PageHeader 
          page="charts" 
          title="Historical Charts" 
          subtitle="Track currency trends and historical exchange rates with interactive charts"
        />
        
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