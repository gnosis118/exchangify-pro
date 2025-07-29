// Schema.org structured data generators for better SEO

export const generateWebApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://currencytocurrency.com/#application",
  "name": "Currency to Currency Converter",
  "description": "Free real-time currency converter with support for 150+ fiat currencies and 100+ cryptocurrencies. Get instant exchange rates, historical charts, and price alerts.",
  "url": "https://currencytocurrency.com",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "browserRequirements": "HTML5, JavaScript",
  "softwareVersion": "2.0",
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "inLanguage": "en-US",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Real-time exchange rates",
    "150+ fiat currencies",
    "100+ cryptocurrencies", 
    "Historical rate charts",
    "Price alerts",
    "Travel money guides",
    "Offline conversion calculator",
    "Currency trend analysis"
  ],
  "creator": {
    "@type": "Organization",
    "@id": "https://currencytocurrency.com/#organization"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://currencytocurrency.com/#organization",
  "name": "Currency to Currency",
  "url": "https://currencytocurrency.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://currencytocurrency.com/icon-512.png",
    "width": 512,
    "height": 512
  },
  "sameAs": [
    "https://currencytocurrency.com"
  ]
});

export const generateServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://currencytocurrency.com/#service",
  "name": "Currency Conversion Service",
  "description": "Professional currency conversion and exchange rate tracking service with real-time data for global currencies and cryptocurrencies",
  "provider": {
    "@type": "Organization",
    "@id": "https://currencytocurrency.com/#organization"
  },
  "serviceType": "Currency Conversion",
  "areaServed": "Worldwide",
  "availableLanguage": "English",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  publishDate: string;
  modifyDate?: string;
  author?: string;
  image?: string;
  category?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "datePublished": article.publishDate,
  "dateModified": article.modifyDate || article.publishDate,
  "author": {
    "@type": "Organization",
    "name": article.author || "Currency to Currency"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Currency to Currency",
    "logo": {
      "@type": "ImageObject",
      "url": "https://currencytocurrency.com/icon-512.png"
    }
  },
  "image": article.image || "https://currencytocurrency.com/icon-512.png",
  "articleSection": article.category || "Finance",
  "inLanguage": "en-US"
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const generateProductSchema = (product: {
  name: string;
  description: string;
  image?: string;
  offers?: {
    price: string;
    currency: string;
    availability: string;
  };
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image || "https://currencytocurrency.com/icon-512.png",
  "brand": {
    "@type": "Brand",
    "name": "Currency to Currency"
  },
  "offers": {
    "@type": "Offer",
    "price": product.offers?.price || "0",
    "priceCurrency": product.offers?.currency || "USD",
    "availability": product.offers?.availability || "https://schema.org/InStock"
  }
});

export const generateLocalBusinessSchema = (location: {
  name: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  coordinates?: { lat: number; lng: number };
}) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": location.name,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": location.address,
    "addressLocality": location.city,
    "addressCountry": location.country
  },
  "telephone": location.phone,
  "geo": location.coordinates ? {
    "@type": "GeoCoordinates",
    "latitude": location.coordinates.lat,
    "longitude": location.coordinates.lng
  } : undefined,
  "url": "https://currencytocurrency.com",
  "sameAs": ["https://currencytocurrency.com"]
});

export const generateHowToSchema = (howTo: {
  name: string;
  description: string;
  steps: string[];
  image?: string;
  totalTime?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": howTo.name,
  "description": howTo.description,
  "image": howTo.image || "https://currencytocurrency.com/icon-512.png",
  "totalTime": howTo.totalTime,
  "step": howTo.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "text": step
  }))
});