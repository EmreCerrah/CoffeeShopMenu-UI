import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLanguageConfigAll } from "@/app/config/LanguageConfig";
import { Logo } from "./Logo";
import { LanguageNavigation } from "./LanguageNavigation";

const WELCOME_TEXT_TR = "Hoş Geldiniz";
const WELCOME_TEXT_EN = "Welcome";

const LanguageSelection = () => {
  const langConfig = [...getLanguageConfigAll()];

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary p-4 md:p-8">
      <Card className="w-full max-w-[500px]">
        <CardHeader className="space-y-6 p-8">
          <Logo />
          <CardTitle
            className="text-center text-3xl font-bold"
            role="heading"
            aria-level={1}
          >
            {WELCOME_TEXT_TR}
            <br />
            {WELCOME_TEXT_EN}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <LanguageNavigation languages={langConfig} />
        </CardContent>
      </Card>
    </main>
  );
};

export default LanguageSelection;
