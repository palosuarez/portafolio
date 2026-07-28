# Brief para Claude Code — Reposicionamiento del Portafolio pan_dev
**Versión 2.0 — Actualizado con scope completo del proyecto hotelero**

> **Cómo usar este archivo:**
> 1. Colócalo en `C:\dev\pan_dev_portfolio` (raíz del repositorio)
> 2. Abre Claude Code en esa ruta
> 3. Dile: *"Lee CLAUDE_CODE_BRIEF.md y ejecuta el reposicionamiento paso a paso, mostrándome los cambios antes de aplicarlos. Usa Opus 4 para decisiones de arquitectura y refactoring."*

---

## 0. Contexto del proyecto

- **Marca:** pan_dev — Pablo Andrés Suárez Sandoval
- **Ruta local:** `C:\dev\pan_dev_portfolio`
- **Stack:** React 18 + Vite + TypeScript → GitHub Pages
- **Estética (MANTENER sin excepción):**
  - Fondo `#0d0d12`
  - Acento cian `#00f0ff`
  - Títulos: Cormorant (serif)
  - Código/mono: JetBrains Mono
  - Logo: CircuitP
  - Espaciado áureo (×1.618)
  - Tagline: *"Del caos al sistema."*

**Primera tarea — MAPEO OBLIGATORIO antes de tocar cualquier archivo:**
Lista todos los componentes en `src/`, identifica dónde viven:
- Hero
- Sobre mí / perfil
- Skills
- Proyectos / casos de estudio
- Experiencia laboral
- Navbar / navegación
- `vite.config.ts` (revisar `base` para GitHub Pages)
- `index.html` (meta tags)

**NO editar nada hasta mostrar el mapa completo y recibir OK de Pablo.**

---

## 0.1 Instrucción de modelo

Usa **Claude Opus 4** (`claude-opus-4-5`) para:
- Decisiones de arquitectura de componentes
- Refactoring de código existente
- Revisión de consistencia y profesionalismo del código
- Propuestas de estructura de carpetas

El objetivo es que el repositorio quede en un nivel de calidad que cualquier dev senior pueda revisar sin encontrar deuda técnica evidente.

---

## 1. Objetivo en una frase

Transformar el portafolio de **"full-stack que hace de todo"** a
**"especialista que automatiza e integra los sistemas dispersos de un negocio en una única fuente de verdad"**,
usando la automatización hotelera como caso estrella.

El visitante debe salir pensando: *"este tipo integra y automatiza operaciones de hoteles"*, no *"este tipo sabe muchos lenguajes"*.

---

## 2. Principio rector — NO violar

**Especializar NO es amputar.**

El perfil full-stack e infraestructura NO se borra: se **subordina**. Queda como respaldo ("domino el stack completo para construir la solución"), nunca como titular. La vitrina se reordena para que lo primero visible sea el nicho.

---

## 3. Scope completo del proyecto hotelero (caso estrella)

Este es el proyecto real que constituye el caso de estudio central del portafolio.
**Hotel de 16 habitaciones, Chapinero, Bogotá.** (No nombrar al hotel — cliente confidencial.)

### 3.1 Sistemas a integrar (arquitectura real)

