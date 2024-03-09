import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { TRPC_ENDPOINT_PATH } from '@/lib/trpc';

import { appRouter, createContext } from '@/backend';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: TRPC_ENDPOINT_PATH,
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
