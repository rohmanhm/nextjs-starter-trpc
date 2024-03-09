import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export async function createContext(_opts: FetchCreateContextFnOptions) {
  /**
   * Example of how to get session from a request
   * const session = await getSession({ req: opts.req });
   */
  return {
    // session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
