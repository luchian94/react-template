import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60 * 1000 * 10, // 10 minutes
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });
