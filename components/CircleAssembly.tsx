"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface IconData {
  id: string;
  name: string;
  src: string;
}

interface CircleAssemblyProps {
  icons: IconData[];
  onComplete: () => void;
}

export default function CircleAssembly({ icons, onComplete }: CircleAssemblyProps) {
  const [showRevealButton, setShowRevealButton] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showRevealButton) {
        onComplete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showRevealButton, onComplete]);
  const radius = 145;
  const centerX = 200;
  const centerY = 200;
  const iconSize = 95;

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-6 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.p
        className="text-xl font-script text-blush-600 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Todos estos símbolos forman algo especial...
      </motion.p>

      <div className="relative" style={{ width: 400, height: 400 }}>
        {/* Circle outline */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: radius * 2 + 90,
            height: radius * 2 + 90,
            left: centerX - radius - 45,
            top: centerY - radius - 45,
            borderColor: '#FFC9D6',
            borderWidth: '6px',
            borderStyle: 'solid',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            showRevealButton
              ? {
                  opacity: 1,
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0px rgba(255,107,138,0.4)',
                    '0 0 25px rgba(255,107,138,0.9)',
                    '0 0 0px rgba(255,107,138,0.4)',
                  ],
                }
              : { opacity: 1, scale: 1 }
          }
          transition={{
            scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            opacity: { delay: 0.5, duration: 0.8 },
          }}
        />

        {/* Icons animating to circle positions */}
        {icons.map((icon, i) => {
          const angle = (i / icons.length) * Math.PI * 2 - Math.PI / 2;
          const halfSize = iconSize / 2;
          const x = centerX + radius * Math.cos(angle) - halfSize;
          const y = centerY + radius * Math.sin(angle) - halfSize;

          return (
            <motion.div
              key={icon.id}
              className="absolute rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden"
              style={{
                width: iconSize,
                height: iconSize,
                padding: '2px',
              }}
              initial={{
                x: centerX - halfSize,
                y: centerY - halfSize,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                x,
                y,
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 1 + i * 0.3,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              onAnimationComplete={
                i === icons.length - 1
                  ? () => setShowRevealButton(true)
                  : undefined
              }
            >
              <Image
                src={icon.src}
                alt={icon.name}
                width={iconSize - 4}
                height={iconSize - 4}
                className="object-contain"
              />
            </motion.div>
          );
        })}

        {/* Center glow when all assembled */}
        <motion.div
          className="absolute rounded-full bg-blush-200"
          style={{
            width: 60,
            height: 60,
            left: centerX - 30,
            top: centerY - 30,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.6, 0.3], scale: [0, 1.2, 1] }}
          transition={{ delay: 1 + icons.length * 0.3 + 0.5, duration: 1 }}
        />
      </div>

      <motion.p
        className="text-base text-blush-500 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + icons.length * 0.3 + 1 }}
      >
        ¿Reconocés la forma?
      </motion.p>

      <AnimatePresence>
        {showRevealButton && (
          <motion.button
            onClick={onComplete}
            className="px-8 py-3 bg-blush-500 text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
          >
            Revelar ♥
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
