import { ReactNode } from "react";
import Header from "./Header";
import BottomNavBar from "./BottomNavBar";
import { PWAInstallPrompt } from "../PWAInstallPrompt";
import FeedbackButton from "../feedback/FeedbackButton";
import OnboardingTutorial from "../onboarding/OnboardingTutorial";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OnboardingTutorial />
      <FeedbackButton />
      <Header />
      <main className="flex-1 pb-16 overflow-auto">
        {children}
      </main>
      <BottomNavBar />
      <PWAInstallPrompt />
    </div>
  );
};

export default Layout;
