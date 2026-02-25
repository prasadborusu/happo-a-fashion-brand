import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="gradient-dark-bg py-20 text-primary-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-12"
        >
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl font-medium tracking-wider mb-4">HAPPO</h3>
            <p className="text-sm text-primary-foreground/50 leading-relaxed max-w-xs">
              Timeless clothing designed for the modern individual. Premium quality, conscious fashion.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-6 text-primary-foreground/70">Shop</h4>
            <ul className="space-y-3">
              {["New Arrivals", "Best Sellers", "Essentials", "Sale"].map((l) => (
                <li key={l}>
                  <button className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-6 text-primary-foreground/70">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Sustainability", "Careers", "Press"].map((l) => (
                <li key={l}>
                  <button className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase mb-6 text-primary-foreground/70">Contact</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/50">
              <li>hello@happo.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon–Fri, 9am – 6pm</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="border-t border-primary-foreground/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-primary-foreground/30">
            © {new Date().getFullYear()} Happo. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Twitter", "Pinterest"].map((s) => (
              <button key={s} className="text-xs text-primary-foreground/30 hover:text-primary-foreground/70 transition-colors tracking-wider uppercase">
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
