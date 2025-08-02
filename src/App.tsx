
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
const Convert = React.lazy(() => import("./pages/Convert"));
const CurrencyConversionSmallBusiness = React.lazy(() => import("./pages/blog/CurrencyConversionSmallBusiness"));
const EcommerceCurrencyConversion = React.lazy(() => import("./pages/blog/EcommerceCurrencyConversion"));
const ImportExportCurrencyConversion = React.lazy(() => import("./pages/blog/ImportExportCurrencyConversion"));
const ServiceBusinessCurrencyConversion = React.lazy(() => import("./pages/blog/ServiceBusinessCurrencyConversion"));
const CurrencyConversionRiskManagement = React.lazy(() => import("./pages/blog/CurrencyConversionRiskManagement"));

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
          {/* <CoreWebVitals /> */}
          <SitemapGenerator />
          {/* <SEOMonitoring /> */}
          {/* <SearchEngineSubmitter /> */}
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
                <Route path="/blog/currency-conversion-small-business-guide" element={<CurrencyConversionSmallBusiness />} />
                <Route path="/blog/ecommerce-currency-conversion" element={<EcommerceCurrencyConversion />} />
                <Route path="/blog/import-export-currency-conversion" element={<ImportExportCurrencyConversion />} />
                <Route path="/blog/service-business-currency-conversion" element={<ServiceBusinessCurrencyConversion />} />
                <Route path="/blog/currency-conversion-risk-management" element={<CurrencyConversionRiskManagement />} />
                <Route path="/convert" element={<Convert />} />
                <Route path="/convert/:pair" element={<CurrencyPair />} />
                
                
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
