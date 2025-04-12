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
        <title>John Doe - Personal Blog & CV</title>
        <meta name="description" content="Personal blog and professional portfolio of John Doe. Read articles and view CV." />
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
