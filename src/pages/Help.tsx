import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Mic, 
  MessageCircle, 
  TrendingUp, 
  Settings, 
  Shield,
  HelpCircle,
  Mail
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Help = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How does speech recognition work?",
      answer: "EnglishTutor uses your browser's built-in Web Speech API to convert your voice into text in real-time. Make sure to allow microphone access when prompted. For best results, speak clearly in a quiet environment."
    },
    {
      question: "What proficiency levels are supported?",
      answer: "We support all CEFR levels from A1 (Beginner) to C2 (Proficient). The AI adjusts conversation difficulty and feedback based on your selected proficiency level in your profile settings."
    },
    {
      question: "How is my accuracy score calculated?",
      answer: "Your accuracy score is based on grammar correctness, pronunciation quality, and vocabulary usage. It's calculated per session and averaged over time to show your progress."
    },
    {
      question: "Can I use EnglishTutor offline?",
      answer: "EnglishTutor is a Progressive Web App (PWA) with offline capabilities. You can review past sessions and access saved content offline. However, AI features and new practice sessions require an internet connection."
    },
    {
      question: "How do I maintain my daily streak?",
      answer: "Complete at least one practice session or conversation per day. Your streak counter updates automatically and is displayed on your home screen."
    },
    {
      question: "What's included in the Premium tier?",
      answer: "Premium includes unlimited practice sessions, advanced pronunciation analysis, custom learning paths, professional progress reports, offline mode access, and priority support."
    },
    {
      question: "Is my voice data secure?",
      answer: "Yes! All voice recordings are encrypted and stored securely. We use industry-standard security measures and you can delete your recordings at any time. See our Privacy Policy for details."
    },
    {
      question: "Can I export my progress reports?",
      answer: "Premium users can export detailed progress reports in PDF format from the Progress tab. These include accuracy trends, session history, and improvement recommendations."
    },
    {
      question: "How do I change my proficiency level?",
      answer: "Go to Profile > Language Proficiency and select your current level. The AI will automatically adjust to provide appropriate challenges."
    },
    {
      question: "What browsers are supported?",
      answer: "EnglishTutor works best on Chrome, Edge, and Safari (iOS 14.5+). These browsers have the best speech recognition support. Firefox has limited speech recognition capabilities."
    }
  ];

  const quickGuides = [
    {
      icon: Mic,
      title: "Starting Practice",
      steps: [
        "Tap the Practice tab or 'Practice Speaking' button",
        "Select a topic or use suggested topics",
        "Tap the microphone button to start recording",
        "Speak naturally - the app transcribes in real-time",
        "Stop recording to see grammar feedback and accuracy"
      ]
    },
    {
      icon: MessageCircle,
      title: "AI Conversations",
      steps: [
        "Navigate to the Conversation tab",
        "Choose your topic and difficulty level",
        "The AI will start the conversation",
        "Respond by tapping the voice button and speaking",
        "Listen to AI responses or read them as text",
        "End conversation to see detailed feedback"
      ]
    },
    {
      icon: TrendingUp,
      title: "Tracking Progress",
      steps: [
        "Open the Progress tab to see your stats",
        "View daily streak calendar and accuracy trends",
        "Check topic-specific performance",
        "Review session history in the History tab",
        "Set goals and track achievements"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-4 pb-20">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6">
          {/* Header */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-primary/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Help & Support</h1>
                <p className="text-muted-foreground">
                  Everything you need to know about EnglishTutor
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Start Guides */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Quick Start Guides</h2>
            {quickGuides.map((guide, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <guide.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{guide.title}</h3>
                </div>
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  {guide.steps.map((step, stepIndex) => (
                    <li key={stepIndex}>{step}</li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          {/* Support Resources */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Support Resources</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/settings">
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <Settings className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize your experience
                  </p>
                </div>
              </Link>
              <Link to="/privacy-policy">
                <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold mb-1">Privacy Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    How we protect your data
                  </p>
                </div>
              </Link>
            </div>
          </Card>

          {/* Contact Support */}
          <Card className="p-6 bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Need More Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Can't find what you're looking for? Our support team is here to help!
                </p>
                <Button variant="default">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
