import React, { useMemo, useState } from 'react';
import './Contact.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8787';

export function Contact() {
  const ref = useScrollReveal();

  const [formState, setFormState] = useState<FormState>('idle');
  const [formStartedAt, setFormStartedAt] = useState<number>(() => Date.now());
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
    website: '',
  });

  const feedbackMessage = useMemo(() => {
    if (formState === 'success') {
      return 'Mensaje enviado. Te respondo pronto por correo.';
    }

    if (formState === 'error') {
      return 'No se pudo enviar. Intentá de nuevo o escribime directo por email.';
    }

    if (formState === 'loading') {
      return 'Enviando mensaje...';
    }

    return 'Tu información se envía por API segura local.';
  }, [formState]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));

    if (formState === 'success' || formState === 'error') {
      setFormState('idle');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState === 'loading') {
      return;
    }

    setFormState('loading');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          message: formValues.message,
          source: 'portfolio-web',
          company: formValues.company || undefined,
          website: formValues.website,
          formStartedAt,
        }),
      });

      if (!response.ok) {
        throw new Error('CONTACT_SUBMIT_FAILED');
      }

      setFormState('success');
      setFormValues({
        name: '',
        email: '',
        message: '',
        company: '',
        website: '',
      });
      setFormStartedAt(Date.now());
    } catch {
      setFormState('error');
    }
  };

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
              <form className="contact-form-body" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">NOMBRE</label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    maxLength={120}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">EMAIL</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                    maxLength={180}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">EMPRESA (OPCIONAL)</label>
                  <input
                    className="form-input"
                    type="text"
                    name="company"
                    placeholder="Tu empresa"
                    value={formValues.company}
                    onChange={handleChange}
                    maxLength={120}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">MENSAJE</label>
                  <textarea
                    className="form-input form-textarea"
                    name="message"
                    placeholder="Contame en qué estás trabajando..."
                    value={formValues.message}
                    onChange={handleChange}
                    required
                    minLength={20}
                    maxLength={3000}
                  />
                </div>
                <div className="form-honeypot" aria-hidden="true">
                  <label className="form-label" htmlFor="website">
                    Sitio web
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formValues.website}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <button
                  className="form-submit"
                  type="submit"
                  disabled={formState === 'loading'}
                >
                  {formState === 'loading'
                    ? 'Enviando...'
                    : 'Enviar mensaje →'}
                </button>
                <p
                  className={`form-status form-status--${formState}`}
                  role="status"
                  aria-live="polite"
                >
                  {feedbackMessage}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
