import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define supported languages
export type Language = "en" | "de";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Updated translations with `download` instead of `cv.print`
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.cv": "Resume",
    "nav.publications": "Publications",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.projects": "Projects",
    "nav.chat": "Chat",

    // Hero section
    "home.hero.name": "Mohamed Abdellatif Ayadi",
    "home.hero.subtitle": "Software Engineer & Data Science Enthusiast",
    "hero.welcome":
      "Welcome to my personal website, where I share my expertise, experiences, and insights about computer science, software development, AI and my professional journey",
    "hero.blog": "My Articles",
    "hero.cv": "My Resume",
    "hero.projects": "My Projects",

    // Home page sections
    "home.latestArticles.title": "Latest Articles",
    "home.latestArticles.subtitle":
      "Read my most recent publications and insights",

    // CV page
    "cv.title": "My Curriculum Vitae",
    "cv.subtitle":
      "A comprehensive overview of my academic background, professional experiences, and technical skills",
    download: "Download",
    "cv.cta.title": "Interested in working together?",
    "cv.cta.text":
      "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision",
    "cv.cta.button": "Get In Touch",

    // About page
    "about.title": "About Me",
    "about.subtitle":
      "Get to know me better and what drives my passion for technology",

    // Contact
    "contact.title": "Contact Me",
    "contact.subtitle":
      "Have a question or want to work together? Get in touch with me!",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.subject": "Subject",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.success": "Thank you! Your message has been sent",

    // Blog
    "blog.title": "Blog Articles",
    "blog.subtitle":
      'Thoughts, insights, and experiences from my journey in <span style="color: white; font-weight: bold; background-color: #8B5CF6; padding: 2px 6px; border-radius: 4px; box-shadow: 0 0 5px #A855F7;">technology</span>',
    "blog.readMore": "Read More",
    "blog.search": "Search",
    "blog.categories": "Categories",
    "blog.allCategories": "All Categories",
    "blog.share": "Share this article",
    "blog.publishedOn": "Published on",
    "blog.category.programming": "Programming",
    "blog.category.datascience": "Data Science",
    "blog.category.webdev": "Web Development",
    "blog.category.career": "Career",
    "blog.backToList": "Back to all articles",

    // Newsletter
    "newsletter.title": "Subscribe to my Newsletter",
    "newsletter.text": "Stay updated with my latest articles and projects",
    "newsletter.placeholder": "Your email address",
    "newsletter.button": "Subscribe",
    "newsletter.success": "Thank you for subscribing!",

    // Projects
    "projects.title": "My Projects",
    "projects.metaDescription":
      "Explore the projects developed by Mohamed Abdellatif Ayadi, including web applications, data analysis and more",
    "projects.heading": "My Projects",
    "projects.subheading": "A showcase of my technical work and projects",
    "projects.filters.all": "All",
    "projects.filters.web": "Web",
    "projects.filters.aiData": "AI/Data",
    "projects.filters.other": "Other",
    "projects.noProjectsFound":
      "No projects found in this category. Check back later!",
    "projects.viewOnGitHub": "GitHub Repository",
    "projects.liveDemo": "Live Demo",
    "projects.backToProjects": "Back to Projects",
    "projects.githubRepository": "GitHub Repository",
    "projects.notFound": "Project Not Found",
    "projects.notFoundDescription":
      "The project you're looking for doesn't exist or has been removed",

    // Chat
    "chat.title": "Interactive Assistant",
    "chat.subtitle":
      "Ask me anything about Mohamed's background, skills, projects, or blog articles",
    "chat.assistantName": "Mohamed AI",
    "chat.assistantDescription": "Personal Assistant",
    "chat.badge": "AI Powered",
    "chat.messagePlaceholder": "Type your message here...",
    "chat.suggestedQuestions": "Suggested Questions",
    "chat.you": "You",
    "chat.questions.education": "What education background do you have?",
    "chat.questions.programming": "What programming languages do you know?",
    "chat.questions.experience": "Tell me about your work experience",
    "chat.questions.blog": "What topics do you write about?",
    "chat.questions.languages": "What languages do you speak?",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.blog": "Blog",
    "nav.cv": "Lebenslauf",
    "nav.publications": "Veröffentlichungen",
    "nav.about": "Über Mich",
    "nav.contact": "Kontakt",
    "nav.projects": "Projekte",
    "nav.chat": "Chat",

    // Hero section
    "home.hero.name": "Mohamed Abdellatif Ayadi",
    "home.hero.subtitle": "Softwareingenieur & Data Science Enthusiast",
    "hero.welcome":
      "Willkommen auf meiner persönlichen Website, wo ich meine Fachkenntnisse, Erfahrungen und Einsichten über Informatik, Softwareentwicklung, KI und meine berufliche Laufbahn teile",
    "hero.blog": "Meine Artikel",
    "hero.cv": "Mein Lebenslauf",
    "hero.projects": "Meine Projekte",

    // Home page sections
    "home.latestArticles.title": "Neueste Artikel",
    "home.latestArticles.subtitle":
      "Lesen Sie meine neuesten Veröffentlichungen und Erkenntnisse",

    // CV page
    "cv.title": "Mein Lebenslauf",
    "cv.subtitle":
      "Ein umfassender Überblick über meinen akademischen Werdegang, berufliche Erfahrungen und technische Fähigkeiten",
    download: "Herunterladen",
    "cv.cta.title": "Interesse an einer Zusammenarbeit?",
    "cv.cta.text":
      "Ich bin immer offen für neue Projekte, kreative Ideen oder Möglichkeiten, Teil Ihrer Vision zu sein",
    "cv.cta.button": "Kontaktieren Sie mich",

    // About page
    "about.title": "Über Mich",
    "about.subtitle":
      "Lernen Sie mich besser kennen und was meine Leidenschaft für Technologie antreibt",

    // Contact
    "contact.title": "Kontaktieren Sie mich",
    "contact.subtitle":
      "Haben Sie eine Frage oder möchten Sie zusammenarbeiten? Nehmen Sie Kontakt mit mir auf!",
    "contact.name": "Ihr Name",
    "contact.email": "Ihre E-Mail",
    "contact.subject": "Betreff",
    "contact.message": "Ihre Nachricht",
    "contact.send": "Nachricht senden",
    "contact.success": "Vielen Dank! Ihre Nachricht wurde gesendet",

    // Blog
    "blog.title": "Blog-Artikel",
    "blog.subtitle":
      'Gedanken, Erkenntnisse und Erfahrungen aus meiner Reise in der <span style="color: white; font-weight: bold; background-color: #8B5CF6; padding: 2px 6px; border-radius: 4px; box-shadow: 0 0 5px #A855F7;">Technologie</span>',
    "blog.readMore": "Weiterlesen",
    "blog.search": "Suchen",
    "blog.categories": "Kategorien",
    "blog.allCategories": "Alle Kategorien",
    "blog.share": "Diesen Artikel teilen",
    "blog.publishedOn": "Veröffentlicht am",
    "blog.category.programming": "Programmierung",
    "blog.category.datascience": "Data Science",
    "blog.category.webdev": "Webentwicklung",
    "blog.category.career": "Karriere",
    "blog.backToList": "Zurück zu allen Artikeln",

    // Newsletter
    "newsletter.title": "Abonnieren Sie meinen Newsletter",
    "newsletter.text":
      "Bleiben Sie über meine neuesten Artikel und Projekte auf dem Laufenden",
    "newsletter.placeholder": "Ihre E-Mail-Adresse",
    "newsletter.button": "Abonnieren",
    "newsletter.success": "Vielen Dank für Ihr Abonnement!",

    // Projects
    "projects.title": "Meine Projekte",
    "projects.metaDescription":
      "Entdecken Sie die von Mohamed Abdellatif Ayadi entwickelten Projekte, darunter Webanwendungen, Datenanalyse und mehr",
    "projects.heading": "Meine Projekte",
    "projects.subheading":
      "Eine Präsentation meiner technischen Arbeiten und Projekte",
    "projects.filters.all": "Alle",
    "projects.filters.web": "Web",
    "projects.filters.aiData": "KI/Daten",
    "projects.filters.other": "Andere",
    "projects.noProjectsFound":
      "Keine Projekte in dieser Kategorie gefunden. Schauen Sie später wieder vorbei!",
    "projects.viewOnGitHub": "GitHub Repository",
    "projects.liveDemo": "Live Demo",
    "projects.backToProjects": "Zurück zu Projekten",
    "projects.githubRepository": "GitHub Repository",
    "projects.notFound": "Projekt nicht gefunden",
    "projects.notFoundDescription":
      "Das gesuchte Projekt existiert nicht oder wurde entfernt",

    // Chat
    "chat.title": "Interaktiver Assistent",
    "chat.subtitle":
      "Fragen Sie mich alles über Mohameds Hintergrund, Fähigkeiten, Projekte oder Blogartikel",
    "chat.assistantName": "Mohamed KI",
    "chat.assistantDescription": "Persönlicher Assistent",
    "chat.badge": "KI-gestützt",
    "chat.messagePlaceholder": "Schreiben Sie Ihre Nachricht hier...",
    "chat.suggestedQuestions": "Vorgeschlagene Fragen",
    "chat.you": "Sie",
    "chat.questions.education": "Welchen Bildungshintergrund haben Sie?",
    "chat.questions.programming": "Welche Programmiersprachen beherrschen Sie?",
    "chat.questions.experience": "Erzählen Sie mir von Ihrer Arbeitserfahrung",
    "chat.questions.blog": "Über welche Themen schreiben Sie?",
    "chat.questions.languages": "Welche Sprachen sprechen Sie?",
  },
};
// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Create a state for the language, default to 'en'
  const [language, setLanguageState] = useState<Language>("en");

  // Try to get the language from localStorage on component mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "de")) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    try {
      localStorage.setItem("language", language);
      // Force re-render by triggering a window event
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [language]);

  // Function to set the language
  const setLanguage = (newLanguage: Language) => {
    console.log("Changing language to:", newLanguage);
    setLanguageState(newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      return key;
    }
    return translations[language][key];
  };

  const contextValue = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};