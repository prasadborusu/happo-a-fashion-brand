import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProductCard, { type Product } from "./ProductCard";
import products from "@/data/products";
import { useNavigate } from "react-router-dom";

interface ProductsSectionProps {
  onOrder: (product: Product) => void;
}

const ProductsSection = ({ onOrder }: ProductsSectionProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  return (
    <section id="products" className="py-28 bg-warm-light" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Curated Selection
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-medium text-foreground">
            The <span className="italic text-warm">Collection</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((p, i) => (
            <div key={p.id} onClick={() => navigate(`/product/${p.id}`)} className="cursor-pointer">
              <ProductCard product={p} onOrder={onOrder} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
