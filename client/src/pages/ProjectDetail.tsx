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
    // For now, we'll hard-code the database automation project
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