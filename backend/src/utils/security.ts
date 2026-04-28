import { URL } from 'node:url';

/**
 * Normaliza un origen (URL) para comparaciones consistentes.
 */
export const normalizeOrigin = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  try {
    return new URL(trimmed).origin;
  } catch {
    return trimmed.replace(/\/$/, '');
  }
};

/**
 * Limpia texto de caracteres de control y normaliza espacios.
 */
export const normalizeText = (value: string, max: number): string =>
  Array.from(value)
    .map((char) => {
      const code = char.charCodeAt(0);
      return code < 32 || code === 127 ? ' ' : char;
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

/**
 * Gestiona contadores para ventanas de tiempo (Rate Limiting manual).
 */
export const consumeWindow = (
  map: Map<string, { count: number; resetAt: number }>,
  key: string,
  max: number,
  windowMs: number
) => {
  const now = Date.now();
  const current = map.get(key);

  if (!current || current.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  map.set(key, current);
  return current.count > max;
};
