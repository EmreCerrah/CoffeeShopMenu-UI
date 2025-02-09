import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageConfig } from "@/lib/language";


interface LanguageButtonProps {
  lang: LanguageConfig;
}

export const LanguageButton = ({ lang }: LanguageButtonProps) => {
  return ( <div
   
  >
    <Link 
      href={lang.href}
      className="w-full block"
      aria-label={`Select ${lang.label}`}
    >
      <Button 
        className="w-full text-lg py-6" // text boyutu ve padding artırıldı
        variant="default"
      >
        {lang.label}
      </Button>
    </Link>
  </div>
  );
};