# AIM Landing Page — Producción

Landing corporativa de **AIM Asesorías Integrales de Gestión**.

## Estado técnico (auditoría)

- Arquitectura activa: `src/App.jsx` como fuente única de UI.
- Salud del proyecto: `npm run lint` y `npm run build` en verde.
- Código muerto removido: duplicados legacy y artefactos temporales fuera del flujo productivo.
- Seguridad frontend activa: sanitización de entrada, validaciones de email/teléfono, rate limit y endpoint seguro.
- Diseño corporativo: sistema visual basado en proporción áurea/Fibonacci y paleta centralizada.

## Directriz estricta (ProCode · MR-Robot · DaVinci)

- **ProCode**
	- Mantener una sola implementación funcional por módulo.
	- Evitar duplicidad y comentarios ruidosos; priorizar bloques de intención técnica.
	- Cambios pequeños, verificables y con build/lint en cada iteración.
- **MR-Robot Security**
	- No usar `dangerouslySetInnerHTML`.
	- Sanitizar todo input de usuario antes de procesar o enviar.
	- Aceptar solo endpoints `https://` o rutas relativas internas.
	- Mantener limitación de frecuencia en envíos de formulario.
- **DaVinci Design**
	- Respetar proporciones (`PHI`) y escala Fibonacci (`SPACING`).
	- Mantener consistencia cromática desde `COLORS`.
	- Animación sobria, perceptible y orientada a jerarquía visual.

## Stack

- React 19 + Vite 7
- Tailwind CSS 4 (solo import global)
- UI con **CSS-in-JS inline** dentro de `src/App.jsx`

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Preparación para nube

- Vite endurecido para cloud en `vite.config.js`:
	- `build.target = es2020`
	- `sourcemap = false`
	- puertos fijos de desarrollo/preview para evitar divergencias de entorno
	- `host: true` para despliegues en contenedor/plataforma
- Headers de seguridad para edge/CDN:
	- `vercel.json` con CSP + políticas de seguridad
	- `netlify.toml` con CSP + políticas de seguridad

## Hardening aplicado

- `Content-Security-Policy` con restricciones de script, estilos, fuentes, imágenes y `frame-ancestors`.
- `Strict-Transport-Security` para forzar HTTPS en producción.
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy` habilitados.
- `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `X-DNS-Prefetch-Control` y `X-Permitted-Cross-Domain-Policies` habilitados.
- `index.html` ajustado con `lang="es"`, título corporativo y meta descripción para SEO básico.

## Auditoría ofensiva (hacker mindset)

- Fecha: 2026-02-24.
- Patrón XSS directo revisado: sin `dangerouslySetInnerHTML`, sin `eval`, sin `new Function`, sin `document.write`.
- Entrada de usuario reforzada: limpieza de caracteres de control, normalización de espacios y escape HTML antes de enviar.
- Transporte de formulario reforzado: timeout con `AbortController`, `redirect: 'error'`, `cache: 'no-store'`, `credentials: 'omit'`.
- Endpoints bloqueados por política: solo `https://` o ruta relativa interna.

### Riesgo residual conocido

- Se mantiene `'unsafe-inline'` en `style-src`/`style-src-attr` por arquitectura CSS-in-JS inline en `App.jsx`.
- Para CSP enterprise estricta (sin inline) se requiere migrar estilos inline a hojas CSS o CSS Modules.

## Formulario listo para nube

El formulario usa `VITE_CONTACT_ENDPOINT` para envío real por `fetch` (`POST` JSON).

- Si `VITE_CONTACT_ENDPOINT` existe: envía al endpoint.
- Si no existe: usa fallback `mailto:` para no perder la consulta.
- Seguridad: solo se acepta endpoint `https://` o ruta relativa (`/api/contact`).

### Variables de entorno

Crear archivo `.env` (o configurar en el proveedor cloud):

```bash
VITE_CONTACT_ENDPOINT=https://tu-dominio.com/api/contact
```

## Chat de asistencia

El chat está integrado en `src/App.jsx` y está listo para producción frontend:

- respuestas rápidas FAQ,
- entrada sanitizada,
- mensajes persistentes durante la sesión,
- escalación directa a WhatsApp.

## Deploy rápido

### Vercel

1. Importar repo en Vercel.
2. Build command: `npm run build`.
3. Output directory: `dist`.
4. Configurar `VITE_CONTACT_ENDPOINT` en Environment Variables.

### Netlify

1. Importar repo en Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Configurar `VITE_CONTACT_ENDPOINT` en Site settings > Environment.

## Checklist de release

- `npm run lint` sin errores.
- `npm run build` exitoso.
- Endpoint del formulario probado con respuesta `2xx`.
- WhatsApp y chat visibles en desktop/mobile.
