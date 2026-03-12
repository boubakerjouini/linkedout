import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, count = 3 } = await request.json();

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 5) {
      return NextResponse.json(
        { error: 'Please provide a topic or description (at least 5 characters).' },
        { status: 400 }
      );
    }

    const postCount = Math.min(Math.max(1, Number(count)), 5);

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 2048,
      system: `You are a satirical LinkedIn post generator. Create peak LinkedIn content that parodies the most over-the-top, humble-bragging, buzzword-laden posts on the platform. Be satirical but not mean-spirited. Return valid JSON only: { "posts": [{ "content": string (the full post text, 3-6 sentences), "hashtags": string (5-8 relevant hashtags separated by spaces), "toxic_level": number (1-5 where 5 is most toxic/cringey), "mode": string (one of: "Hustle Gospel", "Humble Brag", "Failure Theater", "Thought Leader", "Gratitude Bomb") }] }`,
      messages: [
        {
          role: 'user',
          content: `Generate ${postCount} satirical LinkedIn posts about: ${prompt}`,
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

    if (!result.posts || !Array.isArray(result.posts)) {
      throw new Error('Invalid AI response structure');
    }

    // Validate and normalize each post
    result.posts = result.posts.map((post: any) => ({
      content: String(post.content || ''),
      hashtags: String(post.hashtags || '#LinkedIn #Hustle'),
      toxic_level: Math.max(1, Math.min(5, Number(post.toxic_level) || 3)),
      mode: String(post.mode || 'Thought Leader'),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Generate API error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Content generation failed. The AI is probably crafting its own LinkedIn post.' },
      { status: 500 }
    );
  }
}
