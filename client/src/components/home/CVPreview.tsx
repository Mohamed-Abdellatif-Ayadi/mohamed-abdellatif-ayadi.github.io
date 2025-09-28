import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { CV } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/languageContext";

const CVPreview = () => {
  const { t, language } = useLanguage();
  const { data: cv, isLoading } = useQuery<CV>({
    queryKey: ["/api/cv", language],
  });

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t('home.cvPreview.title')}</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            {t('home.cvPreview.subtitle')}
          </p>
        </div>
        
        {isLoading ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 bg-primary-700 md:w-48 flex flex-col items-center justify-center p-6">
                <Skeleton className="w-32 h-32 rounded-full mb-4" />
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-5 w-32" />
              </div>
              
              <div className="p-8 w-full">
                <div className="mb-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5 mt-2" />
                </div>
                
                <div className="mb-6">
                  <Skeleton className="h-6 w-20 mb-2" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-8 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Skeleton className="h-6 w-28 mb-4" />
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="flex">
                        <Skeleton className="w-3 h-3 rounded-full flex-shrink-0 mt-1" />
                        <div className="ml-4 w-full">
                          <Skeleton className="h-5 w-64 mb-1" />
                          <Skeleton className="h-4 w-36 mb-1" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <Skeleton className="h-6 w-32" />
                </div>
              </div>
            </div>
          </div>
        ) : cv ? (
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-10">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{cv.name}</h3>
                <p className="text-slate-600 text-lg font-light">{cv.title}</p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-8 text-center tracking-wider">TECHNICAL SKILLS</h3>
                
                <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl shadow-lg p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {cv.skills.slice(0, 4).map((skillCategory, index) => (
                      <div key={index} className="space-y-4">
                        <h4 className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wide border-b border-slate-300 pb-2">
                          {skillCategory.category.replace(/and/gi, 'AND')}
                        </h4>
                        <ul className="space-y-3">
                          {skillCategory.items.slice(0, 8).map((skill, skillIndex) => (
                            <li key={skillIndex} className="flex items-start text-sm text-slate-700 leading-relaxed">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="font-medium">{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    {/* Add the 5th category if it exists, distributed across remaining space */}
                    {cv.skills.length > 4 && (
                      <div className="lg:col-span-4 mt-6 pt-6 border-t border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {cv.skills.slice(4).map((skillCategory, index) => (
                            <div key={index + 4} className="space-y-3">
                              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide border-b border-slate-300 pb-2">
                                {skillCategory.category.replace(/and/gi, 'AND')}
                              </h4>
                              <ul className="space-y-2">
                                {skillCategory.items.slice(0, 6).map((skill, skillIndex) => (
                                  <li key={skillIndex} className="flex items-start text-sm text-slate-700">
                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="font-medium">{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link 
                  href="/cv" 
                  className="inline-flex items-center text-primary-700 hover:text-primary-800 font-medium"
                >
                  {t('home.cvPreview.viewComplete')}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>{t('home.cvPreview.loadError')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CVPreview;
