import { useLocation } from "react-router-dom";
import { PRODUCTS } from "./OrderForm";
import { calculatePriceWithVAT, formatPrice, convertCZKtoEUR  } from "../utils";
import { useEffect, useState } from "react";


interface OrderState {
  cart: Record<number, number>;
  name: string;
  email: string;
  phone: string;
}

const ThankYou = () => {
  const { state } = useLocation() as { state: OrderState };
  const cart = state.cart;

  const totalCZK = Object.entries(cart).reduce(
    (sum, [id, quantity]) => sum + PRODUCTS.find(p => p.id === Number(id))!.price * quantity,
    0
  );
  const totalWithVAT = calculatePriceWithVAT(totalCZK);
  const [priceEUR, setPriceEUR] = useState<number | null>(null);

  useEffect(() => {
  convertCZKtoEUR(totalWithVAT).then(setPriceEUR);
}, [totalWithVAT]);



  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Děkujeme, {state.name}!</h2>
      <p><strong>Rekapitulace:</strong></p>
      <ul>
        {Object.entries(cart).map(([id, quantity]) => {
          const product = PRODUCTS.find(p => p.id === Number(id))!;
          return (
            <li key={id}>
              {product.name} – {quantity}× {formatPrice(product.price)}
            </li>
          );
        })}
      </ul>
      <p><strong>Celkem (vč. DPH):</strong> {formatPrice(totalWithVAT)}</p>
      {priceEUR ? (
        <p><strong>Cena v EUR:</strong> {priceEUR.toFixed(2)} €</p>
      ) : (
        <p>Načítám kurz EUR...</p>
      )}
    </div>
  );
};

export default ThankYou;
