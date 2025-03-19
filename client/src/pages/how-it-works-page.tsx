import { SiteLayout } from "@/components/layout/site-layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  UserPlus,
  MessageSquare,
  LineChart,
  Wallet,
  ArrowRight,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8" />,
      title: "Create Your Account",
      description:
        "Sign up in minutes and tell us about your investment goals and risk tolerance.",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Chat with AI Advisor",
      description:
        "Get personalized investment advice through our intelligent chatbot interface.",
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Analyze Markets",
      description:
        "Access real-time market data and AI-powered analysis of investment opportunities.",
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Track Your Portfolio",
      description:
        "Monitor your investments and get alerts about important market changes.",
    },
  ];

  return (
    <SiteLayout>
      <div className="container px-4 py-12 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            How It Works
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our AI-powered platform makes investment advice accessible and easy to understand.
            Here's how you can get started:
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-6 top-12 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-3xl rounded-lg bg-primary p-8 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">Ready to Begin?</h2>
          <p className="mt-4 text-lg">
            Start your investment journey with AI-powered guidance today.
          </p>
          <div className="mt-8">
            <Link href="/auth">
              <Button size="lg" variant="secondary">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
