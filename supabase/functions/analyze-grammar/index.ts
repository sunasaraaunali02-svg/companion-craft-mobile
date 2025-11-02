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
    const { text, correctionMode = 'lenient' } = await req.json();
    
    if (!text || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ 
          yourInput: "",
          correctedVersion: "",
          mainIssues: [],
          fluencyFeedback: "No text provided to analyze.",
          accuracy: 100
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate input length (max ~1000 words)
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount > 1000) {
      return new Response(
        JSON.stringify({ 
          error: 'Text too long. Please keep input under 1000 words for optimal analysis.',
          yourInput: text,
          correctedVersion: text,
          mainIssues: [],
          fluencyFeedback: "Input is too long to analyze.",
          accuracy: 0
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Analyzing grammar for text (${wordCount} words, mode: ${correctionMode}):`, text.substring(0, 50) + '...');

    // Determine system prompt based on correction mode
    const systemPrompt = correctionMode === 'strict'
      ? `English Grammar Analyzer: Analyze ALL errors thoroughly.

DETECT: grammar, punctuation, capitalization, spelling, articles, prepositions, verb tense, subject-verb agreement, word order, style, clarity.

OUTPUT (JSON):
{
  "yourInput": "exact user text",
  "correctedVersion": "fully corrected version with all fixes",
  "mainIssues": ["issue 1", "issue 2", "issue 3", "issue 4"],
  "fluencyFeedback": "detailed feedback on improvements (max 30 words)",
  "accuracy": 0-100
}

Be thorough and identify all errors for learning purposes.`
      : `English Fluency Analyzer: Detect ONLY major grammar/structure issues affecting clarity.

IGNORE: punctuation, caps, spelling, style, accents, minor errors.

DETECT: verb tense, subject-verb agreement, word order, missing/wrong articles/prepositions, sentence logic.

OUTPUT (JSON):
{
  "yourInput": "exact user text",
  "correctedVersion": "natural grammar fix",
  "mainIssues": ["2-4 key issues or empty"],
  "fluencyFeedback": "1-line tip (max 20 words)",
  "accuracy": 0-100
}

If perfect → mainIssues = []
Accuracy = 100 - (major_errors/total_words × 100)`;

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
            content: systemPrompt
          },
          {
            role: 'user',
            content: text
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
    const rawContent = data.choices[0].message.content;
    const result = JSON.parse(rawContent);

    // Validate response structure
    const validatedResult = {
      yourInput: result.yourInput || text,
      correctedVersion: result.correctedVersion || text,
      mainIssues: Array.isArray(result.mainIssues) ? result.mainIssues : [],
      fluencyFeedback: result.fluencyFeedback || "Analysis completed.",
      accuracy: typeof result.accuracy === 'number' ? Math.max(0, Math.min(100, result.accuracy)) : 0
    };

    console.log('Grammar analysis result:', validatedResult);

    return new Response(
      JSON.stringify(validatedResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-grammar function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Unable to analyze. Please try again later.',
        yourInput: "",
        correctedVersion: "",
        mainIssues: [],
        fluencyFeedback: "Analysis service temporarily unavailable.",
        accuracy: 0
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
