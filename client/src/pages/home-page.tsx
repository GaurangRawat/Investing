import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import {
  BrainCircuit,
  LineChart,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              AI-Powered Investment Advisory
            </h1>
            <p className="text-xl mb-8">
              Make smarter investment decisions with our advanced AI technology.
              Get personalized recommendations, real-time market insights, and
              intelligent portfolio management.
            </p>
            <div className="space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button size="lg">Get Started</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<BrainCircuit className="h-12 w-12" />}
              title="AI-Powered Analysis"
              description="Get intelligent insights from our advanced AI algorithms"
            />
            <FeatureCard
              icon={<LineChart className="h-12 w-12" />}
              title="Real-time Tracking"
              description="Monitor your investments with live market data"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-12 w-12" />}
              title="Risk Management"
              description="Smart risk assessment and portfolio protection"
            />
            <FeatureCard
              icon={<TrendingUp className="h-12 w-12" />}
              title="Performance Analytics"
              description="Detailed analysis of your investment performance"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg bg-background border">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
