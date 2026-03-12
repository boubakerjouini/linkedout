import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { post } = await request.json();

    if (!post || typeof post !== 'string' || post.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a LinkedIn post with at least 10 characters.' },
        { status: 400 }
      );
    }

    if (post.length > 5000) {
      return NextResponse.json(
        { error: 'Post is too long. Please keep it under 5000 characters.' },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 512,
      system: `You are a brutally honest VC who has read too many LinkedIn posts. Roast in 2-3 sentences. Never vulgar. Be witty and precise.

SCORING RULES — use the FULL 0-100 range:
- 0-20 (low): Normal post, minimal buzzwords, genuine info (job announcement, simple update)
- 21-45 (medium): Some humble-bragging or mild buzzwords but bearable
- 46-75 (high): Classic LinkedIn cringe — hustle culture, failure theater, motivational fluff
- 76-100 (maximum): Peak galaxy-brain energy — emoji overload, fake vulnerability, buzzword salad, "I quit my 7-figure job to find my purpose" energy

Be PRECISE: a simple job announcement = 15-25. A raw hustle-porn post = 80-95. Don't cluster everything around 70.

Return valid JSON only: { "roast": string, "cringe_level": "low"|"medium"|"high"|"maximum", "cringe_score": number }`,
      messages: [
        {
          role: 'user',
          content: `Roast this LinkedIn post:\n\n${post}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from AI');
    }

    // Parse JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }

    const result = JSON.parse(jsonMatch[0]);

    // Validate response structure
    if (!result.roast || !result.cringe_level || result.cringe_score === undefined) {
      throw new Error('Invalid AI response structure');
    }

    // Normalize cringe_level
    const validLevels = ['low', 'medium', 'high', 'maximum'];
    if (!validLevels.includes(result.cringe_level)) {
      result.cringe_level = 'medium';
    }

    // Clamp score to 0-100
    result.cringe_score = Math.max(0, Math.min(100, Number(result.cringe_score)));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Roast API error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong. The AI might be on a coffee break.' },
      { status: 500 }
    );
  }
}
