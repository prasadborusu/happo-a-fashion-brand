import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "./ProductCard";
import { formatPrice } from "../lib/utils";
import emailjs from '@emailjs/browser';

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_4e4r52r';
const EMAILJS_TEMPLATE_ID = 'template_btfzkvw';
const EMAILJS_PUBLIC_KEY = 'SXT_o5r2zoR3PLUk8';

// Initialize EmailJS with public key
emailjs.init(EMAILJS_PUBLIC_KEY);

interface OrderModalProps {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

const OrderModal = ({ product, onClose, onSuccess }: OrderModalProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      console.log('Starting email send process...');
      console.log('Service ID:', EMAILJS_SERVICE_ID);
      console.log('Template ID:', EMAILJS_TEMPLATE_ID);

      // Send email using EmailJS
      const templateParams = {
        to_name: form.name,
        from_name: "Happo E-Commerce",
        product_name: product.name,
        product_price: formatPrice(product.price),
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        customer_address: form.address,
        order_date: new Date().toLocaleDateString(),
        reply_to: form.email,
      };

      console.log('Template params:', templateParams);

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('Email sent successfully:', result);
      onSuccess();
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send confirmation email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-card w-full max-w-md shadow-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary p-6 flex items-center gap-4">
            <img src={product.image} alt={product.name} className="w-16 h-20 object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-lg font-medium text-primary-foreground truncate">{product.name}</h3>
              <p className="text-primary-foreground/70 text-sm font-semibold mt-1">{formatPrice(product.price)}</p>
            </div>
            <button onClick={onClose} className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {[
              { name: "name", label: "Full Name", type: "text", placeholder: "Your name" },
              { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
              { name: "phone", label: "Phone", type: "tel", placeholder: "+1 (555) 123-4567" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  required
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                Delivery Address
              </label>
              <textarea
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                rows={3}
                placeholder="123 Main St, City, State, ZIP"
                className="w-full px-4 py-3 border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all resize-none"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-3.5 text-xs font-medium tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {submitting ? "Placing Order..." : (
                <><CheckCircle className="h-4 w-4" /> Confirm Order</>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderModal;
