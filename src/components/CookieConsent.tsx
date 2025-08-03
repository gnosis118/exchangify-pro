import React from 'react';

// Extend window type to include gtag and silktideCookieBannerManager
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters?: any) => void;
    dataLayer: any[];
    silktideCookieBannerManager: {
      updateCookieBannerConfig: (config: any) => void;
    };
    isEEARegion?: boolean;
    consentDebug?: any;
  }
}

// Consent persistence utility
const ConsentManager = {
  STORAGE_KEY: 'consent_preferences',
  EXPIRY_DAYS: 365,

  saveConsent(preferences: Record<string, boolean>) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.EXPIRY_DAYS);
    
    const consentData = {
      preferences,
      timestamp: Date.now(),
      expiry: expiryDate.getTime(),
      region: window.isEEARegion ? 'EEA' : 'Non-EEA'
    };
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(consentData));
    
    // Track consent event
    if (window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'consent_saved',
        consent_region: consentData.region,
        consent_timestamp: consentData.timestamp,
        analytics_granted: preferences.analytical,
        advertising_granted: preferences.advertising
      });
    }
  },

  loadConsent() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;
      
      const data = JSON.parse(stored);
      if (Date.now() > data.expiry) {
        localStorage.removeItem(this.STORAGE_KEY);
        return null;
      }
      
      return data;
    } catch {
      return null;
    }
  },

  clearConsent() {
    localStorage.removeItem(this.STORAGE_KEY);
    
    // Track withdrawal event
    if (window.gtag) {
      window.dataLayer.push({
        event: 'consent_withdrawn',
        timestamp: Date.now()
      });
    }
  }
};

const CookieConsent = () => {
  React.useEffect(() => {
    // Wait for Silktide to be ready before configuring
    const initializeConsent = () => {
      if (typeof window === 'undefined' || !window.silktideCookieBannerManager) {
        return;
      }

      const isEEA = window.isEEARegion || false;
      const savedConsent = ConsentManager.loadConsent();
      
      // Enhanced descriptions for legal compliance
      const analyticalDescription = isEEA 
        ? "<p>These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us improve our website and your user experience. We use Google Analytics for this purpose. <strong>We need your explicit consent to use these cookies.</strong></p>"
        : "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>";
        
      const advertisingDescription = isEEA
        ? "<p>These cookies enable us and our advertising partners to show you relevant advertisements both on our site and on other websites you visit. They also help measure the effectiveness of advertising campaigns. <strong>Under GDPR, we require your explicit consent for advertising cookies.</strong></p>"
        : "<p>These cookies provide extra features and personalization to improve your experience. They may be set by us or by partners whose services we use.</p>";

      const bannerDescription = isEEA
        ? "<p>We use cookies to enhance your experience and analyze our traffic. Under EU privacy laws, we need your consent for certain types of cookies. You can manage your preferences at any time. <a href=\"/privacy\" target=\"_blank\">Read our Cookie Policy</a> for more details.</p>"
        : "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href=\"/privacy\" target=\"_blank\">Cookie Policy.</a></p>";

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
            description: analyticalDescription,
            required: false,
            onAccept: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  analytics_storage: 'granted',
                });
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'event': 'consent_accepted_analytical',
                  'consent_method': 'banner',
                  'region': isEEA ? 'EEA' : 'Non-EEA'
                });
              }
              ConsentManager.saveConsent({ analytical: true, advertising: false });
            },
            onReject: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  analytics_storage: 'denied',
                });
                window.dataLayer.push({
                  'event': 'consent_rejected_analytical',
                  'region': isEEA ? 'EEA' : 'Non-EEA'
                });
              }
              ConsentManager.saveConsent({ analytical: false, advertising: false });
            }
          },
          {
            id: "advertising",
            name: "Advertising",
            description: advertisingDescription,
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
                  'consent_method': 'banner',
                  'region': isEEA ? 'EEA' : 'Non-EEA'
                });
              }
              ConsentManager.saveConsent({ analytical: true, advertising: true });
            },
            onReject: function() {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('consent', 'update', {
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                });
                window.dataLayer.push({
                  'event': 'consent_rejected_advertising',
                  'region': isEEA ? 'EEA' : 'Non-EEA'
                });
              }
              ConsentManager.saveConsent({ analytical: false, advertising: false });
            }
          }
        ],
        text: {
          banner: {
            description: bannerDescription,
            acceptAllButtonText: "Accept all",
            acceptAllButtonAccessibleLabel: "Accept all cookies",
            rejectNonEssentialButtonText: isEEA ? "Reject non-essential" : "Reject non-essential",
            rejectNonEssentialButtonAccessibleLabel: "Reject non-essential cookies",
            preferencesButtonText: "Manage preferences",
            preferencesButtonAccessibleLabel: "Manage cookie preferences"
          },
          preferences: {
            title: isEEA ? "Your Privacy Rights - Cookie Preferences" : "Customize your cookie preferences",
            description: isEEA 
              ? "<p>Under EU privacy laws, you have the right to control how your data is processed. You can withdraw consent at any time. Your preferences will be saved and respected across our website.</p>"
              : "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
            creditLinkText: "Get this banner for free",
            creditLinkAccessibleLabel: "Get this banner for free"
          }
        },
        position: {
          banner: "bottomCenter"
        }
      });

      // Load saved preferences if available
      if (savedConsent && savedConsent.preferences) {
        // Apply saved consent automatically (required for compliance)
        const { analytical, advertising } = savedConsent.preferences;
        
        if (window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: analytical ? 'granted' : 'denied',
            ad_storage: advertising ? 'granted' : 'denied',
            ad_user_data: advertising ? 'granted' : 'denied',
            ad_personalization: advertising ? 'granted' : 'denied',
          });
          
          window.dataLayer.push({
            event: 'consent_restored_from_storage',
            region: savedConsent.region,
            analytics_granted: analytical,
            advertising_granted: advertising
          });
        }
      }
    };

    // Retry initialization with timeout protection
    const maxAttempts = 10;
    let attempts = 0;
    
    const checkAndInit = () => {
      if (window.silktideCookieBannerManager) {
        initializeConsent();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkAndInit, 100);
      } else {
        console.warn('Silktide Cookie Consent Manager not available - setting default consent');
        // Set conservative default consent when Silktide fails
        if (window.gtag) {
          window.gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
          });
        }
      }
    };

    checkAndInit();

    // Expose consent withdrawal function globally for privacy page
    (window as any).withdrawConsent = () => {
      ConsentManager.clearConsent();
      if (window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
      // Reload to reset banner
      window.location.reload();
    };
  }, []);

  // This component no longer renders anything - Silktide handles the UI
  return null;
};

export default CookieConsent;