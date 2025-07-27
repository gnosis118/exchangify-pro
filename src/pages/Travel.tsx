import React from 'react';
import TravelMoney from '@/components/TravelMoney';

const Travel = () => {
  return (
    <div className="min-h-screen bg-converter-bg p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Travel Money Guide</h1>
          <p className="text-muted-foreground text-lg">
            Essential currency guides and budget calculators for international travel
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
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