"use client";
import React, { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category, Product, ProductTierDTO } from "@/models/Models";
import { DragEndEvent } from "@dnd-kit/core";
import MenuService from "@/services/MenuService";
import SortableProductItem from "@/components/admin/SortableProductItem";

const CategoryProductManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await MenuService.getAllSubCategories();
        const productsData = await MenuService.getAllProducts();
        setCategories(categoriesData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("fetching error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // for drag and drop
    const activeProduct = products.find(p => p.id === active.id);
    const overProduct = products.find(p => p.id === over.id);
    if (!activeProduct || !overProduct) return;
    if (activeProduct.categoriesId !== overProduct.categoriesId) return;

    const categoryProducts = products
      .filter(p => p.categoriesId === activeProduct.categoriesId)
      .sort((a, b) => a.tier - b.tier);

    const oldIndex = categoryProducts.findIndex(p => p.id === active.id);
    const newIndex = categoryProducts.findIndex(p => p.id === over.id);
    // make new ordered array
    const reorderedProducts = arrayMove(categoryProducts, oldIndex, newIndex);
    // Update tier data
    const updates: ProductTierDTO[] = reorderedProducts.map((product, index) => ({
      id: product.id,
      tier: index
    }));

    try {
      await MenuService.updateTears(updates);
      setProducts(prevProducts => {
        const newProducts = [...prevProducts];
        reorderedProducts.forEach((product, index) => {
          const productIndex = newProducts.findIndex(p => p.id === product.id);
          if (productIndex !== -1) {
            newProducts[productIndex] = { ...product, tier: index };
          }
        });
        return newProducts;
      });
    } catch (error) {
      console.error("Reordered Products :", error);
    }
};

  if (loading) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Ürün Yönetimi</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {categories.map((category) => {
          const categoryProducts = products
            .filter((product) => product.categoriesId === category.id)
            .sort((a, b) => a.tier - b.tier);

          return (
            <Card key={category.id} className="mb-6">
              <CardHeader>
                <CardTitle>{category.name.tr}</CardTitle>
              </CardHeader>
              <CardContent>
                <SortableContext
                  items={categoryProducts.map((p) => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {categoryProducts.map((product) => (
                    <SortableProductItem key={product.id} product={product} />
                  ))}
                </SortableContext>
              </CardContent>
            </Card>
          );
        })}
      </DndContext>
    </div>
  );
};

export default CategoryProductManagement;