| Sistema | Estado | Estrategia de integración |
|---|---|---|
| **World Office** (contabilidad) | API REST documentada | Integración directa — JWT auth, endpoints de compras/ventas/inventario/terceros |
| **Lobby PMS** (hotelero) | A implementar | Integración directa — Bearer token, REST. Base: `https://api.lobbypms.com/v1`. Endpoints confirmados: `/reservations`. API Key vía soporte LobbyPMS. |
| **Logro** (PMS legacy, doble g) | Sistema actual del hotel — sin API REST | **Migración** a Lobby. Logro se reemplaza, no se integra |
| **Cerraduras RFID** (sistema chino Mifare 1) | Sin API, encoder físico | **Wrapper de base de datos** — acceso directo a BD del sistema de cerraduras; no hay API disponible ni documentación oficial |
| **Pasarela de pagos** | A implementar | Integración estándar (Wompi / PayU Colombia) |
| **WhatsApp Business** | Fase 1 activa | Meta Cloud API + Node.js/Fastify + Claude Haiku (chatbot de reservas) |
| **OTAs** (Booking.com, Expedia, Airbnb) | A implementar | Vía **channel manager** (Cloudbeds o Little Hotelier) — integración directa con OTAs no viable para hotel pequeño; channel manager unifica disponibilidad/tarifas en un endpoint |
| **Cámaras de seguridad** | A integrar | Control y monitoreo centralizado vía panel unificado |
| **Landing web del hotel** | A construir | React + diseño de marca (logo + identidad para web e Instagram) |
| **Identidad de marca** | A construir | Logo, paleta, guía para web e Instagram |

### 3.2 Arquitectura conceptual — "Única fuente de verdad"

```
                    ┌─────────────────────────────────┐
                    │     PANEL DE CONTROL CENTRAL     │
                    │   (backend Node.js/Fastify)      │
                    └──────────────┬──────────────────┘
                                   │
        ┌──────────┬───────────────┼──────────────┬──────────────┐
        │          │               │              │              │
   World Office  Lobby PMS    WhatsApp Bot   Cerraduras    Cámaras
   (contabilidad) (reservas)  (Claude Haiku)  (BD wrapper)  (CCTV)
        │          │               │
   ─────┴──────────┴───────────────┴─────
        │
   Channel Manager (Cloudbeds/Little Hotelier)
        │
   ─────┴──────────┬───────────────
   Booking.com   Expedia        Airbnb
```

### 3.3 Pieza técnica destacada — Wrapper cerraduras RFID

Filosofía: **"No pelear el legacy, envolverlo."**

El sistema de cerraduras no tiene API. La estrategia es:
1. Identificar el motor de base de datos del sistema de cerraduras (pendiente acceso físico a la máquina del encoder)
2. Construir un servicio Node.js que lea/escriba directamente en esa BD
3. Exponer endpoints REST propios para operaciones de apertura/programación de tarjetas
4. El panel central consume esos endpoints sin saber nada del sistema legacy

Presentarlo en el portafolio como decisión de ingeniería deliberada, no como workaround.

### 3.4 Visión futura (mencionar en portafolio como roadmap, NO como entregado)

- **Agente de voz IA:** recibe llamadas, agenda reservas, escala a humano si no puede resolver. (Pendiente desarrollo futuro)
- **Automatización completa de check-in/check-out**

---

## 4. Cambios sección por sección

### 4.1 Hero

**Quitar:** listas de tecnologías o títulos genéricos como primer mensaje.

**Poner:**
```
Titular:
"Conecto los sistemas dispersos de tu negocio en una sola fuente de verdad."

Subtítulo:
"Automatización e integración de software para hoteles y operaciones de servicio."

Tagline de marca (mantener):
"Del caos al sistema."
```

Mantener toda la estética cyberpunk. CTA claro hacia el caso de estudio.

### 4.2 Navbar — CAMBIO ESTÉTICO SOLICITADO

**Hacer la barra de navegación mucho más minimalista:**
- Reducir peso visual: menos padding, tipografía más pequeña, sin fondos sólidos pesados
- Considerar: navbar transparente con blur backdrop sobre el hero, que solidifica al hacer scroll
- Links reducidos a lo esencial: Inicio · Proyecto · Skills · Contacto
- Mobile: hamburger limpio, sin animaciones pesadas
- Mantener acento cian `#00f0ff` para el item activo / hover

### 4.3 Skills — Reagrupar por relevancia al nicho

Tres bloques jerárquicos (NO lista plana):

