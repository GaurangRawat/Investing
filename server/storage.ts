import { User, InsertUser, Portfolio, ChatHistory } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserPortfolio(userId: number): Promise<Portfolio[]>;
  addPortfolioItem(userId: number, item: Omit<Portfolio, "id" | "userId">): Promise<Portfolio>;
  getChatHistory(userId: number): Promise<ChatHistory[]>;
  addChatHistory(userId: number, message: string, response: string): Promise<ChatHistory>;
  updateSubscriptionStatus(userId: number, isSubscribed: boolean): Promise<void>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolios: Map<number, Portfolio[]>;
  private chats: Map<number, ChatHistory[]>;
  private currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.portfolios = new Map();
    this.chats = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      ...insertUser,
      id,
      isSubscribed: false,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getUserPortfolio(userId: number): Promise<Portfolio[]> {
    return this.portfolios.get(userId) || [];
  }

  async addPortfolioItem(
    userId: number,
    item: Omit<Portfolio, "id" | "userId">,
  ): Promise<Portfolio> {
    const portfolio: Portfolio = {
      id: this.currentId++,
      userId,
      ...item,
    };
    
    const userPortfolio = this.portfolios.get(userId) || [];
    userPortfolio.push(portfolio);
    this.portfolios.set(userId, userPortfolio);
    
    return portfolio;
  }

  async getChatHistory(userId: number): Promise<ChatHistory[]> {
    return this.chats.get(userId) || [];
  }

  async addChatHistory(
    userId: number,
    message: string,
    response: string,
  ): Promise<ChatHistory> {
    const chat: ChatHistory = {
      id: this.currentId++,
      userId,
      message,
      response,
      timestamp: new Date(),
    };
    
    const userChats = this.chats.get(userId) || [];
    userChats.push(chat);
    this.chats.set(userId, userChats);
    
    return chat;
  }

  async updateSubscriptionStatus(userId: number, isSubscribed: boolean): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      this.users.set(userId, { ...user, isSubscribed });
    }
  }
}

export const storage = new MemStorage();
