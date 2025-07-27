import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, Clock, ArrowRightLeft } from 'lucide-react';
import { toast } from './ui/use-toast';
import SEOHead from './SEOHead';
import HowToGuide from './HowToGuide';

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

const popularPairs = [
  { from: 'USD', to: 'EUR', name: 'US Dollar to Euro' },
  { from: 'USD', to: 'GBP', name: 'US Dollar to British Pound' },
  { from: 'USD', to: 'JPY', name: 'US Dollar to Japanese Yen' },
  { from: 'EUR', to: 'GBP', name: 'Euro to British Pound' },
  { from: 'USD', to: 'CAD', name: 'US Dollar to Canadian Dollar' },
  { from: 'USD', to: 'AUD', name: 'US Dollar to Australian Dollar' },
  { from: 'GBP', to: 'USD', name: 'British Pound to US Dollar' },
  { from: 'EUR', to: 'USD', name: 'Euro to US Dollar' }
];

const currencyInfo: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£' },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
};

const CurrencyPairPage = () => {
  const { pair } = useParams<{ pair: string }>();
  const [fromCurrency, toCurrency] = pair?.split('-to-') || ['USD', 'EUR'];
  const [amount, setAmount] = useState(1);
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fromInfo = currencyInfo[fromCurrency.toUpperCase()] || { code: fromCurrency, name: fromCurrency, symbol: fromCurrency };
  const toInfo = currencyInfo[toCurrency.toUpperCase()] || { code: toCurrency, name: toCurrency, symbol: toCurrency };

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.toUpperCase()}`);
      if (!response.ok) throw new Error('Failed to fetch rates');
      const data = await response.json();
      setRates(data.rates);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      toast({
        title: "Error fetching rates",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [fromCurrency, toCurrency]);

  const convertedAmount = rates[toCurrency.toUpperCase()] ? (amount * rates[toCurrency.toUpperCase()]).toFixed(4) : '0';
  const rate = rates[toCurrency.toUpperCase()]?.toFixed(4) || '0';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${fromInfo.name} to ${toInfo.name} Exchange Rate`,
    "description": `Current exchange rate and converter for ${fromInfo.name} (${fromInfo.code}) to ${toInfo.name} (${toInfo.code})`,
    "url": `https://currencytocurrency.com/${pair}`,
    "provider": {
      "@type": "Organization",
      "name": "Currency to Currency"
    },
    "featureList": [
      "Real-time exchange rates",
      "Historical data",
      "Currency conversion calculator"
    ]
  };

  return (
    <div className="min-h-screen bg-converter-bg py-8">
      <SEOHead
        title={`${fromInfo.name} to ${toInfo.name} - ${fromInfo.code}/${toInfo.code} Exchange Rate | Currency to Currency`}
        description={`Convert ${fromInfo.name} to ${toInfo.name} with live exchange rates. Current ${fromInfo.code} to ${toInfo.code} rate: ${rate}. Free currency converter with historical charts.`}
        keywords={`${fromInfo.code} to ${toInfo.code}, ${fromInfo.name} to ${toInfo.name}, exchange rate, currency converter, ${fromInfo.code}${toInfo.code}`}
        canonical={`https://currencytocurrency.com/${pair}`}
        structuredData={structuredData}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {fromInfo.name} to {toInfo.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            Live {fromInfo.code} to {toInfo.code} exchange rate and currency converter
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5" />
              Currency Converter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-2">Amount ({fromInfo.code})</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                />
              </div>
              <div className="text-center">
                <Button onClick={fetchRates} disabled={loading} variant="outline" size="sm">
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Converted ({toInfo.code})</label>
                <div className="text-2xl font-bold text-primary">
                  {toInfo.symbol}{convertedAmount}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  1 {fromInfo.code} = {rate} {toInfo.code}
                </span>
              </div>
              {lastUpdated && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Updated: {lastUpdated}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>About {fromInfo.name} ({fromInfo.code})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The {fromInfo.name} is a widely traded currency in the global foreign exchange market.
                Get the latest {fromInfo.code} exchange rates and historical data for your conversions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About {toInfo.name} ({toInfo.code})</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The {toInfo.name} is an important currency for international trade and finance.
                Track {toInfo.code} exchange rates and conversion trends with our real-time data.
              </p>
            </CardContent>
          </Card>
        </div>

        <HowToGuide fromCurrency={fromInfo.name} toCurrency={toInfo.name} />

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Popular Currency Pairs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {popularPairs.map((pairItem) => (
                <Button
                  key={`${pairItem.from}-${pairItem.to}`}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => window.location.href = `/${pairItem.from.toLowerCase()}-to-${pairItem.to.toLowerCase()}`}
                >
                  {pairItem.from}/{pairItem.to}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CurrencyPairPage;