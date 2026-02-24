/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * AIM — ASESORÍAS INTEGRALES DE GESTIÓN
 * Landing Page Corporativa | https://www.aimasesorias.com
 * ═══════════════════════════════════════════════════════════════════════════════
 * Stack: React 19 + Vite 7 + Tailwind CSS 4 (solo @import 'tailwindcss')
 * Arquitectura: Single-file App.jsx + CSS-in-JS con objetos inline
 * Versión: 3.0 — Refactor arquitectónico de motion, UX, A11Y y performance
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTES GLOBALES — SINGLE SOURCE OF TRUTH
// Este bloque centraliza tokens de diseño, seguridad y comportamiento.
// ═══════════════════════════════════════════════════════════════════════════════

const CONFIG = {
  whatsapp: {
    number: '573168201816',
    defaultMessage: '¡Hola! Visité aimasesorias.com y necesito información.',
  },
  emails: {
    contact: 'contacto@aimasesorias.com',
    info: 'info@aimasesorias.com',
  },
  urls: {
    domain: 'https://www.aimasesorias.com',
    avatarAPI: 'https://api.dicebear.com/7.x/anime/svg',
  },
  security: {
    maxMessageLength: 1000,
    maxNameLength: 100,
    rateLimitDelay: 3000,
    allowedEndpointHosts: (import.meta.env.VITE_ALLOWED_ENDPOINT_HOSTS || '')
      .split(',')
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean),
  },
  forms: {
    endpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
  },
};

const PHI = 1.618033988749895;

const SPACING = {
  xs: '8px',
  sm: '13px',
  md: '21px',
  lg: '34px',
  xl: '55px',
  xxl: '89px',
  xxxl: '144px',
};

const COLORS = {
  navy: '#0B2447',
  teal: '#0B9FA8',
  white: '#FFFFFF',
  grayLight: '#F8FAFC',
  grayMed: '#475569',
  grayDark: '#1E293B',
  success: '#10B981',
  error: '#DC2626',
  warning: '#F59E0B',
  flagYellow: '#FCD116',
  flagBlue: '#003893',
  flagRed: '#CE1126',
  flagSpainYellow: '#FFC400',
  flagCanadaRed: '#D80621',
  flagAustraliaBlue: '#012169',
};

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
};

const ANIMATION = {
  duration: {
    fast: 200,
    medium: 400,
    slow: 700,
    reveal: 600,
    countUp: 2000,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smoothOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    inView: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  stagger: {
    delay: 150,
  },
};

const NAVBAR_HEIGHT = 88;

const TEAM_DATA = [
  {
    id: 'maria-rodriguez',
    name: 'María Rodríguez G.',
    role: 'Experta Senior en Sostenibilidad y PRL',
    avatar: `${CONFIG.urls.avatarAPI}?seed=Maria&backgroundColor=b6e3f4`,
    initials: 'MR',
  },
  {
    id: 'carlos-rodriguez',
    name: 'Carlos Rodríguez G.',
    role: 'Project Coordinator',
    avatar: `${CONFIG.urls.avatarAPI}?seed=Carlos&backgroundColor=c0aede`,
    initials: 'CR',
  },
  {
    id: 'juanpablo-rodriguez',
    name: 'Juan Pablo Rodríguez G.',
    role: 'Médico Facultativo · Especialista Neumología',
    avatar: `${CONFIG.urls.avatarAPI}?seed=JuanPablo&backgroundColor=ffd5dc`,
    initials: 'JP',
  },
  {
    id: 'camilo-rodriguez',
    name: 'Camilo Rodríguez G.',
    role: 'Electronics Engineering Technician',
    avatar: `${CONFIG.urls.avatarAPI}?seed=Camilo&backgroundColor=d1d4f9`,
    initials: 'CG',
  },
];

const SERVICES_DATA = [
  {
    id: 'construccion',
    icon: '🏗️',
    title: 'Construcción y Servicios',
    description:
      'Apoyo técnico integral en proyectos de construcción: planes ambientales, SST, seguimiento en campo y asesoría regulatoria.',
    standards: ['ISO 14001', 'ISO 45001', 'Normas locales'],
  },
  {
    id: 'prevencion',
    icon: '🛡️',
    title: 'Prevención de Riesgos Laborales',
    description:
      'Diseño e implementación de sistemas de gestión SST. Cumplimiento ISO 45001, evaluación de riesgos y formación especializada.',
    standards: ['ISO 45001', 'SG-SST Colombia', 'OHSAS'],
  },
  {
    id: 'calidad',
    icon: '⚙️',
    title: 'Sistemas de Gestión de Calidad',
    description:
      'Implementación y certificación ISO 9001. Auditorías internas, mejora continua y control de procesos.',
    standards: ['ISO 9001:2015', 'Six Sigma', 'Lean'],
  },
  {
    id: 'sostenibilidad',
    icon: '🌱',
    title: 'Sostenibilidad y Medio Ambiente',
    description:
      'Gestión ambiental ISO 14001, eficiencia energética ISO 50001, huella de carbono y economía circular.',
    standards: ['ISO 14001', 'ISO 50001', 'GHG Protocol'],
  },
  {
    id: 'electricidad',
    icon: '⚡',
    title: 'Electricidad y Electrónica',
    description:
      'Cumplimiento RETIE, instalaciones eléctricas certificadas, mantenimiento predictivo y auditorías técnicas.',
    standards: ['RETIE Colombia', 'NEC', 'IEC 60364'],
  },
  {
    id: 'ciberseguridad',
    icon: '🔐',
    title: 'Ciberseguridad',
    description:
      'Implementación ISO/IEC 27001, análisis de vulnerabilidades, planes de respuesta a incidentes y auditorías de seguridad.',
    standards: ['ISO/IEC 27001', 'NIST', 'SOC 2'],
  },
];

const COVERAGE_DATA = [
  {
    id: 'colombia',
    country: 'Colombia',
    palette: [COLORS.flagYellow, COLORS.flagBlue, COLORS.flagRed],
  },
  {
    id: 'espana',
    country: 'España',
    palette: [COLORS.flagRed, COLORS.flagSpainYellow, COLORS.flagRed],
  },
  {
    id: 'canada',
    country: 'Canadá',
    palette: [COLORS.flagCanadaRed, COLORS.white, COLORS.flagCanadaRed],
  },
  {
    id: 'australia',
    country: 'Australia',
    palette: [COLORS.flagAustraliaBlue, COLORS.white, COLORS.flagRed],
  },
];

// FAQ_DATA es la base de conocimiento del asistente para responder sin backend.
// Mantenerlo en constante facilita edición por negocio sin tocar la lógica.
const FAQ_DATA = [
  {
    id: 'servicios',
    question: '¿Qué servicios ofrecen?',
    answer:
      'Ofrecemos seis líneas: construcción, prevención de riesgos, calidad ISO, sostenibilidad, electricidad y ciberseguridad.',
  },
  {
    id: 'cobertura',
    question: '¿En qué países trabajan?',
    answer:
      'Operamos en Colombia, España, Canadá y Australia con modalidad presencial y remota.',
  },
  {
    id: 'tiempos',
    question: '¿Cuánto demora una consultoría?',
    answer:
      'Un diagnóstico puede tardar 2 a 4 semanas y proyectos de certificación completos entre 3 y 6 meses.',
  },
  {
    id: 'contacto',
    question: '¿Cómo me comunico con un asesor?',
    answer:
      'Puedes usar el formulario, escribir a contacto@aimasesorias.com o abrir el canal de WhatsApp para atención inmediata.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// UTILIDADES DE SEGURIDAD — INPUT HARDENING
// Este bloque protege el formulario contra caracteres y patrones no seguros.
// ═══════════════════════════════════════════════════════════════════════════════

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';

  const withoutControlChars = Array.from(input)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return (code >= 32 && code !== 127) || code === 9 || code === 10;
    })
    .join('');

  return withoutControlChars
    .trim()
    .replace(/[<>{}[\]$\\]/g, '')
    .replace(/\s{2,}/g, ' ')
    .slice(0, CONFIG.security.maxMessageLength);
};

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) && email.length <= CONFIG.security.maxNameLength;
};

