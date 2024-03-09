'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getFetch, httpBatchLink, loggerLink } from '@trpc/client';

import type { FC, ReactNode } from 'react';

import { IS_DEV } from '../env';
import { TRPC_ENDPOINT_PATH } from './constant';
import { trpc } from './trpc';

export function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

const trpcURL = getBaseUrl() + TRPC_ENDPOINT_PATH;

export const TrpcProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => IS_DEV,
        }),
        httpBatchLink({
          url: trpcURL,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: 'include',
            });
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        {IS_DEV && <ReactQueryDevtools buttonPosition="bottom-left" />}
      </QueryClientProvider>
    </trpc.Provider>
  );
};
