import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Volume2, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Conversation = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-4">
      {/* Topic Selection Tabs */}
      <Tabs defaultValue="daily-life" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily-life">Daily Life</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="travel">Travel</TabsTrigger>
          <TabsTrigger value="tech">Tech</TabsTrigger>
        </TabsList>

        <TabsContent value="daily-life" className="space-y-4 mt-4">
          {/* Chat Interface */}
          <Card className="p-4 min-h-[400px] flex flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto mb-4">
              {/* AI Message */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm font-body">
                      Hello! I'm your AI conversation partner. Let's talk about your daily
                      routine. What time do you usually wake up?
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 h-8 text-xs"
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-3 justify-end">
                <div className="flex-1 flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm font-body">
                      I usually wake up at 7 AM on weekdays.
                    </p>
                  </div>
                </div>
                <Avatar className="h-8 w-8 bg-secondary">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                    ME
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Typing Indicator */}
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-2 items-center pt-4 border-t">
              <Button
                size="icon"
                variant={isRecording ? "destructive" : "default"}
                className="h-10 w-10 rounded-full"
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className="h-5 w-5" />
              </Button>
              <div className="flex-1 flex items-center justify-center">
                {isRecording && (
                  <span className="text-sm text-destructive font-medium animate-pulse">
                    Recording...
                  </span>
                )}
              </div>
            </div>
          </Card>

          {/* Grammar Feedback Panel */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3">Grammar Feedback</h3>
            <div className="space-y-2">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Real-time grammar corrections will appear here during your
                  conversation
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Conversation;
