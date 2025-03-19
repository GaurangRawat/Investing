import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/dashboard-layout";
import MarketOverview from "@/components/dashboard/market-overview";
import PortfolioSummary from "@/components/dashboard/portfolio-summary";
import ChatInterface from "@/components/chat/chat-interface";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.fullName}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your investments and market insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <PortfolioSummary />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <MarketOverview />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat">AI Advisor Chat</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="space-y-4">
            <ChatInterface />
          </TabsContent>
          <TabsContent value="insights">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Latest Market Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm font-medium">Tech Sector Analysis</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Recent earnings reports show strong growth in cloud computing and AI sectors.
                      Consider increasing exposure to technology leaders.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm font-medium">Market Trends</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Global markets showing resilience despite inflation concerns.
                      Diversification across sectors recommended.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
