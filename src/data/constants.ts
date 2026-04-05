/** Número de WhatsApp del vendedor (Argentina, sin +) — prototipo */
export const SELLER_WHATSAPP_E164 = '5493795123456'

export const BRAND = {
  name: 'Talento Correntino',
  tagline: 'De tu provincia a toda la Argentina',
  description:
    'Artesanías y piezas hechas a mano desde Corrientes: cerámica, madera, pintura, textiles y arte. Conectamos talleres locales con compradores de todo el país.',
} as const

export const CATEGORY_LABELS: Record<string, string> = {
  ceramica: 'Cerámica & barro',
  madera: 'Madera & tallado',
  pintura: 'Pintura & dibujo',
  textil: 'Textiles & fibras',
  arte: 'Arte & objetos',
}
