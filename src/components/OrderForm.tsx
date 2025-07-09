import React from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import ProductCard from "./ProductCard";
import type { Product } from "../types";
import { formatPrice } from "../utils";
import { useCartContext } from "./CartContext";
import { useUserContext } from "./UserContext";

export const PRODUCTS: Product[] = [
  { id: 1, name: "Produkt A", image: "/assets/reklamni.webp", price: 1000 },
  { id: 2, name: "Produkt B", image: "/assets/samolepky.webp", price: 500 },
];

const OrderForm: React.FC = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useCartContext();
  type User = {
    name?: string;
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  const [user, setUser] = useUserContext() as [User, React.Dispatch<React.SetStateAction<User>>];
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

  const addToCart = (productId: number) => {
    setCart({...cart, [productId]: (cart[productId] || 0) + 1 });
  };

  const totalPrice = Object.entries(cart).reduce(
    (sum, [id, quantity]) => sum + PRODUCTS.find(p => p.id === Number(id))!.price * quantity,
    0
  );

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!user.name) newErrors.name = "Vyplňte jméno.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email || "")) newErrors.email = "Neplatný e-mail.";
    if (!/^\+?\d{7,14}$/.test(user.phone || "")) newErrors.phone = "Neplatné telefonní číslo.";
    if (totalPrice === 0) newErrors.cart = "Košík je prázdný.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    navigate("/thank-you", { state: { cart, ...user } });
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center">
      <div className="flex gap-6 mb-8 justify-center">
        {PRODUCTS.map(product => (
          <div key={product.id} className="text-center">
            <ProductCard product={product} />
            <button
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
              onClick={() => addToCart(product.id)}
            >
              Přidat do košíku
            </button>
          </div>
        ))}
      </div>

      <form className="p-4 bg-white shadow rounded w-full max-w-md" onSubmit={handleSubmit}>
        <InputField
          label="Jméno"
          type="text"
          value={user.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}

        <InputField
          label="Email"
          type="email"
          value={user.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}

        <InputField
          label="Telefon"
          type="tel"
          value={user.phone || ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          required
        />
        {errors.phone && <div className="text-red-500">{errors.phone}</div>}

        <div className="mt-4 text-center">
          <strong>Obsah košíku:</strong>
          {errors.cart && <div className="text-red-500">{errors.cart}</div>}
          <ul>
            {Object.entries(cart).map(([id, quantity]) => {
              const product = PRODUCTS.find(p => p.id === Number(id))!;
              return (
                <li key={id}>
                  {product.name} – {quantity}× {formatPrice(product.price)} = {formatPrice(product.price * quantity)}
                </li>
              );
            })}
          </ul>
          <strong>Celkem: {formatPrice(totalPrice)}</strong>
        </div>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded w-full">Objednat</button>
      </form>
    </div>
  );
};

export default OrderForm;
