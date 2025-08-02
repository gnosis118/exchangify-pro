import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import blogHero from '@/assets/blog-hero.jpg';
import blogPostBackground from '@/assets/blog-post-background.jpg';

const blogPosts = [
  {
    id: 'currency-conversion-small-business-guide',
    title: "Currency Conversion for Small Business Owners: Real-Time Exchange Rate Calculator Guide",
    excerpt: "Complete guide to currency conversion for small businesses. Learn to save hundreds annually on FX fees with real-time exchange rate calculators and strategic timing.",
    keywords: ['small business currency conversion', 'business exchange rates', 'international business finance', 'currency risk management', 'business foreign exchange'],
    readTime: '12 min read',
    publishDate: '2025-01-15',
    category: 'Business Finance',
    featured: true
  },
  {
    id: 'ecommerce-currency-conversion',
    title: "E-commerce Currency Conversion: International Pricing Strategies for Online Retailers",
    excerpt: "Master e-commerce currency conversion with automated pricing strategies, profit margin protection, and international market expansion techniques.",
    keywords: ['ecommerce currency conversion', 'international pricing', 'online retail currency', 'automated pricing strategies', 'global ecommerce'],
    readTime: '8 min read',
    publishDate: '2025-01-15',
    category: 'E-commerce',
    featured: true
  },
  {
    id: 'import-export-currency-conversion',
    title: "Import/Export Currency Conversion: Landed Cost Calculations & Supplier Payment Optimization",
    excerpt: "Master import/export currency conversion with landed cost calculations, supplier payment timing, and international trade finance strategies.",
    keywords: ['import export currency', 'landed cost calculations', 'supplier payment optimization', 'international trade finance', 'currency hedging'],
    readTime: '10 min read',
    publishDate: '2025-01-15',
    category: 'Import/Export',
    featured: false
  },
  {
    id: 'service-business-currency-conversion',
    title: "Service Business Currency Conversion: International Client Billing & Payment Optimization",
    excerpt: "Master service business currency conversion with international client billing strategies, payment timing optimization, and freelancer-friendly solutions.",
    keywords: ['service business currency', 'international client billing', 'freelancer currency conversion', 'payment optimization', 'remote work finance'],
    readTime: '7 min read',
    publishDate: '2025-01-15',
    category: 'Service Business',
    featured: false
  },
  {
    id: 'currency-conversion-risk-management',
    title: "Currency Conversion Risk Management: Hedging Strategies & Exposure Monitoring",
    excerpt: "Protect your business from currency conversion risks with proven hedging strategies, exposure monitoring, and risk management frameworks.",
    keywords: ['currency risk management', 'hedging strategies', 'foreign exchange risk', 'currency exposure', 'financial risk management'],
    readTime: '9 min read',
    publishDate: '2025-01-15',
    category: 'Risk Management',
    featured: false
  },
  {
    id: 'digital-nomad-banking-crisis-2025',
    title: "Digital Nomad Banking Crisis 2025: The Hidden $50 Billion Currency Exchange Problem",
    excerpt: "50+ Million Digital Nomads Are Bleeding $50 Billion Annually to Banking Fees. Discover the largest financial crisis you've never heard of and how platforms like CurrencyToCurrency.app are fighting back.",
    keywords: ['digital nomad banking fees', 'currency exchange crisis 2025', 'nomad financial freedom', 'banking fee avoidance', 'international transfer costs'],
    readTime: '28 min read',
    publishDate: '2025-02-01',
    category: 'Investigative Report',
    featured: true
  },
  {
    id: 'trump-2025-tariffs-currency-exchange-travel-money',
    title: "Trump's 2025 Tariff War: How Currency Exchange Rates Will Impact Your Travel Money",
    excerpt: "Trump's 25% tariffs on Canada & Mexico are shaking currency markets. Learn how these tariff wars will impact your travel money & exchange rates with real-time analysis and protection strategies.",
    keywords: ['Trump tariffs currency impact', '2025 travel money exchange rates', 'tariff effects on currency', 'Trump Canada Mexico tariffs travel cost', 'currency exchange tariff impact 2025'],
    readTime: '22 min read',
    publishDate: '2025-01-28',
    category: 'Breaking News',
    featured: true
  },
  {
    id: '2025-currency-market-predictions',
    title: '2025 Currency Market Predictions: What to Expect This Year',
    excerpt: '2025 promises pivotal changes for global currencies. JP Morgan forecasts Dollar gains of 5.9%, Euro parity testing, and emerging market volatility. Get expert insights for strategic planning.',
    keywords: ['2025 currency predictions', 'forex forecasts', 'currency market outlook', 'exchange rate predictions', 'economic trends'],
    readTime: '18 min read',
    publishDate: '2025-01-28',
    category: 'Market Analysis',
    featured: true
  },
  {
    id: 'currency-exchange-fees-hidden-costs',
    title: 'Currency Exchange Fees: Hidden Costs That Eat Your Money',
    excerpt: 'Americans lost $5.8 billion to hidden exchange fees in 2023. Discover the 5 types of hidden charges providers use and proven strategies to save up to 85% on currency exchanges.',
    keywords: ['currency exchange fees', 'hidden fees', 'exchange rate markups', 'money transfer costs', 'international fees'],
    readTime: '15 min read',
    publishDate: '2025-01-28',
    category: 'Fees & Costs',
    featured: true
  },
  {
    id: 'bitcoin-to-usd-converter-live-price-analysis',
    title: 'Bitcoin to USD Converter: Live BTC Price & Analysis Today',
    excerpt: 'Real-time Bitcoin price analysis with live BTC/USD conversion tools. Current market analysis, technical indicators, and expert predictions for informed trading decisions.',
    keywords: ['Bitcoin to USD', 'BTC price', 'Bitcoin converter', 'cryptocurrency analysis', 'Bitcoin trading'],
    readTime: '10 min read',
    publishDate: '2025-01-28',
    category: 'Cryptocurrency',
    featured: true
  },
  {
    id: 'currency-conversion-safety-guide-2025',
    title: 'How to Convert Currency Online Safely: Complete 2025 Guide',
    excerpt: 'Protect yourself from currency scams while saving up to 4% on every transaction. Learn proven strategies to identify legitimate services and avoid hidden fees.',
    keywords: ['currency conversion safety', 'online currency exchange', 'currency scams', 'safe money transfer', 'currency conversion guide'],
    readTime: '12 min read',
    publishDate: '2025-01-28',
    category: 'Safety & Tips',
    featured: true
  },
  {
    id: 'usd-to-eur-exchange-rate-today',
    title: 'Real-Time Currency Converter: USD to EUR Exchange Rate Today',
    excerpt: 'Get the most accurate real-time USD to EUR exchange rates with our comprehensive analysis of current market conditions and conversion tools.',
    keywords: ['USD to EUR', 'currency converter', 'dollar to euro', 'exchange rate USD EUR'],
    readTime: '8 min read',
    publishDate: '2024-01-27',
    category: 'Exchange Rates',
    featured: true
  }
];

