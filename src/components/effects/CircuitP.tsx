import './CircuitP.css';

export function CircuitP() {
  return (
    <div className="circuit-p-wrapper">
      <svg
        viewBox="0 0 320 420"
        xmlns="http://www.w3.org/2000/svg"
        className="circuit-p-svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          filter="url(#glow)"
          stroke="#00f0ff"
          fill="none"
          strokeLinecap="round"
        >
          {/* SPINE VERTICAL — izquierda */}
          <line
            className="cp-line cp-l1"
            x1="80"
            y1="40"
            x2="80"
            y2="380"
            strokeWidth="1.5"
          />

          {/* TOP HORIZONTAL */}
          <line
            className="cp-line cp-l2"
            x1="80"
            y1="40"
            x2="220"
            y2="40"
            strokeWidth="1.5"
          />

          {/* RIGHT VERTICAL TOP */}
          <line
            className="cp-line cp-l3"
            x1="220"
            y1="40"
            x2="220"
            y2="200"
            strokeWidth="1.5"
          />

          {/* MIDDLE HORIZONTAL */}
          <line
            className="cp-line cp-l4"
            x1="80"
            y1="200"
            x2="220"
            y2="200"
            strokeWidth="1.5"
          />

          {/* BRANCH — top derecha saliendo */}
          <line
            className="cp-line cp-l5"
            x1="220"
            y1="40"
            x2="290"
            y2="40"
            strokeWidth="0.8"
          />
          <line
            className="cp-line cp-l6"
            x1="290"
            y1="40"
            x2="290"
            y2="100"
            strokeWidth="0.8"
          />

          {/* BRANCH — middle derecha saliendo */}
          <line
            className="cp-line cp-l7"
            x1="220"
            y1="200"
            x2="290"
            y2="200"
            strokeWidth="0.8"
          />
          <line
            className="cp-line cp-l8"
            x1="290"
            y1="200"
            x2="290"
            y2="260"
            strokeWidth="0.8"
          />

          {/* BRANCH — spine abajo izquierda */}
          <line
            className="cp-line cp-l9"
            x1="80"
            y1="300"
            x2="20"
            y2="300"
            strokeWidth="0.8"
          />
          <line
            className="cp-line cp-l10"
            x1="80"
            y1="380"
            x2="20"
            y2="380"
            strokeWidth="0.8"
          />

          {/* BRANCH — spine arriba izquierda */}
          <line
            className="cp-line cp-l11"
            x1="80"
            y1="120"
            x2="20"
            y2="120"
            strokeWidth="0.8"
          />

          {/* NODOS PRINCIPALES */}
          <circle
            className="cp-node cp-n1"
            cx="80"
            cy="40"
            r="4"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-n2"
            cx="220"
            cy="40"
            r="4"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-n3"
            cx="220"
            cy="200"
            r="4"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-n4"
            cx="80"
            cy="200"
            r="4"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-n5"
            cx="80"
            cy="380"
            r="4"
            fill="#00f0ff"
          />

          {/* NODOS ANILLO — componentes */}
          <circle
            className="cp-ring cp-r1"
            cx="220"
            cy="40"
            r="9"
            strokeWidth="0.8"
          />
          <circle
            className="cp-ring cp-r2"
            cx="220"
            cy="200"
            r="9"
            strokeWidth="0.8"
          />
          <circle
            className="cp-ring cp-r3"
            cx="80"
            cy="380"
            r="9"
            strokeWidth="0.8"
          />

          {/* NODOS BRANCH */}
          <circle
            className="cp-node cp-nb1"
            cx="290"
            cy="40"
            r="3"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-nb2"
            cx="290"
            cy="100"
            r="3"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-nb3"
            cx="290"
            cy="200"
            r="3"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-nb4"
            cx="290"
            cy="260"
            r="3"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-nb5"
            cx="20"
            cy="120"
            r="3"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-nb6"
            cx="20"
            cy="300"
            r="3"
            fill="#00f0ff"
          />
          <circle
            className="cp-node cp-nb7"
            cx="20"
            cy="380"
            r="3"
            fill="#00f0ff"
          />

          {/* PUNTO CENTRAL PULSANTE */}
          <circle className="cp-pulse" cx="150" cy="120" r="5" fill="#00f0ff" />
          <circle
            className="cp-pulse-ring"
            cx="150"
            cy="120"
            r="5"
            strokeWidth="1"
          />
        </g>
      </svg>

      {/* Label flotante */}
    </div>
  );
}
