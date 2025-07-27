import TravelMoney from '@/components/TravelMoney';
import PageHeader from '@/components/PageHeader';

const Travel = () => {
  return (
    <div className="min-h-screen bg-converter-bg">
      <div className="max-w-6xl mx-auto p-4">
        <PageHeader 
          page="travel" 
          title="Travel Money Guide" 
          subtitle="Essential currency guides and budget calculators for international travel"
        />
        
        <TravelMoney />
      </div>
    </div>
  );
};

export default Travel;