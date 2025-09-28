
import { useQuery } from "@tanstack/react-query";
import { CV } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/languageContext";

const ExperienceSection = () => {
  const { t, language } = useLanguage();
  const { data: cv, isLoading } = useQuery<CV>({
    queryKey: ["/api/cv", language],
  });

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              My journey through various roles and experiences in technology and business
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="relative">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/3">
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="lg:w-2/3">
                      <Skeleton className="h-48 w-full rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : cv ? (
            <div className="grid gap-8">
              {cv.experience.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl border-2 border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Ccircle cx='49' cy='49' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                      </div>

                      <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-2a1 1 0 011-1h1a1 1 0 011 1v2m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>
                            <p className="text-gray-200 font-medium text-lg">{exp.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-200 font-medium bg-white bg-opacity-20 px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                            {exp.startDate} - {exp.endDate === 'Present' ? 'Present' : exp.endDate}
                          </span>
                          <div className="text-gray-300 text-sm">
                            {exp.company === "Technical University of Dortmund" ? "Dortmund, Germany" : 
                             exp.company === "Iperceramica Deutschland GmbH" ? "Dortmund, Germany" : "Germany"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <div className="prose max-w-none">
                        {exp.description.split('\n').map((paragraph, pIndex) => (
                          paragraph.trim() && (
                            <div key={pIndex} className="mb-4 last:mb-0">
                              {paragraph.trim().startsWith('•') ? (
                                <div className="flex items-start space-x-4">
                                  <div className="w-2 h-2 bg-slate-600 rounded-full mt-2 flex-shrink-0"></div>
                                  <p className="text-slate-700 leading-relaxed text-base">{paragraph.replace('•', '').trim()}</p>
                                </div>
                              ) : (
                                <p className="text-slate-700 leading-relaxed text-base">{paragraph}</p>
                              )}
                            </div>
                          )
                        ))}
                      </div>

                      {/* Skills/Technologies used */}
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        <h4 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">Key Technologies & Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {index === 0 && (
                            <>
                              {['SAP', 'SAP S/4HANA', 'CRM Systems', 'B2B/B2C Sales', 'Customer Relations', 'Data Management'].map((tech, techIndex) => (
                                <span key={techIndex} className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium border border-gray-200">
                                  {tech}
                                </span>
                              ))}
                            </>
                          )}
                          {index === 1 && (
                            <>
                              {['Java Programming', 'Object-Oriented Programming', 'Teaching', 'Mentoring', 'Algorithms', 'Data Structures'].map((tech, techIndex) => (
                                <span key={techIndex} className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium border border-gray-200">
                                  {tech}
                                </span>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-slate-600">Unable to load experience data</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
