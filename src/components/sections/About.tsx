import React from 'react';
import './About.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const timeline = [
  {
    period: 'Ago 2023 → Ago 2024',
    role: 'Community Manager',
    org: 'Colegio Superior Americano · Bogotá · Presencial',
    desc: 'Diseñé e implementé la estrategia de comunicaciones digitales de la institución: gestión integral de redes sociales y sitio web, contenido multimedia con Adobe Creative Suite, calendario editorial, métricas de engagement y campañas.',
    current: false,
  },
  {
    period: 'Feb 2021 → Ago 2022',
    role: 'Coordinador de mantenimiento',
    org: 'ASIGMA SAS · Área metropolitana de Bogotá D.C. · Presencial',
    desc: 'Coordiné mantenimiento preventivo/correctivo y trabajos especiales para proyecto TELEFÓNICA en zona centro-sur. Gestión de energía crítica (UPS, rectificadores, bancos de baterías, motogeneradores, clima de precisión) y logística nacional con soporte a ATC, Claro y ETB.',
    current: false,
  },
  {
    period: 'Trayectoria técnica',
    role: 'Infraestructura + Desarrollo Full Stack',
    org: 'Educativo · Gubernamental · Telecomunicaciones',
    desc: 'Experiencia transversal construyendo soluciones donde convergen operación crítica, producto digital y calidad de ejecución para objetivos de negocio.',
    current: false,
  },
];

const quickFacts = [
  'IBM Certified Full Stack Software Developer',
  '~8 años de experiencia técnica',
  'Bogotá, Distrito Capital, Colombia',
  'Ingeniería de Software · Politécnico Grancolombiano',
  'Sectores: educativo, gubernamental y telecomunicaciones',
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
            <div className="about-facts" aria-label="Resumen rápido de perfil">
              {quickFacts.map((fact) => (
                <span key={fact} className="about-fact-pill">
                  {fact}
                </span>
              ))}
            </div>
            <p className="about-text">
              <strong>Pablo Suárez</strong> · Full Stack Developer · IBM
              Certified.
            </p>
            <p className="about-text">
              Empecé en salas de servidores y telecomunicaciones: infraestructura
              que no perdona errores. Con el tiempo entendí que el problema real
              no era solo técnico: era la falta de comunicación entre sistemas,
              datos tardíos y decisiones sin visibilidad.
            </p>
            <p className="about-text">
              Eso me llevó al desarrollo end-to-end. Hoy construyo sistemas
              completos desde arquitectura hasta interfaz, con foco en datos en
              tiempo real y pipelines que operan bajo presión.
            </p>
            <p className="about-text">
              Soy <strong>IBM Certified Full Stack Software Developer</strong>,
              estudio{' '}
              <strong>
                Ingeniería de Software en Politécnico Grancolombiano
              </strong>
              y acumulo ~8 años de experiencia técnica en infraestructura,
              desarrollo de producto y comunicación digital.
            </p>
            <p className="about-text">
              Stack principal: <strong>Node.js · TypeScript · React · Docker ·
              Kubernetes · OpenShift · Python · Django · C# · Linux · CI/CD</strong>.
              <br />
              Filosofía: <strong>"Del caos al sistema"</strong>.
            </p>
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
