import { CV as OriginalCV } from "@shared/schema";

// Define interfaces to match the actual API response structure
interface SkillCategory {
  category: string;
  items: string[];
}

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  website?: string;
  social?: Array<{name: string, url: string}>;
}

interface ExtendedCV {
  name: string;
  title: string;
  photoUrl: string;
  summary: string;
  contact: ContactInfo;
  skills: SkillCategory[];
  experience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
    highlights?: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    location?: string;
    description?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer?: string;
    date?: string;
    year?: string;
    expires?: string;
  }>;
  languages?: Array<{
    language?: string;
    name?: string;
    proficiency: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
}

type CVDisplayProps = {
  cv: ExtendedCV;
};

const CVDisplay = ({ cv }: CVDisplayProps) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 bg-primary-700 md:w-48 flex flex-col items-center justify-center p-6 text-white">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-4">
            <img 
              src={cv.photoUrl} 
              alt={cv.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <h3 className="text-xl font-bold">{cv.name}</h3>
          <p className="text-primary-200">{cv.title}</p>
          
          <div className="mt-6 w-full">
            <h4 className="font-semibold mb-2 text-white/90">Contact</h4>
            <div className="space-y-2 text-sm">
              <a href={`mailto:${cv.contact?.email}`} className="flex items-center text-white/80 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {cv.contact?.email}
              </a>
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {cv.contact?.phone}
              </div>
              <div className="flex items-center text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {cv.contact?.location}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Summary</h3>
            <p className="text-slate-600">{cv.summary}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Skills</h3>
            {Array.isArray(cv.skills) && cv.skills.length > 0 && cv.skills[0].category ? (
              // New structure with categories
              <div className="space-y-4">
                {cv.skills.map((skillCategory, catIndex) => (
                  <div key={catIndex}>
                    <h4 className="text-base font-medium text-slate-800 mb-2">{skillCategory.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.items.map((item, itemIndex) => (
                        <span key={`${catIndex}-${itemIndex}`} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Fallback to old structure (flat array)
              <div className="flex flex-wrap gap-2">
                {Array.isArray(cv.skills) && cv.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Experience</h3>
            <div className="space-y-4">
              {cv.experience.map((exp, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary-700"></div>
                    {index < cv.experience.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-200 ml-1.5"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-slate-900">{exp.position} at {exp.company}</h4>
                    <p className="text-sm text-slate-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                    <p className="text-slate-600 mt-1">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Education</h3>
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-primary-700"></div>
                    {index < cv.education.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-200 ml-1.5"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-slate-900">{edu.degree}</h4>
                    <p className="text-sm text-slate-700">{edu.institution}, {edu.location}</p>
                    <p className="text-sm text-slate-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {cv.certifications && cv.certifications.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Certifications</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {cv.certifications.map((certification, index) => (
                  <li key={index}>{certification.name} ({certification.year})</li>
                ))}
              </ul>
            </div>
          )}

          {cv.languages && cv.languages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-4">
                {cv.languages.map((language, index) => (
                  <div key={index} className="flex items-center">
                    <span className="font-medium text-slate-700">{language.name}:</span>
                    <span className="ml-2 text-slate-600">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVDisplay;
