import nodemailer from 'nodemailer';
import type { ContactRecord } from './store.js';

export interface MailerEnv {
  MAIL_ENABLED: boolean;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_SECURE: boolean;
  SMTP_USER: string;
  SMTP_PASS: string;
  MAIL_FROM: string;
  MAIL_TO: string;
}

export class ContactMailer {
  private readonly enabled: boolean;
  private readonly mailTo: string;
  private readonly mailFrom: string;
  private transporter: nodemailer.Transporter | null;

  constructor(env: MailerEnv) {
    this.enabled = env.MAIL_ENABLED;
    this.mailTo = env.MAIL_TO;
    this.mailFrom = env.MAIL_FROM;

    if (
      this.enabled &&
      env.SMTP_HOST &&
      env.SMTP_PORT > 0 &&
      env.SMTP_USER &&
      env.SMTP_PASS &&
      env.MAIL_FROM &&
      env.MAIL_TO
    ) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
    } else {
      this.transporter = null;
    }
  }

  isReady() {
    return this.enabled && this.transporter !== null;
  }

  async sendContactCopy(record: ContactRecord) {
    if (!this.isReady() || !this.transporter) {
      return false;
    }

    await this.transporter.sendMail({
      from: this.mailFrom,
      to: this.mailTo,
      replyTo: record.email,
      subject: `Nuevo lead portfolio: ${record.name}`,
      text: [
        'Nuevo mensaje del formulario del portfolio',
        '',
        `Nombre: ${record.name}`,
        `Email: ${record.email}`,
        `Empresa: ${record.company ?? 'N/A'}`,
        `Origen: ${record.source}`,
        `IP: ${record.ip}`,
        `User-Agent: ${record.userAgent}`,
        `Origin: ${record.origin}`,
        `Referer: ${record.referer}`,
        `Fecha: ${record.createdAt}`,
        '',
        'Mensaje:',
        record.message,
      ].join('\n'),
    });

    return true;
  }
}