const validatePhone = (phone) => {
  const regex =
    /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return regex.test(phone) && phone.length >= 7 && phone.length <= 15;
};

const escapeHTML = (text) => {
  if (typeof text !== 'string') return '';

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
};

const isSecureEndpoint = (endpoint) => {
  if (typeof endpoint !== 'string') return false;

  const normalized = endpoint.trim();
  if (!normalized || normalized.startsWith('//')) return false;

  if (normalized.startsWith('/')) return true;

  try {
    const url = new URL(normalized);
    if (url.protocol !== 'https:') return false;

    if (CONFIG.security.allowedEndpointHosts.length === 0) return true;

    return CONFIG.security.allowedEndpointHosts.includes(
      url.hostname.toLowerCase()
    );
  } catch {
    return false;
  }
};

const isSafeExternalHref = (href) => {
  if (typeof href !== 'string') return false;

  const normalized = href.trim();
  if (!normalized || normalized.startsWith('//')) return false;

  if (normalized.startsWith('mailto:')) return true;

  try {
    const url = new URL(normalized);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
};

// normalizeText unifica acentos y mayúsculas para mejorar matching de consultas.
const normalizeText = (text) =>
  sanitizeInput(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

const getAssistantReply = (userText) => {
  const query = normalizeText(userText);

  if (query.includes('servicio') || query.includes('iso')) {
    return FAQ_DATA.find((faq) => faq.id === 'servicios')?.answer;
  }

  if (query.includes('pais') || query.includes('cobertura')) {
    return FAQ_DATA.find((faq) => faq.id === 'cobertura')?.answer;
  }

  if (
    query.includes('tiempo') ||
    query.includes('demora') ||
    query.includes('duracion')
  ) {
    return FAQ_DATA.find((faq) => faq.id === 'tiempos')?.answer;
  }

  if (
    query.includes('contacto') ||
    query.includes('whatsapp') ||
    query.includes('asesor')
  ) {
    return FAQ_DATA.find((faq) => faq.id === 'contacto')?.answer;
  }

  return 'Puedo ayudarte con servicios, cobertura, tiempos o contacto. Si prefieres atención humana, usa el botón de WhatsApp.';
};

// ═══════════════════════════════════════════════════════════════════════════════
// CUSTOM HOOKS — REUTILIZACIÓN, UX Y PERFORMANCE
// Cada hook encapsula una responsabilidad puntual y fácil de testear mentalmente.
// ═══════════════════════════════════════════════════════════════════════════════

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setPrefersReducedMotion(media.matches);

    handleChange();
    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

const useWindowSize = () => {
  const getWidth = () =>
    typeof window !== 'undefined' ? window.innerWidth : BREAKPOINTS.desktop;

  const [width, setWidth] = useState(getWidth);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
    isDesktop: width >= BREAKPOINTS.desktop,
  };
};

const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasBeenInView(true);
      },
      {
        threshold: 0.15,
        ...options,
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [ref, options]);

  return { isInView, hasBeenInView };
};

const useInViewAnimation = (options = {}) => {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { hasBeenInView } = useInView(ref, options);

  const style = prefersReducedMotion
    ? { opacity: 1, transform: 'translateY(0)' }
    : {
        opacity: hasBeenInView ? 1 : 0,
        transform: hasBeenInView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity ${ANIMATION.duration.slow}ms ${ANIMATION.easing.inView}, transform ${ANIMATION.duration.slow}ms ${ANIMATION.easing.inView}`,
      };

  return { ref, style, isVisible: hasBeenInView };
};

const useScrollSpy = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      {
        rootMargin: `-${NAVBAR_HEIGHT}px 0px -55% 0px`,
        threshold: [0.15, 0.3, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};

const useThrottle = (callback, delay) => {
  const lastRun = useRef(0);

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = now;
      }
    },
    [callback, delay]
  );
};

const useTextReveal = ({ forceMotion = false } = {}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const getRevealStyle = useCallback(
    (index, animationName = 'executiveLetterReveal', delayMs, durationMs) => {
      if (prefersReducedMotion && !forceMotion) {
        return { opacity: 1, transform: 'translateY(0)' };
      }

      return {
        opacity: 0,
        animation: `${animationName} ${durationMs ?? ANIMATION.duration.reveal}ms ${ANIMATION.easing.smoothOut} both`,
        animationDelay:
          typeof delayMs === 'number'
            ? `${delayMs}ms`
            : `${index * ANIMATION.stagger.delay}ms`,
        willChange: 'transform, opacity',
      };
    },
    [forceMotion, prefersReducedMotion]
  );

  return { getRevealStyle };
};

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

const useCountUp = (target, duration, start) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;

    let frameId;
    let startTime;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(Math.round(eased * target));

      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [target, duration, start]);

  return value;
};

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS DE ESTILO — REDUCCIÓN DE VERBOSIDAD
// Este helper evita repetir ternarios largos en estilos inline.
// ═══════════════════════════════════════════════════════════════════════════════

const createStyles = ({ isMobile = false, isHovered = false } = {}) => ({
  section: {
    padding: isMobile
      ? `${SPACING.xxl} ${SPACING.md}`
      : `${SPACING.xxxl} ${SPACING.lg}`,
  },
  card: {
    borderRadius: '12px',
    transition: `all ${ANIMATION.duration.medium}ms ${ANIMATION.easing.default}`,
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTES ATÓMICOS — BASE UI REUTILIZABLE
// Estos componentes son piezas pequeñas para construir secciones completas.
// ═══════════════════════════════════════════════════════════════════════════════

const Button = ({
  variant = 'primary',
  children,
  style,
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    primary: {
      backgroundColor: COLORS.teal,
      color: COLORS.white,
      border: `2px solid ${COLORS.teal}`,
      boxShadow: `0 ${SPACING.xs} ${SPACING.md} rgba(11, 159, 168, 0.3)`,
    },
    secondary: {
      backgroundColor: 'transparent',
      color: COLORS.navy,
      border: `2px solid ${COLORS.navy}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: COLORS.grayDark,
      border: `2px solid transparent`,
    },
  };

  const hoverVariants = {
    primary: {
      transform: 'translateY(-2px)',
      boxShadow: `0 ${SPACING.sm} ${SPACING.lg} rgba(11, 159, 168, 0.4)`,
    },
    secondary: {
      backgroundColor: COLORS.navy,
      color: COLORS.white,
    },
    ghost: {
      backgroundColor: COLORS.grayLight,
    },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: `${SPACING.sm} ${SPACING.lg}`,
        borderRadius: '8px',
        fontWeight: 600,
        fontSize: '16px',
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: `all ${ANIMATION.duration.medium}ms ${ANIMATION.easing.default}`,
        ...variants[variant],
        ...(isHovered ? hoverVariants[variant] : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle, light = false }) => (
  <div style={{ textAlign: 'center', marginBottom: SPACING.xl }}>
    <h2
      style={{
        fontSize: `calc(${SPACING.lg} * ${PHI})`,
        lineHeight: 1.1,
        color: light ? COLORS.white : COLORS.navy,
        marginBottom: SPACING.sm,
      }}
    >
      {title}
    </h2>
    {subtitle ? (
      <p
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          color: light ? COLORS.grayLight : COLORS.grayMed,
          fontSize: SPACING.md,
          lineHeight: PHI,
          letterSpacing: '0.01em',
        }}
      >
        {subtitle}
      </p>
    ) : null}
  </div>
);

