import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/languageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { t } = useLanguage();
  
  const navLinks = [
    { title: t('nav.home'), path: "/" },
    { title: t('nav.cv'), path: "/cv" },
    { title: t('nav.articles'), path: "/blog" },
    { title: t('nav.projects'), path: "/projects" },
    { title: t('nav.contact'), path: "/contact" }
  ];

  return (
    <header className={`bg-white sticky top-0 z-50 ${scrolled ? "shadow-sm" : ""}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/ma-logo.svg" alt="Mohamed Ayadi Logo" className="h-10" />
          <span className="text-xl font-bold">
            <span className="text-primary">Mohamed Abdellatif</span>
            <span className="text-slate-700"> Ayadi</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link ${
                location === link.path ? "active text-primary" : "text-slate-600 hover:text-primary"
              } transition-colors`}
            >
              {link.title}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <a 
              href="https://linkedin.com/in/mohamed-abdellatif-ayadi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-primary transition-colors"
            >
              <span role="img" aria-label="LinkedIn">👔</span>
            </a>
            <a 
              href="https://github.com/ayadi1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-primary transition-colors"
            >
              <span role="img" aria-label="GitHub">💻</span>
            </a>
            <LanguageSwitcher />
          </div>
        </nav>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-slate-700 hover:text-primary"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-white ${isMenuOpen ? "" : "hidden"}`}>
        <div className="px-4 py-2 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block font-medium ${
                location === link.path
                  ? "text-primary"
                  : "text-slate-600 hover:bg-slate-50 hover:text-primary"
              } rounded px-3 py-2`}
              onClick={closeMenu}
            >
              {link.title}
            </Link>
          ))}
          <div className="px-3 py-2">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
