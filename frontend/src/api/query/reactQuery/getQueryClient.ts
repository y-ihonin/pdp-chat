import { QueryClient } from "@tanstack/react-query";

export default function getQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        refetchOnWindowFocus: false,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 * attemptIndex, 30000),
        staleTime: 5 * 1000
      },
    }
  });

  return queryClient;
}
