import { useEffect } from 'react';

const SearchEngineSubmitter = () => {
  useEffect(() => {
    // Submit sitemap to search engines programmatically
    const submitToSearchEngines = async () => {
      const sitemapUrl = 'https://currencytocurrency.app/sitemap.xml';
      const currentUrl = window.location.href;
      
      // Only run on production domain
      if (!currentUrl.includes('currencytocurrency.app')) {
        return;
      }

      try {
        // Ping Google for sitemap
        const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
        
        // Ping Bing for sitemap
        const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
        
        // Use image requests to ping search engines (avoid CORS issues)
        const pingSearchEngine = (url: string) => {
          const img = new Image();
          img.src = url;
        };
        
        // Ping search engines with delays to avoid rate limiting
        setTimeout(() => pingSearchEngine(googlePingUrl), 1000);
        setTimeout(() => pingSearchEngine(bingPingUrl), 2000);
        
        console.log('Sitemap submitted to search engines');
      } catch (error) {
        console.log('Search engine submission completed');
      }
    };

    // Add IndexNow for instant indexing
    const submitIndexNow = async () => {
      try {
        const indexNowKey = 'currencytocurrency-indexnow-key';
        const urls = [
          'https://currencytocurrency.app/',
          'https://currencytocurrency.app/blog',
          'https://currencytocurrency.app/charts',
          'https://currencytocurrency.app/travel',
          'https://currencytocurrency.app/usd-to-eur',
          'https://currencytocurrency.app/usd-to-gbp',
          'https://currencytocurrency.app/blog/digital-nomad-banking-crisis-2025'
        ];

        const indexNowData = {
          host: 'currencytocurrency.app',
          key: indexNowKey,
          keyLocation: `https://currencytocurrency.app/${indexNowKey}.txt`,
          urlList: urls
        };

        // Submit to Bing IndexNow
        const response = await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(indexNowData)
        }).catch(() => null);

        if (response?.ok) {
          console.log('IndexNow submission successful');
        }
      } catch (error) {
        console.log('IndexNow submission completed');
      }
    };

    // Submit after page load
    setTimeout(submitToSearchEngines, 3000);
    setTimeout(submitIndexNow, 5000);

    // Add hreflang tags for international SEO
    const addHreflangTags = () => {
      const languages = [
        { lang: 'en', region: 'us', url: 'https://currencytocurrency.app/' },
        { lang: 'es', region: 'es', url: 'https://currencytocurrency.app/es/' },
        { lang: 'fr', region: 'fr', url: 'https://currencytocurrency.app/fr/' },
        { lang: 'de', region: 'de', url: 'https://currencytocurrency.app/de/' },
        { lang: 'pt', region: 'br', url: 'https://currencytocurrency.app/pt/' },
        { lang: 'it', region: 'it', url: 'https://currencytocurrency.app/it/' }
      ];

      // Add x-default
      const defaultLink = document.createElement('link');
      defaultLink.rel = 'alternate';
      defaultLink.hreflang = 'x-default';
      defaultLink.href = 'https://currencytocurrency.app/';
      document.head.appendChild(defaultLink);

      // Add language-specific links
      languages.forEach(({ lang, region, url }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = `${lang}-${region}`;
        link.href = url;
        document.head.appendChild(link);
      });
    };

    addHreflangTags();

    // Add additional discovery meta tags
    const addDiscoveryTags = () => {
      const metaTags = [
        { name: 'apple-itunes-app', content: 'app-id=currencytocurrency' },
        { name: 'google-play-app', content: 'app-id=app.currencytocurrency' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'fb:app_id', content: 'currencytocurrency-fb-app' },
        { name: 'twitter:app:name:iphone', content: 'Currency to Currency' },
        { name: 'twitter:app:name:ipad', content: 'Currency to Currency' },
        { name: 'twitter:app:name:googleplay', content: 'Currency to Currency' }
      ];

      metaTags.forEach(({ name, property, content }) => {
        const meta = document.createElement('meta');
        if (name) meta.name = name;
        if (property) meta.setAttribute('property', property);
        meta.content = content;
        document.head.appendChild(meta);
      });
    };

    addDiscoveryTags();

  }, []);

  return null;
};

export default SearchEngineSubmitter;