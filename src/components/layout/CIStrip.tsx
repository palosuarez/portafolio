import { useState, useEffect } from 'react';
import './CIStrip.css';

const badges = [
  { label: 'CI passing', green: true },
  { label: 'docker:latest', green: true },
  { label: 'node 20 LTS', green: true },
  { label: 'typescript strict', green: false },
  { label: 'uptime 99.9%', green: false },
];

const repeated = [...badges, ...badges];

export function CIStrip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`ci-strip ${visible ? 'ci-strip--visible' : ''}`}>
      <span className="ci-dot" />
      <span className="ci-status">pan_dev</span>
      <span className="ci-sep" />
      <div className="ci-ticker">
        <div className="ci-ticker-track">
          {repeated.map((b, i) => (
            <span
              key={i}
              className={`ci-badge ${b.green ? 'ci-badge-green' : ''}`}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
