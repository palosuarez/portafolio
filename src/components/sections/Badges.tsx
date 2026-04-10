import React from 'react';
import './Badges.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { badges } from '../../data';

const catColor: Record<string, string> = {
  ai: 'cyan',
  frontend: 'purple',
  backend: 'purple',
  devops: 'green',
  cloud: 'green',
};

const CREDLY = 'https://credly.com/users/pablo-andres-suarez-sandoval';

export function Badges() {
  const ref = useScrollReveal();
  return (
    <section
      className="badges reveal"
      id="badges"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="badges-inner">
        <div className="badges-header">
          <span className="section-tag">// BADGES IBM · COURSERA</span>
          <h2 className="section-title">
            Credenciales verificables
            <br />
            en Credly.
          </h2>
          <p className="section-sub">
            {badges.length} badges activos + certificación profesional completada.{' '}
            <a
              href={CREDLY}
              target="_blank"
              rel="noopener"
              className="badges-credly-link"
            >
              Ver perfil completo →
            </a>
          </p>
        </div>

        <div className="badges-grid">
          {badges.map((b) => (
            <a
              key={b.id}
              href={b.credlyUrl}
              target="_blank"
              rel="noopener"
              className={`badge-card ${b.inProgress ? 'badge-card--progress' : ''}`}
            >
              <div className="badge-card-top">
                <span
                  className={`badge-cat badge-cat--${catColor[b.category] ?? 'gold'}`}
                >
                  {b.category.toUpperCase()}
                </span>
                {b.inProgress && <span className="badge-progress-dot" />}
              </div>
              <div className="badge-icon">
                <span className="badge-icon-ibm">IBM</span>
              </div>
              <div className="badge-name">{b.name}</div>
              <div className="badge-meta">
                <span className="badge-issuer">{b.issuer}</span>
                <span className="badge-date">{b.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
