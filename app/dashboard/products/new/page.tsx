 "use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const ProductForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const subCategories = await MenuService.getAllSubCategories();
        setCategories(subCategories);
      } catch (error) {
        console.error("Kategori verileri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: Product) => {
    if (!data.categoriesId) {
      alert("Kategori seçimi gerekli!");
      return;
    }
    try {
      await MenuService.addProduct(data);
      console.log("Ürün başarıyla eklendi:", data);
    } catch (error) {
      console.error("Ürün eklenirken hata oluştu:", error);
    }
  };

  const renderNameFields = () => {
    const fields: Record<'tr' | 'en', string> = {
        tr: 'Türkçe',
        en: 'İngilizce'
    };

    return Object.entries(fields).map(([key, label]) => (
      <div key={key} className="space-y-2">
        <Label htmlFor={`name-${key}`}>Ürün Adı {label}</Label>
        <Input
          id={`name-${key}`}
          {...register(`name.${key}` as 'name.tr' | 'name.en', { 
            required: `Ürün adı ${label.toLowerCase()} gerekli` 
          })}
          placeholder={`Ürünün ${label.toLowerCase()} adını giriniz`}
        />
        {errors.name?.[key as 'tr' | 'en'] && (
          <span className="text-red-500 text-sm">
            {errors.name[key as 'tr' | 'en']?.message}
          </span>
        )}
      </div>
    ));
};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="p-6 bg-slate-50">
      <h2 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Ürün Adı */}
        {renderNameFields()}

        {/* Kategori */}
        <div > 
          <Label htmlFor="category">Kategori</Label>
          <Select  
            onValueChange={(value) =>
              setValue("categoriesId", value, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçiniz" />
            </SelectTrigger>
            <SelectContent className="p-6 bg-slate-50">
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}  className="hover:border hover:border-blue-500 hover:rounded-md">
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
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        {/* Detay */}
        <div>
          <Label htmlFor="details">Detay Türkçe(Opsiyonel)</Label>
          <Textarea
            id="details"
            {...register("detail.tr")}
            placeholder="Ürün detaylarını giriniz"
          />
          <Label htmlFor="details">Detay İngilizce(Opsiyonel)</Label>
             <Textarea
            id="details"
            {...register("detail.en")}
            placeholder="Ürün ingilizce detaylarını giriniz"
          />
        </div>

        {/* Gönder Butonu */}
        <Button type="submit" className="w-full hover:bg-background(#A88164ff) " >
          Ürünü Kaydet
        </Button>
      </form>
    </Card>
  );
};

export default ProductForm;
