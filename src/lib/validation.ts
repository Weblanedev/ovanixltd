/**
 * Checkout form validation helpers (UI only; no real payment).
 */

export function isValidCardNumber(value: string): boolean {
  const digits = value.replace(/\s/g, '');
  return /^\d{16}$/.test(digits);
}

export function isValidCvv(value: string): boolean {
  return /^\d{3}$/.test(value);
}

/** Expects MM or MM/YY or MMYY */
export function isValidExpiry(value: string): boolean {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length < 4) return false;
  const mm = parseInt(cleaned.slice(0, 2), 10);
  const yy = parseInt(cleaned.slice(2, 4), 10);
  if (mm < 1 || mm > 12) return false;
  const currentYear = new Date().getFullYear() % 100;
  if (yy < currentYear) return false;
  return true;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}
