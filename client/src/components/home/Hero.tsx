import { Link } from "wouter";
import { useLanguage } from "@/lib/languageContext";

const Hero = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white">
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Mohamed Abdellatif Ayadi</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            {t('hero.welcome')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/blog" 
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl"
            >
              {t('hero.articles')}
            </Link>
            <Link 
              href="/cv" 
              className="px-6 py-3 bg-transparent border-2 border-primary-400 text-primary-400 rounded-lg font-medium hover:bg-primary-400 hover:text-white transition-all"
            >
              {t('hero.cv')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
