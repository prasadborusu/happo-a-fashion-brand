// This file exports the products array with multiple images and sizes for each product.
import type { Product } from "@/components/ProductCard";

export interface ProductDetailType extends Product {
  images: string[];
  sizes: string[];
}

const products: ProductDetailType[] = [
  {
    id: 1,
    name: "BERLIN",
    description: "Description for Product 1.",
    price: 999,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 100,
    badge: "New",
    image: "/products/product1/product1.jpeg",
    images: [
      "/products/product1/product1.jpeg",
      "/products/product1/product1(2).jpeg"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description for Product 2.",
    price: 999,
    originalPrice: 1299,
    rating: 4.2,
    reviews: 80,
    badge: "Popular",
    image: "/products/product2/product2.jpeg",
    images: [
      "/products/product2/product2.jpeg",
      "/products/product2/product2(2).jpeg"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description for Product 3.",
    price: 999,
    originalPrice: 1299,
    rating: 4.0,
    reviews: 60,
    badge: "Trending",
    image: "/products/product3/product3.jpeg",
    images: [
      "/products/product3/product3.jpeg",
      "/products/product3/product3(2).jpeg"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description for Product 4.",
    price: 999,
    originalPrice: 1299,
    rating: 4.3,
    reviews: 50,
    badge: "Best Seller",
    image: "/products/product4/product4.jpeg",
    images: [
      "/products/product4/product4.jpeg",
      "/products/product4/product4(2).jpeg"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description for Product 5.",
    price: 999,
    originalPrice: 1299,
    rating: 4.1,
    reviews: 40,
    badge: "Limited",
    image: "/products/product5/product5.jpeg",
    images: [
      "/products/product5/product5.jpeg",
      "/products/product5/product5(2).jpeg"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Product 6",
    description: "Description for Product 6.",
    price: 999,
    originalPrice: 1299,
    rating: 4.0,
    reviews: 30,
    badge: "Trending",
    image: "/products/product6/product6.jpeg",
    images: [
      "/products/product6/product6.jpeg",
      "/products/product6/product6(2).jpeg"
    ],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Product 7",
    description: "Description for Product 7.",
    price: 999,
    originalPrice: 1299,
    rating: 4.4,
    reviews: 25,
    badge: "New Arrival",
    image: "/products/product7/product7.jpeg",
    images: [
      "/products/product7/product7.jpeg",
      "/products/product7/product7(2).jpeg"
    ],
    sizes: ["S", "M", "L", "XL"]
  }
];

export default products;
