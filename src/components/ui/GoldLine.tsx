interface GoldLineProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export default function GoldLine({ className = '', direction = 'horizontal' }: GoldLineProps) {
  if (direction === 'vertical') {
    return <div className={`gold-line-v ${className}`} role="separator" aria-hidden="true" />;
  }
  return <div className={`gold-line-h ${className}`} role="separator" aria-hidden="true" />;
}
