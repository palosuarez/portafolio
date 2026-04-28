import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { z } from 'zod';
import { ContactStore } from './store.js';
import { ContactMailer } from './mailer.js';
// Importación única y limpia
import {
  normalizeOrigin,
  normalizeText,
  consumeWindow,
} from './utils/security.js';

const env = {
  PORT: Number(process.env.PORT ?? 8787),
  HOST:
    process.env.HOST ??
    (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'),
  CORS_ORIGIN:
    process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://127.0.0.1:5173',
  ALLOWED_ORIGINS: (
    process.env.ALLOWED_ORIGINS ??
    process.env.CORS_ORIGIN ??
    'http://localhost:5173,http://127.0.0.1:5173'
  )
    .split(',')
    .map((value) => normalizeOrigin(value))
    .filter(Boolean),
  DATA_DIR: process.env.DATA_DIR ?? './data',
  REQUIRE_BROWSER_ORIGIN:
    (process.env.REQUIRE_BROWSER_ORIGIN ?? 'true').toLowerCase() === 'true',
  MIN_FORM_FILL_MS: Number(process.env.MIN_FORM_FILL_MS ?? 2500),
  IP_WINDOW_MAX: Number(process.env.IP_WINDOW_MAX ?? 8),
  IP_WINDOW_MS: Number(process.env.IP_WINDOW_MS ?? 60000),
  EMAIL_WINDOW_MAX: Number(process.env.EMAIL_WINDOW_MAX ?? 4),
  EMAIL_WINDOW_MS: Number(process.env.EMAIL_WINDOW_MS ?? 600000),
  CONTACT_RATE_LIMIT_MAX: Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 6),
  CONTACT_RATE_LIMIT_WINDOW_MS: Number(
    process.env.CONTACT_RATE_LIMIT_WINDOW_MS ?? 60000
  ),
  REQUIRE_TURNSTILE:
    (process.env.REQUIRE_TURNSTILE ?? 'false').toLowerCase() === 'true',
  TURNSTILE_SECRET: process.env.TURNSTILE_SECRET ?? '',
  MAIL_ENABLED: (process.env.MAIL_ENABLED ?? 'false').toLowerCase() === 'true',
  SMTP_HOST: process.env.SMTP_HOST ?? '',
  SMTP_PORT: Number(process.env.SMTP_PORT ?? 587),
  SMTP_SECURE: (process.env.SMTP_SECURE ?? 'false').toLowerCase() === 'true',
  SMTP_USER: process.env.SMTP_USER ?? '',
  SMTP_PASS: process.env.SMTP_PASS ?? '',
  MAIL_FROM: process.env.MAIL_FROM ?? '',
  MAIL_TO: process.env.MAIL_TO ?? 'palosuarez@gmail.com',
  MAIL_TO_BACKUP: process.env.MAIL_TO_BACKUP ?? '',
};

// Validación de arranque
if (env.REQUIRE_TURNSTILE && !env.TURNSTILE_SECRET) {
  throw new Error('REQUIRE_TURNSTILE=true but TURNSTILE_SECRET is missing');
}

const app = Fastify({ logger: true });

// Middlewares
await app.register(helmet, { global: true, contentSecurityPolicy: false });
await app.register(cors, {
  origin: (origin, cb) => {
    if (!origin) {
      cb(null, !env.REQUIRE_BROWSER_ORIGIN);
      return;
    }
    cb(null, env.ALLOWED_ORIGINS.includes(normalizeOrigin(origin)));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['content-type'],
});
await app.register(rateLimit, { max: 50, timeWindow: '1 minute' });

// Services
const store = new ContactStore(path.resolve(process.cwd(), env.DATA_DIR));
const mailer = new ContactMailer({
  MAIL_ENABLED: env.MAIL_ENABLED,
  SMTP_HOST: env.SMTP_HOST,
  SMTP_PORT: env.SMTP_PORT,
  SMTP_SECURE: env.SMTP_SECURE,
  SMTP_USER: env.SMTP_USER,
  SMTP_PASS: env.SMTP_PASS,
  MAIL_FROM: env.MAIL_FROM,
  MAIL_TO: env.MAIL_TO,
  MAIL_TO_BACKUP: env.MAIL_TO_BACKUP,
});

// SMTP Verification Log
if (env.MAIL_ENABLED) {
  if (mailer.isReady()) {
    void mailer.verifyConnection().then((result) => {
      if (result.ok) app.log.info('SMTP connection verified successfully');
      else app.log.warn({ reason: result.reason }, 'SMTP verification failed');
    });
  } else {
    app.log.warn('MAIL_ENABLED=true but SMTP is not fully configured.');
  }
}

// Schemas & Constants
const suspiciousUserAgents = [
  'curl',
  'wget',
  'python-requests',
  'bot',
  'spider',
  'crawler',
];
const ipCounters = new Map<string, { count: number; resetAt: number }>();
const emailCounters = new Map<string, { count: number; resetAt: number }>();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  message: z.string().trim().min(20).max(3000),
  source: z.string().trim().min(2).max(80).default('portfolio-local'),
  company: z.string().trim().max(120).optional(),
  website: z.string().trim().max(120).optional(),
  formStartedAt: z.number().int().positive().optional(),
  turnstileToken: z.string().trim().min(10).max(4000).optional(),
});

