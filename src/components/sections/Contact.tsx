import React from 'react';
import './Contact.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export function Contact() {
  const ref = useScrollReveal();
  return (
    <section
      className="contact reveal"
      id="contacto"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="contact-inner">
        <div className="contact-header">
          <span className="section-tag">// CONTACTO</span>
          <h2 className="section-title">
            Hablemos de
            <br />
            tu próximo sistema.
          </h2>
          <p className="section-sub">
            Si estás construyendo algo que necesita backend sólido, integración
            de IA o arquitectura cloud — escribime.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <a className="contact-email" href="mailto:palosuarez@gmail.com">
              palosuarez@gmail.com
            </a>

            <div className="contact-links">
              <a
                href="https://github.com/palosuarez"
                target="_blank"
                rel="noopener"
                className="contact-link"
              >
                <span className="contact-link-label">GitHub</span>
                <span className="contact-link-arrow">→</span>
              </a>
              <a
                href="https://linkedin.com/in/pablo-andres-suarez-sandoval"
                target="_blank"
                rel="noopener"
                className="contact-link"
              >
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-arrow">→</span>
              </a>
              <a
                href="https://credly.com/users/pablo-andres-suarez-sandoval"
                target="_blank"
                rel="noopener"
                className="contact-link"
              >
                <span className="contact-link-label">Credly</span>
                <span className="contact-link-arrow">→</span>
              </a>
              <a
                href="https://behance.net/andresuarez81"
                target="_blank"
                rel="noopener"
                className="contact-link"
              >
                <span className="contact-link-label">Behance</span>
                <span className="contact-link-arrow">→</span>
              </a>
            </div>

            <div className="contact-availability">
              <span className="contact-avail-dot" />
              <span>Disponible ahora · Bogotá, Colombia · Remoto</span>
            </div>
          </div>

          <div className="contact-right">
            <div className="contact-form">
              <div className="contact-form-header">
                <span className="t-dot t-red" />
                <span className="t-dot t-yellow" />
                <span className="t-dot t-green" />
                <span className="contact-form-title">mensaje.ts</span>
              </div>
              <div className="contact-form-body">
                <div className="form-group">
                  <label className="form-label">NOMBRE</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">EMAIL</label>
                  <input
                    className="form-input"
                    type="email"
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">MENSAJE</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Contame en qué estás trabajando..."
                  />
                </div>
                <button className="form-submit">Enviar mensaje →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
