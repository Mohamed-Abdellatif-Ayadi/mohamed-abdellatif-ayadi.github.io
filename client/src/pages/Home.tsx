
import { useLanguage } from "@/lib/languageContext";
import { Helmet } from "react-helmet";
import HeroIntro from "@/components/home/HeroIntro";
import CVPreview from "@/components/home/CVPreview";
import ExperienceSection from "@/components/home/ExperienceSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import PublicationsSection from "@/components/home/PublicationsSection";
import ChatSection from "@/components/home/ChatSection";
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
      
      {/* CV Preview Section */}
      <section id="experience">
        <CVPreview />
      </section>
      
      {/* Experience Timeline Section */}
      <ExperienceSection />
      
      {/* Projects Section */}
      <section id="projects">
        <ProjectsSection />
      </section>
      
      {/* Publications Section */}
      <PublicationsSection />
      
      {/* Chat Section */}
      <ChatSection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
};

export default Home;
