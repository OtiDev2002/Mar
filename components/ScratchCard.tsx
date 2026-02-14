"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchCardProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  revealThreshold?: number;
  onReveal?: () => void;
  coverColor?: string;
}

export default function ScratchCard({
  children,
  width = 300,
  height = 360,
  revealThreshold = 50,
  onReveal,
  coverColor,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratching, setScratching] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const scratchCount = useRef(0);
  const lastTapTime = useRef(0);
  const autoRevealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasInteracted = useRef(false);

  const drawCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Rose gold gradient cover
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, coverColor || "#F4B8C1");
    gradient.addColorStop(0.5, coverColor || "#E8A0B4");
    gradient.addColorStop(1, coverColor || "#D4899E");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add some sparkle dots
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Center text
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "600 18px 'Poppins', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Raspa para descubrir ♥", width / 2, height / 2);
  }, [width, height, coverColor]);

  useEffect(() => {
    drawCover();
  }, [drawCover]);

  // Auto-reveal safety: 12s after first interaction
  useEffect(() => {
    return () => {
      if (autoRevealTimer.current) clearTimeout(autoRevealTimer.current);
    };
  }, []);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = (pos: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 45;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPoint.current = pos;
    scratchCount.current++;

    // Check reveal every 10 strokes
    if (scratchCount.current % 10 === 0) {
      checkReveal(ctx);
    }
  };

  const checkReveal = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = width * height;

    // Sample every 10th pixel for performance
    for (let i = 3; i < pixels.length; i += 40) {
      if (pixels[i] === 0) transparent++;
    }

    const sampled = Math.floor(pixels.length / 40);
    const percent = (transparent / sampled) * 100;

    if (percent >= revealThreshold) {
      setIsRevealed(true);
      onReveal?.();
    }
  };

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();

    // Double-tap to reveal
    const now = Date.now();
    if (now - lastTapTime.current < 350) {
      setIsRevealed(true);
      onReveal?.();
      return;
    }
    lastTapTime.current = now;

    // Start auto-reveal timer on first interaction
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      autoRevealTimer.current = setTimeout(() => {
        if (!isRevealed) {
          setIsRevealed(true);
          onReveal?.();
        }
      }, 12000);
    }

    setScratching(true);
    const pos = getPos(e);
    if (pos) scratch(pos);
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!scratching) return;
    const pos = getPos(e);
    if (pos) scratch(pos);
  };

  const handleEnd = () => {
    setScratching(false);
    lastPoint.current = null;

    // Always check threshold when user lifts finger
    const canvas = canvasRef.current;
    if (canvas && !isRevealed) {
      const ctx = canvas.getContext("2d");
      if (ctx) checkReveal(ctx);
    }
  };

  return (
    <div
      className="relative mx-auto rounded-3xl overflow-hidden shadow-lg"
      style={{ width, height }}
    >
      {/* Content underneath */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>

      {/* Scratch overlay */}
      <AnimatePresence>
        {!isRevealed && (
          <>
            <motion.canvas
              ref={canvasRef}
              width={width}
              height={height}
              className="absolute inset-0 scratch-canvas rounded-3xl"
              style={{ width, height }}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
