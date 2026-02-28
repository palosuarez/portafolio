# Prompt Optimizado — Portafolio Retro Gamer de Pablo Suárez (pan_dev)

## 1) Análisis del prompt original

### Fortalezas
- Define un objetivo claro: portafolio + estética retro + mini-juego + accesibilidad + seguridad.
- Incluye datos reales del perfil profesional.
- Trae checklist de evaluación y criterios de calidad.
- Da lineamientos de UX, responsive y contenido muy completos.

### Riesgos detectados
- Mezcla requisitos **obligatorios**, **opcionales** y **ejemplos** sin prioridad explícita.
- Exceso de detalle puede causar salidas inconsistentes o truncadas.
- Pide “comentarios extremos” en muchas partes: puede degradar mantenibilidad.
- CSP + recursos externos requiere coherencia para no romper fuentes o assets.
- Solicita “15,000 líneas”, lo cual no aporta calidad por sí mismo.

### Mejora aplicada
- Separación por prioridad: P0 (bloqueante), P1 (importante), P2 (nice-to-have).
- Criterios verificables y medibles por sección.
- Restricción de seguridad explícita para evitar `innerHTML` con input usuario.
- Entrega en un único archivo con estructura y contratos de funciones definidos.
- Inclusión de “Definition of Done” para revisión rápida.

---

## 2) Prompt final mejorado (listo para pegar)

```text
# ROL
Actúa como Senior Full Stack Developer + UI Designer + Animator, experto en experiencias web retro y accesibilidad.

# OBJETIVO
Genera un único archivo `index.html` (HTML + CSS + JS inline) para el portafolio profesional de:
- Nombre: Pablo Andrés Suárez Sandoval
- Alias: pan_dev
- Ubicación: Bogotá, Colombia
- Email: palosuarez@gmail.com
- Teléfono: 322 206 1362

El resultado debe ser production-ready para GitHub Pages.

# RESTRICCIONES TÉCNICAS (P0: obligatorias)
1. Un solo archivo `index.html` sin dependencias JS externas.
2. Debe incluir estas secciones con IDs exactos:
   - `#home`, `#aboutme`, `#skills`, `#projects`, `#arcade`, `#recommendations`
3. Implementar 9 tareas del curso:
   - Header con `.profile_name` y alias animado
   - Navbar sticky con `.topmenu`
   - About Me
   - Skills (mínimo 5)
   - Projects (mínimo 3 con `.project-card`)
   - Recommendations (mínimo 3 con `.recommendation`)
   - `addRecommendation()` funcional con botón `#recommend_btn`
   - Home icon flotante a `#home`
   - Popup `#popup` usando `showPopup(true)`
4. Seguridad:
   - Prohibido usar `innerHTML` con input de usuario
   - Sanitizar texto en `sanitizeInput(input)`
   - Insertar recomendaciones solo con `textContent`
5. Accesibilidad:
   - Navegación por teclado completa
   - Focus visible alto contraste
   - ARIA labels en navegación, secciones y canvas
   - Modo accesible con toggle (reducir animaciones)
6. Juego en canvas:
   - Space Invaders Lite en `<canvas id="gameCanvas">`
   - Flechas para mover, espacio para disparar
   - Enemigos en 3 filas
   - Puntuación, victoria y game over
   - Botones Start/Reset

# DISEÑO RETRO (P1: importante)
1. Estética CRT/arcade 90s.
2. Variables CSS en `:root` para paleta:
   - `--crt-green`, `--crt-amber`, `--crt-blue`, `--crt-magenta`, `--crt-bg-dark`, `--crt-bg-panel`, `--arcade-red`, `--scanline`
3. Tipografía pixel (puede usar Press Start 2P + fallback monospace).
4. Efectos:
   - animación terminal para “pan_dev”
   - scanlines CRT
   - hover states visibles
5. Incluir logo pixel-art SVG inline (pan_dev).

# RESPONSIVE (P1)
- Mobile-first.
- Breakpoints mínimos: 768px, 1024px, 1440px.
- Canvas responsive manteniendo ratio 4:3.
- Targets táctiles >= 44px.

# CONTENIDO MÍNIMO (P0)
1. Skills sugeridas: Python, JavaScript, React, Data Centers, IA Generativa, Git/GitHub, Multimedia, Cloud.
2. Proyectos:
   - Plataforma Digital Gubernamental (Alcaldía Sogamoso, Sello MinTIC)
   - Infraestructura Data Center (ASIGMA/Telefónica)
   - Estrategia Digital Educativa (Colegio Superior Americano, +5K)
3. Recomendaciones iniciales: 3 textos de 25-30 palabras.

# ESTRUCTURA DE ENTREGA
- Devuelve solo código HTML válido entre:
  - `<!DOCTYPE html>`
  - `</html>`
- Incluye comentarios claros en bloques críticos (juego, seguridad, accesibilidad).
- No incluyas texto fuera del HTML.

# DEFINITION OF DONE
- Funciona al abrir `index.html` localmente.
- Recomendaciones se agregan dinámicamente y de forma segura.
- El juego inicia, puntúa y finaliza correctamente.
- Navegación por teclado usable.
- Diseño retro consistente y responsive.
```

---

## 3) Recomendación práctica de uso

- Primera corrida: usar el prompt mejorado tal cual.
- Segunda corrida (si hace falta): pedir solo cambios incrementales, por ejemplo:
  - “Reduce motion para usuarios sensibles y mejora contraste en botones”.
  - “Optimiza el loop del juego y limita FPS en móviles”.
  - “Compacta CSS y JS manteniendo legibilidad”.
