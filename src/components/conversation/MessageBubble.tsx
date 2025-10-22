import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Volume2, Square } from "lucide-react";
import { Message } from "@/hooks/useConversation";

interface MessageBubbleProps {
  message: Message;
  isAISpeaking: boolean;
  onPlayAudio: (messageId: string) => void;
  onStopAudio: () => void;
}

export const MessageBubble = ({ message, isAISpeaking, onPlayAudio, onStopAudio }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <Avatar className="h-8 w-8 bg-primary">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            AI
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex-1 ${isUser ? "flex justify-end" : ""}`}>
        <div className={`rounded-lg p-3 max-w-[80%] ${
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        }`}>
          <p className="text-sm font-body">{message.content}</p>
        </div>
        
        {!isUser && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 h-8 text-xs"
            onClick={() => isAISpeaking ? onStopAudio() : onPlayAudio(message.id)}
          >
            {isAISpeaking ? (
              <>
                <Square className="h-3 w-3 mr-1" />
                Stop
              </>
            ) : (
              <>
                <Volume2 className="h-3 w-3 mr-1" />
                Play
              </>
            )}
          </Button>
        )}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 bg-secondary">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
            ME
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
