export function CircuitBackground() {
  return (
    <svg
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.06,
      }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <g stroke="#00f0ff" strokeWidth="0.8" fill="none">
        {/* TRAZOS HORIZONTALES */}
        <line x1="0" y1="120" x2="220" y2="120" />
        <line x1="260" y1="120" x2="480" y2="120" />
        <line x1="520" y1="120" x2="780" y2="120" />
        <line x1="820" y1="120" x2="1100" y2="120" />
        <line x1="1140" y1="120" x2="1440" y2="120" />

        <line x1="0" y1="280" x2="160" y2="280" />
        <line x1="200" y1="280" x2="440" y2="280" />
        <line x1="480" y1="280" x2="700" y2="280" />
        <line x1="740" y1="280" x2="960" y2="280" />
        <line x1="1000" y1="280" x2="1200" y2="280" />
        <line x1="1240" y1="280" x2="1440" y2="280" />

        <line x1="0" y1="450" x2="300" y2="450" />
        <line x1="340" y1="450" x2="600" y2="450" />
        <line x1="640" y1="450" x2="880" y2="450" />
        <line x1="920" y1="450" x2="1160" y2="450" />
        <line x1="1200" y1="450" x2="1440" y2="450" />

        <line x1="0" y1="620" x2="200" y2="620" />
        <line x1="240" y1="620" x2="520" y2="620" />
        <line x1="560" y1="620" x2="800" y2="620" />
        <line x1="840" y1="620" x2="1080" y2="620" />
        <line x1="1120" y1="620" x2="1440" y2="620" />

        <line x1="0" y1="800" x2="360" y2="800" />
        <line x1="400" y1="800" x2="680" y2="800" />
        <line x1="720" y1="800" x2="1000" y2="800" />
        <line x1="1040" y1="800" x2="1300" y2="800" />
        <line x1="1340" y1="800" x2="1440" y2="800" />

        {/* TRAZOS VERTICALES */}
        <line x1="220" y1="0" x2="220" y2="120" />
        <line x1="220" y1="160" x2="220" y2="280" />
        <line x1="480" y1="120" x2="480" y2="280" />
        <line x1="780" y1="0" x2="780" y2="120" />
        <line x1="780" y1="160" x2="780" y2="280" />
        <line x1="1100" y1="120" x2="1100" y2="280" />

        <line x1="160" y1="280" x2="160" y2="450" />
        <line x1="440" y1="280" x2="440" y2="450" />
        <line x1="700" y1="280" x2="700" y2="450" />
        <line x1="960" y1="280" x2="960" y2="450" />
        <line x1="1200" y1="280" x2="1200" y2="450" />

        <line x1="300" y1="450" x2="300" y2="620" />
        <line x1="600" y1="450" x2="600" y2="620" />
        <line x1="880" y1="450" x2="880" y2="620" />
        <line x1="1160" y1="450" x2="1160" y2="620" />

        <line x1="200" y1="620" x2="200" y2="800" />
        <line x1="520" y1="620" x2="520" y2="800" />
        <line x1="800" y1="620" x2="800" y2="800" />
        <line x1="1080" y1="620" x2="1080" y2="800" />
        <line x1="1300" y1="800" x2="1300" y2="900" />

        {/* NODOS SOLIDOS */}
        <circle cx="220" cy="120" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="480" cy="120" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="780" cy="120" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="1100" cy="120" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="160" cy="280" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="440" cy="280" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="700" cy="280" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="960" cy="280" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="1200" cy="280" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="300" cy="450" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="600" cy="450" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="880" cy="450" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="1160" cy="450" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="200" cy="620" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="520" cy="620" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="800" cy="620" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="1080" cy="620" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="360" cy="800" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="680" cy="800" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="1000" cy="800" r="3" fill="#00f0ff" stroke="none" />
        <circle cx="1300" cy="800" r="3" fill="#00f0ff" stroke="none" />

        {/* NODOS GRANDES */}
        <circle cx="220" cy="120" r="6" fill="none" strokeWidth="0.8" />
        <circle cx="780" cy="280" r="6" fill="none" strokeWidth="0.8" />
        <circle cx="600" cy="450" r="6" fill="none" strokeWidth="0.8" />
        <circle cx="1160" cy="620" r="6" fill="none" strokeWidth="0.8" />
        <circle cx="360" cy="800" r="6" fill="none" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
