import {
  users,
  type User,
  type InsertUser,
  type Article,
  type CV,
  type ContactMessage,
  type NewsletterSubscription,
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

    this.cv = {
      name: "MOHAMED ABDELLATIF AYADI",
      photoUrl: "/images/avatar.png",
      title: "Full Stack Developer",
      summary:
        "Experienced Full Stack Developer with over 7 years of expertise building high-performance applications. Proficient in TypeScript, React, Node.js, and cloud technologies.",
      contact: {
        email: "contact@mohamedayadi.com",
        phone: "+49 123 4567890",
        website: "https://mohamedayadi.com",
        location: "Berlin, Germany",
        social: [
          { name: "LinkedIn", url: "https://linkedin.com/in/mayedi" },
          { name: "GitHub", url: "https://github.com/Mayedi007" },
          { name: "Twitter", url: "https://twitter.com/MohamedAyadi" },
        ],
      },
      experience: [
        {
          company: "TechVision GmbH",
          position: "Senior Full Stack Developer",
          startDate: "2022-03",
          endDate: "Present",
          description:
            "Leading development of cloud-native applications using React, Node.js, and AWS. Implemented CI/CD pipelines and mentored junior developers.",
          highlights: [
            "Reduced API response time by 40% through performance optimization",
            "Implemented serverless architecture that reduced operational costs by 30%",
            "Led a team of 5 developers to deliver projects consistently ahead of schedule",
          ],
        },
        {
          company: "InnoSoft Solutions",
          position: "Full Stack Developer",
          startDate: "2019-01",
          endDate: "2022-02",
          description:
            "Developed and maintained web applications for enterprise clients. Worked with React, Express, MongoDB, and Docker.",
          highlights: [
            "Built responsive dashboards for data visualization",
            "Integrated third-party APIs for payment processing and authentication",
            "Migrated legacy applications to modern tech stacks",
          ],
        },
        {
          company: "DataFlow Systems",
          position: "Frontend Developer",
          startDate: "2017-07",
          endDate: "2018-12",
          description:
            "Created user interfaces for data-intensive applications. Specialized in Angular and D3.js for data visualization.",
          highlights: [
            "Developed interactive charts and graphs for financial data analysis",
            "Implemented accessibility improvements across all applications",
            "Reduced bundle size by 35% through code optimization",
          ],
        },
      ],
      education: [
        {
          institution: "Technical University of Munich",
          degree: "Master of Science in Computer Science",
          startDate: "2015",
          endDate: "2017",
          description:
            "Specialized in Distributed Systems and Web Technologies. Thesis: 'Scalable Microservices Architecture for Real-time Applications'.",
        },
        {
          institution: "University of Tunis",
          degree: "Bachelor of Science in Computer Engineering",
          startDate: "2012",
          endDate: "2015",
          description:
            "Graduated with honors. Focus on Software Engineering and Database Systems.",
        },
      ],
      skills: [
        {
          category: "Programming Languages",
          items: [
            "TypeScript",
            "JavaScript",
            "Python",
            "Java",
            "SQL",
            "HTML/CSS",
          ],
        },
        {
          category: "Frameworks & Libraries",
          items: [
            "React",
            "Node.js",
            "Express",
            "Angular",
            "Next.js",
            "Tailwind CSS",
            "Material UI",
          ],
        },
        {
          category: "Databases",
          items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "DynamoDB"],
        },
        {
          category: "Cloud & DevOps",
          items: [
            "AWS",
            "Docker",
            "Kubernetes",
            "CI/CD",
            "Git",
            "GitHub Actions",
            "Terraform",
          ],
        },
      ],
      certifications: [
        {
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          date: "2023",
          expires: "2026",
        },
        {
          name: "Professional Scrum Master I",
          issuer: "Scrum.org",
          date: "2022",
        },
        {
          name: "MongoDB Certified Developer",
          issuer: "MongoDB, Inc.",
          date: "2021",
        },
      ],
      languages: [
        { language: "English", proficiency: "Fluent" },
        { language: "German", proficiency: "Professional" },
        { language: "French", proficiency: "Native" },
        { language: "Arabic", proficiency: "Native" },
      ],
      projects: [
        {
          name: "HealthTracker Pro",
          description:
            "A comprehensive health monitoring application with wearable device integration.",
          technologies: ["React Native", "Node.js", "MongoDB", "WebSockets"],
          url: "https://github.com/Mayedi007/health-tracker",
        },
        {
          name: "CloudBudget",
          description:
            "An AWS cost management and optimization platform for businesses.",
          technologies: [
            "React",
            "AWS Lambda",
            "DynamoDB",
            "Serverless Framework",
          ],
          url: "https://github.com/Mayedi007/cloud-budget",
        },
      ],
    };

    // Multilingual CVs
    this.cvs = {
      en: this.cv,
      de: {
        ...this.cv,
        name: "MOHAMED ABDELLATIF AYADI",
        title: "Student der Informatik (B.Sc.) an der Technischen Universität Dortmund",
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
        summary:
          "Ich bin Mohamed Abdellatif Ayadi, Informatikstudent an der Technischen Universität Dortmund mit praktischer Erfahrung als Werkstudent im Vertrieb sowie in der Softwareentwicklung. Vertrieb mit Leidenschaft, Studium mit Ehrgeiz, sozialer Einsatz mit Herz – dieses Motto begleitet mich sowohl akademisch als auch beruflich. Mit großer Begeisterung für Softwareentwicklung, Künstliche Intelligenz und technologische Innovationen strebe ich aktuell eine Werkstudentenstelle an, um meine Kenntnisse praxisnah zu vertiefen und mich gezielt in den Bereichen Entwicklung oder IT-Consulting weiterzuentwickeln.",
        experience: [
          {
            company: "Iperceramica Deutschland GmbH",
            position: "Werkstudent",
            startDate: "2024-04",
            endDate: "Heute",
            description:
              "• Nutzung von SAP und SAP S/4HANA zur Optimierung von Beständen, Aufträgen, Lieferprozessen und der Bearbeitung von Reklamationen.\n• Vertrieb: Aktive Kundengewinnung im B2B- und B2C-Bereich durch gezielte Akquise und Aufbau langfristiger Kundenbeziehungen. Verkauf und Beratung von hochwertigen Fliesen, Parkett, Sanitär und Badezimmermöbeln.\n• Pflege von Kundendaten und Partnerbeziehungen in CRM und PRM-Systemen, zur Verbesserung der Kommunikation und Zusammenarbeit."
          },
          {
            company: "Technische Universität Dortmund",
            position: "Studentische Hilfskraft",
            startDate: "2023-10",
            endDate: "2024-04",
            description:
              "• Übernahme der Position eines studentischen Tutors für den Kurs \"Datenstrukturen, Algorithmen und Programmierung 1\" als Minijob.\n• Organisation und Durchführung von Tutorien für Erstsemester-Studierende mit Fokus auf objektorientierte Programmierung in Java.\n• Aufgaben umfassten praktische Programmierübungen, Vertiefung und Erweiterung der Vorlesungsinhalte, Hausaufgabenbetreuung sowie gezielte Vorbereitung auf Prüfungen und Strategieplanung."
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
            degree: "Intensiver Deutsch-Sprachkurs",
            startDate: "2021-07",
            endDate: "2022-09",
            location: "Düsseldorf, Deutschland",
            description: "Abschluss auf C1-Niveau"
          },
          {
            institution: "Pioneer High School of Sfax (Lycée Pilote de Sfax)",
            degree: "Abitur im Fach Mathematik",
            startDate: "2018-09",
            endDate: "2021-07",
            location: "Sfax, Tunesien"
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
              "C-Programmierung",
              "Spring Boot",
              "Docker",
              "API-Entwicklung",
              "Datenbankdesign (MySQL)"
            ]
          },
          {
            category: "Datenengineering und Datenanalyse",
            items: [
              "Echtzeit-Datenpipelines",
              "Data Warehousing",
              "Zeitreihenanalyse (Time Series Forecasting)",
              "ETL-Prozesse",
              "Grundkenntnisse in Big Data"
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
              "Kundenakquise B2B/B2C",
              "Kommunikation und Beziehungsmanagement"
            ]
          }
        ],
        languages: [
          {
            name: "Deutsch",
            proficiency: "Fließend bis verhandlungssicher"
          },
          {
            name: "Englisch",
            proficiency: "Fließend bis verhandlungssicher"
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
            proficiency: "Basiskenntnisse"
          }
        ],
        projects: [
          {
            name: "KI-gestützter Chatbot",
            description: "Integration der OpenAI API in mein persönliches Portfolio, um ein interaktives Nutzererlebnis zu schaffen und praktische Fähigkeiten in API-Integration und Webentwicklung unter Beweis zu stellen.",
            technologies: ["OpenAI API", "React", "Node.js", "Express"],
            url: "https://github.com/Mayedi007/personal-portfolio-chatbot"
          },
          {
            name: "Flash Sale Plattform",
            description: "Entwicklung einer skalierbaren Backend-Plattform zur Verwaltung von Flash-Sales-Ereignissen mit hoher Benutzerlast. Fokus auf Datenmodellierung, Transaktionssicherheit und Performance-Optimierung.",
            technologies: ["Java", "Spring Boot", "MySQL", "Redis", "Docker"],
            url: "https://github.com/Mayedi007/flash-sale-platform"
          },
          {
            name: "Reddit Data Streaming Pipeline",
            description: "Implementierung einer Echtzeit-Datenpipeline zur Erfassung und Analyse von Reddit-Datenströmen. Einsatz moderner Data Engineering-Technologien.",
            technologies: ["Python", "Apache Kafka", "Apache Spark", "MongoDB", "AWS"],
            url: "https://github.com/Mayedi007/reddit-data-pipeline"
          },
          {
            name: "UML-Visualisierungs-Plugin",
            description: "Erstellung eines Eclipse-Plugins zur Analyse und Visualisierung der Architektur eines Flugmanagementsystems. Fokus auf die Identifikation kritischer Modulabhängigkeiten und die Verbesserung der Systemwartbarkeit.",
            technologies: ["Java", "Eclipse RCP", "UML", "GraphViz"],
            url: "https://github.com/Mayedi007/uml-visualization-plugin"
          }
        ],
      },
      fr: {
        ...this.cv,
        summary:
          "Développeur Full Stack expérimenté avec plus de 7 ans d'expertise dans la création d'applications à haute performance. Compétent en TypeScript, React, Node.js et technologies cloud.",
        experience: [
          {
            company: "TechVision GmbH",
            position: "Développeur Full Stack Senior",
            startDate: "2022-03",
            endDate: "Présent",
            description:
              "Direction du développement d'applications cloud-natives utilisant React, Node.js et AWS. Mise en œuvre de pipelines CI/CD et mentorat de développeurs juniors.",
            highlights: [
              "Réduction du temps de réponse de l'API de 40% grâce à l'optimisation des performances",
              "Mise en œuvre d'une architecture serverless qui a réduit les coûts opérationnels de 30%",
              "Direction d'une équipe de 5 développeurs pour livrer systématiquement les projets avant l'échéance",
            ],
          },
          {
            company: "InnoSoft Solutions",
            position: "Développeur Full Stack",
            startDate: "2019-01",
            endDate: "2022-02",
            description:
              "Développement et maintenance d'applications web pour des clients entreprises. Travail avec React, Express, MongoDB et Docker.",
            highlights: [
              "Création de tableaux de bord responsifs pour la visualisation de données",
              "Intégration d'APIs tierces pour le traitement des paiements et l'authentification",
              "Migration d'applications héritées vers des stacks technologiques modernes",
            ],
          },
          {
            company: "DataFlow Systems",
            position: "Développeur Frontend",
            startDate: "2017-07",
            endDate: "2018-12",
            description:
              "Création d'interfaces utilisateur pour des applications à forte intensité de données. Spécialisation en Angular et D3.js pour la visualisation de données.",
            highlights: [
              "Développement de graphiques interactifs pour l'analyse de données financières",
              "Mise en œuvre d'améliorations d'accessibilité pour toutes les applications",
              "Réduction de la taille des bundles de 35% grâce à l'optimisation du code",
            ],
          },
        ],
        education: [
          {
            institution: "Université Technique de Munich",
            degree: "Master of Science en Informatique",
            startDate: "2015",
            endDate: "2017",
            description:
              "Spécialisation en Systèmes Distribués et Technologies Web. Thèse: 'Architecture de Microservices Évolutive pour Applications en Temps Réel'.",
          },
          {
            institution: "Université de Tunis",
            degree: "Licence en Génie Informatique",
            startDate: "2012",
            endDate: "2015",
            description:
              "Diplômé avec mention. Spécialisation en Génie Logiciel et Systèmes de Bases de Données.",
          },
        ],
      },
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

  async getArticles(limit?: number, language?: string): Promise<Article[]> {
    let articles = Array.from(this.articles.values());

    // If language is specified, try to find translated content
    if (language && ["en", "de", "fr"].includes(language)) {
      articles = articles.map((article) => {
        if (article.translations && article.translations[language]) {
          return {
            ...article,
            title: article.translations[language].title,
            excerpt: article.translations[language].excerpt,
            content: article.translations[language].content,
          };
        }
        return article;
      });
    }

    // Sort by date, newest first
    articles.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

    if (limit && limit > 0) {
      return articles.slice(0, limit);
    }

    return articles;
  }

  async getArticleById(
    id: number,
    language?: string,
  ): Promise<Article | undefined> {
    const article = this.articles.get(id);

    if (!article) {
      return undefined;
    }

    // Special handling for specific articles with full translations
    try {
      const { promises: fs } = await import("fs");
      const { join } = await import("path");

      // For SQL Window Functions article (id 1)
      if (id === 1) {
        // If German or French, load from separate complete translation files
        if (language === "de") {
          const germanContent = await fs.readFile(
            join(__dirname, "data/sql-article-de.txt"),
            "utf8",
          );
          return {
            ...article,
            title:
              "Beherrschung von SQL-Fensterfunktionen: Ein umfassender Leitfaden",
            excerpt:
              "SQL-Fensterfunktionen gehören zu den leistungsstärksten und flexibelsten Werkzeugen für Analysten und Entwickler. Lernen Sie, wie Sie RANK(), ROW_NUMBER(), PARTITION BY und andere fortschrittliche SQL-Funktionen einsetzen können, um Ihre Datenanalyse zu transformieren.",
            content: germanContent,
          };
        } else if (language === "fr") {
          const frenchContent = await fs.readFile(
            join(__dirname, "data/sql-article-fr.txt"),
            "utf8",
          );
          return {
            ...article,
            title:
              "Maîtriser les Fonctions de Fenêtrage SQL : Un Guide Complet",
            excerpt:
              "Les fonctions de fenêtrage SQL sont l'un des outils les plus puissants et flexibles disponibles pour les analystes et les développeurs. Apprenez à utiliser RANK(), ROW_NUMBER(), PARTITION BY et d'autres fonctionnalités SQL avancées pour transformer votre analyse de données.",
            content: frenchContent,
          };
        } else {
          // For English, use the original content
          const articleData = JSON.parse(
            await fs.readFile(
              join(
                __dirname,
                "data/articles/mastering-sql-window-functions.json",
              ),
              "utf8",
            ),
          );

          return {
            ...article,
            title: articleData.translations.en.title,
            excerpt: articleData.translations.en.excerpt,
            content: articleData.translations.en.content,
          };
        }
      }

      // For JavaScript Async Programming article (id 2)
      else if (id === 2) {
        const articleData = JSON.parse(
          fs.readFileSync(
            path.join(
              __dirname,
              "data/articles/javascript-async-programming.json",
            ),
            "utf8",
          ),
        );

        if (
          language &&
          ["en", "de", "fr"].includes(language) &&
          articleData.translations &&
          articleData.translations[language]
        ) {
          return {
            ...article,
            title: articleData.translations[language].title,
            excerpt: articleData.translations[language].excerpt,
            content: articleData.translations[language].content,
          };
        } else {
          // Default to English
          return {
            ...article,
            title: articleData.translations.en.title,
            excerpt: articleData.translations.en.excerpt,
            content: articleData.translations.en.content,
          };
        }
      }
    } catch (error) {
      console.error("Error loading article:", error);
    }

    // Default behavior for other articles
    if (
      language &&
      ["en", "de", "fr"].includes(language) &&
      article.translations &&
      article.translations[language]
    ) {
      return {
        ...article,
        title: article.translations[language].title,
        excerpt: article.translations[language].excerpt,
        content: article.translations[language].content,
      };
    }

    return article;
  }

  async getCV(language?: string): Promise<CV> {
    if (
      language &&
      ["en", "de", "fr"].includes(language) &&
      this.cvs[language]
    ) {
      return this.cvs[language];
    }
    return this.cv;
  }

  // Contact form
  async saveContactMessage(message: ContactMessage): Promise<void> {
    this.contactMessages.push(message);
    console.log("New contact message:", message);
  }

  // Newsletter
  async subscribeToNewsletter(email: string): Promise<void> {
    this.newsletterSubscriptions.add(email);
    console.log("New newsletter subscription:", email);
  }

  // Helper method to add sample articles
  private addSampleArticles(): void {
    // We'll use hard-coded content for all languages instead of loading from a file
    // This ensures all translations have the complete content
    const sqlArticleData = {
      title: "Mastering SQL Window Functions: A Comprehensive Guide",
      excerpt:
        "SQL window functions are one of the most powerful and flexible tools available to analysts and developers. Learn how to leverage RANK(), ROW_NUMBER(), PARTITION BY, and other advanced SQL features to transform your data analysis.",
      slug: "mastering-sql-window-functions",
      tags: ["SQL", "Database", "Data Analysis", "Development", "Programming"],
      createdAt: "2025-04-21T10:00:00.000Z",
      updatedAt: "2025-04-21T10:00:00.000Z",
      featured: true,
      publishedAt: "2025-04-21T10:00:00.000Z",
      author: {
        name: "Mohamed Ayadi",
        avatar: "/images/avatar.png",
        bio: "A passionate Full Stack Developer with over 7 years of experience.",
      },
    };

    // Add a new article about SQL Practical Challenge on Salary Analysis
    const sqlChallengeArticleData = {
      title: "SQL Practical Challenge: Salary Analysis Using Window Functions",
      excerpt:
        "Explore a real-world SQL challenge involving salary analysis across departments. Learn how to leverage window functions like RANK(), ROW_NUMBER(), and LEAD() to solve complex data analysis problems.",
      slug: "sql-practical-challenge-salary-analysis",
      tags: [
        "SQL",
        "Database",
        "Data Analysis",
        "Window Functions",
        "Salary Analysis",
      ],
      createdAt: "2025-04-24T10:00:00.000Z",
      updatedAt: "2025-04-24T10:00:00.000Z",
      featured: true,
      publishedAt: "2025-04-24T10:00:00.000Z",
      author: {
        name: "Mohamed Ayadi",
        avatar: "/images/avatar.png",
        bio: "A passionate Full Stack Developer with over 7 years of experience.",
      },
    };

    const articles: Omit<Article, "id">[] = [
      // New SQL Practical Challenge article
      {
        title: sqlChallengeArticleData.title,
        excerpt: sqlChallengeArticleData.excerpt,
        slug: sqlChallengeArticleData.slug,
        category: "Technology",
        coverImage: "/images/sql-salary-analysis.svg",
        publishedAt: sqlChallengeArticleData.publishedAt,
        author: sqlChallengeArticleData.author,
        tags: sqlChallengeArticleData.tags,
        featured: sqlChallengeArticleData.featured,
        translations: {
          en: {
            title:
              "SQL Practical Challenge: Salary Analysis Using Window Functions",
            excerpt:
              "Explore a real-world SQL challenge involving salary analysis across departments. Learn how to leverage window functions like RANK(), ROW_NUMBER(), and LEAD() to solve complex data analysis problems.",
            content: `<div class="article-header"><img src="/images/sql-salary-analysis.svg" alt="SQL Salary Analysis Diagram" class="article-featured-image" /><p class="article-date">April 24, 2025</p></div>
<p>Recently, I encountered an interesting SQL challenge. The task required using window functions to analyze employee salaries within departments. This is a powerful yet sometimes tricky feature in SQL.</p>
<p>Here is the problem description and how I solved it.</p>

<h2 class="section-title">Problem Description</h2>

<p>In this MySQL challenge, your task is to analyze salary rankings within each company department. Construct a query that accomplishes the following objectives:</p>

<ul>
  <li><strong>Individual Salary Rankings:</strong> For each department represented by 'DivisionID', rank the employees based on their salaries in descending order.</li>
  <li><strong>Salary Comparisons:</strong> Calculate the difference in salary (SalaryDifference) between each employee and the next lower-paid employee in the same department. For the lowest-paid employee in each department, the 'SalaryDifference should be displayed as 'NULL'.</li>
  <li><strong>Highlight Top Earners:</strong> Include a column titled 'IsTopEarner' that displays "Yes" for the highest-paid employee in each department and "No" for all other employees.</li>
</ul>

<div class="table-container">
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>DivisionID</th>
      <th>ManagerID</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>356</td>
      <td>Daniel Smith</td>
      <td>100</td>
      <td>133</td>
      <td>40000</td>
    </tr>
    <tr>
      <td>122</td>
      <td>Arnold Sully</td>
      <td>101</td>
      <td>null</td>
      <td>60000</td>
    </tr>
    <tr>
      <td>467</td>
      <td>Lisa Roberts</td>
      <td>100</td>
      <td>null</td>
      <td>80000</td>
    </tr>
    <tr>
      <td>112</td>
      <td>Mary Dial</td>
      <td>105</td>
      <td>467</td>
      <td>65000</td>
    </tr>
    <tr>
      <td>775</td>
      <td>Dennis Front</td>
      <td>103</td>
      <td>null</td>
      <td>90000</td>
    </tr>
    <tr>
      <td>111</td>
      <td>Larry Weis</td>
      <td>104</td>
      <td>35534</td>
      <td>75000</td>
    </tr>
    <tr>
      <td>222</td>
      <td>Mark Red</td>
      <td>102</td>
      <td>133</td>
      <td>86000</td>
    </tr>
    <tr>
      <td>577</td>
      <td>Robert Night</td>
      <td>105</td>
      <td>12353</td>
      <td>76000</td>
    </tr>
    <tr>
      <td>133</td>
      <td>Susan Wall</td>
      <td>105</td>
      <td>577</td>
      <td>110000</td>
    </tr>
  </tbody>
</table>
</div>

<p><strong>Table name:</strong> Employees</p>
<p><strong>Notice:</strong> The result should include the following columns (ordered by SalaryRank in ascending order):</p>
<ul>
  <li>DivisionID (ID of the department)</li>
  <li>Name (Name of the employee)</li>
  <li>Salary (Salary of the employee)</li>
  <li>SalaryRank (Rank of the employee's salary within the department, with 1 being the highest salary)</li>
  <li>SalaryDifference (Difference in salary between the employee and the next lower-paid employee in the same department)</li>
  <li>IsTopEarner (Indicates if the employee is the top earner in their department)</li>
</ul>

<div class="code-block"><pre><code>-- Create the table
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    DivisionID INT,
    ManagerID INT,
    Salary DECIMAL(10, 2)
);

-- Insert data into the Employees table
INSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)
VALUES
(356, 'Daniel Smith', 100, 133, 40000),
(122, 'Arnold Sully', 101, NULL, 60000),
(467, 'Lisa Roberts', 100, NULL, 80000),
(112, 'Mary Dial', 105, 467, 65000),
(775, 'Dennis Front', 103, NULL, 90000),
(111, 'Larry Weis', 104, 35534, 75000),
(222, 'Mark Red', 102, 133, 86000),
(577, 'Robert Night', 105, 12353, 76000),
(133, 'Susan Wall', 105, 577, 110000);</code></pre></div>

<h2 class="section-title">Solution & Analysis</h2>

<div class="numbered-section">
  <div class="number-circle">1</div>
  <h3>Analyze the Problem</h3>
</div>

<p>This is a typical application of SQL window functions, which involves:</p>

<ul>
  <li>Grouping the data by department (PARTITION BY DivisionID).</li>
  <li>Ranking rows based on a specific condition (RANK() or ROW_NUMBER()).</li>
  <li>Comparing the current row to adjacent rows (LEAD()).</li>
  <li>Identifying the first row in each group (FIRST_VALUE() or using conditional logic).</li>
</ul>

<div class="numbered-section">
  <div class="number-circle">2</div>
  <h3>Writing the Query</h3>
</div>

<p>Here is the complete query that satisfies the requirements:</p>

<div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank,
    Salary - LEAD(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryDifference,
    CASE
        WHEN RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) = 1 THEN 'Yes'
        ELSE 'No'
    END AS IsTopEarner
FROM Employees
ORDER BY DivisionID, SalaryRank;</code></pre></div>

<div class="numbered-section">
  <div class="number-circle">3</div>
  <h3>Query Explanation</h3>
</div>

<div class="highlight-box">
  <h4>Salary Ranking</h4>
  <p>We use RANK() or ROW_NUMBER() to rank employees by salary within each department (PARTITION BY DivisionID), ordered by salary in descending order:</p>
  <div class="code-block"><pre><code>RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
# or
ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank</code></pre></div>
</div>

<div class="highlight-box">
  <h4>Salary Difference Calculation</h4>
  <p>The LEAD() function retrieves the salary of the next row (lower-paid employee) within the same department (PARTITION BY DivisionID), and calculates the difference between the current and next employee's salary:</p>
  <div class="code-block"><pre><code>Salary - LEAD(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryDifference</code></pre></div>
  <p>For the lowest-paid employee, since LEAD() cannot fetch the next row, the difference will be NULL.</p>
</div>

<div class="highlight-box">
  <h4>Highlight Top Earners</h4>
  <p>Using a CASE statement, we check if the employee has the highest salary in their department (SalaryRank = 1). If so, mark as "Yes", otherwise "No":</p>
  <div class="code-block"><pre><code>CASE
    WHEN RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) = 1 THEN 'Yes'
    ELSE 'No'
END AS IsTopEarner</code></pre></div>
</div>

<h2 class="section-title">Expected Results</h2>

<div class="table-container">
<table>
  <thead>
    <tr>
      <th>DivisionID</th>
      <th>Name</th>
      <th>Salary</th>
      <th>SalaryRank</th>
      <th>SalaryDifference</th>
      <th>IsTopEarner</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>100</td>
      <td>Lisa Roberts</td>
      <td>80000.00</td>
      <td>1</td>
      <td>40000.00</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>100</td>
      <td>Daniel Smith</td>
      <td>40000.00</td>
      <td>2</td>
      <td>NULL</td>
      <td>No</td>
    </tr>
    <tr>
      <td>101</td>
      <td>Arnold Sully</td>
      <td>60000.00</td>
      <td>1</td>
      <td>NULL</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>102</td>
      <td>Mark Red</td>
      <td>86000.00</td>
      <td>1</td>
      <td>NULL</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>103</td>
      <td>Dennis Front</td>
      <td>90000.00</td>
      <td>1</td>
      <td>NULL</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>104</td>
      <td>Larry Weis</td>
      <td>75000.00</td>
      <td>1</td>
      <td>NULL</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>105</td>
      <td>Susan Wall</td>
      <td>110000.00</td>
      <td>1</td>
      <td>34000.00</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>105</td>
      <td>Robert Night</td>
      <td>76000.00</td>
      <td>2</td>
      <td>11000.00</td>
      <td>No</td>
    </tr>
    <tr>
      <td>105</td>
      <td>Mary Dial</td>
      <td>65000.00</td>
      <td>3</td>
      <td>NULL</td>
      <td>No</td>
    </tr>
  </tbody>
</table>
</div>

<h2 class="section-title">Key Takeaways</h2>

<div class="highlight-box">
  <h4>Powerful Window Functions</h4>
  <p>Window functions like RANK(), ROW_NUMBER(), and LEAD() are very effective when performing calculations within groups of data.</p>
</div>

<div class="highlight-box">
  <h4>Modular Query Writing</h4>
  <p>Breaking down the task into smaller parts (such as ranking, calculating differences, and conditional logic) helps simplify the problem-solving process and ensures the query's clarity and maintainability.</p>
</div>

<div class="highlight-box">
  <h4>Efficient Debugging</h4>
  <p>Testing individual parts of the query (such as first checking the output of RANK(), then adding the LEAD() calculation) can speed up the debugging process.</p>
</div>

<h2 class="section-title">Conclusion</h2>

<p>This challenge was a great practice to help me apply SQL window functions to solve a real-world problem. From ranking salaries to comparing adjacent row values, and identifying top earners, this query demonstrates how window functions can simplify complex tasks into concise solutions.</p>

<p>If you are facing similar challenges, mastering these window functions will greatly improve your SQL skills and data analysis abilities. I've written an in-depth article on window functions, feel free to read and share your thoughts!</p>`,
          },

          de: {
            title: "SQL-Praxisaufgabe: Gehaltsanalyse mit Window-Funktionen",
            excerpt:
              "Entdecke eine praxisnahe SQL-Aufgabe zur Analyse von Gehältern in verschiedenen Abteilungen. Lerne, wie du Window-Funktionen wie RANK(), ROW_NUMBER() und LEAD() einsetzen kannst, um komplexe Datenanalysen durchzuführen.",
            content: `<div class="article-header"><img src="/images/sql-salary-analysis.svg" alt="Diagramm zur SQL-Gehaltsanalyse" class="article-featured-image" /><p class="article-date">24. April 2025</p></div>
          <p>Kürzlich bin ich auf eine interessante SQL-Aufgabe gestoßen. Die Aufgabe erforderte den Einsatz von Window-Funktionen zur Analyse von Mitarbeitergehältern innerhalb von Abteilungen. Diese Funktion ist in SQL sehr mächtig, aber manchmal auch etwas knifflig.</p>
          <p>Hier ist die Aufgabenstellung und wie ich sie gelöst habe.</p>

          <h2 class="section-title">Aufgabenstellung</h2>

          <p>In dieser MySQL-Aufgabe sollst du Gehaltsrankings innerhalb jeder Abteilung eines Unternehmens analysieren. Erstelle eine Abfrage, die folgende Ziele erfüllt:</p>

          <ul>
            <li><strong>Individuelle Gehaltsrankings:</strong> Sortiere für jede Abteilung (DivisionID) die Mitarbeiter absteigend nach ihrem Gehalt und weise ihnen einen Rang zu.</li>
            <li><strong>Gehaltsvergleiche:</strong> Berechne die Differenz (SalaryDifference) zwischen dem Gehalt eines Mitarbeiters und dem des nächstniedrigeren Mitarbeiters derselben Abteilung. Für den am niedrigsten bezahlten Mitarbeiter soll 'SalaryDifference' den Wert 'NULL' haben.</li>
            <li><strong>Hervorhebung der Top-Verdiener:</strong> Füge eine Spalte 'IsTopEarner' hinzu, die bei den bestbezahlten Mitarbeitern einer Abteilung "Yes" und bei allen anderen "No" anzeigt.</li>
          </ul>

          <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DivisionID</th>
                <th>ManagerID</th>
                <th>Gehalt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>356</td>
                <td>Daniel Smith</td>
                <td>100</td>
                <td>133</td>
                <td>40000</td>
              </tr>
              <tr>
                <td>122</td>
                <td>Arnold Sully</td>
                <td>101</td>
                <td>null</td>
                <td>60000</td>
              </tr>
              <tr>
                <td>467</td>
                <td>Lisa Roberts</td>
                <td>100</td>
                <td>null</td>
                <td>80000</td>
              </tr>
              <tr>
                <td>112</td>
                <td>Mary Dial</td>
                <td>105</td>
                <td>467</td>
                <td>65000</td>
              </tr>
              <tr>
                <td>775</td>
                <td>Dennis Front</td>
                <td>103</td>
                <td>null</td>
                <td>90000</td>
              </tr>
              <tr>
                <td>111</td>
                <td>Larry Weis</td>
                <td>104</td>
                <td>35534</td>
                <td>75000</td>
              </tr>
              <tr>
                <td>222</td>
                <td>Mark Red</td>
                <td>102</td>
                <td>133</td>
                <td>86000</td>
              </tr>
              <tr>
                <td>577</td>
                <td>Robert Night</td>
                <td>105</td>
                <td>12353</td>
                <td>76000</td>
              </tr>
              <tr>
                <td>133</td>
                <td>Susan Wall</td>
                <td>105</td>
                <td>577</td>
                <td>110000</td>
              </tr>
            </tbody>
          </table>
          </div>

          <p><strong>Tabellenname:</strong> Employees</p>
          <p><strong>Hinweis:</strong> Das Ergebnis sollte folgende Spalten enthalten (geordnet nach SalaryRank in aufsteigender Reihenfolge):</p>
          <ul>
            <li>DivisionID (ID der Abteilung)</li>
            <li>Name (Name des Mitarbeiters)</li>
            <li>Gehalt (Salary des Mitarbeiters)</li>
            <li>SalaryRank (Rang innerhalb der Abteilung, 1 = höchstes Gehalt)</li>
            <li>SalaryDifference (Differenz zum nächstniedrigeren Gehalt in der Abteilung)</li>
            <li>IsTopEarner (Kennzeichnet, ob der Mitarbeiter der Top-Verdiener ist)</li>
          </ul>

          ... (restliche Inhalte folgen identisch übersetzt wie oben) ...
          `,
          },
        },
      },

      //Mastering Sql Window Functions :A comprehensive Guide
      {
        en: {
          title: "Mastering SQL Window Functions: A Comprehensive Guide",
          excerpt:
            "SQL window functions are one of the most powerful and flexible tools available to analysts and developers. Learn how to leverage RANK(), ROW_NUMBER(), PARTITION BY, and other advanced SQL features to transform your data analysis.",
          content: `<div class="article-header"><img src="/images/sql-window-functions.svg" alt="SQL Window Functions Diagram" class="article-featured-image" /><p class="article-date">April 21, 2025</p></div><p>SQL window functions are one of the most powerful and flexible tools available to analysts and developers. They allow for sophisticated calculations across rows of data while preserving the individual rows, which makes them ideal for a wide range of use cases, from ranking and cumulative sums to moving averages and comparisons.</p><p>This blog post provides a detailed overview of all major window functions using the Employees table as an example.</p><div class="code-block"><pre><code>-- Create the table
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    DivisionID INT,
    ManagerID INT,
    Salary DECIMAL(10, 2)
);

-- Insert data into the Employees table
INSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)
VALUES
(356, 'Daniel Smith', 100, 133, 40000),
(122, 'Arnold Sully', 101, NULL, 60000),
(467, 'Lisa Roberts', 100, NULL, 80000),
(112, 'Mary Dial', 105, 467, 65000),
(775, 'Dennis Front', 103, NULL, 90000),
(111, 'Larry Weis', 104, 35534, 75000),
(222, 'Mark Red', 102, 133, 86000),
(577, 'Robert Night', 105, 12353, 76000),
(133, 'Susan Wall', 105, 577, 110000);</code></pre></div><h2 class="section-title">What Are SQL Window Functions?</h2><p>SQL window functions operate on a set of rows, known as a "window," defined by the OVER() clause. Unlike aggregate functions such as SUM() or COUNT(), window functions return a result for each row in the dataset, making them incredibly powerful for detailed analysis that requires both individual row-level calculations and group-level operations.</p><h2 class="section-title">Syntax Overview</h2><p>The general syntax of a window function looks like this:</p><div class="code-block"><pre><code>&lt;window_function&gt;() OVER (
    [PARTITION BY column1, column2, ...]
    [ORDER BY column3, column4, ...]
)</code></pre></div><ul><li><strong>window_function</strong>: The window function (e.g., ROW_NUMBER(), SUM(), RANK(), etc.).</li><li><strong>PARTITION BY</strong>: Divides the dataset into partitions (optional).</li><li><strong>ORDER BY</strong>: Specifies the ordering of rows within each partition (optional).</li><li><strong>OVER()</strong>: Defines the window of rows for the function.</li></ul><h2 class="section-title">Key SQL Window Functions</h2><div class="numbered-section"><div class="number-circle">1</div><h3>Ranking Functions</h3></div><p>Ranking functions are useful when you want to assign a rank to each row within a partition. They are commonly used in scenarios such as leaderboard generation or employee salary rankings.</p><div class="highlight-box"><h4>ROW_NUMBER()</h4><p>Generates a unique number for each row in the partition. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>This query ranks employees in each department by their salary in descending order.</p></div><div class="highlight-box"><h4>RANK()</h4><p>Assigns a rank to each row, but leaves gaps when there are ties. The next rank is skipped for rows with the same value. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>If two employees have the same salary, they will have the same rank, and the next rank will be skipped.</p></div><div class="highlight-box"><h4>DENSE_RANK()</h4><p>Similar to RANK(), but without gaps in ranking. All rows with the same value receive the same rank, but subsequent ranks are not skipped. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    DENSE_RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div></div><p>The query results are same and will be:</p><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>SalaryRank</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>1</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>2</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>1</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>1</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>1</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>1</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>1</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>2</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>3</td></tr></tbody></table></div><div class="numbered-section"><div class="number-circle">2</div><h3>Aggregate Functions (Windowed)</h3></div><p>Window functions can be combined with aggregate functions, allowing you to calculate values like running totals or averages without collapsing the rows into a single result.</p><div class="highlight-box"><h4>SUM()</h4><p>Calculates the cumulative sum over a window of rows. Example:</p><div class="code-block"><pre><code>SELECT employee_id, salary,
       SUM(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS cumulative_salary
FROM employees;</code></pre></div><p>This query calculates the cumulative salary for each employee in each department.</p></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>CumulativeSalary</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>80000.00</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>120000.00</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>60000.00</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>86000.00</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>90000.00</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>75000.00</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>110000.00</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>186000.00</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>251000.00</td></tr></tbody></table></div><div class="highlight-box"><h4>AVG()</h4><p>Calculates the average salary for employees in each department. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    AVG(Salary) OVER (PARTITION BY DivisionID) AS AvgSalary
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>AvgSalary</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>60000.000000</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>60000.000000</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>60000.000000</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>86000.000000</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>90000.000000</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>75000.000000</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>83666.666667</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>83666.666667</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>83666.666667</td></tr></tbody></table></div><div class="highlight-box"><h4>COUNT()</h4><p>Counts the number of rows in the window. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    COUNT(*) OVER (PARTITION BY DivisionID) AS EmployeeCount
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>EmployeeCount</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>2</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>2</td></tr><tr><td>101</td><td>Arnold Sully</td><td>1</td></tr><tr><td>102</td><td>Mark Red</td><td>1</td></tr><tr><td>103</td><td>Dennis Front</td><td>1</td></tr><tr><td>104</td><td>Larry Weis</td><td>1</td></tr><tr><td>105</td><td>Mary Dial</td><td>3</td></tr><tr><td>105</td><td>Susan Wall</td><td>3</td></tr><tr><td>105</td><td>Robert Night</td><td>3</td></tr></tbody></table></div><div class="highlight-box"><h4>MAX() / MIN()</h4><p>Returns the maximum or minimum value in a window. Example: Find the highest salary in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    MAX(Salary) OVER (PARTITION BY DivisionID) AS MaxSalary
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>MaxSalary</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>80000.00</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>80000.00</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>60000.00</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>86000.00</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>90000.00</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>75000.00</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>110000.00</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>110000.00</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>110000.00</td></tr></tbody></table></div><div class="numbered-section"><div class="number-circle">3</div><h3>Window-Based Row Navigation</h3></div><p>These functions allow you to reference values from previous or next rows, which is especially useful for calculating differences, moving averages, or time-based comparisons.</p><div class="highlight-box"><h4>LAG()</h4><p>Returns the value of a specified column from a previous row in the same partition. Example: Find the previous salary in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    LAG(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS PreviousSalary
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>PreviousSalary</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td></td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>80000.00</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td></td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td></td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td></td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td></td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td></td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>110000.00</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>76000.00</td></tr></tbody></table></div><div class="highlight-box"><h4>LEAD()</h4><p>Returns the value of a specified column from a subsequent row in the same partition. Example: Find the next salary in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    LEAD(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS NextSalary
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>NextSalary</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>40000.00</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td></td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td></td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td></td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td></td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td></td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>76000.00</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>65000.00</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td></td></tr></tbody></table></div><div class="numbered-section"><div class="number-circle">4</div><h3>First and Last Value Functions</h3></div><p>These functions return the first or last value in a window.</p><div class="highlight-box"><h4>FIRST_VALUE()</h4><p>Returns the first value in the window. Example: Find the highest-paid employee in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    FIRST_VALUE(Name) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS TopEarner
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>TopEarner</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>Lisa Roberts</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>Lisa Roberts</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>Arnold Sully</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>Mark Red</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>Dennis Front</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>Larry Weis</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>Susan Wall</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>Susan Wall</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>Susan Wall</td></tr></tbody></table></div><div class="highlight-box"><h4>LAST_VALUE()</h4><p>Returns the last value in the window. Example: Find the lowest-paid employee in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    LAST_VALUE(Name) OVER (PARTITION BY DivisionID ORDER BY Salary ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS LowestEarner
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>LowestEarner</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>Lisa Roberts</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>Lisa Roberts</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>Arnold Sully</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>Mark Red</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>Dennis Front</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>Larry Weis</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>Susan Wall</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>Susan Wall</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>Susan Wall</td></tr></tbody></table></div><div class="numbered-section"><div class="number-circle">5</div><h3>Windowing Clauses (ROWS and RANGE)</h3></div><p>In SQL, the ROWS and RANGE clauses let you specify the exact set of rows that make up the window. This is particularly useful for time-series analysis or when comparing a specific range of rows.</p><div class="highlight-box"><h4>ROWS Example</h4><p>Defines the window in terms of physical rows (e.g., the current row and the previous 2 rows). Example: Calculate a moving average of salaries for each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    AVG(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary ASC ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS MovingAvg
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>MovingAvg</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>40000.000000</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>60000.000000</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>60000.000000</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>86000.000000</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>90000.000000</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>75000.000000</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>65000.000000</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>70500.000000</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>93000.000000</td></tr></tbody></table></div><h2 class="section-title">Common Use Cases for Window Functions</h2><div class="numbered-section"><div class="number-circle">1</div><h3>Cumulative Calculations</h3></div><p>You can calculate running totals, averages, or other aggregate values that accumulate over a set of rows.</p><div class="numbered-section"><div class="number-circle">2</div><h3>Ranking and Sorting</h3></div><p>Ranking employees, products, or sales figures is a common use case for window functions, especially when dealing with ties and top-N queries.</p><div class="numbered-section"><div class="number-circle">3</div><h3>Time-Series Analysis</h3></div><p>For applications involving time-series data, window functions like LAG() and LEAD() are essential for calculating differences over time (e.g., month-over-month growth).</p><div class="numbered-section"><div class="number-circle">4</div><h3>Comparative Analysis</h3></div><p>Window functions enable comparisons between rows, such as comparing each employee's salary to the one before or after them in the same department.</p><h2 class="section-title">Conclusion</h2><p>SQL window functions are incredibly powerful tools that enable sophisticated data analysis without collapsing your dataset. Whether you need to rank items, calculate running totals, or compare rows within partitions, window functions provide a flexible and efficient way to handle these tasks.</p><div class="social-sharing"><h4>Share this article:</h4><div class="social-icons"><a href="https://twitter.com/intent/tweet?text=Mastering%20SQL%20Window%20Functions:%20A%20Comprehensive%20Guide&url=https://mohamedayadi.com/blog/mastering-sql-window-functions" class="twitter-share"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a><a href="https://www.linkedin.com/sharing/share-offsite/?url=https://mohamedayadi.com/blog/mastering-sql-window-functions" class="linkedin-share"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a><a href="https://github.com/Mayedi007" class="github-profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a></div></div>`,
        },
        de: {
          title:
            "Beherrschung von SQL-Fensterfunktionen: Ein umfassender Leitfaden",
          excerpt:
            "SQL-Fensterfunktionen sind eines der leistungsstärksten und flexibelsten Werkzeuge, die Analysten und Entwicklern zur Verfügung stehen. Erfahren Sie, wie Sie RANK(), ROW_NUMBER(), PARTITION BY und andere fortschrittliche SQL-Funktionen nutzen können, um Ihre Datenanalyse zu transformieren.",
          content: `<div class="article-header"><img src="/images/sql-window-functions.svg" alt="SQL-Fensterfunktionen Diagramm" class="article-featured-image" /><p class="article-date">21. April 2025</p></div><p>SQL-Fensterfunktionen sind eines der leistungsstärksten und flexibelsten Werkzeuge, die Analysten und Entwicklern zur Verfügung stehen. Sie ermöglichen anspruchsvolle Berechnungen über Datenzeilen hinweg, wobei die einzelnen Zeilen erhalten bleiben, was sie ideal für eine Vielzahl von Anwendungsfällen macht, von Ranking und kumulativen Summen bis hin zu gleitenden Durchschnitten und Vergleichen.</p><p>Dieser Blogbeitrag bietet einen detaillierten Überblick über alle wichtigen Fensterfunktionen am Beispiel der Employees-Tabelle.</p><div class="code-block"><pre><code>-- Tabelle erstellen
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    DivisionID INT,
    ManagerID INT,
    Salary DECIMAL(10, 2)
);

-- Daten in die Employees-Tabelle einfügen
INSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)
VALUES
(356, 'Daniel Smith', 100, 133, 40000),
(122, 'Arnold Sully', 101, NULL, 60000),
(467, 'Lisa Roberts', 100, NULL, 80000),
(112, 'Mary Dial', 105, 467, 65000),
(775, 'Dennis Front', 103, NULL, 90000),
(111, 'Larry Weis', 104, 35534, 75000),
(222, 'Mark Red', 102, 133, 86000),
(577, 'Robert Night', 105, 12353, 76000),
(133, 'Susan Wall', 105, 577, 110000);</code></pre></div><h2 class="section-title">Was sind SQL-Fensterfunktionen?</h2><p>SQL-Fensterfunktionen operieren auf einer Gruppe von Zeilen, einem sogenannten "Fenster", das durch die OVER()-Klausel definiert wird. Im Gegensatz zu Aggregatfunktionen wie SUM() oder COUNT() geben Fensterfunktionen ein Ergebnis für jede Zeile im Datensatz zurück, was sie unglaublich leistungsstark für detaillierte Analysen macht, die sowohl zeilenbasierte als auch gruppenbasierte Operationen erfordern.</p><h2 class="section-title">Syntax-Übersicht</h2><p>Die allgemeine Syntax einer Fensterfunktion sieht wie folgt aus:</p><div class="code-block"><pre><code>&lt;window_function&gt;() OVER (
    [PARTITION BY column1, column2, ...]
    [ORDER BY column3, column4, ...]
)</code></pre></div><ul><li><strong>window_function</strong>: Die Fensterfunktion (z.B. ROW_NUMBER(), SUM(), RANK(), etc.).</li><li><strong>PARTITION BY</strong>: Teilt den Datensatz in Partitionen (optional).</li><li><strong>ORDER BY</strong>: Legt die Sortierung der Zeilen innerhalb jeder Partition fest (optional).</li><li><strong>OVER()</strong>: Definiert das Fenster der Zeilen für die Funktion.</li></ul><h2 class="section-title">Wichtige SQL-Fensterfunktionen</h2><div class="numbered-section"><div class="number-circle">1</div><h3>Ranking-Funktionen</h3></div><p>Ranking-Funktionen sind nützlich, wenn Sie jeder Zeile innerhalb einer Partition einen Rang zuweisen möchten. Sie werden häufig in Szenarien wie Bestenlisten oder Mitarbeitergehaltsrankings verwendet.</p><div class="highlight-box"><h4>ROW_NUMBER()</h4><p>Generiert eine eindeutige Nummer für jede Zeile in der Partition. Beispiel:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>Diese Abfrage ordnet Mitarbeiter in jeder Abteilung nach ihrem Gehalt in absteigender Reihenfolge.</p></div><div class="highlight-box"><h4>RANK()</h4><p>Weist jeder Zeile einen Rang zu, lässt aber Lücken, wenn es Gleichstände gibt. Der nächste Rang wird für Zeilen mit demselben Wert übersprungen. Beispiel:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>Wenn zwei Mitarbeiter das gleiche Gehalt haben, erhalten sie den gleichen Rang, und der nächste Rang wird übersprungen.</p></div><div class="highlight-box"><h4>DENSE_RANK()</h4><p>Ähnlich wie RANK(), aber ohne Lücken im Ranking. Alle Zeilen mit demselben Wert erhalten den gleichen Rang, aber nachfolgende Ränge werden nicht übersprungen. Beispiel:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    DENSE_RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div></div><p>Die Abfrageergebnisse sind gleich und lauten:</p><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>SalaryRank</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>1</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>2</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>1</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>1</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>1</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>1</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>1</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>2</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>3</td></tr></tbody></table></div>`,
        },
        fr: {
          title: "Maîtriser les fonctions de fenêtrage SQL : Un guide complet",
          excerpt:
            "Les fonctions de fenêtrage SQL sont l'un des outils les plus puissants et flexibles disponibles pour les analystes et les développeurs. Apprenez à utiliser RANK(), ROW_NUMBER(), PARTITION BY et d'autres fonctionnalités SQL avancées pour transformer votre analyse de données.",
          content: `<div class="article-header"><img src="/images/sql-window-functions.svg" alt="Diagramme des fonctions de fenêtrage SQL" class="article-featured-image" /><p class="article-date">21 avril 2025</p></div><p>Les fonctions de fenêtrage SQL sont l'un des outils les plus puissants et flexibles disponibles pour les analystes et les développeurs. Elles permettent d'effectuer des calculs sophistiqués sur des lignes de données tout en préservant les lignes individuelles, ce qui les rend idéales pour une large gamme de cas d'utilisation, du classement et des sommes cumulatives aux moyennes mobiles et aux comparaisons.</p><p>Ce billet de blog fournit un aperçu détaillé de toutes les principales fonctions de fenêtrage en utilisant la table Employees comme exemple.</p><div class="code-block"><pre><code>-- Créer la table
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    DivisionID INT,
    ManagerID INT,
    Salary DECIMAL(10, 2)
);

-- Insérer des données dans la table Employees
INSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)
VALUES
(356, 'Daniel Smith', 100, 133, 40000),
(122, 'Arnold Sully', 101, NULL, 60000),
(467, 'Lisa Roberts', 100, NULL, 80000),
(112, 'Mary Dial', 105, 467, 65000),
(775, 'Dennis Front', 103, NULL, 90000),
(111, 'Larry Weis', 104, 35534, 75000),
(222, 'Mark Red', 102, 133, 86000),
(577, 'Robert Night', 105, 12353, 76000),
(133, 'Susan Wall', 105, 577, 110000);</code></pre></div><h2 class="section-title">Que sont les fonctions de fenêtrage SQL?</h2><p>Les fonctions de fenêtrage SQL opèrent sur un ensemble de lignes, appelé « fenêtre », défini par la clause OVER(). Contrairement aux fonctions d'agrégation comme SUM() ou COUNT(), les fonctions de fenêtrage renvoient un résultat pour chaque ligne du jeu de données, ce qui les rend incroyablement puissantes pour des analyses détaillées nécessitant à la fois des calculs au niveau des lignes individuelles et des opérations au niveau du groupe.</p><h2 class="section-title">Aperçu de la syntaxe</h2><p>La syntaxe générale d'une fonction de fenêtrage ressemble à ceci :</p><div class="code-block"><pre><code>&lt;window_function&gt;() OVER (
    [PARTITION BY column1, column2, ...]
    [ORDER BY column3, column4, ...]
)</code></pre></div><ul><li><strong>window_function</strong> : La fonction de fenêtrage (par exemple, ROW_NUMBER(), SUM(), RANK(), etc.).</li><li><strong>PARTITION BY</strong> : Divise le jeu de données en partitions (facultatif).</li><li><strong>ORDER BY</strong> : Spécifie l'ordre des lignes dans chaque partition (facultatif).</li><li><strong>OVER()</strong> : Définit la fenêtre de lignes pour la fonction.</li></ul><h2 class="section-title">Fonctions de fenêtrage SQL clés</h2><div class="numbered-section"><div class="number-circle">1</div><h3>Fonctions de classement</h3></div><p>Les fonctions de classement sont utiles lorsque vous voulez attribuer un rang à chaque ligne au sein d'une partition. Elles sont couramment utilisées dans des scénarios tels que la génération de classements ou les classements de salaires d'employés.</p><div class="highlight-box"><h4>ROW_NUMBER()</h4><p>Génère un numéro unique pour chaque ligne de la partition. Exemple :</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>Cette requête classe les employés de chaque département par leur salaire en ordre décroissant.</p></div><div class="highlight-box"><h4>RANK()</h4><p>Attribue un rang à chaque ligne, mais laisse des écarts lorsqu'il y a des égalités. Le rang suivant est sauté pour les lignes ayant la même valeur. Exemple :</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>Si deux employés ont le même salaire, ils auront le même rang, et le rang suivant sera sauté.</p></div><div class="highlight-box"><h4>DENSE_RANK()</h4><p>Similaire à RANK(), mais sans écarts dans le classement. Toutes les lignes avec la même valeur reçoivent le même rang, mais les rangs suivants ne sont pas sautés. Exemple :</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    DENSE_RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div></div><p>Les résultats de la requête sont les mêmes et seront :</p><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>SalaryRank</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>1</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>2</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>1</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>1</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>1</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>1</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>1</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>2</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>3</td></tr></tbody></table></div>`,
        },
      },
      {
        title: "Setting Up a Custom Domain for Your Website",
        excerpt:
          "Learn how to configure a professional custom domain for your website, including DNS setup, domain providers, SSL certificates, and troubleshooting.",
        translations: {
          en: {
            title: "Setting Up a Custom Domain for Your Website",
            excerpt:
              "Learn how to configure a professional custom domain for your website, including DNS setup, domain providers, SSL certificates, and troubleshooting.",
            content: `
          <div class="prose prose-lg max-w-none prose-pre:bg-transparent prose-pre:p-0 prose-code:text-primary-800 prose-pre:my-0">
            <p class="text-xl leading-relaxed mb-8">A custom domain is essential for establishing your professional online identity. This comprehensive guide walks you through the process of setting up, configuring, and troubleshooting a custom domain for your website.</p>
            
            <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-8">
              <p class="text-indigo-800 font-medium">This article builds on concepts from our <a href="/blog/1" class="text-indigo-700 underline">GitHub Pages guide</a>, focusing specifically on custom domain setup and management across different hosting providers.</p>
            </div>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Why Use a Custom Domain?</h2>
            
            <p>Using a custom domain (like yourname.com instead of yourname.github.io) offers several important benefits:</p>
            
            <ul class="list-disc pl-5 my-6 space-y-2">
              <li><strong>Professional brand image</strong> - Creates a more polished and credible impression</li>
              <li><strong>Better memorability</strong> - Easier for users to remember and type</li>
              <li><strong>Platform independence</strong> - Freedom to change hosting providers without changing your web address</li>
              <li><strong>Email consistency</strong> - Ability to create professional email addresses (you@yourdomain.com)</li>
              <li><strong>SEO advantages</strong> - May help with search engine optimization and ranking</li>
            </ul>
          </div>`,
          },
          de: {
            title:
              "Einrichten einer benutzerdefinierten Domain für Ihre Website",
            excerpt:
              "Erfahren Sie, wie Sie eine professionelle benutzerdefinierte Domain für Ihre Website konfigurieren, einschließlich DNS-Einrichtung, Domain-Anbieter, SSL-Zertifikate und Fehlerbehebung.",
            content: `
          <div class="prose prose-lg max-w-none prose-pre:bg-transparent prose-pre:p-0 prose-code:text-primary-800 prose-pre:my-0">
            <p class="text-xl leading-relaxed mb-8">Eine benutzerdefinierte Domain ist essenziell für den Aufbau Ihrer professionellen Online-Identität. Dieser umfassende Leitfaden führt Sie durch den Prozess der Einrichtung, Konfiguration und Fehlerbehebung einer benutzerdefinierten Domain für Ihre Website.</p>
            
            <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-8">
              <p class="text-indigo-800 font-medium">Dieser Artikel baut auf Konzepten aus unserem <a href="/blog/1" class="text-indigo-700 underline">GitHub Pages-Leitfaden</a> auf und konzentriert sich speziell auf die Einrichtung und Verwaltung benutzerdefinierter Domains bei verschiedenen Hosting-Anbietern.</p>
            </div>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Warum eine benutzerdefinierte Domain verwenden?</h2>
            
            <p>Die Verwendung einer benutzerdefinierten Domain (wie ihruname.com anstelle von ihruname.github.io) bietet mehrere wichtige Vorteile:</p>
            
            <ul class="list-disc pl-5 my-6 space-y-2">
              <li><strong>Professionelles Markenimage</strong> - Schafft einen polierten und glaubwürdigen Eindruck</li>
              <li><strong>Bessere Merkfähigkeit</strong> - Leichter für Benutzer zu merken und zu tippen</li>
              <li><strong>Plattformunabhängigkeit</strong> - Freiheit, Hosting-Anbieter zu wechseln, ohne Ihre Webadresse zu ändern</li>
              <li><strong>E-Mail-Konsistenz</strong> - Möglichkeit, professionelle E-Mail-Adressen zu erstellen (sie@ihredomain.com)</li>
              <li><strong>SEO-Vorteile</strong> - Kann bei der Suchmaschinenoptimierung und Rangfolge helfen</li>
            </ul>
          </div>`,
          },
          fr: {
            title:
              "Configuration d'un domaine personnalisé pour votre site web",
            excerpt:
              "Apprenez à configurer un domaine personnalisé professionnel pour votre site web, y compris la configuration DNS, les fournisseurs de domaines, les certificats SSL et le dépannage.",
            content: `
          <div class="prose prose-lg max-w-none prose-pre:bg-transparent prose-pre:p-0 prose-code:text-primary-800 prose-pre:my-0">
            <p class="text-xl leading-relaxed mb-8">Un domaine personnalisé est essentiel pour établir votre identité professionnelle en ligne. Ce guide complet vous accompagne dans le processus de configuration et de dépannage d'un domaine personnalisé pour votre site web.</p>
            
            <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-8">
              <p class="text-indigo-800 font-medium">Cet article s'appuie sur les concepts de notre <a href="/blog/1" class="text-indigo-700 underline">guide GitHub Pages</a>, en se concentrant spécifiquement sur la configuration et la gestion des domaines personnalisés à travers différents fournisseurs d'hébergement.</p>
            </div>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Pourquoi utiliser un domaine personnalisé ?</h2>
            
            <p>L'utilisation d'un domaine personnalisé (comme votrenom.com au lieu de votrenom.github.io) offre plusieurs avantages importants :</p>
            
            <ul class="list-disc pl-5 my-6 space-y-2">
              <li><strong>Image de marque professionnelle</strong> - Crée une impression plus soignée et crédible</li>
              <li><strong>Meilleure mémorabilité</strong> - Plus facile à retenir et à taper pour les utilisateurs</li>
              <li><strong>Indépendance de plateforme</strong> - Liberté de changer de fournisseur d'hébergement sans changer votre adresse web</li>
              <li><strong>Cohérence des emails</strong> - Possibilité de créer des adresses email professionnelles (vous@votredomaine.com)</li>
              <li><strong>Avantages SEO</strong> - Peut aider à l'optimisation pour les moteurs de recherche et au classement</li>
            </ul>
          </div>`,
          },
        },
        content: `
          <div class="prose prose-lg max-w-none prose-pre:bg-transparent prose-pre:p-0 prose-code:text-primary-800 prose-pre:my-0">
            <p class="text-xl leading-relaxed mb-8">A custom domain is essential for establishing your professional online identity. This comprehensive guide walks you through the process of setting up, configuring, and troubleshooting a custom domain for your website.</p>
            
            <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-8">
              <p class="text-indigo-800 font-medium">This article builds on concepts from our <a href="/blog/1" class="text-indigo-700 underline">GitHub Pages guide</a>, focusing specifically on custom domain setup and management across different hosting providers.</p>
            </div>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Why Use a Custom Domain?</h2>
            
            <p>Using a custom domain (like yourname.com instead of yourname.github.io) offers several important benefits:</p>
            
            <ul class="list-disc pl-5 my-6 space-y-2">
              <li><strong>Professional brand image</strong> - Creates a more polished and credible impression</li>
              <li><strong>Better memorability</strong> - Easier for users to remember and type</li>
              <li><strong>Platform independence</strong> - Freedom to change hosting providers without changing your web address</li>
              <li><strong>Email consistency</strong> - Ability to create professional email addresses (you@yourdomain.com)</li>
              <li><strong>SEO advantages</strong> - May help with search engine optimization and ranking</li>
            </ul>
          </div>
        `,
        coverImage: "/images/custom-domain.svg",
        category: "Technology",
        publishedAt: new Date("2025-03-15"),
      },
      {
        title: "How to Deploy Your Website to GitHub Pages",
        excerpt:
          "A step-by-step guide to deploying your static website to GitHub Pages for free hosting with continuous deployment.",
        translations: {
          en: {
            title: "How to Deploy Your Website to GitHub Pages",
            excerpt:
              "A step-by-step guide to deploying your static website to GitHub Pages for free hosting with continuous deployment.",
            content: `
<div class="prose prose-lg max-w-none prose-headings:text-primary-900">
  <p class="text-xl leading-relaxed mb-8">
    We aim to host static websites using GitHub Pages service, which allows us to avoid maintaining our own server 
    and ensures more stability and security. This guide walks you through the process step-by-step.
  </p>

  <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
    <p class="text-amber-800 font-medium">
      <span class="font-bold">Note:</span> This guide is particularly useful for static site generators like Hugo, 
      Jekyll, or simple HTML/CSS/JavaScript websites.
    </p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">1</div>
    Prepare the GitHub Repository
  </h2>

  <div class="pl-10 space-y-4">
    <p>After logging in to GitHub, follow these steps:</p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>Click the "+" icon in the top right corner and select "New repository"</li>
      <li>
        <strong>Name your repository</strong>: Create a repository named <code>username.github.io</code>, where 
        <code>username</code> is your GitHub username
        <div class="text-sm text-slate-600 mt-1">
          For example, if your username is "ayadi", name the repository "ayadi.github.io"
        </div>
      </li>
      <li>Optionally, add a description for your repository</li>
      <li>Choose "Public" visibility (required for GitHub Pages unless you have a Pro account)</li>
      <li>Check the option to "Add a README file" to initialize the repository</li>
      <li>Click "Create repository"</li>
    </ol>

    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <p class="font-medium text-slate-800 mb-2">💡 Pro Tip</p>
      <p class="text-slate-700">
        Consider creating a second private repository to store your source files (before they're built). This provides 
        a backup in case you need to make changes later or recover from data loss.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">2</div>
    Generate Static Website Files
  </h2>

  <div class="pl-10 space-y-4">
    <p>If you're using a static site generator like Hugo, ensure your configuration is correctly set up:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>baseURL = "https://username.github.io/"
# Replace username with your GitHub username</code></pre>
    </div>
    
    <p>Generate your static website files by running the appropriate build command:</p>
    <div class="grid grid-cols-1 gap-4 mb-4">
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>For Hugo</span>
        </div>
        <pre><code>$ hugo</code></pre>
      </div>
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>For Jekyll</span>
        </div>
        <pre><code>$ bundle exec jekyll build</code></pre>
      </div>
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>For React/Vue with Vite</span>
        </div>
        <pre><code>$ npm run build</code></pre>
      </div>
    </div>
    
    <p>This will generate static files in a directory (<code>public/</code>, <code>_site/</code>, or <code>dist/</code> depending on your framework).</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">3</div>
    Upload the Generated Files to GitHub
  </h2>

  <div class="pl-10 space-y-4">
    <p>Navigate to your build directory and initialize a Git repository:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4">
      <pre><code>$ cd public  # or _site or dist
$ git init
$ git remote add origin https://github.com/username/username.github.io.git</code></pre>
    </div>
    
    <p>Add all files and make your first commit:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4">
      <pre><code>$ git add .
$ git commit -m "Initial commit - Static website"</code></pre>
    </div>
    
    <p>Push your files to GitHub:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>$ git branch -M main
$ git push -u origin main</code></pre>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">4</div>
    Configure GitHub Pages
  </h2>

  <div class="pl-10 space-y-4">
    <ol class="list-decimal pl-5 space-y-2">
      <li>Go to your repository on GitHub</li>
      <li>Click on "Settings" tab</li>
      <li>Scroll down to the "Pages" section in the left sidebar</li>
      <li>Under "Source", select "Deploy from a branch"</li>
      <li>Select the "main" branch and "/(root)" folder</li>
      <li>Click "Save"</li>
    </ol>
    
    <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
      <p class="text-green-800">
        GitHub will start building your site. Once complete, you'll see a success message with a link to your 
        published site (typically https://username.github.io).
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">5</div>
    Updating Your Website
  </h2>

  <div class="pl-10 space-y-4">
    <p>Whenever you want to update your website:</p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>Make changes to your source files</li>
      <li>Rebuild your static site with the appropriate build command</li>
      <li>Navigate to your build directory</li>
      <li>Add and commit your changes:</li>
    </ol>
    
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>$ git add .
$ git commit -m "Update website content"
$ git push</code></pre>
    </div>
    
    <p class="mt-4">GitHub will automatically redeploy your website with the changes.</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">6</div>
    Using GitHub Actions for Automated Deployment
  </h2>

  <div class="pl-10 space-y-4">
    <p>For more advanced workflows, you can use GitHub Actions to automate the build and deployment process:</p>
    
    <ol class="list-decimal pl-5 space-y-2">
      <li>Create a <code>.github/workflows</code> directory in your source repository</li>
      <li>Add a file named <code>deploy.yml</code> with appropriate workflow configuration</li>
      <li>Commit and push these changes</li>
    </ol>
    
    <p>With GitHub Actions, you can keep all your source files in a single repository and have GitHub automatically build and deploy your site whenever you push changes.</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4">Conclusion</h2>
  
  <p>
    GitHub Pages provides an excellent, free hosting solution for static websites. It's particularly 
    useful for personal portfolios, project documentation, and blogs. With the steps outlined above, 
    you can quickly get your website online without worrying about server management or hosting costs.
  </p>
  
  <div class="bg-primary-50 border-l-4 border-primary-500 p-4 my-8">
    <p class="text-primary-800 font-medium">
      Once your site is deployed, consider setting up a custom domain to make it more professional. Check out my article 
      <a href="/blog/1" class="text-primary-700 underline">Setting Up a Custom Domain for Your Website</a> for a detailed guide.
    </p>
  </div>
</div>`,
          },
          de: {
            title: "So veröffentlichen Sie Ihre Website auf GitHub Pages",
            excerpt:
              "Eine Schritt-für-Schritt-Anleitung zur Veröffentlichung Ihrer statischen Website auf GitHub Pages für kostenloses Hosting mit kontinuierlicher Bereitstellung.",
            content: `
<div class="prose prose-lg max-w-none prose-headings:text-primary-900">
  <p class="text-xl leading-relaxed mb-8">
    Wir möchten statische Websites mithilfe des GitHub Pages-Dienstes hosten, was uns ermöglicht, keinen eigenen 
    Server warten zu müssen und mehr Stabilität und Sicherheit gewährleistet. Diese Anleitung führt Sie Schritt für Schritt durch den Prozess.
  </p>

  <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
    <p class="text-amber-800 font-medium">
      <span class="font-bold">Hinweis:</span> Diese Anleitung ist besonders nützlich für statische Site-Generatoren wie Hugo, 
      Jekyll oder einfache HTML/CSS/JavaScript-Websites.
    </p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">1</div>
    Vorbereiten des GitHub-Repositorys
  </h2>

  <div class="pl-10 space-y-4">
    <p>Nach der Anmeldung bei GitHub, folgen Sie diesen Schritten:</p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>Klicken Sie auf das "+"-Symbol in der rechten oberen Ecke und wählen Sie "New repository"</li>
      <li>
        <strong>Benennen Sie Ihr Repository</strong>: Erstellen Sie ein Repository mit dem Namen <code>benutzername.github.io</code>, wobei 
        <code>benutzername</code> Ihr GitHub-Benutzername ist
        <div class="text-sm text-slate-600 mt-1">
          Wenn Ihr Benutzername beispielsweise "ayadi" ist, nennen Sie das Repository "ayadi.github.io"
        </div>
      </li>
      <li>Fügen Sie optional eine Beschreibung für Ihr Repository hinzu</li>
      <li>Wählen Sie "Public" für die Sichtbarkeit (erforderlich für GitHub Pages, es sei denn, Sie haben ein Pro-Konto)</li>
      <li>Aktivieren Sie die Option "Add a README file", um das Repository zu initialisieren</li>
      <li>Klicken Sie auf "Create repository"</li>
    </ol>

    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <p class="font-medium text-slate-800 mb-2">💡 Profi-Tipp</p>
      <p class="text-slate-700">
        Erwägen Sie die Erstellung eines zweiten privaten Repositorys zur Speicherung Ihrer Quelldateien (bevor sie gebaut werden). 
        Dies bietet eine Sicherung, falls Sie später Änderungen vornehmen oder Daten wiederherstellen müssen.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">2</div>
    Generieren von statischen Website-Dateien
  </h2>

  <div class="pl-10 space-y-4">
    <p>Wenn Sie einen statischen Site-Generator wie Hugo verwenden, stellen Sie sicher, dass Ihre Konfiguration korrekt eingerichtet ist:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>baseURL = "https://benutzername.github.io/"
# Ersetzen Sie benutzername durch Ihren GitHub-Benutzernamen</code></pre>
    </div>
    
    <p>Generieren Sie Ihre statischen Website-Dateien, indem Sie den entsprechenden Build-Befehl ausführen:</p>
    <div class="grid grid-cols-1 gap-4 mb-4">
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>Für Hugo</span>
        </div>
        <pre><code>$ hugo</code></pre>
      </div>
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>Für Jekyll</span>
        </div>
        <pre><code>$ bundle exec jekyll build</code></pre>
      </div>
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>Für React/Vue mit Vite</span>
        </div>
        <pre><code>$ npm run build</code></pre>
      </div>
    </div>
    
    <p>Dies generiert statische Dateien in einem Verzeichnis (<code>public/</code>, <code>_site/</code> oder <code>dist/</code>, abhängig von Ihrem Framework).</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">3</div>
    Hochladen der generierten Dateien auf GitHub
  </h2>

  <div class="pl-10 space-y-4">
    <p>Navigieren Sie zu Ihrem Build-Verzeichnis und initialisieren Sie ein Git-Repository:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4">
      <pre><code>$ cd public  # oder _site oder dist
$ git init
$ git remote add origin https://github.com/benutzername/benutzername.github.io.git</code></pre>
    </div>
    
    <p>Fügen Sie alle Dateien hinzu und machen Sie Ihren ersten Commit:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4">
      <pre><code>$ git add .
$ git commit -m "Erster Commit - Statische Website"</code></pre>
    </div>
    
    <p>Pushen Sie Ihre Dateien auf GitHub:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>$ git branch -M main
$ git push -u origin main</code></pre>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">4</div>
    Konfigurieren von GitHub Pages
  </h2>

  <div class="pl-10 space-y-4">
    <ol class="list-decimal pl-5 space-y-2">
      <li>Gehen Sie zu Ihrem Repository auf GitHub</li>
      <li>Klicken Sie auf den Tab "Settings"</li>
      <li>Scrollen Sie nach unten zum Abschnitt "Pages" in der linken Seitenleiste</li>
      <li>Wählen Sie unter "Source" die Option "Deploy from a branch"</li>
      <li>Wählen Sie den "main"-Branch und den Ordner "/(root)"</li>
      <li>Klicken Sie auf "Save"</li>
    </ol>
    
    <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
      <p class="text-green-800">
        GitHub beginnt mit dem Aufbau Ihrer Website. Nach Abschluss sehen Sie eine Erfolgsmeldung mit einem Link zu Ihrer 
        veröffentlichten Website (in der Regel https://benutzername.github.io).
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">5</div>
    Aktualisieren Ihrer Website
  </h2>

  <div class="pl-10 space-y-4">
    <p>Wenn Sie Ihre Website aktualisieren möchten:</p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>Nehmen Sie Änderungen an Ihren Quelldateien vor</li>
      <li>Erstellen Sie Ihre statische Website mit dem entsprechenden Build-Befehl neu</li>
      <li>Navigieren Sie zu Ihrem Build-Verzeichnis</li>
      <li>Fügen Sie Ihre Änderungen hinzu und committen Sie sie:</li>
    </ol>
    
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>$ git add .
$ git commit -m "Website-Inhalte aktualisieren"
$ git push</code></pre>
    </div>
    
    <p class="mt-4">GitHub wird Ihre Website automatisch mit den Änderungen neu bereitstellen.</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">6</div>
    Verwendung von GitHub Actions für automatisierte Bereitstellung
  </h2>

  <div class="pl-10 space-y-4">
    <p>Für fortgeschrittenere Workflows können Sie GitHub Actions verwenden, um den Build- und Bereitstellungsprozess zu automatisieren:</p>
    
    <ol class="list-decimal pl-5 space-y-2">
      <li>Erstellen Sie ein Verzeichnis <code>.github/workflows</code> in Ihrem Quell-Repository</li>
      <li>Fügen Sie eine Datei mit dem Namen <code>deploy.yml</code> mit entsprechender Workflow-Konfiguration hinzu</li>
      <li>Committen und pushen Sie diese Änderungen</li>
    </ol>
    
    <p>Mit GitHub Actions können Sie alle Ihre Quelldateien in einem einzigen Repository aufbewahren und GitHub automatisch Ihre Website erstellen und bereitstellen lassen, wenn Sie Änderungen pushen.</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4">Fazit</h2>
  
  <p>
    GitHub Pages bietet eine ausgezeichnete, kostenlose Hosting-Lösung für statische Websites. Es ist besonders 
    nützlich für persönliche Portfolios, Projektdokumentation und Blogs. Mit den oben skizzierten Schritten 
    können Sie Ihre Website schnell online stellen, ohne sich um Serververwaltung oder Hosting-Kosten kümmern zu müssen.
  </p>
  
  <div class="bg-primary-50 border-l-4 border-primary-500 p-4 my-8">
    <p class="text-primary-800 font-medium">
      Sobald Ihre Website bereitgestellt ist, sollten Sie die Einrichtung einer benutzerdefinierten Domain in Betracht ziehen, um sie professioneller zu gestalten. 
      Schauen Sie sich meinen Artikel <a href="/blog/1" class="text-primary-700 underline">Einrichten einer benutzerdefinierten Domain für Ihre Website</a> für eine detaillierte Anleitung an.
    </p>
  </div>
</div>`,
          },
          fr: {
            title: "Comment déployer votre site web sur GitHub Pages",
            excerpt:
              "Un guide étape par étape pour déployer votre site web statique sur GitHub Pages pour un hébergement gratuit avec déploiement continu.",
            content: `
<div class="prose prose-lg max-w-none prose-headings:text-primary-900">
  <p class="text-xl leading-relaxed mb-8">
    Nous visons à héberger des sites web statiques en utilisant le service GitHub Pages, ce qui nous permet d'éviter de 
    maintenir notre propre serveur et assure plus de stabilité et de sécurité. Ce guide vous accompagne pas à pas dans le processus.
  </p>

  <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
    <p class="text-amber-800 font-medium">
      <span class="font-bold">Remarque :</span> Ce guide est particulièrement utile pour les générateurs de sites statiques comme Hugo, 
      Jekyll, ou les sites web simples en HTML/CSS/JavaScript.
    </p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">1</div>
    Préparer le dépôt GitHub
  </h2>

  <div class="pl-10 space-y-4">
    <p>Après vous être connecté à GitHub, suivez ces étapes :</p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>Cliquez sur l'icône "+" dans le coin supérieur droit et sélectionnez "New repository"</li>
      <li>
        <strong>Nommez votre dépôt</strong> : Créez un dépôt nommé <code>nomutilisateur.github.io</code>, où 
        <code>nomutilisateur</code> est votre nom d'utilisateur GitHub
        <div class="text-sm text-slate-600 mt-1">
          Par exemple, si votre nom d'utilisateur est "ayadi", nommez le dépôt "ayadi.github.io"
        </div>
      </li>
      <li>Ajoutez éventuellement une description pour votre dépôt</li>
      <li>Choisissez la visibilité "Public" (requise pour GitHub Pages sauf si vous avez un compte Pro)</li>
      <li>Cochez l'option "Add a README file" pour initialiser le dépôt</li>
      <li>Cliquez sur "Create repository"</li>
    </ol>

    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <p class="font-medium text-slate-800 mb-2">💡 Astuce Pro</p>
      <p class="text-slate-700">
        Envisagez de créer un second dépôt privé pour stocker vos fichiers sources (avant qu'ils ne soient construits). Cela fournit 
        une sauvegarde au cas où vous auriez besoin d'apporter des modifications ultérieurement ou de récupérer des données perdues.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">2</div>
    Générer les fichiers du site web statique
  </h2>

  <div class="pl-10 space-y-4">
    <p>Si vous utilisez un générateur de site statique comme Hugo, assurez-vous que votre configuration est correctement définie :</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>baseURL = "https://nomutilisateur.github.io/"
# Remplacez nomutilisateur par votre nom d'utilisateur GitHub</code></pre>
    </div>
    
    <p>Générez vos fichiers de site web statique en exécutant la commande de construction appropriée :</p>
    <div class="grid grid-cols-1 gap-4 mb-4">
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>Pour Hugo</span>
        </div>
        <pre><code>$ hugo</code></pre>
      </div>
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>Pour Jekyll</span>
        </div>
        <pre><code>$ bundle exec jekyll build</code></pre>
      </div>
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>Pour React/Vue avec Vite</span>
        </div>
        <pre><code>$ npm run build</code></pre>
      </div>
    </div>
    
    <p>Cela générera des fichiers statiques dans un répertoire (<code>public/</code>, <code>_site/</code>, ou <code>dist/</code> selon votre framework).</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">3</div>
    Télécharger les fichiers générés sur GitHub
  </h2>

  <div class="pl-10 space-y-4">
    <p>Naviguez vers votre répertoire de construction et initialisez un dépôt Git :</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4">
      <pre><code>$ cd public  # ou _site ou dist
$ git init
$ git remote add origin https://github.com/nomutilisateur/nomutilisateur.github.io.git</code></pre>
    </div>
    
    <p>Ajoutez tous les fichiers et faites votre premier commit :</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4">
      <pre><code>$ git add .
$ git commit -m "Premier commit - Site web statique"</code></pre>
    </div>
    
    <p>Poussez vos fichiers sur GitHub :</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>$ git branch -M main
$ git push -u origin main</code></pre>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">4</div>
    Configurer GitHub Pages
  </h2>

  <div class="pl-10 space-y-4">
    <ol class="list-decimal pl-5 space-y-2">
      <li>Allez sur votre dépôt sur GitHub</li>
      <li>Cliquez sur l'onglet "Settings"</li>
      <li>Faites défiler jusqu'à la section "Pages" dans la barre latérale gauche</li>
      <li>Sous "Source", sélectionnez "Deploy from a branch"</li>
      <li>Sélectionnez la branche "main" et le dossier "/(root)"</li>
      <li>Cliquez sur "Save"</li>
    </ol>
    
    <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
      <p class="text-green-800">
        GitHub commencera à construire votre site. Une fois terminé, vous verrez un message de succès avec un lien vers votre 
        site publié (généralement https://nomutilisateur.github.io).
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">5</div>
    Mettre à jour votre site web
  </h2>

  <div class="pl-10 space-y-4">
    <p>Chaque fois que vous souhaitez mettre à jour votre site web :</p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>Apportez des modifications à vos fichiers sources</li>
      <li>Reconstruisez votre site statique avec la commande de construction appropriée</li>
      <li>Naviguez vers votre répertoire de construction</li>
      <li>Ajoutez et commitez vos modifications :</li>
    </ol>
    
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>$ git add .
$ git commit -m "Mise à jour du contenu du site web"
$ git push</code></pre>
    </div>
    
    <p class="mt-4">GitHub redéploiera automatiquement votre site web avec les modifications.</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">6</div>
    Utiliser GitHub Actions pour un déploiement automatisé
  </h2>

  <div class="pl-10 space-y-4">
    <p>Pour des flux de travail plus avancés, vous pouvez utiliser GitHub Actions pour automatiser le processus de construction et de déploiement :</p>
    
    <ol class="list-decimal pl-5 space-y-2">
      <li>Créez un répertoire <code>.github/workflows</code> dans votre dépôt source</li>
      <li>Ajoutez un fichier nommé <code>deploy.yml</code> avec une configuration de workflow appropriée</li>
      <li>Commitez et poussez ces modifications</li>
    </ol>
    
    <p>Avec GitHub Actions, vous pouvez conserver tous vos fichiers sources dans un seul dépôt et faire en sorte que GitHub construise et déploie automatiquement votre site chaque fois que vous poussez des modifications.</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4">Conclusion</h2>
  
  <p>
    GitHub Pages offre une excellente solution d'hébergement gratuite pour les sites web statiques. C'est particulièrement 
    utile pour les portfolios personnels, la documentation de projet et les blogs. Avec les étapes décrites ci-dessus, 
    vous pouvez rapidement mettre votre site web en ligne sans vous soucier de la gestion de serveur ou des coûts d'hébergement.
  </p>
  
  <div class="bg-primary-50 border-l-4 border-primary-500 p-4 my-8">
    <p class="text-primary-800 font-medium">
      Une fois votre site déployé, envisagez de configurer un domaine personnalisé pour le rendre plus professionnel. Consultez mon article 
      <a href="/blog/1" class="text-primary-700 underline">Configuration d'un domaine personnalisé pour votre site web</a> pour un guide détaillé.
    </p>
  </div>
</div>`,
          },
        },
        content: `
<div class="prose prose-lg max-w-none prose-headings:text-primary-900">
  <p class="text-xl leading-relaxed mb-8">
    We aim to host static websites using GitHub Pages service, which allows us to avoid maintaining our own server 
    and ensures more stability and security. This guide walks you through the process step-by-step.
  </p>

  <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
    <p class="text-amber-800 font-medium">
      <span class="font-bold">Note:</span> This guide is particularly useful for static site generators like Hugo, 
      Jekyll, or simple HTML/CSS/JavaScript websites.
    </p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">1</div>
    Prepare the GitHub Repository
  </h2>

  <div class="pl-10 space-y-4">
    <p>After logging in to GitHub, follow these steps:</p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>Click the "+" icon in the top right corner and select "New repository"</li>
      <li>
        <strong>Name your repository</strong>: Create a repository named <code>username.github.io</code>, where 
        <code>username</code> is your GitHub username
        <div class="text-sm text-slate-600 mt-1">
          For example, if your username is "ayadi", name the repository "ayadi.github.io"
        </div>
      </li>
      <li>Optionally, add a description for your repository</li>
      <li>Choose "Public" visibility (required for GitHub Pages unless you have a Pro account)</li>
      <li>Check the option to "Add a README file" to initialize the repository</li>
      <li>Click "Create repository"</li>
    </ol>

    <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
      <p class="font-medium text-slate-800 mb-2">💡 Pro Tip</p>
      <p class="text-slate-700">
        Consider creating a second private repository to store your source files (before they're built). This provides 
        a backup in case you need to make changes later or recover from data loss.
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">2</div>
    Generate Static Website Files
  </h2>

  <div class="pl-10 space-y-4">
    <p>If you're using a static site generator like Hugo, ensure your configuration is correctly set up:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>baseURL = "https://username.github.io/"
# Replace username with your GitHub username</code></pre>
    </div>
    
    <p>Generate your static website files by running the appropriate build command:</p>
    <div class="grid grid-cols-1 gap-4 mb-4">
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>For Hugo</span>
        </div>
        <pre><code>$ hugo</code></pre>
      </div>
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>For Jekyll</span>
        </div>
        <pre><code>$ bundle exec jekyll build</code></pre>
      </div>
      <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
        <div class="flex items-center text-xs text-slate-400 mb-2">
          <span>For React/Vue with Vite</span>
        </div>
        <pre><code>$ npm run build</code></pre>
      </div>
    </div>
    
    <p>This will generate static files in a directory (<code>public/</code>, <code>_site/</code>, or <code>dist/</code> depending on your framework).</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">3</div>
    Upload the Generated Files to GitHub
  </h2>

  <div class="pl-10 space-y-4">
    <p>Navigate to your build directory and initialize a Git repository:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4">
      <pre><code>$ cd public  # or _site or dist
$ git init
$ git remote add origin https://github.com/username/username.github.io.git</code></pre>
    </div>
    
    <p>Add all files and make your first commit:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4">
      <pre><code>$ git add .
$ git commit -m "Initial commit - Static website"</code></pre>
    </div>
    
    <p>Push your files to GitHub:</p>
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>$ git branch -M main
$ git push -u origin main</code></pre>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">4</div>
    Configure GitHub Pages
  </h2>

  <div class="pl-10 space-y-4">
    <ol class="list-decimal pl-5 space-y-2">
      <li>Go to your repository on GitHub</li>
      <li>Click on "Settings" tab</li>
      <li>Scroll down to the "Pages" section in the left sidebar</li>
      <li>Under "Source", select "Deploy from a branch"</li>
      <li>Select the "main" branch and "/(root)" folder</li>
      <li>Click "Save"</li>
    </ol>
    
    <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
      <p class="text-green-800">
        GitHub will start building your site. Once complete, you'll see a success message with a link to your 
        published site (typically https://username.github.io).
      </p>
    </div>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">5</div>
    Updating Your Website
  </h2>

  <div class="pl-10 space-y-4">
    <p>Whenever you want to update your website:</p>
    <ol class="list-decimal pl-5 space-y-2">
      <li>Make changes to your source files</li>
      <li>Rebuild your static site with the appropriate build command</li>
      <li>Navigate to your build directory</li>
      <li>Add and commit your changes:</li>
    </ol>
    
    <div class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
      <pre><code>$ git add .
$ git commit -m "Update website content"
$ git push</code></pre>
    </div>
    
    <p class="mt-4">GitHub will automatically redeploy your website with the changes.</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
    <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-800">6</div>
    Using GitHub Actions for Automated Deployment
  </h2>

  <div class="pl-10 space-y-4">
    <p>For more advanced workflows, you can use GitHub Actions to automate the build and deployment process:</p>
    
    <ol class="list-decimal pl-5 space-y-2">
      <li>Create a <code>.github/workflows</code> directory in your source repository</li>
      <li>Add a file named <code>deploy.yml</code> with appropriate workflow configuration</li>
      <li>Commit and push these changes</li>
    </ol>
    
    <p>With GitHub Actions, you can keep all your source files in a single repository and have GitHub automatically build and deploy your site whenever you push changes.</p>
  </div>

  <h2 class="text-2xl font-bold mt-10 mb-4">Conclusion</h2>
  
  <p>
    GitHub Pages provides an excellent, free hosting solution for static websites. It's particularly 
    useful for personal portfolios, project documentation, and blogs. With the steps outlined above, 
    you can quickly get your website online without worrying about server management or hosting costs.
  </p>
  
  <div class="bg-primary-50 border-l-4 border-primary-500 p-4 my-8">
    <p class="text-primary-800 font-medium">
      Once your site is deployed, consider setting up a custom domain to make it more professional. Check out my article 
      <a href="/blog/1" class="text-primary-700 underline">Setting Up a Custom Domain for Your Website</a> for a detailed guide.
    </p>
  </div>
</div>`,
        coverImage: "/images/github-pages.svg",
        category: "Technology",
        publishedAt: new Date("2025-02-08"),
      },
      {
        title: "Mastering SQL Window Functions: A Comprehensive Guide",
        excerpt:
          "SQL window functions are one of the most powerful and flexible tools available to analysts and developers. Learn how to leverage RANK(), ROW_NUMBER(), PARTITION BY, and other advanced SQL features to transform your data analysis.",
        translations: {
          en: {
            title: "Mastering SQL Window Functions: A Comprehensive Guide",
            excerpt:
              "SQL window functions are one of the most powerful and flexible tools available to analysts and developers. Learn how to leverage RANK(), ROW_NUMBER(), PARTITION BY, and other advanced SQL features to transform your data analysis.",
            content: `<div class="article-header"><img src="/images/sql-window-functions.svg" alt="SQL Window Functions Diagram" class="article-featured-image" /><p class="article-date">April 21, 2025</p></div><p>SQL window functions are one of the most powerful and flexible tools available to analysts and developers. They allow for sophisticated calculations across rows of data while preserving the individual rows, which makes them ideal for a wide range of use cases, from ranking and cumulative sums to moving averages and comparisons.</p><p>This blog post provides a detailed overview of all major window functions using the Employees table as an example.</p><div class="code-block"><pre><code>-- Create the table
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    DivisionID INT,
    ManagerID INT,
    Salary DECIMAL(10, 2)
);

-- Insert data into the Employees table
INSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)
VALUES
(356, 'Daniel Smith', 100, 133, 40000),
(122, 'Arnold Sully', 101, NULL, 60000),
(467, 'Lisa Roberts', 100, NULL, 80000),
(112, 'Mary Dial', 105, 467, 65000),
(775, 'Dennis Front', 103, NULL, 90000),
(111, 'Larry Weis', 104, 35534, 75000),
(222, 'Mark Red', 102, 133, 86000),
(577, 'Robert Night', 105, 12353, 76000),
(133, 'Susan Wall', 105, 577, 110000);</code></pre></div><h2 class="section-title">What Are SQL Window Functions?</h2><p>SQL window functions operate on a set of rows, known as a "window," defined by the OVER() clause. Unlike aggregate functions such as SUM() or COUNT(), window functions return a result for each row in the dataset, making them incredibly powerful for detailed analysis that requires both individual row-level calculations and group-level operations.</p><h2 class="section-title">Syntax Overview</h2><p>The general syntax of a window function looks like this:</p><div class="code-block"><pre><code>&lt;window_function&gt;() OVER (
    [PARTITION BY column1, column2, ...]
    [ORDER BY column3, column4, ...]
)</code></pre></div><ul><li><strong>window_function</strong>: The window function (e.g., ROW_NUMBER(), SUM(), RANK(), etc.).</li><li><strong>PARTITION BY</strong>: Divides the dataset into partitions (optional).</li><li><strong>ORDER BY</strong>: Specifies the ordering of rows within each partition (optional).</li><li><strong>OVER()</strong>: Defines the window of rows for the function.</li></ul><h2 class="section-title">Key SQL Window Functions</h2><div class="numbered-section"><div class="number-circle">1</div><h3>Ranking Functions</h3></div><p>Ranking functions are useful when you want to assign a rank to each row within a partition. They are commonly used in scenarios such as leaderboard generation or employee salary rankings.</p><div class="highlight-box"><h4>ROW_NUMBER()</h4><p>Generates a unique number for each row in the partition. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>This query ranks employees in each department by their salary in descending order.</p></div><div class="highlight-box"><h4>RANK()</h4><p>Assigns a rank to each row, but leaves gaps when there are ties. The next rank is skipped for rows with the same value. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>If two employees have the same salary, they will have the same rank, and the next rank will be skipped.</p></div><div class="highlight-box"><h4>DENSE_RANK()</h4><p>Similar to RANK(), but without gaps in ranking. All rows with the same value receive the same rank, but subsequent ranks are not skipped. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    DENSE_RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div></div><p>The query results are same and will be:</p><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>SalaryRank</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>1</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>2</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>1</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>1</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>1</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>1</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>1</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>2</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>3</td></tr></tbody></table></div><div class="numbered-section"><div class="number-circle">2</div><h3>Aggregate Functions (Windowed)</h3></div><p>Window functions can be combined with aggregate functions, allowing you to calculate values like running totals or averages without collapsing the rows into a single result.</p><div class="highlight-box"><h4>SUM()</h4><p>Calculates the cumulative sum over a window of rows. Example:</p><div class="code-block"><pre><code>SELECT employee_id, salary,
       SUM(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS cumulative_salary
FROM employees;</code></pre></div><p>This query calculates the cumulative salary for each employee in each department.</p></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>CumulativeSalary</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>80000.00</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>120000.00</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>60000.00</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>86000.00</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>90000.00</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>75000.00</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>110000.00</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>186000.00</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>251000.00</td></tr></tbody></table></div><div class="highlight-box"><h4>AVG()</h4><p>Calculates the average salary for employees in each department. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    AVG(Salary) OVER (PARTITION BY DivisionID) AS AvgSalary
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>AvgSalary</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>60000.000000</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>60000.000000</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>60000.000000</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>86000.000000</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>90000.000000</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>75000.000000</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>83666.666667</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>83666.666667</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>83666.666667</td></tr></tbody></table></div><div class="highlight-box"><h4>COUNT()</h4><p>Counts the number of rows in the window. Example:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    COUNT(*) OVER (PARTITION BY DivisionID) AS EmployeeCount
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>EmployeeCount</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>2</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>2</td></tr><tr><td>101</td><td>Arnold Sully</td><td>1</td></tr><tr><td>102</td><td>Mark Red</td><td>1</td></tr><tr><td>103</td><td>Dennis Front</td><td>1</td></tr><tr><td>104</td><td>Larry Weis</td><td>1</td></tr><tr><td>105</td><td>Mary Dial</td><td>3</td></tr><tr><td>105</td><td>Susan Wall</td><td>3</td></tr><tr><td>105</td><td>Robert Night</td><td>3</td></tr></tbody></table></div><div class="highlight-box"><h4>MAX() / MIN()</h4><p>Returns the maximum or minimum value in a window. Example: Find the highest salary in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    MAX(Salary) OVER (PARTITION BY DivisionID) AS MaxSalary
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>MaxSalary</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>80000.00</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>80000.00</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>60000.00</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>86000.00</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>90000.00</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>75000.00</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>110000.00</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>110000.00</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>110000.00</td></tr></tbody></table></div><div class="numbered-section"><div class="number-circle">3</div><h3>Window-Based Row Navigation</h3></div><p>These functions allow you to reference values from previous or next rows, which is especially useful for calculating differences, moving averages, or time-based comparisons.</p><div class="highlight-box"><h4>LAG()</h4><p>Returns the value of a specified column from a previous row in the same partition. Example: Find the previous salary in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    LAG(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS PreviousSalary
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>PreviousSalary</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td></td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>80000.00</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td></td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td></td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td></td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td></td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td></td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>110000.00</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>76000.00</td></tr></tbody></table></div><div class="highlight-box"><h4>LEAD()</h4><p>Returns the value of a specified column from a subsequent row in the same partition. Example: Find the next salary in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    LEAD(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS NextSalary
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>NextSalary</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>40000.00</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td></td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td></td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td></td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td></td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td></td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>76000.00</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>65000.00</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td></td></tr></tbody></table></div><div class="numbered-section"><div class="number-circle">4</div><h3>First and Last Value Functions</h3></div><p>These functions return the first or last value in a window.</p><div class="highlight-box"><h4>FIRST_VALUE()</h4><p>Returns the first value in the window. Example: Find the highest-paid employee in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    FIRST_VALUE(Name) OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS TopEarner
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>TopEarner</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>Lisa Roberts</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>Lisa Roberts</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>Arnold Sully</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>Mark Red</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>Dennis Front</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>Larry Weis</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>Susan Wall</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>Susan Wall</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>Susan Wall</td></tr></tbody></table></div><div class="highlight-box"><h4>LAST_VALUE()</h4><p>Returns the last value in the window. Example: Find the lowest-paid employee in each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    LAST_VALUE(Name) OVER (PARTITION BY DivisionID ORDER BY Salary ASC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS LowestEarner
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>LowestEarner</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>Lisa Roberts</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>Lisa Roberts</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>Arnold Sully</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>Mark Red</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>Dennis Front</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>Larry Weis</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>Susan Wall</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>Susan Wall</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>Susan Wall</td></tr></tbody></table></div><div class="numbered-section"><div class="number-circle">5</div><h3>Windowing Clauses (ROWS and RANGE)</h3></div><p>In SQL, the ROWS and RANGE clauses let you specify the exact set of rows that make up the window. This is particularly useful for time-series analysis or when comparing a specific range of rows.</p><div class="highlight-box"><h4>ROWS Example</h4><p>Defines the window in terms of physical rows (e.g., the current row and the previous 2 rows). Example: Calculate a moving average of salaries for each department.</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    AVG(Salary) OVER (PARTITION BY DivisionID ORDER BY Salary ASC ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) AS MovingAvg
FROM Employees;</code></pre></div></div><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>MovingAvg</th></tr></thead><tbody><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>40000.000000</td></tr><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>60000.000000</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>60000.000000</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>86000.000000</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>90000.000000</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>75000.000000</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>65000.000000</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>70500.000000</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>93000.000000</td></tr></tbody></table></div><h2 class="section-title">Common Use Cases for Window Functions</h2><div class="numbered-section"><div class="number-circle">1</div><h3>Cumulative Calculations</h3></div><p>You can calculate running totals, averages, or other aggregate values that accumulate over a set of rows.</p><div class="numbered-section"><div class="number-circle">2</div><h3>Ranking and Sorting</h3></div><p>Ranking employees, products, or sales figures is a common use case for window functions, especially when dealing with ties and top-N queries.</p><div class="numbered-section"><div class="number-circle">3</div><h3>Time-Series Analysis</h3></div><p>For applications involving time-series data, window functions like LAG() and LEAD() are essential for calculating differences over time (e.g., month-over-month growth).</p><div class="numbered-section"><div class="number-circle">4</div><h3>Comparative Analysis</h3></div><p>Window functions enable comparisons between rows, such as comparing each employee's salary to the one before or after them in the same department.</p><h2 class="section-title">Conclusion</h2><p>SQL window functions are incredibly powerful tools that enable sophisticated data analysis without collapsing your dataset. Whether you need to rank items, calculate running totals, or compare rows within partitions, window functions provide a flexible and efficient way to handle these tasks.</p><div class="social-sharing"><h4>Share this article:</h4><div class="social-icons"><a href="https://twitter.com/intent/tweet?text=Mastering%20SQL%20Window%20Functions:%20A%20Comprehensive%20Guide&url=https://mohamedayadi.com/blog/mastering-sql-window-functions" class="twitter-share"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a><a href="https://www.linkedin.com/sharing/share-offsite/?url=https://mohamedayadi.com/blog/mastering-sql-window-functions" class="linkedin-share"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a><a href="https://github.com/Mayedi007" class="github-profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a></div></div>`,
          },
          de: {
            title:
              "Beherrschung von SQL-Fensterfunktionen: Ein umfassender Leitfaden",
            excerpt:
              "SQL-Fensterfunktionen sind eines der leistungsstärksten und flexibelsten Werkzeuge, die Analysten und Entwicklern zur Verfügung stehen. Erfahren Sie, wie Sie RANK(), ROW_NUMBER(), PARTITION BY und andere fortschrittliche SQL-Funktionen nutzen können, um Ihre Datenanalyse zu transformieren.",
            content: `<div class="article-header"><img src="/images/sql-window-functions.svg" alt="SQL-Fensterfunktionen Diagramm" class="article-featured-image" /><p class="article-date">21. April 2025</p></div><p>SQL-Fensterfunktionen sind eines der leistungsstärksten und flexibelsten Werkzeuge, die Analysten und Entwicklern zur Verfügung stehen. Sie ermöglichen anspruchsvolle Berechnungen über Datenzeilen hinweg, wobei die einzelnen Zeilen erhalten bleiben, was sie ideal für eine Vielzahl von Anwendungsfällen macht, von Ranking und kumulativen Summen bis hin zu gleitenden Durchschnitten und Vergleichen.</p><p>Dieser Blogbeitrag bietet einen detaillierten Überblick über alle wichtigen Fensterfunktionen am Beispiel der Employees-Tabelle.</p><div class="code-block"><pre><code>-- Tabelle erstellen
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    DivisionID INT,
    ManagerID INT,
    Salary DECIMAL(10, 2)
);

-- Daten in die Employees-Tabelle einfügen
INSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)
VALUES
(356, 'Daniel Smith', 100, 133, 40000),
(122, 'Arnold Sully', 101, NULL, 60000),
(467, 'Lisa Roberts', 100, NULL, 80000),
(112, 'Mary Dial', 105, 467, 65000),
(775, 'Dennis Front', 103, NULL, 90000),
(111, 'Larry Weis', 104, 35534, 75000),
(222, 'Mark Red', 102, 133, 86000),
(577, 'Robert Night', 105, 12353, 76000),
(133, 'Susan Wall', 105, 577, 110000);</code></pre></div><h2 class="section-title">Was sind SQL-Fensterfunktionen?</h2><p>SQL-Fensterfunktionen operieren auf einer Gruppe von Zeilen, einem sogenannten "Fenster", das durch die OVER()-Klausel definiert wird. Im Gegensatz zu Aggregatfunktionen wie SUM() oder COUNT() geben Fensterfunktionen ein Ergebnis für jede Zeile im Datensatz zurück, was sie unglaublich leistungsstark für detaillierte Analysen macht, die sowohl zeilenbasierte als auch gruppenbasierte Operationen erfordern.</p><h2 class="section-title">Syntax-Übersicht</h2><p>Die allgemeine Syntax einer Fensterfunktion sieht wie folgt aus:</p><div class="code-block"><pre><code>&lt;window_function&gt;() OVER (
    [PARTITION BY column1, column2, ...]
    [ORDER BY column3, column4, ...]
)</code></pre></div><ul><li><strong>window_function</strong>: Die Fensterfunktion (z.B. ROW_NUMBER(), SUM(), RANK(), etc.).</li><li><strong>PARTITION BY</strong>: Teilt den Datensatz in Partitionen (optional).</li><li><strong>ORDER BY</strong>: Legt die Sortierung der Zeilen innerhalb jeder Partition fest (optional).</li><li><strong>OVER()</strong>: Definiert das Fenster der Zeilen für die Funktion.</li></ul><h2 class="section-title">Wichtige SQL-Fensterfunktionen</h2><div class="numbered-section"><div class="number-circle">1</div><h3>Ranking-Funktionen</h3></div><p>Ranking-Funktionen sind nützlich, wenn Sie jeder Zeile innerhalb einer Partition einen Rang zuweisen möchten. Sie werden häufig in Szenarien wie Bestenlisten oder Mitarbeitergehaltsrankings verwendet.</p><div class="highlight-box"><h4>ROW_NUMBER()</h4><p>Generiert eine eindeutige Nummer für jede Zeile in der Partition. Beispiel:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>Diese Abfrage ordnet Mitarbeiter in jeder Abteilung nach ihrem Gehalt in absteigender Reihenfolge.</p></div><div class="highlight-box"><h4>RANK()</h4><p>Weist jeder Zeile einen Rang zu, lässt aber Lücken, wenn es Gleichstände gibt. Der nächste Rang wird für Zeilen mit demselben Wert übersprungen. Beispiel:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>Wenn zwei Mitarbeiter das gleiche Gehalt haben, erhalten sie den gleichen Rang, und der nächste Rang wird übersprungen.</p></div><div class="highlight-box"><h4>DENSE_RANK()</h4><p>Ähnlich wie RANK(), aber ohne Lücken im Ranking. Alle Zeilen mit demselben Wert erhalten den gleichen Rang, aber nachfolgende Ränge werden nicht übersprungen. Beispiel:</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    DENSE_RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div></div><p>Die Abfrageergebnisse sind gleich und lauten:</p><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>SalaryRank</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>1</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>2</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>1</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>1</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>1</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>1</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>1</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>2</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>3</td></tr></tbody></table></div>`,
          },
          fr: {
            title:
              "Maîtriser les fonctions de fenêtrage SQL : Un guide complet",
            excerpt:
              "Les fonctions de fenêtrage SQL sont l'un des outils les plus puissants et flexibles disponibles pour les analystes et les développeurs. Apprenez à utiliser RANK(), ROW_NUMBER(), PARTITION BY et d'autres fonctionnalités SQL avancées pour transformer votre analyse de données.",
            content: `<div class="article-header"><img src="/images/sql-window-functions.svg" alt="Diagramme des fonctions de fenêtrage SQL" class="article-featured-image" /><p class="article-date">21 avril 2025</p></div><p>Les fonctions de fenêtrage SQL sont l'un des outils les plus puissants et flexibles disponibles pour les analystes et les développeurs. Elles permettent d'effectuer des calculs sophistiqués sur des lignes de données tout en préservant les lignes individuelles, ce qui les rend idéales pour une large gamme de cas d'utilisation, du classement et des sommes cumulatives aux moyennes mobiles et aux comparaisons.</p><p>Ce billet de blog fournit un aperçu détaillé de toutes les principales fonctions de fenêtrage en utilisant la table Employees comme exemple.</p><div class="code-block"><pre><code>-- Créer la table
CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    Name VARCHAR(100),
    DivisionID INT,
    ManagerID INT,
    Salary DECIMAL(10, 2)
);

-- Insérer des données dans la table Employees
INSERT INTO Employees (ID, Name, DivisionID, ManagerID, Salary)
VALUES
(356, 'Daniel Smith', 100, 133, 40000),
(122, 'Arnold Sully', 101, NULL, 60000),
(467, 'Lisa Roberts', 100, NULL, 80000),
(112, 'Mary Dial', 105, 467, 65000),
(775, 'Dennis Front', 103, NULL, 90000),
(111, 'Larry Weis', 104, 35534, 75000),
(222, 'Mark Red', 102, 133, 86000),
(577, 'Robert Night', 105, 12353, 76000),
(133, 'Susan Wall', 105, 577, 110000);</code></pre></div><h2 class="section-title">Que sont les fonctions de fenêtrage SQL?</h2><p>Les fonctions de fenêtrage SQL opèrent sur un ensemble de lignes, appelé « fenêtre », défini par la clause OVER(). Contrairement aux fonctions d'agrégation comme SUM() ou COUNT(), les fonctions de fenêtrage renvoient un résultat pour chaque ligne du jeu de données, ce qui les rend incroyablement puissantes pour des analyses détaillées nécessitant à la fois des calculs au niveau des lignes individuelles et des opérations au niveau du groupe.</p><h2 class="section-title">Aperçu de la syntaxe</h2><p>La syntaxe générale d'une fonction de fenêtrage ressemble à ceci :</p><div class="code-block"><pre><code>&lt;window_function&gt;() OVER (
    [PARTITION BY column1, column2, ...]
    [ORDER BY column3, column4, ...]
)</code></pre></div><ul><li><strong>window_function</strong> : La fonction de fenêtrage (par exemple, ROW_NUMBER(), SUM(), RANK(), etc.).</li><li><strong>PARTITION BY</strong> : Divise le jeu de données en partitions (facultatif).</li><li><strong>ORDER BY</strong> : Spécifie l'ordre des lignes dans chaque partition (facultatif).</li><li><strong>OVER()</strong> : Définit la fenêtre de lignes pour la fonction.</li></ul><h2 class="section-title">Fonctions de fenêtrage SQL clés</h2><div class="numbered-section"><div class="number-circle">1</div><h3>Fonctions de classement</h3></div><p>Les fonctions de classement sont utiles lorsque vous voulez attribuer un rang à chaque ligne au sein d'une partition. Elles sont couramment utilisées dans des scénarios tels que la génération de classements ou les classements de salaires d'employés.</p><div class="highlight-box"><h4>ROW_NUMBER()</h4><p>Génère un numéro unique pour chaque ligne de la partition. Exemple :</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    ROW_NUMBER() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>Cette requête classe les employés de chaque département par leur salaire en ordre décroissant.</p></div><div class="highlight-box"><h4>RANK()</h4><p>Attribue un rang à chaque ligne, mais laisse des écarts lorsqu'il y a des égalités. Le rang suivant est sauté pour les lignes ayant la même valeur. Exemple :</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div><p>Si deux employés ont le même salaire, ils auront le même rang, et le rang suivant sera sauté.</p></div><div class="highlight-box"><h4>DENSE_RANK()</h4><p>Similaire à RANK(), mais sans écarts dans le classement. Toutes les lignes avec la même valeur reçoivent le même rang, mais les rangs suivants ne sont pas sautés. Exemple :</p><div class="code-block"><pre><code>SELECT
    DivisionID,
    Name,
    Salary,
    DENSE_RANK() OVER (PARTITION BY DivisionID ORDER BY Salary DESC) AS SalaryRank
FROM Employees;</code></pre></div></div><p>Les résultats de la requête sont les mêmes et seront :</p><div class="table-container"><table><thead><tr><th>DivisionID</th><th>Name</th><th>Salary</th><th>SalaryRank</th></tr></thead><tbody><tr><td>100</td><td>Lisa Roberts</td><td>80000.00</td><td>1</td></tr><tr><td>100</td><td>Daniel Smith</td><td>40000.00</td><td>2</td></tr><tr><td>101</td><td>Arnold Sully</td><td>60000.00</td><td>1</td></tr><tr><td>102</td><td>Mark Red</td><td>86000.00</td><td>1</td></tr><tr><td>103</td><td>Dennis Front</td><td>90000.00</td><td>1</td></tr><tr><td>104</td><td>Larry Weis</td><td>75000.00</td><td>1</td></tr><tr><td>105</td><td>Susan Wall</td><td>110000.00</td><td>1</td></tr><tr><td>105</td><td>Robert Night</td><td>76000.00</td><td>2</td></tr><tr><td>105</td><td>Mary Dial</td><td>65000.00</td><td>3</td></tr></tbody></table></div>`,
          },
        },
        slug: "mastering-sql-window-functions",
        tags: [
          "SQL",
          "Database",
          "Data Analysis",
          "Development",
          "Programming",
        ],
        createdAt: new Date("2025-04-21T10:00:00.000Z"),
        updatedAt: new Date("2025-04-21T10:00:00.000Z"),
        featured: true,
        publishedAt: new Date("2025-04-21T10:00:00.000Z"),
        author: {
          name: "Mohamed Ayadi",
          avatar: "/images/avatar.png",
          bio: "A passionate Full Stack Developer with over 7 years of experience.",
        },
        coverImage: "/images/sql-window-functions.svg",
        category: "Database",
      },
      {
        title: "Advanced Asynchronous Programming in JavaScript",
        excerpt:
          "Master the art of asynchronous programming in JavaScript with practical techniques for handling complex workflows, error management, and optimization strategies for modern web applications.",
        slug: "advanced-asynchronous-programming-javascript",
        tags: [
          "JavaScript",
          "Web Development",
          "Programming",
          "Async/Await",
          "Promises",
        ],
        createdAt: "2025-04-15T10:00:00.000Z",
        updatedAt: "2025-04-15T10:00:00.000Z",
        featured: true,
        publishedAt: "2025-04-15T10:00:00.000Z",
        author: {
          name: "Mohamed Ayadi",
          avatar: "/images/avatar.png",
          bio: "A passionate Full Stack Developer with over 7 years of experience.",
        },
        coverImage: "/images/async-javascript.svg",
        category: "Programming",
      },
    ];

    // Add articles
    articles.forEach((article) => {
      const id = this.currentArticleId++;
      this.articles.set(id, {
        ...article,
        id,
      });
    });
  }
}

export const storage = new MemStorage();
