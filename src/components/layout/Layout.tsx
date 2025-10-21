import { ReactNode } from "react";
import Header from "./Header";
import BottomNavBar from "./BottomNavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-16 overflow-auto">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
};

export default Layout;
