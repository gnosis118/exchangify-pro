import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from "./components/Header";
import BreadcrumbNav from "./components/BreadcrumbNav";
import ErrorBoundary from "./components/ErrorBoundary";
import MobileOptimizer from "./components/MobileOptimizer";
import CoreWebVitals from "./components/CoreWebVitals";
import SitemapGenerator from "./components/SitemapGenerator";
import PerformanceOptimizer from "./components/PerformanceOptimizer";

// Lazy load page components for better performance
const Index = React.lazy(() => import("./pages/Index"));
const Charts = React.lazy(() => import("./pages/Charts"));
const Alerts = React.lazy(() => import("./pages/Alerts"));
const Travel = React.lazy(() => import("./pages/Travel"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const FAQ = React.lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const CurrencyPair = React.lazy(() => import("./pages/CurrencyPair"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

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

const App = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary fallback={<div className="p-4 text-center">Application failed to load. Please refresh the page.</div>}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <BrowserRouter>
              <div className="min-h-screen">
                <MobileOptimizer />
                <CoreWebVitals />
                <SitemapGenerator />
                <PerformanceOptimizer />
                
                <Header />
                <BreadcrumbNav />
                <Toaster />
                <Sonner />
                
                <Suspense fallback={<RouteLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/charts" element={<Charts />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/travel" element={<Travel />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/convert/:pair" element={<CurrencyPair />} />
                    
                    {/* Legacy redirects */}
                    <Route path="/usd-to-eur" element={<Navigate to="/convert/usd-to-eur" replace />} />
                    <Route path="/usd-to-gbp" element={<Navigate to="/convert/usd-to-gbp" replace />} />
                    <Route path="/eur-to-gbp" element={<Navigate to="/convert/eur-to-gbp" replace />} />
                    <Route path="/gbp-to-usd" element={<Navigate to="/convert/gbp-to-usd" replace />} />
                    <Route path="/usd-to-jpy" element={<Navigate to="/convert/usd-to-jpy" replace />} />
                    <Route path="/eur-to-usd" element={<Navigate to="/convert/eur-to-usd" replace />} />
                    <Route path="/cad-to-usd" element={<Navigate to="/convert/cad-to-usd" replace />} />
                    <Route path="/aud-to-usd" element={<Navigate to="/convert/aud-to-usd" replace />} />
                    <Route path="/nzd-to-usd" element={<Navigate to="/convert/nzd-to-usd" replace />} />
                    <Route path="/chf-to-usd" element={<Navigate to="/convert/chf-to-usd" replace />} />
                    <Route path="/sek-to-usd" element={<Navigate to="/convert/sek-to-usd" replace />} />
                    <Route path="/nok-to-usd" element={<Navigate to="/convert/nok-to-usd" replace />} />
                    <Route path="/dkk-to-usd" element={<Navigate to="/convert/dkk-to-usd" replace />} />
                    <Route path="/pln-to-usd" element={<Navigate to="/convert/pln-to-usd" replace />} />
                    <Route path="/czk-to-usd" element={<Navigate to="/convert/czk-to-usd" replace />} />
                    <Route path="/huf-to-usd" element={<Navigate to="/convert/huf-to-usd" replace />} />
                    <Route path="/ron-to-usd" element={<Navigate to="/convert/ron-to-usd" replace />} />
                    <Route path="/bgn-to-usd" element={<Navigate to="/convert/bgn-to-usd" replace />} />
                    <Route path="/hrk-to-usd" element={<Navigate to="/convert/hrk-to-usd" replace />} />
                    <Route path="/rub-to-usd" element={<Navigate to="/convert/rub-to-usd" replace />} />
                    <Route path="/try-to-usd" element={<Navigate to="/convert/try-to-usd" replace />} />
                    <Route path="/inr-to-usd" element={<Navigate to="/convert/inr-to-usd" replace />} />
                    <Route path="/cny-to-usd" element={<Navigate to="/convert/cny-to-usd" replace />} />
                    <Route path="/jpy-to-usd" element={<Navigate to="/convert/jpy-to-usd" replace />} />
                    <Route path="/krw-to-usd" element={<Navigate to="/convert/krw-to-usd" replace />} />
                    <Route path="/thb-to-usd" element={<Navigate to="/convert/thb-to-usd" replace />} />
                    <Route path="/idr-to-usd" element={<Navigate to="/convert/idr-to-usd" replace />} />
                    <Route path="/myr-to-usd" element={<Navigate to="/convert/myr-to-usd" replace />} />
                    <Route path="/sgd-to-usd" element={<Navigate to="/convert/sgd-to-usd" replace />} />
                    <Route path="/hkd-to-usd" element={<Navigate to="/convert/hkd-to-usd" replace />} />
                    <Route path="/php-to-usd" element={<Navigate to="/convert/php-to-usd" replace />} />
                    <Route path="/vnd-to-usd" element={<Navigate to="/convert/vnd-to-usd" replace />} />
                    <Route path="/brl-to-usd" element={<Navigate to="/convert/brl-to-usd" replace />} />
                    <Route path="/ars-to-usd" element={<Navigate to="/convert/ars-to-usd" replace />} />
                    <Route path="/clp-to-usd" element={<Navigate to="/convert/clp-to-usd" replace />} />
                    <Route path="/cop-to-usd" element={<Navigate to="/convert/cop-to-usd" replace />} />
                    <Route path="/pen-to-usd" element={<Navigate to="/convert/pen-to-usd" replace />} />
                    <Route path="/mxn-to-usd" element={<Navigate to="/convert/mxn-to-usd" replace />} />
                    <Route path="/zar-to-usd" element={<Navigate to="/convert/zar-to-usd" replace />} />
                    <Route path="/egp-to-usd" element={<Navigate to="/convert/egp-to-usd" replace />} />
                    <Route path="/ngn-to-usd" element={<Navigate to="/convert/ngn-to-usd" replace />} />
                    <Route path="/kes-to-usd" element={<Navigate to="/convert/kes-to-usd" replace />} />
                    <Route path="/ils-to-usd" element={<Navigate to="/convert/ils-to-usd" replace />} />
                    <Route path="/aed-to-usd" element={<Navigate to="/convert/aed-to-usd" replace />} />
                    <Route path="/sar-to-usd" element={<Navigate to="/convert/sar-to-usd" replace />} />
                    <Route path="/pkr-to-usd" element={<Navigate to="/convert/pkr-to-usd" replace />} />
                    <Route path="/twd-to-usd" element={<Navigate to="/convert/twd-to-usd" replace />} />
                    <Route path="/btc-to-usd" element={<Navigate to="/convert/btc-to-usd" replace />} />
                    <Route path="/eth-to-usd" element={<Navigate to="/convert/eth-to-usd" replace />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;