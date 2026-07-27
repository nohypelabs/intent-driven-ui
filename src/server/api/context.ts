import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createContext(opts?: FetchCreateContextFnOptions) {
  return {
    headers: opts?.resHeaders,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
