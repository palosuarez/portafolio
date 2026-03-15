import './CircuitSignature.css';

export function CircuitSignature() {
  return (
    <div className="sig-wrapper">
      <svg
        viewBox="0 0 520 140"
        xmlns="http://www.w3.org/2000/svg"
        className="sig-svg"
      >
        <defs>
          <filter id="glow-sig">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <style>
            {`@import url('https://fonts.googleapis.com/css2?family=Cormorant&display=swap');`}
          </style>
        </defs>

        <text
          x="10"
          y="90"
          fontFamily="'Cormorant', serif"
          fontSize="80"
          fill="none"
          stroke="#00f0ff"
          strokeWidth="1.2"
          filter="url(#glow-sig)"
          className="sig-text"
        >
          Pablo Suárez
        </text>

        {/* nodos en puntos clave */}
        <circle
          className="sig-node sig-node-1"
          cx="10"
          cy="90"
          r="3"
          fill="#00f0ff"
          stroke="none"
        />
        <circle
          className="sig-node sig-node-2"
          cx="260"
          cy="20"
          r="3"
          fill="#00f0ff"
          stroke="none"
        />
        <circle
          className="sig-node sig-node-3"
          cx="510"
          cy="75"
          r="3"
          fill="#00f0ff"
          stroke="none"
        />
        <circle
          className="sig-node sig-node-4"
          cx="380"
          cy="108"
          r="3"
          fill="#00f0ff"
          stroke="none"
        />

        {/* línea decorativa debajo */}
        <line
          className="sig-line"
          x1="10"
          y1="118"
          x2="380"
          y2="118"
          stroke="#00f0ff"
          strokeWidth="0.6"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
