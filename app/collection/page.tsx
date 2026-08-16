'use client';

import React, { useState } from 'react';
import { searchArtworks, artworks } from '@/lib/data';
import { ArtworkGrid } from '@/components/ArtworkGrid';

export default function CollectionPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(artworks.map(a => a.category)))];

  const filteredArtworks = searchArtworks(
    searchQuery,
    categoryFilter,
    priceFilter,
    availabilityFilter
  );

  const resetFilters = () => {
    setSearchQuery('');
    setAvailabilityFilter('all');
    setCategoryFilter('all');
    setPriceFilter('all');
  };

  return (
    <>
      {/* Header with Background Video n8.mp4 */}
      <section className="collection-header">
        <video src="/videos/n8.mp4" autoPlay muted loop playsInline />
        <div className="collection-header-content">
          <span className="label" style={{ color: 'rgba(250, 248, 245, 0.6)' }}>
            Physical Canvas Catalogue
          </span>
          <h1 className="heading-1" style={{ color: 'var(--color-ivory)' }}>
            Original Artworks
          </h1>
          <p style={{ color: 'rgba(250, 248, 245, 0.7)', maxWidth: '540px', marginTop: '12px' }}>
            Browse authentic acrylic paintings by Ayoub Awadi. Each piece is an original one-of-a-kind physical work accompanied by a Certificate of Authenticity.
          </p>
        </div>
      </section>

      {/* Body & Search System */}
      <section className="collection-body">
        <div className="container">
          {/* Search Bar */}
          <div style={{ marginBottom: '32px' }}>
            <div
              style={{
                position: 'relative',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search artworks by title, technique, location (e.g. Sidi Bou Saïd, Méditerranéen, Royaume)..."
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '1px solid var(--color-border-strong)',
                  background: 'var(--color-ivory)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  borderRadius: '0',
                }}
                aria-label="Search artwork catalogue"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-stone)',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: '24px',
              marginBottom: '40px',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            {/* Category & Availability Filters */}
            <div className="collection-filters" style={{ margin: 0, padding: 0, flexWrap: 'wrap' }}>
              <button
                className={`collection-filter ${availabilityFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setAvailabilityFilter('all')}
              >
                All Works ({artworks.length})
              </button>
              <button
                className={`collection-filter ${availabilityFilter === 'available' ? 'is-active' : ''}`}
                onClick={() => setAvailabilityFilter('available')}
              >
                Available ({artworks.filter(a => a.availability === 'available').length})
              </button>

              <span style={{ margin: '0 8px', color: 'var(--color-border-strong)' }}>|</span>

              {categories.map(cat => (
                <button
                  key={cat}
                  className={`collection-filter ${categoryFilter === cat ? 'is-active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat === 'all' ? 'All Mediums' : cat}
                </button>
              ))}

              <span style={{ margin: '0 8px', color: 'var(--color-border-strong)' }}>|</span>

              {/* Price Filter */}
              <button
                className={`collection-filter ${priceFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setPriceFilter('all')}
              >
                All Prices
              </button>
              <button
                className={`collection-filter ${priceFilter === 'under-200' ? 'is-active' : ''}`}
                onClick={() => setPriceFilter('under-200')}
              >
                Under 200 TND
              </button>
              <button
                className={`collection-filter ${priceFilter === '200-500' ? 'is-active' : ''}`}
                onClick={() => setPriceFilter('200-500')}
              >
                200–500 TND
              </button>
              <button
                className={`collection-filter ${priceFilter === 'over-500' ? 'is-active' : ''}`}
                onClick={() => setPriceFilter('over-500')}
              >
                500 TND+
              </button>
            </div>

            {/* Results Count & Reset */}
            <div style={{ fontSize: '0.8rem', color: 'var(--color-stone)' }}>
              Displaying {filteredArtworks.length} of {artworks.length} artworks
              {(searchQuery || categoryFilter !== 'all' || priceFilter !== 'all' || availabilityFilter !== 'all') && (
                <button
                  onClick={resetFilters}
                  style={{
                    marginLeft: '12px',
                    color: 'var(--color-charcoal)',
                    textDecoration: 'underline',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Artwork Results */}
          {filteredArtworks.length > 0 ? (
            <ArtworkGrid artworks={filteredArtworks} />
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--color-stone)' }}>
              <p style={{ fontSize: '1.1rem', marginBottom: '16px' }}>
                No artworks matched your query &ldquo;{searchQuery}&rdquo;.
              </p>
              <button onClick={resetFilters} className="btn btn-outline">
                Clear Search &amp; Show All
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
