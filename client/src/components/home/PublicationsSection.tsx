import { Link } from "wouter";
import { useLanguage } from "@/lib/languageContext";

const PublicationsSection = () => {
  const { language } = useLanguage();

  const publication = {
    title: "Design and Implementation of an Autonomous Mobile Robot for Slug Detection and Safe Collection to Prevent Agricultural Damage",
    journal: "International Journal of Mechanical Engineering and Robotics Research (IJMERR), Presented at IEEE ICMRE 2024, Milan, Italy.",
    date: "February 28, 2024",
    description: "This research presents a novel, eco-friendly robotic solution to address agricultural slug damage. The robot, developed using Robot Operating System (ROS) and integrated with YOLOv5, autonomously detects and collects slugs without harming them.",
    tags: ["ROS", "YOLOv5", "Python", "Navigation", "Object Detection"],
    pdfUrl: "/publications/slug-detection-robot.pdf"
  };

  return (
    <section id="publications" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('home.publications.title')}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('home.publications.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            {/* Featured Publication */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                  {publication.title}
                </h3>

                <div className="space-y-2 text-sm text-slate-600 mb-4">
                  <p><span className="font-medium">Journal:</span> <span className="italic">{publication.journal}</span></p>
                  <p><span className="font-medium">Date:</span> {publication.date}</p>
                </div>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  {publication.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {publication.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a 
                    href={publication.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Read Publication
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/publications" 
              className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all"
            >
              View All Publications
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;