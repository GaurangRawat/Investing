import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const mockMarketData = [
  { time: "9:30", value: 14200 },
  { time: "10:30", value: 14250 },
  { time: "11:30", value: 14180 },
  { time: "12:30", value: 14300 },
  { time: "13:30", value: 14280 },
  { time: "14:30", value: 14350 },
  { time: "15:30", value: 14400 },
];

export default function MarketOverview() {
  const { data: marketSentiment } = useQuery({
    queryKey: ["/api/market/sentiment"],
    queryFn: async () => {
      const res = await fetch("/api/market/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "Latest market news and trends analysis for major indices",
        }),
      });
      if (!res.ok) throw new Error("Failed to fetch market sentiment");
      return res.json();
    },
  });

  return (
    <div className="space-y-4">
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockMarketData}>
            <XAxis
              dataKey="time"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-muted">
          <p className="text-sm font-medium">Market Sentiment</p>
          <p className="text-2xl font-bold">
            {marketSentiment?.sentiment || "Neutral"}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted">
          <p className="text-sm font-medium">Confidence</p>
          <p className="text-2xl font-bold">
            {marketSentiment?.confidence
              ? `${(marketSentiment.confidence * 100).toFixed(1)}%`
              : "N/A"}
          </p>
        </div>
      </div>

      {marketSentiment?.keyFactors && (
        <div className="space-y-2">
          <p className="font-medium">Key Factors</p>
          <ul className="space-y-1">
            {marketSentiment.keyFactors.map((factor: string, index: number) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {factor}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
