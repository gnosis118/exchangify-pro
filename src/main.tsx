import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
// Temporarily remove Toaster until React context issue is resolved
// import { Toaster } from '@/components/ui/toaster';
import App from './App';
import "./index.css";

// Diagnostic logging
console.log("🔍 main.tsx - React version:", React.version);
console.log("🔍 main.tsx - React useState:", typeof React.useState);
console.log("🔍 main.tsx - React context:", React.createContext);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const rootEl = document.getElementById('root');

if (!rootEl) {
  throw new Error("Root element not found. Did you forget <div id='root'></div> in your HTML?");
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
