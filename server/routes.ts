import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Get all articles with optional language parameter
  app.get("/api/articles", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const language = req.query.language as string | undefined;
      const articles = await storage.getArticles(limit, language);
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching articles" });
    }
  });

  // Get a single article by ID with optional language parameter
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const language = req.query.language as string | undefined;
      const article = await storage.getArticleById(id, language);
      
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Error fetching article" });
    }
  });

  // Get CV with optional language parameter
  app.get("/api/cv", async (req, res) => {
    try {
      const language = req.query.language as string | undefined;
      const cv = await storage.getCV(language);
      res.json(cv);
    } catch (error) {
      res.status(500).json({ message: "Error fetching CV" });
    }
  });

  // Newsletter subscription
  const newsletterSchema = z.object({
    email: z.string().email("Please provide a valid email address"),
  });

  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const data = newsletterSchema.parse(req.body);
      await storage.subscribeToNewsletter(data.email);
      res.status(200).json({ message: "Successfully subscribed to newsletter" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Error subscribing to newsletter" });
    }
  });

  // Contact form
  const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please provide a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });

  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);
      await storage.saveContactMessage(data);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Error sending message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
