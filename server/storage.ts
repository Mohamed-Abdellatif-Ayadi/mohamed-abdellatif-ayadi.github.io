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
  getCV(): Promise<CV>;
  
  // Contact form
  saveContactMessage(message: ContactMessage): Promise<void>;
  
  // Newsletter
  subscribeToNewsletter(email: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private articles: Map<number, Article>;
  private cv: CV;
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
    
    // Initialize with Mohamed Ayadi's CV data
    this.cv = {
      name: "MOHAMED ABDELLATIF AYADI",
      title: "Student im 4. Semester B.Sc. Informatik an der Technischen Universität Dortmund",
      photoUrl: "/images/mohamed-ayadi-photo.png", // Using the professional photo
      email: "mohamed.ayadi.data@gmail.com",
      phone: "+4915252301739",
      location: "Dortmund, Germany",
      summary: "Ich bin Mohamed Abdellatif Ayadi, Student im 4. Semester des B.Sc. Informatik an der Technischen Universität Dortmund. Ich arbeite derzeit als Werkstudent im Vertrieb als Verkaufsberater. Mit großer Leidenschaft für Vertrieb, Programmierung, Innovation und die Tech-Industrie bin ich neugierig, zielstrebig und ehrgeizig. Ich suche stets nach Möglichkeiten, zu lernen und mich in den Bereichen Softwareentwicklung oder IT-Consulting weiterzuentwickeln. Mein Ziel ist es, an Projekten zu arbeiten, die einen Unterschied machen, und Teil der Innovationen der Zukunft zu sein.",
      skills: [
        "GitLab", 
        "C-Programmierung", 
        "Java", 
        "Python", 
        "Eclipse", 
        "Microsoft Visual Studio", 
        "Docker",
        "Objektorientierte Programmierung (OOP)",
        "Unified Modeling Language (UML)",
        "Software Design Patterns",
        "Code Review",
        "Software Testing",
        "Datenstrukturen",
        "Time Series and Forecasting",
        "Data Augmentation",
        "Deep Learning",
        "Generative KI",
        "Relationale Datenbanken",
        "Data Warehousing",
        "SAP",
        "SAP S/4HANA"
      ],
      experience: [
        {
          position: "Werkstudent",
          company: "Iperceramica Deutschland GmbH",
          startDate: "April 2024",
          endDate: "Heute",
          description: "Nutzung von SAP und SAP S/4HANA zur Optimierung von Beständen, Aufträgen, Lieferprozessen und der Bearbeitung von Reklamationen. Vertrieb: Aktive Kundengewinnung im B2B- und B2C-Bereich durch gezielte Akquise und Aufbau langfristiger Kundenbeziehungen. Verkauf und Beratung von hochwertigen Fliesen, Parkett, Sanitär und Badezimmermöbeln. Pflege von Kundendaten und Partnerbeziehungen in CRM und PRM-Systemen, zur Verbesserung der Kommunikation und Zusammenarbeit."
        },
        {
          position: "Studentische Hilfskraft",
          company: "Technische Universität Dortmund",
          startDate: "Oktober 2023",
          endDate: "April 2024",
          description: "Übernahme der Position eines studentischen Tutors für den Kurs 'Datenstrukturen, Algorithmen und Programmierung 1' als Minijob. Organisation und Durchführung von Tutorien für Erstsemester-Studierende mit Fokus auf objektorientierte Programmierung in Java. Aufgaben umfassten praktische Programmierübungen, Vertiefung und Erweiterung der Vorlesungsinhalte, Hausaufgabenbetreuung sowie gezielte Vorbereitung auf Prüfungen und Strategieplanung. Teilnahme an einem Workshop zur akademischen Lehre vor Beginn der Tätigkeit, in dem ich Präsentations- und Gruppentechniken, Tutoriumsplanung und Motivationsmethoden erlernte und praktizierte."
        }
      ],
      education: [
        {
          degree: "Bachelor Informatik",
          institution: "Technische Universität Dortmund",
          location: "Dortmund, Germany",
          startDate: "April 2022",
          endDate: "April 2026"
        },
        {
          degree: "Abitur im Fach Mathematik",
          institution: "Pioneer High School of Sfax (Lycée Pilote de Sfax)",
          location: "Sfax, Tunesien",
          startDate: "2017",
          endDate: "Juli 2021"
        }
      ],
      certifications: [],
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
      ]
    };
    
    // Initialize with sample articles
    this.addSampleArticles();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Article methods
  async getArticles(limit?: number): Promise<Article[]> {
    const allArticles = Array.from(this.articles.values()).sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    if (limit && limit > 0) {
      return allArticles.slice(0, limit);
    }
    
    return allArticles;
  }
  
  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }
  
  // CV methods
  async getCV(): Promise<CV> {
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
    const articles: Omit<Article, "id">[] = [
      {
        title: "Mastering SQL Window Functions: A Comprehensive Guide",
        excerpt: "Learn how to leverage SQL window functions to perform complex data analysis efficiently. From basic aggregations to advanced ranking and partitioning.",
        content: `
          <div class="prose prose-lg max-w-none prose-pre:bg-transparent prose-pre:p-0 prose-code:text-primary-800 prose-pre:my-0">
            <p class="text-xl leading-relaxed mb-8">SQL window functions are powerful features that allow you to perform calculations across a set of rows related to the current row. In this comprehensive guide, we'll explore how to use window functions effectively for data analysis.</p>
            
            <div class="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-8">
              <p class="text-indigo-800 font-medium">Window functions allow you to access other rows related to the current row without using self-joins or subqueries.</p>
            </div>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">What Are Window Functions?</h2>
            
            <p>Window functions perform calculations across a specific "window" or set of rows that are somehow related to the current row. Unlike regular aggregate functions which collapse multiple rows into a single result row, window functions return a result for each row in the result set.</p>
            
            <p>The general syntax looks like this:</p>
            
            <div class="my-6 rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
              <div class="bg-slate-100 px-4 py-2 font-mono text-sm text-slate-600">
                FUNCTION_NAME() OVER ([PARTITION BY column] [ORDER BY column] [frame_clause])
              </div>
            </div>
            
            <p>Here's a simple example that calculates the average salary per department alongside each employee's salary:</p>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-indigo-800 px-4 py-2 text-xs text-indigo-100 flex justify-between">
                <span>SQL</span>
                <span>Window Function Example</span>
              </div>
              <pre class="bg-indigo-950 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  employee_name,
  department,
  salary,
  AVG(salary) OVER (PARTITION BY department) as dept_avg_salary
FROM employees;</code></pre>
            </div>
            
            <p>This query returns each employee's name, department, their individual salary, and the average salary for their department - all in one result set without needing a GROUP BY clause or a join.</p>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Types of Window Functions</h2>
            
            <p>SQL offers several types of window functions for different analytical needs:</p>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">1. Aggregate Window Functions</h3>
            
            <p>These include familiar aggregate functions like SUM, AVG, COUNT, MIN, and MAX that can be used as window functions:</p>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-indigo-800 px-4 py-2 text-xs text-indigo-100 flex justify-between">
                <span>SQL</span>
                <span>Aggregate Window Function</span>
              </div>
              <pre class="bg-indigo-950 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  product_name,
  category,
  price,
  AVG(price) OVER (PARTITION BY category) as category_avg_price,
  price - AVG(price) OVER (PARTITION BY category) as diff_from_avg
FROM products;</code></pre>
            </div>
            
            <p>This query shows each product's price alongside the average price for its category, as well as how much each product's price differs from the category average.</p>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">2. Ranking Window Functions</h3>
            
            <p>Ranking functions assign a rank to each row within a partition. The most common ranking functions are:</p>
            
            <ul class="list-disc pl-5 my-4 space-y-2">
              <li><strong>ROW_NUMBER()</strong>: Assigns unique sequential numbers starting from 1</li>
              <li><strong>RANK()</strong>: Assigns ranks with gaps for ties (e.g., 1, 2, 2, 4)</li>
              <li><strong>DENSE_RANK()</strong>: Assigns ranks without gaps for ties (e.g., 1, 2, 2, 3)</li>
              <li><strong>NTILE(n)</strong>: Divides rows into n approximately equal groups</li>
            </ul>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-indigo-800 px-4 py-2 text-xs text-indigo-100 flex justify-between">
                <span>SQL</span>
                <span>Ranking Functions</span>
              </div>
              <pre class="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  student_name,
  score,
  ROW_NUMBER() OVER (ORDER BY score DESC) as row_num,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM exam_results;</code></pre>
            </div>
            
            <p>This example shows the different ranking behaviors for student exam scores.</p>

            <div class="overflow-x-auto my-8">
              <table class="min-w-full border-collapse">
                <thead>
                  <tr class="bg-slate-100">
                    <th class="border border-slate-300 px-4 py-2 text-left">student_name</th>
                    <th class="border border-slate-300 px-4 py-2 text-left">score</th>
                    <th class="border border-slate-300 px-4 py-2 text-left">row_num</th>
                    <th class="border border-slate-300 px-4 py-2 text-left">rank</th>
                    <th class="border border-slate-300 px-4 py-2 text-left">dense_rank</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border border-slate-300 px-4 py-2">Alice</td>
                    <td class="border border-slate-300 px-4 py-2">95</td>
                    <td class="border border-slate-300 px-4 py-2">1</td>
                    <td class="border border-slate-300 px-4 py-2">1</td>
                    <td class="border border-slate-300 px-4 py-2">1</td>
                  </tr>
                  <tr class="bg-slate-50">
                    <td class="border border-slate-300 px-4 py-2">Bob</td>
                    <td class="border border-slate-300 px-4 py-2">95</td>
                    <td class="border border-slate-300 px-4 py-2">2</td>
                    <td class="border border-slate-300 px-4 py-2">1</td>
                    <td class="border border-slate-300 px-4 py-2">1</td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300 px-4 py-2">Charlie</td>
                    <td class="border border-slate-300 px-4 py-2">88</td>
                    <td class="border border-slate-300 px-4 py-2">3</td>
                    <td class="border border-slate-300 px-4 py-2">3</td>
                    <td class="border border-slate-300 px-4 py-2">2</td>
                  </tr>
                  <tr class="bg-slate-50">
                    <td class="border border-slate-300 px-4 py-2">David</td>
                    <td class="border border-slate-300 px-4 py-2">85</td>
                    <td class="border border-slate-300 px-4 py-2">4</td>
                    <td class="border border-slate-300 px-4 py-2">4</td>
                    <td class="border border-slate-300 px-4 py-2">3</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p>Notice how Alice and Bob both have the same score (95), resulting in different behaviors across the ranking functions.</p>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">3. Value Window Functions</h3>
            
            <p>Value functions can access values from different rows within the window:</p>
            
            <ul class="list-disc pl-5 my-4 space-y-2">
              <li><strong>LAG(column, offset)</strong>: Returns a value from a previous row</li>
              <li><strong>LEAD(column, offset)</strong>: Returns a value from a subsequent row</li>
              <li><strong>FIRST_VALUE(column)</strong>: Returns the first value in the window</li>
              <li><strong>LAST_VALUE(column)</strong>: Returns the last value in the window</li>
            </ul>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-slate-800 px-4 py-2 text-xs text-slate-300 flex justify-between">
                <span>SQL</span>
                <span>LAG and LEAD Functions</span>
              </div>
              <pre class="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  date,
  stock_price,
  LAG(stock_price, 1) OVER (ORDER BY date) as previous_day_price,
  stock_price - LAG(stock_price, 1) OVER (ORDER BY date) as price_change
FROM stock_prices;</code></pre>
            </div>
            
            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Advanced Window Function Components</h2>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">PARTITION BY Clause</h3>
            
            <p>The PARTITION BY clause divides the result set into partitions (groups) to which the window function is applied separately:</p>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-slate-800 px-4 py-2 text-xs text-slate-300 flex justify-between">
                <span>SQL</span>
                <span>PARTITION BY Example</span>
              </div>
              <pre class="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  customer_id,
  order_date,
  order_amount,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) as order_number
FROM orders;</code></pre>
            </div>
            
            <p>This query assigns an order number to each order, numbering starts over for each customer.</p>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">ORDER BY Clause</h3>
            
            <p>The ORDER BY clause determines the order in which rows are processed by the window function:</p>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-slate-800 px-4 py-2 text-xs text-slate-300 flex justify-between">
                <span>SQL</span>
                <span>ORDER BY Example</span>
              </div>
              <pre class="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  order_date,
  order_amount,
  SUM(order_amount) OVER (ORDER BY order_date) as running_total
FROM orders;</code></pre>
            </div>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">Frame Clauses</h3>
            
            <p>Frame clauses define exactly which rows constitute the current window frame for each row:</p>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-slate-800 px-4 py-2 text-xs text-slate-300 flex justify-between">
                <span>SQL</span>
                <span>Frame Clause Example</span>
              </div>
              <pre class="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  transaction_date,
  amount,
  AVG(amount) OVER (
    ORDER BY transaction_date
    ROWS BETWEEN 3 PRECEDING AND CURRENT ROW
  ) as moving_average
FROM transactions;</code></pre>
            </div>
            
            <p>Common frame specifications include:</p>
            
            <ul class="list-disc pl-5 my-4 space-y-2">
              <li><strong>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</strong>: From the first row to current row</li>
              <li><strong>ROWS BETWEEN n PRECEDING AND CURRENT ROW</strong>: From n rows before to current row</li>
              <li><strong>ROWS BETWEEN CURRENT ROW AND n FOLLOWING</strong>: From current row to n rows after</li>
              <li><strong>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</strong>: All rows in the partition</li>
            </ul>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Practical Applications</h2>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">Moving Averages</h3>
            
            <p>Calculating moving (rolling) averages is a common use case for window functions:</p>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-slate-800 px-4 py-2 text-xs text-slate-300 flex justify-between">
                <span>SQL</span>
                <span>7-Day Moving Average</span>
              </div>
              <pre class="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  date,
  stock_price,
  AVG(stock_price) OVER (
    ORDER BY date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) as seven_day_moving_avg
FROM stock_prices;</code></pre>
            </div>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">Year-over-Year Comparison</h3>
            
            <p>Comparing current values with previous periods' values:</p>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-slate-800 px-4 py-2 text-xs text-slate-300 flex justify-between">
                <span>SQL</span>
                <span>Year-over-Year Growth</span>
              </div>
              <pre class="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  year,
  revenue,
  LAG(revenue) OVER (ORDER BY year) as prev_year_revenue,
  (revenue - LAG(revenue) OVER (ORDER BY year)) / 
    LAG(revenue) OVER (ORDER BY year) * 100 as yoy_growth_pct
FROM yearly_revenue;</code></pre>
            </div>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">Cumulative Totals</h3>
            
            <p>Calculating running totals within groups:</p>
            
            <div class="my-6 rounded-lg overflow-hidden">
              <div class="bg-slate-800 px-4 py-2 text-xs text-slate-300 flex justify-between">
                <span>SQL</span>
                <span>Cumulative Sales by Product</span>
              </div>
              <pre class="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm"><code>SELECT 
  sales_date,
  product_id,
  sales_amount,
  SUM(sales_amount) OVER (
    PARTITION BY product_id 
    ORDER BY sales_date
    ROWS UNBOUNDED PRECEDING
  ) as running_total
FROM sales;</code></pre>
            </div>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Best Practices and Optimization</h2>
            
            <div class="bg-purple-50 p-6 rounded-lg border border-purple-200 my-8 shadow-sm">
              <h3 class="text-lg font-semibold mb-4 text-purple-900">Performance Tips</h3>
              <ul class="list-disc pl-5 space-y-3 text-purple-800">
                <li>Always specify ORDER BY in window functions when results order matters</li>
                <li>Use appropriate frame clauses for moving calculations</li>
                <li>Consider performance implications with large datasets</li>
                <li>Reuse window specifications with the WINDOW clause for multiple functions that use the same window</li>
                <li>Test window functions with small datasets first</li>
              </ul>
            </div>
            
            <h3 class="text-xl font-semibold mt-8 mb-4 text-slate-800">Common Pitfalls</h3>
            
            <ul class="list-disc pl-5 my-4 space-y-3">
              <li><strong>Execution order confusion</strong>: Window functions execute after WHERE, GROUP BY, and HAVING but before ORDER BY in the query processing sequence</li>
              <li><strong>NULL handling</strong>: Be careful about NULL values in calculations, especially when using LAG/LEAD functions</li>
              <li><strong>Frame clause neglect</strong>: Default frame clauses might not match your analytical needs</li>
              <li><strong>Subquery reuse</strong>: You can't reference a window function result in a WHERE clause directly</li>
            </ul>

            <h2 class="text-2xl font-bold mt-12 mb-6 text-slate-900">Conclusion</h2>
            
            <p class="mb-4">SQL window functions are powerful tools that enable sophisticated data analysis directly in your database queries. By using window functions effectively, you can:</p>
            
            <ul class="list-disc pl-5 my-4 space-y-2">
              <li>Eliminate complex self-joins and subqueries</li>
              <li>Improve query readability and maintainability</li>
              <li>Perform advanced analytics like moving averages and year-over-year comparisons</li>
              <li>Enhance reporting capabilities with rank and cumulative calculations</li>
            </ul>
            
            <p>As you become more comfortable with window functions, you'll find they can replace many complex SQL patterns, making your queries more efficient and easier to understand.</p>
          </div>
        `,
        coverImage: "/images/sql-window-functions.svg",
        category: "Technology",
        publishedAt: new Date("2023-06-12")
      },
      {
        title: "How to Thrive in a Remote Work Environment",
        excerpt: "With remote work becoming increasingly common, many professionals find themselves adjusting to this new paradigm. Here are some strategies to help you succeed.",
        content: `
          <h2>Introduction</h2>
          <p>With remote work becoming increasingly common, many professionals find themselves adjusting to this new paradigm. In this article, I'll share strategies I've learned to help you succeed in a remote environment.</p>
          
          <h3>Create a Dedicated Workspace</h3>
          <p>Having a space specifically for work helps you mentally separate your professional and personal life. Ideally, this would be a separate room, but even a dedicated desk in a corner can work well.</p>
          
          <h3>Establish a Routine</h3>
          <p>One of the biggest challenges of remote work is maintaining structure. Creating a consistent schedule helps signal to your brain when it's time to work and when it's time to relax.</p>
          
          <h3>Set Clear Boundaries</h3>
          <p>When your home becomes your office, it's easy for work to spill into your personal life. Be strict about your working hours and communicate these boundaries to both colleagues and family members.</p>
          
          <h3>Invest in the Right Tools</h3>
          <p>A reliable internet connection, comfortable chair, and proper monitor setup are just as important at home as they would be in an office. Don't hesitate to ask your employer about equipment stipends.</p>
          
          <h3>Prioritize Communication</h3>
          <p>In a remote environment, overcommunication is better than undercommunication. Be proactive about sharing updates, asking questions, and participating in discussions.</p>
          
          <h3>Combat Isolation</h3>
          <p>Remote work can get lonely. Schedule regular virtual coffee chats with colleagues, join online communities in your field, or work from a co-working space occasionally if possible.</p>
          
          <h3>Take Breaks and Move</h3>
          <p>Without the natural movements of an office environment, it's easy to stay seated for hours. Set reminders to stand up, stretch, or take short walks throughout the day.</p>
          
          <h3>Conclusion</h3>
          <p>Remote work offers incredible flexibility, but it requires intentionality to make it successful. By implementing these strategies, you can thrive professionally while enjoying the benefits of working from home.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&h=500",
        category: "Career",
        publishedAt: new Date("2023-05-28")
      },
      {
        title: "A Deep Dive into My UX Design Process",
        excerpt: "In this article, I break down my approach to user experience design, from research and ideation to prototyping and validation. Learn how I create intuitive interfaces.",
        content: `
          <h2>Introduction</h2>
          <p>A well-thought-out design process is crucial for creating intuitive, user-friendly interfaces. In this article, I'll walk through my approach to UX design from start to finish.</p>
          
          <h3>Phase 1: Research & Discovery</h3>
          <p>Every design project begins with understanding the problem space. This includes:</p>
          <ul>
            <li>User interviews to understand needs and pain points</li>
            <li>Competitive analysis to see what solutions already exist</li>
            <li>Stakeholder interviews to align on business goals</li>
            <li>Analytics review (for existing products) to identify opportunities</li>
          </ul>
          <p>This phase culminates in creating personas and user journey maps that guide the rest of the process.</p>
          
          <h3>Phase 2: Ideation & Sketching</h3>
          <p>With a solid understanding of user needs, I move into generating solutions:</p>
          <ul>
            <li>Brainstorming sessions to explore multiple approaches</li>
            <li>Rapid sketching to visualize ideas quickly</li>
            <li>Information architecture planning</li>
            <li>User flow mapping</li>
          </ul>
          <p>I find that starting with low-fidelity approaches keeps the focus on solving the right problems rather than getting caught up in visual details too early.</p>
          
          <h3>Phase 3: Wireframing & Prototyping</h3>
          <p>Once I've identified promising directions, I develop them further:</p>
          <ul>
            <li>Creating wireframes to establish layout and hierarchy</li>
            <li>Building interactive prototypes with tools like Figma</li>
            <li>Writing content that supports the user's goals</li>
          </ul>
          <p>The fidelity of these deliverables depends on the project needs - sometimes low-fidelity wireframes are sufficient, while other times high-fidelity mockups are necessary.</p>
          
          <h3>Phase 4: Testing & Validation</h3>
          <p>No design is complete without validation from real users:</p>
          <ul>
            <li>Usability testing with representative users</li>
            <li>A/B testing for key interactions (when possible)</li>
            <li>Heuristic evaluation against established principles</li>
          </ul>
          <p>The insights from this phase often lead to refinements in the design before implementation.</p>
          
          <h3>Phase 5: Implementation Support</h3>
          <p>My involvement doesn't end with handoff:</p>
          <ul>
            <li>Creating detailed specifications for developers</li>
            <li>Building component libraries when appropriate</li>
            <li>Remaining available for questions during build</li>
            <li>QA testing to ensure the implementation matches the design intent</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>A structured design process ensures that we're solving the right problems in the right ways. However, it's important to remember that design is iterative - these phases often overlap and sometimes we need to circle back as we learn more.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&h=500",
        category: "Design",
        publishedAt: new Date("2023-05-15")
      },
      {
        title: "Building Scalable React Applications: Lessons Learned",
        excerpt: "After working on multiple large-scale React projects, I've gathered valuable insights on architecture, state management, and performance optimization.",
        content: `
          <h2>Introduction</h2>
          <p>React has become one of the most popular libraries for building user interfaces, but creating scalable applications requires careful planning and good practices. In this article, I'll share lessons I've learned from working on several large-scale React projects.</p>
          
          <h3>Thoughtful Component Architecture</h3>
          <p>A well-structured component hierarchy is the foundation of maintainable React applications:</p>
          <ul>
            <li>Follow the single responsibility principle - each component should do one thing well</li>
            <li>Create a clear separation between container (smart) and presentational (dumb) components</li>
            <li>Establish naming conventions and folder structures that scale with your application</li>
          </ul>
          <p>I've found that organizing components by feature rather than type (e.g., 'UserManagement/' vs 'components/buttons/') makes codebases much easier to navigate as they grow.</p>
          
          <h3>State Management Strategies</h3>
          <p>Choosing the right state management approach is crucial:</p>
          <ul>
            <li>Use local component state for UI-specific concerns</li>
            <li>Context API works well for theme, authentication, and other app-wide concerns</li>
            <li>Consider Redux, Zustand, or Jotai for complex global state needs</li>
          </ul>
          <p>Not every application needs a global state management library. Start simple and add complexity only when needed.</p>
          
          <h3>Performance Optimization</h3>
          <p>React is fast by default, but large applications often need optimization:</p>
          <ul>
            <li>Use React.memo, useMemo, and useCallback strategically to prevent unnecessary re-renders</li>
            <li>Implement virtualization for long lists using libraries like react-window</li>
            <li>Split your bundle with code-splitting and lazy loading</li>
            <li>Use performance monitoring tools to identify bottlenecks</li>
          </ul>
          <p>Remember that premature optimization can lead to more complex code. Measure first, then optimize where needed.</p>
          
          <h3>Testing Strategies</h3>
          <p>A comprehensive testing strategy gives confidence when making changes:</p>
          <ul>
            <li>Write unit tests for individual components and utility functions</li>
            <li>Use integration tests for component interaction</li>
            <li>End-to-end tests catch issues that might be missed in isolation</li>
            <li>Consider visual regression testing for UI-heavy applications</li>
          </ul>
          
          <h3>Developer Experience</h3>
          <p>Investing in developer experience pays dividends in productivity:</p>
          <ul>
            <li>Set up linting and formatting rules early</li>
            <li>Document component APIs with Storybook or similar tools</li>
            <li>Establish conventions for handling common patterns</li>
            <li>Create reusable hooks and utilities to reduce duplication</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>Building scalable React applications is as much about team coordination and planning as it is about technical implementation. By focusing on clean architecture, thoughtful state management, and developer experience, you can create applications that remain maintainable as they grow.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=800&h=500",
        category: "Technology",
        publishedAt: new Date("2023-04-10")
      },
      {
        title: "Creating an Effective Personal Brand as a Developer",
        excerpt: "In today's competitive tech landscape, a strong personal brand can open doors to opportunities. Here's how to build yours authentically.",
        content: `
          <h2>Introduction</h2>
          <p>As developers, we often focus solely on technical skills, but building a personal brand can significantly impact career growth. In this article, I'll share strategies for creating an authentic and effective personal brand in the tech industry.</p>
          
          <h3>Define Your Unique Value Proposition</h3>
          <p>Start by identifying what makes you unique:</p>
          <ul>
            <li>What combination of skills do you have that others might not?</li>
            <li>What perspectives do you bring to your work?</li>
            <li>What are you genuinely passionate about in tech?</li>
          </ul>
          <p>Your UVP doesn't need to be completely unique in the world - it just needs to represent the authentic intersection of your skills, interests, and experiences.</p>
          
          <h3>Establish an Online Presence</h3>
          <p>Create platforms where people can find and learn about you:</p>
          <ul>
            <li>A personal website showcasing your projects and writing</li>
            <li>Active social media profiles on platforms where tech discussions happen</li>
            <li>A complete LinkedIn profile that tells your professional story</li>
          </ul>
          <p>Quality matters more than quantity - focus on platforms you can maintain consistently.</p>
          
          <h3>Share Your Knowledge</h3>
          <p>Contributing valuable content establishes your expertise:</p>
          <ul>
            <li>Write articles on your blog or platforms like Medium/Dev.to</li>
            <li>Create tutorials or code snippets on GitHub</li>
            <li>Answer questions on Stack Overflow or Reddit</li>
            <li>Speak at meetups or conferences (virtual or in-person)</li>
          </ul>
          <p>Remember that it's okay to share what you're learning, not just what you've mastered. Your journey is valuable to others who are a few steps behind you.</p>
          
          <h3>Network Authentically</h3>
          <p>Building relationships is crucial for brand growth:</p>
          <ul>
            <li>Engage with others' content through thoughtful comments</li>
            <li>Participate in community discussions and events</li>
            <li>Offer help without expecting immediate returns</li>
            <li>Connect with peers at similar stages in their careers</li>
          </ul>
          <p>Focus on giving value first, and the benefits to your brand will follow naturally.</p>
          
          <h3>Be Consistent and Authentic</h3>
          <p>Long-term consistency builds recognition:</p>
          <ul>
            <li>Maintain a consistent tone and visual identity across platforms</li>
            <li>Share both successes and challenges to remain relatable</li>
            <li>Don't pretend to know everything - it's okay to say "I don't know yet"</li>
            <li>Stand for values that matter to you, even when it's difficult</li>
          </ul>
          
          <h3>Measure and Adapt</h3>
          <p>Pay attention to what resonates with your audience:</p>
          <ul>
            <li>Notice which types of content get the most engagement</li>
            <li>Ask for feedback from trusted peers</li>
            <li>Be willing to pivot your focus as your interests evolve</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>Building a personal brand as a developer is a marathon, not a sprint. Focus on authenticity, providing value, and consistent presence. Over time, your personal brand will open doors to opportunities that align with your strengths and interests.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1622151284478-2b5b3f79d268?auto=format&fit=crop&w=800&h=500",
        category: "Career",
        publishedAt: new Date("2023-03-22")
      },
      {
        title: "Designing for Accessibility: A Practical Guide",
        excerpt: "Accessible design is good design. Learn practical steps to make your websites and applications more inclusive for all users.",
        content: `
          <h2>Introduction</h2>
          <p>Designing for accessibility isn't just about compliance—it's about creating experiences that everyone can use, regardless of their abilities or circumstances. In this article, I'll share practical steps to improve accessibility in your digital products.</p>
          
          <h3>Understanding Accessibility</h3>
          <p>Accessibility encompasses a wide range of considerations:</p>
          <ul>
            <li>Visual impairments: From low vision to complete blindness</li>
            <li>Motor impairments: Affecting the ability to use a mouse or keyboard</li>
            <li>Auditory impairments: From partial to complete hearing loss</li>
            <li>Cognitive impairments: Affecting memory, attention, or problem-solving</li>
            <li>Situational limitations: Such as bright sunlight or noisy environments</li>
          </ul>
          <p>Designing for these diverse needs benefits everyone, not just those with permanent disabilities.</p>
          
          <h3>Semantic HTML: The Foundation</h3>
          <p>Proper HTML usage is the foundation of accessibility:</p>
          <ul>
            <li>Use appropriate heading levels (h1-h6) to create a logical document structure</li>
            <li>Choose the right elements for their purpose (buttons for actions, links for navigation)</li>
            <li>Implement proper form labels and error messages</li>
            <li>Use landmarks like &lt;main&gt;, &lt;nav&gt;, and &lt;aside&gt; to define page regions</li>
          </ul>
          <p>This structure helps screen reader users navigate your content efficiently.</p>
          
          <h3>Keyboard Accessibility</h3>
          <p>Many users rely exclusively on keyboards:</p>
          <ul>
            <li>Ensure all interactive elements are focusable and operable with a keyboard</li>
            <li>Maintain a logical tab order that follows the visual layout</li>
            <li>Provide visible focus indicators that are high-contrast</li>
            <li>Create skip links to bypass repetitive navigation</li>
          </ul>
          <p>Try navigating your site using only Tab, Shift+Tab, Enter, and space bar to identify issues.</p>
          
          <h3>Color and Contrast</h3>
          <p>Color choices significantly impact accessibility:</p>
          <ul>
            <li>Ensure sufficient contrast between text and background (4.5:1 for normal text, 3:1 for large text)</li>
            <li>Don't rely solely on color to convey information (add icons, patterns, or text)</li>
            <li>Consider how your design appears in color blind simulations</li>
          </ul>
          <p>Tools like the WebAIM Contrast Checker can help verify your color choices.</p>
          
          <h3>Alternative Text for Images</h3>
          <p>Descriptive alt text makes visual content accessible:</p>
          <ul>
            <li>Provide concise, descriptive alt text for informative images</li>
            <li>Use empty alt attributes (alt="") for decorative images</li>
            <li>Include context and purpose, not just literal descriptions</li>
          </ul>
          <p>Good alt text answers: "What information does this image convey?"</p>
          
          <h3>Responsive and Flexible Design</h3>
          <p>Adaptable designs accommodate different needs:</p>
          <ul>
            <li>Support zoom up to 400% without breaking layouts</li>
            <li>Use relative units (em, rem) instead of fixed pixels</li>
            <li>Ensure touch targets are at least 44x44 pixels</li>
            <li>Test with different text sizes and screen widths</li>
          </ul>
          
          <h3>Testing Your Work</h3>
          <p>Regular testing catches accessibility issues:</p>
          <ul>
            <li>Use automated tools like Axe or Lighthouse as a starting point</li>
            <li>Test with screen readers (VoiceOver, NVDA, or JAWS)</li>
            <li>Conduct keyboard-only testing</li>
            <li>When possible, include users with disabilities in your testing process</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>Accessibility isn't a checkbox to tick off—it's an ongoing process that should be integrated into your design and development workflow. By implementing these practices, you'll create products that are more usable for everyone, regardless of their abilities.</p>
        `,
        coverImage: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&h=500",
        category: "Design",
        publishedAt: new Date("2023-03-05")
      }
    ];
    
    // Add each article to the map with an ID
    articles.forEach(article => {
      const id = this.currentArticleId++;
      this.articles.set(id, { id, ...article });
    });
  }
}

export const storage = new MemStorage();
