import React from 'react';
import { ArtworkCard } from './ArtworkCard';
import { Artwork } from '@/lib/types';

interface ArtworkGridProps {
  artworks: Artwork[];
  variant?: 'standard' | 'featured';
}

export const ArtworkGrid: React.FC<ArtworkGridProps> = ({ artworks, variant = 'standard' }) => {
  if (variant === 'featured') {
    return (
      <div className="artwork-grid artwork-grid-featured">
        {artworks.map((artwork, idx) => (
          <ArtworkCard key={artwork.id} artwork={artwork} priority={idx === 0} />
        ))}
      </div>
    );
  }

  return (
    <div className="artwork-grid">
      {artworks.map((artwork, idx) => (
        <ArtworkCard key={artwork.id} artwork={artwork} priority={idx < 3} />
      ))}
    </div>
  );
};
