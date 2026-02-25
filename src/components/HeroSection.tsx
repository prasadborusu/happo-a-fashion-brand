import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/banner3.jpeg";

const HeroSection = () => {
  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
       <section className="relative w-full min-h-[420px] h-[48vw] max-h-[600px] flex items-center justify-center overflow-hidden p-0 m-0 bg-black">
      <div className="container mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Text */}
          <div className="space-y-8 lg:pr-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground"
            >
              New Collection — Spring/Summer 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-heading font-medium leading-[0.95] tracking-tight text-foreground"
            >
              Elevated
              <br />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="italic font-normal text-warm"
              >
                Essentials
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-base text-muted-foreground max-w-md leading-relaxed"
            >
              Timeless pieces crafted from premium fabrics. Designed for the
              modern wardrobe — where comfort meets sophistication.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex items-center gap-6"
            >
              <button
                onClick={scrollToProducts}
                className="bg-primary text-primary-foreground px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:opacity-80 transition-all duration-500"
              >
                Shop Collection
              </button>
              <button
                onClick={scrollToProducts}
                className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 border-b border-muted-foreground/30 pb-1"
              >
                Explore
              </button>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[3/4] lg:aspect-[4/5]">
                 <img
                   src={heroImage}
                   alt="Fashion Hero"
                   className="absolute inset-0 w-full h-full object-cover object-center z-0"
                   style={{ minHeight: 420, maxHeight: 600 }}
                 />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
