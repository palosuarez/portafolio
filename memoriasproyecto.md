+# pan_dev · Portafolio — Memoria del Proyecto

> Memoria externa. Al inicio de cada sesión nueva, compartí este README.
> Última actualización: Sesión 4 · Marzo 2026

---

## 🔧 Flujo de trabajo obligatorio

1. Abrir archivo por PowerShell:

```powershell
code C:\dev\pan_dev_portfolio\frontend\src\components\RUTA\Archivo.tsx
```

2. Editar en VS Code
3. Guardar `Ctrl + S`
4. Verificar en `localhost:5173`

> ⚠️ Nunca crear archivos desde VS Code Explorer. Siempre abrir por shell primero.

---

## ▶️ Cómo ejecutar

```powershell
cd C:\dev\pan_dev_portfolio\frontend
npm run dev
# http://localhost:5173
```

---

## ✅ Qué funciona

- [x] CircuitBackground.tsx — SVG fijo PCB, opacity 0.06
- [x] CircuitP.tsx — logo de marca animado, Nav + dispara re-animación hero
- [x] CircuitSignature.tsx — firma "Pablo Suárez" en Pinyon Script + stroke animado 4s
- [x] CircuitName.tsx — reservado para uso futuro
- [x] TextReveal.tsx — clip-path + blur + glitch, 90ms stagger
- [x] Nav — CircuitP logo, links corregidos, CTA discreto, fade-in delay 5s
- [x] CIStrip — ticker vertical, aparece 4s, justificado al logo
- [x] Hero — nombre → tagline → rol → botón, entradas escalonadas cinematográficas
- [x] Stack — grid 3x2, tokens áureos, hover accent por categoría
- [x] Projects — 5 proyectos reales, MinTIC y CSA actualizados con contexto real
- [x] Badges — grid 4 col, 10 badges IBM + 1 en progreso, link Credly
- [x] About — bio + CircuitSignature firma + timeline experiencia real
- [x] Contact — email + links + form terminal estilo mensaje.ts
- [x] Footer — terminal ticker centrada, links redes
- [x] Scroll reveal — fade-up por sección con IntersectionObserver
- [x] Tokens áureos — espaciado 0.5 → 8.9rem proporción ×1.618
- [x] Keyframes centralizados en index.css

---

## 🗂 Estructura de archivos

```
frontend/src/
  components/
    effects/
      CircuitBackground.tsx + .css
      CircuitP.tsx + .css
      CircuitSignature.tsx + .css   ← firma About
      CircuitName.tsx + .css        ← reservado
      TextReveal.tsx + .css
    layout/
      Nav.tsx + .css
      CIStrip.tsx + .css
      Footer.tsx + .css
    sections/
      Hero.tsx + .css
      Stack.tsx + .css
      Projects.tsx + .css
      Badges.tsx + .css
      About.tsx + .css
      Contact.tsx + .css
  hooks/
    useScrollReveal.ts
  styles/
    tokens.css
  index.css
  App.tsx
```

---

## 🎨 Tokens de diseño

| Token           | Valor                                  |
| --------------- | -------------------------------------- |
| `--bg-0`        | `#0d0d12`                              |
| `--accent`      | `#00f0ff` cyan                         |
| `--accent-r`    | `#ff4d6d`                              |
| `--font-serif`  | `Cormorant`                            |
| `--font-sans`   | `DM Sans`                              |
| `--font-mono`   | `JetBrains Mono`                       |
| `--nav-h`       | `60px`                                 |
| `--strip-h`     | `22px`                                 |
| `--top-offset`  | `92px`                                 |
| `--max-w`       | `1200px`                               |
| `--gutter`      | `2.5rem`                               |
| Espaciado áureo | xs→3xl: 0.5/0.8/1.3/2.1/3.4/5.5/8.9rem |

---

## 🏗 Arquitectura de componentes

| Componente         | Dónde va                                |
| ------------------ | --------------------------------------- |
| `CircuitP`         | Nav logo + dispara re-animación hero    |
| `CircuitSignature` | About — firma caligráfica animada       |
| `TextReveal`       | Hero nombre + tagline                   |
| Terminal ticker    | Footer                                  |
| `useScrollReveal`  | Stack, Projects, Badges, About, Contact |

---

## 📋 Proyectos

1. **HeadshotAssist V4** — Node/TS/Docker/C#/Lua — featured
2. **Gobierno Digital Sogamoso** — Sello MinTIC — sogamoso-boyaca.gov.co
3. **Automatización IA CSA** — Claude API/LLM — superioramericano.edu.co
4. **Data Center ASIGMA** — Telefónica infraestructura crítica
5. **Este portafolio** — meta-proyecto open source

---

## 🔲 Próximos pasos

1. Deploy GitHub Pages + GitHub Actions
2. Favicon con CircuitP
3. Mobile responsive
4. Backend Fastify + Docker + /health
5. Formulario contacto funcional
6. Cursor personalizado

---

## ⚠️ Errores conocidos y soluciones

| Error                | Solución                            |
| -------------------- | ----------------------------------- |
| `@keyframes` pisados | Centralizar en `index.css`          |
| JSX closing tag      | Verificar divs anidados             |
| `──` em-dash en JSX  | Usar `{/* LABEL */}`                |
| `target` not found   | Falta `<a` antes del atributo       |
| Nav prop error       | Agregar `interface NavProps`        |
| React not found      | Agregar `import React from 'react'` |

---

## 👤 Perfil

- Pablo Andrés Suárez · pan_dev · Bogotá
- Full Stack Developer · 8 años trayectoria tech
- Stack: React 18, Node.js, TypeScript, Docker, Claude API
- 10 badges IBM verificados en Credly · Sello MinTIC
- Email: palosuarez@gmail.com
- GitHub: github.com/palosuarez
- Credly: credly.com/users/pablo-andres-suarez-sandoval
- Behance: behance.net/andresuarez81

---

_Sesión colaborativa con Claude · pan_dev portfolio_