**Núcleo — Integración de Sistemas** (destacado, arriba):
- Integración de APIs REST y servicios externos
- Wrappers sobre sistemas legacy sin API
- Automatización de flujos operativos
- Arquitectura de microservicios / orquestación
- Bases de datos (relacionales y NoSQL)
- Pasarelas de pago (Wompi, PayU)
- WhatsApp Business API / chatbots con IA
- Channel managers hoteleros (OTAs)
- Infraestructura de datos center y telecomunicaciones

**Stack de soporte** (medio):
React/Vite/TypeScript · Node.js/Fastify · Python · Docker · PostgreSQL · MongoDB
→ Encuadrado como: *"Domino el stack completo para construir la solución de punta a punta."*

**Fundamento** (pie, breve):
IBM Full Stack Software Developer · IBM Generative AI · Politécnico Grancolombiano (Ing. Software)

### 4.4 Caso de estudio — SECCIÓN ESTRELLA

Crear como sección propia, no como ítem de lista de proyectos.

**Estructura sugerida del componente:**

```
[Problema]
Un hotel boutique en Bogotá operando con 5 sistemas desconectados:
PMS legacy sin API, cerraduras RFID sin integración, contabilidad manual,
OTAs actualizadas a mano, sin automatización de comunicación con huéspedes.

[Solución arquitectónica]
Diagrama animado: sistemas dispersos → panel central → fuente única de verdad
(ver sección 5 — capa multimedia)

[Stack de integración]
World Office API · Lobby PMS · Channel Manager (OTAs) ·
WhatsApp Business + Claude Haiku · Wrapper RFID · Pasarela de pagos

[Decisión de ingeniería destacada]
"No pelear el legacy, envolverlo" — el sistema de cerraduras sin API
se envuelve con un servicio propio que lee su base de datos directamente.

[Slot de video — PLACEHOLDER]
Contenedor elegante con poster cyberpunk, lazy-load, listo para video demo.
Dejar componente <HotelDemoVideo /> preparado con poster placeholder.

[Resultado]
[RESULTADO: completar con dato real — ej: X horas/semana de trabajo manual eliminadas]
[RESULTADO: completar — tiempo de check-in reducido de X a Y minutos]

[Roadmap]
Próxima fase: agente de voz IA para atención telefónica automatizada.
```

> **REGLA:** Si Pablo no ha dado cifras concretas, dejar placeholders explícitos
> `[RESULTADO: completar con dato real]` — NUNCA inventar métricas.

### 4.5 Sobre mí

Reescribir hacia: **arquitecto de infraestructura que automatiza e integra**.

Hilo narrativo:
- Data centers y telecomunicaciones → aprendió a conectar sistemas que no fueron hechos para hablarse
- IT gubernamental → escalabilidad y rigor
- IBM Full Stack + IBM Generative AI → stack moderno sobre base de infraestructura
- Pan_dev → convergencia: sistemas empresariales + automatización + IA

Tono: editorial, sobrio, frases con peso. Sin relleno. Voz de Pablo.

### 4.6 Experiencia laboral

- Añadir entrada freelance **pan_dev** con el proyecto hotelero
- Reescribir entradas anteriores para que apunten al hilo "integración e infraestructura" donde sea honesto

---

## 5. Capa multimedia — Implementar los tres

**Prioridad de implementación sugerida por Claude Code:**

### 5.1 Diagrama animado de arquitectura (PRIORIDAD 1)
Mostrar visualmente la "única fuente de verdad":
- Los sistemas (iconos: contabilidad, PMS, cerraduras, WhatsApp, OTAs, cámaras) aparecen dispersos
- Una línea/pulso animado los conecta al panel central
- CSS animation + SVG, sin librerías pesadas
- `prefers-reduced-motion` respetado
- Se integra dentro del caso de estudio como ilustración de la arquitectura

