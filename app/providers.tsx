'use client';

import { TrpcProvider } from '@/lib/trpc';

import type { ReactNode } from 'react';

export function Providers({ children }: { readonly children: ReactNode }) {
  return <TrpcProvider>{children}</TrpcProvider>;
}
