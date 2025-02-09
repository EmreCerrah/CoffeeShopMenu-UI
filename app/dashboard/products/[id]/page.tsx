"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MenuService from "@/services/MenuService";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Product, Category } from "@/models/Models";
import { useRouter } from "next/navigation";

export default function EditProductForm({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const productId = params.id;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        console.log(">>>" + productId);
        const [subCategories, product] = await Promise.all([
          MenuService.getAllSubCategories(),
          MenuService.getProductById(productId),
        ]);
        setCategories(subCategories);
        setProduct(product);
        if (product?.categoriesId) {
          setValue("categoriesId", product.categoriesId, { shouldValidate: true });
        }
      } catch (error) {
        console.error("Veri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndCategories();
  }, [productId, setValue]);

  const onSubmit = async (data: Product) => {
    if (!data.categoriesId) {
      alert("Kategori seçimi gerekli!");
      return;
    }
    try {
      data.id = productId;
      data.tier=product?.tier || 99;
      await MenuService.updateProductById(data.id,data);
      console.log("Ürün başarıyla güncellendi (Tear Backend de set edilir):", data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Ürün güncellenirken hata oluştu:", error);
    }
  };
  const onDelete = async () => {
    const isConfirmed = window.confirm("Bu ürünü silmek istediğinizden emin misiniz?");
  
    if (!isConfirmed) {
    console.log("Silme işlemi iptal edildi.");
    return;
    }
    try {
      await MenuService.deleteProductById(productId);
      console.log("Ürün başarıyla Silindi");
      router.push("/dashboard");
    } catch (error) {
      console.error("Ürün Silinirken hata oluştu:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderFields = (field: "name" | "detail") => {
    const lang: Record<"tr" | "en", string> = {
      tr: "Türkçe",
      en: "İngilizce",
    };

    return Object.entries(lang).map(([key, label]) => (
      <div key={key} className="space-y-2">
        <Label htmlFor={`${field}-${key}`}>
          Ürün {field === "name" ? "Adı" : "Detay"} {label}
        </Label>
        <Input
          id={`${field}-${key}`}
          {...register(
            `${field}.${key}` as
              | "name.tr"
              | "name.en"
              | "detail.tr"
              | "detail.en",
            {
              required: field === "name" ? `${label} adı gerekli` : undefined, // Detaylar opsiyonel olabilir
            }
          )}
          placeholder={
            field === "name"
              ? `Ürünün ${label.toLowerCase()} adını giriniz`
              : `Ürün ${label.toLowerCase()} detayını giriniz`
          }
          defaultValue={product?.[field]?.[key as "tr" | "en"]}
        />
        {errors.name?.[key as "tr" | "en"] && (
          <span className="text-red-500 text-sm">
            {errors.name[key as "tr" | "en"]?.message}
          </span>
        )}
      </div>
    ));
  };

  return (
    <Card className="p-6 bg-slate-50">
      <h2 className="text-2xl font-bold mb-6">Ürün Ekle Düzenle</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Ürün Adı */}
        {renderFields("name")}

        {/* Kategori */}
        <div>
          <Label htmlFor="category">Kategori</Label>
          <Select
            defaultValue={product?.categoriesId || ""}
            onValueChange={(value) =>
              setValue("categoriesId", value, { shouldValidate: true })
            }
          >
            <SelectTrigger className="border-black">
              <SelectValue placeholder="Kategori seçiniz" />
            </SelectTrigger>
            <SelectContent className="p-6 bg-slate-50">
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                  className="hover:border hover:border-blue-500 hover:rounded-md"
                >
                  {category.name.tr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoriesId && (
            <span className="text-red-500 text-sm">
              {errors.categoriesId.message}
            </span>
          )}
        </div>

        {/* Fiyat */}
        <div>
          <Label htmlFor="price">Fiyat</Label>
          <Input
            id="price"
            type="number"
            {...register("price", { required: "Fiyat gerekli" })}
            placeholder="Fiyatı giriniz"
            defaultValue={product?.price}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        {/* Detay */}
        {renderFields("detail")}

        {/* Gönder Butonu */}
        <Button
          type="submit"
          className="w-full hover:bg-background(#A88164ff) "
        >
          Ürünü Kaydet
        </Button>
        <Button
          type="button"
          onClick={onDelete}
          className="w-full hover:bg-background(#A88164ff) "
        >
          Ürünü Sil
        </Button>
      </form>
    </Card>
  );
}
