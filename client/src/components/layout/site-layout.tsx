import { MainNav } from "./main-nav";
import { Link } from "wouter";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 AI Investment Advisor. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link href="/privacy">
              <a className="hover:text-primary">Privacy</a>
            </Link>
            <Link href="/terms">
              <a className="hover:text-primary">Terms</a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}