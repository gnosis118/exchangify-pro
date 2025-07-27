import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, CreditCard, MapPin, ExternalLink, Calculator, Search, Globe } from 'lucide-react';

interface CountryInfo {
  name: string;
  currency: string;
  currencyName: string;
  flag: string;
  continent: string;
  tips: string[];
  averageCosts: {
    meal: string;
    hotel: string;
    transport: string;
  };
  bestTimeToVisit: string;
  languages: string[];
}

const allDestinations: CountryInfo[] = [
  // Europe
  {
    name: 'United Kingdom',
    currency: 'GBP',
    currencyName: 'British Pound',
    flag: '🇬🇧',
    continent: 'Europe',
    tips: [
      'Contactless payments widely accepted',
      'Tipping 10-15% in restaurants',
      'Avoid airport exchanges - poor rates'
    ],
    averageCosts: {
      meal: '£15-25',
      hotel: '£80-150',
      transport: '£3-5 per journey'
    },
    bestTimeToVisit: 'May-September',
    languages: ['English']
  },
  {
    name: 'Germany',
    currency: 'EUR',
    currencyName: 'Euro',
    flag: '🇩🇪',
    continent: 'Europe',
    tips: [
      'Cash preferred in small establishments',
      'Cards accepted in major stores',
      'No tipping required but 5-10% appreciated'
    ],
    averageCosts: {
      meal: '€12-20',
      hotel: '€60-120',
      transport: '€2-4 per journey'
    },
    bestTimeToVisit: 'May-October',
    languages: ['German', 'English']
  },
  {
    name: 'Switzerland',
    currency: 'CHF',
    currencyName: 'Swiss Franc',
    flag: '🇨🇭',
    continent: 'Europe',
    tips: [
      'Very expensive country',
      'Cards widely accepted',
      'Rounding up bills is common'
    ],
    averageCosts: {
      meal: 'CHF 20-35',
      hotel: 'CHF 150-300',
      transport: 'CHF 5-15 per journey'
    },
    bestTimeToVisit: 'June-September',
    languages: ['German', 'French', 'Italian', 'English']
  },
  {
    name: 'Norway',
    currency: 'NOK',
    currencyName: 'Norwegian Krone',
    flag: '🇳🇴',
    continent: 'Europe',
    tips: [
      'Cashless society - cards everywhere',
      'Very expensive',
      'No tipping expected'
    ],
    averageCosts: {
      meal: 'NOK 200-350',
      hotel: 'NOK 1000-2000',
      transport: 'NOK 50-100 per journey'
    },
    bestTimeToVisit: 'May-September',
    languages: ['Norwegian', 'English']
  },
  {
    name: 'Sweden',
    currency: 'SEK',
    currencyName: 'Swedish Krona',
    flag: '🇸🇪',
    continent: 'Europe',
    tips: [
      'Nearly cashless society',
      'Swish mobile payments popular',
      'No tipping expected'
    ],
    averageCosts: {
      meal: 'SEK 120-250',
      hotel: 'SEK 800-1500',
      transport: 'SEK 30-60 per journey'
    },
    bestTimeToVisit: 'May-September',
    languages: ['Swedish', 'English']
  },
  {
    name: 'Czech Republic',
    currency: 'CZK',
    currencyName: 'Czech Koruna',
    flag: '🇨🇿',
    continent: 'Europe',
    tips: [
      'Cash preferred in many places',
      'Great value for money',
      '10% tip is standard'
    ],
    averageCosts: {
      meal: 'CZK 150-300',
      hotel: 'CZK 1500-3000',
      transport: 'CZK 30-50 per journey'
    },
    bestTimeToVisit: 'April-October',
    languages: ['Czech', 'English']
  },
  {
    name: 'Poland',
    currency: 'PLN',
    currencyName: 'Polish Złoty',
    flag: '🇵🇱',
    continent: 'Europe',
    tips: [
      'Mix of cash and card payments',
      'Affordable destination',
      '10% tip appreciated'
    ],
    averageCosts: {
      meal: 'PLN 25-50',
      hotel: 'PLN 200-400',
      transport: 'PLN 5-15 per journey'
    },
    bestTimeToVisit: 'May-September',
    languages: ['Polish', 'English']
  },
  {
    name: 'Hungary',
    currency: 'HUF',
    currencyName: 'Hungarian Forint',
    flag: '🇭🇺',
    continent: 'Europe',
    tips: [
      'Cash common in restaurants',
      'Cards accepted in hotels/shops',
      '10-15% tip expected'
    ],
    averageCosts: {
      meal: 'HUF 2000-4000',
      hotel: 'HUF 15000-30000',
      transport: 'HUF 350-500 per journey'
    },
    bestTimeToVisit: 'April-October',
    languages: ['Hungarian', 'English']
  },
  {
    name: 'Russia',
    currency: 'RUB',
    currencyName: 'Russian Ruble',
    flag: '🇷🇺',
    continent: 'Europe/Asia',
    tips: [
      'Cash preferred in many places',
      'Check current restrictions',
      'Tipping 10% is common'
    ],
    averageCosts: {
      meal: '₽500-1500',
      hotel: '₽2000-6000',
      transport: '₽30-100 per journey'
    },
    bestTimeToVisit: 'May-September',
    languages: ['Russian']
  },

  // Asia
  {
    name: 'Japan',
    currency: 'JPY',
    currencyName: 'Japanese Yen',
    flag: '🇯🇵',
    continent: 'Asia',
    tips: [
      'Cash still king in many places',
      'IC cards for train travel',
      'No tipping culture'
    ],
    averageCosts: {
      meal: '¥800-2000',
      hotel: '¥8000-15000',
      transport: '¥200-400 per journey'
    },
    bestTimeToVisit: 'March-May, September-November',
    languages: ['Japanese', 'Limited English']
  },
  {
    name: 'China',
    currency: 'CNY',
    currencyName: 'Chinese Yuan',
    flag: '🇨🇳',
    continent: 'Asia',
    tips: [
      'Mobile payments dominant (WeChat/Alipay)',
      'Cash backup recommended',
      'No tipping expected'
    ],
    averageCosts: {
      meal: '¥30-80',
      hotel: '¥200-500',
      transport: '¥5-20 per journey'
    },
    bestTimeToVisit: 'April-May, September-October',
    languages: ['Mandarin', 'Limited English']
  },
  {
    name: 'South Korea',
    currency: 'KRW',
    currencyName: 'Korean Won',
    flag: '🇰🇷',
    continent: 'Asia',
    tips: [
      'Cards widely accepted',
      'T-money card for transport',
      'Tipping not expected'
    ],
    averageCosts: {
      meal: '₩8000-20000',
      hotel: '₩80000-150000',
      transport: '₩1500-3000 per journey'
    },
    bestTimeToVisit: 'April-June, September-November',
    languages: ['Korean', 'English in Seoul']
  },
  {
    name: 'Thailand',
    currency: 'THB',
    currencyName: 'Thai Baht',
    flag: '🇹🇭',
    continent: 'Asia',
    tips: [
      'Have cash for street food',
      'Cards accepted in malls',
      'Negotiate prices at markets'
    ],
    averageCosts: {
      meal: '฿50-200',
      hotel: '฿500-2000',
      transport: '฿30-100 per journey'
    },
    bestTimeToVisit: 'November-March',
    languages: ['Thai', 'English in tourist areas']
  },
  {
    name: 'Singapore',
    currency: 'SGD',
    currencyName: 'Singapore Dollar',
    flag: '🇸🇬',
    continent: 'Asia',
    tips: [
      'Cards accepted everywhere',
      'EZ-Link card for transport',
      'No tipping required'
    ],
    averageCosts: {
      meal: 'S$5-25',
      hotel: 'S$100-250',
      transport: 'S$1-3 per journey'
    },
    bestTimeToVisit: 'February-April',
    languages: ['English', 'Mandarin', 'Malay', 'Tamil']
  },
  {
    name: 'India',
    currency: 'INR',
    currencyName: 'Indian Rupee',
    flag: '🇮🇳',
    continent: 'Asia',
    tips: [
      'Cash still widely used',
      'UPI payments growing',
      'Bargaining is common'
    ],
    averageCosts: {
      meal: '₹100-500',
      hotel: '₹1500-5000',
      transport: '₹20-100 per journey'
    },
    bestTimeToVisit: 'October-March',
    languages: ['Hindi', 'English', 'Regional languages']
  },
  {
    name: 'Malaysia',
    currency: 'MYR',
    currencyName: 'Malaysian Ringgit',
    flag: '🇲🇾',
    continent: 'Asia',
    tips: [
      'Cash and cards both accepted',
      'Touch n Go for transport',
      'Tipping not mandatory'
    ],
    averageCosts: {
      meal: 'RM 5-25',
      hotel: 'RM 80-200',
      transport: 'RM 1-5 per journey'
    },
    bestTimeToVisit: 'December-February',
    languages: ['Malay', 'English', 'Mandarin']
  },
  {
    name: 'Indonesia',
    currency: 'IDR',
    currencyName: 'Indonesian Rupiah',
    flag: '🇮🇩',
    continent: 'Asia',
    tips: [
      'Cash preferred in local areas',
      'Cards in hotels/malls',
      'Bargaining expected'
    ],
    averageCosts: {
      meal: 'Rp 25000-100000',
      hotel: 'Rp 300000-800000',
      transport: 'Rp 10000-50000 per journey'
    },
    bestTimeToVisit: 'April-October',
    languages: ['Indonesian', 'English in tourist areas']
  },
  {
    name: 'Philippines',
    currency: 'PHP',
    currencyName: 'Philippine Peso',
    flag: '🇵🇭',
    continent: 'Asia',
    tips: [
      'Cash is king',
      'Cards in major establishments',
      'Tipping 10% appreciated'
    ],
    averageCosts: {
      meal: '₱150-500',
      hotel: '₱1500-4000',
      transport: '₱50-200 per journey'
    },
    bestTimeToVisit: 'December-April',
    languages: ['Filipino', 'English']
  },
  {
    name: 'Vietnam',
    currency: 'VND',
    currencyName: 'Vietnamese Dong',
    flag: '🇻🇳',
    continent: 'Asia',
    tips: [
      'Cash for street food/local',
      'Cards in hotels/restaurants',
      'Bargaining common'
    ],
    averageCosts: {
      meal: '₫50000-200000',
      hotel: '₫500000-1500000',
      transport: '₫20000-100000 per journey'
    },
    bestTimeToVisit: 'February-April, August-October',
    languages: ['Vietnamese', 'English in cities']
  },

  // Americas
  {
    name: 'United States',
    currency: 'USD',
    currencyName: 'US Dollar',
    flag: '🇺🇸',
    continent: 'North America',
    tips: [
      'Cards accepted everywhere',
      'Tipping 18-20% expected',
      'Apple Pay/Google Pay widely used'
    ],
    averageCosts: {
      meal: '$15-35',
      hotel: '$100-250',
      transport: '$3-15 per journey'
    },
    bestTimeToVisit: 'Varies by region',
    languages: ['English', 'Spanish']
  },
  {
    name: 'Canada',
    currency: 'CAD',
    currencyName: 'Canadian Dollar',
    flag: '🇨🇦',
    continent: 'North America',
    tips: [
      'Cards preferred over cash',
      'Tipping 15-20% standard',
      'Tap payments common'
    ],
    averageCosts: {
      meal: 'C$15-30',
      hotel: 'C$120-220',
      transport: 'C$3-8 per journey'
    },
    bestTimeToVisit: 'June-September',
    languages: ['English', 'French']
  },
  {
    name: 'Mexico',
    currency: 'MXN',
    currencyName: 'Mexican Peso',
    flag: '🇲🇽',
    continent: 'North America',
    tips: [
      'Cash preferred in local areas',
      'USD often accepted in tourist zones',
      'Tipping 10-15% common'
    ],
    averageCosts: {
      meal: '$150-400 MXN',
      hotel: '$800-2500 MXN',
      transport: '$20-100 MXN per journey'
    },
    bestTimeToVisit: 'December-April',
    languages: ['Spanish', 'English in tourist areas']
  },
  {
    name: 'Brazil',
    currency: 'BRL',
    currencyName: 'Brazilian Real',
    flag: '🇧🇷',
    continent: 'South America',
    tips: [
      'Cards widely accepted',
      'PIX instant payments popular',
      'Service charge often included'
    ],
    averageCosts: {
      meal: 'R$25-60',
      hotel: 'R$150-400',
      transport: 'R$5-20 per journey'
    },
    bestTimeToVisit: 'May-September',
    languages: ['Portuguese', 'Limited English']
  },
  {
    name: 'Argentina',
    currency: 'ARS',
    currencyName: 'Argentine Peso',
    flag: '🇦🇷',
    continent: 'South America',
    tips: [
      'Bring USD cash for better rates',
      'Blue dollar rate exists',
      'Cards accepted but fees apply'
    ],
    averageCosts: {
      meal: '$2000-5000 ARS',
      hotel: '$15000-40000 ARS',
      transport: '$200-800 ARS per journey'
    },
    bestTimeToVisit: 'March-May, September-November',
    languages: ['Spanish', 'Limited English']
  },
  {
    name: 'Chile',
    currency: 'CLP',
    currencyName: 'Chilean Peso',
    flag: '🇨🇱',
    continent: 'South America',
    tips: [
      'Cards widely accepted',
      'Peso values in thousands',
      'Tipping 10% standard'
    ],
    averageCosts: {
      meal: '$8000-18000 CLP',
      hotel: '$50000-120000 CLP',
      transport: '$800-2000 CLP per journey'
    },
    bestTimeToVisit: 'December-March',
    languages: ['Spanish', 'Limited English']
  },

  // Oceania
  {
    name: 'Australia',
    currency: 'AUD',
    currencyName: 'Australian Dollar',
    flag: '🇦🇺',
    continent: 'Oceania',
    tips: [
      'Tap and go everywhere',
      'No need for large cash amounts',
      'Tipping not mandatory'
    ],
    averageCosts: {
      meal: 'A$20-40',
      hotel: 'A$100-200',
      transport: 'A$3-8 per journey'
    },
    bestTimeToVisit: 'September-November, March-May',
    languages: ['English']
  },
  {
    name: 'New Zealand',
    currency: 'NZD',
    currencyName: 'New Zealand Dollar',
    flag: '🇳🇿',
    continent: 'Oceania',
    tips: [
      'Cards accepted everywhere',
      'EFTPOS very common',
      'No tipping culture'
    ],
    averageCosts: {
      meal: 'NZ$18-35',
      hotel: 'NZ$100-180',
      transport: 'NZ$3-6 per journey'
    },
    bestTimeToVisit: 'December-March',
    languages: ['English', 'Maori']
  },

  // Africa
  {
    name: 'South Africa',
    currency: 'ZAR',
    currencyName: 'South African Rand',
    flag: '🇿🇦',
    continent: 'Africa',
    tips: [
      'Cards accepted in cities',
      'Cash needed in rural areas',
      'Tipping 10-15% expected'
    ],
    averageCosts: {
      meal: 'R100-250',
      hotel: 'R800-2000',
      transport: 'R20-80 per journey'
    },
    bestTimeToVisit: 'May-September',
    languages: ['English', 'Afrikaans', '9 other official languages']
  },
  {
    name: 'Egypt',
    currency: 'EGP',
    currencyName: 'Egyptian Pound',
    flag: '🇪🇬',
    continent: 'Africa',
    tips: [
      'Cash preferred',
      'USD accepted in tourist areas',
      'Bargaining expected'
    ],
    averageCosts: {
      meal: 'EGP 100-300',
      hotel: 'EGP 800-2500',
      transport: 'EGP 20-100 per journey'
    },
    bestTimeToVisit: 'October-April',
    languages: ['Arabic', 'English in tourist areas']
  },
  {
    name: 'Morocco',
    currency: 'MAD',
    currencyName: 'Moroccan Dirham',
    flag: '🇲🇦',
    continent: 'Africa',
    tips: [
      'Cash is king',
      'ATMs available in cities',
      'Bargaining is part of culture'
    ],
    averageCosts: {
      meal: 'MAD 50-150',
      hotel: 'MAD 300-800',
      transport: 'MAD 10-50 per journey'
    },
    bestTimeToVisit: 'April-May, September-November',
    languages: ['Arabic', 'French', 'Berber']
  },

  // Middle East
  {
    name: 'UAE',
    currency: 'AED',
    currencyName: 'UAE Dirham',
    flag: '🇦🇪',
    continent: 'Middle East',
    tips: [
      'Cards widely accepted',
      'No alcohol tax',
      'Tipping 10-15% appreciated'
    ],
    averageCosts: {
      meal: 'AED 30-100',
      hotel: 'AED 300-800',
      transport: 'AED 5-25 per journey'
    },
    bestTimeToVisit: 'November-March',
    languages: ['Arabic', 'English']
  },
  {
    name: 'Turkey',
    currency: 'TRY',
    currencyName: 'Turkish Lira',
    flag: '🇹🇷',
    continent: 'Europe/Asia',
    tips: [
      'Cash and cards both used',
      'Currency can be volatile',
      'Bargaining common in bazaars'
    ],
    averageCosts: {
      meal: '₺40-120',
      hotel: '₺300-800',
      transport: '₺5-25 per journey'
    },
    bestTimeToVisit: 'April-May, September-October',
    languages: ['Turkish', 'English in tourist areas']
  },
  {
    name: 'Israel',
    currency: 'ILS',
    currencyName: 'Israeli Shekel',
    flag: '🇮🇱',
    continent: 'Middle East',
    tips: [
      'Cards widely accepted',
      'Shabbat affects services',
      'Tipping 10-15% standard'
    ],
    averageCosts: {
      meal: '₪50-120',
      hotel: '₪400-800',
      transport: '₪6-20 per journey'
    },
    bestTimeToVisit: 'April-May, September-November',
    languages: ['Hebrew', 'Arabic', 'English']
  }
];