const Blog = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Currency to Currency Blog",
    "description": "Expert insights on currency exchange, forex trends, and conversion strategies",
    "url": "https://currencytocurrency.app/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Currency to Currency"
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHead
        title="Currency Exchange Blog - Expert Forex Insights | Currency to Currency"
        description="Expert forex insights, currency exchange analysis & conversion strategies. Latest market trends, rate forecasts & money-saving tips for travelers."
        keywords="forex blog, currency exchange insights, exchange rate analysis, forex news, currency trends"
        canonical="https://currencytocurrency.app/blog"
        structuredData={structuredData}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <div 
            className="h-96 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${blogHero})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
              <div>
                <h1 className="text-5xl font-bold mb-4">
                  Currency Exchange Blog
                </h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">
                  Expert insights on forex trends, exchange rate analysis, and currency conversion strategies
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden relative">
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundImage: `url(${blogPostBackground})`, backgroundSize: 'cover' }}
                  ></div>
                  <div className="relative z-10">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-3">
                        <Badge variant="secondary">{post.category}</Badge>
                        {post.featured && <Badge variant="default">Featured</Badge>}
                      </div>
                      <CardTitle className="text-2xl hover:text-primary transition-colors">
                        <a href={`/blog/${post.id}`}>
                          {post.title}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.publishDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <a 
                          href={`/blog/${post.id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          Read More →
                        </a>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['USD to EUR', 'GBP to USD', 'Currency Forecasts', 'Forex Trading', 'Travel Money'].map((topic) => (
                    <Badge key={topic} variant="outline" className="mr-2 mb-2">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Convert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Need a quick conversion? Use our live converter.
                </p>
                <a 
                  href="/"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Open Converter
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;