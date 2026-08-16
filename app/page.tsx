'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedArtworks, artists, journalArticles } from '@/lib/data';
import { ArtworkGrid } from '@/components/ArtworkGrid';
import { JournalCard } from '@/components/JournalCard';
import { NewsletterSignup } from '@/components/NewsletterSignup';

export default function HomePage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const featuredArtworks = getFeaturedArtworks();
  const artist = artists[0];

  return (
    <>
      {/* 01. Hero Section */}
      <section className="hero">
        <div className="hero-video-wrapper">
          <video
            src="/videos/n7.mp4"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setIsVideoLoaded(true)}
            className={`hero-video ${isVideoLoaded ? 'is-loaded' : ''}`}
          />
          <div className="hero-gradient" />
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">Original Hand-Painted Works &bull; Tunisia</div>
          <h1 className="hero-title">
            Art that speaks from the void of space.
          </h1>
          <p className="hero-subtitle">
            An intimate contemporary gallery exhibiting the raw, expressive original acrylic paintings of Ayoub Awadi.
          </p>
          <div className="hero-actions">
            <Link href="/collection" className="btn btn-gold btn-large">
              Explore Collection
            </Link>
            <Link href="/artists/ayoub-awadi" className="btn btn-outline-light btn-large">
              The Artist
            </Link>
          </div>
        </div>
      </section>

      {/* 02. Philosophy Statement */}
      <section className="statement">
        <div className="container">
          <p className="statement-text">
            &ldquo;Art is not made by algorithms. It is made by human hands, in quiet rooms, under shifting light.&rdquo;
          </p>
          <div className="statement-attr">
            La Toile Blanche Manifesto &bull; depthX studio
          </div>
        </div>
      </section>

      {/* 03. Featured Collection */}
      <section className="section section-border">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <span className="label">Selected Works</span>
              <h2 className="heading-2">Featured Collection</h2>
            </div>
            <Link href="/collection" className="text-link text-link-arrow">
              View All Works
            </Link>
          </div>

          <ArtworkGrid artworks={featuredArtworks} variant="featured" />
        </div>
      </section>

      {/* 04. Video Interlude */}
      <section className="video-interlude">
        <video src="/videos/n5.mp4" autoPlay muted loop playsInline />
        <div className="video-interlude-overlay">
          <h2 className="video-interlude-text">
            HANDS &bull; CANVAS &bull; TIMELIKE
          </h2>
        </div>
      </section>

      {/* 05. Artist Spotlight (Editorial) */}
      <section className="section section-border">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: 'var(--space-2xl) 0' }}>
            <span className="label" style={{ display: 'block', marginBottom: 'var(--space-lg)' }}>The Artist</span>
            <h2 className="heading-1" style={{ marginBottom: 'var(--space-xl)' }}>{artist.name}</h2>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-border-strong)', margin: '0 auto var(--space-xl)' }}></div>
            <p className="body-large" style={{ color: 'rgba(44, 44, 44, 0.75)', marginBottom: 'var(--space-xl)' }}>
              {artist.bio}
            </p>
            <blockquote className="serif-body" style={{ color: 'var(--color-deep-black)' }}>
              &ldquo;{artist.philosophy}&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* 06. The Artist's Hand (Horizontal Scroll Studio Footage) */}
      <section className="section section-cream section-border">
        <div className="container" style={{ marginBottom: '32px' }}>
          <span className="label">Creation Process</span>
          <h2 className="heading-2">The Artist&apos;s Hand</h2>
        </div>

        <div className="horizontal-scroll">
          <div className="horizontal-scroll-inner">
            <div className="horizontal-scroll-item">
              <video src="/videos/n3.mp4" autoPlay muted loop playsInline />
              <p>Studio sessions — mixing acrylic pigments in natural daylight.</p>
            </div>

            <div className="horizontal-scroll-item">
              <video src="/videos/n4.mp4" autoPlay muted loop playsInline />
              <p>Applying initial impasto textures onto raw canvas.</p>
            </div>

            <div className="horizontal-scroll-item">
              <video src="/videos/n1.mp4" autoPlay muted loop playsInline />
              <p>Fine detail work on architectural elements.</p>
            </div>

            <div className="horizontal-scroll-item">
              <video src="/videos/n2.mp4" autoPlay muted loop playsInline />
              <p>Final varnishing and signing of original works.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 07. Journal Preview */}
      <section className="section section-border">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <span className="label">Perspectives</span>
              <h2 className="heading-2">The Journal</h2>
            </div>
            <Link href="/journal" className="text-link text-link-arrow">
              Explore Articles
            </Link>
          </div>

          <div className="journal-grid">
            {journalArticles.map(article => (
              <JournalCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 08. Newsletter Signup */}
      <NewsletterSignup />
    </>
  );
}
