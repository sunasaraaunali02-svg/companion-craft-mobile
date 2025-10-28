import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ errors: [], accuracy: 100 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing grammar for text:', text.substring(0, 50) + '...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a professional English editor. Fix all grammar, tense, punctuation, and clarity errors while keeping the tone and meaning unchanged.

WHAT TO FIX:
1. Grammar errors (subject-verb agreement, articles, prepositions, etc.)
2. Tense consistency and correctness
3. Punctuation (commas, periods, question marks, apostrophes)
4. Clarity and word choice improvements
5. Sentence structure issues

RULES:
- Keep the original tone and meaning
- Make minimal changes needed for correctness
- Do not add new ideas or change the message
- Fix "I'm" to "I was" when context is past tense
- Correct subject-verb agreement errors
- Add missing articles (a, an, the) where needed
- Fix run-on sentences and fragments

Return your response as a JSON object with this exact structure:
{
  "errors": [
    {
      "original": "the incorrect text",
      "correction": "the corrected text",
      "type": "grammar" | "spelling" | "punctuation" | "tense" | "clarity",
      "explanation": "brief explanation of what was fixed"
    }
  ],
  "correctedText": "the fully corrected version",
  "accuracy": number between 0-100
}

Calculate accuracy as: 100 - (number of errors / total words * 100), minimum 0.`
          },
          {
            role: 'user',
            content: `Please analyze this text for grammar, spelling, and punctuation errors:\n\n"${text}"`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI analysis failed');
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log('Grammar analysis result:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-grammar function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        errors: [],
        accuracy: 0
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
