import React, { useMemo, useState } from 'react';
import './Contact.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const resolveApiBaseUrl = () => {
  const fromEnv = (import.meta.env.VITE_API_BASE_URL ?? '').trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocalHost = host === 'localhost' || host === '127.0.0.1';
    if (isLocalHost) {
      return 'http://127.0.0.1:8787';
    }
  }

  return '';
};

const API_BASE_URL = resolveApiBaseUrl();
const REQUEST_TIMEOUT_MS = 15000;

const buildConnectionErrorMessage = () => {
  if (!API_BASE_URL) {
    return 'No hay API pública configurada para este deploy. Definí VITE_API_BASE_URL en GitHub Actions.';
  }

  if (API_BASE_URL.includes('127.0.0.1') || API_BASE_URL.includes('localhost')) {
    return `No hay conexión con la API local (${API_BASE_URL}). Verificá que el backend esté corriendo.`;
  }

  return `No hay conexión con la API pública (${API_BASE_URL}). Verificá CORS/ALLOWED_ORIGINS y estado del servicio.`;
};

export function Contact() {
  const ref = useScrollReveal();

  const [formState, setFormState] = useState<FormState>('idle');
  const [submitError, setSubmitError] = useState<string>('');
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
      return submitError || 'No se pudo enviar. Intentá de nuevo o escribime directo por email.';
    }

    if (formState === 'loading') {
      return 'Enviando mensaje...';
    }

    if (!API_BASE_URL) {
      return 'Formulario en modo público sin API configurada. Definí VITE_API_BASE_URL en el deploy.';
    }

    return 'Tu información se envía por API segura local.';
  }, [formState, submitError]);

  const mapBackendError = (errorCode: string) => {
    const errors: Record<string, string> = {
      INVALID_ORIGIN:
        'Origen bloqueado por seguridad. Abrí el frontend desde localhost o 127.0.0.1 y reiniciá la API.',
      BOT_SUSPECTED:
        'Envío demasiado rápido. Esperá 2-3 segundos y volvé a intentar.',
      RATE_LIMIT_IP:
        'Demasiados intentos desde tu IP. Esperá un momento e intentá de nuevo.',
      RATE_LIMIT_EMAIL:
        'Ese email alcanzó el límite temporal de pruebas. Esperá unos minutos o usa otro correo.',
      MISSING_TURNSTILE_TOKEN:
        'Falta validación anti-bot. Revisá la configuración de seguridad.',
      TURNSTILE_VALIDATION_FAILED:
        'Falló la validación anti-bot. Reintentá en unos segundos.',
      INVALID_PAYLOAD:
        'Hay campos inválidos. Revisá nombre, email y mensaje.',
      UNSUPPORTED_MEDIA_TYPE:
        'Formato de envío inválido. Recargá la página e intentá de nuevo.',
      INTERNAL_ERROR:
        'Error interno del servidor. Reintentá en unos segundos.',
    };

    return (
      errors[errorCode] ||
      'No se pudo enviar. Intentá de nuevo o escribime directo por email.'
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));

    if (formState === 'success' || formState === 'error') {
      setFormState('idle');
      setSubmitError('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState === 'loading') {
      return;
    }

    setFormState('loading');
    setSubmitError('');

    if (!API_BASE_URL) {
      setSubmitError(
        'No hay API pública configurada para este deploy. Definí VITE_API_BASE_URL en GitHub Actions.',
      );
      setFormState('error');
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
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
        let backendError = 'CONTACT_SUBMIT_FAILED';

        try {
          const data = (await response.json()) as { error?: string };
          if (data?.error) {
            backendError = data.error;
          }
        } catch {
          backendError = 'CONTACT_SUBMIT_FAILED';
        }

        setSubmitError(mapBackendError(backendError));
        setFormState('error');
        return;
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
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setSubmitError(
          `La API tardó demasiado en responder (${REQUEST_TIMEOUT_MS / 1000}s). Reintentá en unos segundos.`,
        );
        setFormState('error');
        return;
      }

      setSubmitError(buildConnectionErrorMessage());
      setFormState('error');
    } finally {
      window.clearTimeout(timeoutId);
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
