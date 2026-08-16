// ================================================================
// LA TOILE BLANCHE — Artwork & Artist Data
// ================================================================

import { Artist, Artwork, JournalArticle, CheckoutFormData } from './types';

// ----------------------------------------------------------------
// Tunisian Governorates (24 Wilayas)
// ----------------------------------------------------------------
export const TUNISIAN_GOVERNORATES = [
  'Tunis',
  'Ariana',
  'Ben Arous',
  'Manouba',
  'Nabeul',
  'Zaghouan',
  'Bizerte',
  'Béja',
  'Jendouba',
  'Kef',
  'Siliana',
  'Kairouan',
  'Kasserine',
  'Sidi Bouzid',
  'Sousse',
  'Monastir',
  'Mahdia',
  'Sfax',
  'Gabès',
  'Medenine',
  'Tataouine',
  'Gafsa',
  'Tozeur',
  'Kebili',
] as const;

// ----------------------------------------------------------------
// Artist Profile (Ayoub Awadi)
// ----------------------------------------------------------------
export const artists: Artist[] = [
  {
    id: 'ayoub-awadi',
    slug: 'ayoub-awadi',
    name: 'Ayoub Awadi',
    bio: 'A native of Tunisia, Ayoub Awadi is a young painter whose work bridges traditional North African architectural motifs and surreal contemporary expression. Painting with acrylic pigments on canvas, his compositions explore light, memory, and spatial form — bringing vibrant color out of the dark void.',
    philosophy: 'I see art as an uninhibited language beyond words. Every brushstroke on canvas is a dialogue between shadow and light, heritage and imagination.',
    birthYear: 2010,
    nationality: 'Tunisian',
    location: 'Tunisia',
    exhibitions: [
      'La Toile Blanche — Solo Exhibition, 2026',
      'Contemporary Visions of the Maghreb — Group Show, 2025',
    ],
    instagram: 'https://www.instagram.com/latoileblanche.tn/',
  },
];

