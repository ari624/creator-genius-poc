import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY || '';

export const openai = new OpenAI({
  apiKey,
});

// Transcribe audio using Whisper
export async function transcribeAudio(audioFile: File | Blob, language?: string) {
  try {
    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      ...(language && { language }),
    });

    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}

// Analyze image using GPT-4 Vision
export async function analyzeImage(imageUrl: string, prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

// Analyze multiple images
export async function analyzeImages(images: string[], prompt: string) {
  try {
    const content: Array<
      | { type: 'text'; text: string }
      | { type: 'image_url'; image_url: { url: string } }
    > = [
      {
        type: 'text',
        text: prompt,
      },
      ...images.map((url) => ({
        type: 'image_url' as const,
        image_url: { url },
      })),
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: content as any,
        },
      ],
      max_tokens: 4000,
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error analyzing images:', error);
    throw error;
  }
}

// Extract text from image (OCR)
export async function extractTextFromImage(imageUrl: string) {
  const prompt = `Extract all visible text from this image. Return only the text content, preserving formatting and structure where possible.`;
  return analyzeImage(imageUrl, prompt);
}
