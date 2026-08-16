'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter, notFound } from 'next/navigation';
import { getArtwork, getArtist, formatPrice, artworks } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { ArtworkGrid } from '@/components/ArtworkGrid';

export default function ArtworkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const artwork = getArtwork(slug);
  const { addItem, isInCart } = useCart();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!artwork) {
    notFound();
  }

  const artist = getArtist(artwork.artistId);
  const relatedArtworks = artworks
    .filter(a => a.id !== artwork.id)
    .slice(0, 2);

  const isSold = artwork.availability === 'sold';
  const isReserved = artwork.availability === 'reserved';
  const inCart = isInCart(artwork.id);

  const handleAddToCart = () => {
    if (!isSold) {
      addItem(artwork.id);
    }
  };

  const handleBuyNow = () => {
    if (!isSold) {
      addItem(artwork.id);
      router.push('/cart');
    }
  };

  const altText = `${artwork.title} — original artwork — LaToileBlanche`;
  const artworkUrl = `https://latoileblanche.tn/artworks/${artwork.slug}`;
  const imageUrl = `https://latoileblanche.tn${artwork.images[0]}`;

  // Schema.org JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: artwork.title,
    image: [imageUrl],
    description: artwork.description,
    sku: artwork.certificateId,
    category: artwork.category,
    brand: {
      '@type': 'Brand',
      name: 'La Toile Blanche',
    },
    creator: {
      '@type': 'Person',
      name: artist?.name || 'Ayoub Awadi',
    },
    offers: {
      '@type': 'Offer',
      ...(isSold
        ? { availability: 'https://schema.org/OutOfStock' }
        : {
            url: artworkUrl,
            priceCurrency: artwork.currency,
            price: artwork.price,
            itemCondition: 'https://schema.org/NewCondition',
            availability:
              artwork.availability === 'available'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
          }),
      seller: {
        '@type': 'Organization',
        name: 'La Toile Blanche',
      },
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://latoileblanche.tn',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Collection',
        item: 'https://latoileblanche.tn/collection',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: artwork.title,
        item: artworkUrl,
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="artwork-detail" style={{ paddingTop: 'var(--header-height)' }}>
        {/* Left: Sticky Image Gallery */}
        <div className="artwork-detail-image" onClick={() => setIsViewerOpen(true)}>
          <Image
            src={artwork.images[activeImageIndex]}
            alt={altText}
            width={artwork.widthCm * 12}
            height={artwork.heightCm * 12}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Right: Detailed Metadata & Purchase */}
        <div className="artwork-detail-content">
          <div className="artwork-detail-header">
            <span className="label">
              {artwork.category} &bull; {artwork.year}
            </span>
            <h1 className="artwork-detail-title">{artwork.title}</h1>
            {artist && (
              <Link href={`/artists/${artist.slug}`} className="artwork-detail-artist-link">
                By {artist.name} ({artist.nationality}, b. {artist.birthYear})
              </Link>
            )}

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginTop: '12px' }}>
              {!isSold && (
                <div className="artwork-detail-price">
                  {formatPrice(artwork.price, artwork.currency)}
                </div>
              )}
              <div className={`artwork-detail-avail ${isSold ? 'sold' : ''}`}>
                {isSold
                  ? 'Sold to Private Collection'
                  : isReserved
                  ? 'Reserved'
                  : 'Available Original Work'}
              </div>
            </div>
          </div>

          <div className="artwork-detail-actions">
            {!isSold ? (
              <>
                <button onClick={handleAddToCart} className="btn btn-outline btn-large btn-full">
                  {inCart ? 'ADDED TO CART' : 'ADD TO CART'}
                </button>
                <button onClick={handleBuyNow} className="btn btn-gold btn-large btn-full">
                  BUY NOW
                </button>
              </>
            ) : (
              <button disabled className="btn btn-outline btn-large btn-full" style={{ opacity: 0.5 }}>
                Work Sold
              </button>
            )}
          </div>

          {/* Metadata Specs */}
          <div className="artwork-detail-meta">
            <dl>
              <div className="artwork-detail-meta-row">
                <dt>Medium</dt>
                <dd>{artwork.medium}</dd>
              </div>
              <div className="artwork-detail-meta-row">
                <dt>Dimensions</dt>
                <dd>{artwork.dimensions}</dd>
              </div>
              <div className="artwork-detail-meta-row">
                <dt>Authenticity</dt>
                <dd>Signed original canvas &bull; Ref {artwork.certificateId}</dd>
              </div>
              <div className="artwork-detail-meta-row">
                <dt>Provenance</dt>
                <dd>Direct from artist studio ({artist?.location || 'Tunisia'})</dd>
              </div>
              <div className="artwork-detail-meta-row">
                <dt>Shipping</dt>
                <dd>Custom protective packaging &bull; Worldwide insured delivery</dd>
              </div>
            </dl>
          </div>

          {/* Story & Creation History */}
          <div className="artwork-detail-story">
            <h3>The Story Behind the Work</h3>
            <p>{artwork.story}</p>
          </div>

          {/* Creation Video Accent */}
          <div
            style={{
              position: 'relative',
              height: '220px',
              overflow: 'hidden',
              background: '#000',
              marginTop: '16px',
            }}
          >
            <video
              src="/videos/n9.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                color: '#fff',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Studio Documentation &bull; Physical Canvas
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Viewer Modal */}
      {isViewerOpen && (
        <div className="image-viewer is-open" onClick={() => setIsViewerOpen(false)}>
          <span className="image-viewer-close">Close (Esc)</span>
          <Image
            src={artwork.images[activeImageIndex]}
            alt={altText}
            width={artwork.widthCm * 20}
            height={artwork.heightCm * 20}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
          />
        </div>
      )}

      {/* Related Artworks */}
      {relatedArtworks.length > 0 && (
        <section className="section section-border">
          <div className="container">
            <span className="label" style={{ marginBottom: '12px', display: 'block' }}>
              Other Artworks
            </span>
            <h2 className="heading-2" style={{ marginBottom: '36px' }}>
              Explore the Collection
            </h2>
            <ArtworkGrid artworks={relatedArtworks} />
          </div>
        </section>
      )}
    </>
  );
}
