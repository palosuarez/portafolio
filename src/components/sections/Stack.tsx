import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../layout/SectionHeader';
import './Stack.css';

const blocks = [
  {
    num: '01',
    title: 'NÚCLEO',
    subtitle: 'Integración de Sistemas',
    priority: 'PRIORIDAD',
    items: [
      'APIs REST y servicios externos',
      'Wrappers sobre sistemas legacy sin API',
      'Automatización de flujos operativos',
      'Arquitectura de microservicios',
      'Bases de datos · SQL + NoSQL',
      'WhatsApp Business API + IA',
      'Channel managers · OTAs hoteleras',
      'Pasarelas de pago · Wompi · PayU',
      'Infraestructura de datos y telecomunicaciones',
    ],
    featured: true,
  },
  {
    num: '02',
    title: 'STACK',
    subtitle: 'de soporte',
    priority: 'SOPORTE',
    items: [
      'React · Vite · TypeScript',
      'Node.js · Fastify',
      'Python',
      'Docker · CI/CD',
      'PostgreSQL · MongoDB',
      'Redis · pgvector',
    ],
    featured: false,
  },
  {
    num: '03',
    title: 'FORMACIÓN',
    subtitle: '',
    priority: 'BASE',
    items: [
      'IBM Full Stack Developer',
      'IBM Generative AI Engineering',
      'Politécnico Grancolombiano',
      'Ing. de Software · en curso',
    ],
    featured: false,
  },
];

export function Stack() {
  const ref = useScrollReveal();

  return (
    <section
      className="skills reveal"
      id="stack"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="skills-inner">
        <SectionHeader
          num="01"
          title="SKILLS"
          subtitle="El stack al servicio del problema — no al revés."
        />

        <div className="skills-grid">
          {blocks.map((block) => (
            <div
              className={`skills-block ${block.featured ? 'skills-block--featured' : ''}`}
              key={block.num}
            >
              {/* Geometric accent — Bauhaus circle marker */}
              <span className="skills-block-geo" aria-hidden="true" />

              <div className="skills-block-head">
                <span className="skills-block-num">{block.num}</span>
                <span className="skills-block-title">{block.title}</span>
                {block.subtitle && (
                  <span className="skills-block-sub">{block.subtitle}</span>
                )}
              </div>

              <div className="skills-block-rule" />

              <ul className="skills-block-list">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="skills-block-footer">
                <span className="skills-block-priority">{block.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
