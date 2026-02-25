import ProductDetail from "@/components/ProductDetail";
import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import productsData from "@/data/products";
import OrderModal from "@/components/OrderModal";
import SuccessOverlay from "@/components/SuccessOverlay";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = useMemo(() => productsData.find(p => p.id === Number(id)), [id]);
  const [orderProduct, setOrderProduct] = useState<any | null>(null);
  const [orderSize, setOrderSize] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <button className="text-primary underline" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const handleOrder = (product: any, size: string) => {
    setOrderProduct(product);
    setOrderSize(size);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted py-12">
      <ProductDetail product={product} onOrder={handleOrder} />
      {orderProduct && (
        <OrderModal
          product={{ ...orderProduct, size: orderSize }}
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

export default ProductDetailPage;
