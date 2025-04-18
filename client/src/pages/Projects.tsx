import { Helmet } from "react-helmet";
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/lib/languageContext";

interface ProjectTranslation {
  title: string;
  description: string;
}

interface Project {
  id: number;
  translations: {
    en: ProjectTranslation;
    de: ProjectTranslation;
    fr: ProjectTranslation;
  };
  techStack: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'ai' | 'other';
}

const Projects = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Projects from your GitHub repositories with multilingual support
  const projects: Project[] = [
    {
      id: 1,
      translations: {
        en: {
          title: "Database Table Directory Automation",
          description: "Implementation of patent CN111339081A for automatically collecting and integrating heterogeneous database table directories, boosting data extraction efficiency by up to 70% and reducing manual verification time by 90%."
        },
        de: {
          title: "Datenbanktabellenverzeichnis-Automatisierung",
          description: "Implementierung des Patents CN111339081A zur automatischen Erfassung und Integration heterogener Datenbanktabellenverzeichnisse, wodurch die Datenextraktionseffizienz um bis zu 70% gesteigert und die manuelle Verifizierungszeit um 90% reduziert wird."
        },
        fr: {
          title: "Automatisation des Répertoires de Tables de Base de Données",
          description: "Implémentation du brevet CN111339081A pour la collecte et l'intégration automatiques de répertoires de tables de bases de données hétérogènes, augmentant l'efficacité d'extraction de données jusqu'à 70% et réduisant le temps de vérification manuelle de 90%."
        }
      },
      techStack: ["ETL", "Data Engineering", "SQL", "Automation", "Database"],
      imageUrl: "/images/database-automation.svg",
      githubUrl: "https://github.com/Mayedi007/database-automation",
      liveUrl: "https://github.com/Mayedi007/database-automation",
      category: "ai"
    },
    {
      id: 2,
      translations: {
        en: {
          title: "Flash Sale Platform",
          description: "A high-performance e-commerce platform for limited-time promotional deals, built with Spring Boot, Redis, MySQL, and a responsive frontend. Supports OTP-based registration, secure login, flash sale countdowns, and real-time inventory control."
        },
        de: {
          title: "Blitzverkauf-Plattform",
          description: "Eine Hochleistungs-E-Commerce-Plattform für zeitlich begrenzte Werbeaktionen, entwickelt mit Spring Boot, Redis, MySQL und einem responsiven Frontend. Unterstützt OTP-basierte Registrierung, sichere Anmeldung, Countdown-Funktionen für Blitzverkäufe und Echtzeit-Bestandskontrolle."
        },
        fr: {
          title: "Plateforme de Vente Flash",
          description: "Une plateforme e-commerce haute performance pour des offres promotionnelles à durée limitée, construite avec Spring Boot, Redis, MySQL et une interface responsive. Prend en charge l'inscription basée sur OTP, la connexion sécurisée, le compte à rebours des ventes flash et le contrôle d'inventaire en temps réel."
        }
      },
      techStack: ["Spring Boot", "Redis", "MySQL", "Bootstrap", "jQuery", "MyBatis"],
      imageUrl: "/images/flash-sale-platform.svg",
      githubUrl: "https://github.com/Mayedi007/flash-sale-platform",
      category: "web"
    },
    {
      id: 3,
      translations: {
        en: {
          title: "Reddit Data Streaming Pipeline",
          description: "A comprehensive ETL data pipeline that extracts Reddit data, processes it through AWS services, and visualizes insights in dashboards. Built with Airflow, Docker, dbt, and AWS cloud infrastructure."
        },
        de: {
          title: "Reddit-Daten-Streaming-Pipeline",
          description: "Eine umfassende ETL-Datenpipeline, die Reddit-Daten extrahiert, sie über AWS-Dienste verarbeitet und Erkenntnisse in Dashboards visualisiert. Erstellt mit Airflow, Docker, dbt und AWS-Cloud-Infrastruktur."
        },
        fr: {
          title: "Pipeline de Streaming de Données Reddit",
          description: "Un pipeline ETL complet qui extrait les données de Reddit, les traite via les services AWS et visualise les informations dans des tableaux de bord. Construit avec Airflow, Docker, dbt et l'infrastructure cloud AWS."
        }
      },
      techStack: ["Python", "AWS", "Airflow", "Docker", "Terraform", "PowerBI"],
      imageUrl: "/images/reddit-pipeline.svg",
      githubUrl: "https://github.com/Mayedi007/reddit-data-streaming-pipeline",
      category: "ai"
    },
    {
      id: 4,
      translations: {
        en: {
          title: "Java LeetCode Solutions",
          description: "A collection of coding problem solutions from LeetCode organized by topic (Dynamic Programming, Linked Lists, Stack) and solved using clean code principles with Java 17+."
        },
        de: {
          title: "Java LeetCode Lösungen",
          description: "Eine Sammlung von Lösungen für Programmierprobleme von LeetCode, organisiert nach Themen (Dynamische Programmierung, Verkettete Listen, Stack) und mit Clean-Code-Prinzipien in Java 17+ gelöst."
        },
        fr: {
          title: "Solutions Java pour LeetCode",
          description: "Une collection de solutions de problèmes de codage de LeetCode organisée par sujet (Programmation Dynamique, Listes Chaînées, Pile) et résolue en utilisant les principes de code propre avec Java 17+."
        }
      },
      techStack: ["Java", "Algorithms", "Data Structures", "LeetCode"],
      imageUrl: "/images/leetcode-solutions.svg",
      githubUrl: "https://github.com/Mayedi007/java-praktices-leetcode",
      category: "other"
    },
    {
      id: 5,
      translations: {
        en: {
          title: "Vue Pro Dashboard",
          description: "A professional dashboard built with Vue.js, featuring responsive design, interactive data visualization, and modern UI components."
        },
        de: {
          title: "Vue Pro Dashboard",
          description: "Ein professionelles Dashboard, entwickelt mit Vue.js, mit responsivem Design, interaktiver Datenvisualisierung und modernen UI-Komponenten."
        },
        fr: {
          title: "Tableau de Bord Vue Pro",
          description: "Un tableau de bord professionnel construit avec Vue.js, présentant un design responsive, une visualisation de données interactive et des composants d'interface utilisateur modernes."
        }
      },
      techStack: ["Vue.js", "JavaScript", "CSS", "Responsive Design"],
      imageUrl: "/images/vue-dashboard.svg",
      githubUrl: "https://github.com/Mayedi007/vue-pro-dashboard",
      category: "web"
    }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  // Get the correct translation based on the current language
  const getTranslation = (project: Project) => {
    return project.translations[language as keyof typeof project.translations] || project.translations.en;
  };
  
  return (
    <>
      <Helmet>
        <title>{t('projects.title')} - Mohamed Abdellatif Ayadi</title>
        <meta name="description" content={t('projects.metaDescription')} />
      </Helmet>
      
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('projects.heading')}</h1>
            <p className="text-lg opacity-90 mb-6">
              {t('projects.subheading')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex bg-white p-1 rounded-lg shadow-sm">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-md font-medium ${activeFilter === 'all' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t('projects.filters.all')}
              </button>
              <button 
                onClick={() => setActiveFilter('web')}
                className={`px-4 py-2 rounded-md font-medium ${activeFilter === 'web' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t('projects.filters.web')}
              </button>
              <button 
                onClick={() => setActiveFilter('ai')}
                className={`px-4 py-2 rounded-md font-medium ${activeFilter === 'ai' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t('projects.filters.aiData')}
              </button>
              <button 
                onClick={() => setActiveFilter('other')}
                className={`px-4 py-2 rounded-md font-medium ${activeFilter === 'other' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {t('projects.filters.other')}
              </button>
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => {
              const translation = getTranslation(project);
              return (
                <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                  <div className="h-48 overflow-hidden bg-slate-200">
                    <img 
                      src={project.imageUrl} 
                      alt={translation.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback for broken images
                        const target = e.target as HTMLImageElement;
                        
                        // Create project-specific fallback images based on title
                        const title = translation.title;
                        const fallbackText = title.replace(/\s+/g, '+');
                        if (title.includes("Database") || title.includes("Datenbank") || title.includes("Base de Données")) {
                          target.src = `https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=${fallbackText}`;
                        } else if (title.includes("Flash") || title.includes("Blitz") || title.includes("Vente")) {
                          target.src = `https://via.placeholder.com/400x200/FF5722/FFFFFF?text=${fallbackText}`;
                        } else if (title.includes("Reddit")) {
                          target.src = `https://via.placeholder.com/400x200/FF4500/FFFFFF?text=${fallbackText}`;
                        } else if (title.includes("LeetCode")) {
                          target.src = `https://via.placeholder.com/400x200/2C3E50/FFFFFF?text=${fallbackText}`;
                        } else if (title.includes("Vue") || title.includes("Tableau")) {
                          target.src = `https://via.placeholder.com/400x200/41B883/FFFFFF?text=${fallbackText}`;
                        } else {
                          target.src = `https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=${fallbackText}`;
                        }
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-slate-900">
                      <Link href={`/projects/${project.id}`} className="hover:text-primary transition-colors">
                        {translation.title}
                      </Link>
                    </h3>
                    <p className="text-slate-600 mb-4">{translation.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Links */}
                    <div className="flex justify-between items-center">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-600 flex items-center gap-1 font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-600 flex items-center gap-1 font-medium"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          {t('projects.liveDemo')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">{t('projects.noProjectsFound')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;