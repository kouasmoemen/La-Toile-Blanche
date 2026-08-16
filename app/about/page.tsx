import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <span className="label" style={{ marginBottom: '16px', display: 'block' }}>Our Manifesto</span>
        <h1 className="heading-display">
          Art is not made by algorithms. It is made by human hands.
        </h1>
        <p>
          La Toile Blanche is an independent international gallery dedicated to preserving, celebrating, and distributing physical original paintings created with authentic acrylic pigments and human craftsmanship.
        </p>
      </section>

      {/* Video Background Section */}
      <section className="video-interlude" style={{ height: '55vh' }}>
        <video src="/videos/n10.mp4" autoPlay muted loop playsInline />
        <div className="video-interlude-overlay">
          <h2 className="video-interlude-text">
            AUTHENTICITY &bull; PROVENANCE &bull; PASSION
          </h2>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="section section-border">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="label">Pillars</span>
            <h2 className="heading-2">Gallery Principles</h2>
          </div>

          <div className="about-values">
            <div className="about-value">
              <h3>01. 100% Original Canvases</h3>
              <p>
                Every piece in our gallery is an authentic, one-of-a-kind physical painting. We do not sell digital prints, AI generations, or mass reproductions.
              </p>
            </div>

            <div className="about-value">
              <h3>02. Direct Studio Provenance</h3>
              <p>
                We work directly with young visionaries like Ayoub Awadi. Every acquisition directly supports the artist and their ongoing studio practice.
              </p>
            </div>

            <div className="about-value">
              <h3>03. Certificate of Authenticity</h3>
              <p>
                Each artwork is delivered with an official signed and sealed Certificate of Authenticity detailing medium, dimensions, ref code, and provenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Credit Section */}
      <section className="section section-cream section-border" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <span className="label" style={{ marginBottom: '12px', display: 'block' }}>Production &amp; Studio</span>
          <h2 className="heading-2" style={{ marginBottom: '16px' }}>Depthx studio.js</h2>
          <p style={{ color: 'var(--color-stone)', lineHeight: '1.8', marginBottom: '28px' }}>
            La Toile Blanche is produced and curated under the technical and creative direction of Depthx studio.js and Kouas Moemen, dedicated to bringing Mediterranean art to a worldwide audience.
          </p>
          <Link href="/developer" className="btn btn-primary">
            Meet the Studio
          </Link>
        </div>
      </section>
    </>
  );
}
