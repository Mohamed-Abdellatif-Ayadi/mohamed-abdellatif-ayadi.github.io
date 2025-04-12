import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/languageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const Navbar = () => {
  const [location] = useLocation();
  const { t } = useLanguage();

  const navLinks = [
    { title: t('nav.cv'), path: "/cv" },
    { title: t('nav.posts'), path: "/blog" },
    { title: t('nav.projects'), path: "/projects" },
    { title: t('nav.contact'), path: "/contact" }
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-end gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`text-sm ${
              location === link.path ? "text-primary" : "text-slate-600 hover:text-primary"
            } transition-colors`}
          >
            {link.title}
          </Link>
        ))}
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
    </header>
  );
};

export default Navbar;