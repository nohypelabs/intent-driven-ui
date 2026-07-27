import { z } from 'zod';

export const IntentEntitySchema = z.object({
  id: z.string(),
  prompt: z.string(),
  widgetType: z.string(),
  createdAt: z.date(),
});

export type IntentEntity = z.infer<typeof IntentEntitySchema>;
