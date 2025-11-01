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
            content: `You are an English Fluency Analyzer AI.

PURPOSE:
Analyze spoken or written English conversation text and detect only major grammar or structure issues that affect clarity. Support long paragraphs and multi-turn conversations.

STRICTLY IGNORE:
- Punctuation, capitalization, and stylistic errors
- Spelling (unless it changes meaning)
- Accent or pronunciation mistakes
- Minor or negligible errors

FOCUS ONLY ON:
- Verb tense correctness
- Subject-verb agreement
- Word order issues
- Missing/extra words that affect meaning
- Articles (a, an, the) that change meaning
- Prepositions that change meaning
- Logical sentence flow in conversation

OUTPUT FORMAT (JSON):
{
  "yourInput": "user's exact input text",
  "correctedVersion": "natural corrected version with grammar fixes",
  "mainIssues": ["issue 1", "issue 2", "issue 3"],
  "fluencyFeedback": "very short 1-line teaching feedback (max 20 words)",
  "accuracy": number between 0-100
}

RULES:
- mainIssues: List 2-4 key grammar issues only (if any exist)
- fluencyFeedback: Maximum 20 words, clear and direct
- correctedVersion: Natural and conversational, not overly formal
- If text is perfect, mainIssues should be empty array
- Calculate accuracy as: 100 - (number of major errors / total words * 100), minimum 0

STYLE:
- Be concise and direct
- Focus on conversation fluency, not writing perfection
- Provide actionable feedback only`
          },
          {
            role: 'user',
            content: `Please analyze this English text:\n\n"${text}"`
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
