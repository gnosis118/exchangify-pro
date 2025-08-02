import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Truck, TrendingUp, Calculator } from 'lucide-react';
import BlogSEOBooster from '@/components/BlogSEOBooster';
import EnhancedSEOHead from '@/components/EnhancedSEOHead';
import WebPOptimizedImage from '@/components/WebPOptimizedImage';

const ImportExportCurrencyConversion = () => {
  const publishDate = "2025-01-15";
  const readTime = "10 min";
  const category = "Import/Export";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Import/Export Currency Conversion: Landed Cost Calculations & Supplier Payment Optimization",
    "description": "Master import/export currency conversion with landed cost calculations, supplier payment timing, and international trade finance strategies.",
    "author": {
      "@type": "Organization",
      "name": "Currency to Currency"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Currency to Currency",
      "logo": {
        "@type": "ImageObject",
        "url": "https://currencytocurrency.app/icon-512.png"
      }
    },
    "datePublished": publishDate,
    "dateModified": publishDate,
    "image": "https://currencytocurrency.app/assets/import-export-currency.jpg",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://currencytocurrency.app/blog/import-export-currency-conversion"
    }
  };

  return (
    <>
      <EnhancedSEOHead
        title="Import/Export Currency Conversion: Landed Cost Calculations & Supplier Payment Optimization"
        description="Master import/export currency conversion with landed cost calculations, supplier payment timing, and international trade finance strategies."
        canonicalUrl="https://currencytocurrency.app/blog/import-export-currency-conversion"
        structuredData={structuredData}
        pageType="article"
      />

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                {category}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(publishDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {readTime}
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Import/Export Currency Conversion: Landed Cost Calculations
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master import/export currency conversion with landed cost calculations, supplier payment timing, and international trade finance strategies.
            </p>
          </div>

          <div className="mb-8 rounded-lg overflow-hidden">
            <WebPOptimizedImage
              src="/assets/import-export-currency.jpg"
              alt="International shipping and currency conversion"
              width={1200}
              height={600}
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="prose prose-gray max-w-none mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              Landed Cost Currency Conversion Fundamentals
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Import/export businesses face the most complex currency conversion challenges in international trade. Beyond simple exchange rates, successful importers and exporters must factor in shipping costs, customs duties, insurance, and payment timing to calculate true landed costs.
            </p>

            <h3 className="text-xl font-semibold mb-4">Comprehensive Landed Cost Calculations</h3>

            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <h4 className="font-semibold mb-3">Multi-Currency Cost Components</h4>
              <p className="text-muted-foreground mb-4">
                Landed cost calculations require currency conversion for multiple cost elements:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Product cost (supplier currency)</li>
                <li>International shipping (often USD or EUR)</li>
                <li>Insurance (varies by provider location)</li>
                <li>Customs duties and taxes (destination currency)</li>
                <li>Local handling and delivery (destination currency)</li>
              </ul>

              <h4 className="font-semibold mb-3">Exchange Rate Timing Strategy</h4>
              <p className="text-muted-foreground mb-4">
                Different cost components are paid at different times, requiring strategic currency conversion timing:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Order placement:</strong> Supplier deposit (30-50% of order value)</li>
                <li><strong>Production completion:</strong> Final payment to supplier</li>
                <li><strong>Shipping:</strong> Freight and insurance payments</li>
                <li><strong>Customs clearance:</strong> Duty and tax payments</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-4">Supplier Payment Optimization Strategies</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Timing Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Monitor exchange rates and time payments when your currency is strong relative to supplier currencies.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Set rate alerts for target exchange levels</li>
                    <li>• Negotiate flexible payment terms</li>
                    <li>• Use forward contracts for large orders</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Currency Risk Hedging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Protect against adverse currency movements with financial hedging instruments.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Forward currency contracts</li>
                    <li>• Currency options for flexibility</li>
                    <li>• Natural hedging through customer currencies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold mb-4">Advanced Trade Finance Strategies</h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Sophisticated import/export businesses use currency conversion strategies integrated with trade finance instruments like letters of credit, documentary collections, and supply chain financing.
            </p>

            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <h4 className="font-semibold mb-3">Letter of Credit Currency Considerations</h4>
              <p className="text-muted-foreground mb-4">
                When using letters of credit, currency conversion timing depends on LC terms:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Sight LCs:</strong> Immediate payment upon document presentation</li>
                <li><strong>Usance LCs:</strong> Deferred payment allows currency timing strategy</li>
                <li><strong>Currency choice:</strong> Negotiate LC currency based on rate forecasts</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-4">Technology Integration for Import/Export</h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Modern import/export operations require currency conversion tools that integrate with trade management systems, providing real-time landed cost calculations and automated payment optimization.
            </p>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg mb-8">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Import/Export Currency Conversion ROI
              </h4>
              <p className="text-muted-foreground mb-4">
                Optimized currency conversion strategies deliver:
              </p>
              <ul className="text-muted-foreground space-y-2">
                <li>• 1-3% reduction in total landed costs</li>
                <li>• Improved cash flow through payment timing</li>
                <li>• 15-30% reduction in currency risk exposure</li>
                <li>• Better pricing competitiveness in target markets</li>
              </ul>
            </div>

            <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
              <p className="text-muted-foreground mb-4">
                Ready to optimize your import/export currency conversion strategy?
              </p>
              <Link
                to="/convert"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Calculate Landed Costs Now
              </Link>
            </div>
          </div>

          <BlogSEOBooster currentSlug="import-export-currency-conversion" />
        </div>
      </div>
    </>
  );
};

export default ImportExportCurrencyConversion;