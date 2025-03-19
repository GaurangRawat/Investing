import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Home,
  Info,
  HelpCircle,
  CreditCard,
  Phone,
  BookOpen,
  LogIn,
} from "lucide-react";

export function MainNav() {
  const [location] = useLocation();
  const { user } = useAuth();

  const navigation = [
    { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "/about", label: "About Us", icon: <Info className="w-4 h-4" /> },
    { href: "/how-it-works", label: "How It Works", icon: <HelpCircle className="w-4 h-4" /> },
    { href: "/pricing", label: "Pricing", icon: <CreditCard className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <Phone className="w-4 h-4" /> },
    { href: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/">
            <a className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl">AI Advisor</span>
            </a>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                <a
                  className={cn(
                    "flex items-center gap-2 transition-colors hover:text-primary",
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user ? (
            <Link href="/dashboard">
              <Button variant="default" size="sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button variant="default" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