// ----------------------------------------------------------------
// Product Catalogue
// ----------------------------------------------------------------
export const artworks: Artwork[] = [
  {
    id: 'lumiere-de-sidi-bou-said',
    slug: 'lumiere-de-sidi-bou-said',
    title: 'Lumière de Sidi Bou Saïd',
    artistId: 'ayoub-awadi',
    year: 2026,
    price: 200,
    currency: 'TND',
    medium: 'Acrylic painting',
    dimensions: '80 × 60 cm',
    widthCm: 60,
    heightCm: 80,
    description: 'An iconic impressionistic composition depicting the sunlit cobbled alleyways, blue studded doors, and vibrant bougainvillea of Sidi Bou Saïd.',
    story: 'Painted under the golden morning sun of Sidi Bou Saïd. The contrast between bright white-washed plaster, cobalt blue studded doors, and cascading pink bougainvillea captures the timeless serenity of Mediterranean Tunisia.',
    images: ['/artworks/lumiere-sidi-bou-said.jpg'],
    availability: 'available',
    category: 'Cityscape',
    tags: ['medina', 'sidi bou said', 'sidi bou said', 'tunisia', 'light', 'architecture', 'blue door', 'cobblestone', 'impressionism'],
    featured: true,
    certificateId: 'LTB-2026-001',
  },
  {
    id: 'coucher-de-soleil-mediterraneen',
    slug: 'coucher-de-soleil-mediterraneen',
    title: 'Coucher de Soleil Méditerranéen',
    artistId: 'ayoub-awadi',
    year: 2026,
    price: 150,
    currency: 'TND',
    medium: 'Acrylic painting',
    dimensions: '50 × 40 cm',
    widthCm: 40,
    heightCm: 50,
    description: 'A striking canvas painting capturing a warm golden Mediterranean sunset over coastal domes, terracotta roofs, and a distant sailboat.',
    story: 'Inspired by the quiet magic of sunset over the Gulf of Tunis. Warm amber and deep magenta tones blend seamlessly across the sky, setting a solitary sailboat against the tranquil coastal horizon.',
    images: ['/artworks/coucher-soleil.jpg'],
    availability: 'available',
    category: 'Seascape',
    tags: ['mediterraneen', 'coucher de soleil', 'sunset', 'sea', 'tunisia', 'coastal', 'sailboat', 'amber'],
    featured: true,
    certificateId: 'LTB-2026-002',
  },
  {
    id: 'le-royaume-oublie',
    slug: 'le-royaume-oublie',
    title: 'Le Royaume Oublié',
    artistId: 'ayoub-awadi',
    year: 2026,
    price: 500,
    currency: 'TND',
    medium: 'Acrylic painting',
    dimensions: '80 × 60 cm',
    widthCm: 60,
    heightCm: 80,
    description: 'A grand surreal acrylic painting of an ancient stone castle with soaring towers, stone bridge, winding river, and vibrant floral banks surrounded by majestic mountain peaks.',
    story: 'A surreal journey into fantasy and architectural memory. High towers and stone arch bridges emerge from lush banks of wildflowers, evoking the quiet mystery of a lost kingdom untouched by time.',
    images: ['/artworks/royaume-oublie.jpg'],
    availability: 'available',
    category: 'Surrealism',
    tags: ['royaume', 'le royaume oublie', 'surrealism', 'castle', 'landscape', 'mountains', 'river', 'fantasy', 'art'],
    featured: true,
    certificateId: 'LTB-2026-003',
  },
  {
    id: 'eclat-du-bleu-et-de-lor',
    slug: 'eclat-du-bleu-et-de-lor',
    title: 'L’Éclat du Bleu et de l’Or',
    artistId: 'ayoub-awadi',
    year: 2026,
    price: 0,
    currency: 'TND',
    medium: 'Acrylic painting',
    dimensions: '90 × 50 cm',
    widthCm: 50,
    heightCm: 90,
    description: 'An original acrylic painting in radiant blue and gold, composed around a graceful floral arrangement.',
    story: 'Blue blossoms and gilded leaves unfold across a softly luminous ground, creating a balanced study of colour, texture, and botanical form.',
    images: ['/artworks/jji.jpg'],
    availability: 'sold',
    category: 'Floral',
    tags: ['blue', 'gold', 'floral', 'flowers', 'acrylic', 'botanical'],
    featured: false,
    certificateId: 'LTB-2026-004',
  },
];

// ----------------------------------------------------------------
// Journal Articles
// ----------------------------------------------------------------
export const journalArticles: JournalArticle[] = [
  {
    id: 'language-of-light',
    slug: 'language-of-light',
    title: 'The Language of Light: Sun & Architecture in Tunisian Art',
    excerpt: 'An exploration of how North African sunlight and coastal architecture inspire the vibrant color palettes of contemporary Tunisian painters.',
    category: 'Essay',
    image: '/artworks/lumiere-sidi-bou-said.jpg',
    date: '2026-08-01',
    readTime: '6 min read',
  },
  {
    id: 'inside-the-studio',
    slug: 'inside-the-studio',
    title: 'Inside the Studio: A Morning with Ayoub Awadi',
    excerpt: 'A glimpse into the artist studio as acrylic pigments, heavy textures, and architectural silhouettes take form on raw canvas.',
    category: 'Studio Visit',
    date: '2026-07-15',
    readTime: '8 min read',
  },
  {
    id: 'art-of-the-medina',
    slug: 'art-of-the-medina',
    title: 'The Art of the Médina: Heritage as a Creative Canvas',
    excerpt: 'How ancient coastal alleyways, arched doorways, and Mediterranean horizons remain an enduring source of artistic inspiration.',
    category: 'Culture',
    image: '/artworks/coucher-soleil.jpg',
    date: '2026-06-28',
    readTime: '5 min read',
  },
];

