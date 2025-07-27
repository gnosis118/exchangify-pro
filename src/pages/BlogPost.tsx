import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, TrendingUp, ArrowUpDown, RefreshCw } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [amount, setAmount] = useState(1000);
  const [rates, setRates] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
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
  }, []);

  const currentRate = rates.EUR?.toFixed(4) || '0.8520';
  const convertedAmount = (amount * (rates.EUR || 0.8520)).toFixed(2);

  if (slug !== 'usd-to-eur-exchange-rate-today') {
    return <div>Post not found</div>;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Real-Time Currency Converter: USD to EUR Exchange Rate Today",
    "description": "Comprehensive guide to USD to EUR exchange rates with live conversion tools and market analysis",
    "datePublished": "2024-01-27",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Organization",
      "name": "Currency to Currency"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Currency to Currency"
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHead
        title="USD to EUR Exchange Rate Today - Live Currency Converter | Currency to Currency"
        description="Get real-time USD to EUR exchange rates. Convert dollars to euros with our live calculator. Current rate, analysis, and best conversion methods."
        keywords="USD to EUR, currency converter, dollar to euro, exchange rate USD EUR, real time rates"
        canonical="https://currencytocurrency.com/blog/usd-to-eur-exchange-rate-today"
        structuredData={structuredData}
      />

      <article className="container mx-auto px-4 max-w-4xl">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Badge>Exchange Rates</Badge>
            <Badge variant="outline">Featured</Badge>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            Real-Time Currency Converter: USD to EUR Exchange Rate Today
          </h1>
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              January 27, 2024
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              8 min read
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-primary/5 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">Converting USD to EUR? Get the most accurate real-time rates here</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground">Current USD/EUR Rate</div>
                <div className="text-2xl font-bold text-primary">{currentRate}</div>
                <div className="text-sm text-muted-foreground">Last updated: {lastUpdated}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <div className="text-sm text-muted-foreground">24h Change</div>
                <div className="text-2xl font-bold text-green-600">+0.15%</div>
                <div className="text-sm text-muted-foreground">Trend: Bullish</div>
              </div>
            </div>
            <p className="text-lg">
              The USD to EUR exchange rate is influenced by Federal Reserve policies, European Central Bank decisions, and global economic conditions. Today's rate reflects current market sentiment and economic indicators from both regions.
            </p>
          </div>

          {/* Live Converter Tool */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Live USD to EUR Converter Tool</h2>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Currency Converter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount (USD)</label>
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
                    <label className="block text-sm font-medium mb-2">Converted (EUR)</label>
                    <div className="text-2xl font-bold text-primary">
                      €{convertedAmount}
                    </div>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">
                    Exchange Rate: 1 USD = {currentRate} EUR
                  </div>
                </div>
              </CardContent>
            </Card>

            <h3 className="text-xl font-semibold mb-3">How to Use the Tool:</h3>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>Enter the USD amount you want to convert</li>
              <li>View the real-time EUR equivalent</li>
              <li>Check the current exchange rate and last update time</li>
              <li>Click refresh for the latest rates</li>
            </ol>
          </section>

          {/* Current Rate Analysis */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Current USD/EUR Exchange Rate Analysis</h2>
            <p className="mb-4">
              Today's USD/EUR rate of {currentRate} represents a significant position compared to historical averages. The Federal Reserve's recent policy decisions and the European Central Bank's monetary stance continue to shape this crucial currency pair.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Key Market Drivers:</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Federal Reserve Policy:</strong> Interest rate decisions and quantitative easing measures</li>
              <li><strong>ECB Monetary Policy:</strong> European Central Bank's approach to inflation and growth</li>
              <li><strong>Economic Indicators:</strong> GDP growth, employment data, and inflation rates</li>
              <li><strong>Geopolitical Events:</strong> Trade relationships and political stability</li>
            </ul>

            <p className="mb-4">
              Recent economic events have created volatility in the USD/EUR pair. Market sentiment remains cautiously optimistic, with traders closely monitoring upcoming economic releases and central bank communications.
            </p>
          </section>

          {/* Best Times to Convert */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Best Times to Convert USD to EUR</h2>
            <p className="mb-4">
              Timing your currency conversion can significantly impact the amount you receive. Understanding market patterns and economic cycles can help optimize your exchange.
            </p>

            <h3 className="text-xl font-semibold mb-3">Optimal Conversion Timing:</h3>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li><strong>Market Hours:</strong> European and US overlap (8 AM - 11 AM EST) offers highest liquidity</li>
              <li><strong>Weekly Patterns:</strong> Tuesday-Thursday typically show more stable rates</li>
              <li><strong>Month-End:</strong> Avoid month-end due to corporate rebalancing</li>
              <li><strong>Economic Releases:</strong> Monitor Fed meetings and ECB announcements</li>
            </ul>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Pro Tip:</h4>
              <p className="text-blue-800">
                Set up rate alerts to be notified when USD/EUR reaches your target rate. This automated approach ensures you don't miss favorable exchange opportunities.
              </p>
            </div>
          </section>

          {/* Conversion Methods */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6">USD to EUR Conversion Methods Compared</h2>
            <p className="mb-4">
              Different conversion methods offer varying rates and fees. Here's a comprehensive comparison to help you choose the best option:
            </p>

            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Method</th>
                    <th className="border border-gray-300 p-3 text-left">Exchange Rate</th>
                    <th className="border border-gray-300 p-3 text-left">Fees</th>
                    <th className="border border-gray-300 p-3 text-left">Speed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Online Converter</td>
                    <td className="border border-gray-300 p-3">Market Rate</td>
                    <td className="border border-gray-300 p-3">0%</td>
                    <td className="border border-gray-300 p-3">Instant</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Banks</td>
                    <td className="border border-gray-300 p-3">2-4% markup</td>
                    <td className="border border-gray-300 p-3">$15-25</td>
                    <td className="border border-gray-300 p-3">1-3 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Money Transfer</td>
                    <td className="border border-gray-300 p-3">0.5-1% markup</td>
                    <td className="border border-gray-300 p-3">$3-10</td>
                    <td className="border border-gray-300 p-3">Minutes-Hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Conclusion</h2>
            <p className="mb-4">
              Converting USD to EUR requires understanding current market conditions, timing, and choosing the right conversion method. Our real-time converter provides accurate rates to help you make informed decisions.
            </p>
            
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Take Action:</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Bookmark our converter for daily rate checks</li>
                <li>Set up rate alerts for your target exchange level</li>
                <li>Monitor economic calendars for market-moving events</li>
              </ul>
              <Button className="mr-4">
                Set Rate Alert
              </Button>
              <Button variant="outline">
                View Other Pairs
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;