'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artwork } from '@/lib/types';
import { getArtist, formatPrice } from '@/lib/data';

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, priority = false }) => {
  const artist = getArtist(artwork.artistId);
  const altText = `${artwork.title} — original artwork — LaToileBlanche`;

  return (
    <article className="artwork-card">
      <Link href={`/artworks/${artwork.slug}`} aria-label={`View artwork ${artwork.title}`}>
        <div className="artwork-card-image">
          {artwork.availability === 'sold' && (
            <span className="artwork-card-badge sold">Sold</span>
          )}
          {artwork.availability === 'reserved' && (
            <span className="artwork-card-badge">Reserved</span>
          )}
          <Image
            src={artwork.images[0]}
            alt={altText}
            width={artwork.widthCm * 10}
            height={artwork.heightCm * 10}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <div className="artwork-card-info">
          <h3 className="artwork-card-title">{artwork.title}</h3>
          <div className="artwork-card-artist">{artist?.name || 'Ayoub Awadi'}</div>
          <div className="artwork-card-meta">
            <span className="artwork-card-price">
              {artwork.availability === 'sold'
                ? 'Sold Out'
                : formatPrice(artwork.price, artwork.currency)}
            </span>
            <span className="artwork-card-dim">{artwork.dimensions}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};
