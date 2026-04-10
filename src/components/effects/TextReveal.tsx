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

    const timers: number[] = [];

    letters.forEach((letter, i) => {
      const t = delay + i * 65;

      letter.style.clipPath = 'inset(0 0 100% 0)';
      letter.style.filter = 'blur(10px)';
      letter.style.transform = 'translateY(15px) scale(1.03)';
      letter.style.opacity = '0';
      letter.style.textShadow = '0 0 0 rgba(0, 240, 255, 0)';

      timers.push(window.setTimeout(
        () => {
          letter.classList.add('tr-letter--preflash');
        },
        Math.max(0, t - 120)
      ));

      timers.push(window.setTimeout(
        () => {
          letter.classList.remove('tr-letter--preflash');
          letter.style.transition =
            'clip-path 0.62s cubic-bezier(0.16, 1, 0.3, 1), filter 0.62s ease, transform 0.62s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, text-shadow 0.62s ease';
          letter.style.clipPath = 'inset(0% 0 0 0)';
          letter.style.filter = 'blur(0px)';
          letter.style.transform = 'translateY(0) scale(1)';
          letter.style.opacity = '1';
          letter.style.textShadow =
            '0 0 12px rgba(0, 240, 255, 0.36), 0 0 22px rgba(0, 240, 255, 0.2)';
        },
        t
      ));

      timers.push(window.setTimeout(
        () => {
          letter.style.transition = 'text-shadow 1s ease';
          letter.style.textShadow =
            '0 0 4px rgba(0, 240, 255, 0.24), 0 0 10px rgba(0, 240, 255, 0.12)';
        },
        t + 540
      ));
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [text, delay]);

  return (
    <span ref={containerRef} className={`tr-container ${className}`}>
      {text.split('').map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={`tr-letter ${char === ' ' ? 'tr-letter--space' : ''}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
