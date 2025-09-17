
import { useLanguage } from "@/lib/languageContext";
import { Helmet } from "react-helmet";
import HeroIntro from "@/components/home/HeroIntro";
import AboutMe from "@/components/home/AboutMe";
import CVPreview from "@/components/home/CVPreview";
import ProjectsSection from "@/components/home/ProjectsSection";
import PublicationsSection from "@/components/home/PublicationsSection";
import ContactSection from "@/components/home/ContactSection";
import Newsletter from "@/components/home/Newsletter";

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content={t('home.meta.keywords')} />
      </Helmet>
      
      {/* Hero Section with Photo */}
      <HeroIntro />
      
      {/* About Me Section */}
      <AboutMe />
      
      {/* CV Preview Section */}
      <section id="experience">
        <CVPreview />
      </section>
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Publications Section */}
      <PublicationsSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
};

export default Home;
