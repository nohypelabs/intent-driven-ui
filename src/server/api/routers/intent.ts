import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { LLMProvider } from '@/server/infrastructure/ai/llm-provider';
import { ProcessUserIntentUseCase } from '@/server/domain/use-cases/process-user-intent';

const llmProvider = new LLMProvider();
const processUserIntentUseCase = new ProcessUserIntentUseCase(llmProvider);

export const intentRouter = createTRPCRouter({
  process: publicProcedure
    .input(z.object({ prompt: z.string().min(1, 'Prompt cannot be empty') }))
    .mutation(async ({ input }) => {
      return await processUserIntentUseCase.execute(input.prompt);
    }),
});
