import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/languageContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription?: string;
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'ai' | 'other';
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll hard-code project details based on ID
    if (id === "1") {
      setProject({
        id: 1,
        title: "Database Table Directory Automation",
        description: "Implementation of patent CN111339081A for automatically collecting and integrating heterogeneous database table directories.",
        fullDescription: `
          <h2>Patent Background</h2>
          <p>In modern enterprises, data is often scattered across various database systems. Differences in data structures and formats make the process of collecting and integrating information cumbersome and time-consuming. This project implements patent CN111339081A, which proposes an automated approach to efficiently collecting table directory information from various database systems, significantly streamlining the data extraction and analysis process.</p>
          
          <h2>Project Overview</h2>
          <p>This system automatically collects and integrates table information from heterogeneous databases, including MySQL, PostgreSQL, and Oracle. The implementation boosts data extraction efficiency by up to 70% and reduces manual deployment and verification time by 90%.</p>
          
          <h2>Key Features</h2>
          <ul>
            <li><strong>Automated Data Collection</strong> - The system automatically collects basic information from various databases, generating an initial list of database tables.</li>
            <li><strong>Data Analysis</strong> - Collected information is analyzed to identify relationships between data.</li>
            <li><strong>Quality Monitoring</strong> - Real-time monitoring of data quality metrics ensures the reliability of data analysis.</li>
            <li><strong>Integration Framework</strong> - A unified system that bridges the gap between different database systems.</li>
            <li><strong>Backup and Recovery</strong> - Automated backup and recovery processes ensure data security and availability.</li>
          </ul>
          
          <h2>Technical Implementation</h2>
          <p>The project was built using a combination of technologies:</p>
          <ul>
            <li>SQL for querying diverse database systems</li>
            <li>ETL processes for data transformation</li>
            <li>Automation scripts to minimize manual intervention</li>
            <li>Data validation frameworks to ensure accuracy</li>
            <li>Monitoring tools to maintain system health</li>
          </ul>
          
          <h2>Impact and Results</h2>
          <p>The implementation of this system has resulted in:</p>
          <ul>
            <li>70% increase in data extraction efficiency</li>
            <li>90% reduction in manual verification time</li>
            <li>Improved data quality and consistency</li>
            <li>Enhanced visibility across database systems</li>
            <li>Simplified ETL workflow management</li>
          </ul>
        `,
        techStack: ["ETL", "Data Engineering", "SQL", "Automation", "Database"],
        imageUrl: "/images/database-automation.svg",
        githubUrl: "https://github.com/Mayedi007/database-automation",
        liveUrl: "https://github.com/Mayedi007/database-automation",
        category: 'ai'
      });
    } else if (id === "2") {
      setProject({
        id: 2,
        title: "Flash Sale Platform",
        description: "A high-performance e-commerce platform for limited-time promotional deals.",
        fullDescription: `
          <h2>Project Overview</h2>
          <p>Flash Sale is a high-performance e-commerce platform designed specifically for limited-time promotional deals. Built with scalability and concurrency in mind, this platform can handle high volumes of simultaneous users during flash sale events.</p>
          
          <h2>Key Features</h2>
          <ul>
            <li><strong>OTP-based User Registration</strong> - Secure one-time password verification during registration.</li>
            <li><strong>Secure Login with Token Sessions</strong> - Redis-backed token sessions for authentication.</li>
            <li><strong>Product Management</strong> - Comprehensive product information including title, image, description, price, and stock management.</li>
            <li><strong>Promo-based Flash Sale</strong> - Time-limited sales with countdown timer to create urgency.</li>
            <li><strong>Advanced Caching</strong> - Guava and Redis caching for high-speed data access during high-traffic periods.</li>
            <li><strong>Responsive Design</strong> - Clean Bootstrap interface that works across all device sizes.</li>
          </ul>
          
          <h2>Technical Architecture</h2>
          <p>The platform is built using a modern multi-tier architecture:</p>
          <ul>
            <li><strong>Backend:</strong> Spring Boot for robust, maintainable server-side logic</li>
            <li><strong>Frontend:</strong> HTML, Bootstrap, and jQuery for a responsive user interface</li>
            <li><strong>ORM & Database:</strong> MyBatis integration with MySQL for data persistence</li>
            <li><strong>Caching Layer:</strong> Redis and Guava Cache for performance optimization</li>
            <li><strong>Authentication:</strong> Spring Session with Redis for secure, scalable user sessions</li>
            <li><strong>Build Tool:</strong> Maven for dependency management and project building</li>
          </ul>
          
          <h2>High-Concurrency Handling</h2>
          <p>The platform implements several techniques to handle the high concurrency typical of flash sale events:</p>
          <ul>
            <li>Distributed caching to reduce database pressure</li>
            <li>Asynchronous processing for order creation</li>
            <li>Optimistic locking for inventory management</li>
            <li>Rate limiting to prevent abuse</li>
            <li>Circuit breakers to maintain system stability during peak loads</li>
          </ul>
          
          <h2>Project Structure</h2>
          <p>The codebase follows a clean, modular organization:</p>
          <ul>
            <li><strong>Controllers:</strong> REST endpoints for user interaction</li>
            <li><strong>Services:</strong> Business logic implementation</li>
            <li><strong>DAO Layer:</strong> MyBatis mappers for database operations</li>
            <li><strong>Models:</strong> Data objects representing the domain</li>
            <li><strong>Configuration:</strong> System setup and environment settings</li>
            <li><strong>Error Handling:</strong> Custom exceptions and global error management</li>
          </ul>
        `,
        techStack: ["Spring Boot", "Redis", "MySQL", "Bootstrap", "jQuery", "MyBatis"],
        imageUrl: "/images/flash-sale-platform.svg",
        githubUrl: "https://github.com/Mayedi007/flash-sale-platform",
        category: 'web'
      });
    } else if (id === "3") {
      setProject({
        id: 3,
        title: "Reddit Data Streaming Pipeline",
        description: "A comprehensive ETL data pipeline for Reddit data.",
        fullDescription: `
          <h2>Project Overview</h2>
          <p>This project is a complete data pipeline that extracts data from Reddit's API, processes it through a series of AWS services, and outputs visualized insights through dashboards. The pipeline is built with modern data engineering principles and cloud-native technologies.</p>
          
          <h2>Architecture</h2>
          <p>The pipeline follows a modern cloud-based ETL architecture:</p>
          <ol>
            <li>Extract data using Reddit API</li>
            <li>Load data into AWS S3</li>
            <li>Copy data into AWS Redshift</li>
            <li>Transform using dbt (data build tool)</li>
            <li>Create visualization dashboards in PowerBI or Google Data Studio</li>
            <li>Orchestrate the entire workflow with Airflow in Docker</li>
            <li>Provision AWS resources with Terraform</li>
          </ol>
          
          <h2>Key Components</h2>
          <ul>
            <li><strong>Data Extraction:</strong> Python scripts to interact with Reddit's API</li>
            <li><strong>Data Storage:</strong> AWS S3 for raw data and Redshift for analytical queries</li>
            <li><strong>Transformation:</strong> dbt for SQL-based transformations with testing and documentation</li>
            <li><strong>Orchestration:</strong> Apache Airflow running in Docker containers</li>
            <li><strong>Infrastructure as Code:</strong> Terraform scripts for AWS resource provisioning</li>
            <li><strong>Visualization:</strong> Interactive dashboards in PowerBI/Google Data Studio</li>
          </ul>
          
          <h2>Technical Implementation</h2>
          <p>The project demonstrates several advanced data engineering concepts:</p>
          <ul>
            <li>Containerization with Docker for consistent development and deployment</li>
            <li>Infrastructure as Code (IaC) for reproducible cloud setups</li>
            <li>Data modeling best practices in Redshift</li>
            <li>Workflow orchestration with DAGs in Airflow</li>
            <li>Incremental loading patterns</li>
            <li>Error handling and monitoring</li>
          </ul>
          
          <h2>Insights & Visualizations</h2>
          <p>The final output is a comprehensive dashboard that provides insights into the r/dataengineering subreddit, including:</p>
          <ul>
            <li>Popular topics and trends</li>
            <li>User engagement metrics</li>
            <li>Posting patterns and timing analysis</li>
            <li>Content categorization</li>
            <li>Technology mentions and popularity</li>
          </ul>
        `,
        techStack: ["Python", "AWS", "Airflow", "Docker", "Terraform", "PowerBI"],
        imageUrl: "/images/reddit-pipeline.svg",
        githubUrl: "https://github.com/Mayedi007/reddit-data-streaming-pipeline",
        category: 'ai'
      });
    } else if (id === "4") {
      setProject({
        id: 4,
        title: "Java LeetCode Solutions",
        description: "A collection of coding problems from LeetCode solved using Java.",
        fullDescription: `
          <h2>Project Overview</h2>
          <p>This repository is a personal collection of Java solutions to various LeetCode problems, organized by topic and implemented using clean code principles and modern Java features.</p>
          
          <h2>Problem Categories</h2>
          <p>The solutions are organized into several key algorithm and data structure categories:</p>
          <ul>
            <li><strong>Dynamic Programming</strong> - Solutions to complex optimization problems like "Minimum Number of Taps to Open to Water a Garden"</li>
            <li><strong>Linked Lists</strong> - Implementations of list manipulation algorithms including "Convert Binary Number in a Linked List to Integer"</li>
            <li><strong>Stack-based Problems</strong> - Solutions using stack data structures like "Remove Duplicate Letters"</li>
            <li><strong>Other Data Structures</strong> - Additional problems solved using trees, queues, graphs, and more</li>
          </ul>
          
          <h2>Technical Implementation</h2>
          <p>The solutions are implemented with the following technical considerations:</p>
          <ul>
            <li>Java 17+ features for modern, concise code</li>
            <li>Time and space complexity optimization</li>
            <li>Clean code principles for readability and maintainability</li>
            <li>Detailed comments explaining the algorithm approach</li>
            <li>Maven project structure for dependency management</li>
          </ul>
          
          <h2>Problem-Solving Approach</h2>
          <p>Each solution follows a structured approach to problem-solving:</p>
          <ol>
            <li>Problem understanding and edge case identification</li>
            <li>Multiple solution approaches with complexity analysis</li>
            <li>Implementation of the optimal solution</li>
            <li>Code refactoring for readability</li>
            <li>Testing with various inputs</li>
          </ol>
          
          <h2>Learning Value</h2>
          <p>This repository serves as both a reference and a learning tool for:</p>
          <ul>
            <li>Advanced algorithm techniques</li>
            <li>Java language features and best practices</li>
            <li>Optimization strategies for common computational problems</li>
            <li>Interview preparation patterns</li>
            <li>Clean code implementation examples</li>
          </ul>
        `,
        techStack: ["Java", "Algorithms", "Data Structures", "LeetCode"],
        imageUrl: "/images/leetcode-solutions.svg",
        githubUrl: "https://github.com/Mayedi007/java-praktices-leetcode",
        category: 'other'
      });
    } else if (id === "5") {
      setProject({
        id: 5,
        title: "Vue Pro Dashboard",
        description: "A professional dashboard built with Vue.js.",
        fullDescription: `
          <h2>Project Overview</h2>
          <p>Vue Pro Dashboard is a modern, responsive administrative dashboard built with Vue.js. It provides a comprehensive set of UI components and data visualization tools for building professional web applications.</p>
          
          <h2>Key Features</h2>
          <ul>
            <li><strong>Responsive Design</strong> - Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices</li>
            <li><strong>Interactive Components</strong> - Rich set of UI elements including cards, tables, forms, and navigation components</li>
            <li><strong>Data Visualization</strong> - Charts and graphs for displaying analytical data</li>
            <li><strong>Theme Customization</strong> - Adjustable theme settings with light and dark mode support</li>
            <li><strong>Authentication</strong> - Login, registration, and user profile management</li>
            <li><strong>State Management</strong> - Vuex integration for centralized state handling</li>
          </ul>
          
          <h2>Technical Implementation</h2>
          <p>The dashboard is built with modern frontend technologies:</p>
          <ul>
            <li><strong>Vue.js Framework</strong> - Progressive JavaScript framework for building user interfaces</li>
            <li><strong>Vue Router</strong> - For seamless navigation between dashboard sections</li>
            <li><strong>Vuex</strong> - State management pattern and library</li>
            <li><strong>Vue CLI</strong> - Standard tooling for Vue.js development</li>
            <li><strong>CSS Preprocessors</strong> - SCSS/SASS for advanced styling capabilities</li>
            <li><strong>Responsive Grid System</strong> - Flexible layout system for different screen sizes</li>
          </ul>
          
          <h2>Components & Modules</h2>
          <p>The dashboard includes several pre-built modules:</p>
          <ul>
            <li><strong>Analytics Dashboard</strong> - Overview of key metrics and performance indicators</li>
            <li><strong>User Management</strong> - Interface for managing system users</li>
            <li><strong>Product Management</strong> - Tools for product data management</li>
            <li><strong>Content Management</strong> - Simple CMS functionality</li>
            <li><strong>Settings Panel</strong> - Application and user preference configuration</li>
            <li><strong>Authentication Screens</strong> - Login, registration, and password recovery</li>
          </ul>
          
          <h2>Design Principles</h2>
          <p>The project follows several key design principles:</p>
          <ul>
            <li>Component-based architecture for reusability</li>
            <li>Responsive-first approach to design</li>
            <li>Consistent visual language throughout the interface</li>
            <li>Accessibility considerations for all users</li>
            <li>Performance optimization for fast loading times</li>
          </ul>
        `,
        techStack: ["Vue.js", "JavaScript", "CSS", "Responsive Design"],
        imageUrl: "/images/vue-dashboard.svg",
        githubUrl: "https://github.com/Mayedi007/vue-pro-dashboard",
        category: 'web'
      });
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-pulse h-8 bg-slate-200 rounded w-1/2 mx-auto mb-4"></div>
          <div className="animate-pulse h-4 bg-slate-200 rounded w-3/4 mx-auto mb-2"></div>
          <div className="animate-pulse h-4 bg-slate-200 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Project Not Found</h1>
          <p className="text-slate-600 mb-6">Sorry, the project you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => setLocation("/projects")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - Mohamed Abdellatif Ayadi</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/projects")} 
              className="mb-6 bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-lg opacity-90 mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex space-x-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub Repository</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md mb-8">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto object-cover rounded-lg border border-slate-200 mb-8"
            />
            
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: project.fullDescription || '' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;