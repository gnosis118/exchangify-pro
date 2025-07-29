import { useEffect } from 'react';

// Extend window type to include gtag and silktideCookieBannerManager
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters?: any) => void;
    dataLayer: any[];
    silktideCookieBannerManager: {
      updateCookieBannerConfig: (config: any) => void;
    };
  }
}

const CookieConsent = () => {
  useEffect(() => {
    // Initialize Silktide Cookie Consent Manager when component mounts
    if (typeof window !== 'undefined' && window.silktideCookieBannerManager) {
      window.silktideCookieBannerManager.updateCookieBannerConfig({
        background: {
          showBackground: true
        },
        cookieIcon: {
          position: "bottomLeft"
        },
        cookieTypes: [
          {
            id: "necessary",
            name: "Necessary",
            description: "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>",
            required: true,
            onAccept: function() {
              console.log('Necessary cookies accepted');
              // Necessary cookies don't need consent mode updates as they're always granted
            }
          },
          {
            id: "analytical",
            name: "Analytical",
            description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
            required: false,
            onAccept: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  analytics_storage: 'granted',
                });
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'event': 'consent_accepted_analytical',
                });
              }
            },
            onReject: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  analytics_storage: 'denied',
                });
              }
            }
          },
          {
            id: "advertising",
            name: "Advertising",
            description: "<p>These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.</p>",
            required: false,
            onAccept: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  ad_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted',
                });
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'event': 'consent_accepted_advertising',
                });
              }
            },
            onReject: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                });
              }
            }
          }
        ],
        text: {
          banner: {
            description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href=\"/privacy\" target=\"_blank\">Cookie Policy.</a></p>",
            acceptAllButtonText: "Accept all",
            acceptAllButtonAccessibleLabel: "Accept all cookies",
            rejectNonEssentialButtonText: "Reject non-essential",
            rejectNonEssentialButtonAccessibleLabel: "Reject non-essential",
            preferencesButtonText: "Preferences",
            preferencesButtonAccessibleLabel: "Toggle preferences"
          },
          preferences: {
            title: "Customize your cookie preferences",
            description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
            creditLinkText: "Get this banner for free",
            creditLinkAccessibleLabel: "Get this banner for free"
          }
        },
        position: {
          banner: "bottomCenter"
        }
      });
    }
  }, []);

  // This component no longer renders anything - Silktide handles the UI
  return null;
};

export default CookieConsent;