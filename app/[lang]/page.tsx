"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DynamicBreadcrumb from "@/components/page/DynamicBreadcrumb";
import { SupportedLanguages, getLanguageConfig } from "@/app/config/LanguageConfig";
import { Category } from "@/models/Models";
import MenuService from "@/services/MenuService";
import CategoryCard from "@/components/page/CategoryCard";

interface MenuPageProps {
  params: {
    lang: SupportedLanguages;
  };
}

const InvalidLanguage = ({ lang }: { lang: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <p>{`Invalid language parameter: ${lang}`}</p>
  </div>
);

const MenuPage = ({ params }: MenuPageProps) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const langConfig = getLanguageConfig(params.lang);
  const pathSegments = [params.lang];

  //  Sort categories
  function sortCategories(a: Category, b: Category, priorityOrder: string[]): number {
    const indexA = priorityOrder.indexOf(a.name.tr);
    const indexB = priorityOrder.indexOf(b.name.tr);

    if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB; 
    } else if (indexA !== -1) {
        return -1; 
    } else if (indexB !== -1) {
        return 1;
    } else {
        return a.name.tr.localeCompare(b.name.tr);
    }
}

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const [categoriesData, subCategoriesData] = await Promise.all([
          MenuService.getAllParentCategories(),
          MenuService.getAllSubCategories(),
        ]);
        let priorityOrder = ["İçecekler","Tatlılar", "Sandviçler" ];
        const sortedCategories = categoriesData.toSorted((a, b) => sortCategories(a, b, priorityOrder));
        priorityOrder = ["La Bianco Özel", "Espresso Bazlı","Demlemeler","Çaylar","Sıcak İçecekler","Soğuk İçecekler","Soğuk Kahveler","Frappe ve Milkshake","Frozen ve Smoothie","Ekstra"];
        const sortedSubCategoriesData = subCategoriesData.toSorted((a, b) => sortCategories(a, b, priorityOrder));
        
        setCategories(sortedCategories);
        setSubCategories(sortedSubCategoriesData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching menu data';
        setError(errorMessage);
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchMenuData();
  }, []);

  if (!langConfig) {
    return <InvalidLanguage lang={params.lang} />;
  }
  

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 space-x-5">
          <DynamicBreadcrumb pathSegments={pathSegments} />
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8">
        <CategoryCard error={error} categories={categories} loading={loading} subCategories={subCategories} langConfig={langConfig}/>
      </main>

      <footer className="border-t">
        <div className="container mx-auto py-4 text-center">
          <Link href="/">
            <Button variant="link">{langConfig.backToMain || "Back"}</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default MenuPage;