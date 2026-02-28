# Prompt Reestructurado — Portafolio Empresarial Inteligente (Junior Fullstack + Multimedia)

## 1) Objetivo de esta versión
Esta versión reemplaza la narrativa lúdica por una propuesta profesional orientada a reclutadores.
Se conserva el nivel técnico del reto original (frontend, UX, seguridad, accesibilidad, arquitectura y evidencia de implementación), pero con una experiencia más alineada a un perfil **Junior Fullstack con base en diseño multimedia**.

---

## 2) Enfoque estratégico (qué busca un reclutador junior)
1. Claridad de rol y propuesta de valor en 10 segundos.
2. Evidencia real de ejecución (proyectos, resultados, stack y responsabilidades).
3. Criterio de producto (UX, accesibilidad, contenido y priorización).
4. Bases de ingeniería (estructura, seguridad, calidad y despliegue).
5. Comunicación profesional (documentación y decisiones técnicas explicables).

---

## 3) Reemplazo del “juego” por experiencia didáctica empresarial
### Nueva experiencia interactiva
**Laboratorio de Decisiones de Producto (Business Case Simulator)**

En lugar de un mini-juego arcade, el portafolio debe incluir un módulo interactivo donde el usuario (reclutador) pueda simular decisiones de un proyecto digital real:
- Elegir alcance (MVP vs versión extendida)
- Elegir prioridades (velocidad, calidad, costo, accesibilidad)
- Ver impacto en tiempo estimado, riesgo técnico y valor al negocio
- Mostrar recomendaciones automáticas con lógica simple y transparente

### Por qué funciona mejor para empleabilidad
- Demuestra pensamiento sistémico y criterio profesional.
- Evidencia habilidades fullstack (datos, lógica, UI, estado, validación).
- Aprovecha conocimientos multimedia (jerarquía visual, narrativa, interacción).
- Permite explicar trade-offs, una señal fuerte para perfil junior serio.

---

## 4) Prompt final listo para usar (copiar/pegar)

```text
# ROL
Actúa como Senior Fullstack Engineer + Product Designer + Mentor técnico.

# OBJETIVO
Genera un portafolio profesional en un único archivo `index.html` (HTML + CSS + JS inline), listo para GitHub Pages, para:
- Nombre: Pablo Andrés Suárez Sandoval
- Marca profesional: pan_dev
- Perfil: Junior Fullstack Developer con experiencia en diseño multimedia
- Ubicación: Bogotá, Colombia
- Email: palosuarez@gmail.com
- Teléfono: 3222061362

# VISIÓN DEL PRODUCTO
Construye una experiencia elegante, sobria y moderna, orientada a procesos de selección junior.
Debe transmitir credibilidad, criterio y ejecución real.
Evita estética de videojuego o elementos infantiles.

# ALCANCE FUNCIONAL (P0: obligatorio)
1. Entregar un solo `index.html` sin librerías JS externas.
2. Incluir secciones con IDs exactos:
   - `#home`, `#aboutme`, `#skills`, `#projects`, `#business-lab`, `#recommendations`, `#contact`
3. Implementar navegación sticky accesible y botón de regreso al inicio.
4. Módulo interactivo `#business-lab` (reemplaza el juego):
   - Formulario con selects/radios para decisiones de producto:
     - Alcance: MVP | Escalado
     - Prioridad principal: Time-to-market | Calidad | Costo | Accesibilidad
     - Complejidad técnica: Baja | Media | Alta
   - Botón “Evaluar estrategia”
   - Resultado calculado en tiempo estimado, nivel de riesgo y recomendación final
   - Explicación textual breve de por qué se obtuvo ese resultado
5. Recomendaciones:
   - Mínimo 3 recomendaciones iniciales
   - Formulario para agregar recomendación
   - Función `addRecommendation()`
   - Popup de confirmación con `showPopup(true)`

# SEGURIDAD Y CALIDAD (P0)
1. Prohibido insertar input de usuario con `innerHTML`.
2. Sanitizar entradas con `sanitizeInput(input)`.
3. Insertar textos de usuario con `textContent`.
4. Evitar `eval`, `Function()` y patrones inseguros.
5. Manejo de errores simple en acciones críticas.

# ACCESIBILIDAD (P0)
1. Navegación completa por teclado.
2. Focus visible de alto contraste.
3. ARIA labels en navegación, formularios y resultados dinámicos.
4. Respeto a `prefers-reduced-motion`.
5. Contraste AA mínimo aproximado en textos principales.

# DISEÑO VISUAL (P1)
1. Estilo corporativo-tech: limpio, elegante, sofisticado.
2. Usar variables CSS en `:root` para sistema visual (colores, spacing, radios, sombras).
3. Composición clara: hero con propuesta de valor + CTA + métricas de impacto.
4. Tarjetas de proyecto consistentes con stack, rol, problema, solución y resultado.
5. Microinteracciones discretas, sin efectos recargados.

