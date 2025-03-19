// Simple rule-based AI service for investment advice
type InvestmentContext = {
  riskTolerance?: string;
  investmentGoals?: string;
  timeHorizon?: string;
};

type InvestmentAdvice = {
  advice: string;
  confidence: number;
  suggestedActions: string[];
};

type MarketSentiment = {
  sentiment: "bullish" | "bearish" | "neutral";
  confidence: number;
  keyFactors: string[];
};

const RISK_PATTERNS = {
  high: ["aggressive", "growth", "risk", "high return", "volatile"],
  moderate: ["balanced", "moderate", "mix", "diversify"],
  low: ["conservative", "safe", "stable", "low risk", "secure"],
};

const INVESTMENT_TEMPLATES = {
  high: {
    advice: "Consider high-growth technology and emerging market investments.",
    actions: [
      "Research growth stocks in tech sector",
      "Consider emerging market ETFs",
      "Allocate portion to high-yield bonds",
    ],
  },
  moderate: {
    advice: "Maintain a balanced portfolio with mix of growth and value stocks.",
    actions: [
      "Diversify across sectors",
      "Include both stocks and bonds",
      "Consider index funds",
    ],
  },
  low: {
    advice: "Focus on stable, dividend-paying stocks and government bonds.",
    actions: [
      "Invest in blue-chip stocks",
      "Consider government bonds",
      "Look into high-dividend stocks",
    ],
  },
};

function analyzeRiskLevel(message: string, context?: InvestmentContext): "high" | "moderate" | "low" {
  const text = message.toLowerCase();
  
  if (context?.riskTolerance) {
    const riskTolerance = context.riskTolerance.toLowerCase();
    if (riskTolerance.includes("high")) return "high";
    if (riskTolerance.includes("low")) return "low";
    return "moderate";
  }

  let scores = {
    high: 0,
    moderate: 0,
    low: 0,
  };

  Object.entries(RISK_PATTERNS).forEach(([level, patterns]) => {
    patterns.forEach(pattern => {
      if (text.includes(pattern.toLowerCase())) {
        scores[level as keyof typeof scores]++;
      }
    });
  });

  const maxScore = Math.max(...Object.values(scores));
  if (scores.high === maxScore) return "high";
  if (scores.low === maxScore) return "low";
  return "moderate";
}

export async function getInvestmentAdvice(
  query: string,
  context?: InvestmentContext
): Promise<InvestmentAdvice> {
  const riskLevel = analyzeRiskLevel(query, context);
  const template = INVESTMENT_TEMPLATES[riskLevel];

  return {
    advice: template.advice,
    confidence: 0.7, // Fixed confidence for demo
    suggestedActions: template.actions,
  };
}

const BULLISH_PATTERNS = [
  "growth", "increase", "rise", "gain", "positive",
  "strong", "upward", "recovery", "boost", "improve"
];

const BEARISH_PATTERNS = [
  "decline", "decrease", "fall", "loss", "negative",
  "weak", "downward", "recession", "crisis", "worry"
];

export async function analyzeMarketSentiment(text: string): Promise<MarketSentiment> {
  const lowerText = text.toLowerCase();
  
  let bullishCount = 0;
  let bearishCount = 0;

  BULLISH_PATTERNS.forEach(pattern => {
    if (lowerText.includes(pattern)) bullishCount++;
  });

  BEARISH_PATTERNS.forEach(pattern => {
    if (lowerText.includes(pattern)) bearishCount++;
  });

  const keyFactors: string[] = [];
  const segments = text.split(/[.,!?]/);
  segments.forEach(segment => {
    if (segment.length > 20 && segment.length < 100) {
      keyFactors.push(segment.trim());
    }
  });

  let sentiment: "bullish" | "bearish" | "neutral";
  if (bullishCount > bearishCount) sentiment = "bullish";
  else if (bearishCount > bullishCount) sentiment = "bearish";
  else sentiment = "neutral";

  const confidence = Math.min(
    0.9,
    Math.abs(bullishCount - bearishCount) * 0.1 + 0.5
  );

  return {
    sentiment,
    confidence,
    keyFactors: keyFactors.slice(0, 3),
  };
}
