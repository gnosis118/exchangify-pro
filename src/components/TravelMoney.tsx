import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plane, CreditCard, MapPin, ExternalLink, Calculator } from 'lucide-react';

interface CountryInfo {
  name: string;
  currency: string;
  flag: string;
  tips: string[];
  averageCosts: {
    meal: string;
    hotel: string;
    transport: string;
  };
}

const popularDestinations: CountryInfo[] = [
  {
    name: 'United Kingdom',
    currency: 'GBP',
    flag: '🇬🇧',
    tips: [
      'Contactless payments widely accepted',
      'Tipping 10-15% in restaurants',
      'Avoid airport exchanges - poor rates'
    ],
    averageCosts: {
      meal: '£15-25',
      hotel: '£80-150',
      transport: '£3-5 per journey'
    }
  },
  {
    name: 'Japan',
    currency: 'JPY',
    flag: '🇯🇵',
    tips: [
      'Cash still king in many places',
      'IC cards for train travel',
      'No tipping culture'
    ],
    averageCosts: {
      meal: '¥800-2000',
      hotel: '¥8000-15000',
      transport: '¥200-400 per journey'
    }
  },
  {
    name: 'Thailand',
    currency: 'THB',
    flag: '🇹🇭',
    tips: [
      'Have cash for street food',
      'Cards accepted in malls',
      'Negotiate prices at markets'
    ],
    averageCosts: {
      meal: '฿50-200',
      hotel: '฿500-2000',
      transport: '฿30-100 per journey'
    }
  },
  {
    name: 'Australia',
    currency: 'AUD',
    flag: '🇦🇺',
    tips: [
      'Tap and go everywhere',
      'No need for large cash amounts',
      'Tipping not mandatory'
    ],
    averageCosts: {
      meal: 'A$20-40',
      hotel: 'A$100-200',
      transport: 'A$3-8 per journey'
    }
  }
];

const TravelMoney = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [travelBudget, setTravelBudget] = useState('');
  const [tripDays, setTripDays] = useState('');

  const calculateDailyBudget = () => {
    if (!travelBudget || !tripDays) return null;
    return (parseFloat(travelBudget) / parseFloat(tripDays)).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            <CardTitle>Travel Money Guide</CardTitle>
          </div>
          <CardDescription>
            Essential currency information for your next trip
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Destination Selection */}
          <div className="space-y-3">
            <Label>Select Your Destination</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularDestinations.map((country) => (
                <Button
                  key={country.name}
                  variant={selectedCountry?.name === country.name ? 'default' : 'outline'}
                  className="h-auto p-3 flex flex-col items-center gap-2"
                  onClick={() => setSelectedCountry(country)}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="text-center">
                    <div className="font-medium text-sm">{country.name}</div>
                    <div className="text-xs text-muted-foreground">{country.currency}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Country Information */}
          {selectedCountry && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  {selectedCountry.name} - {selectedCountry.currency}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Payment Tips */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Tips
                  </h4>
                  <ul className="space-y-1">
                    {selectedCountry.tips.map((tip, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Average Costs */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Average Daily Costs
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="font-medium">Meal</div>
                      <div className="text-muted-foreground">{selectedCountry.averageCosts.meal}</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="font-medium">Hotel</div>
                      <div className="text-muted-foreground">{selectedCountry.averageCosts.hotel}</div>
                    </div>
                    <div className="text-center p-2 bg-muted rounded">
                      <div className="font-medium">Transport</div>
                      <div className="text-muted-foreground">{selectedCountry.averageCosts.transport}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Budget Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Budget Calculator
              </CardTitle>
              <CardDescription>
                Calculate your daily spending budget
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Total Budget (USD)</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="1000"
                    value={travelBudget}
                    onChange={(e) => setTravelBudget(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Trip Duration (days)</Label>
                  <Input
                    id="days"
                    type="number"
                    placeholder="7"
                    value={tripDays}
                    onChange={(e) => setTripDays(e.target.value)}
                  />
                </div>
              </div>
              
              {calculateDailyBudget() && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Daily Budget</div>
                    <div className="text-2xl font-bold text-primary">
                      ${calculateDailyBudget()}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      per day for {tripDays} days
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Money Transfer Services (Affiliate Opportunities) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Recommended Money Transfer Services
              </CardTitle>
              <CardDescription>
                Save money on international transfers and currency exchange
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Wise (formerly TransferWise)</div>
                    <div className="text-sm text-muted-foreground">
                      Real exchange rates, low fees
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>Best Rates</Badge>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Revolut</div>
                    <div className="text-sm text-muted-foreground">
                      Multi-currency travel card
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Travel Card</Badge>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">XE Money</div>
                    <div className="text-sm text-muted-foreground">
                      Quick international transfers
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Fast</Badge>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                * Affiliate partnerships help us keep this service free
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelMoney;