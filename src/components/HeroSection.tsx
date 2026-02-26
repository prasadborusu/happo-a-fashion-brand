import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/banner3.jpeg";
import HappyEyes from "./HappyEyes";
import { useRef } from "react";

// ── Floating orb ─────────────────────────────────────────────────────────────
const FloatingOrb = ({
  color,
  size,
  x,
  y,
  delay,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  delay: number;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none blur-3xl"
    style={{ width: size, height: size, left: x, top: y, background: color }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.35, 0.6, 0.35],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

// ── Hero Section ──────────────────────────────────────────────────────────────
const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.7]);

  const scrollToProducts = () => {
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* ── Parallax hero image ───────────────────────────── */}
      <motion.img
        src={heroImage}
        alt="Fashion Hero"
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* ── Gradient overlay ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: overlayOpacity,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ── Animated colour orbs ─────────────────────────── */}
      <FloatingOrb color="rgba(255,100,150,0.4)" size={400} x="-8%" y="5%" delay={0} />
      <FloatingOrb color="rgba(120,80,255,0.35)" size={350} x="70%" y="-5%" delay={1.5} />
      <FloatingOrb color="rgba(255,210,80,0.3)" size={300} x="30%" y="60%" delay={0.8} />
      <FloatingOrb color="rgba(50,200,255,0.3)" size={280} x="80%" y="55%" delay={2.2} />

      {/* ── Animated Happy Eyes mascot ───────────────────── */}
      <motion.div
        className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ y: textY }}
      >
        {/* Brand name tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="px-5 py-1.5 rounded-full text-white text-xs tracking-[0.3em] uppercase font-semibold"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          ✦ Happo — Feel the Joy ✦
        </motion.div>

        {/* Happy Eyes */}
        <HappyEyes />

        {/* Animated headline */}
        <motion.h1
          className="text-white text-center font-heading mt-4"
          style={{
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            lineHeight: 1.1,
            textShadow: "0 4px 24px rgba(0,0,0,0.5)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.9 }}
        >
          <motion.span
            className="block"
            animate={{
              backgroundImage: [
                "linear-gradient(90deg,#ffffff,#ffd93d,#ff6b9d)",
                "linear-gradient(90deg,#ff6b9d,#ffd93d,#ffffff)",
                "linear-gradient(90deg,#ffffff,#ffd93d,#ff6b9d)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Fashion Feels Happy
          </motion.span>
        </motion.h1>

        {/* Sub-line */}
        <motion.p
          className="text-white/70 text-center text-sm tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          Wear your mood · Express your soul
        </motion.p>

        {/* CTA shimmer button */}
        <motion.button
          onClick={scrollToProducts}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="shimmer-btn relative mt-2 px-8 py-3 rounded-full text-white font-semibold tracking-wider text-sm overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #ff6b9d, #c44dff)",
            boxShadow: "0 8px 32px rgba(196,77,255,0.4)",
          }}
        >
          <span className="relative z-10">Explore Collection</span>
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
            }}
            animate={{ x: ["-100%", "140%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        </motion.button>
      </motion.div>

      {/* ── Animated scroll indicator ────────────────────── */}
      <motion.button
        onClick={scrollToProducts}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      {/* ── Corner rainbow stripe ────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-1 rainbow-bar" />
    </section>
  );
};

export default HeroSection;
