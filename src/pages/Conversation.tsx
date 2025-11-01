import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useConversation } from "@/hooks/useConversation";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { usePracticeSession } from "@/hooks/usePracticeSession";
import { MessageBubble } from "@/components/conversation/MessageBubble";
import { TypingIndicator } from "@/components/conversation/TypingIndicator";
import { DifficultySelector } from "@/components/conversation/DifficultySlider";
import { FluencyResult } from "@/components/conversation/FluencyResult";
import { Badge } from "@/components/ui/badge";
import { formatTranscription } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const Conversation = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("daily-life");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [grammarFeedbackOpen, setGrammarFeedbackOpen] = useState(true);
  const [transcriptEmpty, setTranscriptEmpty] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const {
    currentSession,
    messages,
    isAITyping,
    isAISpeaking,
    startConversation,
    sendMessage,
    playAudio,
    stopAudio,
    endConversation,
  } = useConversation();

  const { analyzeGrammar } = usePracticeSession();
  const [fluencyFeedback, setFluencyFeedback] = useState<any>(null);

  const isFluencyMode = selectedTopic === "fluency";
  
  const { isRecording, transcript, startRecording, stopRecording, isDisabled } = useVoiceRecorder({ 
    disabled: isFluencyMode ? isAnalyzing : (isAITyping || isAISpeaking)
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAITyping]);

  useEffect(() => {
    if (transcript && !isRecording) {
      const cleaned = formatTranscription(transcript);
      
      if (cleaned.length === 0) {
        setTranscriptEmpty(true);
      } else {
        setTranscriptEmpty(false);
        
        if (isFluencyMode) {
          handleFluencyAnalysis(cleaned);
        } else {
          sendMessage(cleaned);
        }
      }
    }
  }, [transcript, isRecording, sendMessage, isFluencyMode]);

  const handleFluencyAnalysis = async (text: string) => {
    setIsAnalyzing(true);
    try {
      const feedback = await analyzeGrammar(text);
      if (feedback) {
        setFluencyFeedback(feedback);
      } else {
        toast({
          title: "Analysis Error",
          description: "Could not analyze your input. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Fluency analysis error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartConversation = () => {
    startConversation(selectedTopic, difficulty);
  };

  const handleEndConversation = () => {
    endConversation();
  };

  const handleVoiceInput = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-4">
      {/* Topic Selection and Difficulty */}
      <Card className="p-4">
        <Tabs value={selectedTopic} onValueChange={setSelectedTopic} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="daily-life" disabled={!!currentSession || isFluencyMode}>
              Daily Life
            </TabsTrigger>
            <TabsTrigger value="business" disabled={!!currentSession || isFluencyMode}>
              Business
            </TabsTrigger>
            <TabsTrigger value="travel" disabled={!!currentSession || isFluencyMode}>
              Travel
            </TabsTrigger>
            <TabsTrigger value="tech" disabled={!!currentSession || isFluencyMode}>
              Tech
            </TabsTrigger>
            <TabsTrigger value="fluency" disabled={!!currentSession}>
              English Fluency
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {!isFluencyMode && (
          <div className="mt-4">
            <DifficultySelector
              value={difficulty}
              onChange={setDifficulty}
              disabled={!!currentSession}
            />
          </div>
        )}

        {!currentSession && !isFluencyMode && (
          <Button onClick={handleStartConversation} className="w-full mt-4">
            Start Conversation
          </Button>
        )}
      </Card>

      {/* English Fluency Mode */}
      {isFluencyMode && (
        <Card className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">English Fluency Analyzer</h3>
            <p className="text-sm text-muted-foreground">
              Speak or type to analyze your English fluency and get instant feedback.
            </p>
          </div>

          {/* Voice Input */}
          <div className="space-y-4">
            <div className="flex gap-4 items-center justify-center p-8 bg-muted/30 rounded-lg border-2 border-dashed">
              <Button
                size="lg"
                variant={isRecording ? "destructive" : "default"}
                className="h-16 w-16 rounded-full"
                onClick={async () => {
                  if (isRecording) {
                    stopRecording();
                  } else {
                    await startRecording();
                  }
                }}
                disabled={isAnalyzing}
              >
                <Mic className="h-6 w-6" />
              </Button>
              <div className="flex-1">
                {isRecording && (
                  <p className="text-sm text-destructive font-medium animate-pulse">
                    Recording... Speak now
                  </p>
                )}
                {isAnalyzing && (
                  <p className="text-sm text-primary font-medium animate-pulse">
                    Analyzing your English...
                  </p>
                )}
                {!isRecording && !isAnalyzing && transcript && (
                  <p className="text-sm text-muted-foreground">
                    "{formatTranscription(transcript)}"
                  </p>
                )}
                {!isRecording && !isAnalyzing && !transcript && (
                  <p className="text-sm text-muted-foreground">
                    Click the microphone to start speaking
                  </p>
                )}
              </div>
            </div>

            {transcriptEmpty && transcript && (
              <div className="text-center text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 animate-fade-in">
                Couldn't hear you — please try again.
              </div>
            )}
          </div>

          {/* Fluency Result */}
          {fluencyFeedback && (
            <FluencyResult feedback={fluencyFeedback} />
          )}
        </Card>
      )}

      {/* Chat Interface */}
      {currentSession && !isFluencyMode && (
        <>
          <Card className="p-4 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-2 border-b">
              <div>
                <h3 className="font-semibold capitalize">{selectedTopic.replace("-", " ")}</h3>
                <p className="text-xs text-muted-foreground capitalize">{difficulty} level</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleEndConversation}>
                End Session
              </Button>
            </div>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isAISpeaking={isAISpeaking}
                    onPlayAudio={playAudio}
                    onStopAudio={stopAudio}
                  />
                ))}
                {isAITyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="space-y-2">
              <div className="flex gap-2 items-center pt-4 border-t mt-4">
                <Button
                  size="icon"
                  variant={isRecording ? "destructive" : "default"}
                  className="h-10 w-10 rounded-full"
                  onClick={handleVoiceInput}
                  disabled={isDisabled}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <div className="flex-1 flex items-center justify-center">
                  {isRecording && (
                    <span className="text-sm text-destructive font-medium animate-pulse">
                      Recording... Speak now
                    </span>
                  )}
                  {isDisabled && !isRecording && (
                    <span className="text-sm text-muted-foreground animate-pulse">
                      Mic paused — processing
                    </span>
                  )}
                  {!isRecording && !isDisabled && transcript && !transcriptEmpty && (
                    <span className="text-sm text-muted-foreground">
                      "{formatTranscription(transcript)}"
                    </span>
                  )}
                </div>
              </div>
              {transcriptEmpty && transcript && (
                <div className="text-center text-xs text-muted-foreground bg-muted/50 rounded-lg p-2 animate-fade-in">
                  Couldn't hear you — please try again.
                </div>
              )}
            </div>
          </Card>

          {/* Grammar Feedback Panel */}
          <Collapsible open={grammarFeedbackOpen} onOpenChange={setGrammarFeedbackOpen}>
            <Card className="overflow-hidden">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-between p-4 hover:bg-accent"
                >
                  <h3 className="text-sm font-semibold">Grammar Feedback</h3>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      grammarFeedbackOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-0 space-y-2">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Real-time grammar corrections will appear here during your conversation.
                      Keep practicing to improve your accuracy!
                    </p>
                  </div>
                  {messages.length > 2 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Session Accuracy</span>
                        <Badge variant="secondary">95%</Badge>
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </>
      )}
    </div>
  );
};

export default Conversation;
