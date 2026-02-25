import { useState } from "react";

import type { Product } from "./ProductCard";

interface ProductDetailProps {
  product: Product & { images: string[]; sizes: string[] };
  onOrder: (product: Product, size: string) => void;
}

const ProductDetail = ({ product, onOrder }: ProductDetailProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col md:flex-row gap-16 items-center justify-center p-12 bg-background rounded-2xl shadow-2xl max-w-5xl w-full mx-auto">
      {/* Image showcase */}
      <div className="flex flex-col items-center">
        <img
          src={product.images?.[selectedImage] || product.image}
          alt={product.name}
          className="w-[400px] h-[400px] object-contain rounded-xl border mb-6 shadow-md"
        />
        <div className="flex gap-3">
          {(product.images || [product.image]).map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={product.name + " " + idx}
              className={`w-20 h-20 object-cover rounded border cursor-pointer transition-all duration-200 ${selectedImage === idx ? "ring-2 ring-primary scale-105" : "opacity-80"}`}
            onClick={() => setSelectedImage(idx)}
            />
          ))}
        </div>
      </div>
      {/* Product Info */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <div className="text-2xl font-semibold text-primary mb-3">₹{product.price}</div>
        <p className="mb-6 text-lg text-muted-foreground">{product.description}</p>
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <div className="font-medium mb-2 text-lg">Select Size</div>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-6 py-3 rounded-lg border text-lg font-semibold transition-all duration-150 ${selectedSize === size ? "bg-primary text-white scale-105" : "bg-background text-foreground hover:bg-accent"}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg mt-6 hover:bg-primary/90 transition"
          onClick={() => onOrder(product, selectedSize)}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
