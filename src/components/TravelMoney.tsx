import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plane, CreditCard, MapPin, ExternalLink, Calculator, Globe } from 'lucide-react';

interface CountryInfo {
  name: string;
  currency: string;
  currencyName: string;
  flag: string;
  exchangeRate: number; // USD to local currency
  averageDailyBudget: {
    budget: number;
    midRange: number;
    luxury: number;
  };
  travelTips: string[];
  moneyTransferOptions: string[];
}

const countries: Record<string, CountryInfo> = {
  'united-kingdom': {
    name: 'United Kingdom',
    currency: 'GBP',
    currencyName: 'British Pound',
    flag: '🇬🇧',
    exchangeRate: 0.79,
    averageDailyBudget: { budget: 50, midRange: 100, luxury: 200 },
    travelTips: [
      'Contactless payment is widely accepted',
      'Tipping 10-15% in restaurants is customary',
      'Many pubs and restaurants add service charge'
    ],
    moneyTransferOptions: ['Wise', 'Revolut', 'Western Union', 'Bank transfers']
  },
  'eurozone': {
    name: 'Eurozone Countries',
    currency: 'EUR',
    currencyName: 'Euro',
    flag: '🇪🇺',
    exchangeRate: 0.92,
    averageDailyBudget: { budget: 60, midRange: 120, luxury: 250 },
    travelTips: [
      'Euro used in 19 countries',
      'Cash still preferred in some regions',
      'Service charge often included in bills'
    ],
    moneyTransferOptions: ['Wise', 'Revolut', 'Remitly', 'Bank transfers']
  },
  'japan': {
    name: 'Japan',
    currency: 'JPY',
    currencyName: 'Japanese Yen',
    flag: '🇯🇵',
    exchangeRate: 148,
    averageDailyBudget: { budget: 8000, midRange: 15000, luxury: 30000 },
    travelTips: [
      'Cash is still king in Japan',
      'ATMs may not accept foreign cards',
      'No tipping culture'
    ],
    moneyTransferOptions: ['Wise', '7-Eleven ATMs', 'Japan Post Bank', 'Citibank']
  },
  'australia': {
    name: 'Australia',
    currency: 'AUD',
    currencyName: 'Australian Dollar',
    flag: '🇦🇺',
    exchangeRate: 1.52,
    averageDailyBudget: { budget: 80, midRange: 150, luxury: 300 },
    travelTips: [
      'Cashless payments very common',
      'No tipping expected but appreciated',
      'Round to nearest 5 cents for cash'
    ],
    moneyTransferOptions: ['Wise', 'Remitly', 'Western Union', 'Bank transfers']
  },
  'canada': {
    name: 'Canada',
    currency: 'CAD',
    currencyName: 'Canadian Dollar',
    flag: '🇨🇦',
    exchangeRate: 1.35,
    averageDailyBudget: { budget: 70, midRange: 140, luxury: 280 },
    travelTips: [
      'Credit cards widely accepted',
      'Tipping 15-20% is standard',
      'Interac debit cards common'
    ],
    moneyTransferOptions: ['Wise', 'Remitly', 'Western Union', 'Bank transfers']
  },
  'switzerland': {
    name: 'Switzerland',
    currency: 'CHF',
    currencyName: 'Swiss Franc',
    flag: '🇨🇭',
    exchangeRate: 0.88,
    averageDailyBudget: { budget: 100, midRange: 200, luxury: 400 },
    travelTips: [
      'One of the most expensive countries',
      'Cash and cards both accepted',
      'Service charge included in bills'
    ],
    moneyTransferOptions: ['Wise', 'Revolut', 'Bank transfers', 'Swiss banks']
  }
};

const TravelMoney = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [tripDays, setTripDays] = useState<number>(7);
  const [budgetType, setBudgetType] = useState<'budget' | 'midRange' | 'luxury'>('midRange');
  const [usdAmount, setUsdAmount] = useState<number>(1000);

  const countryInfo = selectedCountry ? countries[selectedCountry] : null;

  const calculateBudget = () => {
    if (!countryInfo) return 0;
    return countryInfo.averageDailyBudget[budgetType] * tripDays;
  };

  const convertCurrency = (amount: number) => {
    if (!countryInfo) return 0;
    return (amount * countryInfo.exchangeRate).toFixed(2);
  };

  return (
    <div className="space-y-8">
      {/* Country Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Select Your Destination
          </CardTitle>
          <CardDescription>
            Choose your travel destination to get currency guides and budget estimates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a destination country" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(countries).map(([key, country]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                    <Badge variant="outline">{country.currency}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {countryInfo && (
        <>
          {/* Currency Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {countryInfo.flag}
                {countryInfo.name} - {countryInfo.currencyName}
              </CardTitle>
              <CardDescription>
                Current exchange rate: 1 USD = {countryInfo.exchangeRate} {countryInfo.currency}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="usd-amount">USD Amount</Label>
                  <Input
                    id="usd-amount"
                    type="number"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(Number(e.target.value))}
                    placeholder="Enter USD amount"
                  />
                </div>
                <div>
                  <Label>Converted Amount</Label>
                  <div className="text-2xl font-bold text-primary">
                    {convertCurrency(usdAmount)} {countryInfo.currency}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Trip Budget Calculator
              </CardTitle>
              <CardDescription>
                Estimate your daily expenses based on travel style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="trip-days">Trip Duration (days)</Label>
                  <Input
                    id="trip-days"
                    type="number"
                    value={tripDays}
                    onChange={(e) => setTripDays(Number(e.target.value))}
                    min="1"
                  />
                </div>
                <div>
                  <Label>Travel Style</Label>
                  <Select value={budgetType} onValueChange={(value: 'budget' | 'midRange' | 'luxury') => setBudgetType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget ({countryInfo.averageDailyBudget.budget} {countryInfo.currency}/day)</SelectItem>
                      <SelectItem value="midRange">Mid-range ({countryInfo.averageDailyBudget.midRange} {countryInfo.currency}/day)</SelectItem>
                      <SelectItem value="luxury">Luxury ({countryInfo.averageDailyBudget.luxury} {countryInfo.currency}/day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">Estimated Total Budget</div>
                <div className="text-3xl font-bold text-primary">
                  {calculateBudget()} {countryInfo.currency}
                </div>
                <div className="text-sm text-muted-foreground">
                  ≈ ${(calculateBudget() / countryInfo.exchangeRate).toFixed(2)} USD
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Travel Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Money Tips for {countryInfo.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {countryInfo.travelTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Money Transfer Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Money Transfer Options
              </CardTitle>
              <CardDescription>
                Best ways to send or access money in {countryInfo.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {countryInfo.moneyTransferOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <ExternalLink className="h-4 w-4 text-primary" />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-12">
                  <Calculator className="h-4 w-4 mr-2" />
                  Currency Converter
                </Button>
                <Button variant="outline" className="h-12">
                  <MapPin className="h-4 w-4 mr-2" />
                  Travel Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default TravelMoney;