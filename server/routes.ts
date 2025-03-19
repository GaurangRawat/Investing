import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { getInvestmentAdvice, analyzeMarketSentiment } from "./ai-service";
import { insertPortfolioSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Portfolio management
  app.get("/api/portfolio", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const portfolio = await storage.getUserPortfolio(req.user.id);
    res.json(portfolio);
  });

  app.post("/api/portfolio", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const validation = insertPortfolioSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json(validation.error);
    }

    const portfolio = await storage.addPortfolioItem(req.user.id, validation.data);
    res.status(201).json(portfolio);
  });

  // Chat and investment advice
  app.post("/api/chat", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const { message, context } = req.body;
    if (!message) return res.status(400).send("Message is required");

    try {
      const advice = await getInvestmentAdvice(message, context);
      const chatHistory = await storage.addChatHistory(
        req.user.id,
        message,
        JSON.stringify(advice)
      );
      res.json({ advice, chatHistory });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/chat/history", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const history = await storage.getChatHistory(req.user.id);
    res.json(history);
  });

  // Market sentiment analysis
  app.post("/api/market/sentiment", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const { text } = req.body;
    if (!text) return res.status(400).send("Text is required");

    try {
      const sentiment = await analyzeMarketSentiment(text);
      res.json(sentiment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Subscription management
  app.post("/api/subscribe", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      await storage.updateSubscriptionStatus(req.user.id, true);
      res.sendStatus(200);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}