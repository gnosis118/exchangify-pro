interface MetaDescription {
  page: string;
  title: string;
  description: string;
  keywords: string;
}

export const enhancedMetaDescriptions: Record<string, MetaDescription> = {
  home: {
    page: 'home',
    title: 'Free Currency Converter - Live Exchange Rates & Real-Time Calculator | Currency to Currency',
    description: 'Convert 150+ currencies instantly with live exchange rates updated every minute. Free real-time currency converter supporting cryptocurrencies, historical charts & rate alerts. No fees, no registration required.',
    keywords: 'currency converter, free exchange rates, live currency conversion, real-time forex rates, cryptocurrency converter, USD EUR GBP converter, currency calculator'
  },
  
  charts: {
    page: 'charts',
    title: 'Currency Exchange Rate Charts - Historical Data & Forex Trends | Currency to Currency',
    description: 'Interactive currency charts with 1-year historical data. Track exchange rate trends, analyze forex patterns & make informed currency decisions. Real-time charting for 150+ currencies with technical indicators.',
    keywords: 'currency charts, exchange rate history, forex trends, historical currency data, interactive charts, currency analysis, forex technical analysis'
  },
  
  alerts: {
    page: 'alerts',
    title: 'Currency Rate Alerts - Email Notifications for Exchange Rates | Currency to Currency',
    description: 'Set custom currency rate alerts & receive instant email notifications when exchange rates hit your target. Never miss favorable rates again. Free monitoring for all major currency pairs.',
    keywords: 'currency alerts, exchange rate notifications, rate monitoring, forex alerts, currency tracking, email alerts, rate notifications'
  },
  
  travel: {
    page: 'travel',
    title: 'Travel Money Guide - Best Currency Exchange Tips for International Travel | Currency to Currency',
    description: 'Save up to 8% on travel money with our expert currency exchange guide. Best rates, payment methods & insider tips for international travel. Avoid hidden fees while abroad.',
    keywords: 'travel money guide, international travel currency, vacation money tips, travel exchange rates, foreign currency guide, travel budget calculator'
  },
  
  blog: {
    page: 'blog',
    title: 'Currency Exchange Blog - Expert Forex Analysis & Market Insights | Currency to Currency',
    description: 'Expert forex analysis, currency market predictions & exchange rate strategies. Latest financial news, central bank updates & proven money-saving techniques from currency professionals.',
    keywords: 'forex blog, currency market analysis, exchange rate predictions, forex news, currency trends, financial market insights'
  },
  
  faq: {
    page: 'faq',
    title: 'Currency Converter FAQ - Exchange Rate Questions Answered | Currency to Currency',
    description: 'Find answers to common currency conversion questions. Learn about exchange rate accuracy, fees, cryptocurrency support & how to get the best rates. Expert guidance included.',
    keywords: 'currency converter FAQ, exchange rate questions, currency conversion help, forex FAQ, converter support, exchange rate accuracy'
  },
  
  'privacy-policy': {
    page: 'privacy-policy',
    title: 'Privacy Policy - Secure Currency Conversion Data Protection | Currency to Currency',
    description: 'Comprehensive privacy policy for Currency to Currency converter. Learn how we protect your data, ensure secure currency conversions & maintain complete user privacy.',
    keywords: 'privacy policy, data protection, secure currency conversion, user privacy, data security, financial privacy'
  },
  
  'terms-of-service': {
    page: 'terms-of-service',
    title: 'Terms of Service - Currency Converter Usage Agreement | Currency to Currency',
    description: 'Terms of service for Currency to Currency converter. Understanding our free currency conversion service terms, conditions & user agreement for exchange rate tools.',
    keywords: 'terms of service, service agreement, currency converter terms, usage terms, service conditions'
  },
  
  'usd-to-eur': {
    page: 'currency-pair',
    title: 'USD to EUR Converter - Live Dollar to Euro Exchange Rate Today | Currency to Currency',
    description: 'Convert US Dollars to Euros with real-time exchange rates. Current USD/EUR rate: live calculator, historical charts & best conversion methods. Updated every minute.',
    keywords: 'USD to EUR, dollar to euro converter, USD EUR exchange rate, dollar euro conversion, USD/EUR live rate'
  },
  
  'usd-to-gbp': {
    page: 'currency-pair',
    title: 'USD to GBP Converter - Live Dollar to Pound Exchange Rate | Currency to Currency',
    description: 'Convert US Dollars to British Pounds with live exchange rates. Real-time USD/GBP calculator, rate history & conversion analysis. Get the best dollar-pound rates.',
    keywords: 'USD to GBP, dollar to pound converter, USD GBP exchange rate, dollar pound conversion, USD/GBP live rate'
  },
  
  'eur-to-gbp': {
    page: 'currency-pair',
    title: 'EUR to GBP Converter - Live Euro to Pound Exchange Rate | Currency to Currency',
    description: 'Convert Euros to British Pounds with current exchange rates. Real-time EUR/GBP calculator, historical trends & conversion tips. Monitor euro-pound rate changes.',
    keywords: 'EUR to GBP, euro to pound converter, EUR GBP exchange rate, euro pound conversion, EUR/GBP live rate'
  }
};

export const getEnhancedMetaDescription = (pageKey: string, customTitle?: string): MetaDescription => {
  const baseMeta = enhancedMetaDescriptions[pageKey] || enhancedMetaDescriptions.home;
  
  if (customTitle) {
    return {
      ...baseMeta,
      title: customTitle
    };
  }
  
  return baseMeta;
};