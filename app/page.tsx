'use client';

import { Button } from '@/components/ui/button';

import { trpc } from '@/lib/trpc';

export default function Page() {
  const { data, isLoading, isRefetching, refetch } = trpc.ping.useQuery();

  return (
    <div className="flex flex-col">
      Hello World. {isLoading || isRefetching ? 'Loading ...' : data}
      <Button
        disabled={isLoading || isRefetching}
        className="w-80"
        onClick={() => refetch()}
      >
        Refetch
      </Button>
    </div>
  );
}
