import { useEffect, useRef } from 'react';
import './TextReveal.css';

interface Props {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const letters =
      containerRef.current?.querySelectorAll<HTMLElement>('.tr-letter');
    if (!letters) return;

    letters.forEach((letter, i) => {
      const t = delay + i * 90;

      letter.style.clipPath = 'inset(100% 0 0 0)';
      letter.style.filter = 'blur(8px)';
      letter.style.transform = 'translateY(20px)';
      letter.style.opacity = '0';

      setTimeout(
        () => {
          letter.style.transition = 'none';
          letter.style.transform = 'translateY(20px) skewX(10deg)';
        },
        Math.max(0, t - 40)
      );

      setTimeout(() => {
        letter.style.transition =
          'clip-path 0.45s cubic-bezier(0.16,1,0.3,1), filter 0.45s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease';
        letter.style.clipPath = 'inset(0% 0 0 0)';
        letter.style.filter = 'blur(0px)';
        letter.style.transform = 'translateY(0) skewX(0deg)';
        letter.style.opacity = '1';
      }, t);
    });
  }, [text, delay]);

  return (
    <span ref={containerRef} className={`tr-container ${className}`}>
      {text.split('').map((char, i) => (
        <span key={i} className="tr-letter">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
