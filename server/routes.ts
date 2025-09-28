import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { emailService } from "./emailService";
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

      // Save to storage
      await storage.saveContactMessage(data);

      // Send notification email to you
      const notificationSent = await emailService.sendContactNotification(data);

      // Send confirmation email to the sender
      const confirmationSent = await emailService.sendConfirmationEmail(data);

      if (notificationSent || confirmationSent) {
        console.log(`Contact form submission processed. Notification: ${notificationSent}, Confirmation: ${confirmationSent}`);
      }

      res.status(200).json({ 
        message: "Message sent successfully",
        emailSent: notificationSent 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error('Contact form error:', error);
      res.status(500).json({ message: "Error sending message" });
    }
  });

  // Simple in-memory rate limiting
  const userRequestCounts = new Map();
  const RATE_LIMIT_WINDOW = 60000; // 1 minute
  const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute

  // Chat API
  app.post("/api/chat", async (req, res) => {
    const { message, language = 'en' } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';

    try {
      // Rate limiting
      const now = Date.now();
      const userKey = `${clientIP}_${language}`;
      
      if (!userRequestCounts.has(userKey)) {
        userRequestCounts.set(userKey, { count: 0, resetTime: now + RATE_LIMIT_WINDOW });
      }
      
      const userLimits = userRequestCounts.get(userKey);
      
      if (now > userLimits.resetTime) {
        userLimits.count = 0;
        userLimits.resetTime = now + RATE_LIMIT_WINDOW;
      }
      
      if (userLimits.count >= RATE_LIMIT_MAX_REQUESTS) {
        const waitTime = Math.ceil((userLimits.resetTime - now) / 1000);
        return res.status(429).json({ 
          error: language === 'de' ? 
            `Zu viele Anfragen. Bitte warten Sie ${waitTime} Sekunden.` : 
            `Too many requests. Please wait ${waitTime} seconds.`,
          waitTime: waitTime
        });
      }
      
      userLimits.count++;

      if (!message || message.trim().length === 0) {
        return res.status(400).json({ 
          error: language === 'de' ? "Nachricht ist erforderlich" : "Message is required" 
        });
      }

      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY) {
        const fallbackResponse = language === 'de' ? 
          "Entschuldigung, der Chat-Service ist derzeit nicht verfügbar. Bitte nutzen Sie das Kontaktformular oder fragen Sie mich über LinkedIn." :
          "Sorry, the chat service is currently unavailable. Please use the contact form or reach out to me on LinkedIn.";
        return res.json({ response: fallbackResponse });
      }

      // Get CV data in the specified language
      const cvData = await storage.getCV(language);

      // Get articles for context
      const articles = await storage.getArticles(5, language);

      // Create context from CV and articles
      const context = `
        CV Information:
        Name: ${cvData.name}
        Title: ${cvData.title}
        Summary: ${cvData.summary}
        Skills: ${cvData.skills.map(skill => `${skill.category}: ${skill.items.join(', ')}`).join('\n')}
        Experience: ${cvData.experience.map(exp => `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}`).join('\n')}
        Education: ${cvData.education.map(edu => `${edu.degree} from ${edu.institution} (${edu.startDate} - ${edu.endDate})`).join('\n')}
        Languages: ${cvData.languages ? cvData.languages.map(lang => `${lang.name}: ${lang.proficiency}`).join(', ') : 'Not specified'}

        Recent Articles:
        ${articles.map(article => `Title: ${article.title}\nExcerpt: ${article.excerpt}`).join('\n\n')}
      `;

      const systemPrompt = language === 'de' ? 
        `Du bist ein KI-Assistent, der Mohamed Abdellatif Ayadi repräsentiert, einen Informatikstudenten und Softwareentwickler. Beantworte ALLE Fragen professionell und hilfreich, auch wenn die Information nicht in seinem Lebenslauf steht.

WICHTIG: Du MUSST auf JEDE Frage antworten. Sage niemals "Ich habe keine Informationen" oder ähnliches.

Für persönliche Fragen verwende diese realistischen Antworten:
- Hobbys: Lesen von Fachbüchern über Technologie und Finanzen, Padel spielen, Teilnahme an Tech-Veranstaltungen, Programmier-Challenges
- Persönlichkeit: Leidenschaftlich für Technologie, teamorientiert, lernbegierig, analytisch, problemlösungsorientiert
- Arbeitsweise: Strukturiert, kollaborativ, fokussiert auf qualitativ hochwertige Lösungen
- Motivation: Begeistert von der Lösung realer Probleme durch Technologie, insbesondere KI und maschinelles Lernen
- Lieblingssprachen: Java, Python, JavaScript - weil sie vielseitig und mächtig sind
- Zukunftspläne: Spezialisierung auf KI/ML, Beitrag zu innovativen Projekten, kontinuierliche Weiterbildung

Antworte immer auf Deutsch, sei gesprächig und hilfsbereit. Erfinde keine falschen Fakten über Arbeitsstellen oder Qualifikationen, aber sei kreativ bei persönlichen Aspekten.

Kontext: ${context}` :
        `You are an AI assistant representing Mohamed Abdellatif Ayadi, a Computer Science student and software developer. Answer ALL questions professionally and helpfully, even if the information is not explicitly in his CV or resume.

IMPORTANT: You MUST respond to EVERY question. Never say "I don't have information" or similar deflections.

For personal questions, use these realistic responses:
- Hobbies: Reading books about technology and finance, playing padel, attending tech events, coding challenges
- Personality: Passionate about technology, team-oriented, eager to learn, analytical, problem-solving focused
- Work style: Structured, collaborative, focused on delivering high-quality solutions
- Motivation: Excited about solving real-world problems through technology, especially AI and machine learning
- Favorite languages: Java, Python, JavaScript - because they're versatile and powerful
- Future plans: Specializing in AI/ML, contributing to innovative projects, continuous learning

Always respond in English, be conversational and helpful. Don't invent false facts about work positions or qualifications, but be creative with personal aspects.

Context: ${context}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: message
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
        } else if (response.status === 401) {
          throw new Error('Invalid API key');
        } else {
          throw new Error(`OpenAI API error: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
        }
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || (language === 'de' ? "Entschuldigung, ich konnte gerade keine Antwort generieren." : "I apologize, but I couldn't generate a response at the moment.");

      res.json({ response: aiResponse });
    } catch (error) {
      console.error('Chat API error:', error);
      const { language: reqLanguage = 'en' } = req.body;

      let errorMessage;
      if (error.message.includes('Rate limit')) {
        errorMessage = reqLanguage === 'de' ? 
          "Zu viele Anfragen an OpenAI. Bitte warten Sie einen Moment und versuchen Sie es erneut." : 
          "Too many requests to OpenAI. Please wait a moment and try again.";
      } else if (error.message.includes('Invalid API key')) {
        errorMessage = reqLanguage === 'de' ? 
          "API-Konfigurationsfehler. Bitte kontaktieren Sie den Administrator." : 
          "API configuration error. Please contact the administrator.";
      } else {
        errorMessage = reqLanguage === 'de' ? 
          "Entschuldigung, ich habe gerade Probleme zu antworten. Bitte versuchen Sie es später erneut." : 
          "Sorry, I'm having trouble responding right now. Please try again later.";
      }

      res.status(500).json({ error: errorMessage });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}