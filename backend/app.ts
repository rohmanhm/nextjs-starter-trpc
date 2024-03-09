import { routesHandlers } from './routes';
import { router } from './trpc';

export const appRouter = router(routesHandlers);

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
