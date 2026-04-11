# Contact API (Backend)

Servicio backend para el formulario de contacto del portfolio.
Implementado con Fastify + TypeScript, validación con Zod y controles anti-abuso para uso en producción.

## Stack

- Node.js 20+
- Fastify
- TypeScript
- Zod
- Nodemailer (opcional)

## Capacidades

- Endpoint de salud: `GET /health`
- Endpoint de contacto: `POST /api/contact`
- Validación estricta del payload
- CORS con allowlist de orígenes
- Rate limiting global y por endpoint
- Protección anti-spam (honeypot + tiempo mínimo de completado)
- Headers de seguridad con Helmet
- Persistencia local en JSON (`backend/data/messages.json`)
- Envío de correo vía SMTP (opcional)

## Estructura

- `src/server.ts`: bootstrap del servidor, CORS, seguridad y rutas
- `src/store.ts`: persistencia local de mensajes
- `src/mailer.ts`: envío SMTP y copia de respaldo

## Ejecución local

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API local: `http://127.0.0.1:8787`

Desde la raíz del proyecto:

```bash
npm run dev:api
```

## Build y ejecución en producción

```bash
cd backend
npm run build
npm run start
```

## Variables de entorno

### Base

- `NODE_ENV` (ej: `development`, `production`)
- `PORT` (por defecto `8787`)
- `HOST` (en producción usar `0.0.0.0`)

### CORS / origen

- `ALLOWED_ORIGINS` (lista separada por comas)
- `CORS_ORIGIN` (compatibilidad con despliegues previos)
- `REQUIRE_BROWSER_ORIGIN` (`true` recomendado en producción)

### Anti-abuso

- `RATE_LIMIT_MAX`
- `RATE_LIMIT_TIME_WINDOW_MS`
- `CONTACT_RATE_LIMIT_MAX`
- `CONTACT_RATE_LIMIT_TIME_WINDOW_MS`
- `MIN_FORM_FILL_TIME_MS`

### Turnstile (opcional)

- `REQUIRE_TURNSTILE`
- `TURNSTILE_SECRET_KEY`

### SMTP (opcional)

- `MAIL_ENABLED=true`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO` (uno o más emails separados por coma)
- `MAIL_TO_BACKUP` (opcional, enviado por BCC)

## Contrato del endpoint `POST /api/contact`

Payload esperado:

```json
{
  "name": "Pablo Suarez",
  "email": "correo@dominio.com",
  "message": "Hola, quiero hablar de un proyecto backend.",
  "source": "portfolio-web",
  "company": "Mi empresa",
  "website": "",
  "formStartedAt": 1712768000000,
  "turnstileToken": ""
}
```

Notas:

- `website` es honeypot y debe permanecer vacío.
- `formStartedAt` se usa para bloquear envíos automatizados demasiado rápidos.
- `turnstileToken` solo es obligatorio si `REQUIRE_TURNSTILE=true`.

## Deploy en Render

Este repositorio incluye `render.yaml` en la raíz para evitar configuración manual inconsistente.

Si configuras el servicio manualmente:

- Root Directory: `backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`

Configuración mínima recomendada para producción:

- `HOST=0.0.0.0`
- `ALLOWED_ORIGINS=https://palosuarez.github.io`
- `REQUIRE_BROWSER_ORIGIN=true`

## Troubleshooting rápido

- `Invalid origin`: revisar `ALLOWED_ORIGINS` y dominio exacto del frontend.
- No responde externamente en Render: confirmar `HOST=0.0.0.0`.
- Frontend no llega al backend: validar `VITE_API_BASE_URL` en el workflow de deploy del frontend.
- SMTP falla en Gmail: usar App Password y no contraseña de cuenta.
