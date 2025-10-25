import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

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

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="mb-3">
                EnglishTutor collects information to provide and improve our English learning services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account Information:</strong> Email, display name, and proficiency level
                </li>
                <li>
                  <strong>Practice Data:</strong> Voice recordings, transcriptions, conversation history, and performance metrics
                </li>
                <li>
                  <strong>Usage Data:</strong> Session duration, topics practiced, accuracy scores, and progress statistics
                </li>
                <li>
                  <strong>Device Information:</strong> Browser type, device type, and operating system
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide personalized English learning experiences</li>
                <li>Analyze your speech and provide grammar feedback</li>
                <li>Track your progress and improvement over time</li>
                <li>Generate AI-powered conversation responses</li>
                <li>Improve our services and develop new features</li>
                <li>Send important service updates and notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>End-to-end encryption for voice recordings</li>
                <li>Secure authentication with Supabase</li>
                <li>Row-level security policies on all database tables</li>
                <li>Regular security audits and updates</li>
                <li>HTTPS encryption for all data transmission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
              <p>
                We retain your data as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Account information: Until you delete your account</li>
                <li>Practice sessions: Up to 1 year for free users, indefinitely for premium users</li>
                <li>Voice recordings: 30 days unless saved by user</li>
                <li>Analytics data: Aggregated and anonymized for up to 2 years</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
              <p className="mb-3">
                EnglishTutor uses the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Supabase:</strong> Database and authentication services
                </li>
                <li>
                  <strong>OpenAI/Google AI:</strong> AI-powered conversation and grammar analysis
                </li>
                <li>
                  <strong>Web Speech API:</strong> Browser-native speech recognition (no data sent to servers)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data in a machine-readable format</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Children's Privacy</h2>
              <p>
                EnglishTutor is not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you believe we have collected 
                information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance 
                with this privacy policy and applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any 
                significant changes by posting the new policy on this page and updating the 
                "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our data practices, 
                please contact us at:
              </p>
              <p className="mt-3">
                <strong>Email:</strong> privacy@englishtutor.app<br />
                <strong>Address:</strong> [Your Business Address]
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
