import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SectionHeader } from '../layout/SectionHeader';
import { ArchDiagram } from '../effects/ArchDiagram';
import './CaseStudy.css';

const stackItems = [
  'World Office API',
  'Lobby PMS',
  'WhatsApp + Claude Haiku',
  'Wrapper RFID',
  'Channel Manager',
  'Wompi · PayU',
];

const roadmapItems = [
  'Agente de voz IA — recibe llamadas, agenda reservas, escala a humano',
  'Automatización completa de check-in / check-out',
];

export function CaseStudy() {
  const ref = useScrollReveal();

  return (
    <section
      className="cs reveal"
      id="proyectos"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="cs-inner">
        <SectionHeader
          num="02"
          title="CASO DE ESTUDIO"
          subtitle="Hotel boutique · Chapinero, Bogotá · 16 habitaciones · Cliente confidencial"
        />

        <div className="cs-grid">

          {/* PROBLEMA */}
          <div className="cs-row">
            <div className="cs-label">PROBLEMA</div>
            <div className="cs-content">
              <p>
                Un hotel boutique en Bogotá operando con cinco sistemas
                completamente desconectados: PMS legacy sin API, cerraduras RFID
                sin integración, contabilidad manual, OTAs actualizadas a mano,
                sin automatización de comunicación con huéspedes.
              </p>
            </div>
          </div>

          {/* SOLUCIÓN */}
          <div className="cs-row cs-row--diagram">
            <div className="cs-label">SOLUCIÓN</div>
            <div className="cs-content">
              <p className="cs-lead">
                Una sola fuente de verdad. Todos los sistemas hablan al panel central.
              </p>
              <ArchDiagram />
            </div>
          </div>

          {/* STACK */}
          <div className="cs-row">
            <div className="cs-label">STACK</div>
            <div className="cs-content">
              <div className="cs-tags">
                {stackItems.map((item) => (
                  <span key={item} className="cs-tag">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* INGENIERÍA */}
          <div className="cs-row">
            <div className="cs-label">INGENIERÍA</div>
            <div className="cs-content">
              <blockquote className="cs-quote">
                "No pelear el legacy. Envolverlo."
              </blockquote>
              <p>
                El sistema de cerraduras RFID no tiene API. La estrategia:
                acceso directo a la base de datos del encoder y un servicio propio
                que expone endpoints REST. El panel central consume la API limpia
                sin saber nada del sistema legacy.
              </p>
            </div>
          </div>

          {/* RESULTADO */}
          <div className="cs-row">
            <div className="cs-label">RESULTADO</div>
            <div className="cs-content cs-content--placeholder">
              <p>[RESULTADO: horas/semana de trabajo manual eliminadas — completar con dato real]</p>
              <p>[RESULTADO: tiempo de check-in reducido de X a Y minutos]</p>
            </div>
          </div>

          {/* ROADMAP */}
          <div className="cs-row">
            <div className="cs-label">ROADMAP</div>
            <div className="cs-content">
              <ul className="cs-roadmap">
                {roadmapItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
