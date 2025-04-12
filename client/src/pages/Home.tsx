import Hero from "@/components/home/Hero";
import LatestArticles from "@/components/home/LatestArticles";
import CVPreview from "@/components/home/CVPreview";
import AboutMe from "@/components/home/AboutMe";
import ContactCTA from "@/components/home/ContactCTA";
import Newsletter from "@/components/home/Newsletter";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Mohamed Abdellatif Ayadi - Portfolio & Lebenslauf</title>
        <meta name="description" content="Persönliches Portfolio und Lebenslauf von Mohamed Abdellatif Ayadi. Informatik-Student an der TU Dortmund mit Erfahrung in Programmierung und Datenanalyse." />
        <meta name="keywords" content="blog, cv, resume, articles, professional, portfolio" />
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
