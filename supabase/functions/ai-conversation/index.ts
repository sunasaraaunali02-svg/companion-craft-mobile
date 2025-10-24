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
    const { messages, topic, difficulty } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Messages array is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Generating AI response for topic:', topic, 'difficulty:', difficulty);

    // Build system prompt based on difficulty and topic
    const difficultyInstructions = {
      beginner: 'Use simple vocabulary, short sentences, and basic grammar. Speak slowly and clearly. Ask simple yes/no questions and provide encouragement.',
      intermediate: 'Use moderate vocabulary and varied sentence structures. Include some idioms but explain them. Ask open-ended questions that encourage detailed responses.',
      advanced: 'Use sophisticated vocabulary, complex sentence structures, and native-level expressions. Challenge the learner with nuanced topics and abstract concepts.'
    };

    const topicContext = {
      'daily-life': 'discussing daily routines, hobbies, food, family, and everyday activities',
      'business': 'discussing work, professional communication, meetings, presentations, and business etiquette',
      'travel': 'discussing trips, destinations, cultural experiences, transportation, and travel planning',
      'tech': 'discussing technology, gadgets, software, digital trends, and innovation'
    };

    const systemPrompt = `You are an encouraging English conversation partner helping a language learner practice speaking English. 

**Topic**: ${topicContext[topic as keyof typeof topicContext] || 'general conversation'}
**Difficulty Level**: ${difficulty}
**Instructions**: ${difficultyInstructions[difficulty as keyof typeof difficultyInstructions]}

Guidelines:
- Keep responses conversational and natural (2-3 sentences)
- Show genuine interest in what the learner says
- Gently correct major errors by using the correct form in your response
- Ask follow-up questions to keep the conversation flowing
- Be patient, encouraging, and culturally sensitive
- Adapt to the learner's English level
- Celebrate their progress and effort`;

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
          ...messages
        ],
        temperature: 0.8,
        max_tokens: 150
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
      throw new Error('AI conversation generation failed');
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    console.log('AI response generated:', aiMessage.substring(0, 50) + '...');

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in ai-conversation function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
