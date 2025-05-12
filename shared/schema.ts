import { pgTable, text, serial, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Article translation schema for multilingual support
export const articleTranslationSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  content: z.string()
});

export type ArticleTranslation = z.infer<typeof articleTranslationSchema>;

// Article schema
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").notNull(),
  category: text("category").notNull(),
  publishedAt: timestamp("published_at").notNull(),
  // Add translations as JSON field, though we'll simulate it for our in-memory storage
  translations: json("translations")
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  excerpt: true,
  content: true,
  coverImage: true,
  category: true,
  publishedAt: true,
  translations: true
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect & {
  translations?: {
    [key: string]: ArticleTranslation;
  };
};

// Experience schema for CV
export const experienceSchema = z.object({
  position: z.string(),
  company: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string(),
});

export type Experience = z.infer<typeof experienceSchema>;

// Education schema for CV
export const educationSchema = z.object({
  degree: z.string(),
  institution: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().optional(),
});

export type Education = z.infer<typeof educationSchema>;

// Certification schema for CV
export const certificationSchema = z.object({
  name: z.string(),
  year: z.string(),
});

export type Certification = z.infer<typeof certificationSchema>;

// Language schema for CV
export const languageSchema = z.object({
  name: z.string(),
  proficiency: z.string(),
});

export type Language = z.infer<typeof languageSchema>;

// CV schema
// Skill category schema for CV
export const skillCategorySchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export type SkillCategory = z.infer<typeof skillCategorySchema>;

export const cvSchema = z.object({
  name: z.string(),
  title: z.string(),
  photoUrl: z.string(),
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
  summary: z.string(),
  skills: z.array(skillCategorySchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  certifications: z.array(certificationSchema).optional(),
  languages: z.array(languageSchema).optional(),
});

export type CV = z.infer<typeof cvSchema>;

// Contact message schema
export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;

// Newsletter subscription
export const newsletterSubscriptionSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;

// User schema from the existing file
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
