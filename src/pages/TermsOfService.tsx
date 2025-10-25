import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
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
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using EnglishTutor ("the Service"), you accept and agree to be 
                bound by these Terms of Service. If you do not agree to these terms, please do 
                not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p>
                EnglishTutor is an AI-powered Progressive Web App designed to help users improve 
                their English speaking skills through voice practice, real-time feedback, grammar 
                analysis, and conversational AI interactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must create an account to use the Service</li>
                <li>You must be at least 13 years old to create an account</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You are responsible for all activities under your account</li>
                <li>You must provide accurate and complete information</li>
                <li>One person or entity may maintain only one account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Subscription and Payment</h2>
              <p className="mb-3">
                <strong>Free Tier:</strong> Limited practice sessions and basic features
              </p>
              <p className="mb-3">
                <strong>Premium Tier:</strong> Unlimited sessions and advanced features
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Subscriptions renew automatically unless cancelled</li>
                <li>Prices are subject to change with 30 days notice</li>
                <li>Refunds are provided in accordance with our refund policy</li>
                <li>You may cancel your subscription at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Acceptable Use</h2>
              <p className="mb-3">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for any illegal purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious code or viruses</li>
                <li>Attempt to reverse engineer the Service</li>
                <li>Share your account credentials with others</li>
                <li>Use automated systems to access the Service</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by 
                EnglishTutor and are protected by international copyright, trademark, patent, 
                trade secret, and other intellectual property laws.
              </p>
              <p className="mt-3">
                You retain ownership of your practice data and recordings. By using the Service, 
                you grant us a license to use this data to provide and improve the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. AI-Generated Content</h2>
              <p>
                The Service uses AI to generate conversation responses and grammar feedback. 
                While we strive for accuracy, AI-generated content may contain errors or 
                inaccuracies. Use of AI-generated content is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Privacy and Data</h2>
              <p>
                Your use of the Service is also governed by our Privacy Policy. By using the 
                Service, you consent to the collection and use of information as described in 
                our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Disclaimers</h2>
              <p className="mb-3">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS 
                OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Implied warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy of AI-generated feedback</li>
                <li>Uninterrupted or error-free operation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL ENGLISHTUTOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, 
                DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, 
                without prior notice, for conduct that we believe violates these Terms or is 
                harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">12. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of 
                material changes via email or through the Service. Continued use of the Service 
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of 
                [Your Jurisdiction], without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">14. Contact</h2>
              <p>
                Questions about the Terms of Service should be sent to:
              </p>
              <p className="mt-3">
                <strong>Email:</strong> legal@englishtutor.app<br />
                <strong>Address:</strong> [Your Business Address]
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;
