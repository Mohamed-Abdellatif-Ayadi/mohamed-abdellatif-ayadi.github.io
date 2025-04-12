import { useQuery } from "@tanstack/react-query";
import { CV } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import ContactCTA from "@/components/home/ContactCTA";
import { Helmet } from "react-helmet";

const About = () => {
  const { data: cv, isLoading } = useQuery<CV>({
    queryKey: ["/api/cv"],
  });

  return (
    <>
      <Helmet>
        <title>About Me - John Doe</title>
        <meta name="description" content="Learn more about John Doe, a professional developer and writer. Read about my background and expertise." />
      </Helmet>
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
            <p className="text-lg opacity-90 mb-0">
              Get to know more about my journey, values, and what drives me.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="md:w-1/3 mb-8 md:mb-0">
                <Skeleton className="w-full h-96 rounded-xl" />
              </div>
              <div className="md:w-2/3">
                <Skeleton className="h-8 w-40 mb-6" />
                <div className="space-y-4 mb-8">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
                <Skeleton className="h-8 w-40 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/5" />
                </div>
              </div>
            </div>
          </div>
        ) : cv ? (
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="md:w-1/3 mb-8 md:mb-0">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={cv.photoUrl} 
                    alt={cv.name} 
                    className="w-full h-auto" 
                  />
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Connect with me</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-600 hover:text-primary-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                      </svg>
                    </a>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-600 hover:text-primary-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-600 hover:text-primary-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">My Story</h2>
                <div className="prose prose-slate max-w-none mb-8 article-content">
                  <p>
                    Hello! I'm {cv.name}, a passionate {cv.title} with {cv.experience[0].startDate} years of 
                    experience in building and designing digital products. My journey in the world of technology 
                    began when I was in college, tinkering with code and designing websites for friends.
                  </p>
                  <p>
                    I've had the privilege of working with diverse teams and clients across various industries, 
                    which has helped me develop a versatile skill set and a deep understanding of user-centered design. 
                    My approach combines technical expertise with creative problem-solving to deliver solutions that 
                    not only work flawlessly but also provide meaningful experiences for users.
                  </p>
                  <p>
                    When I'm not coding or designing, you'll find me writing articles for my blog, where I share insights, 
                    tutorials, and thoughts on technology, design, and professional growth. I believe in the power of 
                    knowledge sharing and continuous learning.
                  </p>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-6">My Values</h2>
                <div className="prose prose-slate max-w-none article-content">
                  <p>
                    I believe in creating technology that enhances human experiences rather than complicating them. 
                    My work is guided by these core values:
                  </p>
                  <ul>
                    <li>
                      <strong>Quality:</strong> I don't cut corners. Every line of code, every pixel, and every 
                      interaction matters.
                    </li>
                    <li>
                      <strong>Clarity:</strong> I value clear communication, both in my code and in my interactions 
                      with clients and team members.
                    </li>
                    <li>
                      <strong>Empathy:</strong> Understanding the needs and challenges of users is at the heart 
                      of everything I create.
                    </li>
                    <li>
                      <strong>Growth:</strong> I'm committed to continuous learning and expanding my horizons.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p>Failed to load data. Please try again later.</p>
          </div>
        )}
      </div>

      <ContactCTA />
    </>
  );
};

export default About;
