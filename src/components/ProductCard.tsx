import React from "react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="border p-4 flex flex-col items-center justify-center">
    <img
      src={product.image}
      alt={product.name}
      className="mb-2 object-cover"
      style={{ width: '150px', height: '150px' }} 
    />
    <h2 className="font-bold">{product.name}</h2>
    <p>{product.price} Kč</p>
  </div>
);

export default ProductCard;
