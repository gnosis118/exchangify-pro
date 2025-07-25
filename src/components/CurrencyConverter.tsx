import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExchangeRates {
  [key: string]: number;
}

interface CryptoPrice {
  [key: string]: number;
}

const fiatCurrencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
];

const cryptocurrencies = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'binancecoin', name: 'BNB', symbol: 'BNB' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [cryptoTargetCurrency, setCryptoTargetCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [cryptoPrice, setCryptoPrice] = useState<CryptoPrice>({});
  const [fiatLoading, setFiatLoading] = useState(false);
  const [cryptoLoading, setCryptoLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchExchangeRates = useCallback(async (baseCurrency: string) => {
    try {
      setFiatLoading(true);
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      if (!response.ok) throw new Error('Failed to fetch exchange rates');
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Exchange rate fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch exchange rates. Please try again.",
        variant: "destructive"
      });
    } finally {
      setFiatLoading(false);
    }
  }, [toast]);

  const fetchCryptoPrice = useCallback(async (cryptoId: string, vsCurrency: string) => {
    try {
      setCryptoLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=${vsCurrency.toLowerCase()}&include_24hr_change=true`
      );
      if (!response.ok) throw new Error('Failed to fetch crypto price');
      const data = await response.json();
      setCryptoPrice(data[cryptoId]);
    } catch (error) {
      console.error('Crypto price fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch cryptocurrency prices. Please try again.",
        variant: "destructive"
      });
    } finally {
      setCryptoLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchExchangeRates(fromCurrency);
  }, [fromCurrency, fetchExchangeRates]);

  useEffect(() => {
    fetchCryptoPrice(selectedCrypto, cryptoTargetCurrency);
  }, [selectedCrypto, cryptoTargetCurrency, fetchCryptoPrice]);

  const convertedAmount = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || !exchangeRates[toCurrency]) return '0.00';
    
    if (fromCurrency === toCurrency) return numAmount.toFixed(2);
    
    const rate = exchangeRates[toCurrency];
    return (numAmount * rate).toFixed(2);
  };

  const getExchangeRate = () => {
    if (!exchangeRates[toCurrency] || fromCurrency === toCurrency) return null;
    return `1 ${fromCurrency} = ${exchangeRates[toCurrency].toFixed(4)} ${toCurrency}`;
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCryptoPrice = (price: number) => {
    if (price >= 1) return price.toFixed(2);
    if (price >= 0.01) return price.toFixed(4);
    return price.toFixed(6);
  };

  const getCryptoChange = () => {
    const changeKey = `${cryptoTargetCurrency.toLowerCase()}_24h_change`;
    return cryptoPrice[changeKey] || 0;
  };

  const refresh = () => {
    fetchExchangeRates(fromCurrency);
    fetchCryptoPrice(selectedCrypto, cryptoTargetCurrency);
  };

  return (
    <div className="min-h-screen bg-converter-bg p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Currency Converter</h1>
          <p className="text-muted-foreground text-lg">Real-time exchange rates and cryptocurrency prices</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Fiat Currency Converter */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Currency Converter</span>
                <Button variant="ghost" size="sm" onClick={refresh} disabled={fiatLoading}>
                  <RefreshCw className={`h-4 w-4 ${fiatLoading ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">From</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fiatCurrencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapCurrencies}
                  className="mb-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">To</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fiatCurrencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-price-bg p-4 rounded-lg">
                <div className="text-3xl font-bold text-foreground">
                  {fiatLoading ? (
                    <div className="animate-pulse bg-muted h-8 w-32 rounded" />
                  ) : (
                    `${convertedAmount()} ${toCurrency}`
                  )}
                </div>
                {getExchangeRate() && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {getExchangeRate()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cryptocurrency Converter */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Cryptocurrency Prices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Cryptocurrency</label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptocurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.id}>
                          {crypto.symbol} - {crypto.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Target Currency</label>
                  <Select value={cryptoTargetCurrency} onValueChange={setCryptoTargetCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fiatCurrencies.slice(0, 5).map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-price-bg p-4 rounded-lg">
                <div className="text-2xl font-bold text-foreground">
                  {cryptoLoading ? (
                    <div className="animate-pulse bg-muted h-6 w-40 rounded" />
                  ) : (
                    `${formatCryptoPrice(cryptoPrice[cryptoTargetCurrency.toLowerCase()] || 0)} ${cryptoTargetCurrency}`
                  )}
                </div>
                
                {!cryptoLoading && cryptoPrice && (
                  <div className="flex items-center mt-2 space-x-2">
                    <span className="text-sm text-muted-foreground">24h change:</span>
                    <div className={`flex items-center space-x-1 ${getCryptoChange() >= 0 ? 'text-chart-positive' : 'text-chart-negative'}`}>
                      {getCryptoChange() >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {getCryptoChange().toFixed(2)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          {lastUpdated && (
            <div>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <div className="mt-2">
            Exchange rates powered by Exchange Rates API • Cryptocurrency data by CoinGecko
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;