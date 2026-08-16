'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { getArtistBySlug, getArtworksByArtist } from '@/lib/data';
import { ArtworkGrid } from '@/components/ArtworkGrid';

export default function ArtistProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const artist = getArtistBySlug(slug);
  const [isSurrealMona, setIsSurrealMona] = useState(false);

  if (!artist) {
    notFound();
  }

  const artistArtworks = getArtworksByArtist(artist.id);

  return (
    <>
      {/* Hero Header */}
      <section className="collection-header" style={{ height: '65vh' }}>
        <video src="/videos/n6.mp4" autoPlay muted loop playsInline />
        <div className="collection-header-content">
          <span className="label" style={{ color: 'rgba(250, 248, 245, 0.6)' }}>
            The Artist Profile
          </span>
          <h1 className="heading-1" style={{ color: 'var(--color-ivory)' }}>
            {artist.name}
          </h1>
          <p style={{ color: 'rgba(250, 248, 245, 0.7)', maxWidth: '550px', marginTop: '12px' }}>
            {artist.nationality} painter &bull; Born {artist.birthYear} &bull; Based in {artist.location}
          </p>
        </div>
      </section>

      {/* Biography & Philosophy */}
      <section className="section">
        <div className="container">
          <div className="artist-info artist-info-wide">
              <span className="label">Biography</span>
              <h2 className="heading-2" style={{ marginBottom: '24px' }}>
                Vision &amp; Expression
              </h2>
              <p>{artist.bio}</p>

              <div style={{ margin: '36px 0' }}>
                <span className="label" style={{ marginBottom: '12px', display: 'block' }}>Artistic Philosophy</span>
                <blockquote className="serif-body" style={{ borderLeft: '2px solid var(--color-charcoal)', paddingLeft: '20px' }}>
                  &ldquo;{artist.philosophy}&rdquo;
                </blockquote>
              </div>

              {/* Exhibitions */}
              <div>
                <span className="label" style={{ marginBottom: '16px', display: 'block' }}>Exhibitions &amp; Shows</span>
                <ul style={{ listStyle: 'none' }}>
                  {artist.exhibitions.map((exh, idx) => (
                    <li key={idx} style={{ padding: '10px 0', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
                      &bull; {exh}
                    </li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
      </section>

      {/* Surreal Reinterpretation Showcase (Mona Lisa State Shift) */}
      <section className="section section-cream section-border">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label" style={{ marginBottom: '12px', display: 'block' }}>Interactive Study</span>
          <h2 className="heading-2" style={{ marginBottom: '16px' }}>La Joconde, Revisitée</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 36px', color: 'var(--color-stone)' }}>
            Hover or click to toggle between classical study and surreal reinterpretation.
          </p>

          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '340px',
              aspectRatio: '3/4',
              margin: '0 auto',
              cursor: 'pointer',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            }}
            onMouseEnter={() => setIsSurrealMona(true)}
            onMouseLeave={() => setIsSurrealMona(false)}
            onClick={() => setIsSurrealMona(!isSurrealMona)}
          >
            <Image
              src="/artworks/3adeya.jpg"
              alt="Mona Lisa Normal"
              fill
              style={{
                objectFit: 'cover',
                opacity: isSurrealMona ? 0 : 1,
                transition: 'opacity 0.5s ease',
              }}
            />
            <Image
              src="/artworks/mch-3adeya.jpg"
              alt="Mona Lisa Surreal"
              fill
              style={{
                objectFit: 'cover',
                opacity: isSurrealMona ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.7)',
                color: '#fff',
                padding: '4px 10px',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {isSurrealMona ? 'State: Surreal' : 'State: Classical'}
            </div>
          </div>
        </div>
      </section>

      {/* Artworks by Artist */}
      <section className="section section-border">
        <div className="container">
          <span className="label" style={{ marginBottom: '12px', display: 'block' }}>Artworks by {artist.name}</span>
          <h2 className="heading-2" style={{ marginBottom: '40px' }}>Catalogue Raisonné</h2>
          <ArtworkGrid artworks={artistArtworks} />
        </div>
      </section>
    </>
  );
}