const SectionDivider = ({ nextColor }) => (
  <div
    aria-hidden="true"
    style={{
      height: '42px',
      backgroundColor: nextColor,
      clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 100%)',
    }}
  />
);

const DaVinciLogo = ({ size = '28px' }) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '700px',
        position: 'relative',
      }}
    >
      <span
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          background: `radial-gradient(circle at 28% 24%, ${COLORS.white} 0%, rgba(11, 159, 168, 0.25) 22%, rgba(11, 36, 71, 0.95) 100%)`,
          boxShadow:
            'inset -4px -6px 9px rgba(11, 36, 71, 0.48), inset 2px 2px 6px rgba(248, 250, 252, 0.6), 0 4px 10px rgba(11, 36, 71, 0.3)',
          animation: prefersReducedMotion
            ? undefined
            : 'daVinciCoreDrift 5.2s ease-in-out infinite',
          willChange: 'transform',
        }}
      >
        <span
          style={{
            position: 'absolute',
            inset: '8%',
            borderRadius: '50%',
            border: `1px solid rgba(11, 159, 168, 0.65)`,
            transform: 'translateZ(3px)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'repeating-conic-gradient(from 0deg, rgba(248,250,252,0.16) 0deg 8deg, transparent 8deg 16deg)',
            mixBlendMode: 'screen',
            opacity: 0.22,
            animation: prefersReducedMotion
              ? undefined
              : 'daVinciGridSpin 8s linear infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '58%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${COLORS.white}, transparent)`,
            transform: 'translate(-50%, -50%) rotate(0deg)',
            transformOrigin: 'center',
            opacity: 0.75,
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '58%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${COLORS.teal}, transparent)`,
            transform: 'translate(-50%, -50%) rotate(72deg)',
            transformOrigin: 'center',
            opacity: 0.72,
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '58%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${COLORS.white}, transparent)`,
            transform: 'translate(-50%, -50%) rotate(144deg)',
            transformOrigin: 'center',
            opacity: 0.75,
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '58%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${COLORS.teal}, transparent)`,
            transform: 'translate(-50%, -50%) rotate(216deg)',
            transformOrigin: 'center',
            opacity: 0.72,
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '58%',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${COLORS.white}, transparent)`,
            transform: 'translate(-50%, -50%) rotate(288deg)',
            transformOrigin: 'center',
            opacity: 0.75,
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: '17%',
            borderRadius: '50%',
            border: `1px solid rgba(248, 250, 252, 0.4)`,
            animation: prefersReducedMotion
              ? undefined
              : 'daVinciRingPulse 2.4s ease-in-out infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            background:
              'radial-gradient(circle at 50% 50%, rgba(248,250,252,0.95) 0%, rgba(11,159,168,0.85) 35%, rgba(11,36,71,0) 60%)',
            width: '18%',
            height: '18%',
            borderRadius: '50%',
            left: '41%',
            top: '41%',
          }}
        />
      </span>

      <span
        style={{
          position: 'absolute',
          inset: '-10%',
          borderRadius: '50%',
          border: `1px solid rgba(248,250,252,0.34)`,
          borderTopColor: 'rgba(248,250,252,0.9)',
          borderBottomColor: 'rgba(11,36,71,0.45)',
          animation: prefersReducedMotion
            ? undefined
            : 'daVinciOuterOrbit 4.4s linear infinite',
          pointerEvents: 'none',
        }}
      />
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTES DE SECCIÓN — ESTRUCTURA PRINCIPAL DE LA LANDING
// Cada sección mantiene su responsabilidad y aplica animaciones in-view.
// ═══════════════════════════════════════════════════════════════════════════════

const Navbar = ({ activeSection }) => {
  const { isMobile } = useWindowSize();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = useMemo(
    () => [
      { id: 'inicio', label: 'Inicio' },
      { id: 'nosotros', label: 'Nosotros' },
      { id: 'servicios', label: 'Servicios' },
      { id: 'equipo', label: 'Equipo' },
      { id: 'contacto', label: 'Contacto' },
    ],
    []
  );

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (id === 'inicio') {
        window.dispatchEvent(new Event('aim:hero-replay'));
      }
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen || !menuRef.current) return undefined;

    const focusable = menuRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    const trapFocus = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isMobileMenuOpen]);

  return (
    <header role="banner">
      <nav
        aria-label="Navegación principal"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${NAVBAR_HEIGHT}px`,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.94)' : COLORS.white,
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled
            ? `0 2px ${SPACING.sm} rgba(11, 36, 71, 0.1)`
            : 'none',
          transition: `all ${ANIMATION.duration.medium}ms ${ANIMATION.easing.default}`,
        }}
      >
        <div
          style={{
            maxWidth: `${BREAKPOINTS.desktop}px`,
            margin: '0 auto',
            height: '100%',
            padding: isMobile ? `0 ${SPACING.md}` : `0 ${SPACING.lg}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <button
            type="button"
            onClick={() => scrollToSection('inicio')}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: COLORS.navy,
              fontWeight: 800,
              fontSize: isMobile ? '24px' : '28px',
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: SPACING.xs,
            }}
          >
            <DaVinciLogo size={isMobile ? '24px' : '28px'} />
            <span style={{ color: COLORS.teal }}>AIM</span>
          </button>

          {!isMobile ? (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: SPACING.lg }}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: isActive ? COLORS.teal : COLORS.grayDark,
                      fontWeight: isActive ? 700 : 500,
                      position: 'relative',
                      padding: `${SPACING.xs} 0`,
                    }}
                  >
                    {item.label}
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: '-4px',
                        height: '2px',
                        width: isActive ? '100%' : '0%',
                        backgroundColor: COLORS.teal,
                        transition: `width 0.3s ease`,
                      }}
                    />
                  </button>
                );
              })}
              <Button onClick={() => scrollToSection('contacto')}>
                Contáctanos
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
              aria-expanded={isMobileMenuOpen}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '28px',
                color: COLORS.navy,
              }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>
      </nav>

      {isMobile && isMobileMenuOpen ? (
        <>
          <div
            aria-hidden="true"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 998,
              backgroundColor: 'rgba(11, 36, 71, 0.45)',
            }}
          />
          <div
            ref={menuRef}
            style={{
              position: 'fixed',
              top: `${NAVBAR_HEIGHT}px`,
              left: SPACING.md,
              right: SPACING.md,
              zIndex: 999,
              backgroundColor: COLORS.white,
              borderRadius: '12px',
              boxShadow: `0 ${SPACING.md} ${SPACING.xl} rgba(11, 36, 71, 0.2)`,
              padding: SPACING.md,
            }}
          >
            {navItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: SPACING.md,
                  border: 'none',
                  borderRadius: '8px',
                  marginBottom: SPACING.xs,
                  cursor: 'pointer',
                  backgroundColor:
                    activeSection === item.id ? COLORS.grayLight : COLORS.white,
                  color:
                    activeSection === item.id ? COLORS.teal : COLORS.grayDark,
                  animation: `fadeSlideIn ${ANIMATION.duration.medium}ms ${ANIMATION.easing.smoothOut} both`,
                  animationDelay: `${index * ANIMATION.stagger.delay}ms`,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </header>
  );
};

const Hero = () => {
  const { isMobile, isTablet } = useWindowSize();
  const [animationCycle, setAnimationCycle] = useState(0);
  const titleLineOne = useMemo(() => 'Asesorías Integrales de', []);
  const titleLineTwo = useMemo(() => 'Gestión', []);
  const { getRevealStyle } = useTextReveal({ forceMotion: true });

  const letterIntervalMs = 85;
  const letterDurationMs = 360;
  const lineOneChars = useMemo(() => Array.from(titleLineOne), [titleLineOne]);
  const lineTwoChars = useMemo(() => Array.from(titleLineTwo), [titleLineTwo]);
  const lineOneVisibleCount = useMemo(
    () => lineOneChars.filter((char) => char !== ' ').length,
    [lineOneChars]
  );
  const totalAnimatedChars =
    lineOneVisibleCount + lineTwoChars.filter((char) => char !== ' ').length;
  const groupFloatDelayMs = totalAnimatedChars * letterIntervalMs + 800;

  const renderAnimatedLine = useCallback(
    (chars, startIndex, isAccent = false) => (
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          columnGap: 0,
          rowGap: 0,
        }}
      >
        {chars.map((char, index) => {
          if (char === ' ') {
            return (
              <span
                key={`space-${startIndex}-${index}`}
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: '0.35em',
                }}
              >
                &nbsp;
              </span>
            );
          }

          const visibleIndex =
            chars.slice(0, index + 1).filter((item) => item !== ' ').length - 1;
          const currentIndex = startIndex + visibleIndex;

          return (
            <span
              key={`char-${char}-${currentIndex}-${animationCycle}`}
              style={{
                display: 'inline-block',
                color: isAccent ? COLORS.teal : COLORS.navy,
                ...getRevealStyle(
                  currentIndex,
                  'executiveLetterReveal',
                  currentIndex * letterIntervalMs,
                  letterDurationMs
                ),
              }}
            >
              {char}
            </span>
          );
        })}
      </span>
    ),
    [animationCycle, getRevealStyle, letterDurationMs, letterIntervalMs]
  );

  const scrollToContact = useCallback(() => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const scrollToServices = useCallback(() => {
    document
      .getElementById('servicios')
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const styles = createStyles({ isMobile });

  useEffect(() => {
    const replayAnimation = () => {
      setAnimationCycle((prev) => prev + 1);
    };

    window.addEventListener('aim:hero-replay', replayAnimation);

    return () => {
      window.removeEventListener('aim:hero-replay', replayAnimation);
    };
  }, []);

  return (
    <section
      id="inicio"
      style={{
        ...styles.section,
        minHeight: '100vh',
        paddingTop: isMobile ? `${SPACING.xxl}` : `${SPACING.xxxl}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(11,159,168,0.02) 50%, rgba(248,250,252,1) 100%)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(11,36,71,1) 1px, transparent 0)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '920px', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-block',
            padding: `${SPACING.xs} ${SPACING.md}`,
            borderRadius: '999px',
            backgroundColor: COLORS.teal,
            color: COLORS.white,
            fontWeight: 700,
            fontSize: isMobile ? '11px' : '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: SPACING.lg,
          }}
        >
          Presencia en 4 países
        </div>

        <h1
          style={{
            fontSize: isMobile
              ? 'clamp(34px, 11vw, 44px)'
              : isTablet
                ? 'clamp(48px, 7vw, 58px)'
                : 'clamp(58px, 5.5vw, 72px)',
            color: COLORS.navy,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            marginBottom: SPACING.lg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: isMobile ? '4px' : SPACING.xs,
            animation: `executiveGroupFloat 5.5s ease-in-out infinite`,
            animationDelay: `${groupFloatDelayMs}ms`,
          }}
        >
          {renderAnimatedLine(lineOneChars, 0, false)}
          {renderAnimatedLine(lineTwoChars, lineOneVisibleCount, true)}
        </h1>

        <p
          style={{
            color: COLORS.grayMed,
            maxWidth: '760px',
            margin: `0 auto ${SPACING.xl}`,
            fontSize: isMobile ? '16px' : '18px',
            lineHeight: PHI,
            letterSpacing: '0.01em',
          }}
        >
          Consultora multinacional especializada en Seguridad, Calidad,
          Sostenibilidad y Ciberseguridad. Más de 10 años transformando
          organizaciones con estándares ISO y cumplimiento regulatorio.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: SPACING.md,
            flexDirection: isMobile ? 'column' : 'row',
            marginBottom: SPACING.lg,
          }}
        >
          <Button
            onClick={scrollToContact}
            style={isMobile ? { width: '100%' } : undefined}
          >
            Solicitar Consultoría →
          </Button>
          <Button
            variant="secondary"
            onClick={scrollToServices}
            style={isMobile ? { width: '100%' } : undefined}
          >
            Ver Servicios
          </Button>
        </div>

        <p
          style={{
            color: COLORS.grayMed,
            fontSize: '14px',
          }}
        >
          ✓ +100 empresas asesoradas · ✓ Certificaciones ISO · ✓ Soporte 24/7
        </p>
      </div>
    </section>
  );
};

