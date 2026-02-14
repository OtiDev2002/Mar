"use client";

import { motion } from "framer-motion";
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
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

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

      <div className="relative" style={{ width: 300, height: 300 }}>
        {/* Circle outline */}
        <motion.div
          className="absolute rounded-full border-2 border-blush-300"
          style={{
            width: radius * 2 + 40,
            height: radius * 2 + 40,
            left: centerX - radius - 20,
            top: centerY - radius - 20,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />

        {/* Icons animating to circle positions */}
        {icons.map((icon, i) => {
          const angle = (i / icons.length) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle) - 24;
          const y = centerY + radius * Math.sin(angle) - 24;

          return (
            <motion.div
              key={icon.id}
              className="absolute w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden p-1"
              initial={{
                x: centerX - 24,
                y: centerY - 24,
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
                  ? () => {
                      setTimeout(onComplete, 1500);
                    }
                  : undefined
              }
            >
              <Image
                src={icon.src}
                alt={icon.name}
                width={40}
                height={40}
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
    </motion.div>
  );
}