const TravelMoney = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [travelBudget, setTravelBudget] = useState('');
  const [tripDays, setTripDays] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const calculateDailyBudget = () => {
    if (!travelBudget || !tripDays) return null;
    return (parseFloat(travelBudget) / parseFloat(tripDays)).toFixed(2);
  };

  const continents = [...new Set(allDestinations.map(dest => dest.continent))];
  
  const filteredDestinations = allDestinations.filter(dest =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.currencyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDestinationsByContinent = (continent: string) => {
    return filteredDestinations.filter(dest => dest.continent === continent);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <CardTitle>Travel Destination Guide</CardTitle>
          </div>
          <CardDescription>
            Choose your destination to get currency and travel information
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="space-y-3">
            <Label>Search Destinations</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by country name or currency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Destination Selection by Continent */}
          <div className="space-y-4">
            <Label>Select Your Destination by Region</Label>
            <Tabs defaultValue={continents[0]} className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                {continents.map((continent) => (
                  <TabsTrigger key={continent} value={continent} className="text-xs">
                    {continent.replace('North America', 'N. America').replace('South America', 'S. America').replace('Middle East', 'M. East')}
                  </TabsTrigger>
                ))}
              </TabsList>

              {continents.map((continent) => (
                <TabsContent key={continent} value={continent} className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {getDestinationsByContinent(continent).map((country) => (
                      <Button
                        key={country.name}
                        variant={selectedCountry?.name === country.name ? 'default' : 'outline'}
                        className="h-auto p-3 flex flex-col items-center gap-2 text-left"
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
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Country Information */}
          {selectedCountry && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  {selectedCountry.name} - {selectedCountry.currency}
                </CardTitle>
                <CardDescription>
                  {selectedCountry.currencyName} • Best time to visit: {selectedCountry.bestTimeToVisit}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Languages */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedCountry.languages.map((lang, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Payment Tips */}
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment & Money Tips
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
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-medium">Meal</div>
                      <div className="text-muted-foreground">{selectedCountry.averageCosts.meal}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="font-medium">Hotel</div>
                      <div className="text-muted-foreground">{selectedCountry.averageCosts.hotel}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
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
                {selectedCountry && ` for ${selectedCountry.name}`}
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
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Daily Budget</div>
                    <div className="text-2xl font-bold text-primary">
                      ${calculateDailyBudget()}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      per day for {tripDays} days
                      {selectedCountry && ` in ${selectedCountry.name}`}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Money Transfer Services */}
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