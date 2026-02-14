"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import HeartsBackground from "@/components/HeartsBackground";
import TypeWriter from "@/components/TypeWriter";
import ProgressDots from "@/components/ProgressDots";
import ScratchCard from "@/components/ScratchCard";
import PhotoMoment from "@/components/PhotoMoment";
import CircleAssembly from "@/components/CircleAssembly";
import MateReveal from "@/components/MateReveal";
import PhotoGallery from "@/components/PhotoGallery";

// ─── Icon data ─────────────────────────────────────────────
const ICONS = [
  {
    id: "luna",
    name: "Luna y estrellas",
    src: "/icons/luna.png",
    message:
      "Lo elegí porque sabes que amo la luna y esta tiene estrellas porque juntos formamos el cielo. La luna soy yo, las estrellas sos vos, y juntos somos la noche más hermosa.",
  },
  {
    id: "myo",
    name: "m♥o",
    src: "/icons/myo.png",
    message:
      "Nuestras iniciales unidas por un corazón.",
  },
  {
    id: "flores",
    name: "Flores",
    src: "/icons/flores.png",
    message:
      "Porque sé que amás las flores, y a me encanta dártelas. Sé que siempre te ponés super feliz y a mi me llena el alma verte así.",
  },
  {
    id: "ola",
    name: "Mar",
    src: "/icons/ola.png",
    message:
      "Representa tu apodo. Y también significa nuestras primeras hermosas vacaciones juntos en Mar de las Pampas, donde nos conocimos mucho más.",
  },
  {
    id: "sol",
    name: "Sol",
    src: "/icons/sol.png",
    message:
      "Este objeto te caracteriza a vos, yo sé que amás el sol, y que amás la luz, y eso es exactamente lo que irradiás en mi vida. Sos mi sol.",
  },
  {
    id: "montanas",
    name: "Montañas",
    src: "/icons/montanas.png",
    message:
      "Esto representa nuestras segundas vacaciones juntos, en Córdoba. Donde vamos a llenarnos de recuerdos lindos y vamos a estar mucho tiempo juntos y disfrutar cada momento.",
  },
  {
    id: "burger",
    name: "Hamburguesa y Papas",
    src: "/icons/burger-papas.png",
    message:
      "Amo comer hamburguesas y papas con vos, es siempre uno de nuestros planes favoritos. Yo soy la hamburguesita y vos las papitas. Por mil planes más comiendo hamburguesas ricas y papitas.",
  },
  {
    id: "corazones",
    name: "Corazones",
    src: "/icons/corazones.png",
    message:
      "Porque estamos destinados a estar juntos. Dos corazones que se encontraron sin buscarlo, que no quieren separarse jamás.",
  },
];

// ─── Icon scales ───────────────────────────────────────────
const ICON_SCALES: Record<string, number> = {
  luna: 1.0,
  myo: 1.05,
  flores: 0.85,
  ola: 1.1,
  sol: 1.15,
  montanas: 1.2,
  burger: 0.95,
  corazones: 1.0,
};

// ─── Screen sequence ───────────────────────────────────────
type Screen =
  | { type: "landing" }
  | { type: "scratch"; iconIndex: number }
  | { type: "photo"; src: string; message: string }
  | { type: "assembly" }
  | { type: "reveal" }
  | { type: "gallery" };

const SCREENS: Screen[] = [
  { type: "landing" },
  { type: "scratch", iconIndex: 0 }, // Luna
  { type: "scratch", iconIndex: 1 }, // mYo
  { type: "scratch", iconIndex: 2 }, // Flores
  {
    type: "photo",
    src: "/photos/mar-flores.png",
    message: "La primera vez que te regalé flores♥",
  },
  { type: "scratch", iconIndex: 3 }, // Ola/Mar
  {
    type: "photo",
    src: "/photos/playa-beso.png",
    message: "Recuerdito de las primeras vacaciones ♥",
  },
  { type: "scratch", iconIndex: 4 }, // Sol
  {
    type: "photo",
    src: "/photos/cuadros.png",
    message: "Recuerdito pintando bajo la luna. Un dibujo sobre el sol ♥",
  },
  { type: "scratch", iconIndex: 5 }, // Montañas
  { type: "scratch", iconIndex: 6 }, // Burger + Papas
  { type: "scratch", iconIndex: 7 }, // Corazones
  { type: "assembly" },
  { type: "reveal" },
  { type: "gallery" },
];

// ─── Gallery photos ────────────────────────────────────────
const GALLERY_PHOTOS = [
  "/gallery/img_4643.jpg",
  "/gallery/img_4950.jpg",
  "/gallery/img_4962.jpg",
  "/gallery/img_4963.jpg",
  "/gallery/img_4965.jpg",
  "/gallery/img_5025.jpg",
  "/gallery/img_5371.jpg",
  "/gallery/img_5372.jpg",
  "/gallery/img_5377.jpg",
  "/gallery/img_5378.jpg",
  "/gallery/img_5379.jpg",
  "/gallery/img_5548.jpg",
  "/gallery/WhatsApp1.jpeg",
  "/gallery/WhatsApp2.jpeg",
  "/gallery/WhatsApp3.jpeg",
  "/gallery/WhatsApp4.jpeg",
];

