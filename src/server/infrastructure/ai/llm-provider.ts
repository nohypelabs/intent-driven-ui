import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { UIWidgetSchema, UIWidget } from '@/shared/schemas/widget-schema';
import { INTENT_PARSER_SYSTEM_PROMPT } from './prompts';

export class LLMProvider {
  async parseIntentToWidget(userPrompt: string): Promise<UIWidget> {
    try {
      const { object } = await generateObject({
        model: google('gemini-2.0-flash'),
        schema: UIWidgetSchema,
        system: INTENT_PARSER_SYSTEM_PROMPT,
        prompt: userPrompt,
        temperature: 0.2,
      });

      return object;
    } catch (error) {
      console.error('Failed to parse intent via LLM:', error);

      return {
        type: 'EMPTY_STATE',
        message: 'Sorry, failed to process the UI. Please try another instruction.',
        suggestions: [
          'Show metrics summary',
          'Create a data table',
          'Schedule a task',
        ],
      };
    }
  }
}
