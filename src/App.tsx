import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import BreadcrumbNav from "./components/BreadcrumbNav";
import Index from "./pages/Index";
import Charts from "./pages/Charts";
import Alerts from "./pages/Alerts";
import Travel from "./pages/Travel";
import Auth from "./pages/Auth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import CurrencyPair from "./pages/CurrencyPair";

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
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
