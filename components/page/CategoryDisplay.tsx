import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Category, LocalizedText } from "@/models/Models";

interface CategoryDisplayProps {
  category: Category;
  subCategories: Category[];
  languageCode:  keyof LocalizedText;
}

export const CategoryDisplay = ({ category, subCategories, languageCode }: CategoryDisplayProps) => (
    <div key={category.id} className="mb-6">
      <h2 className="text-lg font-bold mb-2">{category.name[languageCode]}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subCategories
          .filter((subCategory) => category.id === subCategory.parentCatId)
          .map((subCategory) => (
            <Link
              key={subCategory.id}
              href={`/${languageCode}/${subCategory.id}/${encodeURIComponent(
                subCategory.name[languageCode]
              )}`}
              className="w-full"
            >
              <Button variant="outline" className="w-full justify-start">
                {subCategory.name[languageCode]}
              </Button>
            </Link>
          ))}
      </div>
    </div>
  );