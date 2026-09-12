import type { CSSProperties, ReactNode } from 'react';

/** Explicit editorial lines retain the original wrapping and reading order. */
export default function TextLines({ lines }: { lines: ReactNode[] }) {
  return <>{lines.map((line, index) => <span className="text-mask" key={index}><span className="text-mask-inner" style={{ '--line-index': index } as CSSProperties}>{line}</span>{index < lines.length - 1 ? ' ' : null}</span>)}</>;
}

export function TextWords({ text }: { text: string }) {
  return <>{text.split(' ').map((word, index) => <span key={index}><span className="word-mask"><span className="text-mask-inner" style={{ '--line-index': Math.min(index, 4) } as CSSProperties}>{word}</span></span>{' '}</span>)}</>;
}
