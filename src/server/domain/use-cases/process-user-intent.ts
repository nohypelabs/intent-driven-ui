import { LLMProvider } from '@/server/infrastructure/ai/llm-provider';
import { UIWidget } from '@/shared/schemas/widget-schema';

export class ProcessUserIntentUseCase {
  constructor(private llmProvider: LLMProvider) {}

  async execute(prompt: string): Promise<{ widget: UIWidget; message: string }> {
    if (!prompt || prompt.trim().length === 0) {
      throw new Error('Prompt cannot be empty');
    }

    const widget = await this.llmProvider.parseIntentToWidget(prompt);

    return {
      message: 'Intent processed successfully.',
      widget,
    };
  }
}
