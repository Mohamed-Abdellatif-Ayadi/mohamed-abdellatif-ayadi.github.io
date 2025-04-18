import Hero from "@/components/home/Hero";
import LatestArticles from "@/components/home/LatestArticles";
import CVPreview from "@/components/home/CVPreview";
import AboutMe from "@/components/home/AboutMe";
import ContactCTA from "@/components/home/ContactCTA";
import Newsletter from "@/components/home/Newsletter";
import { useLanguage } from "@/lib/languageContext";
import { Helmet } from "react-helmet";

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content={t('home.meta.keywords')} />
      </Helmet>
      <Hero />
      <LatestArticles />
      <CVPreview />
      <AboutMe />
      <ContactCTA />
      <Newsletter />
    </>
  );
};

export default Home;
