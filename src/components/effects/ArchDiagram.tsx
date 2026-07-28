import { useEffect, useRef } from 'react';
import './ArchDiagram.css';

// Center of diagram
const CX = 340;
const CY = 155;

const systems = [
  { id: 1, cx: 75,  cy: 48,  lx: 75,  ly: 20,  anchor: 'middle', label: 'WORLD OFFICE',  sub: 'contabilidad',    above: true  },
  { id: 2, cx: 605, cy: 48,  lx: 605, ly: 20,  anchor: 'middle', label: 'LOBBY PMS',      sub: 'reservas',        above: true  },
  { id: 3, cx: 652, cy: 155, lx: 635, ly: 150, anchor: 'end',    label: 'WHATSAPP + IA',  sub: '· Claude Haiku',  above: false },
  { id: 4, cx: 522, cy: 270, lx: 522, ly: 292, anchor: 'middle', label: 'CHANNEL MGR',    sub: 'OTAs · Booking',  above: false },
  { id: 5, cx: 158, cy: 270, lx: 158, ly: 292, anchor: 'middle', label: 'RFID WRAPPER',   sub: 'cerraduras',      above: false },
  { id: 6, cx: 28,  cy: 155, lx: 44,  ly: 150, anchor: 'start',  label: 'WOMPI',          sub: 'pasarela pagos',  above: false },
];

export function ArchDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      svgRef.current?.classList.add('arch-active');
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          svgRef.current?.classList.add('arch-active');
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    if (svgRef.current) obs.observe(svgRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="arch-diagram"
      viewBox="0 0 680 315"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Diagrama de arquitectura: seis sistemas conectados al Panel Central"
    >
      <defs>
        <filter id="arch-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines — draw from center outward */}
      {systems.map((s) => (
        <line
          key={`line-${s.id}`}
          className={`arch-line arch-line-${s.id}`}
          x1={CX} y1={CY}
          x2={s.cx} y2={s.cy}
          stroke="#00f0ff"
          strokeWidth="0.8"
          fill="none"
        />
      ))}

      {/* System nodes */}
      {systems.map((s) => (
        <g key={`node-${s.id}`} className={`arch-node arch-node-${s.id}`} filter="url(#arch-glow)">
          <circle cx={s.cx} cy={s.cy} r="4.5" fill="#00f0ff" />
          {/* Main label */}
          <text
            x={s.lx}
            y={s.ly}
            textAnchor={s.anchor as 'middle' | 'start' | 'end'}
            className="arch-label"
          >
            {s.label}
          </text>
          {/* Sublabel */}
          <text
            x={s.lx}
            y={s.above ? s.ly + 11 : s.ly + 13}
            textAnchor={s.anchor as 'middle' | 'start' | 'end'}
            className="arch-sublabel"
          >
            {s.sub}
          </text>
        </g>
      ))}

      {/* Center: PANEL CENTRAL */}
      <g className="arch-center" filter="url(#arch-glow)">
        <rect x={CX - 72} y={CY - 20} width="144" height="40" className="arch-center-rect" />
        <text x={CX} y={CY + 5} textAnchor="middle" className="arch-center-label">
          PANEL CENTRAL
        </text>
      </g>
    </svg>
  );
}
