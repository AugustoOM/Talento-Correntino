import type { Product } from '../types'

function localImage(file: string) {
  return `${import.meta.env.BASE_URL}images/${file}`
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Bowls de cerámica',
    slug: 'bowls-ceramica',
    shortDescription: 'Set de cuencos en gres, terminación artesanal.',
    description:
      'Bowls apilables en cerámica de alta temperatura, ideales para ensaladas, sopas o presentación. Cada pieza tiene variaciones únicas de esmalte.',
    price: 28900,
    category: 'ceramica',
    categoryLabel: 'Cerámica & barro',
    stock: 12,
    imageUrl: localImage('ceramica.jpg'),
    tags: ['nuevo', 'destacado'],
  },
  {
    id: 'p2',
    name: 'Tabla de cocina de madera',
    slug: 'tabla-cocina-madera',
    shortDescription: 'Madera noble, ideal para picar y servir.',
    description:
      'Tabla de cocina tallada en madera nativa con acabado alimentario. Resistente al uso diario y fácil de mantener.',
    price: 38900,
    category: 'madera',
    categoryLabel: 'Madera & tallado',
    stock: 10,
    imageUrl: localImage('tabla.jpg'),
    tags: ['best-seller', 'destacado'],
  },
  {
    id: 'p3',
    name: 'Cesta de yute',
    slug: 'cesta-yute',
    shortDescription: 'Tejido a mano, fibras naturales.',
    description:
      'Cesta decorativa y funcional en yute, perfecta para guardar pan, frutas o como detalle de hogar. Refuerzos cosidos a mano.',
    price: 18900,
    category: 'textil',
    categoryLabel: 'Textiles & fibras',
    stock: 15,
    imageUrl: localImage('yute.jpg'),
    tags: ['destacado'],
  },
  {
    id: 'p4',
    name: 'Pintura abstracta',
    slug: 'pintura-abstracta',
    shortDescription: 'Óleo y acrílico sobre lienzo, pieza única.',
    description:
      'Obra abstracta en formato mediano, lista para enmarcar o colgar con bastidor. Colores vibrantes inspirados en el litoral.',
    price: 59900,
    category: 'arte',
    categoryLabel: 'Arte & objetos',
    stock: 4,
    imageUrl: localImage('pintura.jpg'),
    tags: ['arte', 'destacado'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id)
}
