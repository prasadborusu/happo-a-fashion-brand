import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessOverlayProps {
  onClose: () => void;
}

const SuccessOverlay = ({ onClose }: SuccessOverlayProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 gradient-dark-bg"
  >
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="text-center space-y-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="mx-auto w-20 h-20 rounded-full bg-warm flex items-center justify-center"
      >
        <CheckCircle className="h-10 w-10 text-primary-foreground" />
      </motion.div>

      <div>
        <h2 className="text-3xl sm:text-4xl font-heading font-medium text-primary-foreground">
          Order Confirmed
        </h2>
        <p className="mt-4 text-primary-foreground/50 max-w-sm mx-auto text-sm leading-relaxed">
          Thank you for shopping with Happo. We'll contact you via WhatsApp to confirm your order details.
        </p>
      </div>

      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-primary-foreground text-primary px-10 py-3.5 text-xs font-medium tracking-[0.2em] uppercase hover:opacity-90 transition-all"
      >
        Continue Shopping
      </motion.button>
    </motion.div>
  </motion.div>
);

export default SuccessOverlay;
