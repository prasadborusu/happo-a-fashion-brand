import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import OrderModal from "./OrderModal";
import SuccessOverlay from "./SuccessOverlay";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    const { items, removeFromCart, updateQty, totalItems, totalPrice, clearCart } = useCart();
    const [showOrder, setShowOrder] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBuyNow = () => {
        if (items.length === 0) return;
        setShowOrder(true);
    };

    const handleOrderSuccess = () => {
        setShowOrder(false);
        setShowSuccess(true);
        clearCart();
        onClose();
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                            onClick={onClose}
                        />

                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="h-5 w-5 text-foreground" />
                                    <span className="font-heading text-lg font-medium tracking-wide">
                                        Your Cart
                                    </span>
                                    {totalItems > 0 && (
                                        <span className="bg-warm text-white text-xs font-bold rounded-full px-2 py-0.5">
                                            {totalItems}
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-accent transition-colors duration-200"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
                                        <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
                                        <p className="text-muted-foreground font-medium">
                                            Your cart is empty
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="text-sm text-warm underline underline-offset-2 hover:opacity-80 transition-opacity"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <motion.div
                                            key={`${item.product.id}-${item.size}`}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 40 }}
                                            className="flex gap-4 p-3 rounded-xl border border-border bg-accent/30"
                                        >
                                            {/* Image */}
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded-lg shrink-0"
                                            />

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-foreground truncate">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    Size: <span className="font-semibold">{item.size}</span>
                                                </p>
                                                <p className="text-sm font-semibold text-foreground mt-1">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </p>

                                                {/* Qty controls */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() =>
                                                            updateQty(item.product.id, item.size, item.quantity - 1)
                                                        }
                                                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-sm font-medium min-w-[1.5rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQty(item.product.id, item.size, item.quantity + 1)
                                                        }
                                                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() =>
                                                    removeFromCart(item.product.id, item.size)
                                                }
                                                className="self-start p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="border-t border-border px-6 py-5 space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                                        </span>
                                        <span className="font-semibold text-foreground text-base">
                                            {formatPrice(totalPrice)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Shipping &amp; taxes calculated at checkout.
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={onClose}
                                            className="flex-1 border border-border text-foreground py-3.5 rounded-xl font-semibold text-sm hover:bg-accent transition-colors duration-200"
                                        >
                                            Continue Shopping
                                        </button>
                                        <button
                                            onClick={handleBuyNow}
                                            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors duration-200"
                                        >
                                            <Zap className="h-4 w-4" />
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Order Modal — triggered by Buy Now — shows ALL cart items */}
            {showOrder && (
                <OrderModal
                    cartItems={items}
                    onClose={() => setShowOrder(false)}
                    onSuccess={handleOrderSuccess}
                />
            )}

            {/* Success overlay */}
            {showSuccess && (
                <SuccessOverlay
                    onClose={() => {
                        setShowSuccess(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                />
            )}
        </>
    );
};

export default CartDrawer;
