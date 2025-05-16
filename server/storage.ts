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
        "I am Mohamed Abdellatif Ayadi, a Computer Science student at the Technical University of Dortmund with hands-on experience as a working student in both sales and software development. Selling with passion, studying with ambition, social engagement with heart – this motto guides me both academically and professionally. I am highly passionate about software development, artificial intelligence, and technological innovation. I am currently seeking a working student position to deepen my practical experience and grow in the areas of development or IT consulting.",
      contact: {
        email: "mohamed.ayadi.data@gmail.com",
        phone: "0152 5230 1739",
        location: "Dortmund, Germany",
        website: "https://github.com/Mayedi007",
        social: [
          { name: "LinkedIn", url: "https://linkedin.com/in/mohamed-abdellatif-ayadi" },
          { name: "GitHub", url: "https://github.com/Mayedi007" }
        ]
      },
      experience: [
        {
          company: "Iperceramica Deutschland GmbH",
          position: "Working Student",
          startDate: "2024-04",
          endDate: "Present",
          description:
            "• Using SAP and SAP S/4HANA to optimize inventory, orders, delivery processes, and complaint handling.\n• Sales: Active customer acquisition in B2B and B2C sectors through targeted outreach and establishing long-term customer relationships. Selling and advising on high-quality tiles, parquet flooring, sanitary ware, and bathroom furniture.\n• Maintaining customer data and partner relationships in CRM and PRM systems to improve communication and collaboration."
        },
        {
          company: "Technical University of Dortmund",
          position: "Student Assistant",
          startDate: "2023-10",
          endDate: "2024-04",
          description:
            "• Served as a student tutor for the course 'Data Structures, Algorithms and Programming 1'.\n• Led tutorials for first-year students focused on object-oriented programming in Java.\n• Supported students with exercises, homework, and exam preparation through structured guidance."
        }
      ],
      education: [
        {
          institution: "Technical University of Dortmund",
          degree: "B.Sc. in Computer Science",
          startDate: "2022-09",
          endDate: "Expected 2027",
          location: "Dortmund, Germany",
          description: ""
        },
        {
          institution: "Goethe Institute Düsseldorf",
          degree: "C1 Language Certificate",
          startDate: "2022-09",
          endDate: "2022-09",
          location: "Düsseldorf, Germany",
          description: "Completed intensive German language course with C1 level certification"
        },
        {
          institution: "Pioneer High School of Sfax (Lycée Pilote de Sfax)",
          degree: "High School Diploma in Mathematics",
          startDate: "2018-09",
          endDate: "2021-07",
          location: "Sfax, Tunisia",
          description: ""
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
          description:
            "Integration of the OpenAI API into my personal portfolio to create an interactive user experience and demonstrate practical skills in API integration and web development.",
          technologies: ["OpenAI API", "React", "Node.js", "Express"],
          url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
        },
        {
          name: "Flash Sale Platform",
          description:
            "Development of a scalable backend platform to manage flash sale events with high user load. Focused on data modeling, transaction security, and performance optimization.",
          technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
          url: "https://github.com/Mayedi007/flash-sale-platform"
        },
        {
          name: "Reddit Data Streaming Pipeline",
          description:
            "Real-time data pipeline to capture and analyze Reddit data streams. Utilized modern data engineering technologies.",
          technologies: ["Python", "Apache Kafka", "Apache Spark", "MongoDB", "AWS"],
          url: "https://github.com/Mayedi007/reddit-data-streaming-pipeline"
        },
        {
          name: "UML Visualization Plugin",
          description:
            "Developed an Eclipse plugin to analyze and visualize the architecture of a flight management system. Focus on identifying critical module dependencies and improving system maintainability.",
          technologies: ["Java", "Eclipse RCP", "UML", "GraphViz"],
          url: "https://github.com/Mayedi007/uml-visualization-plugin"
        }
      ],
      interests: [
        "Reading professional books on finance, technology, and innovation",
        "Attending trade fairs and tech events to explore new innovations",
        "Sharing insights and impressions on LinkedIn",
        "Staying active through regular padel playing"
      ]
    };


    // German CV
    const germanCV = {
      name: "MOHAMED ABDELLATIF AYADI",
      photoUrl: "/images/avatar.png",
      title: "Student der Informatik (B.Sc.) an der Technischen Universität Dortmund",
      summary: "Ich bin Mohamed Abdellatif Ayadi, Informatikstudent an der Technischen Universität Dortmund mit praktischer Erfahrung als Werkstudent im Vertrieb sowie in der Softwareentwicklung. Vertrieb mit Leidenschaft, Studium mit Ehrgeiz, sozialer Einsatz mit Herz – dieses Motto begleitet mich sowohl akademisch als auch beruflich. Mit großer Begeisterung für Softwareentwicklung, Künstliche Intelligenz und technologische Innovationen strebe ich aktuell eine Werkstudentenstelle an, um meine Kenntnisse praxisnah zu vertiefen und mich gezielt in den Bereichen Entwicklung oder IT-Consulting weiterzuentwickeln.",
      contact: {
        email: "mohamed.ayadi.data@gmail.com",
        phone: "0152 5230 1739",
        location: "Dortmund, Deutschland",
        website: "https://github.com/Mayedi007",
        social: [
          { name: "LinkedIn", url: "https://linkedin.com/in/mohamed-abdellatif-ayadi" },
          { name: "GitHub", url: "https://github.com/Mayedi007" }
        ]
      },
      experience: [
        {
          company: "Iperceramica Deutschland GmbH",
          position: "Werkstudent",
          startDate: "2024-04",
          endDate: "Heute",
          description: [
            "Nutzung von SAP und SAP S/4HANA zur Optimierung von Beständen, Aufträgen, Lieferprozessen und der Bearbeitung von Reklamationen.",
            "Vertrieb: Aktive Kundengewinnung im B2B- und B2C-Bereich durch gezielte Akquise und Aufbau langfristiger Kundenbeziehungen. Verkauf und Beratung von hochwertigen Fliesen, Parkett, Sanitär und Badezimmermöbeln.",
            "Pflege von Kundendaten und Partnerbeziehungen in CRM und PRM-Systemen zur Verbesserung der Kommunikation und Zusammenarbeit."
          ]
        },
        {
          company: "Technische Universität Dortmund",
          position: "Studentische Hilfskraft",
          startDate: "2023-10",
          endDate: "2024-04",
          description: [
            "Tutor im Kurs 'Datenstrukturen, Algorithmen und Programmierung 1'.",
            "Organisation und Durchführung von Tutorien mit Fokus auf objektorientierte Programmierung in Java.",
            "Vorbereitung auf Prüfungen, Unterstützung bei Hausaufgaben und Vertiefung der Vorlesungsinhalte."
          ]
        }
      ],
      education: [
        {
          institution: "Technische Universität Dortmund",
          degree: "B.Sc. Informatik",
          startDate: "2022-09",
          endDate: "Voraussichtlich 2027",
          location: "Dortmund, Deutschland",
          description: ""
        },
        {
          institution: "Goethe-Institut Düsseldorf",
          degree: "C1 Sprachkurs",
          startDate: "2022-09",
          endDate: "2022-09",
          location: "Düsseldorf, Deutschland",
          description: "Intensivkurs mit Abschluss auf C1-Niveau"
        },
        {
          institution: "Lycée Pilote de Sfax",
          degree: "Abitur in Mathematik",
          startDate: "2018-09",
          endDate: "2021-07",
          location: "Sfax, Tunesien",
          description: ""
        }
      ],
      skills: [
        {
          category: "Generative KI und Künstliche Intelligenz",
          items: [
            "Entwicklung von KI-Anwendungen mit OpenAI-API",
            "Chatbot-Entwicklung",
            "Data Augmentation",
            "Deep Learning",
            "Forecasting",
            "Maschinelles Lernen"
          ]
        },
        {
          category: "Softwareentwicklung und Backend-Technologien",
          items: [
            "Objektorientierte Programmierung (OOP)",
            "Java",
            "Python",
            "C",
            "Spring Boot",
            "Docker",
            "API-Entwicklung",
            "MySQL"
          ]
        },
        {
          category: "Datenengineering und Datenanalyse",
          items: [
            "Echtzeit-Datenpipelines",
            "Data Warehousing",
            "Zeitreihenanalyse",
            "ETL-Prozesse",
            "Big Data Grundlagen"
          ]
        },
        {
          category: "Werkzeuge und Plattformen",
          items: [
            "GitLab",
            "Eclipse",
            "Microsoft Visual Studio",
            "Linux-Systemadministration"
          ]
        },
        {
          category: "Vertrieb und Business-Kompetenzen",
          items: [
            "SAP",
            "SAP S/4HANA",
            "CRM-Systeme",
            "B2B/B2C-Kundenakquise",
            "Kommunikation und Beziehungsmanagement"
          ]
        }
      ],
      languages: [
        { name: "Deutsch", proficiency: "Fließend bis verhandlungssicher" },
        { name: "Englisch", proficiency: "Fließend bis verhandlungssicher" },
        { name: "Französisch", proficiency: "Muttersprache" },
        { name: "Arabisch", proficiency: "Muttersprache" },
        { name: "Italienisch", proficiency: "Grundkenntnisse" }
      ],
      projects: [
        {
          name: "KI-gestützter Chatbot",
          description: "Integration der OpenAI API in mein Portfolio zur Demonstration interaktiver Funktionen und technischer Umsetzung.",
          technologies: ["OpenAI API", "React", "Node.js", "Express"],
          url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
        },
        {
          name: "Flash Sale Plattform",
          description: "Backend-System zur Verwaltung von Flash-Sales mit Fokus auf Skalierbarkeit, Performance und Transaktionssicherheit.",
          technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
          url: "https://github.com/Mayedi007/flash-sale-platform"
        },
        {
          name: "Reddit Data Streaming Pipeline",
          description: "Pipeline zur Analyse von Reddit-Datenströmen in Echtzeit unter Einsatz moderner Data-Engineering-Technologien.",
          technologies: ["Python", "Kafka", "Spark", "MongoDB", "AWS"],
          url: "https://github.com/Mayedi007/reddit-data-streaming-pipeline"
        },
        {
          name: "UML Visualisierungs-Plugin",
          description: "Eclipse Plugin zur Analyse der Architektur eines Flugmanagementsystems mit Fokus auf Wartbarkeit.",
          technologies: ["Java", "Eclipse RCP", "UML", "GraphViz"],
          url: "https://github.com/Mayedi007/uml-visualization-plugin"
        }
      ],
      interests: [
        "Fachbücher über Finanzen, Technologie und Innovation lesen",
        "Teilnahme an Messen und Events zur Entdeckung neuer Technologien",
        "Teilen von Eindrücken auf LinkedIn",
        "Padel spielen"
      ]
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
        title: "Mastering SQL Window Functions: A Comprehensive Guide",
        excerpt: "Learn how to harness the power of SQL window functions for sophisticated data analysis.",
        content: "SQL window functions are one of the most powerful and flexible tools available to analysts and developers.",
        coverImage: "/images/sql-window.svg",
        category: "Database",
        publishedAt: new Date("2025-05-12"),
        translations: {
          en: {
            title: "Mastering SQL Window Functions: A Comprehensive Guide",
            content: "SQL window functions are one of the most powerful and flexible tools available to analysts and developers. They allow for sophisticated calculations across rows of data while preserving the individual rows, which makes them ideal for a wide range of use cases, from ranking and cumulative sums to moving averages and comparisons.\n\nThis blog post provides a detailed overview of all major window functions using the Employees table as an example.\n\n-- Create the table\nCREATE TABLE Employees (\n    ID INT PRIMARY KEY,\n    Name VARCHAR(100),\n    DivisionID INT,\n    ManagerID INT,\n    Salary DECIMAL(10, 2)\n);\n\n-- Insert data into the Employees table\nINSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)\nVALUES\n(356, 'Daniel Smith', 100, 133, 40000),\n(122, 'Arnold Sully', 101, NULL, 60000),\n(467, 'Lisa Roberts', 100, NULL, 80000),\n(112, 'Mary Dial', 105, 467, 65000),\n(775, 'Dennis Front', 103, NULL, 90000),\n(111, 'Larry Weis', 104, 35534, 75000),\n(222, 'Mark Red', 102, 133, 86000),\n(577, 'Robert Night', 105, 12353, 76000),\n(133, 'Susan Wall', 105, 577, 110000);\nWhat Are SQL Window Functions?\n#\n\nSQL window functions operate on a set of rows, known as a \"window,\" defined by the OVER() clause. Unlike aggregate functions such as SUM() or COUNT(), window functions return a result for each row in the dataset, making them incredibly powerful for detailed analysis that requires both individual row-level calculations and group-level operations.\n\nSyntax Overview\n#\n\nThe general syntax of a window function looks like this:\n\n<window_function>() OVER (\n    [PARTITION BY column1, column2, ...]\n    [ORDER BY column3, column4, ...]\n)\n<window_function>: The window function (e.g., ROW_NUMBER(), SUM(), RANK(), etc.).\nPARTITION BY: Divides the dataset into partitions (optional).\nORDER BY: Specifies the ordering of rows within each partition (optional).\nOVER(): Defines the window of rows for the function.\nKey SQL Window Functions\n#\n\n1. Ranking Functions\n#\n\nRanking functions are useful when you want to assign a rank to each row within a partition. They are commonly used in scenarios such as leaderboard generation or employee salary rankings.\n\nROW_NUMBER()\n#\n\nGenerates a unique number for each row in the partition. Example:\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank\nFROM Employees;\nThis query ranks employees in each department by their salary in descending order.\n\nRANK()\n#\n\nAssigns a rank to each row, but leaves gaps when there are ties. The next rank is skipped for rows with the same value. Example:\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank\nFROM Employees;\nIf two employees have the same salary, they will have the same rank, and the next rank will be skipped.\n\nDENSE_RANK()\n#\n\nSimilar to RANK(), but without gaps in ranking. All rows with the same value receive the same rank, but subsequent ranks are not skipped. Example:\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    DENSE_RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank\nFROM Employees;\nThe query results are same and will be:\n\nDivisionID\tName\tSalary\tSalaryRank\n100\tLisa Roberts\t80000.00\t1\n100\tDaniel Smith\t40000.00\t2\n101\tArnold Sully\t60000.00\t1\n102\tMark Red\t86000.00\t1\n103\tDennis Front\t90000.00\t1\n104\tLarry Weis\t75000.00\t1\n105\tSusan Wall\t110000.00\t1\n105\tRobert Night\t76000.00\t2\n105\tMary Dial\t65000.00\t3\n2. Aggregate Functions (Windowed)\n#\n\nWindow functions can be combined with aggregate functions, allowing you to calculate values like running totals or averages without collapsing the rows into a single result.\n\nSUM()\n#\n\nCalculates the cumulative sum over a window of rows. Example:\n\nSELECT employee_id, salary,\n       SUM(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS cumulative_salary\nFROM employees;\nThis query calculates the cumulative salary for each employee in each department.\n\nDivisionID\tName\tSalary\tCumulativeSalary\n100\tLisa Roberts\t80000.00\t80000.00\n100\tDaniel Smith\t40000.00\t120000.00\n101\tArnold Sully\t60000.00\t60000.00\n102\tMark Red\t86000.00\t86000.00\n103\tDennis Front\t90000.00\t90000.00\n104\tLarry Weis\t75000.00\t75000.00\n105\tSusan Wall\t110000.00\t110000.00\n105\tRobert Night\t76000.00\t186000.00\n105\tMary Dial\t65000.00\t251000.00\nAVG()\n#\n\nCalculates the average salary for employees in each department. Example:\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    AVG(Salary) OVER (PARTITION BY DivisionID) AS AvgSalary\nFROM Employees;\nDivisionID\tName\tSalary\tAvgSalary\n100\tDaniel Smith\t40000.00\t60000.000000\n100\tLisa Roberts\t80000.00\t60000.000000\n101\tArnold Sully\t60000.00\t60000.000000\n102\tMark Red\t86000.00\t86000.000000\n103\tDennis Front\t90000.00\t90000.000000\n104\tLarry Weis\t75000.00\t75000.000000\n105\tMary Dial\t65000.00\t83666.666667\n105\tSusan Wall\t110000.00\t83666.666667\n105\tRobert Night\t76000.00\t83666.666667\nCOUNT()\n#\n\nCounts the number of rows in the window. Example:\n\nSELECT\n    DivisionID,\n    Name,\n    COUNT(*) OVER (PARTITION BY DivisionID) AS EmployeeCount\nFROM Employees;\nDivisionID\tName\tEmployeeCount\n100\tDaniel Smith\t2\n100\tLisa Roberts\t2\n101\tArnold Sully\t1\n102\tMark Red\t1\n103\tDennis Front\t1\n104\tLarry Weis\t1\n105\tMary Dial\t3\n105\tSusan Wall\t3\n105\tRobert Night\t3\nMAX() / MIN()\n#\n\nReturns the maximum or minimum value in a window. Example: Find the highest salary in each department.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    MAX(Salary) OVER (PARTITION BY DivisionID) AS MaxSalary\nFROM Employees;\nDivisionID\tName\tSalary\tMaxSalary\n100\tDaniel Smith\t40000.00\t80000.00\n100\tLisa Roberts\t80000.00\t80000.00\n101\tArnold Sully\t60000.00\t60000.00\n102\tMark Red\t86000.00\t86000.00\n103\tDennis Front\t90000.00\t90000.00\n104\tLarry Weis\t75000.00\t75000.00\n105\tMary Dial\t65000.00\t110000.00\n105\tSusan Wall\t110000.00\t110000.00\n105\tRobert Night\t76000.00\t110000.00\n3. Window-Based Row Navigation\n#\n\nThese functions allow you to reference values from previous or next rows, which is especially useful for calculating differences, moving averages, or time-based comparisons.\n\nLAG()\n#\n\nReturns the value of a specified column from a previous row in the same partition. Example: Find the previous salary in each department.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    LAG(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS PreviousSalary\nFROM Employees;\nDivisionID\tName\tSalary\tPreviousSalary\n100\tLisa Roberts\t80000.00\t\n100\tDaniel Smith\t40000.00\t80000.00\n101\tArnold Sully\t60000.00\t\n102\tMark Red\t86000.00\t\n103\tDennis Front\t90000.00\t\n104\tLarry Weis\t75000.00\t\n105\tSusan Wall\t110000.00\t\n105\tRobert Night\t76000.00\t110000.00\n105\tMary Dial\t65000.00\t76000.00\nLEAD()\n#\n\nReturns the value of a specified column from a subsequent row in the same partition. Example: Find the next salary in each department.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    LEAD(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS NextSalary\nFROM Employees;\nDivisionID\tName\tSalary\tNextSalary\n100\tLisa Roberts\t80000.00\t40000.00\n100\tDaniel Smith\t40000.00\t\n101\tArnold Sully\t60000.00\t\n102\tMark Red\t86000.00\t\n103\tDennis Front\t90000.00\t\n104\tLarry Weis\t75000.00\t\n105\tSusan Wall\t110000.00\t76000.00\n105\tRobert Night\t76000.00\t65000.00\n105\tMary Dial\t65000.00\t\n4. First and Last Value Functions\n#\n\nThese functions return the first or last value in a window.\n\nFIRST_VALUE()\n#\n\nReturns the first value in the window. Example: Find the highest-paid employee in each department.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    FIRST_VALUE(Name) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS TopEarner\nFROM Employees;\nDivisionID\tName\tSalary\tTopEarner\n100\tLisa Roberts\t80000.00\tLisa Roberts\n100\tDaniel Smith\t40000.00\tLisa Roberts\n101\tArnold Sully\t60000.00\tArnold Sully\n102\tMark Red\t86000.00\tMark Red\n103\tDennis Front\t90000.00\tDennis Front\n104\tLarry Weis\t75000.00\tLarry Weis\n105\tSusan Wall\t110000.00\tSusan Wall\n105\tRobert Night\t76000.00\tSusan Wall\n105\tMary Dial\t65000.00\tSusan Wall\nLAST_VALUE()\n#\n\nReturns the last value in the window. Example: Find the lowest-paid employee in each department.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    LAST_VALUE(Name) OVER (PARTITION BY DivisionID ORDER BY Salary ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS LowestEarner\nFROM Employees;\nDivisionID\tName\tSalary\tLowestEarner\n100\tDaniel Smith\t40000.00\tLisa Roberts\n100\tLisa Roberts\t80000.00\tLisa Roberts\n101\tArnold Sully\t60000.00\tArnold Sully\n102\tMark Red\t86000.00\tMark Red\n103\tDennis Front\t90000.00\tDennis Front\n104\tLarry Weis\t75000.00\tLarry Weis\n105\tMary Dial\t65000.00\tSusan Wall\n105\tRobert Night\t76000.00\tSusan Wall\n105\tSusan Wall\t110000.00\tSusan Wall\n5. Windowing Clauses (ROWS and RANGE)\n#\n\nIn SQL, the ROWS and RANGE clauses let you specify the exact set of rows that make up the window. This is particularly useful for time-series analysis or when comparing a specific range of rows.\n\nROWS Example\n#\n\nDefines the window in terms of physical rows (e.g., the current row and the previous 2 rows). Example: Calculate a moving average of salaries for each department.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    AVG(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary ASC ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS MovingAvg\nFROM Employees;\nDivisionID\tName\tSalary\tMovingAvg\n100\tDaniel Smith\t40000.00\t40000.000000\n100\tLisa Roberts\t80000.00\t60000.000000\n101\tArnold Sully\t60000.00\t60000.000000\n102\tMark Red\t86000.00\t86000.000000\n103\tDennis Front\t90000.00\t90000.000000\n104\tLarry Weis\t75000.00\t75000.000000\n105\tMary Dial\t65000.00\t65000.000000\n105\tRobert Night\t76000.00\t70500.000000\n105\tSusan Wall\t110000.00\t93000.000000\nCommon Use Cases for Window Functions\n#\n\n1. Cumulative Calculations\n#\n\nYou can calculate running totals, averages, or other aggregate values that accumulate over a set of rows.\n\n2. Ranking and Sorting\n#\n\nRanking employees, products, or sales figures is a common use case for window functions, especially when dealing with ties and top-N queries.\n\n3. Time-Series Analysis\n#\n\nFor applications involving time-series data, window functions like LAG() and LEAD() are essential for calculating differences over time (e.g., month-over-month growth).\n\n4. Comparative Analysis\n#\n\nWindow functions enable comparisons between rows, such as comparing each employee's salary to the one before or after them in the same department.\n\nConclusion\n#\n\nSQL window functions are incredibly powerful tools that enable sophisticated data analysis without collapsing your dataset. Whether you need to rank items, calculate running totals, or compare rows within partitions, window functions provide a flexible and efficient way to handle these tasks.",
            excerpt: "Learn how to harness the power of SQL window functions for sophisticated data analysis."
          },
          de: {
            title: "Beherrschung von SQL-Fensterfunktionen: Ein umfassender Leitfaden",
            content: "SQL-Fensterfunktionen sind eines der leistungsstärksten und flexibelsten Werkzeuge für Analysten und Entwickler. Sie ermöglichen komplexe Berechnungen über Datenzeilen hinweg, wobei die einzelnen Zeilen erhalten bleiben, was sie ideal für eine Vielzahl von Anwendungsfällen macht, von Ranking und kumulativen Summen bis hin zu gleitenden Durchschnitten und Vergleichen.\n\nDieser Blogbeitrag bietet einen detaillierten Überblick über alle wichtigen Fensterfunktionen am Beispiel der Employees-Tabelle.\n\n-- Tabelle erstellen\nCREATE TABLE Employees (\n    ID INT PRIMARY KEY,\n    Name VARCHAR(100),\n    DivisionID INT,\n    ManagerID INT,\n    Salary DECIMAL(10, 2)\n);\n\n-- Daten in die Employees-Tabelle einfügen\nINSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)\nVALUES\n(356, 'Daniel Smith', 100, 133, 40000),\n(122, 'Arnold Sully', 101, NULL, 60000),\n(467, 'Lisa Roberts', 100, NULL, 80000),\n(112, 'Mary Dial', 105, 467, 65000),\n(775, 'Dennis Front', 103, NULL, 90000),\n(111, 'Larry Weis', 104, 35534, 75000),\n(222, 'Mark Red', 102, 133, 86000),\n(577, 'Robert Night', 105, 12353, 76000),\n(133, 'Susan Wall', 105, 577, 110000);\nWas sind SQL-Fensterfunktionen?\n#\n\nSQL-Fensterfunktionen operieren auf einer Menge von Zeilen, bekannt als \"Fenster\", die durch die OVER()-Klausel definiert wird. Im Gegensatz zu Aggregatfunktionen wie SUM() oder COUNT() geben Fensterfunktionen ein Ergebnis für jede Zeile im Datensatz zurück, was sie unglaublich leistungsstark für detaillierte Analysen macht, die sowohl Berechnungen auf Zeilenebene als auch Operationen auf Gruppenebene erfordern.\n\nSyntax-Überblick\n#\n\nDie allgemeine Syntax einer Fensterfunktion sieht wie folgt aus:\n\n<window_function>() OVER (\n    [PARTITION BY column1, column2, ...]\n    [ORDER BY column3, column4, ...]\n)\n<window_function>: Die Fensterfunktion (z.B. ROW_NUMBER(), SUM(), RANK(), etc.).\nPARTITION BY: Teilt den Datensatz in Partitionen (optional).\nORDER BY: Gibt die Sortierung der Zeilen innerhalb jeder Partition an (optional).\nOVER(): Definiert das Fenster der Zeilen für die Funktion.\nWichtige SQL-Fensterfunktionen\n#\n\n1. Ranking-Funktionen\n#\n\nRanking-Funktionen sind nützlich, wenn Sie jeder Zeile innerhalb einer Partition einen Rang zuweisen möchten. Sie werden häufig in Szenarien wie der Generierung von Bestenlisten oder Gehaltsrankings von Mitarbeitern verwendet.\n\nROW_NUMBER()\n#\n\nGeneriert eine eindeutige Nummer für jede Zeile in der Partition. Beispiel:\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank\nFROM Employees;\nDiese Abfrage ordnet Mitarbeiter in jeder Abteilung nach ihrem Gehalt in absteigender Reihenfolge.\n\nRANK()\n#\n\nWeist jeder Zeile einen Rang zu, lässt aber Lücken, wenn es Gleichstände gibt. Der nächste Rang wird bei Zeilen mit gleichem Wert übersprungen. Beispiel:\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank\nFROM Employees;\nWenn zwei Mitarbeiter das gleiche Gehalt haben, haben sie den gleichen Rang, und der nächste Rang wird übersprungen.\n\nDENSE_RANK()\n#\n\nÄhnlich wie RANK(), aber ohne Lücken im Ranking. Alle Zeilen mit dem gleichen Wert erhalten den gleichen Rang, aber nachfolgende Ränge werden nicht übersprungen. Beispiel:\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    DENSE_RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank\nFROM Employees;\nDie Abfrageergebnisse sind gleich und lauten:\n\nDivisionID\tName\tSalary\tSalaryRank\n100\tLisa Roberts\t80000.00\t1\n100\tDaniel Smith\t40000.00\t2\n101\tArnold Sully\t60000.00\t1\n102\tMark Red\t86000.00\t1\n103\tDennis Front\t90000.00\t1\n104\tLarry Weis\t75000.00\t1\n105\tSusan Wall\t110000.00\t1\n105\tRobert Night\t76000.00\t2\n105\tMary Dial\t65000.00\t3\n2. Aggregatfunktionen (gefenstert)\n#\n\nFensterfunktionen können mit Aggregatfunktionen kombiniert werden, wodurch Sie Werte wie laufende Summen oder Durchschnittswerte berechnen können, ohne die Zeilen zu einem einzelnen Ergebnis zusammenzufassen.\n\nSUM()\n#\n\nBerechnet die kumulative Summe über ein Fenster von Zeilen. Beispiel:\n\nSELECT employee_id, salary,\n       SUM(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS cumulative_salary\nFROM employees;\nDiese Abfrage berechnet das kumulative Gehalt für jeden Mitarbeiter in jeder Abteilung.\n\nDivisionID\tName\tSalary\tCumulativeSalary\n100\tLisa Roberts\t80000.00\t80000.00\n100\tDaniel Smith\t40000.00\t120000.00\n101\tArnold Sully\t60000.00\t60000.00\n102\tMark Red\t86000.00\t86000.00\n103\tDennis Front\t90000.00\t90000.00\n104\tLarry Weis\t75000.00\t75000.00\n105\tSusan Wall\t110000.00\t110000.00\n105\tRobert Night\t76000.00\t186000.00\n105\tMary Dial\t65000.00\t251000.00\nAVG()\n#\n\nBerechnet das durchschnittliche Gehalt für Mitarbeiter in jeder Abteilung. Beispiel:\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    AVG(Salary) OVER (PARTITION BY DivisionID) AS AvgSalary\nFROM Employees;\nDivisionID\tName\tSalary\tAvgSalary\n100\tDaniel Smith\t40000.00\t60000.000000\n100\tLisa Roberts\t80000.00\t60000.000000\n101\tArnold Sully\t60000.00\t60000.000000\n102\tMark Red\t86000.00\t86000.000000\n103\tDennis Front\t90000.00\t90000.000000\n104\tLarry Weis\t75000.00\t75000.000000\n105\tMary Dial\t65000.00\t83666.666667\n105\tSusan Wall\t110000.00\t83666.666667\n105\tRobert Night\t76000.00\t83666.666667\nCOUNT()\n#\n\nZählt die Anzahl der Zeilen im Fenster. Beispiel:\n\nSELECT\n    DivisionID,\n    Name,\n    COUNT(*) OVER (PARTITION BY DivisionID) AS EmployeeCount\nFROM Employees;\nDivisionID\tName\tEmployeeCount\n100\tDaniel Smith\t2\n100\tLisa Roberts\t2\n101\tArnold Sully\t1\n102\tMark Red\t1\n103\tDennis Front\t1\n104\tLarry Weis\t1\n105\tMary Dial\t3\n105\tSusan Wall\t3\n105\tRobert Night\t3\nMAX() / MIN()\n#\n\nGibt den maximalen oder minimalen Wert in einem Fenster zurück. Beispiel: Finden Sie das höchste Gehalt in jeder Abteilung.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    MAX(Salary) OVER (PARTITION BY DivisionID) AS MaxSalary\nFROM Employees;\nDivisionID\tName\tSalary\tMaxSalary\n100\tDaniel Smith\t40000.00\t80000.00\n100\tLisa Roberts\t80000.00\t80000.00\n101\tArnold Sully\t60000.00\t60000.00\n102\tMark Red\t86000.00\t86000.00\n103\tDennis Front\t90000.00\t90000.00\n104\tLarry Weis\t75000.00\t75000.00\n105\tMary Dial\t65000.00\t110000.00\n105\tSusan Wall\t110000.00\t110000.00\n105\tRobert Night\t76000.00\t110000.00\n3. Fensterbasierte Zeilennavigation\n#\n\nDiese Funktionen ermöglichen es Ihnen, auf Werte aus vorherigen oder nächsten Zeilen zu verweisen, was besonders für die Berechnung von Differenzen, gleitenden Durchschnitten oder zeitbasierten Vergleichen nützlich ist.\n\nLAG()\n#\n\nGibt den Wert einer angegebenen Spalte aus einer vorherigen Zeile in derselben Partition zurück. Beispiel: Finden Sie das vorherige Gehalt in jeder Abteilung.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    LAG(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS PreviousSalary\nFROM Employees;\nDivisionID\tName\tSalary\tPreviousSalary\n100\tLisa Roberts\t80000.00\t\n100\tDaniel Smith\t40000.00\t80000.00\n101\tArnold Sully\t60000.00\t\n102\tMark Red\t86000.00\t\n103\tDennis Front\t90000.00\t\n104\tLarry Weis\t75000.00\t\n105\tSusan Wall\t110000.00\t\n105\tRobert Night\t76000.00\t110000.00\n105\tMary Dial\t65000.00\t76000.00\nLEAD()\n#\n\nGibt den Wert einer angegebenen Spalte aus einer nachfolgenden Zeile in derselben Partition zurück. Beispiel: Finden Sie das nächste Gehalt in jeder Abteilung.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    LEAD(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS NextSalary\nFROM Employees;\nDivisionID\tName\tSalary\tNextSalary\n100\tLisa Roberts\t80000.00\t40000.00\n100\tDaniel Smith\t40000.00\t\n101\tArnold Sully\t60000.00\t\n102\tMark Red\t86000.00\t\n103\tDennis Front\t90000.00\t\n104\tLarry Weis\t75000.00\t\n105\tSusan Wall\t110000.00\t76000.00\n105\tRobert Night\t76000.00\t65000.00\n105\tMary Dial\t65000.00\t\n4. Erste und Letzte Wertfunktionen\n#\n\nDiese Funktionen geben den ersten oder letzten Wert in einem Fenster zurück.\n\nFIRST_VALUE()\n#\n\nGibt den ersten Wert im Fenster zurück. Beispiel: Finden Sie den bestbezahlten Mitarbeiter in jeder Abteilung.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    FIRST_VALUE(Name) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS TopEarner\nFROM Employees;\nDivisionID\tName\tSalary\tTopEarner\n100\tLisa Roberts\t80000.00\tLisa Roberts\n100\tDaniel Smith\t40000.00\tLisa Roberts\n101\tArnold Sully\t60000.00\tArnold Sully\n102\tMark Red\t86000.00\tMark Red\n103\tDennis Front\t90000.00\tDennis Front\n104\tLarry Weis\t75000.00\tLarry Weis\n105\tSusan Wall\t110000.00\tSusan Wall\n105\tRobert Night\t76000.00\tSusan Wall\n105\tMary Dial\t65000.00\tSusan Wall\nLAST_VALUE()\n#\n\nGibt den letzten Wert im Fenster zurück. Beispiel: Finden Sie den am niedrigsten bezahlten Mitarbeiter in jeder Abteilung.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    LAST_VALUE(Name) OVER (PARTITION BY DivisionID ORDER BY Salary ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS LowestEarner\nFROM Employees;\nDivisionID\tName\tSalary\tLowestEarner\n100\tDaniel Smith\t40000.00\tLisa Roberts\n100\tLisa Roberts\t80000.00\tLisa Roberts\n101\tArnold Sully\t60000.00\tArnold Sully\n102\tMark Red\t86000.00\tMark Red\n103\tDennis Front\t90000.00\tDennis Front\n104\tLarry Weis\t75000.00\tLarry Weis\n105\tMary Dial\t65000.00\tSusan Wall\n105\tRobert Night\t76000.00\tSusan Wall\n105\tSusan Wall\t110000.00\tSusan Wall\n5. Fensterbedingungen (ROWS und RANGE)\n#\n\nIn SQL erlauben die Klauseln ROWS und RANGE, die genaue Menge an Zeilen anzugeben, die das Fenster bilden. Dies ist besonders nützlich für Zeitreihenanalysen oder wenn Sie einen bestimmten Bereich von Zeilen vergleichen möchten.\n\nROWS-Beispiel\n#\n\nDefiniert das Fenster in Bezug auf physische Zeilen (z.B. die aktuelle Zeile und die vorherigen 2 Zeilen). Beispiel: Berechnen Sie einen gleitenden Durchschnitt der Gehälter für jede Abteilung.\n\nSELECT\n    DivisionID,\n    Name,\n    Salary,\n    AVG(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary ASC ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS MovingAvg\nFROM Employees;\nDivisionID\tName\tSalary\tMovingAvg\n100\tDaniel Smith\t40000.00\t40000.000000\n100\tLisa Roberts\t80000.00\t60000.000000\n101\tArnold Sully\t60000.00\t60000.000000\n102\tMark Red\t86000.00\t86000.000000\n103\tDennis Front\t90000.00\t90000.000000\n104\tLarry Weis\t75000.00\t75000.000000\n105\tMary Dial\t65000.00\t65000.000000\n105\tRobert Night\t76000.00\t70500.000000\n105\tSusan Wall\t110000.00\t93000.000000\nHäufige Anwendungsfälle für Fensterfunktionen\n#\n\n1. Kumulative Berechnungen\n#\n\nSie können laufende Summen, Durchschnittswerte oder andere Aggregatwerte berechnen, die sich über eine Menge von Zeilen ansammeln.\n\n2. Ranking und Sortierung\n#\n\nDas Ranking von Mitarbeitern, Produkten oder Verkaufszahlen ist ein häufiger Anwendungsfall für Fensterfunktionen, insbesondere bei Gleichständen und Top-N-Abfragen.\n\n3. Zeitreihenanalyse\n#\n\nFür Anwendungen mit Zeitreihendaten sind Fensterfunktionen wie LAG() und LEAD() essentiell für die Berechnung von Differenzen über die Zeit (z.B. monatliches Wachstum).\n\n4. Vergleichende Analyse\n#\n\nFensterfunktionen ermöglichen Vergleiche zwischen Zeilen, wie den Vergleich des Gehalts jedes Mitarbeiters mit dem des vorherigen oder nachfolgenden Mitarbeiters in derselben Abteilung.\n\nFazit\n#\n\nSQL-Fensterfunktionen sind unglaublich leistungsstarke Werkzeuge, die eine anspruchsvolle Datenanalyse ermöglichen, ohne Ihren Datensatz zu reduzieren. Ob Sie Elemente ranken, laufende Summen berechnen oder Zeilen innerhalb von Partitionen vergleichen müssen, Fensterfunktionen bieten einen flexiblen und effizienten Weg, diese Aufgaben zu bewältigen.",
            excerpt: "Lernen Sie, wie Sie die Leistungsfähigkeit von SQL-Fensterfunktionen für anspruchsvolle Datenanalysen nutzen können."
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