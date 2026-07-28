export function CircuitBackground() {
  const nodes = [
    { cx: 220, cy: 120 },
    { cx: 480, cy: 120 },
    { cx: 780, cy: 120 },
    { cx: 1100, cy: 120 },
    { cx: 160, cy: 280 },
    { cx: 440, cy: 280 },
    { cx: 700, cy: 280 },
    { cx: 960, cy: 280 },
    { cx: 1200, cy: 280 },
    { cx: 300, cy: 450 },
    { cx: 600, cy: 450 },
    { cx: 880, cy: 450 },
    { cx: 1160, cy: 450 },
    { cx: 200, cy: 620 },
    { cx: 520, cy: 620 },
    { cx: 800, cy: 620 },
    { cx: 1080, cy: 620 },
    { cx: 360, cy: 800 },
    { cx: 680, cy: 800 },
    { cx: 1000, cy: 800 },
    { cx: 1300, cy: 800 },
  ];

  const ringNodes = [
    { cx: 220, cy: 120, r: 6 },
    { cx: 780, cy: 280, r: 6 },
    { cx: 600, cy: 450, r: 6 },
    { cx: 1160, cy: 620, r: 6 },
    { cx: 360, cy: 800, r: 6 },
  ];

  // Energy streams follow actual grid paths
  const S1 = 'M0,120 L220,120 L220,280 L440,280 L440,450 L600,450 L600,620 L800,620 L800,800 L1000,800';
  const S2 = 'M1440,280 L1200,280 L1200,450 L960,450 L960,280 L780,280 L780,120 L480,120 L480,280 L160,280 L160,450';
  const S3 = 'M0,620 L200,620 L200,800 L360,800 L360,620 L520,620 L520,450 L700,450 L700,280 L960,280 L960,450 L1160,450';

  return (
    <svg
      className="circuit-bg-static"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <defs>
        <filter id="ebg-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Static grid */}
      <g className="circuit-bg-static-lines" stroke="#00f0ff" strokeWidth="0.8" fill="none">
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

        {nodes.map((node) => (
          <circle
            key={`node-${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r="3"
            fill="#00f0ff"
            stroke="none"
            className="circuit-bg-static-node"
          />
        ))}

        {ringNodes.map((node, i) => (
          <circle
            key={`ring-${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill="none"
            strokeWidth="0.8"
            className="circuit-bg-static-ring"
            style={{ animationDelay: `${-i * 0.72}s` }}
          />
        ))}
      </g>

      {/* Tesla energy streams */}
      <g className="circuit-energy" filter="url(#ebg-glow)">

        {/* Stream 1 — diagonal top-left → bottom-right, 9 s */}
        <g opacity="0.72">
          <circle r="2.5" fill="#00f0ff">
            <animateMotion dur="9s" repeatCount="indefinite" path={S1} />
          </circle>
          <circle r="1.7" fill="#00f0ff" opacity="0.45">
            <animateMotion dur="9s" begin="-0.38s" repeatCount="indefinite" path={S1} />
          </circle>
          <circle r="1.0" fill="#00f0ff" opacity="0.22">
            <animateMotion dur="9s" begin="-0.72s" repeatCount="indefinite" path={S1} />
          </circle>
        </g>

        {/* Stream 2 — right → left, 13 s, offset 4 s */}
        <g opacity="0.55">
          <circle r="2.2" fill="#00f0ff">
            <animateMotion dur="13s" begin="4s" repeatCount="indefinite" path={S2} />
          </circle>
          <circle r="1.5" fill="#00f0ff" opacity="0.45">
            <animateMotion dur="13s" begin="3.62s" repeatCount="indefinite" path={S2} />
          </circle>
          <circle r="0.9" fill="#00f0ff" opacity="0.22">
            <animateMotion dur="13s" begin="3.28s" repeatCount="indefinite" path={S2} />
          </circle>
        </g>

        {/* Stream 3 — middle weave, 11 s, offset 7 s */}
        <g opacity="0.45">
          <circle r="2.0" fill="#00f0ff">
            <animateMotion dur="11s" begin="7s" repeatCount="indefinite" path={S3} />
          </circle>
          <circle r="1.3" fill="#00f0ff" opacity="0.45">
            <animateMotion dur="11s" begin="6.65s" repeatCount="indefinite" path={S3} />
          </circle>
          <circle r="0.8" fill="#00f0ff" opacity="0.22">
            <animateMotion dur="11s" begin="6.32s" repeatCount="indefinite" path={S3} />
          </circle>
        </g>
      </g>
    </svg>
  );
}
