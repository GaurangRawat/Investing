import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Loader2 } from "lucide-react";

interface PortfolioItem {
  stockSymbol: string;
  quantity: number;
  purchasePrice: number;
}

export default function PortfolioSummary() {
  const { data: portfolio, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!portfolio?.length) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">No portfolio items yet.</p>
      </div>
    );
  }

  const portfolioData = portfolio.map((item) => ({
    name: item.stockSymbol,
    value: item.quantity * item.purchasePrice,
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {portfolioData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-muted">
          <p className="text-sm font-medium">Total Portfolio Value</p>
          <p className="text-2xl font-bold">
            ${totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="space-y-2">
          {portfolio.map((item) => (
            <div
              key={item.stockSymbol}
              className="flex justify-between items-center p-2 rounded hover:bg-muted"
            >
              <div>
                <p className="font-medium">{item.stockSymbol}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} shares
                </p>
              </div>
              <p className="font-medium">
                ${(item.quantity * item.purchasePrice).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
