/* Kinetic Maximalism: Playful confetti particles for celebration moments */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "star";
  size: number;
}

const colors = [
  "rgb(255, 0, 110)", // Hot pink
  "rgb(0, 245, 255)", // Cyan
  "rgb(204, 255, 0)", // Lime
  "rgb(255, 190, 11)", // Yellow
  "rgb(157, 78, 221)", // Purple
];

const shapes = ["circle", "square", "triangle", "star"] as const;

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    rotation: Math.random() * 360,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    size: Math.random() * 20 + 10,
  }));
}

export default function ConfettiEffect({ trigger = false }: { trigger?: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      setParticles(generateParticles(50));
      const timer = setTimeout(() => setParticles([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            y: "110vh",
            rotate: particle.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            ease: "easeIn",
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
        >
          {particle.shape === "circle" && (
            <div className="w-full h-full rounded-full" style={{ backgroundColor: particle.color }} />
          )}
          {particle.shape === "square" && (
            <div className="w-full h-full" style={{ backgroundColor: particle.color }} />
          )}
          {particle.shape === "triangle" && (
            <div
              className="w-full h-full"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                backgroundColor: particle.color,
              }}
            />
          )}
          {particle.shape === "star" && (
            <div
              className="w-full h-full"
              style={{
                clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                backgroundColor: particle.color,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
