import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Product } from "@/components/ProductCard";

export interface CartItem {
    product: Product;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, size: string) => void;
    removeFromCart: (productId: number, size: string) => void;
    updateQty: (productId: number, size: string, qty: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_KEY = "happo_cart";

function loadCart(): CartItem[] {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(loadCart);

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
    }, [items]);

    const addToCart = useCallback((product: Product, size: string) => {
        setItems((prev) => {
            const existing = prev.find(
                (i) => i.product.id === product.id && i.size === size
            );
            if (existing) {
                return prev.map((i) =>
                    i.product.id === product.id && i.size === size
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { product, size, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((productId: number, size: string) => {
        setItems((prev) =>
            prev.filter((i) => !(i.product.id === productId && i.size === size))
        );
    }, []);

    const updateQty = useCallback(
        (productId: number, size: string, qty: number) => {
            if (qty <= 0) {
                removeFromCart(productId, size);
                return;
            }
            setItems((prev) =>
                prev.map((i) =>
                    i.product.id === productId && i.size === size
                        ? { ...i, quantity: qty }
                        : i
                )
            );
        },
        [removeFromCart]
    );

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
    const totalPrice = items.reduce(
        (acc, i) => acc + i.product.price * i.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within a CartProvider");
    return ctx;
};
