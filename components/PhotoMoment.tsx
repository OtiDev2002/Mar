"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PhotoMomentProps {
  src: string;
  message: string;
  onNext: () => void;
}

export default function PhotoMoment({ src, message, onNext }: PhotoMomentProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-6 py-8 gap-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="relative w-[280px] h-[360px] rounded-3xl overflow-hidden shadow-xl border-4 border-white"
        initial={{ rotate: -3 }}
        animate={{ rotate: [0, -2, 2, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="280px"
        />
      </motion.div>

      <motion.p
        className="text-center text-blush-700 font-medium text-lg max-w-xs leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {message}
      </motion.p>

      <motion.button
        onClick={onNext}
        className="mt-4 px-8 py-3 bg-blush-500 text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileTap={{ scale: 0.95 }}
      >
        Siguiente ♥
      </motion.button>
    </motion.div>
  );
}
