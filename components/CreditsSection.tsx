import React from 'react';
import Link from 'next/link';

export const CreditsSection: React.FC = () => {
  return (
    <section className="section section-cream section-border" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3xl)', alignItems: 'start' }}>
          
          {/* Developer / Digital Experience */}
          <div>
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <span className="label" style={{ fontSize: '0.65rem' }}>Digital Experience</span>
            </div>
            <div style={{ height: '1px', width: '100%', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-lg)' }}></div>
            <p className="body-small" style={{ marginBottom: '4px' }}>
              Designed & developed by
            </p>
            <h4 className="heading-4" style={{ marginBottom: 'var(--space-md)' }}>
              <Link href="/developer" style={{ transition: 'opacity 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                Kouas Moemen
              </Link>
            </h4>
            <p className="body-small" style={{ color: 'rgba(44, 44, 44, 0.7)' }}>
              Digital experiences, web development & creative technology.
            </p>
          </div>

          {/* Sponsoring Company / Studio */}
          <div>
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <span className="label" style={{ fontSize: '0.65rem' }}>In Collaboration With</span>
            </div>
            <div style={{ height: '1px', width: '100%', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-lg)' }}></div>
            <p className="body-small" style={{ marginBottom: '4px' }}>
              Creative direction & support by
            </p>
            <h4 className="heading-4" style={{ marginBottom: 'var(--space-md)' }}>
              <Link href="/developer" style={{ transition: 'opacity 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')} onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}>
                Depthx studio.js
              </Link>
            </h4>
            <p className="body-small" style={{ color: 'rgba(44, 44, 44, 0.7)' }}>
              A visionary studio pushing the boundaries of contemporary art & digital expression.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
