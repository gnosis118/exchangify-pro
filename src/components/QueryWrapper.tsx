import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryWrapperProps {
  children: React.ReactNode;
}

const QueryWrapper: React.FC<QueryWrapperProps> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  }), []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryWrapper;