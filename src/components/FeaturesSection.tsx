import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, ShieldCheck, Recycle, Heart } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "Complimentary delivery on all orders over $100. Express options available." },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Each piece undergoes rigorous quality checks. 30-day hassle-free returns." },
  { icon: Recycle, title: "Sustainable Materials", desc: "Ethically sourced fabrics with eco-friendly production processes." },
  { icon: Heart, title: "Crafted With Care", desc: "Designed in our studio, made by artisans who share our passion for detail." },
];

const FeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-28 bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Why Happo
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-medium text-foreground">
            The Happo <span className="italic text-warm">Difference</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group text-center p-8"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-medium mb-3 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
