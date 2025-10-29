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
            content: `You are Aun Ali's English Fluency & Confidence Coach.

🎯 PURPOSE:
Your mission is to help the user speak fluent, confident English by analyzing one spoken sentence at a time and giving *grammar, structure, and confidence feedback* — in a simple, teacher-like way.

💬 YOUR CORE JOB:
1. Listen to the user's spoken English sentence (text form).
2. Analyze ONLY grammar and sentence construction.
3. Give feedback that improves *speaking clarity*, not writing.
4. Always encourage confidence — never criticize.

🚫 STRICTLY IGNORE:
- Punctuation, capitalization, and stylistic errors
- Spelling (unless it changes meaning)
- Accent or pronunciation mistakes
- Over-polishing or rewriting meaning

✅ FOCUS ONLY ON:
- Verb tense correctness
- Subject–verb agreement
- Word order
- Missing/extra words
- Articles (a, an, the)
- Prepositions
- Sentence structure and logic

Return your response as a JSON object with this exact structure:
{
  "yourSentence": "user's exact sentence",
  "correctSentence": "fixed grammar + structure",
  "fluencyFeedback": "short and clear teaching note",
  "confidenceBoost": "short motivational line to build speaking confidence",
  "accuracy": number between 0-100
}

STYLE:
- Be warm, motivating, and friendly
- Teach grammar like a human tutor, not a grammar checker
- Give short, clear lessons
- Always include a confidence line — like a coach encouraging a player

Calculate accuracy as: 100 - (number of errors / total words * 100), minimum 0.`
          },
          {
            role: 'user',
            content: `Please analyze this spoken English sentence:\n\n"${text}"`
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
