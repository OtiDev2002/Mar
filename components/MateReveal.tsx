"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactConfetti from "react-confetti";

interface MateRevealProps {
  mateImage: string;
  selfieImage: string;
  onNext: () => void;
}

export default function MateReveal({ mateImage, selfieImage, onNext }: MateRevealProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-8 gap-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={150}
          colors={["#FF6B8A", "#FFD6E0", "#E84575", "#FF8FAF", "#FFBDCF", "#fff"]}
        />
      )}

      <motion.p
        className="text-2xl font-script text-blush-700 text-center z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Te hice un matecito especial para vos ♥
      </motion.p>

      <motion.p
        className="text-base text-blush-500 text-center max-w-xs z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ♥Tiene un poco de lo que nos representa ♥
      </motion.p>

      <motion.div
        className="flex flex-col items-center gap-4 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="relative w-[300px] h-[360px] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
          <Image
            src={selfieImage}
            alt="Nosotros"
            fill
            className="object-cover"
            sizes="300px"
          />
        </div>
        <p className="text-lg font-script text-blush-600 text-center">
          Por muchas más aventuras juntos, mi amor
        </p>
      </motion.div>

      <motion.button
        onClick={onNext}
        className="mt-4 px-8 py-3 bg-blush-500 text-white rounded-full font-semibold shadow-lg z-10 active:scale-95 transition-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        Seguí ♥
      </motion.button>
    </motion.div>
  );
}
