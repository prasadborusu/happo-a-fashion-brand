import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// ── Sparkle particle ─────────────────────────────────────────────────────────
const Sparkle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0, rotate: 0 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: [0, 180, 360],
            y: [0, -30],
        }}
        transition={{ duration: 1.2, delay, ease: "easeOut", repeat: Infinity, repeatDelay: 2 }}
    >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
                d="M7 0L8.3 5.7L14 7L8.3 8.3L7 14L5.7 8.3L0 7L5.7 5.7Z"
                fill="url(#sg)"
            />
            <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="14" y2="14">
                    <stop offset="0%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#FF69B4" />
                </linearGradient>
            </defs>
        </svg>
    </motion.div>
);

// ── Floating heart ────────────────────────────────────────────────────────────
const FloatingHeart = ({ delay, x }: { delay: number; x: number }) => (
    <motion.div
        className="absolute pointer-events-none select-none text-pink-400"
        style={{ left: x, bottom: -10 }}
        initial={{ opacity: 0, y: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 0], y: -80, scale: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, delay, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
    >
        ❤️
    </motion.div>
);

// ── Single Eye ────────────────────────────────────────────────────────────────
const Eye = ({ side }: { side: "left" | "right" }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const eyeRef = useRef<HTMLDivElement>(null);
    const blinkCtrl = useAnimationControls();
    const [isHappy, setIsHappy] = useState(false);

    // Pupil follows mouse
    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (!eyeRef.current) return;
            const rect = eyeRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 14;
            const factor = Math.min(1, maxDist / (dist || 1));
            setMousePos({ x: dx * factor, y: dy * factor });
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    // Random happy blink every few seconds
    useEffect(() => {
        const blink = async () => {
            while (true) {
                await new Promise((r) => setTimeout(r, 2000 + Math.random() * 3000));
                setIsHappy(true);
                await blinkCtrl.start({ scaleY: 0, transition: { duration: 0.12 } });
                await new Promise((r) => setTimeout(r, 180));
                await blinkCtrl.start({ scaleY: 1, transition: { duration: 0.18 } });
                setIsHappy(false);
            }
        };
        blink();
    }, [blinkCtrl]);

    return (
        <div ref={eyeRef} className="relative" style={{ width: 80, height: 80 }}>
            {/* Glow ring */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: [
                        "0 0 0px 0px rgba(255,200,100,0)",
                        "0 0 24px 8px rgba(255,200,100,0.55)",
                        "0 0 0px 0px rgba(255,200,100,0)",
                    ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* White of eye */}
            <motion.div
                animate={blinkCtrl}
                className="w-full h-full rounded-full bg-white shadow-lg border-2 border-gray-200 overflow-hidden flex items-center justify-center"
                style={{ originY: 0.5 }}
            >
                {/* Rainbow iris */}
                <motion.div
                    className="absolute rounded-full"
                    style={{
                        width: 48,
                        height: 48,
                        background: "conic-gradient(from 0deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff, #ff6b6b)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                {/* Iris overlay */}
                <div
                    className="absolute rounded-full bg-gradient-to-br from-blue-400 to-indigo-700"
                    style={{ width: 44, height: 44, opacity: 0.85 }}
                />
                {/* Pupil */}
                <motion.div
                    className="absolute rounded-full bg-gray-900 shadow-inner"
                    style={{ width: 22, height: 22 }}
                    animate={{ x: mousePos.x * 0.45, y: mousePos.y * 0.45 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                    {/* White shine dot */}
                    <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-white opacity-80" />
                </motion.div>
                {/* Happy squint overlay */}
                {isHappy && (
                    <motion.div
                        className="absolute inset-0 flex items-end justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="w-full h-1/2 rounded-b-full bg-white" />
                    </motion.div>
                )}
            </motion.div>

            {/* Cheek blush */}
            <motion.div
                className={`absolute bottom-0 ${side === "left" ? "-right-3" : "-left-3"} w-8 h-4 rounded-full`}
                style={{ background: "rgba(255, 150, 180, 0.45)" }}
                animate={{ opacity: [0.4, 0.85, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

// ── Main HappyEyes component ──────────────────────────────────────────────────
const HappyEyes = () => {
    const sparkles = [
        { x: -20, y: -10, delay: 0 },
        { x: 170, y: -15, delay: 0.4 },
        { x: -30, y: 60, delay: 0.8 },
        { x: 180, y: 50, delay: 1.2 },
        { x: 65, y: -25, delay: 0.6 },
        { x: 75, y: 90, delay: 1.5 },
    ];
    const hearts = [
        { x: 0, delay: 0 },
        { x: 50, delay: 0.8 },
        { x: 110, delay: 1.6 },
        { x: 155, delay: 0.4 },
    ];

    return (
        <motion.div
            className="relative inline-flex items-center gap-6"
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.2 }}
            whileHover={{ scale: 1.08 }}
        >
            {/* Sparkles */}
            {sparkles.map((s, i) => (
                <Sparkle key={i} {...s} />
            ))}
            {/* Floating hearts */}
            {hearts.map((h, i) => (
                <FloatingHeart key={i} {...h} />
            ))}

            {/* Eyes */}
            <Eye side="left" />
            {/* Nose dot */}
            <motion.div
                className="w-3 h-3 rounded-full bg-pink-300 shadow"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <Eye side="right" />

            {/* Rainbow glow bar below */}
            <motion.div
                className="absolute -bottom-4 left-0 right-0 h-1 rounded-full"
                style={{
                    background: "linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c77dff)",
                }}
                animate={{ opacity: [0.5, 1, 0.5], scaleX: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>
    );
};

export default HappyEyes;
