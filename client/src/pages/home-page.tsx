import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { SiteLayout } from "@/components/layout/site-layout";
import {
  BrainCircuit,
  LineChart,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 pointer-events-none" />
        <div className="container px-4 py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 tracking-tight lg:text-6xl">
              AI-Powered Investment Advisory
            </h1>
            <p className="text-xl mb-8 text-muted-foreground leading-relaxed">
              Make smarter investment decisions with our advanced AI technology.
              Get personalized recommendations, real-time market insights, and
              intelligent portfolio management.
            </p>
            <div className="space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="shadow-lg">Go to Dashboard</Button>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button size="lg" className="shadow-lg">Get Started</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <FeatureCard
              icon={<UserCheck className="h-12 w-12" />}
              title="Expert Guidance"
              description="Personalized investment advice tailored to your goals"
            />
            <FeatureCard
              icon={<Zap className="h-12 w-12" />}
              title="Fast Execution"
              description="Quick and efficient investment execution"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Investing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust our AI-powered platform for their investment decisions.
          </p>
          {!user && (
            <Link href="/auth">
              <Button
                size="lg"
                variant="secondary"
                className="shadow-lg hover:shadow-xl transition-all"
              >
                Create Your Account
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Investors</h2>
            <p className="text-muted-foreground">
              Join our growing community of successful investors
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard number="10k+" label="Active Users" />
            <StatCard number="$50M+" label="Assets Managed" />
            <StatCard number="95%" label="User Satisfaction" />
          </div>
        </div>
      </section>
    </SiteLayout>
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
    <div className="p-6 rounded-lg bg-background border hover:border-primary/50 transition-colors">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-6 rounded-lg bg-background border text-center">
      <div className="text-4xl font-bold text-primary mb-2">{number}</div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}