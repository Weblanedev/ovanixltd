import { Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Homepage from "./homepage";
import Footer from "./footer";
import Contact from "./contact";
import PrivacyPage from "./pages/PrivacyPage";
import RefundReturnPage from "./pages/RefundReturnPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Toast } from "./components/Toast";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/refund-return-policy" element={<RefundReturnPage />} />
      </Routes>
      <Footer />
      <Toast />
    </>
  );
}

export default App;
