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
import { MessageBubble } from "@/components/conversation/MessageBubble";
import { TypingIndicator } from "@/components/conversation/TypingIndicator";
import { DifficultySelector } from "@/components/conversation/DifficultySlider";
import { Badge } from "@/components/ui/badge";
import { formatTranscription } from "@/lib/utils";

const Conversation = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>("daily-life");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [grammarFeedbackOpen, setGrammarFeedbackOpen] = useState(true);
  const [transcriptEmpty, setTranscriptEmpty] = useState(false);
  
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

  const { isRecording, transcript, startRecording, stopRecording, isDisabled } = useVoiceRecorder({ 
    disabled: isAITyping || isAISpeaking 
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
        sendMessage(cleaned);
      }
    }
  }, [transcript, isRecording, sendMessage]);

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="daily-life" disabled={!!currentSession}>
              Daily Life
            </TabsTrigger>
            <TabsTrigger value="business" disabled={!!currentSession}>
              Business
            </TabsTrigger>
            <TabsTrigger value="travel" disabled={!!currentSession}>
              Travel
            </TabsTrigger>
            <TabsTrigger value="tech" disabled={!!currentSession}>
              Tech
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mt-4">
          <DifficultySelector
            value={difficulty}
            onChange={setDifficulty}
            disabled={!!currentSession}
          />
        </div>

        {!currentSession && (
          <Button onClick={handleStartConversation} className="w-full mt-4">
            Start Conversation
          </Button>
        )}
      </Card>

      {/* Chat Interface */}
      {currentSession && (
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
