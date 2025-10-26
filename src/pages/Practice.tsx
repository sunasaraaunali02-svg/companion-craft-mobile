import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Play } from "lucide-react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { usePracticeSession } from "@/hooks/usePracticeSession";
import VoiceRecorder from "@/components/practice/VoiceRecorder";
import TranscriptionDisplay from "@/components/practice/TranscriptionDisplay";
import GrammarFeedback from "@/components/practice/GrammarFeedback";
import AccuracyMeter from "@/components/practice/AccuracyMeter";
import TopicSelector from "@/components/practice/TopicSelector";
import SessionTimer from "@/components/practice/SessionTimer";
import { toast } from "@/hooks/use-toast";
import { formatTranscription } from "@/lib/utils";

const Practice = () => {
  const [selectedTopic, setSelectedTopic] = useState("daily-life");
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentErrors, setCurrentErrors] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formattedTranscript, setFormattedTranscript] = useState("");
  const [transcriptEmpty, setTranscriptEmpty] = useState(false);
  
  const {
    isRecording,
    transcript,
    interimTranscript,
    startRecording,
    stopRecording,
    resetTranscript,
    isSupported,
  } = useVoiceRecorder();

  const {
    currentSession,
    sessions,
    startSession,
    updateTranscript,
    endSession,
    analyzeGrammar,
    calculateAccuracy,
  } = usePracticeSession();

  // Format and update session transcript when recording changes
  useEffect(() => {
    if (transcript) {
      const cleaned = formatTranscription(transcript);
      setFormattedTranscript(cleaned);
      
      if (cleaned.length === 0) {
        setTranscriptEmpty(true);
      } else {
        setTranscriptEmpty(false);
        if (currentSession) {
          updateTranscript(cleaned);
        }
      }
    }
  }, [transcript, currentSession, updateTranscript]);

  // Analyze grammar when formatted transcript changes
  useEffect(() => {
    const analyze = async () => {
      if (currentSession && currentSession.transcript) {
        setIsAnalyzing(true);
        const errors = await analyzeGrammar(currentSession.transcript);
        setCurrentErrors(errors);
        setIsAnalyzing(false);
      }
    };
    analyze();
  }, [currentSession?.transcript, analyzeGrammar]);

  const handleStartSession = () => {
    startSession(selectedTopic);
    setSessionStarted(true);
    startRecording();
  };

  const handleStopSession = async () => {
    stopRecording();
    await endSession();
    setSessionStarted(false);
  };

  const handleReset = () => {
    stopRecording();
    resetTranscript();
    setCurrentErrors([]);
    setFormattedTranscript("");
    setTranscriptEmpty(false);
    if (currentSession) {
      endSession();
    }
    setSessionStarted(false);
  };

  const currentAccuracy = currentSession
    ? calculateAccuracy(currentSession.transcript, currentErrors)
    : 0;
  const previousScore = sessions.length > 0 ? sessions[0].accuracyScore : undefined;

  if (!isSupported) {
    return (
      <div className="container max-w-4xl mx-auto p-4">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">
            Speech Recognition Not Supported
          </h2>
          <p className="text-muted-foreground">
            Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Header with Timer */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Practice Session</h1>
          <p className="text-sm text-muted-foreground">
            {sessionStarted ? "Session in progress" : "Select a topic to begin"}
          </p>
        </div>
        <SessionTimer
          isActive={sessionStarted}
          startTime={currentSession?.startTime}
        />
      </div>

      {/* Topic Selection */}
      <TopicSelector
        value={selectedTopic}
        onChange={setSelectedTopic}
        disabled={sessionStarted}
      />

      {/* Voice Recorder */}
      <VoiceRecorder
        isRecording={isRecording}
        onStart={sessionStarted ? startRecording : handleStartSession}
        onStop={stopRecording}
        disabled={!sessionStarted && !selectedTopic}
      />

      {/* Action Buttons */}
      {sessionStarted && (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            onClick={handleStopSession}
            className="gap-2"
            disabled={!transcript}
          >
            <Play className="h-4 w-4" />
            Complete Session
          </Button>
        </div>
      )}

      {/* Transcription Display */}
      {sessionStarted && (
        <>
          <TranscriptionDisplay
            transcript={formattedTranscript}
            interimTranscript={interimTranscript}
            isRecording={isRecording}
          />
          {transcriptEmpty && transcript && (
            <div className="text-center text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 animate-fade-in">
              Couldn't hear you — please try again.
            </div>
          )}
        </>
      )}

      {/* Results Grid */}
      {sessionStarted && formattedTranscript && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Accuracy Meter */}
          <AccuracyMeter score={currentAccuracy} previousScore={previousScore} />

          {/* Grammar Feedback */}
          <div className="md:col-span-2">
            <GrammarFeedback errors={currentErrors} transcript={formattedTranscript} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Practice;
