import { useLanguage } from "@/lib/languageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold">
          <span className="text-primary">Mohamed Abdellatif</span>
          <span className="text-slate-700"> Ayadi</span>
        </span>
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
      </div>
    </header>
  );
};

export default Navbar;