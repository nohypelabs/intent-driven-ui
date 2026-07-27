import { createTRPCRouter } from './trpc';
import { intentRouter } from './routers/intent';

export const appRouter = createTRPCRouter({
  intent: intentRouter,
});

export type AppRouter = typeof appRouter;
