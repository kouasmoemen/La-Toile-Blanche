import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-name">La Toile Blanche</div>
            <p>
              An international contemporary art gallery dedicated to physical, original hand-painted artworks. Powered by depthX studio.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <Link href="/collection">Collection</Link>
            <Link href="/artists/ayoub-awadi">The Artist</Link>
            <Link href="/about">About Us</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/developer">Developer &amp; Studio</Link>
          </div>

          <div className="footer-col">
            <h4>Inquiries</h4>
            <a href="https://wa.me/21625515396" target="_blank" rel="noopener noreferrer">
              WhatsApp Acquisition
            </a>
            <a href="https://www.instagram.com/latoileblanche.tn/" target="_blank" rel="noopener noreferrer">
              Instagram @latoileblanche.tn
            </a>
            <a href="tel:+21625515396">+216 25 515 396</a>
          </div>

          <div className="footer-col">
            <h4>Credit & Studio</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
              Artist: Ayoub Awadi
            </p>
            <Link href="/developer">Development: Kouas Moemen</Link>
            <Link href="/developer">Depthx studio.js</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} La Toile Blanche x depthX studio. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <span>Original Hand-Painted Works</span>
            <span>Tunis &bull; Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
