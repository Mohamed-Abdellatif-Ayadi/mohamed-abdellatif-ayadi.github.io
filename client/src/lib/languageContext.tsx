import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define supported languages
export type Language = 'en' | 'de' | 'fr';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.cv': 'CV',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.projects': 'Projects',

    // Hero section
    'hero.welcome': 'Welcome to my personal website, where I share my expertise, experiences, and insights about computer science, software development, and my professional journey.',
    'hero.blog': 'My Articles',
    'hero.cv': 'My Resume',
    'hero.projects': 'My Projects',

    // CV page
    'cv.title': 'My Curriculum Vitae',
    'cv.subtitle': 'A comprehensive overview of my academic background, professional experiences, and technical skills.',
    'cv.print': 'Print CV',
    'cv.cta.title': 'Interested in working together?',
    'cv.cta.text': "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
    'cv.cta.button': 'Get In Touch',

    // About page
    'about.title': 'About Me',
    'about.subtitle': 'Get to know me better and what drives my passion for technology.',

    // Contact
    'contact.title': 'Contact Me',
    'contact.subtitle': 'Have a question or want to work together? Get in touch with me!',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.success': 'Thank you! Your message has been sent.',

    // Blog
    'blog.title': 'Blog Articles',
    'blog.subtitle': 'Thoughts, insights, and experiences from my journey in technology.',
    'blog.readmore': 'Read More',
    'blog.search': 'Search articles...',

    // Newsletter
    'newsletter.title': 'Subscribe to my Newsletter',
    'newsletter.text': 'Stay updated with my latest articles and projects.',
    'newsletter.placeholder': 'Your email address',
    'newsletter.button': 'Subscribe',
    'newsletter.success': 'Thank you for subscribing!',
    
    // Projects
    'projects.title': 'My Projects',
    'projects.metaDescription': 'Explore the projects developed by Mohamed Abdellatif Ayadi, including web applications, data analysis and more.',
    'projects.heading': 'My Projects',
    'projects.subheading': 'A showcase of my technical work and projects',
    'projects.filters.all': 'All',
    'projects.filters.web': 'Web',
    'projects.filters.aiData': 'AI/Data',
    'projects.filters.other': 'Other',
    'projects.noProjectsFound': 'No projects found in this category. Check back later!',
    'projects.viewOnGitHub': 'GitHub Repository',
    'projects.liveDemo': 'Live Demo',
    'projects.backToProjects': 'Back to Projects',
    'projects.githubRepository': 'GitHub Repository',
    'projects.notFound': 'Project Not Found',
    'projects.notFoundDescription': 'The project you\'re looking for doesn\'t exist or has been removed.',
  },
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.blog': 'Blog',
    'nav.cv': 'Lebenslauf',
    'nav.about': 'Über Mich',
    'nav.contact': 'Kontakt',
    'nav.projects': 'Projekte',

    // Hero section
    'hero.welcome': 'Willkommen auf meiner persönlichen Website, wo ich meine Fachkenntnisse, Erfahrungen und Einsichten über Informatik, Softwareentwicklung und meine berufliche Laufbahn teile.',
    'hero.blog': 'Meine Artikel',
    'hero.cv': 'Mein Lebenslauf',
    'hero.projects': 'Meine Projekte',

    // CV page
    'cv.title': 'Mein Lebenslauf',
    'cv.subtitle': 'Ein umfassender Überblick über meinen akademischen Werdegang, berufliche Erfahrungen und technische Fähigkeiten.',
    'cv.print': 'Lebenslauf Drucken',
    'cv.cta.title': 'Interesse an einer Zusammenarbeit?',
    'cv.cta.text': 'Ich bin immer offen für neue Projekte, kreative Ideen oder Möglichkeiten, Teil Ihrer Vision zu sein.',
    'cv.cta.button': 'Kontaktieren Sie mich',

    // About page
    'about.title': 'Über Mich',
    'about.subtitle': 'Lernen Sie mich besser kennen und was meine Leidenschaft für Technologie antreibt.',

    // Contact
    'contact.title': 'Kontaktieren Sie mich',
    'contact.subtitle': 'Haben Sie eine Frage oder möchten Sie zusammenarbeiten? Nehmen Sie Kontakt mit mir auf!',
    'contact.name': 'Ihr Name',
    'contact.email': 'Ihre E-Mail',
    'contact.message': 'Ihre Nachricht',
    'contact.send': 'Nachricht senden',
    'contact.success': 'Vielen Dank! Ihre Nachricht wurde gesendet.',

    // Blog
    'blog.title': 'Blog-Artikel',
    'blog.subtitle': 'Gedanken, Erkenntnisse und Erfahrungen aus meiner Reise in der Technologie.',
    'blog.readmore': 'Weiterlesen',
    'blog.search': 'Artikel durchsuchen...',

    // Newsletter
    'newsletter.title': 'Abonnieren Sie meinen Newsletter',
    'newsletter.text': 'Bleiben Sie über meine neuesten Artikel und Projekte auf dem Laufenden.',
    'newsletter.placeholder': 'Ihre E-Mail-Adresse',
    'newsletter.button': 'Abonnieren',
    'newsletter.success': 'Vielen Dank für Ihr Abonnement!',
    
    // Projects
    'projects.title': 'Meine Projekte',
    'projects.metaDescription': 'Entdecken Sie die von Mohamed Abdellatif Ayadi entwickelten Projekte, darunter Webanwendungen, Datenanalyse und mehr.',
    'projects.heading': 'Meine Projekte',
    'projects.subheading': 'Eine Präsentation meiner technischen Arbeiten und Projekte',
    'projects.filters.all': 'Alle',
    'projects.filters.web': 'Web',
    'projects.filters.aiData': 'KI/Daten',
    'projects.filters.other': 'Andere',
    'projects.noProjectsFound': 'Keine Projekte in dieser Kategorie gefunden. Schauen Sie später wieder vorbei!',
    'projects.viewOnGitHub': 'GitHub Repository',
    'projects.liveDemo': 'Live Demo',
    'projects.backToProjects': 'Zurück zu Projekten',
    'projects.githubRepository': 'GitHub Repository',
    'projects.notFound': 'Projekt nicht gefunden',
    'projects.notFoundDescription': 'Das gesuchte Projekt existiert nicht oder wurde entfernt.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.blog': 'Blog',
    'nav.cv': 'CV',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.projects': 'Projets',

    // Hero section
    'hero.welcome': 'Bienvenue sur mon site personnel, où je partage mon expertise, mes expériences et mes réflexions sur l\'informatique, le développement logiciel et mon parcours professionnel.',
    'hero.blog': 'Mes Articles',
    'hero.cv': 'Mon CV',
    'hero.projects': 'Mes Projets',

    // CV page
    'cv.title': 'Mon Curriculum Vitae',
    'cv.subtitle': 'Un aperçu complet de mon parcours académique, mes expériences professionnelles et mes compétences techniques.',
    'cv.print': 'Imprimer le CV',
    'cv.cta.title': 'Intéressé par une collaboration?',
    'cv.cta.text': 'Je suis toujours ouvert à discuter de nouveaux projets, d\'idées créatives ou d\'opportunités pour faire partie de votre vision.',
    'cv.cta.button': 'Me Contacter',

    // About page
    'about.title': 'À Propos de Moi',
    'about.subtitle': 'Apprenez à me connaître et ce qui alimente ma passion pour la technologie.',

    // Contact
    'contact.title': 'Contactez-moi',
    'contact.subtitle': 'Vous avez une question ou souhaitez collaborer? Contactez-moi!',
    'contact.name': 'Votre Nom',
    'contact.email': 'Votre Email',
    'contact.message': 'Votre Message',
    'contact.send': 'Envoyer le Message',
    'contact.success': 'Merci! Votre message a été envoyé.',

    // Blog
    'blog.title': 'Articles de Blog',
    'blog.subtitle': 'Réflexions, idées et expériences de mon parcours dans la technologie.',
    'blog.readmore': 'Lire Plus',
    'blog.search': 'Rechercher des articles...',

    // Newsletter
    'newsletter.title': 'Abonnez-vous à ma Newsletter',
    'newsletter.text': 'Restez informé de mes derniers articles et projets.',
    'newsletter.placeholder': 'Votre adresse email',
    'newsletter.button': 'S\'abonner',
    'newsletter.success': 'Merci pour votre abonnement!',
    
    // Projects
    'projects.title': 'Mes Projets',
    'projects.metaDescription': 'Découvrez les projets développés par Mohamed Abdellatif Ayadi, notamment des applications web, des analyses de données et plus encore.',
    'projects.heading': 'Mes Projets',
    'projects.subheading': 'Une présentation de mon travail technique et de mes projets',
    'projects.filters.all': 'Tous',
    'projects.filters.web': 'Web',
    'projects.filters.aiData': 'IA/Données',
    'projects.filters.other': 'Autres',
    'projects.noProjectsFound': 'Aucun projet trouvé dans cette catégorie. Revenez plus tard!',
    'projects.viewOnGitHub': 'Dépôt GitHub',
    'projects.liveDemo': 'Démo en Direct',
    'projects.backToProjects': 'Retour aux Projets',
    'projects.githubRepository': 'Dépôt GitHub',
    'projects.notFound': 'Projet Non Trouvé',
    'projects.notFoundDescription': 'Le projet que vous recherchez n\'existe pas ou a été supprimé.',
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Create a state for the language, default to 'en'
  const [language, setLanguageState] = useState<Language>('en');
  
  // Try to get the language from localStorage on component mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'de' || savedLanguage === 'fr')) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    try {
      localStorage.setItem('language', language);
      // Force re-render by triggering a window event
      window.dispatchEvent(new Event('storage'));
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
    t
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
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};