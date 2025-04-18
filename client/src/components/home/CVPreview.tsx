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
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t('cv.summary')}</h3>
                  <p className="text-slate-600">{cv.summary}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t('cv.skills')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cv.skills.slice(0, 8).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t('cv.experience')}</h3>
                  <div className="space-y-4">
                    {cv.experience.slice(0, 2).map((exp, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-3 h-3 rounded-full bg-primary-700"></div>
                          {index < Math.min(cv.experience.length, 2) - 1 && (
                            <div className="w-0.5 h-full bg-slate-200 ml-1.5"></div>
                          )}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-base font-medium text-slate-900">
                            {exp.position} at {exp.company}
                          </h4>
                          <p className="text-sm text-slate-500">
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </p>
                          <p className="text-slate-600 mt-1">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
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