const Stats = () => {
  const { isMobile } = useWindowSize();
  const { ref, style, isVisible } = useInViewAnimation({ threshold: 0.15 });

  const stats = useMemo(
    () => [
      {
        id: 'years',
        target: 10,
        suffix: '+',
        label: 'Años de experiencia',
        icon: '📅',
      },
      {
        id: 'countries',
        target: 4,
        suffix: '',
        label: 'Países de operación',
        icon: '🌍',
      },
      {
        id: 'areas',
        target: 6,
        suffix: '',
        label: 'Áreas de consultoría',
        icon: '🎯',
      },
      {
        id: 'clients',
        target: 100,
        suffix: '+',
        label: 'Empresas asesoradas',
        icon: '🏆',
      },
    ],
    []
  );

  return (
    <section
      ref={ref}
      style={{
        ...style,
        backgroundColor: COLORS.navy,
        padding: isMobile
          ? `${SPACING.xxl} ${SPACING.md}`
          : `${SPACING.xxl} ${SPACING.lg}`,
      }}
    >
      <div
        style={{
          maxWidth: `${BREAKPOINTS.desktop}px`,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: SPACING.lg,
          textAlign: 'center',
        }}
      >
        {stats.map((item) => (
          <StatItem key={item.id} item={item} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
};

const StatItem = ({ item, isVisible }) => {
  const count = useCountUp(item.target, ANIMATION.duration.countUp, isVisible);

  return (
    <div>
      <div style={{ fontSize: '44px', marginBottom: SPACING.sm }}>
        {item.icon}
      </div>
      <div
        style={{
          fontSize: `calc(${SPACING.lg} * ${PHI})`,
          color: COLORS.teal,
          fontWeight: 800,
          marginBottom: SPACING.xs,
        }}
      >
        {count}
        {item.suffix}
      </div>
      <p style={{ color: COLORS.grayLight, margin: 0 }}>{item.label}</p>
    </div>
  );
};

const About = () => {
  const { isMobile } = useWindowSize();
  const { ref, style } = useInViewAnimation({ threshold: 0.15 });

  const reasons = useMemo(
    () => [
      {
        id: 'equipo-certificado',
        icon: '🎓',
        text: 'Equipo multidisciplinario con certificaciones internacionales.',
      },
      {
        id: 'presencia-global',
        icon: '🌐',
        text: 'Presencia global con comprensión de normativas locales.',
      },
      {
        id: 'metodologias',
        icon: '📊',
        text: 'Metodologías probadas y resultados medibles.',
      },
      {
        id: 'confidencialidad',
        icon: '🔒',
        text: 'Confidencialidad y ética profesional garantizada.',
      },
      {
        id: 'rapidez',
        icon: '⚡',
        text: 'Respuesta rápida y soporte continuo.',
      },
      {
        id: 'innovacion',
        icon: '💡',
        text: 'Innovación y mejora continua en cada proyecto.',
      },
    ],
    []
  );

  return (
    <section
      id="nosotros"
      ref={ref}
      style={{
        ...createStyles({ isMobile }).section,
        ...style,
        backgroundColor: COLORS.white,
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle
          title="¿Quiénes Somos?"
          subtitle="Consultora multinacional con +10 años transformando organizaciones"
        />
        <p
          style={{
            fontSize: SPACING.md,
            lineHeight: PHI,
            color: COLORS.grayDark,
            textAlign: 'center',
            marginBottom: SPACING.xl,
          }}
        >
          <strong>AIM — Asesorías Integrales de Gestión</strong> opera en
          Colombia, España, Canadá y Australia, ofreciendo soluciones en SST,
          Sistemas de Gestión ISO, Sostenibilidad, Electricidad y
          Ciberseguridad.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: SPACING.md,
          }}
        >
          {reasons.map((reason) => (
            <div
              key={reason.id}
              style={{
                backgroundColor: COLORS.grayLight,
                borderRadius: '10px',
                padding: SPACING.md,
                display: 'flex',
                alignItems: 'flex-start',
                gap: SPACING.sm,
              }}
            >
              <span style={{ fontSize: '28px' }}>{reason.icon}</span>
              <p style={{ margin: 0, color: COLORS.grayDark, lineHeight: PHI }}>
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { isMobile } = useWindowSize();
  const { ref, style } = useInViewAnimation({ threshold: 0.15 });

  return (
    <section
      id="servicios"
      ref={ref}
      style={{
        ...createStyles({ isMobile }).section,
        ...style,
        backgroundColor: COLORS.grayLight,
      }}
    >
      <div style={{ maxWidth: `${BREAKPOINTS.desktop}px`, margin: '0 auto' }}>
        <SectionTitle
          title="Nuestros Servicios"
          subtitle="Soluciones integrales en 6 áreas de consultoría especializada"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: SPACING.lg,
          }}
        >
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const helperStyles = createStyles({ isHovered });

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...helperStyles.card,
        backgroundColor: COLORS.white,
        border: `1px solid ${COLORS.grayLight}`,
        boxShadow: isHovered
          ? `0 ${SPACING.sm} ${SPACING.lg} rgba(11, 36, 71, 0.16)`
          : `0 ${SPACING.xs} ${SPACING.md} rgba(11, 36, 71, 0.08)`,
        transform: isHovered
          ? 'perspective(1000px) rotateY(2deg) translateY(-6px)'
          : 'perspective(1000px) rotateY(0deg) translateY(0)',
        borderLeftStyle: 'solid',
        borderLeftColor: COLORS.teal,
        borderLeftWidth: isHovered ? '4px' : '0px',
        padding: SPACING.lg,
      }}
    >
      <div
        style={{
          fontSize: '44px',
          marginBottom: SPACING.md,
          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
          transition: `transform ${ANIMATION.duration.medium}ms ${ANIMATION.easing.spring}`,
        }}
      >
        {service.icon}
      </div>

      <h3 style={{ color: COLORS.navy, marginBottom: SPACING.sm }}>
        {service.title}
      </h3>
      <p
        style={{
          color: COLORS.grayMed,
          lineHeight: PHI,
          marginBottom: SPACING.md,
          fontSize: '14px',
        }}
      >
        {service.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: SPACING.xs }}>
        {service.standards.map((standard) => (
          <span
            key={standard}
            style={{
              borderLeft: `2px solid ${COLORS.teal}`,
              padding: `4px ${SPACING.sm}`,
              borderRadius: '4px',
              backgroundColor: isHovered ? COLORS.teal : COLORS.grayLight,
              color: isHovered ? COLORS.white : COLORS.grayDark,
              fontWeight: 600,
              fontSize: '11px',
              transition: `all ${ANIMATION.duration.fast}ms ${ANIMATION.easing.default}`,
            }}
          >
            {standard}
          </span>
        ))}
      </div>
    </article>
  );
};

const Team = () => {
  const { isMobile } = useWindowSize();
  const { ref, style } = useInViewAnimation({ threshold: 0.15 });

  return (
    <section
      id="equipo"
      ref={ref}
      style={{
        ...createStyles({ isMobile }).section,
        ...style,
        backgroundColor: COLORS.white,
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle
          title="Nuestro Equipo"
          subtitle="Profesionales certificados con amplia experiencia internacional"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: SPACING.lg,
          }}
        >
          {TEAM_DATA.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textAlign: 'center',
        padding: SPACING.md,
        borderRadius: '12px',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 ${SPACING.md} ${SPACING.xl} rgba(11, 36, 71, 0.18)`
          : `0 ${SPACING.xs} ${SPACING.md} rgba(11, 36, 71, 0.08)`,
        transition: `all ${ANIMATION.duration.medium}ms ${ANIMATION.easing.default}`,
      }}
    >
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          margin: `0 auto ${SPACING.md}`,
          overflow: 'hidden',
          borderStyle: 'solid',
          borderColor: COLORS.teal,
          borderWidth: isHovered ? '6px' : '4px',
          transition: `all ${ANIMATION.duration.medium}ms ${ANIMATION.easing.spring}`,
          backgroundColor: COLORS.grayLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: COLORS.navy,
          fontWeight: 700,
          fontSize: '34px',
        }}
      >
        {!imageError ? (
          <img
            src={member.avatar}
            alt={member.name}
            onError={() => setImageError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span>{member.initials}</span>
        )}
      </div>
      <h4
        style={{
          marginBottom: SPACING.xs,
          color: isHovered ? COLORS.teal : COLORS.navy,
          transition: `color ${ANIMATION.duration.fast}ms ${ANIMATION.easing.default}`,
        }}
      >
        {member.name}
      </h4>
      <p style={{ margin: 0, color: COLORS.grayMed, lineHeight: PHI }}>
        {member.role}
      </p>
    </article>
  );
};

const Coverage = () => {
  const { isMobile } = useWindowSize();
  const { ref, style } = useInViewAnimation({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      style={{
        ...style,
        padding: isMobile
          ? `${SPACING.xxl} ${SPACING.md}`
          : `${SPACING.xxl} ${SPACING.lg}`,
        backgroundColor: COLORS.navy,
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle
          title="Cobertura Internacional"
          subtitle="Operación activa en cuatro mercados estratégicos"
          light
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: SPACING.xl,
          }}
        >
          {COVERAGE_DATA.map((country, index) => (
            <div
              key={country.id}
              style={{
                minWidth: '140px',
                animation: `floatFlag 3s ease-in-out infinite`,
                animationDelay: `${index * 0.4}s`,
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: '82px',
                  height: '56px',
                  margin: `0 auto ${SPACING.xs}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `2px solid ${COLORS.white}`,
                  boxShadow: `0 ${SPACING.xs} ${SPACING.sm} rgba(0, 0, 0, 0.25)`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {country.palette.map((color, bandIndex) => (
                  <span
                    key={`${country.id}-band-${bandIndex}`}
                    style={{
                      flex: 1,
                      backgroundColor: color,
                      display: 'block',
                    }}
                  />
                ))}
              </div>
              <p
                style={{ margin: 0, color: COLORS.grayLight, fontWeight: 600 }}
              >
                {country.country}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FloatingField = ({
  field,
  type = 'text',
  value,
  error,
  isFocused,
  icon,
  onFocus,
  onBlur,
  onChange,
  options,
}) => {
  const isFloat = isFocused || value.length > 0;

  const wrapperStyle = {
    position: 'relative',
    marginBottom: SPACING.md,
  };

  const inputStyle = {
    width: '100%',
    borderRadius: '10px',
    border: `2px solid ${error ? COLORS.error : isFocused ? COLORS.teal : COLORS.grayLight}`,
    padding: `${SPACING.md} ${SPACING.sm} ${SPACING.sm}`,
    fontSize: '16px',
    fontFamily: 'inherit',
    transition: `border-color ${ANIMATION.duration.fast}ms ${ANIMATION.easing.default}`,
    outline: 'none',
    backgroundColor: COLORS.white,
    color: COLORS.grayDark,
  };

  const labelStyle = {
    position: 'absolute',
    left: SPACING.sm,
    top: isFloat ? '6px' : '16px',
    fontSize: isFloat ? '12px' : '15px',
    color: isFloat ? COLORS.teal : COLORS.grayMed,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    pointerEvents: 'none',
    transition: `all ${ANIMATION.duration.fast}ms ${ANIMATION.easing.default}`,
    backgroundColor: COLORS.white,
    paddingRight: '2px',
  };

  if (type === 'textarea') {
    return (
      <div style={wrapperStyle}>
        <label htmlFor={field} style={labelStyle}>
          <span>{icon}</span>
          <span>{field}</span>
        </label>
        <textarea
          id={field}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          rows={5}
          placeholder="Escribe tu mensaje"
          style={{ ...inputStyle, resize: 'vertical' }}
          maxLength={CONFIG.security.maxMessageLength}
        />
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div style={wrapperStyle}>
        <label htmlFor={field} style={labelStyle}>
          <span>{icon}</span>
          <span>{field}</span>
        </label>
        <select
          id={field}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          style={inputStyle}
        >
          <option value="">Seleccionar...</option>
          {options?.map((option) => (
            <option key={option.id} value={option.title}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <label htmlFor={field} style={labelStyle}>
        <span>{icon}</span>
        <span>{field}</span>
      </label>
      <input
        id={field}
        type={type}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={`Ingresa ${field.toLowerCase()}`}
        style={inputStyle}
      />
    </div>
  );
};

const Contact = () => {
  const { isMobile } = useWindowSize();
  const { ref, style } = useInViewAnimation({ threshold: 0.15 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState('');
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const resetStatusTimeoutRef = useRef(null);

  useEffect(
    () => () => {
      if (resetStatusTimeoutRef.current) {
        clearTimeout(resetStatusTimeoutRef.current);
      }
    },
    []
  );

  const handleInputChange = useCallback((field, value) => {
    const sanitized = sanitizeInput(value);
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validateForm = useCallback(() => {
    const nextErrors = {};

    if (
      formData.name.length < 2 ||
      formData.name.length > CONFIG.security.maxNameLength
    ) {
      nextErrors.name = 'El nombre debe tener entre 2 y 100 caracteres.';
    }

    if (!validateEmail(formData.email)) {
      nextErrors.email = 'Email inválido.';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      nextErrors.phone = 'Teléfono inválido.';
    }

    if (
      formData.message.length < 10 ||
      formData.message.length > CONFIG.security.maxMessageLength
    ) {
      nextErrors.message = 'El mensaje debe tener entre 10 y 1000 caracteres.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [formData]);

  // submitAction ejecuta validación, envío real y fallback seguro de correo.
  // Se separa para reutilizarlo dentro del throttle anti-spam.
  const submitAction = useCallback(async () => {
    if (!validateForm()) {
      setStatus('error');
      setStatusMessage('Por favor corrige los errores antes de enviar.');
      return;
    }

    setStatus('sending');
    setStatusMessage('');

    const payload = {
      name: escapeHTML(formData.name),
      email: escapeHTML(formData.email),
      phone: escapeHTML(formData.phone),
      company: escapeHTML(formData.company),
      service: escapeHTML(formData.service),
      message: escapeHTML(formData.message),
      source: CONFIG.urls.domain,
      sentAt: new Date().toISOString(),
    };

    try {
      if (CONFIG.forms.endpoint) {
        if (!isSecureEndpoint(CONFIG.forms.endpoint)) {
          throw new Error(
            'El endpoint debe usar HTTPS o ruta relativa segura.'
          );
        }

        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 8000);

        const response = await fetch(
          CONFIG.forms.endpoint,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            mode: 'cors',
            cache: 'no-store',
            credentials: 'omit',
            redirect: 'error',
            referrerPolicy: 'no-referrer',
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('No fue posible enviar el formulario al endpoint.');
        }
      } else {
        const mailSubject = encodeURIComponent('Nueva consulta desde AIM');
        const mailBody = encodeURIComponent(
          `Nombre: ${payload.name}\nEmail: ${payload.email}\nTeléfono: ${payload.phone}\nEmpresa: ${payload.company}\nServicio: ${payload.service}\n\nMensaje:\n${payload.message}`
        );

        window.location.href = `mailto:${CONFIG.emails.contact}?subject=${mailSubject}&body=${mailBody}`;
      }

      setStatus('success');
      setStatusMessage(
        CONFIG.forms.endpoint
          ? 'Mensaje enviado correctamente. Te responderemos pronto.'
          : 'Se abrió tu cliente de correo para completar el envío.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });

      if (resetStatusTimeoutRef.current) {
        clearTimeout(resetStatusTimeoutRef.current);
      }

      resetStatusTimeoutRef.current = window.setTimeout(() => {
        setStatus('idle');
        setStatusMessage('');
      }, 3500);
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof Error && error.name === 'AbortError'
          ? 'El envío demoró demasiado. Intenta nuevamente.'
          : error instanceof Error
            ? error.message
            : 'Ocurrió un error al enviar. Intenta nuevamente.'
      );
    }
  }, [formData, validateForm]);

  const throttledSubmit = useThrottle(
    submitAction,
    CONFIG.security.rateLimitDelay
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      throttledSubmit();
    },
    [throttledSubmit]
  );

  return (
    <section
      id="contacto"
      ref={ref}
      style={{
        ...createStyles({ isMobile }).section,
        ...style,
        backgroundColor: COLORS.white,
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <SectionTitle
          title="Contáctanos"
          subtitle="Solicita una consultoría sin compromiso. Respuesta en menos de 24h."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: SPACING.xl,
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <FloatingField
              field="name"
              value={formData.name}
              error={errors.name}
              isFocused={focusedField === 'name'}
              icon="👤"
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            {errors.name ? <FieldError text={errors.name} /> : null}

            <FloatingField
              field="email"
              type="email"
              value={formData.email}
              error={errors.email}
              isFocused={focusedField === 'email'}
              icon="📧"
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {errors.email ? <FieldError text={errors.email} /> : null}

            <FloatingField
              field="phone"
              type="tel"
              value={formData.phone}
              error={errors.phone}
              isFocused={focusedField === 'phone'}
              icon="📱"
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField('')}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            {errors.phone ? <FieldError text={errors.phone} /> : null}

            <FloatingField
              field="company"
              value={formData.company}
              isFocused={focusedField === 'company'}
              icon="🏢"
              onFocus={() => setFocusedField('company')}
              onBlur={() => setFocusedField('')}
              onChange={(e) => handleInputChange('company', e.target.value)}
            />

            <FloatingField
              field="service"
              type="select"
              value={formData.service}
              isFocused={focusedField === 'service'}
              icon="🧩"
              options={SERVICES_DATA}
              onFocus={() => setFocusedField('service')}
              onBlur={() => setFocusedField('')}
              onChange={(e) => handleInputChange('service', e.target.value)}
            />

            <FloatingField
              field="message"
              type="textarea"
              value={formData.message}
              error={errors.message}
              isFocused={focusedField === 'message'}
              icon="💬"
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField('')}
              onChange={(e) => handleInputChange('message', e.target.value)}
            />
            <p
              style={{
                marginTop: '-8px',
                color: COLORS.grayMed,
                fontSize: '12px',
              }}
            >
              {formData.message.length}/{CONFIG.security.maxMessageLength}
            </p>
            {errors.message ? <FieldError text={errors.message} /> : null}

            <Button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: SPACING.xs,
                opacity: status === 'sending' ? 0.75 : 1,
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              }}
            >
              {status === 'sending' ? (
                <>
                  <span className="aim-spinner" />
                  <span>Enviando...</span>
                </>
              ) : (
                <span>Enviar Consulta →</span>
              )}
            </Button>

            <div
              aria-live="polite"
              style={{ minHeight: '34px', marginTop: SPACING.md }}
            >
              {status === 'success' ? (
                <div
                  style={{
                    backgroundColor: COLORS.success,
                    color: COLORS.white,
                    padding: SPACING.sm,
                    borderRadius: '8px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: SPACING.xs,
                  }}
                >
                  <span style={{ animation: 'checkBounce 0.6s ease both' }}>
                    ✓
                  </span>
                  <span>
                    {statusMessage || 'Mensaje enviado correctamente.'}
                  </span>
                </div>
              ) : null}

              {status === 'error' ? (
                <div
                  style={{
                    backgroundColor: COLORS.error,
                    color: COLORS.white,
                    padding: SPACING.sm,
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  {statusMessage || 'No se pudo enviar el formulario.'}
                </div>
              ) : null}
            </div>
          </form>

          <aside>
            <InfoBlock
              title="📧 Email"
              value={CONFIG.emails.contact}
              href={`mailto:${CONFIG.emails.contact}`}
            />
            <InfoBlock
              title="💬 WhatsApp"
              value="+57 316 820 1816"
              href={`https://wa.me/${CONFIG.whatsapp.number}`}
              external
            />
            <InfoBlock
              title="⏰ Horario"
              value="Lunes a Viernes: 8:00 AM - 6:00 PM (GMT-5)"
            />
            <InfoBlock
              title="🌍 Países"
              value="Colombia · España · Canadá · Australia"
            />
          </aside>
        </div>
      </div>
    </section>
  );
};

const FieldError = ({ text }) => (
  <p
    style={{
      marginTop: '-10px',
      marginBottom: SPACING.sm,
      color: COLORS.error,
      fontSize: '12px',
    }}
  >
    {text}
  </p>
);

const InfoBlock = ({ title, value, href, external = false }) => (
  <div style={{ marginBottom: SPACING.lg }}>
    <p
      style={{
        marginBottom: SPACING.xs,
        color: COLORS.grayMed,
        fontSize: '14px',
      }}
    >
      {title}
    </p>
    {href && (!external || isSafeExternalHref(href)) ? (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer external nofollow' : undefined}
        style={{ color: COLORS.teal, fontWeight: 600, textDecoration: 'none' }}
      >
        {value}
      </a>
    ) : (
      <p style={{ margin: 0, color: COLORS.grayDark }}>{value}</p>
    )}
  </div>
);

const Footer = () => {
  const { isMobile } = useWindowSize();

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: COLORS.navy,
        padding: `${SPACING.xl} ${SPACING.lg}`,
      }}
    >
      <div style={{ maxWidth: `${BREAKPOINTS.desktop}px`, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr 1fr',
            gap: SPACING.lg,
          }}
        >
          <div>
            <p
              style={{
                fontSize: '32px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: COLORS.white,
                marginBottom: SPACING.sm,
                display: 'flex',
                alignItems: 'center',
                gap: SPACING.xs,
              }}
            >
              <DaVinciLogo size="28px" />
              <span style={{ color: COLORS.teal }}>AIM</span>
            </p>
            <p style={{ margin: 0, color: COLORS.grayLight }}>
              Asesorías Integrales de Gestión
            </p>
          </div>

          <div>
            <p
              style={{
                color: COLORS.white,
                fontWeight: 700,
                marginBottom: SPACING.sm,
              }}
            >
              Links rápidos
            </p>
            <FooterLink href="#inicio" text="Inicio" />
            <FooterLink href="#servicios" text="Servicios" />
            <FooterLink href="#contacto" text="Contacto" />
          </div>

          <div>
            <p
              style={{
                color: COLORS.white,
                fontWeight: 700,
                marginBottom: SPACING.sm,
              }}
            >
              Legal
            </p>
            <FooterText text="Términos y condiciones" />
            <FooterText text="Política de privacidad" />
            <FooterText text="Cumplimiento normativo" />
          </div>
        </div>

        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(248, 250, 252, 0.2)',
            margin: `${SPACING.lg} 0 ${SPACING.md}`,
          }}
        />

        <p
          style={{
            margin: 0,
            color: COLORS.grayLight,
            textAlign: 'center',
            fontSize: '14px',
          }}
        >
          © 2026 AIM Asesorías. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, text }) => (
  <p style={{ margin: `0 0 ${SPACING.xs}` }}>
    <a
      href={href}
      onClick={() => {
        if (href === '#inicio') {
          window.dispatchEvent(new Event('aim:hero-replay'));
        }
      }}
      style={{ color: COLORS.grayLight, textDecoration: 'none' }}
    >
      {text}
    </a>
  </p>
);

const FooterText = ({ text }) => (
  <p style={{ margin: `0 0 ${SPACING.xs}`, color: COLORS.grayLight }}>{text}</p>
);

const ScrollToTopButton = () => {
  const { isMobile } = useWindowSize();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      style={{
        position: 'fixed',
        right: isMobile ? SPACING.md : SPACING.lg,
        bottom: isMobile ? `calc(${SPACING.xxl} + 40px)` : `calc(${SPACING.xl} + 80px)`,
        width: isMobile ? '42px' : '48px',
        height: isMobile ? '42px' : '48px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: COLORS.navy,
        color: COLORS.white,
        fontSize: isMobile ? '20px' : '24px',
        cursor: 'pointer',
        zIndex: 995,
        animation: `fadeSlideIn ${ANIMATION.duration.medium}ms ${ANIMATION.easing.default}`,
      }}
    >
      ↑
    </button>
  );
};

const WhatsAppButton = () => {
  const { isMobile } = useWindowSize();
  const [isHovered, setIsHovered] = useState(false);
  const [showFirstTooltip, setShowFirstTooltip] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.localStorage.getItem('aim-whatsapp-tooltip-seen');
  });

  const whatsappURL = useMemo(
    () =>
      `https://wa.me/${CONFIG.whatsapp.number}?text=${encodeURIComponent(CONFIG.whatsapp.defaultMessage)}`,
    []
  );

  const safeWhatsappURL = useMemo(
    () => (isSafeExternalHref(whatsappURL) ? whatsappURL : '#'),
    [whatsappURL]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    if (!showFirstTooltip) return undefined;

    const timeoutId = setTimeout(() => {
      setShowFirstTooltip(false);
      window.localStorage.setItem('aim-whatsapp-tooltip-seen', 'true');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [showFirstTooltip]);

  return (
    <div
      style={{
        position: 'fixed',
        right: isMobile ? SPACING.md : SPACING.lg,
        bottom: isMobile ? SPACING.md : SPACING.lg,
        zIndex: 996,
      }}
    >
      {(isHovered || showFirstTooltip) && (
        <div
          style={{
            position: 'absolute',
            right: isMobile ? '58px' : '70px',
            top: isMobile ? '10px' : '14px',
            backgroundColor: COLORS.navy,
            color: COLORS.white,
            padding: `${SPACING.xs} ${SPACING.sm}`,
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            fontSize: isMobile ? '12px' : '13px',
            animation: `fadeSlideIn ${ANIMATION.duration.fast}ms ${ANIMATION.easing.default}`,
          }}
        >
          ¿Necesitas ayuda?
        </div>
      )}

      <a
        href={safeWhatsappURL}
        target="_blank"
        rel="noopener noreferrer external nofollow"
        aria-label="Contactar por WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: isMobile ? '52px' : '60px',
          height: isMobile ? '52px' : '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '26px' : '30px',
          color: COLORS.white,
          textDecoration: 'none',
          backgroundColor: COLORS.teal,
          boxShadow: `0 ${SPACING.xs} ${SPACING.md} rgba(11, 159, 168, 0.35)`,
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          transition: `all ${ANIMATION.duration.fast}ms ${ANIMATION.easing.default}`,
          animation: 'whatsappRing 2.2s ease-out infinite',
        }}
      >
        💬
      </a>
    </div>
  );
};

const ChatAssistant = () => {
  const { isMobile } = useWindowSize();
  // ChatAssistant ofrece soporte rápido con FAQ y mantiene UX simple en un solo archivo.
  // Es ideal para MVP cloud porque no requiere dependencias de IA externas.
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hola, soy Yayita, tu asistente ejecutiva AIM. ¿Te ayudo con servicios, cobertura, tiempos o contacto?',
    },
  ]);

  const sendMessage = useCallback((rawText) => {
    const cleanText = sanitizeInput(rawText);
    if (!cleanText) return;

    const userMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: cleanText,
    };

    const assistantMessage = {
      id: `a-${Date.now() + 1}`,
      role: 'assistant',
      text: getAssistantReply(cleanText),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInputValue('');
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      sendMessage(inputValue);
    },
    [inputValue, sendMessage]
  );

  return (
    <div
      style={{
        position: 'fixed',
        left: isMobile ? SPACING.md : SPACING.lg,
        bottom: isMobile ? SPACING.md : SPACING.lg,
        zIndex: 996,
      }}
    >
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat con Yayita"
          style={{
            width: isMobile ? '52px' : '60px',
            height: isMobile ? '52px' : '60px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            fontSize: isMobile ? '26px' : '30px',
            color: COLORS.white,
            background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.teal} 100%)`,
            boxShadow: `0 ${SPACING.xs} ${SPACING.md} rgba(11, 36, 71, 0.35)`,
            animation: 'yayitaPulse 2.8s ease-in-out infinite',
          }}
        >
          💁‍♀️
        </button>
      ) : (
        <div
          style={{
            width: isMobile ? 'calc(100vw - 50px)' : '320px',
            maxWidth: isMobile ? '300px' : 'calc(100vw - 40px)',
            height: '460px',
            backgroundColor: COLORS.white,
            borderRadius: '14px',
            boxShadow: `0 ${SPACING.md} ${SPACING.xl} rgba(11, 36, 71, 0.25)`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: SPACING.md,
              backgroundColor: COLORS.navy,
              color: COLORS.white,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <strong>Yayita · Asistente Ejecutiva AIM</strong>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: COLORS.white,
                cursor: 'pointer',
                fontSize: '20px',
              }}
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          <div
            style={{
              padding: SPACING.sm,
              display: 'flex',
              gap: SPACING.xs,
              flexWrap: 'wrap',
              borderBottom: `1px solid ${COLORS.grayLight}`,
            }}
          >
            {FAQ_DATA.map((faq) => (
              <button
                key={faq.id}
                type="button"
                onClick={() => sendMessage(faq.question)}
                style={{
                  border: `1px solid ${COLORS.grayLight}`,
                  borderRadius: '999px',
                  padding: `4px ${SPACING.xs}`,
                  backgroundColor: COLORS.white,
                  color: COLORS.grayDark,
                  fontSize: '11px',
                  cursor: 'pointer',
                }}
              >
                {faq.question}
              </button>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              padding: SPACING.sm,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: SPACING.xs,
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  maxWidth: '90%',
                  alignSelf:
                    message.role === 'assistant' ? 'flex-start' : 'flex-end',
                  backgroundColor:
                    message.role === 'assistant'
                      ? COLORS.grayLight
                      : COLORS.teal,
                  color:
                    message.role === 'assistant'
                      ? COLORS.grayDark
                      : COLORS.white,
                  borderRadius: '10px',
                  padding: `${SPACING.xs} ${SPACING.sm}`,
                  lineHeight: 1.4,
                  fontSize: '13px',
                }}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              borderTop: `1px solid ${COLORS.grayLight}`,
              padding: SPACING.sm,
              display: 'flex',
              gap: SPACING.xs,
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(event) =>
                setInputValue(sanitizeInput(event.target.value))
              }
              placeholder="Escribe tu consulta"
              style={{
                flex: 1,
                borderRadius: '8px',
                border: `1px solid ${COLORS.grayLight}`,
                padding: `${SPACING.xs} ${SPACING.sm}`,
                fontFamily: 'inherit',
              }}
            />
            <button
              type="submit"
              style={{
                border: 'none',
                borderRadius: '8px',
                backgroundColor: COLORS.teal,
                color: COLORS.white,
                padding: `${SPACING.xs} ${SPACING.sm}`,
                cursor: 'pointer',
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL — ORQUESTACIÓN DE SECCIONES Y ESTILOS GLOBALES
// Este componente compone toda la landing y aplica reglas globales de UX/A11Y.
// ═══════════════════════════════════════════════════════════════════════════════

const App = () => {
  const activeSection = useScrollSpy([
    'inicio',
    'nosotros',
    'servicios',
    'equipo',
    'contacto',
  ]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Navbar activeSection={activeSection} />

      <main id="main-content" role="main">
        <Hero />
        <Stats />
        <SectionDivider nextColor={COLORS.white} />
        <About />
        <SectionDivider nextColor={COLORS.grayLight} />
        <Services />
        <SectionDivider nextColor={COLORS.white} />
        <Team />
        <SectionDivider nextColor={COLORS.navy} />
        <Coverage />
        <SectionDivider nextColor={COLORS.white} />
        <Contact />
      </main>

      <Footer />

      <ScrollToTopButton />
      <ChatAssistant />
      <WhatsAppButton />
    </>
  );
};

export default App;
