import { useQuery } from "@tanstack/react-query";
import CVDisplay from "@/components/cv/CVDisplay";
import { CV } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const CVPage = () => {
  const { data: cv, isLoading } = useQuery<CV>({
    queryKey: ["/api/cv"],
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>CV - John Doe</title>
        <meta name="description" content="Professional CV and resume of John Doe. View my skills, experience, and qualifications." />
        <style type="text/css">
          {`
            @media print {
              header, footer, .print-btn, .cta-section {
                display: none !important;
              }
              body {
                padding: 0;
                background: white;
              }
              .cv-container {
                margin: 0;
                box-shadow: none;
              }
            }
          `}
        </style>
      </Helmet>
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">My Curriculum Vitae</h1>
            <p className="text-lg opacity-90 mb-6">
              A comprehensive overview of my professional background and skills.
            </p>
            <Button 
              onClick={handlePrint} 
              variant="secondary" 
              className="print-btn"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
                />
              </svg>
              Print CV
            </Button>
          </div>
        </div>
      </div>

      <div className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden cv-container">
              <div className="md:flex">
                <div className="md:flex-shrink-0 bg-primary-700 md:w-48 p-6">
                  <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-5 w-24 mx-auto" />
                </div>
                
                <div className="p-8 w-full">
                  <div className="mb-6">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-2" />
                  </div>
                  
                  <div className="mb-6">
                    <Skeleton className="h-6 w-20 mb-2" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[...Array(8)].map((_, i) => (
                        <Skeleton key={i} className="h-8 w-24 rounded-full" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <Skeleton className="h-6 w-28 mb-4" />
                    <div className="space-y-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex">
                          <Skeleton className="w-3 h-3 rounded-full mt-1.5" />
                          <div className="ml-4 w-full">
                            <Skeleton className="h-5 w-64 mb-1" />
                            <Skeleton className="h-4 w-40 mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Skeleton className="h-6 w-28 mb-4" />
                    <div className="space-y-6">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex">
                          <Skeleton className="w-3 h-3 rounded-full mt-1.5" />
                          <div className="ml-4 w-full">
                            <Skeleton className="h-5 w-56 mb-1" />
                            <Skeleton className="h-4 w-48 mb-1" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : cv ? (
            <div className="max-w-4xl mx-auto cv-container">
              <CVDisplay cv={cv} />
            </div>
          ) : (
            <div className="text-center">
              <p>Failed to load CV data. Please try again later.</p>
            </div>
          )}
        </div>
      </div>

      <section className="py-16 bg-primary-700 text-white cta-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-6">Interested in working together?</h2>
          <p className="max-w-xl mx-auto mb-8 opacity-90">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
          </p>
          <Button variant="secondary" asChild>
            <a href="mailto:john@example.com">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              Get In Touch
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default CVPage;
