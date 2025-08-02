import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calculator, AlertCircle, Map, HelpCircle, BarChart3 } from 'lucide-react';

interface TopicCluster {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  links: Array<{
    href: string;
    title: string;
    description: string;
    type: 'primary' | 'secondary';
    keywords?: string[];
  }>;
}

interface EnhancedInternalLinkingProps {
  currentPage: string;
  className?: string;
  excludeCurrentPath?: boolean;
}

const EnhancedInternalLinking = ({ 
  currentPage, 
  className = "",
  excludeCurrentPath = true 
}: EnhancedInternalLinkingProps) => {
  
  const topicClusters: TopicCluster[] = [
    {
      id: 'conversion-tools',
      title: 'Currency Conversion Tools',
      description: 'Real-time currency converters and calculators',
      icon: <Calculator className="h-5 w-5" />,
      links: [
        {
          href: '/',
          title: 'Free Currency Converter',
          description: 'Convert 150+ currencies with live exchange rates',
          type: 'primary',
          keywords: ['currency converter', 'exchange rates', 'live rates']
        },
        {
          href: '/convert/usd-to-eur',
          title: 'USD to EUR Converter',
          description: 'US Dollar to Euro exchange rate calculator',
          type: 'secondary',
          keywords: ['USD EUR', 'dollar euro', 'USD/EUR rate']
        },
        {
          href: '/convert/usd-to-gbp',
          title: 'USD to GBP Converter',
          description: 'US Dollar to British Pound conversion tool',
          type: 'secondary',
          keywords: ['USD GBP', 'dollar pound', 'USD/GBP rate']
        },
        {
          href: '/convert/eur-to-gbp',
          title: 'EUR to GBP Converter',
          description: 'Euro to British Pound live exchange rates',
          type: 'secondary',
          keywords: ['EUR GBP', 'euro pound', 'EUR/GBP rate']
        }
      ]
    },
    {
      id: 'market-analysis',
      title: 'Market Analysis & Charts',
      description: 'Historical data and rate analysis tools',
      icon: <BarChart3 className="h-5 w-5" />,
      links: [
        {
          href: '/charts',
          title: 'Historical Exchange Rate Charts',
          description: 'Analyze currency trends with interactive charts',
          type: 'primary',
          keywords: ['currency charts', 'exchange rate history', 'forex trends']
        },
        {
          href: '/blog',
          title: 'Currency Market Analysis',
          description: 'Expert insights on forex trends and predictions',
          type: 'secondary',
          keywords: ['forex analysis', 'currency news', 'market insights']
        }
      ]
    },
    {
      id: 'alerts-monitoring',
      title: 'Rate Alerts & Monitoring',
      description: 'Track exchange rate changes with custom alerts',
      icon: <AlertCircle className="h-5 w-5" />,
      links: [
        {
          href: '/alerts',
          title: 'Currency Rate Alerts',
          description: 'Set custom alerts for favorable exchange rates',
          type: 'primary',
          keywords: ['rate alerts', 'currency notifications', 'exchange monitoring']
        }
      ]
    },
    {
      id: 'travel-money',
      title: 'Travel & International Money',
      description: 'Currency guides for travelers and expats',
      icon: <Map className="h-5 w-5" />,
      links: [
        {
          href: '/travel',
          title: 'Travel Money Guide',
          description: 'Save money on currency exchange while traveling',
          type: 'primary',
          keywords: ['travel money', 'vacation currency', 'travel exchange rates']
        }
      ]
    },
    {
      id: 'help-support',
      title: 'Help & Support',
      description: 'Frequently asked questions and guides',
      icon: <HelpCircle className="h-5 w-5" />,
      links: [
        {
          href: '/faq',
          title: 'Currency Converter FAQ',
          description: 'Common questions about exchange rates and conversions',
          type: 'primary',
          keywords: ['currency FAQ', 'exchange rate questions', 'converter help']
        }
      ]
    }
  ];

  const getRelevantClusters = (page: string) => {
    switch (page) {
      case 'home':
        return topicClusters.filter(cluster => 
          ['market-analysis', 'alerts-monitoring', 'travel-money'].includes(cluster.id)
        );
      case 'charts':
        return topicClusters.filter(cluster => 
          ['conversion-tools', 'alerts-monitoring', 'help-support'].includes(cluster.id)
        );
      case 'alerts':
        return topicClusters.filter(cluster => 
          ['conversion-tools', 'market-analysis', 'travel-money'].includes(cluster.id)
        );
      case 'travel':
        return topicClusters.filter(cluster => 
          ['conversion-tools', 'market-analysis', 'alerts-monitoring'].includes(cluster.id)
        );
      case 'blog':
        return topicClusters.filter(cluster => 
          ['conversion-tools', 'alerts-monitoring', 'travel-money'].includes(cluster.id)
        );
      case 'faq':
        return topicClusters.filter(cluster => 
          ['conversion-tools', 'market-analysis', 'alerts-monitoring'].includes(cluster.id)
        );
      case 'currency-pair':
        return topicClusters.filter(cluster => 
          ['market-analysis', 'alerts-monitoring', 'travel-money'].includes(cluster.id)
        );
      default:
        return topicClusters.slice(0, 3);
    }
  };

  const relevantClusters = getRelevantClusters(currentPage);

  const filterCurrentPath = (links: Array<any>) => {
    if (!excludeCurrentPath) return links;
    return links.filter(link => !window.location.pathname.endsWith(link.href));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Explore Related Tools</h2>
        <p className="text-muted-foreground">
          Discover more currency conversion tools and market insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {relevantClusters.map((cluster) => (
          <Card key={cluster.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {cluster.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{cluster.title}</h3>
                  <p className="text-sm text-muted-foreground">{cluster.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {filterCurrentPath(cluster.links).map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="block p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {link.title}
                          </h4>
                          {link.type === 'primary' && (
                            <Badge variant="default" className="text-xs">Popular</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {link.description}
                        </p>
                        {link.keywords && (
                          <div className="flex flex-wrap gap-1">
                            {link.keywords.slice(0, 3).map((keyword, kidx) => (
                              <Badge key={kidx} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Topic Clusters for SEO */}
      <div className="mt-8 p-6 bg-muted/30 rounded-lg">
        <h3 className="font-semibold text-foreground mb-3">Currency Conversion Hub</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Your comprehensive resource for currency exchange, forex analysis, and international money management.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topicClusters.map((cluster) => (
            <div key={cluster.id} className="text-center">
              <div className="p-2 rounded-lg bg-background/50 inline-block mb-2">
                {cluster.icon}
              </div>
              <h4 className="text-xs font-medium text-foreground">{cluster.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedInternalLinking;