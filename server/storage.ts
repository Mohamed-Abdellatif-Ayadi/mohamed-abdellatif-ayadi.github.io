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

    // Add sample CV
    this.cv = {
      name: "MOHAMED ABDELLATIF AYADI",
      title: "Software Engineer",
      photoUrl: "/images/avatar.png",
      email: "ayadi.mohamed@example.com",
      phone: "+49 123 456 7890",
      location: "Dortmund, Germany",
      summary: "Software engineer with expertise in full-stack development, emphasizing modern web technologies and cloud solutions.",
      skills: [
        {
          category: "Programming Languages",
          items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL", "HTML/CSS"]
        },
        {
          category: "Frameworks & Libraries",
          items: ["React", "Node.js", "Express", "Next.js", "Django", "Spring Boot"]
        },
        {
          category: "Database Systems",
          items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"]
        },
        {
          category: "Cloud & DevOps",
          items: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Git"]
        }
      ],
      experience: [
        {
          position: "Senior Software Engineer",
          company: "Digital Solutions GmbH",
          startDate: "2023-01",
          description: "Leading the development of cloud-native applications using microservices architecture."
        },
        {
          position: "Full Stack Developer",
          company: "Web Innovations AG",
          startDate: "2020-06",
          endDate: "2022-12",
          description: "Developed responsive web applications using React, Node.js, and PostgreSQL."
        },
        {
          position: "Software Engineer Intern",
          company: "Tech Startups Inc.",
          startDate: "2019-03",
          endDate: "2020-05",
          description: "Contributed to the development of a mobile app using React Native and Firebase."
        }
      ],
      education: [
        {
          institution: "Technical University of Dortmund",
          degree: "B.Sc. in Computer Science",
          startDate: "2016",
          endDate: "2020",
          location: "Dortmund, Germany"
        }
      ],
      certifications: [
        {
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          date: "2023"
        },
        {
          name: "Professional Scrum Master I",
          issuer: "Scrum.org",
          date: "2021"
        }
      ],
      languages: [
        {
          name: "English",
          proficiency: "Fluent"
        },
        {
          name: "German",
          proficiency: "Professional"
        },
        {
          name: "Arabic",
          proficiency: "Native"
        },
        {
          name: "French",
          proficiency: "Basic"
        }
      ]
    };

    this.cvs = {
      en: this.cv,
      de: {
        name: "MOHAMED ABDELLATIF AYADI",
        title: "Softwareentwickler",
        photoUrl: "/images/avatar.png",
        email: "ayadi.mohamed@example.com",
        phone: "+49 123 456 7890",
        location: "Dortmund, Deutschland",
        summary: "Softwareentwickler mit Fachkenntnissen in Full-Stack-Entwicklung, mit Schwerpunkt auf modernen Webtechnologien und Cloud-Lösungen.",
        skills: [
          {
            category: "Programmiersprachen",
            items: ["TypeScript", "JavaScript", "Python", "Java", "C++", "SQL", "HTML/CSS"]
          },
          {
            category: "Frameworks & Bibliotheken",
            items: ["React", "Node.js", "Express", "Next.js", "Django", "Spring Boot"]
          },
          {
            category: "Datenbanksysteme",
            items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"]
          },
          {
            category: "Cloud & DevOps",
            items: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Git"]
          }
        ],
        experience: [
          {
            position: "Senior Softwareentwickler",
            company: "Digital Solutions GmbH",
            startDate: "2023-01",
            description: "Leitung der Entwicklung von Cloud-nativen Anwendungen mit Microservices-Architektur."
          },
          {
            position: "Full-Stack-Entwickler",
            company: "Web Innovations AG",
            startDate: "2020-06",
            endDate: "2022-12",
            description: "Entwicklung responsiver Webanwendungen mit React, Node.js und PostgreSQL."
          },
          {
            position: "Praktikant Softwareentwicklung",
            company: "Tech Startups Inc.",
            startDate: "2019-03",
            endDate: "2020-05",
            description: "Mitarbeit an der Entwicklung einer mobilen App mit React Native und Firebase."
          }
        ],
        education: [
          {
            institution: "Technische Universität Dortmund",
            degree: "B.Sc. Informatik",
            startDate: "2016",
            endDate: "2020",
            location: "Dortmund, Deutschland"
          }
        ],
        certifications: [
          {
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2023"
          },
          {
            name: "Professional Scrum Master I",
            issuer: "Scrum.org",
            date: "2021"
          }
        ],
        languages: [
          {
            name: "Englisch",
            proficiency: "Fließend"
          },
          {
            name: "Deutsch",
            proficiency: "Verhandlungssicher"
          },
          {
            name: "Arabisch",
            proficiency: "Muttersprache"
          },
          {
            name: "Französisch",
            proficiency: "Grundkenntnisse"
          }
        ]
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
    let articles = Array.from(this.articles.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    if (limit) {
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
      }
    ];

    // Add articles to the storage
    articles.forEach(article => {
      this.articles.set(article.id, article);
    });
  }
}

export const storage = new MemStorage();