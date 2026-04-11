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
  MAIL_TO_BACKUP?: string;
}

type MailerCheckResult = {
  ok: boolean;
  reason?: string;
  errorCode?: string;
  errorMessage?: string;
};

export class ContactMailer {
  private readonly enabled: boolean;
  private readonly mailTo: string[];
  private readonly mailToBackup: string[];
  private readonly mailFrom: string;
  private readonly smtpHost: string;
  private readonly smtpPort: number;
  private readonly smtpSecure: boolean;
  private readonly smtpUser: string;
  private transporter: nodemailer.Transporter | null;

  constructor(env: MailerEnv) {
    this.enabled = env.MAIL_ENABLED;
    this.mailTo = env.MAIL_TO
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    this.mailToBackup = (env.MAIL_TO_BACKUP ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    this.mailFrom = env.MAIL_FROM;
    this.smtpHost = env.SMTP_HOST;
    this.smtpPort = env.SMTP_PORT;
    this.smtpSecure = env.SMTP_SECURE;
    this.smtpUser = env.SMTP_USER;

    if (
      this.enabled &&
      env.SMTP_HOST &&
      env.SMTP_PORT > 0 &&
      env.SMTP_USER &&
      env.SMTP_PASS &&
      env.MAIL_FROM &&
      this.mailTo.length > 0
    ) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
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

  getConfigSummary() {
    return {
      enabled: this.enabled,
      ready: this.isReady(),
      smtpHost: this.smtpHost,
      smtpPort: this.smtpPort,
      smtpSecure: this.smtpSecure,
      smtpUser: this.smtpUser,
      mailFrom: this.mailFrom,
      mailToCount: this.mailTo.length,
      mailToBackupCount: this.mailToBackup.length,
    };
  }

  async verifyConnection(): Promise<MailerCheckResult> {
    if (!this.enabled) {
      return { ok: false, reason: 'MAIL_DISABLED' };
    }

    if (!this.transporter) {
      return { ok: false, reason: 'MAIL_NOT_CONFIGURED' };
    }

    try {
      await this.transporter.verify();
      return { ok: true };
    } catch (error) {
      if (error instanceof Error) {
        const maybeCode = 'code' in error ? String((error as { code?: unknown }).code ?? '') : '';
        return {
          ok: false,
          reason: 'MAIL_VERIFY_FAILED',
          errorCode: maybeCode || undefined,
          errorMessage: error.message,
        };
      }

      return {
        ok: false,
        reason: 'MAIL_VERIFY_FAILED',
        errorMessage: 'Unknown mail verification error',
      };
    }
  }

  async sendContactCopy(record: ContactRecord) {
    if (!this.isReady() || !this.transporter) {
      return false;
    }

    const uniqueBackupRecipients = this.mailToBackup.filter(
      (email) => !this.mailTo.includes(email),
    );

    await this.transporter.sendMail({
      from: this.mailFrom,
      to: this.mailTo,
      bcc: uniqueBackupRecipients.length > 0 ? uniqueBackupRecipients : undefined,
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
