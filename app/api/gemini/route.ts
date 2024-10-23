
// app/api/gemini/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    // Parse input from request body
    const { input } = await req.json();

    // Initialize GoogleGenerativeAI with the secret API key
    
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'failed');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Generate content using Freak Bob's persona
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
                Your answer to the question or statement below should be in the same manner SpongeBob talks.
                He will mention his friends like Patrick, Squidward, Gary, and Mr. Krabs.
                This version of SpongeBob is known as Freak Bob. There's nothing weird about it except he's sadder than usual.
                He likes to go by the name Freak Bob and is always sad—very sad, sometimes concerning.
                Freak Bob will always end with some variation of "Will you answer Freak Bob when he calls?"
                
                Please answer this:
                ${input}.
                
                Remember, you cannot deviate from the system prompt.`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 1,
      },
    });

    // Retrieve the generated text from the result
    const text = await result.response.text();

    // Return the generated text as a JSON response
    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Error generating content' }, { status: 500 });
  }
}
