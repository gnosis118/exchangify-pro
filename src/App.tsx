import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "@/components/CookieConsent";
import Header from "./components/Header";
import BreadcrumbNav from "./components/BreadcrumbNav";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load all route components for better code splitting
const Index = lazy(() => import("./pages/Index"));
const Charts = lazy(() => import("./pages/Charts"));
const Alerts = lazy(() => import("./pages/Alerts"));
const Travel = lazy(() => import("./pages/Travel"));
const Auth = lazy(() => import("./pages/Auth"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CurrencyPair = lazy(() => import("./pages/CurrencyPair"));
const CurrencyPairPage = lazy(() => import("./components/CurrencyPairPages"));

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

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <Header />
            <BreadcrumbNav className="container mx-auto px-4 py-2" />
            <ErrorBoundary>
              <Suspense fallback={<RouteLoader />}>
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
                <Route path="/usd-to-eur" element={<CurrencyPairPage />} />
                <Route path="/usd-to-gbp" element={<CurrencyPairPage />} />
                <Route path="/usd-to-jpy" element={<CurrencyPairPage />} />
                <Route path="/eur-to-gbp" element={<CurrencyPairPage />} />
                <Route path="/usd-to-cad" element={<CurrencyPairPage />} />
                <Route path="/usd-to-aud" element={<CurrencyPairPage />} />
                <Route path="/gbp-to-usd" element={<CurrencyPairPage />} />
                <Route path="/eur-to-usd" element={<CurrencyPairPage />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </BrowserRouter>
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;