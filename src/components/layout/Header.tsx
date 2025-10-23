import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { signOut } = useAuth();

  return (
    <header className="sticky top-0 left-0 right-0 bg-card border-b border-border z-40">
      <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">E</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">EnglishTutor</h1>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                to="/history"
                className="text-foreground hover:text-primary transition-colors py-2 text-lg"
              >
                History
              </Link>
              <Link
                to="/settings"
                className="text-foreground hover:text-primary transition-colors py-2 text-lg"
              >
                Settings
              </Link>
              <Link
                to="#"
                className="text-foreground hover:text-primary transition-colors py-2 text-lg"
              >
                Help & Support
              </Link>
              <Button
                variant="ghost"
                className="justify-start p-0 h-auto text-foreground hover:text-primary transition-colors py-2 text-lg"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
