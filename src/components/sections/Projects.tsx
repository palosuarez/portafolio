import React from 'react';
import { CircuitP } from '../effects/CircuitP';
import './Projects.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const projects = [
  {
    id: '01',
    featured: true,
    name: 'Automation Pipeline Suite',
    desc: 'Solución modular de automatización avanzada. Pipeline completo Node.js → named pipe → DLL C# con hook de bajo nivel. Arquitectura de microservicios en Docker, comunicación eficiente entre procesos y observabilidad estructurada desde el inicio.',
    tags: ['Node.js', 'TypeScript', 'Docker', 'C#', 'Lua', 'Named Pipes'],
    status: 'En desarrollo',
    statusGreen: true,
    link: 'https://github.com/palosuarez',
  },

  {
    id: '02',
    featured: false,
    name: 'Gobierno Digital — Alcaldía de Sogamoso',
    desc: 'Como Contratista TICs articulé todos los actores institucionales para cumplir la Ley 1712 de Transparencia y Acceso a la Información Pública. Coordiné la arquitectura digital del municipio: sitios oficiales, datos abiertos, streaming de rendición de cuentas y estrategia Vive Digital. El municipio recibió el Sello de Excelencia MinTIC — primero en Boyacá en lograrlo vía participación ciudadana digital.',
    tags: [
      'Gobierno Digital',
      'Datos Abiertos',
      'Ley 1712',
      'Vive Digital',
      'MinTIC',
      'Streaming',
    ],
    status: 'Sello MinTIC',
    statusGreen: true,
    link: 'https://www.sogamoso-boyaca.gov.co/',
  },
  {
    id: '03',
    featured: false,
    name: 'Automatización de Contenidos IA — CSA',
    desc: 'Diseñé e implementé un pipeline de agentes LLM para automatizar la línea gráfica, publicación, edición y corrección de estilo del Colegio Superior Americano. El sistema consume contexto institucional del sitio web para mantener coherencia de marca. Gestión completa de redes sociales y comunicación corporativa — estrategia omnicanal que escaló la comunidad a +5K.',
    tags: [
      'Claude API',
      'LLM Agents',
      'Línea Gráfica',
      'Redes Sociales',
      'WordPress',
      'Automatización',
      'Corrector de Estilo',
    ],
    status: 'En producción',
    statusGreen: true,
    link: 'https://superioramericano.edu.co',
  },
  {
    id: '04',
    featured: false,
    name: 'Infraestructura Data Center',
    desc: 'Coordinación de Data Centers para ASIGMA Telecomunicaciones. Fibra óptica, cableado estructurado y contratos gubernamentales de infraestructura crítica.',
    tags: ['Infraestructura', 'Fibra Óptica', 'Data Center', 'ITIL'],
    status: 'Completado',
    statusGreen: false,
    link: null,
  },
  {
    id: '05',
    featured: false,
    name: 'Este portafolio',
    desc: 'Diseñado y construido desde cero. React + Vite + TypeScript, animaciones SVG a mano, CI/CD con GitHub Actions. Sin templates — cada línea tiene una razón.',
    tags: ['React', 'TypeScript', 'SVG', 'Vite', 'Claude API'],
    status: 'Live',
    statusGreen: true,
    link: 'https://github.com/palosuarez',
  },
];

export function Projects() {
  const ref = useScrollReveal();
  return (
    <section
      className="projects reveal"
      id="proyectos"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="projects-inner">
        <div className="projects-header">
          <span className="section-tag">// PROYECTOS</span>
          <h2 className="section-title">
            Sistemas que construí
            <br />y que corren en producción.
          </h2>
          <p className="section-sub">Cada uno resolvió un problema real.</p>
        </div>

        <div className="projects-list">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`project-row ${p.featured ? 'project-row--featured' : ''}`}
            >
              <div className="project-row-left">
                <span className="project-num">{p.id}</span>
                {p.featured && (
                  <div className="project-logo">
                    <CircuitP />
                  </div>
                )}
              </div>

              <div className="project-row-center">
                <div className="project-row-top">
                  <h3 className="project-name">{p.name}</h3>
                  <span
                    className={`project-status ${p.statusGreen ? 'project-status--green' : ''}`}
                  >
                    <span className="project-status-dot" />
                    {p.status}
                  </span>
                </div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="stack-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-row-right">
                {p.link ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener"
                    className="project-link"
                  >
                    Ver →
                  </a>
                ) : (
                  <span className="project-link project-link--disabled">
                    Privado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
