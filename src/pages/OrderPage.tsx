import React from "react";
import OrderForm from "../components/OrderForm";

const OrderPage: React.FC = () => (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div>
      <h1 className="text-2xl font-bold mb-4">Objednávka produktu</h1>
      <OrderForm />
    </div>
  </div>
);

export default OrderPage;