// ─── Main page ─────────────────────────────────────────────
export default function Home() {
  const [step, setStep] = useState(0);
  const [scratchRevealed, setScratchRevealed] = useState(false);

  const next = useCallback(() => {
    setScratchRevealed(false);
    setStep((s) => Math.min(s + 1, SCREENS.length - 1));
  }, []);

  const screen = SCREENS[step];

  // Count scratch screens for progress dots
  const scratchScreens = SCREENS.filter((s) => s.type === "scratch");
  const currentScratchIndex =
    screen.type === "scratch"
      ? scratchScreens.findIndex(
          (s) => s.type === "scratch" && s.iconIndex === screen.iconIndex
        )
      : -1;

  // Handle Enter key to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (scratchRevealed || screen.type === "landing") {
          next();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scratchRevealed, screen.type, next]);

  return (
    <main className="relative min-h-dvh animated-gradient-bg">
      <HeartsBackground />

      <AnimatePresence mode="wait">
        {/* ── Landing ─────────────────────────────── */}
        {screen.type === "landing" && (
          <motion.div
            key="landing"
            className="flex flex-col items-center justify-center min-h-dvh px-8 gap-6 z-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative sparkles around the heart */}
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const dist = 70 + Math.random() * 30;
              return (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-blush-400"
                  style={{
                    top: `calc(28% + ${Math.sin(angle) * dist}px)`,
                    left: `calc(50% + ${Math.cos(angle) * dist}px)`,
                    boxShadow: "0 0 8px 2px rgba(255,107,138,0.5)",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0],
                  }}
                  transition={{
                    delay: 0.5 + i * 0.2,
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1 + Math.random(),
                  }}
                />
              );
            })}

            {/* Beating heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3, stiffness: 200 }}
              className="relative"
            >
              <div className="animate-heartbeat">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                  fill="url(#heartGradient)"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(255,107,138,0.5)) drop-shadow(0 0 40px rgba(255,107,138,0.3))",
                  }}
                >
                  <defs>
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B8A" />
                      <stop offset="50%" stopColor="#E84575" />
                      <stop offset="100%" stopColor="#FF8FAF" />
                    </linearGradient>
                  </defs>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              {/* Glow ring behind heart */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,107,138,0.3) 0%, transparent 70%)",
                  width: 140,
                  height: 140,
                  top: -20,
                  left: -20,
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Title and subtitle */}
            <div className="text-center space-y-5">
              <h1 className="text-5xl font-script text-blush-700 text-glow">
                <TypeWriter text="Hola, Mar..." speed={120} />
              </h1>

              <motion.p
                className="text-lg text-blush-600 leading-relaxed max-w-[280px] mx-auto font-light"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.8 }}
              >
                Feliz San Valentín mi amor.
                <br />
                <span className="font-medium">Te preparé algo especial...</span>
              </motion.p>
            </div>

            {/* CTA Button with shimmer */}
            <motion.button
              onClick={next}
              className="shimmer-btn px-12 py-4 text-white rounded-full font-semibold text-lg shadow-2xl active:scale-95 transition-transform relative overflow-hidden"
              style={{
                boxShadow: "0 8px 30px rgba(255,107,138,0.4), 0 4px 15px rgba(255,107,138,0.3)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.6 }}
              whileTap={{ scale: 0.93 }}
            >
              Descubrí tu sorpresa
            </motion.button>

            {/* Small hint */}
            <motion.p
              className="text-xs text-blush-300 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              Toca el botón ♥
            </motion.p>
          </motion.div>
        )}

        {/* ── Scratch Cards ───────────────────────── */}
        {screen.type === "scratch" && (
          <motion.div
            key={`scratch-${screen.iconIndex}`}
            className="flex flex-col items-center justify-center min-h-dvh px-4 py-6 gap-4 z-10 relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
          >
            <ProgressDots total={8} current={screen.iconIndex} />

            <ScratchCard
              width={340}
              height={520}
              onReveal={() => setScratchRevealed(true)}
            >
              <div className="flex flex-col items-center justify-between gap-3 p-6 bg-white rounded-3xl w-full h-full">
                <div 
                  className="relative flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '280px',
                    height: '280px',
                    transform: `scale(${ICON_SCALES[ICONS[screen.iconIndex].id] || 1})`
                  }}
                >
                  <Image
                    src={ICONS[screen.iconIndex].src}
                    alt={ICONS[screen.iconIndex].name}
                    fill
                    className="object-contain"
                    sizes="280px"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <h3 className="text-xl font-script text-blush-700 text-center">
                    {ICONS[screen.iconIndex].name}
                  </h3>
                  <p className="text-sm text-blush-500 text-center leading-relaxed px-2">
                    {ICONS[screen.iconIndex].message}
                  </p>
                </div>
              </div>
            </ScratchCard>

            <AnimatePresence>
              {scratchRevealed && (
                <motion.button
                  onClick={next}
                  className="mt-2 px-8 py-3 bg-blush-500 text-white rounded-full font-semibold shadow-lg active:scale-95 transition-transform"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Siguiente ♥
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Photo Moments ───────────────────────── */}
        {screen.type === "photo" && (
          <PhotoMoment
            key={`photo-${step}`}
            src={screen.src}
            message={screen.message}
            onNext={next}
          />
        )}

        {/* ── Circle Assembly ─────────────────────── */}
        {screen.type === "assembly" && (
          <CircleAssembly
            key="assembly"
            icons={ICONS.map((icon) => ({
              id: icon.id,
              name: icon.name,
              src: icon.src,
            }))}
            onComplete={next}
          />
        )}

        {/* ── Mate Reveal ─────────────────────────── */}
        {screen.type === "reveal" && (
          <MateReveal
            key="reveal"
            mateImage="/photos/mate-real.png"
            selfieImage="/photos/selfie-mate.png"
            onNext={next}
          />
        )}

        {/* ── Photo Gallery ───────────────────────── */}
        {screen.type === "gallery" && (
          <PhotoGallery key="gallery" photos={GALLERY_PHOTOS} />
        )}
      </AnimatePresence>
    </main>
  );
}
