import React from 'react';
import './Badges.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const badges = [
  {
    id: 'ai-essentials',
    name: 'Artificial Intelligence Essentials V2',
    cat: 'IA',
    date: 'Feb 2026',
  },
  {
    id: 'gen-ai',
    name: 'Generative AI Essentials',
    cat: 'IA',
    date: 'Feb 2026',
  },
  {
    id: 'prompt-eng',
    name: 'Generative AI: Prompt Engineering',
    cat: 'IA',
    date: 'Feb 2026',
  },
  {
    id: 'python-ds',
    name: 'Python for Data Science and AI',
    cat: 'IA',
    date: 'Mar 2026',
  },
  {
    id: 'python-project',
    name: 'Python Project for AI & App Development',
    cat: 'IA',
    date: 'Mar 2026',
  },
  {
    id: 'software-eng',
    name: 'Software Engineering Essentials',
    cat: 'DEV',
    date: 'Feb 2026',
  },
  {
    id: 'node',
    name: 'Node and Express Essentials',
    cat: 'DEV',
    date: 'Mar 2026',
  },
  {
    id: 'react',
    name: 'Front-end Development with React V2',
    cat: 'DEV',
    date: 'Mar 2026',
  },
  {
    id: 'git',
    name: 'Git and GitHub Essentials',
    cat: 'DEV',
    date: 'Mar 2026',
  },
  {
    id: 'cloud',
    name: 'Introduction to Cloud Computing',
    cat: 'CLOUD',
    date: 'Feb 2026',
  },
  {
    id: 'fullstack',
    name: 'IBM Full Stack Software Developer',
    cat: 'CERT',
    date: 'En progreso',
    inProgress: true,
  },
];

const catColor: Record<string, string> = {
  IA: 'cyan',
  DEV: 'purple',
  CLOUD: 'green',
  CERT: 'gold',
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
            10 badges activos + certificado profesional en progreso.{' '}
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
              href={CREDLY}
              target="_blank"
              rel="noopener"
              className={`badge-card ${b.inProgress ? 'badge-card--progress' : ''}`}
            >
              <div className="badge-card-top">
                <span className={`badge-cat badge-cat--${catColor[b.cat]}`}>
                  {b.cat}
                </span>
                {b.inProgress && <span className="badge-progress-dot" />}
              </div>
              <div className="badge-icon">
                <span className="badge-icon-ibm">IBM</span>
              </div>
              <div className="badge-name">{b.name}</div>
              <div className="badge-meta">
                <span className="badge-issuer">IBM · Coursera</span>
                <span className="badge-date">{b.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
