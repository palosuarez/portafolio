import React from 'react';
import { CircuitSignature } from '../effects/CircuitSignature';
import './About.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const timeline = [
  {
    period: 'Ago 2023 → Ago 2025',
    role: 'Especialista Digital & Automatización IA',
    org: 'Colegio Superior Americano · Bogotá',
    desc: 'Pipelines de agentes LLM para automatizar línea gráfica, publicación y corrección de estilo. Gestión de redes sociales e imagen corporativa. +5K comunidad activa.',
    current: true,
  },
  {
    period: 'Feb 2020 → Ene 2022',
    role: 'Coordinador Infraestructura TI',
    org: 'ASIGMA Telecomunicaciones',
    desc: 'Data Centers, fibra óptica y redes para Telefónica. Operación crítica 24/7 con SLA enterprise.',
    current: false,
  },
  {
    period: 'Feb 2021 → Dic 2021',
    role: 'Profesional de Apoyo',
    org: 'Secretaría Distrital de Movilidad · Bogotá',
    desc: 'Plataformas digitales y gestión documental en entorno gubernamental.',
    current: false,
  },
  {
    period: 'Mar 2017 → Oct 2019',
    role: 'Contratista TICs y Comunicaciones',
    org: 'Alcaldía de Sogamoso · Boyacá',
    desc: 'Arquitectura digital institucional. Datos abiertos, streaming y participación ciudadana. Sello de Excelencia MinTIC — pioneros en Boyacá.',
    current: false,
  },
];

export function About() {
  const ref = useScrollReveal();
  return (
    <section
      className="about reveal"
      id="sobre-mi"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="about-inner">
        <div className="about-header">
          <span className="section-tag">// SOBRE MÍ</span>
          <h2 className="section-title">
            Quién soy.
            <br />
            Cómo trabajo.
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-left">
            <p className="about-text">
              Soy <strong>Pablo Suárez</strong> — developer fullstack con
              background en infraestructura TI, gobierno digital y
              automatización con IA. No solo escribo código: entiendo el
              negocio, el SLA y el día dos.
            </p>
            <p className="about-text">
              Construyo con <strong>Node.js, TypeScript, Docker y APIs</strong>{' '}
              como piso mínimo. Encima agrego IA, observabilidad y diseño cuando
              el problema lo justifica.
            </p>
            <p className="about-text">
              Actualmente en{' '}
              <strong>
                Ingeniería de Software en Politécnico Grancolombiano
              </strong>
              , aplicando en tiempo real lo que construyo. Disponible para roles
              fullstack donde la integración de IA y la calidad operativa sean
              prioridad.
            </p>

            <div className="about-signature">
              <CircuitSignature />
            </div>
          </div>

          <div className="about-right">
            <div className="timeline">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`timeline-item ${item.current ? 'timeline-item--current' : ''}`}
                >
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-period">{item.period}</div>
                    <div className="timeline-role">{item.role}</div>
                    <div className="timeline-org">{item.org}</div>
                    <div className="timeline-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
