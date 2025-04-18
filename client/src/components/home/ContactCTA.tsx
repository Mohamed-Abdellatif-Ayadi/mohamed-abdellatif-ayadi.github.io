import { Link } from "wouter";
import { useLanguage } from "@/lib/languageContext";

const ContactCTA = () => {
  const { t } = useLanguage();
  return (
    <section className="py-16 bg-primary-700">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">{t('home.contactCTA.title')}</h2>
        <p className="max-w-xl mx-auto mb-8 opacity-90">
          {t('home.contactCTA.subtitle')}
        </p>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-800 font-medium rounded-lg hover:bg-opacity-95 transition-colors shadow-lg"
        >
          {t('home.contactCTA.button')}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
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
        </Link>
      </div>
    </section>
  );
};

export default ContactCTA;
