import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CookieConsent from "@/components/CookieConsent";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load pages
const Index = React.lazy(() => import("./pages/Index"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const CurrencyConversionSmallBusiness = React.lazy(() => import("./pages/blog/CurrencyConversionSmallBusiness"));
const EcommerceCurrencyConversion = React.lazy(() => import("./pages/blog/EcommerceCurrencyConversion"));
const ImportExportCurrencyConversion = React.lazy(() => import("./pages/blog/ImportExportCurrencyConversion"));
const ServiceBusinessCurrencyConversion = React.lazy(() => import("./pages/blog/ServiceBusinessCurrencyConversion"));
const CurrencyConversionRiskManagement = React.lazy(() => import("./pages/blog/CurrencyConversionRiskManagement"));

const RouteLoader = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-64 w-full" />
    </div>
  </div>
);

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary fallback={<div>Application failed to load</div>}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <AppProviders>
      <div className="min-h-screen">
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <React.Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/blog/currency-conversion-small-business-guide" element={<CurrencyConversionSmallBusiness />} />
              <Route path="/blog/ecommerce-currency-conversion" element={<EcommerceCurrencyConversion />} />
              <Route path="/blog/import-export-currency-conversion" element={<ImportExportCurrencyConversion />} />
              <Route path="/blog/service-business-currency-conversion" element={<ServiceBusinessCurrencyConversion />} />
              <Route path="/blog/currency-conversion-risk-management" element={<CurrencyConversionRiskManagement />} />
            </Routes>
          </React.Suspense>
        </ErrorBoundary>
      </div>
      <CookieConsent />
    </AppProviders>
  );
};

export default App;