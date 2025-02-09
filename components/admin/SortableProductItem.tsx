"use client";
import { Product } from "@/models/Models";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProductItemProps {
  product: Product;
}

const SortableProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center justify-between p-3 bg-white border rounded shadow-sm mb-2 cursor-move"
    >
      <span>{product.name.tr}</span>
      <Link href={`/dashboard/products/${product.id}`} passHref>
          <Pencil className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default SortableProductItem;
