import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const blogPosts = [
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
    "url": "https://currencytocurrency.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Currency to Currency"
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <SEOHead
        title="Currency Exchange Blog - Expert Forex Insights | Currency to Currency"
        description="Expert analysis on currency exchange rates, forex trends, and conversion strategies. Stay updated with the latest market insights and exchange rate forecasts."
        keywords="forex blog, currency exchange insights, exchange rate analysis, forex news, currency trends"
        canonical="https://currencytocurrency.com/blog"
        structuredData={structuredData}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Currency Exchange Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert insights on forex trends, exchange rate analysis, and currency conversion strategies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.featured && <Badge variant="default">Featured</Badge>}
                    </div>
                    <CardTitle className="text-2xl hover:text-primary transition-colors">
                      <Link to={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
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
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </CardContent>
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
                <Link 
                  to="/"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Open Converter
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;