# CONTENIDO MÍNIMO (P0)
1. About me con narrativa profesional breve: contexto junior + experiencia aplicada.
2. Skills (mínimo 8):
   - JavaScript, Python, React, Git/GitHub, APIs REST, SQL básico, UX/UI, Diseño Multimedia
3. Proyectos (mínimo 3) con estructura:
   - Contexto
   - Responsabilidad personal
   - Stack
   - Resultado medible
4. Sección de contacto clara para reclutamiento.

# RESPONSIVE (P1)
- Mobile-first.
- Breakpoints mínimos: 768px y 1024px.
- Targets táctiles >= 44px.
- Layout adaptable sin romper legibilidad.

# DOCUMENTACIÓN INCLUIDA EN EL MISMO HTML
Agregar comentarios breves y profesionales en bloques críticos:
- Arquitectura del layout
- Flujo del Business Lab
- Seguridad de input
- Accesibilidad

# DEFINITION OF DONE
- Carga local sin errores.
- Business Lab funciona y muestra resultados coherentes.
- Recomendaciones se agregan de forma segura.
- Navegación por teclado correcta.
- Diseño consistente con enfoque empresarial junior.
- Código legible y mantenible.

# FORMATO DE SALIDA
Devuelve únicamente código HTML válido entre `<!DOCTYPE html>` y `</html>`, sin texto adicional.
```

---

## 5) Auditoría técnica sugerida (para evaluar el código generado)
Usa esta checklist después de generar el `index.html`.

### A. Arquitectura y organización
- [ ] Estructura por secciones semánticas (`header`, `main`, `section`, `footer`)
- [ ] CSS organizado por tokens, layout, componentes, utilidades
- [ ] JS separado por responsabilidades (estado, eventos, render, validación)

### B. Seguridad
- [ ] Todo input pasa por `sanitizeInput(input)`
- [ ] No hay `innerHTML` con datos de usuario
- [ ] No existen patrones inseguros (`eval`, inyección de scripts)

### C. Accesibilidad
- [ ] Orden lógico de tabulación
- [ ] Focus visible en botones/inputs/links
- [ ] ARIA labels y texto descriptivo en controles
- [ ] Mensajes dinámicos comprensibles para lector de pantalla

### D. UX y contenido
- [ ] Propuesta de valor visible en primer pantallazo
- [ ] Proyectos muestran evidencia de impacto real
- [ ] Business Lab explica trade-offs de forma clara

### E. Rendimiento
- [ ] Animaciones no bloqueantes
- [ ] Evitar assets pesados innecesarios
- [ ] Carga inicial rápida en red promedio

---

## 6) Manual de buenas prácticas (junior fullstack)
1. Escribir funciones pequeñas con propósito único.
2. Nombrar variables por intención, no por tipo.
3. Centralizar constantes de negocio (matriz de evaluación del Business Lab).
4. Evitar acoplar UI con reglas de negocio directamente.
5. Documentar “por qué” en decisiones clave, no solo “qué”.
6. Priorizar legibilidad sobre trucos complejos.
7. Validar siempre entradas del usuario.
8. Comprobar accesibilidad en teclado antes de publicar.

---

## 7) Arquitectura mínima recomendada para escalar luego
Aunque el reto pida un solo archivo, diseña pensando en separación futura:
- `UI Layer`: render y actualización de componentes visuales
- `Domain Layer`: reglas del Business Lab (puntajes, riesgo, recomendación)
- `Data Layer`: datos estáticos de skills/proyectos/recomendaciones iniciales

Si luego se divide en proyecto real:
- `index.html`
- `styles/main.css`
- `scripts/app.js`
- `scripts/business-lab.js`
- `data/portfolio-data.js`

---

## 8) Manual de despliegue en GitHub Pages
### Opción rápida (proyecto simple)
1. Crear repositorio público en GitHub (ejemplo: `pan-dev-portfolio`).
2. Subir `index.html` a la raíz del repo.
3. Ir a **Settings → Pages**.
4. En **Build and deployment** seleccionar:
   - Source: `Deploy from a branch`
   - Branch: `main` / folder: `/ (root)`
5. Guardar y esperar el enlace público.

### Recomendaciones previas a publicar
- Verificar en móvil y desktop.
- Revisar accesibilidad básica (tab + contraste).
- Revisar consola sin errores JS.
- Confirmar links de contacto.

---

## 9) Criterios de rúbrica (alineación con el prompt original)
- Cumplimiento funcional completo (secciones, interacción y lógica)
- Calidad técnica (seguridad, estructura, mantenibilidad)
- Calidad de diseño (jerarquía visual, claridad, coherencia)
- Accesibilidad y responsive
- Presentación profesional orientada a reclutador junior

---

## 10) Nota de uso
Mantén el archivo anterior como historial.
Esta nueva versión está preparada para generar una entrega más seria, viable y alineada con empleabilidad real de perfil junior fullstack.