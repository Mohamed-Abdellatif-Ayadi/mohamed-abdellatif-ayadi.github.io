import { useLanguage, Language } from "@/lib/languageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];
  
  console.log("Current language in switcher:", language);

  const handleLanguageChange = (newLang: Language) => {
    console.log("Switching to language:", newLang);
    
    // Set language in localStorage directly to ensure it persists through reload
    localStorage.setItem('language', newLang);
    
    // Set language in context
    setLanguage(newLang);
    
    // Force a full page reload to apply changes everywhere including API calls
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="sr-only md:not-sr-only">{currentLanguage.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center gap-2 ${
              language === lang.code ? "bg-primary/10" : ""
            }`}
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}