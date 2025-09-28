import { CV as OriginalCV } from "@shared/schema";

// Define interfaces to match the actual API response structure
export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  website?: string;
  social?: Array<{name: string, url: string}>;
}

export interface ExtendedCV {
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
    <div className="max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden">
      {/* Modern Header Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Ccircle cx='49' cy='49' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Photo with modern styling */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cv.photoUrl}
                  alt={cv.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
            </div>

            {/* Name and Title */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                {cv.name}
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 font-light mb-4">{cv.title}</p>

              {/* Contact Info with Icons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                <a href={`mailto:${cv.contact?.email}`} className="flex items-center text-white/80 hover:text-white transition-colors group">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-2 group-hover:bg-white/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  {cv.contact?.email}
                </a>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  {cv.contact?.phone}
                </div>
                <div className="flex items-center text-white/80">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  {cv.contact?.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-0">
        {/* Left Sidebar */}
        <div className="md:col-span-1 bg-gradient-to-b from-slate-50 to-slate-100 p-8 border-r border-slate-200">
          {/* Skills Section */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-6 h-6 bg-violet-600 rounded-lg flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              Skills
            </h3>
            <div className="space-y-4">
              {cv.skills.map((skillCategory, catIndex) => (
                <div key={catIndex} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 text-center">{skillCategory.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((item: string, itemIndex: number) => (
                      <span key={`${catIndex}-${itemIndex}`} className="px-2 py-1 bg-violet-50 text-violet-700 rounded-lg text-xs font-medium border border-violet-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          {cv.languages && cv.languages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <div className="w-6 h-6 bg-teal-600 rounded-lg flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                Languages
              </h3>
              <div className="space-y-3">
                {cv.languages.map((language, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{language.language || language.name}</span>
                      <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full">{language.proficiency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 p-8">
          {/* Summary Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Professional Summary
            </h3>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
              <p className="text-slate-700 leading-relaxed">{cv.summary}</p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0h2.586a1 1 0 01.707.293L21 8" />
                </svg>
              </div>
              Professional Experience
            </h3>

            <div className="grid gap-8">
              {cv.experience.map((exp, index) => {
                return (
                  <div key={index} className="relative">
                    <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Header Section */}
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-2 lg:space-y-0">
                          <div>
                            <h4 className="text-xl font-bold mb-1">{exp.position}</h4>
                            <p className="text-blue-100 font-medium text-lg">{exp.company}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-blue-100 font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                              {exp.startDate} - {exp.endDate === 'Present' ? 'Present' : exp.endDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <div className="prose max-w-none">
                          {exp.description.split('\n').map((paragraph, pIndex) => (
                            paragraph.trim() && (
                              <div key={pIndex} className="mb-3 last:mb-0">
                                {paragraph.trim().startsWith('•') ? (
                                  <div className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p className="text-slate-700 leading-relaxed">{paragraph.replace('•', '').trim()}</p>
                                  </div>
                                ) : (
                                  <p className="text-slate-700 leading-relaxed">{paragraph}</p>
                                )}
                              </div>
                            )
                          ))}
                        </div>

                        {/* Skills/Technologies used (if available) */}
                        {index === 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="flex flex-wrap gap-2">
                              {['SAP', 'SAP S/4HANA', 'CRM Systems', 'B2B/B2C Sales'].map((tech, techIndex) => (
                                <span key={techIndex} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="flex flex-wrap gap-2">
                              {['Java Programming', 'Object-Oriented Programming', 'Teaching', 'Mentoring'].map((tech, techIndex) => (
                                <span key={techIndex} className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-medium">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              Education
            </h3>
            <div className="space-y-4">
              {cv.education.map((edu, index) => (
                <div key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900">{edu.degree}</h4>
                      <p className="text-emerald-700 font-medium">{edu.institution}</p>
                      {edu.location && <p className="text-sm text-slate-600">{edu.location}</p>}
                    </div>
                    <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-slate-600 text-sm mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          {cv.certifications && cv.certifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-orange-600 rounded-xl flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                Certifications
              </h3>
              <div className="grid gap-3">
                {cv.certifications.map((certification, index) => (
                  <div key={index} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-900">{certification.name}</span>
                      <span className="text-sm text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                        {certification.year || certification.date}
                      </span>
                    </div>
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