import { Outlet } from "react-router-dom";

import Topbar from "../components/layout/Topbar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import CartDrawer from "../components/cart/CartDrawer";
import AuthModal from "../components/auth/AuthModal";

function MainLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <Topbar />
        <Navbar />

        <main className="min-h-screen bg-gray-50">
          <Outlet />
        </main>

        <Footer />

        <WhatsAppButton />
        <ScrollToTopButton />
        <CartDrawer />
        <AuthModal />
      </CartProvider>
    </AuthProvider>
  );
}

export default MainLayout;