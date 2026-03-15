import './CircuitName.css';

export function CircuitName() {
  return (
    <div className="cn-wrapper">
      {/* LÍNEA 1 — Pablo */}
      <svg
        viewBox="0 0 380 160"
        xmlns="http://www.w3.org/2000/svg"
        className="cn-svg"
      >
        <defs>
          <filter id="glow-name">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g
          filter="url(#glow-name)"
          stroke="#00f0ff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* P */}
          <path
            className="cn-path cn-p1"
            d="M 20,20 L 20,140"
            strokeWidth="2.5"
          />
          <path
            className="cn-path cn-p2"
            d="M 20,20 Q 75,18 77,60 Q 79,98 20,92"
            strokeWidth="2"
          />
          <circle
            className="cn-node cn-nd1"
            cx="20"
            cy="20"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd2"
            cx="20"
            cy="140"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-ring cn-rg1"
            cx="77"
            cy="60"
            r="6"
            strokeWidth="0.8"
          />

          {/* a */}
          <path
            className="cn-path cn-a1"
            d="M 125,62 Q 100,60 98,90 Q 96,120 122,120 Q 144,120 144,98 L 144,65"
            strokeWidth="2"
          />
          <path
            className="cn-path cn-a2"
            d="M 144,120 L 144,145"
            strokeWidth="2"
          />
          <circle
            className="cn-node cn-nd3"
            cx="144"
            cy="65"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd4"
            cx="144"
            cy="145"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />

          {/* b */}
          <path
            className="cn-path cn-b1"
            d="M 170,20 L 170,145"
            strokeWidth="2.5"
          />
          <path
            className="cn-path cn-b2"
            d="M 170,68 Q 218,62 220,95 Q 222,128 170,122"
            strokeWidth="2"
          />
          <circle
            className="cn-node cn-nd5"
            cx="170"
            cy="20"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd6"
            cx="170"
            cy="145"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-ring cn-rg2"
            cx="220"
            cy="95"
            r="6"
            strokeWidth="0.8"
          />

          {/* l */}
          <path
            className="cn-path cn-l1"
            d="M 248,20 L 248,138 Q 248,148 258,148"
            strokeWidth="2"
          />
          <circle
            className="cn-node cn-nd7"
            cx="248"
            cy="20"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd8"
            cx="265"
            cy="148"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />

          {/* o */}
          <path
            className="cn-path cn-o1"
            d="M 310,90 Q 310,62 288,62 Q 265,62 265,90 Q 265,118 288,118 Q 310,118 310,90"
            strokeWidth="2"
          />
          <circle
            className="cn-ring cn-rg3"
            cx="310"
            cy="90"
            r="5"
            strokeWidth="0.8"
          />
          <circle
            className="cn-ring cn-rg4"
            cx="265"
            cy="90"
            r="5"
            strokeWidth="0.8"
          />

          {/* punto separador */}
          <circle
            cx="345"
            cy="90"
            r="3.5"
            fill="#00f0ff"
            opacity="0.5"
            stroke="none"
            className="cn-node cn-nd9"
          />
        </g>
      </svg>

      {/* LÍNEA 2 — Suárez */}
      <svg
        viewBox="0 0 420 160"
        xmlns="http://www.w3.org/2000/svg"
        className="cn-svg"
      >
        <g
          filter="url(#glow-name)"
          stroke="#00f0ff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* S — mayúscula */}
          <path
            className="cn-path cn-s1"
            d="M 62,38 Q 62,22 45,22 Q 15,22 18,52 Q 20,72 45,72 Q 75,72 72,102 Q 70,128 42,128 Q 16,128 14,112"
            strokeWidth="2.5"
          />
          <circle
            className="cn-node cn-nd10"
            cx="62"
            cy="38"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd11"
            cx="14"
            cy="112"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />

          {/* u */}
          <path
            className="cn-path cn-u1"
            d="M 90,38 L 90,100 Q 90,130 112,130 Q 134,130 134,100 L 134,38"
            strokeWidth="2"
          />
          <circle
            className="cn-node cn-nd12"
            cx="90"
            cy="38"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd13"
            cx="134"
            cy="38"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-ring cn-rg5"
            cx="112"
            cy="130"
            r="6"
            strokeWidth="0.8"
          />

          {/* á */}
          <path
            className="cn-path cn-aa1"
            d="M 190,62 Q 165,60 163,88 Q 161,116 185,116 Q 207,116 207,94 L 207,65"
            strokeWidth="2"
          />
          <path
            className="cn-path cn-aa2"
            d="M 207,116 L 207,145"
            strokeWidth="2"
          />
          <path
            className="cn-path cn-aa3"
            d="M 172,46 L 182,30"
            strokeWidth="1.2"
            opacity="0.8"
          />
          <circle
            className="cn-node cn-nd14"
            cx="207"
            cy="65"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd15"
            cx="207"
            cy="145"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd16"
            cx="182"
            cy="30"
            r="2.5"
            fill="#00f0ff"
            stroke="none"
          />

          {/* r */}
          <path
            className="cn-path cn-r1"
            d="M 228,62 L 228,145"
            strokeWidth="2"
          />
          <path
            className="cn-path cn-r2"
            d="M 228,80 Q 250,60 272,65"
            strokeWidth="2"
          />
          <circle
            className="cn-node cn-nd17"
            cx="228"
            cy="62"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd18"
            cx="228"
            cy="145"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd19"
            cx="272"
            cy="65"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />

          {/* e */}
          <path
            className="cn-path cn-e1"
            d="M 290,90 L 338,90 Q 340,62 315,58 Q 288,55 287,90 Q 286,124 314,124 Q 330,124 338,112"
            strokeWidth="2"
          />
          <circle
            className="cn-node cn-nd20"
            cx="290"
            cy="90"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd21"
            cx="338"
            cy="112"
            r="3.5"
            fill="#00f0ff"
            stroke="none"
          />

          {/* z */}
          <path
            className="cn-path cn-z1"
            d="M 355,58 L 408,58 L 355,122 L 410,122"
            strokeWidth="2.5"
          />
          <circle
            className="cn-node cn-nd22"
            cx="355"
            cy="58"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd23"
            cx="408"
            cy="58"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd24"
            cx="355"
            cy="122"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
          <circle
            className="cn-node cn-nd25"
            cx="410"
            cy="122"
            r="4"
            fill="#00f0ff"
            stroke="none"
          />
        </g>
      </svg>
    </div>
  );
}
