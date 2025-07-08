import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrderPage from "./pages/OrderPage";
import ThankYouPage from "./pages/ThankYouPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<OrderPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;