import React, { useMemo, useState, useRef } from 'react';
import './Contact.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const resolveApiBaseUrl = () => {
  const fromEnv = (import.meta.env.VITE_API_BASE_URL ?? '').trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  // Detectamos si estamos en local para usar el puerto 10000
  if (typeof window !== 'undefined') {
    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';
    if (isLocal) return 'http://127.0.0.1:10000';
  }

  return 'https://pan-dev-portfolio-api.onrender.com';
};

const API_BASE_URL = resolveApiBaseUrl();

export function Contact() {
  const ref = useScrollReveal();
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [formState, setFormState] = useState<FormState>('idle');
  const [submitError, setSubmitError] = useState<string>('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formStartedAt] = useState<number>(() => Date.now());

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
    company: '',
    website: '',
  });

  const feedbackMessage = useMemo(() => {
    if (formState === 'success')
      return 'Mensaje enviado. Te respondo pronto por correo.';
    if (formState === 'error') return submitError || 'Error al enviar.';
    if (formState === 'loading') return 'Enviando mensaje...';
    return `Listo para enviar a: ${API_BASE_URL}`;
  }, [formState, submitError]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (formState !== 'idle') setFormState('idle');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState === 'loading') return;

    if (!turnstileToken) {
      setSubmitError('Por favor, completa la verificación de seguridad.');
      setFormState('error');
      return;
    }

    setFormState('loading');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formValues,
          source: 'portfolio-web',
          formStartedAt,
          turnstileToken: turnstileToken,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'CONTACT_SUBMIT_FAILED');
      }

      setFormState('success');
      setFormValues({
        name: '',
        email: '',
        message: '',
        company: '',
        website: '',
      });
      turnstileRef.current?.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error de conexión';
      setSubmitError(errorMessage);
      setFormState('error');
    }
  };

  // --- El return debe estar AQUÍ, dentro de la función Contact ---
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
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <a className="contact-email" href="mailto:palosuarez@gmail.com">
              palosuarez@gmail.com
            </a>
            {/* ... tus otros links sociales ... */}
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
                    value={formValues.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">EMAIL</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">MENSAJE</label>
                  <textarea
                    className="form-input form-textarea"
                    name="message"
                    value={formValues.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div
                  className="form-honeypot"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                >
                  <input
                    name="website"
                    value={formValues.website}
                    onChange={handleChange}
                    tabIndex={-1}
                  />
                </div>

                <div
                  className="turnstile-container"
                  style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Turnstile
                    ref={turnstileRef}
                    siteKey="0x4AAAAAADD-f1mvUe063q2i"
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    theme="dark"
                  />
                </div>

                <button
                  className="form-submit"
                  type="submit"
                  disabled={formState === 'loading' || !turnstileToken}
                >
                  {formState === 'loading' ? 'Enviando...' : 'Enviar mensaje →'}
                </button>

                <p
                  className={`form-status form-status--${formState}`}
                  role="status"
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
} // <--- Cierre de la función Contact
