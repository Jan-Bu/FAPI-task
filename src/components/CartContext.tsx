import React, { createContext, useContext, useState } from "react"

const CartContext = createContext([{}, () => { }])

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState({})

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)