import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BreadcrumbNav from "./components/BreadcrumbNav";
import PerformanceMonitor from "./components/PerformanceMonitor";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Charts = lazy(() => import("./pages/Charts"));
const Alerts = lazy(() => import("./pages/Alerts"));
const Travel = lazy(() => import("./pages/Travel"));
const Auth = lazy(() => import("./pages/Auth"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FAQ = lazy(() => import("./pages/FAQ"));
const CurrencyPair = lazy(() => import("./pages/CurrencyPair"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="container mx-auto px-4 py-8 space-y-6">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-32 w-full" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PerformanceMonitor />
      <BrowserRouter>
        <div className="min-h-screen">
          <Header />
          <BreadcrumbNav className="container mx-auto px-4 py-2" />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/travel" element={<Travel />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/convert/:pair" element={<CurrencyPair />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
