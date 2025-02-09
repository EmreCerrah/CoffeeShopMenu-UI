"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DynamicBreadcrumb from "@/components/page/DynamicBreadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getLanguageConfig,
  SupportedLanguages,
} from "@/app/config/LanguageConfig";
import { Product } from "@/models/Models";
import MenuService from "@/services/MenuService";
import { LoadingSkeleton } from "@/components/page/LoadingSkeleton";

export default function ProductsPage({
  params,
}: {
  params: {
    categoryId: string;
    categoryName: string;
    lang: SupportedLanguages;
  };
}) {
  const pathSegments = [params.lang, params.categoryId,params.categoryName,];
  const langConfig = getLanguageConfig(params.lang);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const productsData = await MenuService.getProductsByCatId(
          params.categoryId
        );
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, [params.categoryId]);

  if (!langConfig) {
    return <div>{`Invalid language parameter: ${params.lang}`}</div>;
  }

if(loading) {
    return <LoadingSkeleton/>;
}

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4">
          <DynamicBreadcrumb pathSegments={pathSegments} />
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8">
        <Card key={params.categoryId} className="w-full">
          <CardHeader className="text-base">
            <CardTitle className="text-center">
              {decodeURIComponent(params.categoryName)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="table-auto w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>{langConfig.productLabel}</TableHead>
                  <TableHead className="text-right">
                    {langConfig.priceLabel}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-secondary">
                {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <h4 className="text-base font-semibold">{product.name[langConfig.code]}</h4>
                          {product.detail !== null && <p className="text- text-muted-foreground">{product.detail[langConfig.code]}</p>}
                        </TableCell>
                        <TableCell className="text-right min-w-[150px]">
                          {product.price} ₺
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t">
        <div className="container mx-auto py-4 text-center">
          <Link href={`/${params.lang}`}>
            <Button variant="link">{langConfig.backToMenu}</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