### 5.2 Slot de video — componente `<HotelDemoVideo />` (PRIORIDAD 2)
- Contenedor responsive con poster cyberpunk (imagen placeholder con logo pan_dev + texto "Demo próximamente")
- Lazy-load nativo (`loading="lazy"`)
- Acepta `src` como prop — cuando Pablo tenga el video, solo pasa la URL
- Aspect ratio 16:9 bloqueado
- Estética: borde cian, esquinas sutilmente redondeadas, overlay oscuro sobre poster

### 5.3 Animación hero / marca (PRIORIDAD 3)
- Opción A: logo CircuitP trazándose (SVG stroke animation)
- Opción B: grafo minimalista "sistemas dispersos → fuente única" que se conecta al cargar
- Claude Code propone la de mejor relación impacto/esfuerzo y la implementa

---

## 6. Refactoring del repositorio

Usar Opus 4 para revisar el código existente y:

- Revisar estructura de carpetas `src/` — proponer reorganización si es necesario
- Identificar componentes duplicados o con responsabilidades mezcladas
- Revisar consistencia de tipos TypeScript (eliminar `any`, añadir tipos donde falten)
- Revisar imports — eliminar los que no se usan
- Revisar nombrado de componentes y variables — estandarizar a convención clara
- Revisar CSS/styled — consolidar tokens de diseño en un archivo de variables
- Proponer mejoras, mostrar diffs, NO aplicar sin OK de Pablo

---

## 7. SEO y meta tags

Actualizar en `index.html`:

```html
<title>pan_dev — Automatización e integración de sistemas para hoteles</title>
<meta name="description" content="Especialista en automatización e integración de software para hoteles. Conecto PMS, contabilidad, pasarelas de pago y sistemas legacy en una única fuente de verdad. Bogotá, Colombia." />
<meta property="og:title" content="pan_dev — Del caos al sistema." />
<meta property="og:description" content="Automatización e integración de sistemas para hoteles y operaciones de servicio." />
<meta property="og:image" content="[og-image-cyberpunk-pandev]" />
```

---

## 8. Restricciones técnicas — NO romper

- Stack: React + Vite + TypeScript. No cambiar.
- GitHub Pages: verificar `base` en `vite.config.ts`. No romper rutas de assets.
- Paleta, tipografías y tokens de espaciado áureo: mantener.
- Mobile-first: dueños de hotel abrirán el link desde el celular.
- Performance: animaciones CSS primero. JS mínimo. Sin librerías pesadas no justificadas.
- Accesibilidad: `prefers-reduced-motion` en todas las animaciones.
- NO usar `localStorage`/`sessionStorage` si no estaban.

---

## 9. Orden de trabajo para Claude Code

1. **Mapear repo** → mostrar estructura → esperar OK de Pablo
2. **Refactoring base** (Opus 4) → proponer reorganización → esperar OK
3. **Navbar minimalista** → diff → OK → aplicar
4. **Meta tags + SEO** (menor riesgo, mayor impacto inmediato)
5. **Hero** → nuevo copy + estética
6. **Skills reagrupadas**
7. **Caso de estudio hotelero** (sección estrella)
8. **Diagrama animado de arquitectura** (SVG/CSS)
9. **Componente `<HotelDemoVideo />`**
10. **Animación hero/marca**
11. **Sobre mí + Experiencia**
12. `npm run build` + `npm run preview` → verificar en localhost antes de cualquier push
13. Proponer mensaje de commit → Pablo revisa → Pablo hace el push

**Regla de oro:** mostrar diffs y explicar cada cambio antes de aplicarlo.
**Terminal:** PowerShell (Windows). No usar sintaxis bash.
**Push:** NUNCA automático. Pablo revisa y decide.

---

## 10. Criterio de éxito

Al terminar, alguien que abra el portafolio por primera vez debe responder en 5 segundos:
**"¿Qué hace este tipo?" → "Automatiza e integra los sistemas de hoteles."**

Si responde "es full-stack", el reposicionamiento falló.

---

*Del caos al sistema.*