// Helpers internos
const verifyTurnstile = async (token: string, remoteIp: string) => {
  if (!env.TURNSTILE_SECRET) return false;
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: token,
          // remoteip: remoteIp,// Lo dejamos comentado para evitar fallos de red en la nube
        }),
      }
    );
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
};

// Routes
app.get('/health', async () => ({
  ok: true,
  service: 'portfolio-backend-local',
  timestamp: new Date().toISOString(),
}));

app.post('/api/contact', async (request, reply) => {
  // 1. Basic Validations
  if (!request.headers['content-type']?.includes('application/json')) {
    return reply.code(415).send({ ok: false, error: 'UNSUPPORTED_MEDIA_TYPE' });
  }

  const origin = normalizeOrigin(request.headers.origin ?? '');
  if (env.REQUIRE_BROWSER_ORIGIN && !env.ALLOWED_ORIGINS.includes(origin)) {
    return reply.code(403).send({ ok: false, error: 'INVALID_ORIGIN' });
  }

  // 2. Payload Validation
  const parsed = contactSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.code(400).send({
      ok: false,
      error: 'INVALID_PAYLOAD',
      details: parsed.error.flatten(),
    });
  }

  const { website, turnstileToken, formStartedAt, ...payload } = parsed.data;

  // 3. Security Checks (Honeypot, Bot Speed, Rate Limits)
  if (website) return reply.code(202).send({ ok: true }); // Honeypot silent fail

  if (formStartedAt && Date.now() - formStartedAt < env.MIN_FORM_FILL_MS) {
    return reply.code(429).send({ ok: false, error: 'BOT_SUSPECTED' });
  }

  if (
    consumeWindow(ipCounters, request.ip, env.IP_WINDOW_MAX, env.IP_WINDOW_MS)
  ) {
    return reply.code(429).send({ ok: false, error: 'RATE_LIMIT_IP' });
  }

  const normalizedEmail = normalizeText(payload.email, 180).toLowerCase();
  if (
    consumeWindow(
      emailCounters,
      normalizedEmail,
      env.EMAIL_WINDOW_MAX,
      env.EMAIL_WINDOW_MS
    )
  ) {
    return reply.code(429).send({ ok: false, error: 'RATE_LIMIT_EMAIL' });
  }

  // 4. Turnstile
  if (env.REQUIRE_TURNSTILE) {
    if (
      !turnstileToken ||
      !(await verifyTurnstile(turnstileToken, request.ip))
    ) {
      return reply
        .code(403)
        .send({ ok: false, error: 'TURNSTILE_VALIDATION_FAILED' });
    }
  }

  // 5. Persistence & Mail
  const record = {
    id: randomUUID(),
    name: normalizeText(payload.name, 120),
    email: normalizedEmail,
    message: normalizeText(payload.message, 3000),
    source: normalizeText(payload.source, 80),
    company: payload.company ? normalizeText(payload.company, 120) : undefined,
    createdAt: new Date().toISOString(),
    ip: request.ip,
    userAgent: request.headers['user-agent'] ?? 'unknown',
    origin,
    referer: request.headers.referer ?? '',
  };

  await store.add(record);
  void mailer.sendContactCopy(record).catch((err) => app.log.error(err));

  return reply.code(201).send({ ok: true, messageId: record.id });
});

// Error Handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply
    .code(500)
    .send({ ok: false, error: 'INTERNAL_ERROR', requestId: request.id });
});

const start = async () => {
  try {
    await app.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

void start();
