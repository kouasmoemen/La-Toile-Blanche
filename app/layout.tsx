'use client';

import React, { useState } from 'react';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CreditsSection } from '@/components/CreditsSection';
import { CustomCursor } from '@/components/CustomCursor';
import { EntranceExperience } from '@/components/EntranceExperience';
import { CartDrawer } from '@/components/CartDrawer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    name: 'La Toile Blanche',
    alternateName: 'LaToileBlanche',
    url: 'https://latoileblanche.tn',
    logo: 'https://latoileblanche.tn/artworks/lumiere-sidi-bou-said.jpg',
    description:
      'La Toile Blanche is an international contemporary art gallery based in Tunisia, offering original hand-painted acrylic paintings by artist Ayoub Awadi. Powered by depthX studio.',
    telephone: '+21625515396',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TN',
      addressLocality: 'Tunis',
    },
    sameAs: [
      'https://www.instagram.com/latoileblanche.tn/',
      'https://www.instagram.com/dep.thx/',
    ],
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'La Toile Blanche',
    url: 'https://latoileblanche.tn',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://latoileblanche.tn/collection?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      <head>
        <title>La Toile Blanche — Original Artworks &amp; Contemporary Gallery | Tunisia</title>
        <meta
          name="description"
          content="La Toile Blanche is a contemporary art gallery presenting original hand-painted acrylic paintings by Tunisian artist Ayoub Awadi. Explore Lumière de Sidi Bou Saïd, Coucher de Soleil Méditerranéen, and Le Royaume Oublié. Direct WhatsApp acquisition."
        />
        <meta
          name="keywords"
          content="La Toile Blanche, Ayoub Awadi, Tunisian art, original paintings, acrylic painting, art gallery Tunisia, Sidi Bou Saïd, depthX studio, fine art"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="google" content="notranslate" />
        <link rel="canonical" href="https://latoileblanche.tn" />

        {/* Open Graph */}
        <meta property="og:title" content="La Toile Blanche — Original Hand-Painted Artworks" />
        <meta
          property="og:description"
          content="Contemporary international art gallery featuring original physical acrylic paintings by Ayoub Awadi. Powered by depthX studio."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://latoileblanche.tn" />
        <meta property="og:site_name" content="La Toile Blanche" />
        <meta property="og:image" content="https://latoileblanche.tn/artworks/lumiere-sidi-bou-said.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="La Toile Blanche — Fine Art Gallery" />
        <meta
          name="twitter:description"
          content="Original hand-painted acrylic paintings by Ayoub Awadi. Worldwide delivery."
        />
        <meta name="twitter:image" content="https://latoileblanche.tn/artworks/lumiere-sidi-bou-said.jpg" />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="notranslate" translate="no" suppressHydrationWarning>
        <CartProvider>
          <EntranceExperience />
          <CustomCursor />
          <Navigation onOpenCart={() => setIsCartOpen(true)} />
          <main>{children}</main>
          <CreditsSection />
          <Footer />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </CartProvider>
      </body>
    </html>
  );
}
