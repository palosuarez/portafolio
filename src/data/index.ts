// ── DATA REAL · pan_dev CV ──
import type { Project, Badge, Experience } from '../types';

export const projects: Project[] = [
  {
    id: 'headshot-assist',
    title: 'Automation Pipeline Suite',
    description:
      'Solución modular de automatización avanzada con arquitectura de microservicios. Backend Node.js/TypeScript en Docker, comunicación eficiente mediante named pipes a DLL en C# con hook de bajo nivel, capa de input en Lua y observabilidad estructurada desde el inicio.',
    stack: [
      'Node.js',
      'TypeScript',
      'Docker',
      'C#',
      'Lua',
      'Named Pipes',
      'Pino',
    ],
    links: { github: 'https://github.com/palosuarez' },
    impact: 'Arquitectura modular prod-ready',
    featured: true,
    status: 'wip',
  },
  {
    id: 'plataforma-gobierno',
    title: 'Plataforma Digital Gubernamental',
    description:
      'Arquitectura digital institucional para Alcaldía de Sogamoso: sitios web oficiales, datos abiertos y estrategia de transparencia ciudadana. Reconocida con Sello de Excelencia MinTIC.',
    stack: ['JavaScript', 'CMS', 'Streaming', 'Datos Abiertos'],
    links: {},
    impact: 'Sello MinTIC · referente regional',
    status: 'live',
  },
  {
    id: 'automatizacion-colegio',
    title: 'Pipelines IA · Colegio Superior Americano',
    description:
      'Pipelines de IA Generativa con agentes LLM para automatizar producción de contenido institucional. Estrategia omnicanal que escaló la comunidad a +5.000 seguidores activos.',
    stack: ['React', 'LLM Agents', 'CMS', 'SEO', 'Analytics'],
    links: {},
    impact: '+5.000 comunidad activa',
    status: 'live',
  },
  {
    id: 'data-center',
    title: 'Infraestructura Data Center',
    description:
      'Operación de infraestructura crítica para Telefónica/ASIGMA: Data Centers de alta disponibilidad, provisioning de servidores y gestión de redes con fibra óptica 24/7.',
    stack: ['Data Centers', 'Fibra Óptica', 'Monitoreo', 'SLA'],
    links: {},
    impact: 'Disponibilidad 24/7 · misión crítica',
    status: 'archived',
  },
  {
    id: 'portafolio',
    title: 'Este portafolio',
    description:
      'El portafolio mismo es un sistema fullstack: React 18 + TypeScript + Vite en frontend, Fastify + Docker en backend, CI/CD con GitHub Actions. La ingeniería es pública y verificable.',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Fastify',
      'Docker',
      'GitHub Actions',
    ],
    links: { github: 'https://github.com/palosuarez/portafolio' },
    impact: 'Open source · CI activo',
    featured: true,
    status: 'live',
  },
];

export const badges: Badge[] = [
  {
    id: 'ai-essentials',
    name: 'Artificial Intelligence Essentials V2',
    issuer: 'IBM · Coursera',
    date: '19 feb 2026',
    category: 'ai',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'gen-ai-essentials',
    name: 'Generative AI Essentials',
    issuer: 'IBM · Coursera',
    date: '19 feb 2026',
    category: 'ai',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'prompt-engineering',
    name: 'Generative AI: Prompt Engineering',
    issuer: 'IBM · Coursera',
    date: '19 feb 2026',
    category: 'ai',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering Essentials',
    issuer: 'IBM · Coursera',
    date: '26 feb 2026',
    category: 'backend',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'cloud',
    name: 'Introduction to Cloud Computing',
    issuer: 'IBM · Coursera',
    date: '27 feb 2026',
    category: 'cloud',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'react',
    name: 'Front-end Development with React V2',
    issuer: 'IBM · Coursera',
    date: '4 mar 2026',
    category: 'frontend',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'git',
    name: 'Git and GitHub Essentials',
    issuer: 'IBM · Coursera',
    date: '3 mar 2026',
    category: 'devops',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'node',
    name: 'Node and Express Essentials',
    issuer: 'IBM · Coursera',
    date: '4 mar 2026',
    category: 'backend',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'python-ds',
    name: 'Python for Data Science and AI',
    issuer: 'IBM · Coursera',
    date: '10 mar 2026',
    category: 'ai',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'python-project',
    name: 'Python Project for AI & App Development',
    issuer: 'IBM · Coursera',
    date: '11 mar 2026',
    category: 'ai',
    credlyUrl: 'https://www.credly.com/users/pablo-andres-suarez-sandoval',
  },
  {
    id: 'ibm-fullstack',
    name: 'IBM Full Stack Software Developer',
    issuer: 'IBM · Coursera',
    date: '10 abr 2026',
    category: 'backend',
    credlyUrl:
      'https://www.credly.com/badges/51def97f-8bc8-43d6-9142-93e99d31d694/public_url',
  },
  {
    id: 'fullstack-capstone',
    name: 'Full Stack Software Developer Capstone',
    issuer: 'IBM · Coursera',
    date: '10 abr 2026',
    category: 'backend',
    credlyUrl:
      'https://www.credly.com/badges/5c6bd295-7428-4599-b04a-b2e10a48fad3/public_url',
  },
  {
    id: 'genai-engineering-capstone',
    name: 'Generative AI Engineering Capstone',
    issuer: 'IBM · Coursera',
    date: '10 abr 2026',
    category: 'ai',
    credlyUrl:
      'https://www.credly.com/badges/daa4ae60-f2d9-43ca-9d01-0ec22159e705/public_url',
  },
];

export const experience: Experience[] = [
  {
    period: 'Ago 2023 – Ago 2024',
    role: 'Community Manager',
    company: 'Colegio Superior Americano · Bogotá · Presencial',
    stack: ['Adobe Creative Suite', 'Multimedia', 'SEO', 'Analytics'],
    highlights: [
      'Diseño e implementación de estrategia de comunicaciones digitales institucionales',
      'Gestión integral de redes sociales y sitio web con calendario editorial y campañas',
      'Producción multimedia con Adobe Creative Suite y seguimiento de engagement',
    ],
    current: false,
  },
  {
    period: 'Feb 2021 – Ago 2022',
    role: 'Coordinador de mantenimiento',
    company: 'ASIGMA SAS · Área metropolitana de Bogotá D.C. · Presencial',
    stack: ['Infraestructura crítica', 'UPS', 'Rectificadores', 'Data Centers'],
    highlights: [
      'Coordinación de mantenimiento preventivo, correctivo y trabajos especiales para proyecto TELEFÓNICA',
      'Gestión de sistemas de energía crítica: UPS, bancos de baterías, motogeneradores y clima de precisión',
      'Logística nacional y soporte técnico para clientes como ATC, Claro y ETB',
    ],
  },
  {
    period: 'Feb 2021 – Dic 2021',
    role: 'Profesional de Apoyo – Investigaciones Administrativas',
    company: 'Secretaría Distrital de Movilidad · Bogotá',
    stack: ['Plataformas digitales', 'Gestión documental'],
    highlights: [
      'Optimización de flujos de gestión documental digital y soporte técnico en plataformas institucionales',
    ],
  },
  {
    period: 'Mar 2017 – Oct 2019',
    role: 'Contratista TICs y Comunicaciones',
    company: 'Alcaldía de Sogamoso',
    stack: ['Gobierno Digital', 'Streaming', 'Datos Abiertos'],
    highlights: [
      'Arquitectura digital institucional: sitios web oficiales y estrategia de datos abiertos',
      'Sello de Excelencia MinTIC — referente regional en gobierno digital',
    ],
  },
];
