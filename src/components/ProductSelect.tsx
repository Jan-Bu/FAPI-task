import React from "react";
import type { Product } from "../types";

interface ProductSelectProps {
  products: Product[];
  selectedProductId: number;
  onChange: (productId: number) => void;
}

const ProductSelect: React.FC<ProductSelectProps> = ({ products, selectedProductId, onChange }) => (
  <select className="border px-3 py-2 w-full" value={selectedProductId} onChange={(e) => onChange(Number(e.target.value))}>
    {products.map((product) => (
      <option key={product.id} value={product.id}>
        {product.name} - {product.price} Kč
      </option>
    ))}
  </select>
);

export default ProductSelect;
