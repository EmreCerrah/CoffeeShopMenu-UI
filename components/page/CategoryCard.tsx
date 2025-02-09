import { Category } from "@/models/Models";
import { CategoryDisplay } from "./CategoryDisplay";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { LanguageConfig } from "@/app/config/LanguageConfig";

interface CategoryCardProps {
  loading: boolean;
  subCategories: Category[];
  categories: Category[];
  langConfig: LanguageConfig;
  error: string | null;
}
const CategoryCard = ({
  loading,
  subCategories,
  langConfig,
  categories,
  error,
}: CategoryCardProps) => {
  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">
            {langConfig.title || "Title"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSkeleton />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">
            {langConfig.title || "Title"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          {langConfig.title || "Title"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {categories.map((category) => (
          <CategoryDisplay
            key={category.id}
            category={category}
            subCategories={subCategories}
            languageCode={langConfig.code}
          />
        ))}
      </CardContent>
    </Card>
  );
};
export default CategoryCard;
