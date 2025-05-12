import { 
  users, 
  type User, 
  type InsertUser, 
  type Article, 
  type CV, 
  type ContactMessage,
  type NewsletterSubscription
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

    // Initialize English CV data
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
          endDate: "2027",
          location: "Dortmund, Germany",
          description: "Degree expected in 2027"
        },
        {
          institution: "Goethe Institute Düsseldorf",
          degree: "Intensive German Course",
          startDate: "2021-07",
          endDate: "2022-09",
          location: "Düsseldorf, Germany",
          description: "C1 level diploma"
        },
        {
          institution: "Lycée Pilote de Sfax",
          degree: "Mathematics Baccalaureate",
          startDate: "2018-09",
          endDate: "2021-07",
          location: "Sfax, Tunisia"
        }
      ],
      skills: [
        "OpenAI API Application Development",
        "Chatbot Development",
        "Data Augmentation",
        "Deep Learning",
        "Forecasting",
        "Machine Learning",
        "Object-Oriented Programming (OOP)",
        "Java",
        "Python",
        "C Programming",
        "Spring Boot",
        "Docker",
        "API Development",
        "Database Design (MySQL)",
        "Real-time Data Pipelines",
        "Data Warehousing",
        "Time Series Analysis",
        "ETL Processes",
        "Basic Big Data Knowledge",
        "GitLab",
        "Eclipse",
        "Microsoft Visual Studio",
        "Linux System Administration",
        "SAP",
        "SAP S/4HANA",
        "CRM Systems",
        "B2B/B2C Customer Acquisition",
        "Communication and Relationship Management"
      ],
      certifications: [],
      languages: [
        { name: "German", proficiency: "Fluent at negotiation level" },
        { name: "English", proficiency: "Fluent at negotiation level" },
        { name: "French", proficiency: "Native language" },
        { name: "Arabic", proficiency: "Native language" },
        { name: "Italian", proficiency: "Basic knowledge" }
      ],
      projects: [
        {
          name: "AI-based Chatbot",
          description: "Integration of the OpenAI API into my personal portfolio to create an interactive user experience and demonstrate practical skills in API integration and web development.",
          technologies: ["OpenAI API", "React", "Node.js", "Express"],
          url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
        },
        {
          name: "Flash Sale Platform",
          description: "Development of a scalable backend platform to manage flash sale events with high user load. Focus on data modeling, transaction security, and performance optimization.",
          technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
          url: "https://github.com/Mayedi007/flash-sale-platform"
        },
        {
          name: "Reddit Data Pipeline",
          description: "Implementation of a real-time data pipeline to capture and analyze Reddit data streams. Utilization of modern data engineering technologies.",
          technologies: ["Python", "Apache Kafka", "Apache Spark", "MongoDB", "AWS"],
          url: "https://github.com/Mayedi007/reddit-data-pipeline"
        },
        {
          name: "UML Visualization Plugin",
          description: "Creation of an Eclipse plugin to analyze and visualize the architecture of a flight management system. Focus on identifying critical module dependencies and improving system maintainability.",
          technologies: ["Java", "Eclipse RCP", "UML", "GraphViz"],
          url: "https://github.com/Mayedi007/uml-visualization-plugin"
        }
      ],
      interests: "Passionate reader of professional books on finance, technology, and innovation. Regular visits to trade shows and events to discover technological innovations and expand my knowledge of current developments. I regularly share my experiences and impressions from these visits in posts on LinkedIn. Actively involved in sports, particularly through regular padel playing."
    };

    // Multilingual CVs
    this.cvs = {
      en: this.cv,
      de: {
        name: "MOHAMED ABDELLATIF AYADI",
        photoUrl: "/images/avatar.png",
        title: "Student der Informatik (B.Sc.) an der Technischen Universität Dortmund",
        summary:
          "Ich bin Mohamed Abdellatif Ayadi, Informatikstudent an der Technischen Universität Dortmund mit praktischer Erfahrung als Werkstudent im Vertrieb und der Softwareentwicklung. Verkaufen mit Leidenschaft, Studieren mit Ehrgeiz, soziales Engagement mit Herz - dieses Motto begleitet mich sowohl akademisch als auch beruflich. Mit großer Begeisterung für Softwareentwicklung, künstliche Intelligenz und technologische Innovationen suche ich derzeit eine Werkstudentenstelle, um mein Wissen praxisnah zu vertiefen und mich speziell in den Bereichen Entwicklung oder IT-Beratung weiterzuentwickeln.",
        contact: {
          email: "mohamed.ayadi.data@gmail.com",
          phone: "0152 5230 1739",
          location: "Dortmund, Deutschland",
          website: "github.com/Mayedi007",
          social: [
            {
              name: "LinkedIn",
              url: "linkedin.com/in/mohamed-abdellatif-ayadi"
            },
            {
              name: "GitHub",
              url: "github.com/Mayedi007"
            }
          ]
        },
        experience: [
          {
            company: "Iperceramica Deutschland GmbH",
            position: "Werkstudent",
            startDate: "2024-04",
            endDate: "Gegenwärtig",
            description:
              "• Verwendung von SAP und SAP S/4HANA zur Optimierung von Lagerbeständen, Bestellungen, Lieferprozessen und Reklamationsbearbeitung.\n• Vertrieb: Aktive Kundengewinnung im B2B- und B2C-Bereich durch gezielte Akquise und Aufbau langfristiger Kundenbeziehungen. Verkauf und Beratung bei hochwertigen Fliesen, Parkett, Sanitärwaren und Badmöbeln.\n• Pflege von Kundendaten und Partnerbeziehungen in CRM- und PRM-Systemen, um die Kommunikation und Zusammenarbeit zu verbessern."
          },
          {
            company: "Technische Universität Dortmund",
            position: "Studentische Hilfskraft",
            startDate: "2023-10",
            endDate: "2024-04",
            description:
              "• Tätigkeit als studentischer Tutor für den Kurs \"Datenstrukturen, Algorithmen und Programmierung 1\" als Minijob.\n• Organisation und Durchführung von Tutorien für Erstsemester-Studenten mit Schwerpunkt auf objektorientierter Programmierung in Java.\n• Zu den Aufgaben gehörten praktische Programmierübungen, Vertiefung und Erweiterung der Kursinhalte, Betreuung von Hausaufgaben sowie gezielte Prüfungsvorbereitung und strategische Planung."
          }
        ],
        education: [
          {
            institution: "Technische Universität Dortmund",
            degree: "B.Sc. Informatik",
            startDate: "2022-09",
            endDate: "2027",
            location: "Dortmund, Deutschland",
            description: "Voraussichtlicher Abschluss 2027"
          },
          {
            institution: "Goethe-Institut Düsseldorf",
            degree: "Intensiver Deutschkurs",
            startDate: "2021-07",
            endDate: "2022-09",
            location: "Düsseldorf, Deutschland",
            description: "C1-Niveau Diplom"
          },
          {
            institution: "Lycée Pilote de Sfax",
            degree: "Mathematik-Abitur",
            startDate: "2018-09",
            endDate: "2021-07",
            location: "Sfax, Tunesien"
          }
        ],
        skills: [
          "Entwicklung von KI-Anwendungen mit der OpenAI API",
          "Chatbot-Entwicklung",
          "Datenerweiterung",
          "Deep Learning",
          "Prognose",
          "Maschinelles Lernen",
          "Objektorientierte Programmierung (OOP)",
          "Java",
          "Python",
          "C-Programmierung",
          "Spring Boot",
          "Docker",
          "API-Entwicklung",
          "Datenbankdesign (MySQL)",
          "Echtzeit-Datenpipelines",
          "Data Warehousing",
          "Zeitreihenanalyse",
          "ETL-Prozesse",
          "Grundlegende Big-Data-Kenntnisse",
          "GitLab",
          "Eclipse",
          "Microsoft Visual Studio",
          "Linux-Systemadministration",
          "SAP",
          "SAP S/4HANA",
          "CRM-Systeme",
          "B2B/B2C-Kundenakquise",
          "Kommunikation und Beziehungsmanagement"
        ],
        languages: [
          {
            name: "Deutsch",
            proficiency: "Fließend auf Verhandlungsniveau"
          },
          {
            name: "Englisch",
            proficiency: "Fließend auf Verhandlungsniveau"
          },
          {
            name: "Französisch",
            proficiency: "Muttersprache"
          },
          {
            name: "Arabisch",
            proficiency: "Muttersprache"
          },
          {
            name: "Italienisch",
            proficiency: "Grundkenntnisse"
          }
        ],
        projects: [
          {
            name: "KI-basierter Chatbot",
            description: "Integration der OpenAI API in mein persönliches Portfolio, um ein interaktives Benutzererlebnis zu schaffen und praktische Fähigkeiten in API-Integration und Webentwicklung zu demonstrieren.",
            technologies: ["OpenAI API", "React", "Node.js", "Express"],
            url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
          },
          {
            name: "Flash-Sale-Plattform",
            description: "Entwicklung einer skalierbaren Backend-Plattform zur Verwaltung von Flash-Sale-Events mit hoher Benutzerauslastung. Fokus auf Datenmodellierung, Transaktionssicherheit und Leistungsoptimierung.",
            technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
            url: "https://github.com/Mayedi007/flash-sale-platform"
          },
          {
            name: "Reddit-Datenpipeline",
            description: "Implementierung einer Echtzeit-Datenpipeline zur Erfassung und Analyse von Reddit-Datenströmen. Nutzung moderner Datenengineering-Technologien.",
            technologies: ["Python", "Apache Kafka", "Apache Spark", "MongoDB", "AWS"],
            url: "https://github.com/Mayedi007/reddit-data-pipeline"
          },
          {
            name: "UML-Visualisierungs-Plugin",
            description: "Erstellung eines Eclipse-Plugins zur Analyse und Visualisierung der Architektur eines Flugmanagementsystems. Schwerpunkt auf der Identifizierung kritischer Modulabhängigkeiten und der Verbesserung der Wartbarkeit des Systems.",
            technologies: ["Java", "Eclipse RCP", "UML", "GraphViz"],
            url: "https://github.com/Mayedi007/uml-visualization-plugin"
          }
        ],
        certifications: [],
        interests: "Begeisterter Leser von Fachbüchern über Finanzen, Technologie und Innovationen. Regelmäßiger Besuch von Messen und Veranstaltungen, um technologische Neuheiten zu entdecken und mein Wissen über aktuelle Entwicklungen zu erweitern. Erfahrungen und Eindrücke aus diesen Besuchen teile ich regelmäßig in Beiträgen auf LinkedIn. Sportlich aktiv, insbesondere durch regelmäßiges Padelspielen."
      },
      fr: {
        name: "MOHAMED ABDELLATIF AYADI",
        photoUrl: "/images/avatar.png",
        title: "Étudiant en Informatique (B.Sc.) à l'Université Technique de Dortmund",
        summary:
          "Je suis Mohamed Abdellatif Ayadi, étudiant en informatique à l'Université Technique de Dortmund avec une expérience pratique en tant qu'étudiant salarié dans les ventes et le développement de logiciels. Vente avec passion, études avec ambition, engagement social avec cœur - cette devise m'accompagne tant sur le plan académique que professionnel. Avec un grand enthousiasme pour le développement de logiciels, l'intelligence artificielle et les innovations technologiques, je recherche actuellement un poste d'étudiant salarié afin d'approfondir mes connaissances de manière pratique et de me développer spécifiquement dans les domaines du développement ou du conseil informatique.",
        contact: {
          email: "mohamed.ayadi.data@gmail.com",
          phone: "0152 5230 1739",
          location: "Dortmund, Allemagne",
          website: "github.com/Mayedi007",
          social: [
            {
              name: "LinkedIn",
              url: "linkedin.com/in/mohamed-abdellatif-ayadi"
            },
            {
              name: "GitHub",
              url: "github.com/Mayedi007"
            }
          ]
        },
        experience: [
          {
            company: "Iperceramica Deutschland GmbH",
            position: "Étudiant salarié",
            startDate: "2024-04",
            endDate: "Aujourd'hui",
            description:
              "• Utilisation de SAP et SAP S/4HANA pour optimiser les stocks, les commandes, les processus de livraison et le traitement des réclamations.\n• Ventes: Acquisition active de clients dans les secteurs B2B et B2C par le biais d'une acquisition ciblée et l'établissement de relations clients à long terme. Vente et conseil en carrelage de haute qualité, parquet, sanitaires et meubles de salle de bain.\n• Maintenance des données clients et des relations partenaires dans les systèmes CRM et PRM, pour améliorer la communication et la collaboration."
          },
          {
            company: "Université Technique de Dortmund",
            position: "Assistant étudiant",
            startDate: "2023-10",
            endDate: "2024-04",
            description:
              "• Assurer le rôle de tuteur étudiant pour le cours \"Structures de données, algorithmes et programmation 1\" comme mini-job.\n• Organisation et réalisation de tutoriels pour les étudiants de première année avec un accent sur la programmation orientée objet en Java.\n• Les tâches comprenaient des exercices pratiques de programmation, l'approfondissement et l'élargissement du contenu des cours, l'encadrement des devoirs, ainsi que la préparation ciblée aux examens et la planification stratégique."
          }
        ],
        education: [
          {
            institution: "Université Technique de Dortmund",
            degree: "B.Sc. Informatique",
            startDate: "2022-09",
            endDate: "2027",
            location: "Dortmund, Allemagne",
            description: "Diplôme prévu pour 2027"
          },
          {
            institution: "Institut Goethe de Düsseldorf",
            degree: "Cours intensif d'allemand",
            startDate: "2021-07",
            endDate: "2022-09",
            location: "Düsseldorf, Allemagne",
            description: "Diplôme de niveau C1"
          },
          {
            institution: "Lycée Pilote de Sfax",
            degree: "Baccalauréat en Mathématiques",
            startDate: "2018-09",
            endDate: "2021-07",
            location: "Sfax, Tunisie"
          }
        ],
        skills: [
          "Développement d'applications IA avec l'API OpenAI",
          "Développement de chatbots",
          "Augmentation de données",
          "Deep Learning",
          "Prévision",
          "Apprentissage automatique",
          "Programmation orientée objet (POO)",
          "Java",
          "Python",
          "Programmation en C",
          "Spring Boot",
          "Docker",
          "Développement d'API",
          "Conception de bases de données (MySQL)",
          "Pipelines de données en temps réel",
          "Data Warehousing",
          "Analyse de séries temporelles",
          "Processus ETL",
          "Connaissances de base en Big Data",
          "GitLab",
          "Eclipse",
          "Microsoft Visual Studio",
          "Administration de systèmes Linux",
          "SAP",
          "SAP S/4HANA",
          "Systèmes CRM",
          "Acquisition de clients B2B/B2C",
          "Communication et gestion des relations"
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
        interests: "Lecteur passionné de livres professionnels sur la finance, la technologie et l'innovation. Visites régulières de salons et d'événements pour découvrir les nouveautés technologiques et élargir mes connaissances sur les développements actuels. Je partage régulièrement mes expériences et impressions de ces visites dans des posts sur LinkedIn. Actif sportivement, notamment par la pratique régulière du padel."
      }
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
    let articles = Array.from(this.articles.values());
    
    // Sort by date in descending order (newest first)
    articles.sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0);
      const dateB = new Date(b.publishedAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
    
    if (limit && limit > 0) {
      articles = articles.slice(0, limit);
    }
    
    return articles;
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getCV(language?: string): Promise<CV> {
    if (language && this.cvs[language]) {
      return this.cvs[language];
    }
    
    // Default to English if requested language is not available
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
    const articles = [
      {
        title: "Mastering SQL Window Functions: A Comprehensive Guide",
        slug: "mastering-sql-window-functions",
        authorName: "Mohamed Abdellatif Ayadi",
        tags: ["SQL", "Database", "Programming", "Data Analysis"],
        coverImage: "/images/sql-window-functions.svg",
        publishedAt: new Date("2025-01-15").toISOString(),
        translations: {
          en: {
            title: "Mastering SQL Window Functions: A Comprehensive Guide",
            content: "SQL window functions are one of the most powerful and flexible tools available to analysts and developers working with relational databases...",
            excerpt: "Learn how to leverage SQL window functions for advanced data analysis."
          },
          de: {
            title: "Beherrschung von SQL-Fensterfunktionen: Ein umfassender Leitfaden",
            content: "SQL-Fensterfunktionen sind eines der leistungsstärksten und flexibelsten Werkzeuge für Analysten und Entwickler, die mit relationalen Datenbanken arbeiten...",
            excerpt: "Lernen Sie, wie Sie SQL-Fensterfunktionen für fortgeschrittene Datenanalysen nutzen können."
          },
          fr: {
            title: "Maîtriser les fonctions de fenêtrage SQL : Un guide complet",
            content: "Les fonctions de fenêtrage SQL sont l'un des outils les plus puissants et flexibles disponibles pour les analystes et développeurs travaillant avec des bases de données relationnelles...",
            excerpt: "Apprenez à exploiter les fonctions de fenêtrage SQL pour l'analyse de données avancée."
          }
        }
      },
      {
        title: "SQL Practical Challenge: Salary Analysis",
        slug: "sql-practical-challenge-salary-analysis",
        authorName: "Mohamed Abdellatif Ayadi",
        tags: ["SQL", "Data Analysis", "Window Functions", "Challenge"],
        coverImage: "/images/sql-salary-analysis.svg",
        publishedAt: new Date("2025-02-10").toISOString(),
        translations: {
          en: {
            title: "SQL Practical Challenge: Salary Analysis",
            content: "Recently, I encountered an interesting SQL challenge: The task required using window functions to analyze employee salary data across different departments...",
            excerpt: "Tackle a real-world SQL challenge focused on employee salary analysis."
          },
          de: {
            title: "SQL-Praxisherausforderung: Gehaltsanalyse",
            content: "Kürzlich bin ich auf eine interessante SQL-Herausforderung gestoßen: Die Aufgabe erforderte die Verwendung von Fensterfunktionen, um Mitarbeitergehaltsdaten in verschiedenen Abteilungen zu analysieren...",
            excerpt: "Stellen Sie sich einer realen SQL-Herausforderung zur Mitarbeitergehaltsanalyse."
          },
          fr: {
            title: "Défi SQL Pratique : Analyse des Salaires",
            content: "Récemment, j'ai rencontré un défi SQL intéressant : la tâche nécessitait l'utilisation de fonctions de fenêtrage pour analyser les données de salaire des employés à travers différents départements...",
            excerpt: "Relevez un défi SQL du monde réel axé sur l'analyse des salaires des employés."
          }
        }
      }
    ];

    // Add articles to the storage
    articles.forEach(article => {
      const id = this.currentArticleId++;
      this.articles.set(id, {
        id,
        ...article
      });
    });
  }
}

export const storage = new MemStorage();