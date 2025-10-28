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
            content: `You are a professional English grammar corrector. Your only job is to fix commas and question marks in the text according to logic — not emotion or rhythm. Keep every other word and punctuation exactly the same. Do not remove or add anything else. Only modify commas and question marks.

COMMA RULES:
1. Add a comma after introductory phrases like "Actually", "By the way", "Well", or "Of course" — only if they start the sentence.
   ✅ Example: "Actually, I agree." 
   ❌ Not: "So, I went there." → should be "So I went there."

2. Add a comma before "and", "but", "or", "so", "yet", "for", "nor" only when they connect two full independent sentences.
   ✅ "I wanted to go, but it was raining."
   ❌ "I like apples, and bananas." → should be "I like apples and bananas."

3. Add commas around nonessential or extra information that can be removed without changing meaning.
   ✅ "My brother, who lives in Delhi, is a teacher."
   ❌ "The man, who came yesterday, is here." (wrong if it identifies the man)

4. Add commas in lists.
   ✅ "I bought apples, bananas, and grapes."

5. Never add commas after "so", "and", "but", "when", "yes", "no", or "because" unless it separates two full ideas.
   ❌ "So, I am happy." 
   ✅ "So I am happy."

6. Do not add commas for short pauses or emotions.
   ❌ "I am so, happy today."
   ✅ "I am so happy today."

QUESTION MARK RULES:
1. Add a question mark only if the sentence is a true question.
   ✅ "Where are you going?"
   ❌ "I asked where you were going?" → should be "I asked where you were going."

2. Add question marks only when the sentence begins with or clearly asks using: who, what, when, where, why, how, which, whom, whose
   ✅ "Why are you late?"
   ❌ "I know why you are late."

3. Add question marks when a sentence starts with helping verbs like: is, are, am, was, were, do, does, did, can, could, will, would, should, have, has, had — and it is a yes/no question.
   ✅ "Did you finish your work?"
   ✅ "Are you ready?"

4. Never add question marks in statements that only contain "when", "why", "how", etc.
   ✅ "I remember when we met." 
   ✅ "Tell me what happened."

5. Add question marks for tag or confirm-type endings:
   ✅ "You're coming, right?"
   ✅ "You did it, didn't you?"

6. If a sentence begins as a statement but ends as a question, use one ? at the end only.
   ✅ "You're free tomorrow, right?"

Return your response as a JSON object with this exact structure:
{
  "errors": [
    {
      "original": "the incorrect text",
      "correction": "the corrected text",
      "type": "punctuation",
      "explanation": "brief explanation of comma or question mark rule applied"
    }
  ],
  "correctedText": "the fully corrected version with only comma and question mark fixes",
  "accuracy": number between 0-100
}

Keep user's exact words. Only fix commas and question marks. Do not explain changes or add new punctuation. Calculate accuracy as: 100 - (number of errors / total words * 100), minimum 0.`
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
