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

      // Get CV data in the specified language
      const cvData = await storage.getCV(language);

      // Get articles for context
      const articles = await storage.getArticles(5, language);

      // Smart fallback chatbot with knowledge base
      const generateSmartResponse = (userMessage: string, lang: string) => {
        const msg = userMessage.toLowerCase();
        
        // Education questions
        if (msg.includes('education') || msg.includes('study') || msg.includes('university') || msg.includes('degree') || msg.includes('studium') || msg.includes('ausbildung')) {
          return lang === 'de' ? 
            `Ich studiere Informatik (B.Sc.) an der Technischen Universität Dortmund. Mein Studium umfasst Bereiche wie Softwareentwicklung, Datenstrukturen, Algorithmen, Datenbanken und künstliche Intelligenz. ${cvData.education.map(edu => `Ich habe ${edu.degree} an ${edu.institution} studiert (${edu.startDate} - ${edu.endDate})`).join('. ')}.` :
            `I'm studying Computer Science (B.Sc.) at TU Dortmund University. My studies cover software development, data structures, algorithms, databases, and artificial intelligence. ${cvData.education.map(edu => `I studied ${edu.degree} at ${edu.institution} (${edu.startDate} - ${edu.endDate})`).join('. ')}.`;
        }

        // Programming/Skills questions
        if (msg.includes('programming') || msg.includes('languages') || msg.includes('skills') || msg.includes('technology') || msg.includes('programmier') || msg.includes('fähigkeiten') || msg.includes('technolog')) {
          const skillsList = cvData.skills.map(skill => `${skill.category}: ${skill.items.join(', ')}`).join('; ');
          return lang === 'de' ? 
            `Meine technischen Fähigkeiten umfassen: ${skillsList}. Ich arbeite hauptsächlich mit Java, Python und JavaScript, da diese Sprachen vielseitig und mächtig sind. Ich habe Erfahrung mit Backend-Entwicklung, APIs, Datenbanken und KI-Technologien.` :
            `My technical skills include: ${skillsList}. I primarily work with Java, Python, and JavaScript as they're versatile and powerful languages. I have experience with backend development, APIs, databases, and AI technologies.`;
        }

        // Experience questions
        if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('company') || msg.includes('erfahrung') || msg.includes('arbeit') || msg.includes('unternehmen')) {
          const expList = cvData.experience.map(exp => `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}`).join('. ');
          return lang === 'de' ? 
            `Meine Berufserfahrung: ${expList}. Seit April 2024 sammle ich praktische Erfahrungen als Werkstudent in Vertrieb und Softwareentwicklung.` :
            `My work experience: ${expList}. Since April 2024, I've been gaining hands-on experience as a working student in sales and software development.`;
        }

        // Blog/Articles questions
        if (msg.includes('blog') || msg.includes('article') || msg.includes('write') || msg.includes('content') || msg.includes('artikel') || msg.includes('schreib')) {
          const articleTitles = articles.map(a => a.title).join(', ');
          return lang === 'de' ? 
            `Ich schreibe regelmäßig Artikel über Technologie, Softwareentwicklung und Datenanalyse. Meine aktuellen Artikel umfassen: ${articleTitles}. Ich teile gerne mein Wissen über moderne Webtechnologien, Datenbanken und Best Practices.` :
            `I regularly write articles about technology, software development, and data analysis. My recent articles include: ${articleTitles}. I enjoy sharing knowledge about modern web technologies, databases, and best practices.`;
        }

        // Language questions
        if (msg.includes('language') || msg.includes('speak') || msg.includes('sprache') || msg.includes('sprech')) {
          const langList = cvData.languages ? cvData.languages.map(lang => `${lang.name}: ${lang.proficiency}`).join(', ') : 'German, Arabic, English, French';
          return lang === 'de' ? 
            `Ich spreche mehrere Sprachen: ${langList}. Als gebürtiger Tunesier spreche ich fließend Deutsch, Arabisch, Englisch und Französisch.` :
            `I speak multiple languages: ${langList}. As a native Tunisian, I'm fluent in German, Arabic, English, and French.`;
        }

        // Personal/hobby questions
        if (msg.includes('hobby') || msg.includes('interest') || msg.includes('personal') || msg.includes('free time') || msg.includes('freizeit') || msg.includes('hobby')) {
          return lang === 'de' ? 
            'In meiner Freizeit lese ich gerne Fachbücher über Technologie und Finanzen, spiele Padel, nehme an Tech-Veranstaltungen teil und löse Programmier-Challenges. Ich bin leidenschaftlich daran interessiert, reale Probleme durch Technologie zu lösen.' :
            'In my free time, I enjoy reading books about technology and finance, playing padel, attending tech events, and solving coding challenges. I\'m passionate about solving real-world problems through technology.';
        }

        // Projects questions
        if (msg.includes('project') || msg.includes('portfolio') || msg.includes('build') || msg.includes('create') || msg.includes('projekt')) {
          return lang === 'de' ? 
            'Ich arbeite an verschiedenen Projekten, darunter skalierbare Backend-Services, KI-Chatbots und Echtzeit-Datenpipelines. Meine Projekte nutzen moderne Technologien wie Spring Boot, Docker und OpenAI APIs. Schauen Sie sich gerne meine Projektseite für weitere Details an!' :
            'I work on various projects including scalable backend services, AI chatbots, and real-time data pipelines. My projects utilize modern technologies like Spring Boot, Docker, and OpenAI APIs. Feel free to check out my projects page for more details!';
        }

        // Contact questions
        if (msg.includes('contact') || msg.includes('reach') || msg.includes('email') || msg.includes('phone') || msg.includes('kontakt')) {
          return lang === 'de' ? 
            'Sie können mich unter mohamed.ayadi.data@gmail.com erreichen oder über das Kontaktformular auf meiner Website. Ich bin auch auf LinkedIn aktiv, wo ich regelmäßig Einblicke über Tech und Finanzen teile.' :
            'You can reach me at mohamed.ayadi.data@gmail.com or through the contact form on my website. I\'m also active on LinkedIn where I regularly share insights about tech and finance.';
        }

        // Default response
        return lang === 'de' ? 
          `Hallo! Ich bin Mohamed Abdellatif Ayadi, Informatikstudent an der TU Dortmund mit praktischer Erfahrung als Werkstudent. Ich bin leidenschaftlich für Technologie, KI und Softwareentwicklung. Meine Kernkompetenzen umfassen ${cvData.skills.slice(0,2).map(s => s.items.slice(0,2).join(', ')).join(', ')}. Wie kann ich Ihnen heute helfen? Fragen Sie mich nach meiner Ausbildung, Berufserfahrung, Projekten oder allem anderen!` :
          `Hello! I'm Mohamed Abdellatif Ayadi, a Computer Science student at TU Dortmund with practical experience as a working student. I'm passionate about technology, AI, and software development. My core skills include ${cvData.skills.slice(0,2).map(s => s.items.slice(0,2).join(', ')).join(', ')}. How can I help you today? Ask me about my education, work experience, projects, or anything else!`;
      };

      // Try OpenAI first, but fallback to smart responses
      let aiResponse = '';
      let useOpenAI = false;

      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 20) {
        try {
          const systemPrompt = language === 'de' ? 
            `Du bist Mohamed Abdellatif Ayadi, ein Informatikstudent und Softwareentwickler. Beantworte alle Fragen professionell und hilfreich basierend auf dem gegebenen Kontext. Antworte auf Deutsch.

Kontext:
Name: ${cvData.name}
Titel: ${cvData.title}
Zusammenfassung: ${cvData.summary}
Fähigkeiten: ${cvData.skills.map(skill => `${skill.category}: ${skill.items.join(', ')}`).join('\n')}
Erfahrung: ${cvData.experience.map(exp => `${exp.position} bei ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}`).join('\n')}` :
            `You are Mohamed Abdellatif Ayadi, a Computer Science student and software developer. Answer all questions professionally and helpfully based on the given context. Respond in English.

Context:
Name: ${cvData.name}
Title: ${cvData.title}
Summary: ${cvData.summary}
Skills: ${cvData.skills.map(skill => `${skill.category}: ${skill.items.join(', ')}`).join('\n')}
Experience: ${cvData.experience.map(exp => `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate}): ${exp.description}`).join('\n')}`;

          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
              ],
              max_tokens: 400,
              temperature: 0.7,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            aiResponse = data.choices[0]?.message?.content || '';
            useOpenAI = true;
          } else {
            console.log('OpenAI API failed, using fallback');
          }
        } catch (error) {
          console.log('OpenAI error, using fallback:', error.message);
        }
      }

      // Use fallback if OpenAI failed
      if (!useOpenAI || !aiResponse) {
        aiResponse = generateSmartResponse(message, language);
      }

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