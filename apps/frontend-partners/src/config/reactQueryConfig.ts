// queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, // Limiter les tentatives en cas d'échec
    },
    mutations: {
      retry: 1, // Idem pour les mutations
    },
  },
});
