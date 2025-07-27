import { useState, useEffect, useCallback } from 'react';
import CookieConsent from '@/components/CookieConsent';
import { ShareButton } from '@/components/ShareButton';
import { InstallPrompt } from '@/components/InstallPrompt';
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
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'CNY', name: 'Chinese Yuan Renminbi', symbol: '¥' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SR' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
  { code: 'COP', name: 'Colombian Peso', symbol: '$' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦' },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
  { code: 'TWD', name: 'New Taiwan Dollar', symbol: 'NT$' },
];

const cryptocurrencies = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'tether', name: 'Tether', symbol: 'USDT' },
  { id: 'usd-coin', name: 'USD Coin', symbol: 'USDC' },
  { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
  { id: 'the-open-network', name: 'Toncoin', symbol: 'TON' },
  { id: 'tron', name: 'TRON', symbol: 'TRX' },
  { id: 'avalanche-2', name: 'Avalanche', symbol: 'AVAX' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB' },
  { id: 'matic-network', name: 'Polygon', symbol: 'MATIC' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
  { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
  { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH' },
  { id: 'wrapped-bitcoin', name: 'Wrapped Bitcoin', symbol: 'WBTC' },
  { id: 'dai', name: 'DAI (MakerDAO Stablecoin)', symbol: 'DAI' },
  { id: 'stellar', name: 'Stellar Lumens', symbol: 'XLM' },
  { id: 'cosmos', name: 'Cosmos', symbol: 'ATOM' },
  { id: 'leo-token', name: 'UNUS SED LEO', symbol: 'LEO' },
  { id: 'monero', name: 'Monero', symbol: 'XMR' },
  { id: 'okb', name: 'OKB Token', symbol: 'OKB' },
  { id: 'crypto-com-chain', name: 'Cronos (Crypto.com)', symbol: 'CRO' },
  { id: 'near', name: 'Near Protocol', symbol: 'NEAR' },
  { id: 'internet-computer', name: 'Internet Computer', symbol: 'ICP' },
  { id: 'quant-network', name: 'Quant Network', symbol: 'QNT' },
  { id: 'filecoin', name: 'Filecoin', symbol: 'FIL' },
  { id: 'aptos', name: 'Aptos', symbol: 'APT' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB' },
  { id: 'maker', name: 'Maker', symbol: 'MKR' },
  { id: 'aave', name: 'Aave', symbol: 'AAVE' },
  { id: 'elrond-erd-2', name: 'MultiversX (Elrond)', symbol: 'EGLD' },
  { id: 'the-sandbox', name: 'The Sandbox', symbol: 'SAND' },
  { id: 'axie-infinity', name: 'Axie Infinity', symbol: 'AXS' },
  { id: 'theta-token', name: 'Theta Network', symbol: 'THETA' },
  { id: 'render-token', name: 'Render Token', symbol: 'RNDR' },
  { id: 'flow', name: 'Flow', symbol: 'FLOW' },
  { id: 'decentraland', name: 'Decentraland', symbol: 'MANA' },
  { id: 'chiliz', name: 'Chiliz', symbol: 'CHZ' },
  { id: 'lido-dao', name: 'Lido DAO', symbol: 'LDO' },
  { id: 'the-graph', name: 'The Graph', symbol: 'GRT' },
  { id: 'blockstack', name: 'Stacks', symbol: 'STX' },
  { id: 'algorand', name: 'Algorand', symbol: 'ALGO' },
  { id: 'injective-protocol', name: 'Injective Protocol', symbol: 'INJ' },
  { id: 'kaspa', name: 'Kaspa', symbol: 'KAS' },
  { id: 'fantom', name: 'Fantom', symbol: 'FTM' },
  { id: 'celestia', name: 'Celestia', symbol: 'TIA' },
  { id: 'ethereum-name-service', name: 'Ethereum Name Service', symbol: 'ENS' },
  { id: 'stepn', name: 'STEPN', symbol: 'GMT' },
  { id: 'immutable-x', name: 'Immutable X', symbol: 'IMX' },
  { id: 'optimism', name: 'Optimism', symbol: 'OP' },
  { id: 'pyth-network', name: 'Pyth Network', symbol: 'PYTH' },
  { id: 'dydx', name: 'dYdX', symbol: 'DYDX' },
  { id: 'oasis-network', name: 'Oasis Network', symbol: 'ROSE' },
  { id: 'zcash', name: 'Zcash', symbol: 'ZEC' },
  { id: 'terra-luna', name: 'Terra Classic', symbol: 'LUNC' },
  { id: 'hedera-hashgraph', name: 'Hedera Hashgraph', symbol: 'HBAR' },
  { id: 'bitcoin-gold', name: 'Bitcoin Gold', symbol: 'BTG' },
  { id: 'sui', name: 'Sui', symbol: 'SUI' },
  { id: 'conflux-token', name: 'Conflux', symbol: 'CFX' },
  { id: 'celo', name: 'CELO', symbol: 'CELO' },
  { id: 'neo', name: 'NEO', symbol: 'NEO' },
  { id: 'kava', name: 'Kava', symbol: 'KAVA' },
  { id: 'iota', name: 'IOTA', symbol: 'IOTA' },
  { id: 'mina-protocol', name: 'Mina Protocol', symbol: 'MINA' },
  { id: 'thorchain', name: 'Thorchain', symbol: 'RUNE' },
  { id: 'xdce-crowd-sale', name: 'XDC Network', symbol: 'XDC' },
  { id: 'vechain', name: 'VeChain', symbol: 'VET' },
  { id: 'bitcoin-cash-sv', name: 'Bitcoin SV', symbol: 'BSV' },
  { id: 'stratis', name: 'Stratis', symbol: 'STRAX' },
  { id: 'ecash', name: 'eCash', symbol: 'XEC' },
  { id: 'osmosis', name: 'Osmosis', symbol: 'OSMO' },
  { id: 'nexo', name: 'Nexo', symbol: 'NEXO' },
  { id: 'secret', name: 'Secret Network', symbol: 'SCRT' },
  { id: 'zilliqa', name: 'Zilliqa', symbol: 'ZIL' },
  { id: 'ankr', name: 'Ankr', symbol: 'ANKR' },
  { id: 'gala', name: 'Gala Games', symbol: 'GALA' },
  { id: 'baby-doge-coin', name: 'Baby Doge Coin', symbol: 'BABYDOGE' },
];

const Index = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [cryptoAmount, setCryptoAmount] = useState('1');
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

  const convertedCryptoAmount = () => {
    const numAmount = parseFloat(cryptoAmount);
    if (isNaN(numAmount) || !cryptoPrice[cryptoTargetCurrency.toLowerCase()]) return '0.00';
    
    const rate = cryptoPrice[cryptoTargetCurrency.toLowerCase()];
    return formatCryptoPrice(numAmount * rate);
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
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Free Currency Converter - Live Exchange Rates</h1>
          <p className="text-muted-foreground text-xl mb-4">Convert 150+ currencies and cryptocurrencies with real-time rates</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant currency conversions, track historical exchange rates, set price alerts, and access travel money tips. 
            Our free currency converter provides accurate real-time data for over 150 fiat currencies and 100+ cryptocurrencies.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>✓ Real-time rates</span>
            <span>✓ 150+ currencies</span>
            <span>✓ Historical charts</span>
            <span>✓ Price alerts</span>
            <span>✓ Travel guides</span>
          </div>
        </header>

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
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {fiatCurrencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{currency.code}</span>
                            <span className="text-muted-foreground">-</span>
                            <span className="text-sm">{currency.name}</span>
                          </div>
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
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {fiatCurrencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{currency.code}</span>
                            <span className="text-muted-foreground">-</span>
                            <span className="text-sm">{currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-price-bg p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-foreground">
                    {fiatLoading ? (
                      <div className="animate-pulse bg-muted h-8 w-32 rounded" />
                    ) : (
                      `${convertedAmount()} ${toCurrency}`
                    )}
                  </div>
                  {!fiatLoading && amount && convertedAmount() !== '0.00' && (
                    <ShareButton
                      fromCurrency={fromCurrency}
                      toCurrency={toCurrency}
                      amount={amount}
                      convertedAmount={convertedAmount()}
                      rate={(exchangeRates[toCurrency] || 0).toString()}
                    />
                  )}
                </div>
                
                {!fiatLoading && getExchangeRate() && (
                  <div className="text-sm text-muted-foreground mt-2">
                    {getExchangeRate()}
                  </div>
                )}
                
                {lastUpdated && (
                  <div className="text-xs text-muted-foreground mt-2">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cryptocurrency Converter */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cryptocurrency</span>
                <Button variant="ghost" size="sm" onClick={refresh} disabled={cryptoLoading}>
                  <RefreshCw className={`h-4 w-4 ${cryptoLoading ? 'animate-spin' : ''}`} />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Amount</label>
                <Input
                  type="number"
                  value={cryptoAmount}
                  onChange={(e) => setCryptoAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Cryptocurrency</label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {cryptocurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.id}>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{crypto.symbol}</span>
                            <span className="text-muted-foreground">-</span>
                            <span className="text-sm">{crypto.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">To</label>
                  <Select value={cryptoTargetCurrency} onValueChange={setCryptoTargetCurrency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fiatCurrencies.slice(0, 10).map((currency) => (
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
                  {cryptoLoading ? (
                    <div className="animate-pulse bg-muted h-8 w-32 rounded" />
                  ) : (
                    `${convertedCryptoAmount()} ${cryptoTargetCurrency}`
                  )}
                </div>
                
                {!cryptoLoading && cryptoPrice[cryptoTargetCurrency.toLowerCase()] && (
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-muted-foreground">
                      1 {cryptocurrencies.find(c => c.id === selectedCrypto)?.symbol} = {formatCryptoPrice(cryptoPrice[cryptoTargetCurrency.toLowerCase()])} {cryptoTargetCurrency}
                    </div>
                    <div className={`flex items-center text-sm ${getCryptoChange() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {getCryptoChange() >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(getCryptoChange()).toFixed(2)}%
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Install Prompt */}
        <div className="mt-8">
          <InstallPrompt />
        </div>

        {/* Cookie Consent */}
        <CookieConsent />
      </div>
    </div>
  );
};

export default Index;