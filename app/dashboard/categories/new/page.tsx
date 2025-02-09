"use client"
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Category } from "@/models/Models";
import MenuService from "@/services/MenuService";

const CategoryForm = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<Category>();
  const [parentCategories, setParentCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const parentCategories = await MenuService.getAllParentCategories();
        setParentCategories(parentCategories);
      } catch (error) {
        console.error("Kategori verileri alınamadı:", error);
      } finally {
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: Category) => {
    try {
      if (!data.parentCatId || data.parentCatId === "") {
        data.parentCatId = null;
      }
      await MenuService.addCategory(data);
      reset(); // Formu sıfırla
    } catch (error) {
      console.error("Kategori eklenirken hata oluştu:", error);
    }
  };


  return (
    <Card  className="p-6 bg-slate-50">
      <CardHeader>
        <CardTitle>Yeni Kategori Ekle</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Kategori Adı Türkçe */}
          <div className="space-y-2">
            <Label htmlFor="nameTr">Kategori Adı Türkçe</Label>
            <Input
              id="nameTr"
              {...register("name.tr", { required: "Kategori adı Türkçe gerekli" })}
              placeholder="Kategori Türkçe adını giriniz"
            />
            {errors.name?.tr && (
              <span className="text-red-500 text-sm">{errors.name.tr.message}</span>
            )}
          </div>

          {/* Kategori Adı İngilizce */}
          <div className="space-y-2">
            <Label htmlFor="nameEn">Kategori Adı İngilizce</Label>
            <Input
              id="nameEn"
              {...register("name.en", { required: "Kategori adı İngilizce gerekli" })}
              placeholder="Kategori İngilizce adını giriniz"
            />
            {errors.name?.en && (
              <span className="text-red-500 text-sm">{errors.name.en.message}</span>
            )}
          </div>

          {/* Üst Kategori Seçimi */}
          <div className="space-y-2 border border-black rounded-lg p-4">
            <Label htmlFor="category">Üst Kategori (Opsiyonel)</Label>
            <Select 
              onValueChange={(value) =>
                setValue("parentCatId", value , { shouldValidate: true })
              }
            >
              <SelectTrigger className="border border-black rounded-lg p-2 focus:ring-2 focus:ring-primary" >
                <SelectValue placeholder="Üst kategori seçiniz (Opsiyonel)" />
              </SelectTrigger>
              <SelectContent className="p-6 bg-slate-50 ">
                <SelectItem value="none">Hiçbiri (Üst kategori olacak)</SelectItem>
                {parentCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name.tr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.parentCatId && (
              <span className="text-red-500 text-sm">
                {errors.parentCatId.message}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            type="submit" 
            className="w-full hover:bg-background(#A88164ff)"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Kaydediliyor...' : 'Kategori Kaydet'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CategoryForm;