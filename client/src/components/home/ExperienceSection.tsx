
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
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
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
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden lg:block"></div>
              
              <div className="space-y-12">
                {cv.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg hidden lg:block z-10"></div>
                    
                    <div className="flex flex-col lg:flex-row gap-8 lg:pl-20">
                      {/* Date and Location */}
                      <div className="lg:w-1/3 lg:text-right">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-3">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {exp.startDate} - {exp.endDate === 'Present' ? 'Present' : exp.endDate}
                          </div>
                          <p className="text-slate-600 text-sm">
                            {exp.company === "Technical University of Dortmund" ? "Dortmund, Germany" : 
                             exp.company === "Iperceramica Deutschland GmbH" ? "Dortmund, Germany" : "Germany"}
                          </p>
                        </div>
                      </div>

                      {/* Experience Card */}
                      <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                          {/* Header */}
                          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                            <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
                            <p className="text-blue-100 font-medium">{exp.company}</p>
                          </div>
                          
                          {/* Content */}
                          <div className="p-6">
                            {/* Add company logo placeholder or image */}
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8v-2a1 1 0 011-1h1a1 1 0 011 1v2m-4 0h4" />
                                </svg>
                              </div>
                              
                              <div className="flex-1">
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
                              </div>
                            </div>

                            {/* Key achievements or technologies (if we want to add them) */}
                            <div className="flex flex-wrap gap-2 mt-4">
                              {exp.company === "Iperceramica Deutschland GmbH" && (
                                <>
                                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">SAP</span>
                                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Sales</span>
                                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">CRM</span>
                                </>
                              )}
                              {exp.company === "Technical University of Dortmund" && (
                                <>
                                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">Java</span>
                                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">Teaching</span>
                                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">Algorithms</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
