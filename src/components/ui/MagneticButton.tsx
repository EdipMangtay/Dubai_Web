'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  variant?: 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  target,
  variant = 'gold',
  size = 'md',
  disabled = false,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClasses = 'relative inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-300 cursor-pointer overflow-hidden group';

  const variantClasses = {
    gold: 'bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 hover:from-gold-400 hover:to-gold-300 shadow-lg shadow-gold-500/20',
    outline: 'border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400',
    ghost: 'text-cream hover:text-gold-400 hover:bg-white/5',
  };

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm rounded-lg',
    md: 'px-7 py-3.5 text-sm rounded-xl',
    lg: 'px-9 py-4 text-base rounded-xl',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'gold' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gold-300 via-white/30 to-gold-300 opacity-0 group-hover:opacity-30"
          initial={false}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className="border-0 bg-transparent p-0 cursor-pointer disabled:cursor-not-allowed">
      {content}
    </button>
  );
}
