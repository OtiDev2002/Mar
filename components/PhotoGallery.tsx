"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactConfetti from "react-confetti";

export default function PhotoGallery() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(() => setShowConfetti(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-8 gap-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={80}
          colors={["#FF6B8A", "#FFD6E0", "#E84575", "#FF8FAF", "#FFBDCF"]}
        />
      )}

      <motion.div
        className="flex flex-col items-center gap-6 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="w-20 h-0.5 bg-blush-300 rounded-full" />

        <p className="text-base text-blush-500 text-center max-w-xs">
          Por muchos más San Valentín y años juntos
        </p>

        <p className="text-3xl font-script text-blush-700 text-center">
          Te amo, Mar ♥
        </p>

        <p className="text-base text-blush-500 text-center max-w-xs leading-relaxed">
          Feliz San Valentín mi amor. Por muchos más momentos juntos, por más
          aventuras, más mates compartidos y más amor.
        </p>

        <p className="text-lg font-script text-blush-400 mt-4">
          — Tu Oti
        </p>

        <div className="w-20 h-0.5 bg-blush-300 rounded-full" />
      </motion.div>
    </motion.div>
  );
}
