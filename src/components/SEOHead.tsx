import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
  hreflang?: { [lang: string]: string };
  author?: string;
  articleSchema?: object;
  breadcrumbSchema?: object;
  faqSchema?: object;
}

const SEOHead = ({ 
  title = "Free Currency Converter - Live Exchange Rates | Currency to Currency",
  description = "Convert currencies instantly with live exchange rates. Support for 150+ fiat currencies and 100+ cryptocurrencies. Free real-time currency converter with historical charts and price alerts.",
  keywords = "currency converter, exchange rates, live rates, cryptocurrency prices, currency conversion, foreign exchange, forex, bitcoin converter",
  canonical,
  ogType = "website",
  ogImage = "https://currencytocurrency.com/icon-512.png",
  structuredData,
  hreflang,
  author = "Currency to Currency",
  articleSchema,
  breadcrumbSchema,
  faqSchema
}: SEOHeadProps) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:url', canonical || window.location.href, true);
    updateMetaTag('og:site_name', 'Currency to Currency', true);
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@currencytocurrency');
    
    // Additional SEO meta tags
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('language', 'English');
    updateMetaTag('revisit-after', '1 days');

    // Canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Hreflang tags for international SEO
    if (hreflang) {
      Object.entries(hreflang).forEach(([lang, url]) => {
        let link = document.querySelector(`link[hreflang="${lang}"]`) as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'alternate';
          link.hreflang = lang;
          document.head.appendChild(link);
        }
        link.href = url;
      });
    }

    // Clean up existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => {
      if (script.parentNode && script.textContent?.includes('"@context"')) {
        script.parentNode.removeChild(script);
      }
    });

    // Main structured data
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      script.id = 'main-structured-data';
      document.head.appendChild(script);
    }

    // Article schema (for blog posts)
    if (articleSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(articleSchema);
      script.id = 'article-structured-data';
      document.head.appendChild(script);
    }

    // Breadcrumb schema
    if (breadcrumbSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(breadcrumbSchema);
      script.id = 'breadcrumb-structured-data';
      document.head.appendChild(script);
    }

    // FAQ schema
    if (faqSchema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(faqSchema);
      script.id = 'faq-structured-data';
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup function for structured data scripts
      const scriptsToRemove = document.querySelectorAll('#main-structured-data, #article-structured-data, #breadcrumb-structured-data, #faq-structured-data');
      scriptsToRemove.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [title, description, keywords, canonical, ogType, ogImage, structuredData, hreflang, author, articleSchema, breadcrumbSchema, faqSchema]);

  return null;
};

export default SEOHead;