import { motion } from "framer-motion";

const marqueeItems = [
  "FREE SHIPPING OVER $100",
  "★",
  "PREMIUM FABRICS",
  "★",
  "SUSTAINABLE FASHION",
  "★",
  "NEW ARRIVALS WEEKLY",
  "★",
  "EASY RETURNS",
  "★",
];

const MarqueeBanner = () => (
  <div className="bg-primary text-primary-foreground py-3 overflow-hidden">
    <div className="flex animate-marquee whitespace-nowrap">
      {[...marqueeItems, ...marqueeItems].map((item, i) => (
        <span key={i} className="mx-6 text-[10px] font-medium tracking-[0.3em] uppercase">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBanner;
