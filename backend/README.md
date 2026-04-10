# Backend local · Portfolio

API local para formulario de contacto con Fastify, validación y persistencia en archivo JSON.

Incluye controles anti-bot y endurecimiento básico para pruebas técnicas tipo "red team".

## Requisitos

- Node.js 20+
- npm 9+

## Configuración

```bash
cd backend
npm install
cp .env.example .env
```

## Ejecutar

```bash
# desde /backend
npm run dev

# o desde la raíz del proyecto
npm run dev:api
```

API: `http://127.0.0.1:8787`

## Deploy en Render (backend público)

Este repo incluye `render.yaml` en la raíz para evitar configuración manual incorrecta.

Si lo configuras manualmente en Render:

- Root Directory: `backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`

Variables mínimas recomendadas:

- `HOST=0.0.0.0`
- `ALLOWED_ORIGINS=https://palosuarez.github.io`
- `CORS_ORIGIN=https://palosuarez.github.io`

No uses `node server.js` como start command, porque el backend compila a `dist/server.js`.

## Endpoints

- `GET /health`
- `POST /api/contact`

### Payload de ejemplo

```json
{
  "name": "Pablo Suarez",
  "email": "correo@dominio.com",
  "message": "Hola, quiero hablar de un proyecto backend.",
  "source": "portfolio-local",
  "company": "Mi empresa",
  "website": "",
  "formStartedAt": 1712768000000,
  "turnstileToken": ""
}
```

`website` es honeypot anti-spam: debe ir vacío.

`formStartedAt` permite detectar envíos automáticos demasiado rápidos.

`turnstileToken` solo es obligatorio cuando `REQUIRE_TURNSTILE=true`.

## Seguridad activa

- CORS estricto por lista de orígenes permitidos
- Rate limit global y por endpoint
- Límite adicional por IP y por email en ventanas locales
- Bloqueo básico de user-agent sospechoso
- Validación estricta con Zod y normalización de texto
- Honeypot y validación de tiempo mínimo de llenado
- Headers de seguridad con `@fastify/helmet`
- Soporte opcional para Cloudflare Turnstile

## Copia por correo (SMTP)

Por defecto, el backend guarda mensajes localmente. Si activas SMTP, también envía copia al correo destino.

Variables clave en `.env`:

- `MAIL_ENABLED=true`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=palosuarez@gmail.com`
- `SMTP_PASS=<app-password>`
- `MAIL_FROM="Portfolio Bot <palosuarez@gmail.com>"`
- `MAIL_TO=palosuarez@gmail.com`

Para Gmail, usa App Password (no tu clave normal).

## Persistencia

Los mensajes se guardan en `backend/data/messages.json`.

Si SMTP está activo, también se envía una copia al correo configurado en `MAIL_TO`.
