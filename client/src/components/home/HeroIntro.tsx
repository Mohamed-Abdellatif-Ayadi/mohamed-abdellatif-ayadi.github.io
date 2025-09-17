
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { CV } from "@shared/schema";
import { useLanguage } from "@/lib/languageContext";

const HeroIntro = () => {
  const { t, language } = useLanguage();
  const { data: cv } = useQuery<CV>({
    queryKey: ["/api/cv", language],
  });

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background overlay with pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Ccircle cx='49' cy='49' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
          
          {/* Left side - Photo */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
                <img 
                  src={cv?.photoUrl || "/images/avatar.png"}
                  alt={cv?.name || "Mohamed Abdellatif Ayadi"}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-300 rounded-full opacity-30 animate-pulse delay-300"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left">
            <div className="mb-6">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-white">{cv?.name || "Mohamed Abdellatif"}</span>
                <br />
                <span className="text-primary-400">Ayadi</span>
              </h1>
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="w-12 h-1 bg-primary-500 mr-4"></div>
                <p className="text-xl lg:text-2xl text-primary-200 font-medium">
                  {cv?.title || "Computer Science Student & Software Engineer"}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 space-y-4 text-slate-300">
              <p className="text-lg leading-relaxed">
                🏠 Motivated <span className="text-white font-semibold">Computer Science Student</span> with a passion for research and creative problem-solving for developing innovative software systems.
              </p>
              <p className="text-lg leading-relaxed">
                Pursuing <span className="text-primary-300 font-semibold">Bachelor's in Computer Science</span> at TU Dortmund University, specializing in Software Engineering, AI, and Data Systems.
              </p>
              <p className="text-lg leading-relaxed">
                Recent: Finished research on <span className="text-primary-300 font-semibold">Database automation</span> and working as student assistant in software development.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#experience"
                className="px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View Experience
              </a>
              <a 
                href="#projects"
                className="px-8 py-4 border-2 border-primary-400 text-primary-400 rounded-lg font-semibold hover:bg-primary-400 hover:text-white transition-all"
              >
                See Projects
              </a>
              <a 
                href="https://linkedin.com/in/mohamed-abdellatif-ayadi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white text-center">
            <p className="text-sm mb-2">Scroll to explore</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroIntro;
