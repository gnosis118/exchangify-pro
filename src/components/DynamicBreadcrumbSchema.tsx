import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
  position: number;
}

interface DynamicBreadcrumbSchemaProps {
  customBreadcrumbs?: BreadcrumbItem[];
  pageTitle?: string;
}

const DynamicBreadcrumbSchema = ({ customBreadcrumbs, pageTitle }: DynamicBreadcrumbSchemaProps) => {
  const location = useLocation();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      {
        name: 'Home',
        url: 'https://currencytocurrency.app/',
        position: 1
      }
    ];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      let name = '';
      let url = `https://currencytocurrency.app${currentPath}`;
      
      // Generate human-readable names based on route patterns
      switch (segment) {
        case 'convert':
          name = 'Currency Converter';
          break;
        case 'blog':
          name = 'Blog';
          break;
        case 'charts':
          name = 'Charts & Analytics';
          break;
        case 'alerts':
          name = 'Price Alerts';
          break;
        case 'travel':
          name = 'Travel Money';
          break;
        case 'faq':
          name = 'FAQ';
          break;
        case 'privacy-policy':
          name = 'Privacy Policy';
          break;
        case 'terms-of-service':
          name = 'Terms of Service';
          break;
        default:
          // Handle currency pair routes like "usd-to-eur"
          if (segment.includes('-to-')) {
            const [from, , to] = segment.split('-');
            name = `${from.toUpperCase()} to ${to.toUpperCase()} Converter`;
          }
          // Handle blog post slugs
          else if (location.pathname.startsWith('/blog/')) {
            name = pageTitle || segment.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
          }
          // Default: convert kebab-case to Title Case
          else {
            name = segment.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
          }
      }
      
      breadcrumbs.push({
        name,
        url,
        position: index + 2
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map(breadcrumb => ({
      "@type": "ListItem",
      "position": breadcrumb.position,
      "name": breadcrumb.name,
      "item": {
        "@type": "WebPage",
        "@id": breadcrumb.url,
        "url": breadcrumb.url,
        "name": breadcrumb.name
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default DynamicBreadcrumbSchema;