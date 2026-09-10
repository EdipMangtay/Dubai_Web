'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltIntensity?: number;
  glowColor?: string;
}

export default function TiltCard({
  children,
  className = '',
  tiltIntensity = 10,
  glowColor = 'rgba(201, 166, 107, 0.15)',
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * tiltIntensity;
    const y = ((e.clientY - top) / height - 0.5) * -tiltIntensity;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={`relative ${className}`}
    >
      {children}
      {/* Glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered
            ? `0 20px 60px -15px ${glowColor}, 0 0 0 1px rgba(201, 166, 107, 0.2)`
            : `0 0 0 0 transparent, 0 0 0 1px rgba(201, 166, 107, 0.08)`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
