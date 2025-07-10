import React, { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type CartType = {
  [productId: number]: number;
};

type CartContextType = [CartType, Dispatch<SetStateAction<CartType>>];

const CartContext = createContext<CartContextType>([{}, () => {}]);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartType>({});

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);