import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CookieConsent from "@/components/CookieConsent";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load blog page
const Blog = React.lazy(() => import("./pages/Blog"));

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
      <div className="min-h-screen">
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <React.Suspense fallback={<RouteLoader />}>
            <Blog />
          </React.Suspense>
        </ErrorBoundary>
      </div>
      <CookieConsent />
    </AppProviders>
  );
};

export default App;