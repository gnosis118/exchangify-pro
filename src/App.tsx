
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CookieConsent from "@/components/CookieConsent";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import MobileOptimizer from "@/components/MobileOptimizer";
import CoreWebVitals from "@/components/CoreWebVitals";
import SitemapGenerator from "@/components/SitemapGenerator";
import SEOMonitoring from "@/components/SEOMonitoring";
import SearchEngineSubmitter from "@/components/SearchEngineSubmitter";
import ContentDiscoveryBooster from "@/components/ContentDiscoveryBooster";

// Lazy load all route components for better code splitting
const Index = React.lazy(() => import("./pages/Index"));
const Charts = React.lazy(() => import("./pages/Charts"));
const Alerts = React.lazy(() => import("./pages/Alerts"));
const Travel = React.lazy(() => import("./pages/Travel"));
const Auth = React.lazy(() => import("./pages/Auth"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const CurrencyPair = React.lazy(() => import("./pages/CurrencyPair"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));

// Loading component for route transitions
const RouteLoader = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-64 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  </div>
);

// Create QueryClient outside of component to avoid recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Simplified AppProviders without progressive loading
const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary fallback={<div>Application failed to load</div>}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <div className="min-h-screen">
          <MobileOptimizer />
          <CoreWebVitals />
          <SitemapGenerator />
          <SEOMonitoring />
          <SearchEngineSubmitter />
          <ContentDiscoveryBooster />
          <Toaster />
          <Sonner />
          <Header />
          <BreadcrumbNav className="container mx-auto px-4 py-2" />
          <ErrorBoundary>
            <React.Suspense fallback={<RouteLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/travel" element={<Travel />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/convert/:pair" element={<CurrencyPair />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Legacy URL redirects to prevent 404s and consolidate to /convert/ pattern */}
                <Route path="/usd-to-eur" element={<Navigate to="/convert/usd-to-eur" replace />} />
                <Route path="/usd-to-gbp" element={<Navigate to="/convert/usd-to-gbp" replace />} />
                <Route path="/usd-to-jpy" element={<Navigate to="/convert/usd-to-jpy" replace />} />
                <Route path="/eur-to-usd" element={<Navigate to="/convert/eur-to-usd" replace />} />
                <Route path="/eur-to-gbp" element={<Navigate to="/convert/eur-to-gbp" replace />} />
                <Route path="/gbp-to-usd" element={<Navigate to="/convert/gbp-to-usd" replace />} />
                <Route path="/gbp-to-eur" element={<Navigate to="/convert/gbp-to-eur" replace />} />
                <Route path="/cad-to-usd" element={<Navigate to="/convert/cad-to-usd" replace />} />
                <Route path="/aud-to-usd" element={<Navigate to="/convert/aud-to-usd" replace />} />
                <Route path="/usd-to-cad" element={<Navigate to="/convert/usd-to-cad" replace />} />
                <Route path="/usd-to-aud" element={<Navigate to="/convert/usd-to-aud" replace />} />
                <Route path="/chf-to-usd" element={<Navigate to="/convert/chf-to-usd" replace />} />
                <Route path="/usd-to-chf" element={<Navigate to="/convert/usd-to-chf" replace />} />
                <Route path="/nzd-to-usd" element={<Navigate to="/convert/nzd-to-usd" replace />} />
                <Route path="/usd-to-nzd" element={<Navigate to="/convert/usd-to-nzd" replace />} />
                <Route path="/jpy-to-usd" element={<Navigate to="/convert/jpy-to-usd" replace />} />
                <Route path="/eur-to-jpy" element={<Navigate to="/convert/eur-to-jpy" replace />} />
                
                <Route path="/sitemap.xml" element={null} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </ErrorBoundary>
        </div>
        <CookieConsent />
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;
