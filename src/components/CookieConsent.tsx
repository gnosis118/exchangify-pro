import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Settings, Shield, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Extend window type to include gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, parameters?: any) => void;
  }
}

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Apply existing consent preferences to Google Consent Mode
      try {
        const savedConsent = JSON.parse(consent);
        const prefs = savedConsent.preferences;
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('consent', 'update', {
            'analytics_storage': prefs.analytics ? 'granted' : 'denied',
            'ad_storage': prefs.marketing ? 'granted' : 'denied',
            'ad_user_data': prefs.marketing ? 'granted' : 'denied',
            'ad_personalization': prefs.marketing ? 'granted' : 'denied'
          });
        }
      } catch (error) {
        console.error('Error parsing saved consent:', error);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      timestamp: new Date().toISOString(),
      preferences: prefs,
    }));

    // Update Google Consent Mode based on user preferences
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied',
        'ad_user_data': prefs.marketing ? 'granted' : 'denied',
        'ad_personalization': prefs.marketing ? 'granted' : 'denied'
      });
    }

    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(onlyNecessary);
    savePreferences(onlyNecessary);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto">
        <Card className="shadow-lg border-2">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-sm">Cookie Consent</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={rejectAll}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={rejectAll}
                className="flex-1"
              >
                Reject All
              </Button>
              
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Customize
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Cookie Preferences</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Necessary Cookies</Label>
                        <p className="text-xs text-muted-foreground">
                          Essential for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <Switch checked={true} disabled />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Analytics Cookies</Label>
                        <p className="text-xs text-muted-foreground">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <Switch 
                        checked={preferences.analytics}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, analytics: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Marketing Cookies</Label>
                        <p className="text-xs text-muted-foreground">
                          Used to deliver personalized advertisements.
                        </p>
                      </div>
                      <Switch 
                        checked={preferences.marketing}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, marketing: checked }))
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Functional Cookies</Label>
                        <p className="text-xs text-muted-foreground">
                          Enable enhanced functionality and personalization.
                        </p>
                      </div>
                      <Switch 
                        checked={preferences.functional}
                        onCheckedChange={(checked) => 
                          setPreferences(prev => ({ ...prev, functional: checked }))
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowSettings(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={saveCustomPreferences} className="flex-1">
                      Save Preferences
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                onClick={acceptAll}
                size="sm"
                className="flex-1"
              >
                Accept All
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-3 text-xs text-muted-foreground">
              <Info className="h-3 w-3 mr-1" />
              <span>
                Read our{' '}
                <a href="/privacy-policy" className="underline hover:text-foreground">
                  Privacy Policy
                </a>
                {' & '}
                <a href="/terms-of-service" className="underline hover:text-foreground">
                  Terms of Service
                </a>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CookieConsent;