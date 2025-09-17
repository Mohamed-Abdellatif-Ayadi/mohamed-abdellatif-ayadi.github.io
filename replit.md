# Mohamed Abdellatif Ayadi - Personal Portfolio & CV

## Overview

This is a modern personal portfolio and CV website for Mohamed Abdellatif Ayadi, a computer science student at TU Dortmund. The application features a bilingual interface (English/German) with an integrated AI chat assistant, dynamic CV display, blog functionality, and project showcase. Built as a full-stack web application using React on the frontend and Express.js on the backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **UI Components**: Custom component library built on Radix UI primitives with shadcn/ui patterns
- **Styling**: Tailwind CSS with a custom dark theme configuration and CSS custom properties
- **Internationalization**: Custom language context provider supporting English and German translations
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Design**: RESTful API with language parameter support for multilingual content
- **Data Layer**: In-memory storage with file-based data persistence (JSON files in server/data/)
- **Schema Validation**: Zod for runtime type checking and validation
- **Development Server**: Vite integration for hot module replacement in development

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL (ready for future database integration)
- **Current Storage**: File-based JSON storage for articles, CV data, and translations
- **Schema Design**: Shared TypeScript schemas between frontend and backend using Drizzle schema definitions
- **Multilingual Support**: Translation objects embedded in data structures with language-specific content

### Authentication and Authorization
- **Current Implementation**: No authentication required (public portfolio site)
- **Session Management**: Basic Express session configuration prepared for future features
- **Security**: CORS configuration and basic request logging middleware

### Content Management
- **Articles**: JSON-based blog post storage with multilingual translations
- **CV Data**: Structured JSON with complete professional information including experience, education, skills, and certifications
- **Project Showcase**: Static project data with GitHub integration links
- **Dynamic Content**: Language-aware content serving based on user preference

### UI/UX Design Patterns
- **Design System**: Consistent dark theme with purple/blue accent colors
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Component Architecture**: Reusable UI components with proper prop interfaces
- **Accessibility**: Semantic HTML structure with ARIA support through Radix UI
- **Performance**: Code splitting and lazy loading for optimal bundle sizes

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **@neondatabase/serverless**: PostgreSQL database driver (prepared for future use)
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **wouter**: Lightweight React router
- **react-helmet**: Document head management for SEO
- **zod**: Runtime type validation and schema definition

### UI Framework
- **@radix-ui/***: Headless UI component primitives for accessibility and functionality
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Modern icon library

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **@replit/vite-plugin-shadcn-theme-json**: Theme customization for Replit environment
- **eslint**: Code linting and quality assurance

### Email Integration (Prepared)
- **@sendgrid/mail**: Email service integration (configured but not actively used)
- **Email Simulation**: Mock email functionality for contact forms and notifications

### Future Integrations
- **Database**: PostgreSQL with Drizzle ORM (configuration ready)
- **Authentication**: Session-based auth infrastructure prepared
- **Email Service**: SendGrid integration configured for contact form submissions
- **AI Chat**: OpenAI API integration prepared for enhanced chat functionality