import { LanguageConfig } from "@/lib/language";
import { LanguageButton } from "./LanguageButton";



interface LanguageNavigationProps {
  languages: LanguageConfig[];
}

export const LanguageNavigation = ({ languages }: LanguageNavigationProps) => {
  return (
    <nav className="flex flex-col space-y-4">
      {languages.map((lang) => (
        <LanguageButton 
          key={lang.code} 
          lang={lang} 
        />
      ))}
    </nav>
  );
};