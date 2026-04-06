/** Solo dígitos, longitud típica de PAN (13–19). */
export function normalizePan(raw: string): string {
  return raw.replace(/\D/g, '')
}

export function luhnValid(panDigits: string): boolean {
  if (panDigits.length < 13 || panDigits.length > 19) return false
  let sum = 0
  let double = false
  for (let i = panDigits.length - 1; i >= 0; i--) {
    let d = parseInt(panDigits[i], 10)
    if (Number.isNaN(d)) return false
    if (double) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
    double = !double
  }
  return sum % 10 === 0
}

/** Formato MM/AA mientras se escribe (solo dígitos, barra automática).
 * Si el primer dígito del mes no es 0 ni 1 (ej. 6 → junio), se antepone 0 → 06. */
export function formatExpiryMmYyInput(raw: string): string {
  let digits = raw.replace(/\D/g, '').slice(0, 4)
  if (digits.length === 0) return ''
  if (digits[0] !== '0' && digits[0] !== '1') {
    digits = ('0' + digits).slice(0, 4)
  }
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function parseExpiryMmYy(value: string): { mm: string; yy: string } | null {
  const s = value.trim().replace(/\s+/g, '')
  const m = s.match(/^(\d{2})\/?(\d{2})$/)
  if (!m) return null
  return { mm: m[1], yy: m[2] }
}

export function expiryNotExpired(mm: string, yy: string, now = new Date()): boolean {
  const month = parseInt(mm, 10)
  const year2 = parseInt(yy, 10)
  if (month < 1 || month > 12 || Number.isNaN(year2)) return false
  const cy = now.getFullYear() % 100
  const cm = now.getMonth() + 1
  if (year2 < cy) return false
  if (year2 === cy && month < cm) return false
  return true
}

export function validateDebitCvv(cvv: string): boolean {
  return /^\d{3}$/.test(cvv.trim())
}

export function validateCardholder(name: string): boolean {
  return name.trim().length >= 2
}

export function last4FromPan(panDigits: string): string {
  return panDigits.slice(-4)
}

/** DNI argentino: solo dígitos, sin puntos. */
export function normalizeDni(raw: string): string {
  return raw.replace(/\D/g, '')
}

/** DNI habitual 7 u 8 dígitos (acepta entrada con puntos). */
export function validateArDni(raw: string): boolean {
  const d = normalizeDni(raw)
  return d.length >= 7 && d.length <= 8
}
