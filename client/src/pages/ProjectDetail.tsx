import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useLanguage } from "@/lib/languageContext";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectTranslation {
  title: string;
  description: string;
  fullDescription?: string;
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

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { t, language } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Helper function to get the correct translation based on current language
  const getTranslation = (project: Project) => {
    return project.translations[language as keyof typeof project.translations] || project.translations.en;
  };

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll hard-code project details based on ID
    if (id === "1") {
      setProject({
        id: 1,
        translations: {
          en: {
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
            `
          },
          de: {
            title: "Datenbanktabellenverzeichnis-Automatisierung",
            description: "Implementierung des Patents CN111339081A zur automatischen Erfassung und Integration heterogener Datenbanktabellenverzeichnisse.",
            fullDescription: `
              <h2>Patent-Hintergrund</h2>
              <p>In modernen Unternehmen sind Daten oft über verschiedene Datenbanksysteme verteilt. Unterschiede in Datenstrukturen und -formaten machen den Prozess der Erfassung und Integration von Informationen umständlich und zeitaufwendig. Dieses Projekt implementiert das Patent CN111339081A, das einen automatisierten Ansatz zur effizienten Erfassung von Tabellenverzeichnisinformationen aus verschiedenen Datenbanksystemen vorschlägt und den Datenextraktions- und Analyseprozess erheblich rationalisiert.</p>
              
              <h2>Projektübersicht</h2>
              <p>Dieses System erfasst und integriert automatisch Tabelleninformationen aus heterogenen Datenbanken, darunter MySQL, PostgreSQL und Oracle. Die Implementierung steigert die Datenextraktionseffizienz um bis zu 70% und reduziert die manuelle Bereitstellungs- und Verifizierungszeit um 90%.</p>
              
              <h2>Hauptmerkmale</h2>
              <ul>
                <li><strong>Automatisierte Datenerfassung</strong> - Das System erfasst automatisch grundlegende Informationen aus verschiedenen Datenbanken und generiert eine erste Liste von Datenbanktabellen.</li>
                <li><strong>Datenanalyse</strong> - Gesammelte Informationen werden analysiert, um Beziehungen zwischen Daten zu identifizieren.</li>
                <li><strong>Qualitätsüberwachung</strong> - Echtzeit-Überwachung von Datenqualitätsmetriken gewährleistet die Zuverlässigkeit der Datenanalyse.</li>
                <li><strong>Integrationsframework</strong> - Ein einheitliches System, das die Lücke zwischen verschiedenen Datenbanksystemen überbrückt.</li>
                <li><strong>Backup und Wiederherstellung</strong> - Automatisierte Backup- und Wiederherstellungsprozesse gewährleisten Datensicherheit und -verfügbarkeit.</li>
              </ul>
              
              <h2>Technische Umsetzung</h2>
              <p>Das Projekt wurde mit einer Kombination von Technologien entwickelt:</p>
              <ul>
                <li>SQL zur Abfrage verschiedener Datenbanksysteme</li>
                <li>ETL-Prozesse für die Datentransformation</li>
                <li>Automatisierungsskripte zur Minimierung manueller Eingriffe</li>
                <li>Datenvalidierungsframeworks zur Sicherstellung der Genauigkeit</li>
                <li>Überwachungstools zur Aufrechterhaltung der Systemintegrität</li>
              </ul>
              
              <h2>Auswirkungen und Ergebnisse</h2>
              <p>Die Implementierung dieses Systems hat zu folgenden Ergebnissen geführt:</p>
              <ul>
                <li>70% Steigerung der Datenextraktionseffizienz</li>
                <li>90% Reduzierung der manuellen Überprüfungszeit</li>
                <li>Verbesserte Datenqualität und -konsistenz</li>
                <li>Erhöhte Transparenz über Datenbanksysteme hinweg</li>
                <li>Vereinfachtes ETL-Workflow-Management</li>
              </ul>
            `
          },
          fr: {
            title: "Automatisation des Répertoires de Tables de Base de Données",
            description: "Implémentation du brevet CN111339081A pour la collecte et l'intégration automatiques de répertoires de tables de bases de données hétérogènes.",
            fullDescription: `
              <h2>Contexte du Brevet</h2>
              <p>Dans les entreprises modernes, les données sont souvent dispersées dans divers systèmes de bases de données. Les différences de structures et de formats de données rendent le processus de collecte et d'intégration des informations fastidieux et chronophage. Ce projet implémente le brevet CN111339081A, qui propose une approche automatisée pour collecter efficacement les informations de répertoire de tables à partir de divers systèmes de bases de données, rationalisant considérablement le processus d'extraction et d'analyse des données.</p>
              
              <h2>Aperçu du Projet</h2>
              <p>Ce système collecte et intègre automatiquement les informations de tables provenant de bases de données hétérogènes, notamment MySQL, PostgreSQL et Oracle. L'implémentation augmente l'efficacité d'extraction des données jusqu'à 70% et réduit le temps de déploiement et de vérification manuelle de 90%.</p>
              
              <h2>Caractéristiques Principales</h2>
              <ul>
                <li><strong>Collecte Automatisée de Données</strong> - Le système collecte automatiquement des informations de base à partir de diverses bases de données, générant une liste initiale des tables de base de données.</li>
                <li><strong>Analyse de Données</strong> - Les informations collectées sont analysées pour identifier les relations entre les données.</li>
                <li><strong>Surveillance de la Qualité</strong> - Le suivi en temps réel des métriques de qualité des données assure la fiabilité de l'analyse des données.</li>
                <li><strong>Cadre d'Intégration</strong> - Un système unifié qui comble le fossé entre les différents systèmes de bases de données.</li>
                <li><strong>Sauvegarde et Récupération</strong> - Des processus automatisés de sauvegarde et de récupération assurent la sécurité et la disponibilité des données.</li>
              </ul>
              
              <h2>Implémentation Technique</h2>
              <p>Le projet a été construit en utilisant une combinaison de technologies:</p>
              <ul>
                <li>SQL pour interroger divers systèmes de bases de données</li>
                <li>Processus ETL pour la transformation des données</li>
                <li>Scripts d'automatisation pour minimiser l'intervention manuelle</li>
                <li>Frameworks de validation des données pour assurer la précision</li>
                <li>Outils de surveillance pour maintenir la santé du système</li>
              </ul>
              
              <h2>Impact et Résultats</h2>
              <p>La mise en œuvre de ce système a entraîné:</p>
              <ul>
                <li>70% d'augmentation de l'efficacité d'extraction des données</li>
                <li>90% de réduction du temps de vérification manuelle</li>
                <li>Amélioration de la qualité et de la cohérence des données</li>
                <li>Visibilité accrue à travers les systèmes de bases de données</li>
                <li>Gestion simplifiée des flux de travail ETL</li>
              </ul>
            `
          }
        },
        techStack: ["ETL", "Data Engineering", "SQL", "Automation", "Database"],
        imageUrl: "/images/database-automation.svg",
        githubUrl: "https://github.com/Mayedi007/database-automation",
        liveUrl: "https://github.com/Mayedi007/database-automation",
        category: 'ai'
      });
    } else if (id === "2") {
      setProject({
        id: 2,
        translations: {
          en: {
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
            `
          },
          de: {
            title: "Blitzverkauf-Plattform",
            description: "Eine Hochleistungs-E-Commerce-Plattform für zeitlich begrenzte Werbeaktionen.",
            fullDescription: `
              <h2>Projektübersicht</h2>
              <p>Flash Sale ist eine Hochleistungs-E-Commerce-Plattform, die speziell für zeitlich begrenzte Werbeaktionen entwickelt wurde. Mit Skalierbarkeit und Parallelität im Fokus kann diese Plattform große Mengen gleichzeitiger Benutzer während Blitzverkaufsveranstaltungen bewältigen.</p>
              
              <h2>Hauptmerkmale</h2>
              <ul>
                <li><strong>OTP-basierte Benutzerregistrierung</strong> - Sichere Einmalpasswort-Verifizierung während der Registrierung.</li>
                <li><strong>Sichere Anmeldung mit Token-Sitzungen</strong> - Redis-gestützte Token-Sitzungen für die Authentifizierung.</li>
                <li><strong>Produktmanagement</strong> - Umfassende Produktinformationen einschließlich Titel, Bild, Beschreibung, Preis und Bestandsverwaltung.</li>
                <li><strong>Aktionsbasierter Blitzverkauf</strong> - Zeitlich begrenzte Verkäufe mit Countdown-Timer, um Dringlichkeit zu erzeugen.</li>
                <li><strong>Erweitertes Caching</strong> - Guava- und Redis-Caching für schnellen Datenzugriff in Hochverkehrszeiten.</li>
                <li><strong>Responsives Design</strong> - Saubere Bootstrap-Oberfläche, die auf allen Gerätegrößen funktioniert.</li>
              </ul>
              
              <h2>Technische Architektur</h2>
              <p>Die Plattform ist mit einer modernen mehrstufigen Architektur aufgebaut:</p>
              <ul>
                <li><strong>Backend:</strong> Spring Boot für robuste, wartbare serverseitige Logik</li>
                <li><strong>Frontend:</strong> HTML, Bootstrap und jQuery für eine responsive Benutzeroberfläche</li>
                <li><strong>ORM & Datenbank:</strong> MyBatis-Integration mit MySQL für Datenpersistenz</li>
                <li><strong>Caching-Schicht:</strong> Redis und Guava Cache für Leistungsoptimierung</li>
                <li><strong>Authentifizierung:</strong> Spring Session mit Redis für sichere, skalierbare Benutzersitzungen</li>
                <li><strong>Build-Tool:</strong> Maven für Abhängigkeitsmanagement und Projektbuild</li>
              </ul>
              
              <h2>Hochkonkurrenz-Handling</h2>
              <p>Die Plattform implementiert mehrere Techniken, um die hohe Parallelität zu bewältigen, die für Blitzverkaufsveranstaltungen typisch ist:</p>
              <ul>
                <li>Verteiltes Caching zur Reduzierung des Datenbankdrucks</li>
                <li>Asynchrone Verarbeitung für die Auftragserstellung</li>
                <li>Optimistisches Sperren für die Bestandsverwaltung</li>
                <li>Ratenbegrenzung zur Verhinderung von Missbrauch</li>
                <li>Kreisunterbrecher zur Aufrechterhaltung der Systemstabilität bei Spitzenlasten</li>
              </ul>
              
              <h2>Projektstruktur</h2>
              <p>Der Codebase folgt einer sauberen, modularen Organisation:</p>
              <ul>
                <li><strong>Controller:</strong> REST-Endpunkte für Benutzerinteraktion</li>
                <li><strong>Services:</strong> Implementierung der Geschäftslogik</li>
                <li><strong>DAO-Schicht:</strong> MyBatis-Mapper für Datenbankoperationen</li>
                <li><strong>Modelle:</strong> Datenobjekte, die die Domäne repräsentieren</li>
                <li><strong>Konfiguration:</strong> Systemeinrichtung und Umgebungseinstellungen</li>
                <li><strong>Fehlerbehandlung:</strong> Benutzerdefinierte Ausnahmen und globales Fehlermanagement</li>
              </ul>
            `
          },
          fr: {
            title: "Plateforme de Vente Flash",
            description: "Une plateforme e-commerce haute performance pour des offres promotionnelles à durée limitée.",
            fullDescription: `
              <h2>Aperçu du Projet</h2>
              <p>Flash Sale est une plateforme e-commerce haute performance conçue spécifiquement pour les offres promotionnelles à durée limitée. Construite avec la scalabilité et la concurrence à l'esprit, cette plateforme peut gérer des volumes élevés d'utilisateurs simultanés pendant les événements de vente flash.</p>
              
              <h2>Caractéristiques Principales</h2>
              <ul>
                <li><strong>Inscription Utilisateur basée sur OTP</strong> - Vérification sécurisée par mot de passe à usage unique lors de l'inscription.</li>
                <li><strong>Connexion Sécurisée avec Sessions Token</strong> - Sessions token basées sur Redis pour l'authentification.</li>
                <li><strong>Gestion des Produits</strong> - Informations complètes sur les produits comprenant titre, image, description, prix et gestion des stocks.</li>
                <li><strong>Vente Flash basée sur Promotions</strong> - Ventes à durée limitée avec compte à rebours pour créer un sentiment d'urgence.</li>
                <li><strong>Mise en Cache Avancée</strong> - Mise en cache Guava et Redis pour un accès aux données à haute vitesse pendant les périodes de trafic élevé.</li>
                <li><strong>Design Responsive</strong> - Interface Bootstrap épurée qui fonctionne sur toutes les tailles d'appareils.</li>
              </ul>
              
              <h2>Architecture Technique</h2>
              <p>La plateforme est construite en utilisant une architecture moderne à plusieurs niveaux:</p>
              <ul>
                <li><strong>Backend:</strong> Spring Boot pour une logique côté serveur robuste et maintenable</li>
                <li><strong>Frontend:</strong> HTML, Bootstrap et jQuery pour une interface utilisateur responsive</li>
                <li><strong>ORM & Base de Données:</strong> Intégration MyBatis avec MySQL pour la persistance des données</li>
                <li><strong>Couche de Cache:</strong> Redis et Guava Cache pour l'optimisation des performances</li>
                <li><strong>Authentification:</strong> Spring Session avec Redis pour des sessions utilisateur sécurisées et scalables</li>
                <li><strong>Outil de Build:</strong> Maven pour la gestion des dépendances et la construction du projet</li>
              </ul>
              
              <h2>Gestion de Haute Concurrence</h2>
              <p>La plateforme implémente plusieurs techniques pour gérer la haute concurrence typique des événements de vente flash:</p>
              <ul>
                <li>Mise en cache distribuée pour réduire la pression sur la base de données</li>
                <li>Traitement asynchrone pour la création de commandes</li>
                <li>Verrouillage optimiste pour la gestion des stocks</li>
                <li>Limitation de débit pour prévenir les abus</li>
                <li>Disjoncteurs pour maintenir la stabilité du système pendant les charges de pointe</li>
              </ul>
              
              <h2>Structure du Projet</h2>
              <p>Le code suit une organisation propre et modulaire:</p>
              <ul>
                <li><strong>Contrôleurs:</strong> Points d'extrémité REST pour l'interaction utilisateur</li>
                <li><strong>Services:</strong> Implémentation de la logique métier</li>
                <li><strong>Couche DAO:</strong> Mappeurs MyBatis pour les opérations de base de données</li>
                <li><strong>Modèles:</strong> Objets de données représentant le domaine</li>
                <li><strong>Configuration:</strong> Configuration système et paramètres d'environnement</li>
                <li><strong>Gestion des Erreurs:</strong> Exceptions personnalisées et gestion globale des erreurs</li>
              </ul>
            `
          }
        },
        techStack: ["Spring Boot", "Redis", "MySQL", "Bootstrap", "jQuery", "MyBatis"],
        imageUrl: "/images/flash-sale-platform.svg",
        githubUrl: "https://github.com/Mayedi007/flash-sale-platform",
        category: 'web'
      });
    } else if (id === "3") {
      setProject({
        id: 3,
        translations: {
          en: {
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
            `
          },
          de: {
            title: "Reddit-Daten-Streaming-Pipeline",
            description: "Eine umfassende ETL-Datenpipeline für Reddit-Daten.",
            fullDescription: `
              <h2>Projektübersicht</h2>
              <p>Dieses Projekt ist eine vollständige Datenpipeline, die Daten aus der Reddit-API extrahiert, sie durch eine Reihe von AWS-Diensten verarbeitet und visualisierte Erkenntnisse über Dashboards ausgibt. Die Pipeline wurde mit modernen Datentechnikprinzipien und Cloud-nativen Technologien erstellt.</p>
              
              <h2>Architektur</h2>
              <p>Die Pipeline folgt einer modernen Cloud-basierten ETL-Architektur:</p>
              <ol>
                <li>Datenextraktion mit der Reddit-API</li>
                <li>Laden der Daten in AWS S3</li>
                <li>Kopieren der Daten in AWS Redshift</li>
                <li>Transformation mit dbt (data build tool)</li>
                <li>Erstellung von Visualisierungs-Dashboards in PowerBI oder Google Data Studio</li>
                <li>Orchestrierung des gesamten Workflows mit Airflow in Docker</li>
                <li>Bereitstellung von AWS-Ressourcen mit Terraform</li>
              </ol>
              
              <h2>Hauptkomponenten</h2>
              <ul>
                <li><strong>Datenextraktion:</strong> Python-Skripte für die Interaktion mit der Reddit-API</li>
                <li><strong>Datenspeicherung:</strong> AWS S3 für Rohdaten und Redshift für analytische Abfragen</li>
                <li><strong>Transformation:</strong> dbt für SQL-basierte Transformationen mit Tests und Dokumentation</li>
                <li><strong>Orchestrierung:</strong> Apache Airflow in Docker-Containern</li>
                <li><strong>Infrastructure as Code:</strong> Terraform-Skripte für die AWS-Ressourcenbereitstellung</li>
                <li><strong>Visualisierung:</strong> Interaktive Dashboards in PowerBI/Google Data Studio</li>
              </ul>
              
              <h2>Technische Umsetzung</h2>
              <p>Das Projekt demonstriert mehrere fortgeschrittene Datentechnikkonzepte:</p>
              <ul>
                <li>Containerisierung mit Docker für konsistente Entwicklung und Bereitstellung</li>
                <li>Infrastructure as Code (IaC) für reproduzierbare Cloud-Setups</li>
                <li>Best Practices für Datenmodellierung in Redshift</li>
                <li>Workflow-Orchestrierung mit DAGs in Airflow</li>
                <li>Inkrementelle Lademuster</li>
                <li>Fehlerbehandlung und Überwachung</li>
              </ul>
              
              <h2>Erkenntnisse & Visualisierungen</h2>
              <p>Das Endergebnis ist ein umfassendes Dashboard, das Einblicke in das r/dataengineering Subreddit bietet, darunter:</p>
              <ul>
                <li>Beliebte Themen und Trends</li>
                <li>Metriken zur Benutzerinteraktion</li>
                <li>Analyse von Posting-Mustern und -Zeiten</li>
                <li>Inhaltskategorisierung</li>
                <li>Technologieerwähnungen und Beliebtheit</li>
              </ul>
            `
          },
          fr: {
            title: "Pipeline de Streaming de Données Reddit",
            description: "Un pipeline ETL complet pour les données Reddit.",
            fullDescription: `
              <h2>Aperçu du Projet</h2>
              <p>Ce projet est un pipeline de données complet qui extrait des données de l'API Reddit, les traite via une série de services AWS, et produit des insights visualisés à travers des tableaux de bord. Le pipeline est construit avec des principes modernes d'ingénierie de données et des technologies natives du cloud.</p>
              
              <h2>Architecture</h2>
              <p>Le pipeline suit une architecture ETL moderne basée sur le cloud:</p>
              <ol>
                <li>Extraction des données via l'API Reddit</li>
                <li>Chargement des données dans AWS S3</li>
                <li>Copie des données dans AWS Redshift</li>
                <li>Transformation avec dbt (data build tool)</li>
                <li>Création de tableaux de bord de visualisation dans PowerBI ou Google Data Studio</li>
                <li>Orchestration de l'ensemble du flux de travail avec Airflow dans Docker</li>
                <li>Provisionnement des ressources AWS avec Terraform</li>
              </ol>
              
              <h2>Composants Clés</h2>
              <ul>
                <li><strong>Extraction de Données:</strong> Scripts Python pour interagir avec l'API Reddit</li>
                <li><strong>Stockage de Données:</strong> AWS S3 pour les données brutes et Redshift pour les requêtes analytiques</li>
                <li><strong>Transformation:</strong> dbt pour les transformations basées sur SQL avec tests et documentation</li>
                <li><strong>Orchestration:</strong> Apache Airflow fonctionnant dans des conteneurs Docker</li>
                <li><strong>Infrastructure as Code:</strong> Scripts Terraform pour le provisionnement des ressources AWS</li>
                <li><strong>Visualisation:</strong> Tableaux de bord interactifs dans PowerBI/Google Data Studio</li>
              </ul>
              
              <h2>Implémentation Technique</h2>
              <p>Le projet démontre plusieurs concepts avancés d'ingénierie de données:</p>
              <ul>
                <li>Conteneurisation avec Docker pour un développement et déploiement cohérents</li>
                <li>Infrastructure as Code (IaC) pour des configurations cloud reproductibles</li>
                <li>Meilleures pratiques de modélisation de données dans Redshift</li>
                <li>Orchestration de flux de travail avec DAGs dans Airflow</li>
                <li>Modèles de chargement incrémentiel</li>
                <li>Gestion des erreurs et surveillance</li>
              </ul>
              
              <h2>Insights & Visualisations</h2>
              <p>Le résultat final est un tableau de bord complet qui fournit des insights sur le subreddit r/dataengineering, notamment:</p>
              <ul>
                <li>Sujets populaires et tendances</li>
                <li>Métriques d'engagement des utilisateurs</li>
                <li>Analyse des modèles de publication et de timing</li>
                <li>Catégorisation du contenu</li>
                <li>Mentions de technologies et popularité</li>
              </ul>
            `
          }
        },
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
        <title>{getTranslation(project).title} - Mohamed Abdellatif Ayadi</title>
        <meta name="description" content={getTranslation(project).description} />
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
              {t('projects.backToProjects')}
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{getTranslation(project).title}</h1>
            <p className="text-lg opacity-90 mb-6">
              {getTranslation(project).description}
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
                <span>{t('projects.githubRepository')}</span>
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
                  <span>{t('projects.liveDemo')}</span>
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
              alt={getTranslation(project).title}
              className="w-full h-auto object-cover rounded-lg border border-slate-200 mb-8"
            />
            
            <div 
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: getTranslation(project).fullDescription || '' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;