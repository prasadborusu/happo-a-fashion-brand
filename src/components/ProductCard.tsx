import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "../lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
  images?: string[];
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => void;
  index: number;
}

const ProductCard = ({ product, onOrder, index }: ProductCardProps) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] ?? "ONE SIZE";
    addToCart(product, defaultSize);
    toast({
      title: "Added to cart!",
      description: `${product.name} (${defaultSize}) added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-accent">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Badge */}
        <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-medium tracking-[0.15em] uppercase px-3 py-1.5">
          {product.badge}
        </span>

        {/* Discount */}
        <span className="absolute top-4 right-4 bg-warm text-primary-foreground text-[10px] font-bold px-2 py-1">
          -{discount}%
        </span>

        {/* Add to Cart hover overlay */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 text-xs font-semibold tracking-[0.12em] uppercase hover:bg-warm hover:text-white transition-colors duration-200"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-warm text-warm" : "text-muted"}`}
            />
          ))}
          <span className="text-[11px] text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <h3 className="font-heading text-base font-medium text-foreground group-hover:text-warm transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
        <div className="flex items-center gap-3 pt-1">
          <span className="text-base font-semibold text-foreground">{formatPrice(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
