"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactConfetti from "react-confetti";

interface PhotoGalleryProps {
  photos: string[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(() => setShowConfetti(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.3, y: 60 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-dvh px-4 py-8 gap-6 relative"
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

      <motion.h2
        className="text-2xl font-script text-blush-700 text-center z-10 pt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Nuestras aventuras
      </motion.h2>

      <motion.p
        className="text-base text-blush-500 text-center z-10 max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Por muchos más San Valentín y años juntos
      </motion.p>

      <motion.div
        className="grid grid-cols-2 gap-3 w-full max-w-sm z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className={`relative rounded-2xl overflow-hidden shadow-lg border-2 border-white ${
              i % 3 === 0 ? "col-span-2 h-[240px]" : "h-[180px]"
            }`}
            variants={item}
          >
            <Image
              src={photo}
              alt=""
              fill
              className="object-cover"
              sizes={i % 3 === 0 ? "100vw" : "50vw"}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-4 py-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: photos.length * 0.15 + 1 }}
      >
        <div className="w-20 h-0.5 bg-blush-300 rounded-full" />

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
      </motion.div>
    </motion.div>
  );
}
