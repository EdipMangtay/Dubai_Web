'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3' | 'span';
}

export default function SplitText({ text, className = '', as: Tag = 'p' }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const words = text.split(' ');

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length;

          return <Word key={`${word}-${i}`} word={word} range={[start, end]} progress={scrollYProgress} />;
        })}
      </Tag>
    </div>
  );
}

interface WordProps {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Word({ word, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, [4, 0]);
  const y = useTransform(progress, range, [8, 0]);

  return (
    <motion.span
      style={{
        opacity,
        filter: blur as unknown as string,
        y,
      }}
      className="inline-block mr-[0.3em] will-change-transform"
    >
      <motion.span style={{ filter: useTransform(blur, (v) => `blur(${v}px)`) }}>
        {word}
      </motion.span>
    </motion.span>
  );
}
