import crypto from 'crypto';
import nodemailer from 'nodemailer';

const TOKEN_BYTES = 32;

export function createRawToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('hex');
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function sendMagicLink(email: string, token: string) {
  const appUrl = process.env.APP_URL || process.env.BASE_URL;
  if (!appUrl) {
    throw new Error('Missing APP_URL (or BASE_URL) for magic link');
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    throw new Error('Missing SMTP_* environment variables for magic link');
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const magicUrl = `${appUrl}/api/auth/magic/verify?token=${encodeURIComponent(token)}`;

  await transporter.sendMail({
    from: smtpFrom,
    to: email,
    subject: 'Your sign-in link',
    text: `Sign in to your account:\n${magicUrl}\n\nThis link expires in 15 minutes.`,
    html: `<p>Sign in to your account:</p><p><a href="${magicUrl}">${magicUrl}</a></p><p>This link expires in 15 minutes.</p>`,
  });
}
