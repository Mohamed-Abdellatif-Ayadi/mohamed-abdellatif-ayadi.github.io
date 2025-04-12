import { Link } from "wouter";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Thoughts, Stories & Ideas</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Welcome to my personal blog where I share my expertise, experiences, and insights about 
            technology, design, and professional growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/blog" 
              className="px-6 py-3 bg-white text-primary-800 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Read Articles
            </Link>
            <Link 
              href="/cv" 
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-all"
            >
              View My CV
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
