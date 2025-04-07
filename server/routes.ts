import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Get all blog posts
  app.get("/api/blogs", async (req: Request, res: Response) => {
    try {
      const blogs = await storage.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });
  
  // Get a single blog post by ID
  app.get("/api/blogs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
      }
      
      const blog = await storage.getBlog(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  
  // Get blog posts by category
  app.get("/api/blogs/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const blogs = await storage.getBlogsByCategory(category);
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs by category:", error);
      res.status(500).json({ message: "Failed to fetch blogs by category" });
    }
  });
  
  // Save contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        const errorMsg = fromZodError(validatedData.error).message;
        return res.status(400).json({ message: errorMsg });
      }
      
      const contact = await storage.saveContactMessage(validatedData.data);
      res.status(201).json({ 
        message: "Thank you for your message. We'll get back to you soon!",
        contact 
      });
    } catch (error) {
      console.error("Error saving contact message:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
