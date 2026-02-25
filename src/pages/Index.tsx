import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import SuccessOverlay from "@/components/SuccessOverlay";
import type { Product } from "@/components/ProductCard";

const Index = () => {
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <MarqueeBanner />
      <FeaturesSection />
      <ProductsSection onOrder={setOrderProduct} />
      <TestimonialsSection />
      <Footer />

      {orderProduct && (
        <OrderModal
          product={orderProduct}
          onClose={() => setOrderProduct(null)}
          onSuccess={() => { setOrderProduct(null); setShowSuccess(true); }}
        />
      )}

      {showSuccess && (
        <SuccessOverlay onClose={() => { setShowSuccess(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
      )}
    </div>
  );
};

export default Index;
