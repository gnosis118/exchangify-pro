import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  structuredData?: object;
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const EnhancedSEO = ({ 
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  structuredData,
  breadcrumbs
}: EnhancedSEOProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Add breadcrumb schema if breadcrumbs provided
    if (breadcrumbs && breadcrumbs.length > 1) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": `https://currencytocurrency.app${crumb.url}`
        }))
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(breadcrumbSchema);
      script.id = 'breadcrumb-schema';
      
      // Remove existing breadcrumb schema
      const existing = document.getElementById('breadcrumb-schema');
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(script);
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [breadcrumbs, location.pathname]);

  // Add FAQ schema for FAQ page
  useEffect(() => {
    if (location.pathname === '/faq') {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How accurate are the exchange rates?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our exchange rates are updated in real-time and sourced from reliable financial data providers."
            }
          },
          {
            "@type": "Question", 
            "name": "Is the currency converter free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Currency to Currency is completely free to use with no registration required."
            }
          },
          {
            "@type": "Question",
            "name": "How many currencies are supported?",
            "acceptedAnswer": {
              "@type": "Answer", 
              "text": "We support over 150 fiat currencies and 100+ cryptocurrencies for conversion."
            }
          }
        ]
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqSchema);
      script.id = 'faq-schema';
      
      // Remove existing FAQ schema
      const existing = document.getElementById('faq-schema');
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(script);
      
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [location.pathname]);

  return null;
};

export default EnhancedSEO;