// ----------------------------------------------------------------
// Helper Functions
// ----------------------------------------------------------------
export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find(a => a.slug === slug || a.id === slug);
}

export function getArtist(id: string): Artist | undefined {
  return artists.find(a => a.id === id);
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find(a => a.slug === slug);
}

export function getArtworksByArtist(artistId: string): Artwork[] {
  return artworks.filter(a => a.artistId === artistId);
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter(a => a.featured);
}

export function getAvailableArtworks(): Artwork[] {
  return artworks.filter(a => a.availability === 'available');
}

export function formatPrice(price: number, currency: string = 'TND'): string {
  return `${price.toLocaleString('fr-TN')} ${currency}`;
}

// ----------------------------------------------------------------
// Search & Filter Helper
// ----------------------------------------------------------------
export function searchArtworks(
  query: string = '',
  category: string = 'all',
  priceRange: string = 'all',
  availability: string = 'all'
): Artwork[] {
  const cleanQuery = query.toLowerCase().trim();

  return artworks.filter(art => {
    // 1. Availability filter
    if (availability !== 'all' && art.availability !== availability) {
      return false;
    }

    // 2. Category filter
    if (category !== 'all' && art.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // 3. Price Range filter
    if (priceRange !== 'all' && art.availability === 'sold') return false;
    if (priceRange === 'under-200' && art.price >= 200) return false;
    if (priceRange === '200-500' && (art.price < 200 || art.price > 500)) return false;
    if (priceRange === 'over-500' && art.price <= 500) return false;

    // 4. Text Query Search
    if (cleanQuery.length > 0) {
      const artist = getArtist(art.artistId);
      const searchTarget = [
        art.title,
        art.description,
        art.story,
        art.category,
        art.medium,
        artist?.name || '',
        ...art.tags,
      ]
        .join(' ')
        .toLowerCase();

      // Normalize accents for flexible matching (e.g., "said" matches "sidi bou saïd")
      const normalizedTarget = searchTarget.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const normalizedQuery = cleanQuery.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (!normalizedTarget.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}

// ----------------------------------------------------------------
// WhatsApp Message Generator
// ----------------------------------------------------------------
export function generateWhatsAppMessage(
  items: { artwork: Artwork; quantity: number }[],
  form: CheckoutFormData
): string {
  const divider = '═══════════════════════';
  const fullName = `${form.firstName} ${form.lastName}`.trim();

  const artworkLines = items
    .map(item => {
      const artist = getArtist(item.artwork.artistId);
      return [
        `• Artwork: ${item.artwork.title}`,
        `• Price: ${formatPrice(item.artwork.price, item.artwork.currency)}`,
        `• Artist: ${artist?.name || 'Ayoub Awadi'}`,
        `• Dimensions: ${item.artwork.dimensions}`,
        `• Quantity: ${item.quantity}`,
      ].join('\n');
    })
    .join('\n\n');

  const total = items.reduce((sum, item) => sum + item.artwork.price * item.quantity, 0);

  return [
    divider,
    '  LA TOILE BLANCHE',
    '  Artwork Acquisition Order',
    divider,
    '',
    'CUSTOMER',
    `• Name: ${fullName}`,
    `• Phone: ${form.phone}`,
    `• Email: ${form.email}`,
    '',
    'DELIVERY LOCATION',
    `• Country: ${form.country}`,
    `• Governorate: ${form.governorate}`,
    `• City: ${form.city}`,
    `• Address: ${form.address}`,
    `• Postal Code: ${form.postalCode}`,
    '',
    'ORDER DETAILS',
    artworkLines,
    '',
    `TOTAL VALUE: ${formatPrice(total, 'TND')}`,
    '',
    form.notes ? `NOTES\n• ${form.notes}` : '',
    divider,
  ]
    .filter(Boolean)
    .join('\n');
}

export const WHATSAPP_NUMBER = '21625515396';
