import { 
  users, 
  type User, 
  type InsertUser, 
  type Article, 
  type CV, 
  type ContactMessage,
  type NewsletterSubscription,
  type SkillCategory
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getArticles(limit?: number): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  
  // CV methods
  getCV(language?: string): Promise<CV>;
  
  // Contact form
  saveContactMessage(message: ContactMessage): Promise<void>;
  
  // Newsletter
  subscribeToNewsletter(email: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private articles: Map<number, Article>;
  private cv: CV;
  private cvs: { [key: string]: CV };
  private contactMessages: ContactMessage[];
  private newsletterSubscriptions: Set<string>;
  currentId: number;
  currentArticleId: number;

  constructor() {
    this.users = new Map();
    this.articles = new Map();
    this.contactMessages = [];
    this.newsletterSubscriptions = new Set();
    this.currentId = 1;
    this.currentArticleId = 1;

    // Initialize common CV base data
    const cvBase = {
      name: "MOHAMED ABDELLATIF AYADI",
      photoUrl: "/images/avatar.png",
      email: "mohamed.ayadi.data@gmail.com",
      phone: "0152 5230 1739",
      location: "Dortmund, Germany",
      certifications: [],
    };
    
    // English CV
    this.cv = {
      name: "MOHAMED ABDELLATIF AYADI",
      photoUrl: "/images/avatar.png",
      title: "Computer Science Student (B.Sc.) at the Technical University of Dortmund",
      summary:
        "I am Mohamed Abdellatif Ayadi, a Computer Science student at the Technical University of Dortmund with practical experience as a working student in sales and software development. Selling with passion, studying with ambition, social commitment with heart - this motto accompanies me both academically and professionally. With great enthusiasm for software development, artificial intelligence, and technological innovations, I am currently looking for a working student position to deepen my knowledge in a practical way and specifically develop in the areas of development or IT consulting.",
      contact: {
        email: "mohamed.ayadi.data@gmail.com",
        phone: "0152 5230 1739",
        location: "Dortmund, Germany",
        website: "github.com/Mayedi007",
        social: [
          { name: "LinkedIn", url: "linkedin.com/in/mohamed-abdellatif-ayadi" },
          { name: "GitHub", url: "github.com/Mayedi007" }
        ]
      },
      experience: [
        {
          company: "Iperceramica Deutschland GmbH",
          position: "Working Student",
          startDate: "2024-04",
          endDate: "Present",
          description:
            "• Using SAP and SAP S/4HANA to optimize inventory, orders, delivery processes, and complaint handling.\n• Sales: Active customer acquisition in B2B and B2C sectors through targeted acquisition and establishing long-term customer relationships. Sales and consulting on high-quality tiles, parquet flooring, sanitary ware, and bathroom furniture.\n• Maintenance of customer data and partner relationships in CRM and PRM systems to improve communication and collaboration."
        },
        {
          company: "Technical University of Dortmund",
          position: "Student Assistant",
          startDate: "2023-10",
          endDate: "2024-04",
          description:
            "• Serving as a student tutor for the 'Data Structures, Algorithms and Programming 1' course as a mini-job.\n• Organization and implementation of tutorials for first-year students with a focus on object-oriented programming in Java.\n• Tasks included practical programming exercises, deepening and broadening course content, supervision of homework, as well as targeted exam preparation and strategic planning."
        }
      ],
      education: [
        {
          institution: "Technical University of Dortmund",
          degree: "B.Sc. Computer Science",
          startDate: "2022-09",
          endDate: "Present",
          location: "Dortmund, Germany",
          description: "Expected graduation in 2027"
        },
        {
          institution: "Goethe Institute Düsseldorf",
          degree: "German Language Certificate",
          startDate: "2022-09",
          endDate: "2022-09",
          location: "Düsseldorf, Germany",
          description: "Intensive German language course with C1 level certification"
        },
        {
          institution: "Pioneer High School of Sfax (Lycée Pilote de Sfax)",
          degree: "High School Diploma in Mathematics",
          startDate: "2018-09",
          endDate: "2021-07",
          location: "Sfax, Tunisia",
          description: "Mathematics specialization"
        }
      ],
      skills: [
        {
          category: "Generative AI and Artificial Intelligence",
          items: [
            "OpenAI API Application Development",
            "Chatbot Development",
            "Data Augmentation",
            "Deep Learning",
            "Forecasting",
            "Machine Learning"
          ]
        },
        {
          category: "Software Development and Backend Technologies",
          items: [
            "Object-Oriented Programming (OOP)",
            "Java",
            "Python",
            "C Programming",
            "Spring Boot",
            "Docker",
            "API Development",
            "Database Design (MySQL)"
          ]
        },
        {
          category: "Data Engineering and Analysis",
          items: [
            "Real-time Data Pipelines",
            "Data Warehousing",
            "Time Series Analysis",
            "ETL Processes",
            "Basic Big Data Knowledge"
          ]
        },
        {
          category: "Tools and Platforms",
          items: [
            "GitLab",
            "Eclipse",
            "Microsoft Visual Studio",
            "Linux System Administration"
          ]
        },
        {
          category: "Sales and Business Skills",
          items: [
            "SAP",
            "SAP S/4HANA",
            "CRM Systems",
            "B2B/B2C Customer Acquisition",
            "Communication and Relationship Management"
          ]
        }
      ],
      certifications: [],
      languages: [
        { name: "German", proficiency: "Fluent at negotiation level" },
        { name: "English", proficiency: "Fluent at negotiation level" },
        { name: "French", proficiency: "Native" },
        { name: "Arabic", proficiency: "Native" },
        { name: "Italian", proficiency: "Basic knowledge" }
      ],
      projects: [
        {
          name: "AI-based Chatbot",
          description: "Integration of OpenAI API into my personal portfolio, creating an interactive user experience and demonstrating practical skills in API integration and web development.",
          technologies: ["OpenAI API", "React", "Node.js", "Express"],
          url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
        },
        {
          name: "Flash Sale Platform",
          description: "Development of a scalable backend platform to handle flash sale events with high user load. Focus on data modeling, transaction security, and performance optimization.",
          technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
          url: "https://github.com/Mayedi007/flash-sale-platform"
        },
        {
          name: "Reddit Data Pipeline",
          description: "Implementation of a real-time data pipeline to capture and analyze Reddit data streams. Utilized modern data engineering technologies.",
          technologies: ["Python", "Apache Kafka", "Apache Spark", "MongoDB", "AWS"],
          url: "https://github.com/Mayedi007/reddit-data-pipeline"
        },
        {
          name: "UML Visualization Plugin",
          description: "Creation of an Eclipse plugin to analyze and visualize the architecture of a flight management system. Focus on identifying critical module dependencies and improving system maintainability.",
          technologies: ["Java", "Eclipse RCP", "UML", "GraphViz"],
          url: "https://github.com/Mayedi007/uml-visualization-plugin"
        }
      ]
    };

    // German CV
    const lebenslauf = {
      name: "MOHAMED ABDELLATIF AYADI",
      foto: "/images/avatar.png",
      titel: "Student im 4. Semester B.Sc. Informatik an der Technischen Universität Dortmund",
      zusammenfassung:
        "Ich bin Mohamed Abdellatif Ayadi, Student im 4. Semester des B.Sc. Informatik an der Technischen Universität Dortmund. Ich arbeite derzeit als Werkstudent im Vertrieb bei Iperceramica Deutschland GmbH. Mit großer Leidenschaft für Programmierung, künstliche Intelligenz, Innovation und Vertrieb strebe ich danach, meine Kenntnisse praxisnah zu vertiefen. Mein Ziel ist es, an Projekten mit echtem Mehrwert zu arbeiten und mich im Bereich Softwareentwicklung oder IT-Consulting weiterzuentwickeln.",
      kontakt: {
        email: "mohamed.ayadi.data@gmail.com",
        telefon: "0152 5230 1739",
        ort: "Dortmund, Deutschland",
        webseite: "https://github.com/Mayedi007",
        sozialeNetzwerke: [
          { name: "LinkedIn", url: "https://linkedin.com/in/mohamed-abdellatif-ayadi" },
          { name: "GitHub", url: "https://github.com/Mayedi007" }
        ]
      },
      berufserfahrung: [
        {
          firma: "Iperceramica Deutschland GmbH",
          position: "Werkstudent",
          von: "2024-04",
          bis: "Heute",
          beschreibung:
            "• Nutzung von SAP und SAP S/4HANA zur Optimierung von Beständen, Bestellungen, Lieferprozessen und Reklamationen.\n• Vertrieb: Aktive Kundenakquise im B2B- und B2C-Bereich, Verkauf und Beratung zu hochwertigen Fliesen, Parkett, Sanitärprodukten und Badmöbeln.\n• Pflege von Kundendaten in CRM- und PRM-Systemen zur Verbesserung der Kommunikation und Zusammenarbeit."
        },
        {
          firma: "Technische Universität Dortmund",
          position: "Studentische Hilfskraft",
          von: "2023-10",
          bis: "2024-04",
          beschreibung:
            "• Tutor im Kurs 'Datenstrukturen, Algorithmen und Programmierung 1'.\n• Durchführung von Übungen zur objektorientierten Programmierung mit Java.\n• Betreuung von Hausaufgaben, Prüfungsvorbereitung und individuelle Unterstützung von Erstsemestern."
        }
      ],
      ausbildung: [
        {
          einrichtung: "Technische Universität Dortmund",
          abschluss: "B.Sc. Informatik",
          von: "2022-09",
          bis: "Laufend",
          ort: "Dortmund, Deutschland",
          beschreibung: "Schwerpunkte: Softwareentwicklung, Algorithmen, Künstliche Intelligenz"
        },
        {
          einrichtung: "Goethe-Institut Düsseldorf",
          abschluss: "Intensivsprachkurs C1",
          von: "2022-09",
          bis: "2022-09",
          ort: "Düsseldorf, Deutschland",
          beschreibung: "Deutsch-Sprachkurs mit Abschluss auf C1-Niveau"
        },
        {
          einrichtung: "Lycée Pilote de Sfax",
          abschluss: "Abitur in Mathematik",
          von: "2018-09",
          bis: "2021-07",
          ort: "Sfax, Tunesien",
          beschreibung: ""
        }
      ],
      faehigkeiten: [
        {
          kategorie: "Generative KI und Künstliche Intelligenz",
          inhalte: [
            "Entwicklung von KI-Anwendungen mit der OpenAI API",
            "Chatbot-Entwicklung",
            "Datenaugmentation",
            "Deep Learning",
            "Forecasting",
            "Maschinelles Lernen"
          ]
        },
        {
          kategorie: "Softwareentwicklung und Backend-Technologien",
          inhalte: [
            "Objektorientierte Programmierung (OOP)",
            "Java",
            "Python",
            "C",
            "Spring Boot",
            "Docker",
            "API-Entwicklung",
            "Datenbankdesign (MySQL)"
          ]
        },
        {
          kategorie: "Datenengineering und Datenanalyse",
          inhalte: [
            "Echtzeit-Datenpipelines",
            "Data Warehousing",
            "Zeitreihenanalyse",
            "ETL-Prozesse",
            "Grundlagen von Big Data"
          ]
        },
        {
          kategorie: "Werkzeuge und Plattformen",
          inhalte: [
            "GitLab",
            "Eclipse",
            "Microsoft Visual Studio",
            "Linux-Systemadministration"
          ]
        },
        {
          kategorie: "Vertriebs- und Geschäftskompetenzen",
          inhalte: [
            "SAP",
            "SAP S/4HANA",
            "CRM-Systeme",
            "B2B/B2C-Kundenakquise",
            "Kommunikation & Beziehungsmanagement"
          ]
        }
      ],
      sprachen: [
        { name: "Deutsch", niveau: "Fließend auf Verhandlungsniveau" },
        { name: "Englisch", niveau: "Fließend auf Verhandlungsniveau" },
        { name: "Französisch", niveau: "Muttersprache" },
        { name: "Arabisch", niveau: "Muttersprache" },
        { name: "Italienisch", niveau: "Grundkenntnisse" }
      ],
      projekte: [
        {
          name: "KI-basierter Chatbot",
          beschreibung:
            "Integration der OpenAI API in mein persönliches Portfolio zur Schaffung einer interaktiven Benutzererfahrung. Demonstration meiner Fähigkeiten in API-Integration und Webentwicklung.",
          technologien: ["OpenAI API", "React", "Node.js", "Express"],
          url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
        },
        {
          name: "Flash-Sale-Plattform",
          beschreibung:
            "Backend-System zur Verwaltung von Flash-Sales mit hoher Last. Fokus auf Performance, Transaktionssicherheit und Datenmodellierung.",
          technologien: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
          url: "https://github.com/Mayedi007/flash-sale-platform"
        },
        {
          name: "Reddit-Datenpipeline",
          beschreibung:
            "Echtzeit-Erfassung und -Analyse von Reddit-Daten mit modernen Data-Engineering-Technologien.",
          technologien: ["Python", "Kafka", "Spark", "MongoDB", "AWS"],
          url: "https://github.com/Mayedi007/reddit-data-pipeline"
        },
        {
          name: "UML-Visualisierungs-Plugin",
          beschreibung:
            "Eclipse-Plugin zur Analyse und Visualisierung der Architektur eines Flugmanagementsystems. Ziel: Verbesserung der Wartbarkeit durch Erkennung kritischer Modulabhängigkeiten.",
          technologien: ["Java", "Eclipse RCP", "UML", "GraphViz"],
          url: "https://github.com/Mayedi007/uml-visualization-plugin"
        }
      ],
      interessen: [
        "Lesen von Fachbüchern über Finanzen, Technologie und Innovationen",
        "Besuch von Messen und Events zur Entdeckung neuer Technologien",
        "Teilen von Eindrücken und Erkenntnissen auf LinkedIn",
        "Regelmäßiges Padelspielen"
      ]
    };

      projects: [
        {
          name: "KI-basierter Chatbot",
          description: "Integration der OpenAI API in mein persönliches Portfolio, um eine interaktive Benutzererfahrung zu schaffen und praktische Fähigkeiten in API-Integration und Webentwicklung zu demonstrieren.",
          technologies: ["OpenAI API", "React", "Node.js", "Express"],
          url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
        },
        {
          name: "Flash-Sale-Plattform",
          description: "Entwicklung einer skalierbaren Backend-Plattform zur Abwicklung von Flash-Sale-Events mit hoher Benutzerauslastung. Fokus auf Datenmodellierung, Transaktionssicherheit und Leistungsoptimierung.",
          technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
          url: "https://github.com/Mayedi007/flash-sale-platform"
        },
        {
          name: "Reddit-Datenpipeline",
          description: "Implementierung einer Echtzeit-Datenpipeline zur Erfassung und Analyse von Reddit-Datenströmen. Einsatz moderner Datenengineering-Technologien.",
          technologies: ["Python", "Apache Kafka", "Apache Spark", "MongoDB", "AWS"],
          url: "https://github.com/Mayedi007/reddit-data-pipeline"
        },
        {
          name: "UML-Visualisierungs-Plugin",
          description: "Erstellung eines Eclipse-Plugins zur Analyse und Visualisierung der Architektur eines Flugmanagementsystems. Fokus auf die Identifizierung kritischer Modulabhängigkeiten und die Verbesserung der Wartbarkeit des Systems.",
          technologies: ["Java", "Eclipse RCP", "UML", "GraphViz"],
          url: "https://github.com/Mayedi007/uml-visualization-plugin"
        }
      ],
      certifications: [],
      email: "mohamed.ayadi.data@gmail.com",
      phone: "0152 5230 1739",
      location: "Dortmund, Deutschland"
    };


      experience: [
        {
          company: "Iperceramica Deutschland GmbH",
          position: "Étudiant salarié",
          startDate: "2024-04",
          endDate: "Present",
          description:
            "• Utilisation de SAP et SAP S/4HANA pour optimiser les stocks, les commandes, les processus de livraison et la gestion des réclamations.\n• Vente : Acquisition active de clients dans les secteurs B2B et B2C grâce à une prospection ciblée et à l'établissement de relations clients à long terme. Vente et conseil sur les carrelages de haute qualité, les parquets, les articles sanitaires et les meubles de salle de bain.\n• Maintenance des données clients et des relations partenaires dans les systèmes CRM et PRM pour améliorer la communication et la collaboration."
        },
        {
          company: "Université Technique de Dortmund",
          position: "Assistant étudiant",
          startDate: "2023-10",
          endDate: "2024-04",
          description:
            "• Fonction de tuteur étudiant pour le cours 'Structures de données, algorithmes et programmation 1' en tant que mini-job.\n• Organisation et mise en œuvre de tutoriels pour les étudiants de première année avec un accent sur la programmation orientée objet en Java.\n• Les tâches comprenaient des exercices pratiques de programmation, l'approfondissement et l'élargissement du contenu des cours, la supervision des devoirs, ainsi que la préparation ciblée aux examens et la planification stratégique."
        }
      ],
      education: [
        {
          institution: "Université Technique de Dortmund",
          degree: "B.Sc. Informatique",
          startDate: "2022-09",
          endDate: "Present",
          location: "Dortmund, Allemagne",
          description: "Spécialité : Développement logiciel, Algorithmes, IA"
        },
        {
          institution: "Institut Supérieur d'Informatique et de Multimédia de Sfax",
          degree: "B.Sc. Informatique",
          startDate: "2018-09",
          endDate: "2021-07",
          location: "Sfax, Tunisie",
          description: "Spécialité : Développement web, Gestion de bases de données"
        }
      ],
      skills: [
        {
          category: "IA Générative et Intelligence Artificielle",
          items: [
            "Développement d'applications IA avec l'API OpenAI",
            "Développement de chatbots",
            "Augmentation de données",
            "Deep Learning",
            "Prévision",
            "Apprentissage automatique"
          ]
        },
        {
          category: "Développement logiciel et technologies backend",
          items: [
            "Programmation orientée objet (POO)",
            "Java",
            "Python",
            "Programmation en C",
            "Spring Boot",
            "Docker",
            "Développement d'API",
            "Conception de bases de données (MySQL)"
          ]
        },
        {
          category: "Ingénierie et analyse de données",
          items: [
            "Pipelines de données en temps réel",
            "Data Warehousing",
            "Analyse de séries temporelles",
            "Processus ETL",
            "Connaissances de base en Big Data"
          ]
        },
        {
          category: "Outils et plateformes",
          items: [
            "GitLab",
            "Eclipse",
            "Microsoft Visual Studio",
            "Administration de systèmes Linux"
          ]
        },
        {
          category: "Ventes et compétences commerciales",
          items: [
            "SAP",
            "SAP S/4HANA",
            "Systèmes CRM",
            "Acquisition de clients B2B/B2C",
            "Communication et gestion des relations"
          ]
        }
      ],
      languages: [
        {
          name: "Allemand",
          proficiency: "Courant à niveau de négociation"
        },
        {
          name: "Anglais",
          proficiency: "Courant à niveau de négociation"
        },
        {
          name: "Français",
          proficiency: "Langue maternelle"
        },
        {
          name: "Arabe",
          proficiency: "Langue maternelle"
        },
        {
          name: "Italien",
          proficiency: "Connaissances de base"
        }
      ],
      projects: [
        {
          name: "Chatbot basé sur l'IA",
          description: "Intégration de l'API OpenAI dans mon portfolio personnel, pour créer une expérience utilisateur interactive et démontrer des compétences pratiques en intégration d'API et développement web.",
          technologies: ["API OpenAI", "React", "Node.js", "Express"],
          url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
        },
        {
          name: "Plateforme de ventes flash",
          description: "Développement d'une plateforme backend évolutive pour gérer les événements de ventes flash avec une charge utilisateur élevée. Accent sur la modélisation des données, la sécurité des transactions et l'optimisation des performances.",
          technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
          url: "https://github.com/Mayedi007/flash-sale-platform"
        },
        {
          name: "Pipeline de données Reddit",
          description: "Mise en œuvre d'un pipeline de données en temps réel pour capturer et analyser les flux de données Reddit. Utilisation de technologies modernes d'ingénierie de données.",
          technologies: ["Python", "Apache Kafka", "Apache Spark", "MongoDB", "AWS"],
          url: "https://github.com/Mayedi007/reddit-data-pipeline"
        },
        {
          name: "Plugin de visualisation UML",
          description: "Création d'un plugin Eclipse pour analyser et visualiser l'architecture d'un système de gestion de vol. Accent sur l'identification des dépendances de modules critiques et l'amélioration de la maintenabilité du système.",
          technologies: ["Java", "Eclipse RCP", "UML", "GraphViz"],
          url: "https://github.com/Mayedi007/uml-visualization-plugin"
        }
      ],
      certifications: [],
      email: "mohamed.ayadi.data@gmail.com",
      phone: "0152 5230 1739",
      location: "Dortmund, Allemagne"
    };

    // Store only English and German language versions
    this.cvs = {
      en: this.cv,
      de: germanCV
    };

    this.addSampleArticles();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getArticles(limit?: number): Promise<Article[]> {
    const articles = Array.from(this.articles.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    return limit ? articles.slice(0, limit) : articles;
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getCV(language?: string): Promise<CV> {
    if (language && language in this.cvs) {
      return this.cvs[language];
    }
    return this.cv;
  }

  async saveContactMessage(message: ContactMessage): Promise<void> {
    this.contactMessages.push(message);
  }

  async subscribeToNewsletter(email: string): Promise<void> {
    this.newsletterSubscriptions.add(email);
  }

  private addSampleArticles(): void {
    // Sample article data with multilingual support
    const articles: Article[] = [
      {
        id: this.currentArticleId++,
        title: "Mastering SQL Window Functions: A Comprehensive Guide",
        excerpt: "Learn how to leverage SQL window functions for advanced data analysis.",
        content: "SQL window functions are one of the most powerful and flexible tools available to analysts and developers working with relational databases...",
        coverImage: "/images/sql-window-functions.svg",
        category: "Database",
        publishedAt: new Date("2025-01-15"),
        translations: {
          en: {
            title: "Mastering SQL Window Functions: A Comprehensive Guide",
            content: "SQL window functions are one of the most powerful and flexible tools available to analysts and developers working with relational databases. They allow you to perform calculations across a set of rows that are somehow related to the current row, without having to use self-joins or subqueries. This makes them incredibly efficient and expressive for many common data analysis tasks.\n\nIn this comprehensive guide, we'll explore what window functions are, how they work, and how to use them effectively in your SQL queries. We'll cover everything from the basics to advanced techniques, with practical examples that you can apply to your own data analysis challenges.",
            excerpt: "Learn how to leverage SQL window functions for advanced data analysis."
          },
          de: {
            title: "Beherrschung von SQL-Fensterfunktionen: Ein umfassender Leitfaden",
            content: "SQL-Fensterfunktionen sind eines der leistungsstärksten und flexibelsten Werkzeuge für Analysten und Entwickler, die mit relationalen Datenbanken arbeiten. Sie ermöglichen Berechnungen über eine Menge von Zeilen, die in irgendeiner Weise mit der aktuellen Zeile verwandt sind, ohne dass Self-Joins oder Subqueries verwendet werden müssen. Dies macht sie unglaublich effizient und ausdrucksstark für viele gängige Datenanalyseaufgaben.\n\nIn diesem umfassenden Leitfaden werden wir untersuchen, was Fensterfunktionen sind, wie sie funktionieren und wie man sie effektiv in SQL-Abfragen einsetzen kann. Wir werden alles von den Grundlagen bis hin zu fortgeschrittenen Techniken behandeln, mit praktischen Beispielen, die Sie auf Ihre eigenen Datenanalyse-Herausforderungen anwenden können.",
            excerpt: "Lernen Sie, wie Sie SQL-Fensterfunktionen für fortgeschrittene Datenanalysen nutzen können."
          },
          fr: {
            title: "Maîtriser les fonctions de fenêtrage SQL : Un guide complet",
            content: "Les fonctions de fenêtrage SQL sont l'un des outils les plus puissants et flexibles disponibles pour les analystes et développeurs travaillant avec des bases de données relationnelles. Elles permettent d'effectuer des calculs sur un ensemble de lignes qui sont d'une certaine manière liées à la ligne en cours, sans avoir à utiliser des auto-jointures ou des sous-requêtes. Cela les rend incroyablement efficaces et expressives pour de nombreuses tâches courantes d'analyse de données.\n\nDans ce guide complet, nous explorerons ce que sont les fonctions de fenêtrage, comment elles fonctionnent et comment les utiliser efficacement dans vos requêtes SQL. Nous couvrirons tout, des bases aux techniques avancées, avec des exemples pratiques que vous pourrez appliquer à vos propres défis d'analyse de données.",
            excerpt: "Apprenez à exploiter les fonctions de fenêtrage SQL pour l'analyse de données avancée."
          }
        }
      },
      {
        id: this.currentArticleId++,
        title: "SQL Practical Challenge: Salary Analysis",
        excerpt: "Tackle a real-world SQL challenge focused on employee salary analysis.",
        content: "Recently, I encountered an interesting SQL challenge: The task required using window functions to analyze employee salary data across different departments...",
        coverImage: "/images/sql-salary-analysis.svg",
        category: "Data Analysis",
        publishedAt: new Date("2025-02-10"),
        translations: {
          en: {
            title: "SQL Practical Challenge: Salary Analysis",
            content: "Recently, I encountered an interesting SQL challenge: The task required using window functions to analyze employee salary data across different departments and identify salary patterns. In this article, I'll walk through the challenge step by step, explaining my approach and the SQL techniques I used to solve it.\n\nThe challenge involved a company database with information about employees, their departments, and salary history. I needed to identify salary inequities, calculate percentile rankings, and provide insights that would help the HR department make data-driven decisions about compensation adjustments.",
            excerpt: "Tackle a real-world SQL challenge focused on employee salary analysis."
          },
          de: {
            title: "SQL-Praxisherausforderung: Gehaltsanalyse",
            content: "Kürzlich bin ich auf eine interessante SQL-Herausforderung gestoßen: Die Aufgabe erforderte die Verwendung von Fensterfunktionen, um Mitarbeitergehaltsdaten in verschiedenen Abteilungen zu analysieren und Gehaltsmuster zu identifizieren. In diesem Artikel werde ich die Herausforderung Schritt für Schritt durchgehen und meinen Ansatz sowie die SQL-Techniken erklären, die ich zur Lösung verwendet habe.\n\nDie Herausforderung betraf eine Unternehmensdatenbank mit Informationen über Mitarbeiter, ihre Abteilungen und Gehaltshistorie. Ich musste Gehaltsungleichheiten identifizieren, Perzentil-Rankings berechnen und Erkenntnisse liefern, die der Personalabteilung helfen würden, datengestützte Entscheidungen über Vergütungsanpassungen zu treffen.",
            excerpt: "Stellen Sie sich einer realen SQL-Herausforderung zur Mitarbeitergehaltsanalyse."
          },
          fr: {
            title: "Défi SQL Pratique : Analyse des Salaires",
            content: "Récemment, j'ai rencontré un défi SQL intéressant : la tâche nécessitait l'utilisation de fonctions de fenêtrage pour analyser les données de salaire des employés à travers différents départements et identifier les modèles de rémunération. Dans cet article, je vais présenter le défi étape par étape, en expliquant mon approche et les techniques SQL que j'ai utilisées pour le résoudre.\n\nLe défi concernait une base de données d'entreprise contenant des informations sur les employés, leurs départements et l'historique des salaires. Je devais identifier les inégalités salariales, calculer les classements par centile et fournir des informations qui aideraient le département RH à prendre des décisions basées sur les données concernant les ajustements de rémunération.",
            excerpt: "Relevez un défi SQL du monde réel axé sur l'analyse des salaires des employés."
          }
        }
      },
      {
        id: this.currentArticleId++,
        title: "Building Robust Data Pipelines with Apache Airflow",
        excerpt: "Learn how to design, implement, and manage data workflows with Apache Airflow.",
        content: "In today's data-driven world, building reliable data pipelines is essential for organizations to extract valuable insights...",
        coverImage: "/images/airflow-pipeline.svg",
        category: "Data Engineering",
        publishedAt: new Date("2025-03-01"),
        translations: {
          en: {
            title: "Building Robust Data Pipelines with Apache Airflow",
            content: "In today's data-driven world, building reliable data pipelines is essential for organizations to extract valuable insights from their data. Apache Airflow has emerged as a powerful open-source platform for orchestrating complex data workflows. This article explores the fundamentals of Apache Airflow and demonstrates how to build robust, scalable data pipelines that can handle diverse data sources and transformations.\n\nWe'll cover key concepts like DAGs (Directed Acyclic Graphs), operators, sensors, and executors, along with best practices for designing fault-tolerant workflows with proper error handling and monitoring.",
            excerpt: "Learn how to design, implement, and manage data workflows with Apache Airflow."
          },
          de: {
            title: "Aufbau robuster Datenpipelines mit Apache Airflow",
            content: "In der heutigen datengesteuerten Welt ist der Aufbau zuverlässiger Datenpipelines für Organisationen unerlässlich, um wertvolle Erkenntnisse aus ihren Daten zu gewinnen. Apache Airflow hat sich als leistungsstarke Open-Source-Plattform für die Orchestrierung komplexer Daten-Workflows etabliert. Dieser Artikel erkundet die Grundlagen von Apache Airflow und zeigt, wie man robuste, skalierbare Datenpipelines aufbaut, die verschiedene Datenquellen und Transformationen verarbeiten können.\n\nWir werden Schlüsselkonzepte wie DAGs (Directed Acyclic Graphs), Operatoren, Sensoren und Executors behandeln, zusammen mit bewährten Praktiken für die Gestaltung fehlertoleranter Workflows mit angemessener Fehlerbehandlung und Überwachung.",
            excerpt: "Lernen Sie, wie Sie Daten-Workflows mit Apache Airflow entwerfen, implementieren und verwalten können."
          },
          fr: {
            title: "Construction de pipelines de données robustes avec Apache Airflow",
            content: "Dans le monde actuel axé sur les données, la construction de pipelines de données fiables est essentielle pour que les organisations puissent extraire des informations précieuses de leurs données. Apache Airflow s'est imposé comme une puissante plateforme open-source pour l'orchestration de flux de travail de données complexes. Cet article explore les fondamentaux d'Apache Airflow et démontre comment construire des pipelines de données robustes et évolutifs capables de gérer diverses sources de données et transformations.\n\nNous couvrirons des concepts clés comme les DAG (graphes acycliques dirigés), les opérateurs, les capteurs et les exécuteurs, ainsi que les meilleures pratiques pour concevoir des flux de travail tolérants aux pannes avec une gestion d'erreurs et une surveillance appropriées.",
            excerpt: "Apprenez à concevoir, implémenter et gérer des flux de travail de données avec Apache Airflow."
          }
        }
      },
      {
        id: this.currentArticleId++,
        title: "Effective Data Visualization Techniques for Complex Datasets",
        excerpt: "Discover powerful strategies to present complex data in clear, insightful visualizations.",
        content: "Data visualization is a critical skill for data scientists and analysts. This article explores advanced techniques...",
        coverImage: "/images/data-visualization.svg",
        category: "Data Visualization",
        publishedAt: new Date("2025-03-15"),
        translations: {
          en: {
            title: "Effective Data Visualization Techniques for Complex Datasets",
            content: "Data visualization is a critical skill for data scientists and analysts. This article explores advanced techniques for visualizing complex datasets in ways that effectively communicate insights and patterns. We'll examine how to choose the right visualization for different data types and analysis goals, and discuss principles of design that enhance clarity and impact.\n\nFrom multidimensional data visualization to interactive dashboards, we'll cover tools and techniques that help transform raw data into compelling visual stories. Examples will include hierarchical data visualization, network graphs, geospatial mapping, and time-series analysis visualizations.",
            excerpt: "Discover powerful strategies to present complex data in clear, insightful visualizations."
          },
          de: {
            title: "Effektive Datenvisualisierungstechniken für komplexe Datensätze",
            content: "Datenvisualisierung ist eine entscheidende Fähigkeit für Datenwissenschaftler und Analysten. Dieser Artikel untersucht fortgeschrittene Techniken zur Visualisierung komplexer Datensätze auf eine Weise, die Erkenntnisse und Muster effektiv kommuniziert. Wir werden betrachten, wie man die richtige Visualisierung für verschiedene Datentypen und Analyseziele auswählt, und Designprinzipien diskutieren, die Klarheit und Wirkung verbessern.\n\nVon mehrdimensionaler Datenvisualisierung bis hin zu interaktiven Dashboards werden wir Tools und Techniken behandeln, die helfen, Rohdaten in überzeugende visuelle Geschichten zu verwandeln. Beispiele werden hierarchische Datenvisualisierung, Netzwerkgraphen, Geospatial Mapping und Zeitreihenanalyse-Visualisierungen umfassen.",
            excerpt: "Entdecken Sie leistungsstarke Strategien, um komplexe Daten in klaren, aufschlussreichen Visualisierungen zu präsentieren."
          },
          fr: {
            title: "Techniques efficaces de visualisation de données pour les ensembles de données complexes",
            content: "La visualisation des données est une compétence essentielle pour les data scientists et les analystes. Cet article explore des techniques avancées pour visualiser des ensembles de données complexes de manière à communiquer efficacement les insights et les modèles. Nous examinerons comment choisir la bonne visualisation pour différents types de données et objectifs d'analyse, et discuterons des principes de conception qui améliorent la clarté et l'impact.\n\nDe la visualisation de données multidimensionnelles aux tableaux de bord interactifs, nous couvrirons les outils et techniques qui aident à transformer des données brutes en histoires visuelles convaincantes. Les exemples incluront la visualisation de données hiérarchiques, les graphes de réseau, la cartographie géospatiale et les visualisations d'analyse de séries temporelles.",
            excerpt: "Découvrez des stratégies puissantes pour présenter des données complexes dans des visualisations claires et perspicaces."
          }
        }
      },
      {
        id: this.currentArticleId++,
        title: "Implementing CI/CD for Data Science Projects",
        excerpt: "Learn how to apply DevOps practices to your data science workflows for improved collaboration and reproducibility.",
        content: "Continuous Integration and Continuous Deployment (CI/CD) practices have revolutionized software development...",
        coverImage: "/images/cicd-datascience.svg",
        category: "DevOps",
        publishedAt: new Date("2025-04-05"),
        translations: {
          en: {
            title: "Implementing CI/CD for Data Science Projects",
            content: "Continuous Integration and Continuous Deployment (CI/CD) practices have revolutionized software development. This article explores how to adapt these DevOps practices to data science workflows. We'll discuss how CI/CD can help data science teams improve collaboration, ensure reproducibility, and deploy models more efficiently.\n\nThe article covers practical implementations using tools like GitHub Actions, Jenkins, or GitLab CI/CD to automate testing of data pipelines, model validation, and deployment to production environments. We'll also address the unique challenges of applying CI/CD to data science projects, such as handling large datasets, versioning models, and maintaining environments.",
            excerpt: "Learn how to apply DevOps practices to your data science workflows for improved collaboration and reproducibility."
          },
          de: {
            title: "Implementierung von CI/CD für Data-Science-Projekte",
            content: "Continuous Integration und Continuous Deployment (CI/CD) Praktiken haben die Softwareentwicklung revolutioniert. Dieser Artikel untersucht, wie man diese DevOps-Praktiken an Data-Science-Workflows anpasst. Wir werden diskutieren, wie CI/CD Data-Science-Teams helfen kann, die Zusammenarbeit zu verbessern, Reproduzierbarkeit zu gewährleisten und Modelle effizienter einzusetzen.\n\nDer Artikel behandelt praktische Implementierungen mit Tools wie GitHub Actions, Jenkins oder GitLab CI/CD, um das Testen von Datenpipelines, die Modellvalidierung und die Bereitstellung in Produktionsumgebungen zu automatisieren. Wir werden auch die einzigartigen Herausforderungen bei der Anwendung von CI/CD auf Data-Science-Projekte ansprechen, wie den Umgang mit großen Datensätzen, die Versionierung von Modellen und die Wartung von Umgebungen.",
            excerpt: "Lernen Sie, wie Sie DevOps-Praktiken auf Ihre Data-Science-Workflows anwenden können, um die Zusammenarbeit und Reproduzierbarkeit zu verbessern."
          },
          fr: {
            title: "Mise en œuvre de CI/CD pour les projets de Data Science",
            content: "Les pratiques d'Intégration Continue et de Déploiement Continu (CI/CD) ont révolutionné le développement logiciel. Cet article explore comment adapter ces pratiques DevOps aux flux de travail de data science. Nous discuterons de la façon dont CI/CD peut aider les équipes de data science à améliorer la collaboration, assurer la reproductibilité et déployer des modèles plus efficacement.\n\nL'article couvre des implémentations pratiques utilisant des outils comme GitHub Actions, Jenkins ou GitLab CI/CD pour automatiser les tests de pipelines de données, la validation de modèles et le déploiement dans des environnements de production. Nous aborderons également les défis uniques de l'application du CI/CD aux projets de data science, tels que la gestion de grands ensembles de données, le versioning des modèles et la maintenance des environnements.",
            excerpt: "Apprenez à appliquer les pratiques DevOps à vos flux de travail de data science pour améliorer la collaboration et la reproductibilité."
          }
        }
      },
      {
        id: this.currentArticleId++,
        title: "Building Scalable APIs with GraphQL and Node.js",
        excerpt: "Explore how GraphQL can transform your API development for better flexibility and performance.",
        content: "REST APIs have been the standard for building web services for years, but GraphQL offers a compelling alternative...",
        coverImage: "/images/graphql-nodejs.svg",
        category: "Web Development",
        publishedAt: new Date("2025-04-20"),
        translations: {
          en: {
            title: "Building Scalable APIs with GraphQL and Node.js",
            content: "REST APIs have been the standard for building web services for years, but GraphQL offers a compelling alternative with significant advantages for both frontend and backend developers. This article explores how to build scalable and efficient APIs using GraphQL with Node.js.\n\nWe'll cover setting up a GraphQL server, defining schemas, resolvers, and mutations, as well as implementing authentication, error handling, and caching. Through practical examples, you'll learn how GraphQL addresses common API development challenges such as overfetching and underfetching data, versioning, and documentation.",
            excerpt: "Explore how GraphQL can transform your API development for better flexibility and performance."
          },
          de: {
            title: "Aufbau skalierbarer APIs mit GraphQL und Node.js",
            content: "REST-APIs waren jahrelang der Standard für den Aufbau von Webdiensten, aber GraphQL bietet eine überzeugende Alternative mit erheblichen Vorteilen sowohl für Frontend- als auch für Backend-Entwickler. Dieser Artikel untersucht, wie man skalierbare und effiziente APIs mit GraphQL und Node.js aufbaut.\n\nWir werden die Einrichtung eines GraphQL-Servers, die Definition von Schemas, Resolvern und Mutations sowie die Implementierung von Authentifizierung, Fehlerbehandlung und Caching behandeln. Durch praktische Beispiele lernen Sie, wie GraphQL häufige API-Entwicklungsherausforderungen wie Überfetchung und Unterfetchung von Daten, Versionierung und Dokumentation adressiert.",
            excerpt: "Entdecken Sie, wie GraphQL Ihre API-Entwicklung für bessere Flexibilität und Leistung transformieren kann."
          },
          fr: {
            title: "Construction d'APIs évolutives avec GraphQL et Node.js",
            content: "Les API REST ont été la norme pour la construction de services web pendant des années, mais GraphQL offre une alternative convaincante avec des avantages significatifs tant pour les développeurs frontend que backend. Cet article explore comment construire des API évolutives et efficaces en utilisant GraphQL avec Node.js.\n\nNous couvrirons la mise en place d'un serveur GraphQL, la définition des schémas, des résolveurs et des mutations, ainsi que l'implémentation de l'authentification, la gestion des erreurs et la mise en cache. À travers des exemples pratiques, vous apprendrez comment GraphQL répond aux défis courants du développement d'API tels que la sur-récupération et la sous-récupération de données, le versioning et la documentation.",
            excerpt: "Explorez comment GraphQL peut transformer votre développement d'API pour une meilleure flexibilité et performance."
          }
        }
      },
      {
        id: this.currentArticleId++,
        title: "Microservices Architecture: Patterns and Best Practices",
        excerpt: "A deep dive into effective microservices architecture strategies for complex applications.",
        content: "Microservices architecture has become the go-to approach for building complex, scalable applications...",
        coverImage: "/images/microservices.svg",
        category: "Software Architecture",
        publishedAt: new Date("2025-05-05"),
        translations: {
          en: {
            title: "Microservices Architecture: Patterns and Best Practices",
            content: "Microservices architecture has become the go-to approach for building complex, scalable applications. This article presents essential patterns and best practices for designing, implementing, and maintaining effective microservices systems. We'll explore service decomposition strategies, inter-service communication patterns, data management approaches, and deployment models.\n\nThe discussion will cover critical aspects like service discovery, API gateways, event-driven architecture, circuit breakers, and observability. We'll also address common challenges in microservices adoption and provide practical advice for organizations transitioning from monolithic applications.",
            excerpt: "A deep dive into effective microservices architecture strategies for complex applications."
          },
          de: {
            title: "Mikroservices-Architektur: Muster und Best Practices",
            content: "Die Mikroservices-Architektur ist zum bevorzugten Ansatz für den Aufbau komplexer, skalierbarer Anwendungen geworden. Dieser Artikel präsentiert wesentliche Muster und Best Practices für das Design, die Implementierung und die Wartung effektiver Mikroservices-Systeme. Wir werden Strategien zur Service-Dekomposition, Muster für die Kommunikation zwischen Services, Ansätze zum Datenmanagement und Bereitstellungsmodelle untersuchen.\n\nDie Diskussion wird kritische Aspekte wie Service Discovery, API-Gateways, ereignisgesteuerte Architektur, Circuit Breaker und Beobachtbarkeit behandeln. Wir werden auch auf häufige Herausforderungen bei der Einführung von Mikroservices eingehen und praktische Ratschläge für Organisationen geben, die von monolithischen Anwendungen umsteigen.",
            excerpt: "Ein tiefer Einblick in effektive Mikroservices-Architekturstrategien für komplexe Anwendungen."
          },
          fr: {
            title: "Architecture Microservices : Modèles et Meilleures Pratiques",
            content: "L'architecture microservices est devenue l'approche privilégiée pour construire des applications complexes et évolutives. Cet article présente des modèles essentiels et des meilleures pratiques pour concevoir, mettre en œuvre et maintenir des systèmes de microservices efficaces. Nous explorerons les stratégies de décomposition des services, les modèles de communication inter-services, les approches de gestion des données et les modèles de déploiement.\n\nLa discussion couvrira des aspects critiques comme la découverte de services, les passerelles API, l'architecture événementielle, les disjoncteurs et l'observabilité. Nous aborderons également les défis courants dans l'adoption des microservices et fournirons des conseils pratiques pour les organisations en transition depuis des applications monolithiques.",
            excerpt: "Une plongée profonde dans les stratégies d'architecture microservices efficaces pour les applications complexes."
          }
        }
      }
    ];

    // Add articles to the storage
    articles.forEach(article => {
      this.articles.set(article.id, article);
    });
  }
}

export const storage = new MemStorage();