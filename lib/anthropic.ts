import Anthropic from '@anthropic-ai/sdk';

export const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

// Helper function to create a message with Claude
export async function createClaudeMessage(
  prompt: string,
  systemPrompt?: string,
  maxTokens: number = 4096
) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set. Please add it to your Vercel environment variables.');
  }

  try {
    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      ...(systemPrompt && { system: systemPrompt }),
    });

    const textContent = response.content.find((block) => block.type === 'text');
    return textContent ? (textContent as { type: 'text'; text: string }).text : '';
  } catch (error) {
    console.error('Error calling Claude:', error);
    throw error;
  }
}

// Streaming version for real-time responses
export async function streamClaudeMessage(
  prompt: string,
  systemPrompt?: string,
  onChunk?: (text: string) => void,
  maxTokens: number = 4096
) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not set. Please add it to your Vercel environment variables.');
  }

  try {
    const anthropic = new Anthropic({ apiKey });

    const stream = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      ...(systemPrompt && { system: systemPrompt }),
      stream: true,
    });

    let fullText = '';

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        const text = event.delta.text;
        fullText += text;
        if (onChunk) {
          onChunk(text);
        }
      }
    }

    return fullText;
  } catch (error) {
    console.error('Error streaming Claude:', error);
    throw error;
  }
}
