import { 
  users, 
  type User, 
  type InsertUser, 
  type Article, 
  type CV, 
  type ContactMessage,
  type NewsletterSubscription,
  type SkillCategory,
  type Experience,
  type Education,
  type Language
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Article methods
  getArticles(limit?: number, language?: string): Promise<Article[]>;
  getArticleById(id: number, language?: string): Promise<Article | undefined>;
  
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
    this.cvs = {};

    // English CV
    this.cv = {
      name: "MOHAMED ABDELLATIF AYADI",
      photoUrl: "/images/avatar.png",
      title: "Computer Science Student (B.Sc.) at the Technical University of Dortmund",
      summary:
        "I am Mohamed Abdellatif Ayadi, a Computer Science student at the Technical University of Dortmund with practical experience as a working student in sales and software development. Selling with passion, studying with ambition, social commitment with heart - this motto accompanies me both academically and professionally. With great enthusiasm for software development, artificial intelligence, and technological innovations, I am currently looking for a working student position to deepen my knowledge in a practical way and specifically develop in the areas of development or IT consulting.",
      email: "mohamed.ayadi.data@gmail.com",
      phone: "0152 5230 1739",
      location: "Dortmund, Germany",
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
      certifications: [],
      languages: [
        { name: "German", proficiency: "Fluent at negotiation level" },
        { name: "English", proficiency: "Fluent at negotiation level" },
        { name: "French", proficiency: "Native" },
        { name: "Arabic", proficiency: "Native" },
        { name: "Italian", proficiency: "Basic knowledge" }
      ]
    };

    // German CV
    const germanCV: CV = {
      name: "MOHAMED ABDELLATIF AYADI",
      photoUrl: "/images/avatar.png",
      title: "Informatikstudent an der Technischen Universität Dortmund",
      summary: `Ich bin Mohamed Abdellatif Ayadi, Informatikstudent an der Technischen Universität Dortmund mit praktischer Erfahrung als Werkstudent im Vertrieb sowie in der Softwareentwicklung.
    Vertrieb mit Leidenschaft, Studium mit Ehrgeiz, sozialer Einsatz mit Herz – dieses Motto begleitet mich sowohl akademisch als auch beruflich.
    Mit großer Begeisterung für Softwareentwicklung, Künstliche Intelligenz und technologische Innovationen strebe ich aktuell eine Werkstudentenstelle an, um meine Kenntnisse praxisnah zu vertiefen und mich gezielt in den Bereichen Entwicklung oder IT-Consulting weiterzuentwickeln.`,
      email: "mohamed.ayadi.data@gmail.com",
      phone: "0152 5230 1739",
      location: "Dortmund, Deutschland",
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
      experience: [
        {
          company: "Iperceramica Deutschland GmbH",
          position: "Werkstudent",
          startDate: "2024-04",
          endDate: "Present",
          description: `• Nutzung von SAP und SAP S/4HANA zur Optimierung von Beständen, Aufträgen, Lieferprozessen und der Bearbeitung von Reklamationen.
    • Aktive Kundengewinnung im B2B- und B2C-Bereich durch gezielte Akquise und Aufbau langfristiger Kundenbeziehungen. Verkauf und Beratung von hochwertigen Fliesen, Parkett, Sanitär und Badezimmermöbeln.
    • Pflege von Kundendaten und Partnerbeziehungen in CRM und PRM-Systemen zur Verbesserung der Kommunikation und Zusammenarbeit.`
        },
        {
          company: "Technische Universität Dortmund",
          position: "Studentischer Tutor",
          startDate: "2023-10",
          endDate: "2024-04",
          description: `• Tutor im Kurs "Datenstrukturen, Algorithmen und Programmierung 1" (Minijob).
    • Durchführung von Tutorien für Erstsemester mit Fokus auf objektorientierte Programmierung in Java.
    • Aufgaben: Programmierübungen, Vertiefung der Vorlesungsinhalte, Hausaufgabenbetreuung, Prüfungsvorbereitung.`
        }
      ],
      projects: [
        {
          title: "KI-gestützter Chatbot",
          description: "Integration der OpenAI API in ein persönliches Web-Portfolio zur Schaffung eines interaktiven Nutzererlebnisses."
        },
        {
          title: "Flash Sale Plattform",
          description: "Entwicklung einer skalierbaren Backend-Plattform für Flash-Sales mit Fokus auf Performance und Transaktionssicherheit."
        },
        {
          title: "Reddit Data Streaming Pipeline",
          description: "Echtzeit-Datenpipeline zur Analyse von Reddit-Datenströmen unter Einsatz moderner Data Engineering-Technologien."
        },
        {
          title: "Kaggle-Wettbewerb: Corporación Favorita",
          description: "Entwicklung eines Frameworks für On-the-Fly Data Augmentation zur Verbesserung der Prognosegenauigkeit."
        },
        {
          title: "UML-Visualisierungs-Plugin",
          description: "Entwicklung eines Eclipse-Plugins zur Analyse der Architektur eines Flugmanagementsystems zur Wartbarkeitsverbesserung."
        }
      ],
      education: [
        {
          institution: "Technische Universität Dortmund",
          degree: "B.Sc. Informatik",
          startDate: "2022-09",
          endDate: "2027-09",
          location: "Dortmund, Deutschland",
          description: "Schwerpunkte: Softwareentwicklung, Algorithmen, Künstliche Intelligenz"
        },
        {
          institution: "Goethe-Institut Düsseldorf",
          degree: "Intensivsprachkurs C1",
          startDate: "2022-09",
          endDate: "2022-09",
          location: "Düsseldorf, Deutschland",
          description: "Deutsch-Sprachkurs mit Abschluss auf C1-Niveau"
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
      certifications: [],
      languages: [
        { name: "Deutsch", proficiency: "Fließend bis verhandlungssicher" },
        { name: "Englisch", proficiency: "Fließend bis verhandlungssicher" },
        { name: "Französisch", proficiency: "Muttersprache" },
        { name: "Arabisch", proficiency: "Muttersprache" },
        { name: "Italienisch", proficiency: "Basiskenntnisse" }
      ],
      interests: [
        "Lesen von Fachbüchern über Finanzen, Technologie und Innovationen",
        "Teilnahme an Fachmessen und Veranstaltungen zur Technologieneuheiten",
        "Teilen von Eindrücken und Wissen auf LinkedIn",
        "Sportlich aktiv, insbesondere regelmäßiges Padelspielen"
      ]
    };


    // French CV
    const frenchCV: CV = {
      name: "MOHAMED ABDELLATIF AYADI",
      photoUrl: "/images/avatar.png",
      title: "Étudiant en Informatique (B.Sc.) à l'Université Technique de Dortmund",
      summary: "Je suis Mohamed Abdellatif Ayadi, étudiant en informatique à l'Université Technique de Dortmund avec une expérience pratique en tant qu'étudiant salarié dans la vente et le développement de logiciels. Vendre avec passion, étudier avec ambition, engagement social avec cœur - cette devise m'accompagne tant académiquement que professionnellement. Avec un grand enthousiasme pour le développement de logiciels, l'intelligence artificielle et les innovations technologiques, je recherche actuellement un poste d'étudiant salarié pour approfondir mes connaissances de manière pratique et me développer spécifiquement dans les domaines du développement ou du conseil en informatique.",
      email: "mohamed.ayadi.data@gmail.com",
      phone: "0152 5230 1739",
      location: "Dortmund, Allemagne",
      skills: [
        {
          category: "IA Générative et Intelligence Artificielle",
          items: [
            "Développement d'applications avec l'API OpenAI",
            "Développement de chatbots",
            "Augmentation de données",
            "Deep Learning",
            "Prévision",
            "Apprentissage automatique"
          ]
        },
        {
          category: "Développement Logiciel et Technologies Backend",
          items: [
            "Programmation Orientée Objet (POO)",
            "Java",
            "Python",
            "C",
            "Spring Boot",
            "Docker",
            "Développement d'API",
            "Conception de bases de données (MySQL)"
          ]
        },
        {
          category: "Ingénierie et Analyse de Données",
          items: [
            "Pipelines de données en temps réel",
            "Data Warehousing",
            "Analyse de séries temporelles",
            "Processus ETL",
            "Notions de Big Data"
          ]
        },
        {
          category: "Outils et Plateformes",
          items: [
            "GitLab",
            "Eclipse",
            "Microsoft Visual Studio",
            "Administration système Linux"
          ]
        },
        {
          category: "Compétences en Vente et Business",
          items: [
            "SAP",
            "SAP S/4HANA",
            "Systèmes CRM",
            "Acquisition de clients B2B/B2C",
            "Communication et gestion des relations"
          ]
        }
      ],
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
          description: "Spécialisation : Développement logiciel, Algorithmes, Intelligence artificielle"
        },
        {
          institution: "Institut Goethe de Düsseldorf",
          degree: "Cours intensif d'allemand C1",
          startDate: "2022-09",
          endDate: "2022-09",
          location: "Düsseldorf, Allemagne",
          description: "Cours d'allemand avec certification de niveau C1"
        },
        {
          institution: "Lycée Pilote de Sfax",
          degree: "Baccalauréat en Mathématiques",
          startDate: "2018-09",
          endDate: "2021-07",
          location: "Sfax, Tunisie",
          description: "Spécialisation en mathématiques"
        }
      ],
      certifications: [],
      languages: [
        { name: "Allemand", proficiency: "Courant niveau négociation" },
        { name: "Anglais", proficiency: "Courant niveau négociation" },
        { name: "Français", proficiency: "Langue maternelle" },
        { name: "Arabe", proficiency: "Langue maternelle" },
        { name: "Italien", proficiency: "Connaissances de base" }
      ]
    };

    // Store all language versions
    this.cvs = {
      en: this.cv,
      de: germanCV,
      fr: frenchCV
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
    const articles = Array.from(this.articles.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // If language is specified, filter the translations
    if (language) {
      const filteredArticles = articles.map(article => {
        if (article.translations && article.translations[language]) {
          return {
            ...article,
            title: article.translations[language].title,
            content: article.translations[language].content,
            excerpt: article.translations[language].excerpt
          };
        }
        return article;
      });
      return limit ? filteredArticles.slice(0, limit) : filteredArticles;
    }
    
    return limit ? articles.slice(0, limit) : articles;
  }

  async getArticleById(id: number, language?: string): Promise<Article | undefined> {
    const article = this.articles.get(id);
    
    if (!article) {
      return undefined;
    }
    
    // If language is specified, return the article with the specified language
    if (language && article.translations && article.translations[language]) {
      return {
        ...article,
        title: article.translations[language].title,
        content: article.translations[language].content,
        excerpt: article.translations[language].excerpt
      };
    }
    
    return article;
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

  // Helper method to load articles from files
  private addSampleArticles(): void {
    import('fs').then(fs => {
      import('path').then(async path => {
        try {
          // Define dirname equivalent for ESM
          const __dirname = path.dirname(new URL(import.meta.url).pathname);
          
          // Get directory path for articles
          const articlesDir = path.join(__dirname, 'data', 'articles');
          
          // Check if directory exists
          if (!fs.existsSync(articlesDir)) {
            console.warn('Articles directory not found:', articlesDir);
            this.addFallbackArticles();
            return;
          }
          
          // Read all article files
          const files = fs.readdirSync(articlesDir);
          
          // Process each article file
          for (const file of files) {
            if (file.endsWith('.json')) {
              try {
                const filePath = path.join(articlesDir, file);
                const fileContent = await fs.promises.readFile(filePath, 'utf8');
                const articleData = JSON.parse(fileContent);
                
                // Convert publishedAt string to Date object
                if (typeof articleData.publishedAt === 'string') {
                  articleData.publishedAt = new Date(articleData.publishedAt);
                }
                
                // Set article in the map
                this.articles.set(articleData.id, articleData);
                
                // Update currentArticleId if needed
                if (articleData.id >= this.currentArticleId) {
                  this.currentArticleId = articleData.id + 1;
                }
                
                console.log(`Loaded article: ${articleData.title}`);
              } catch (err) {
                console.error(`Error loading article file ${file}:`, err);
              }
            }
          }
          
          // If no articles were loaded, add fallback articles
          if (this.articles.size === 0) {
            console.warn('No articles loaded from files, using fallback articles');
            this.addFallbackArticles();
          }
        } catch (err) {
          console.error('Error loading articles:', err);
          this.addFallbackArticles();
        }
      }).catch(err => {
        console.error('Error importing path module:', err);
        this.addFallbackArticles();
      });
    }).catch(err => {
      console.error('Error importing fs module:', err);
      this.addFallbackArticles();
    });
  }
  
  // Fallback method for adding sample articles if file loading fails
  private addFallbackArticles(): void {
    // Multilingual Article 1: JavaScript Async Programming
    this.articles.set(this.currentArticleId, {
      id: this.currentArticleId++,
      title: "Modern JavaScript Async Programming",
      excerpt: "Explore the evolution of asynchronous programming patterns in JavaScript and best practices for 2025.",
      content: "JavaScript's approach to asynchronous programming has evolved significantly...",
      coverImage: "/images/js-async.svg",
      category: "JavaScript",
      publishedAt: new Date("2025-04-15"),
      translations: {
        en: {
          title: "Modern JavaScript Async Programming",
          content: "JavaScript's approach to asynchronous programming has evolved significantly over the years, from callback functions to Promises, and now to the elegant async/await syntax. This article explores modern patterns, best practices, and advanced techniques to master asynchronous JavaScript in 2025.",
          excerpt: "Explore the evolution of asynchronous programming patterns in JavaScript and best practices for 2025."
        }
      }
    });

    // Add more fallback articles if needed
  }
}

// Export singleton storage instance
export const storage = new MemStorage();