"use client";

import { useEffect, useState, useMemo } from "react";

interface FloatingItem {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  color: string;
  type: "heart" | "sparkle";
  sway: number;
}

const COLORS = [
  "#FF6B8A",
  "#FF8FAF",
  "#E84575",
  "#FFBDCF",
  "#ff4081",
  "#FF7EB3",
  "#f06292",
  "#FF1744",
];

export default function HeartsBackground() {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const hearts: FloatingItem[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 28,
      delay: Math.random() * 12,
      duration: 7 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      type: "heart" as const,
      sway: -30 + Math.random() * 60,
    }));

    const sparkles: FloatingItem[] = Array.from({ length: 20 }, (_, i) => ({
      id: 100 + i,
      left: Math.random() * 100,
      size: 3 + Math.random() * 6,
      delay: Math.random() * 15,
      duration: 4 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.5,
      color: "#fff",
      type: "sparkle" as const,
      sway: -20 + Math.random() * 40,
    }));

    setItems([...hearts, ...sparkles]);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-blush-100/40 via-transparent to-blush-200/30" />

      {items.map((item) =>
        item.type === "heart" ? (
          <div
            key={item.id}
            className="absolute heart-float"
            style={{
              left: `${item.left}%`,
              bottom: "-50px",
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              ["--sway" as string]: `${item.sway}px`,
            }}
          >
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.color}
              style={{ opacity: item.opacity, filter: `drop-shadow(0 0 ${item.size / 3}px ${item.color}40)` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ) : (
          <div
            key={item.id}
            className="absolute sparkle-float"
            style={{
              left: `${item.left}%`,
              bottom: "-20px",
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
            }}
          >
            <div
              className="rounded-full bg-white"
              style={{
                width: item.size,
                height: item.size,
                opacity: item.opacity,
                boxShadow: `0 0 ${item.size * 2}px ${item.size}px rgba(255,255,255,0.6)`,
              }}
            />
          </div>
        )
      )}
    </div>
  );
}
