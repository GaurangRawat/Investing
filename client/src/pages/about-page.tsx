import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Brain, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-12 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            About AI Investment Advisor
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We're on a mission to democratize investment advice through the power of artificial intelligence.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">AI Technology</h3>
              <p className="mt-2 text-muted-foreground">
                Our advanced AI algorithms analyze market data and provide personalized investment recommendations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Secure & Reliable</h3>
              <p className="mt-2 text-muted-foreground">
                Your data security is our top priority. We use bank-level encryption to protect your information.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Real-time Insights</h3>
              <p className="mt-2 text-muted-foreground">
                Get instant market analysis and investment recommendations when you need them.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Ready to start investing smarter?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of investors who trust our AI-powered platform for their investment decisions.
          </p>
          <div className="mt-8">
            <Link href="/auth">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
