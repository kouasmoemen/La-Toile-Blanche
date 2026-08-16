import React from 'react';

const developerAccounts = [
  { label: 'Instagram', href: 'https://www.instagram.com/kouasmoemen/' },
  { label: 'Facebook', href: 'https://www.facebook.com/moemen.kouas/' },
  { label: 'GitHub', href: 'https://github.com/kouasmoemen' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/moemen-kouas-b04968306/' },
];

const studioAccounts = [
  { label: 'Instagram', href: 'https://www.instagram.com/dep.thx/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61585566803581' },
];

export default function DeveloperPage() {
  return (
    <>
      <section className="developer-hero">
        <span className="label">Digital Direction &bull; Development</span>
        <h1 className="heading-display">Built with precision, made to feel effortless.</h1>
        <p>
          The digital experience of La Toile Blanche is crafted by Kouas Moemen with the support of Depthx studio.js.
        </p>
      </section>

      <section className="section section-border">
        <div className="container developer-grid">
          <article className="developer-profile">
            <span className="label">Official Developer</span>
            <h2 className="heading-2">Kouas Moemen</h2>
            <p className="developer-role">Professional web developer &amp; user-interface designer.</p>
            <p>
              Kouas Moemen designs refined, responsive digital experiences with a focus on clarity, performance, and distinctive visual identity.
            </p>
            <div className="developer-links" aria-label="Official developer accounts">
              {developerAccounts.map((account) => (
                <a key={account.label} href={account.href} target="_blank" rel="noopener noreferrer">
                  {account.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </article>

          <article className="developer-profile developer-profile-studio">
            <span className="label">Supporting Company</span>
            <h2 className="heading-2">Depthx studio.js</h2>
            <p className="developer-role">A private technology studio for the next generation of Tunisian talent.</p>
            <p>
              Founded in Tunisia in 2024, Depthx studio.js brings together young Tunisian developers to create ambitious digital work. The studio is headquartered in Tunisia, with branches in Nice, Moscow, and Doha.
            </p>
            <div className="developer-locations" aria-label="Depthx studio.js locations">
              <span>Tunisia</span>
              <span>Nice, France</span>
              <span>Moscow, Russia</span>
              <span>Doha, Qatar</span>
            </div>
            <div className="developer-links" aria-label="Official studio accounts">
              {studioAccounts.map((account) => (
                <a key={account.label} href={account.href} target="_blank" rel="noopener noreferrer">
                  {account.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section-cream section-border developer-signature">
        <div className="container">
          <span className="label">La Toile Blanche</span>
          <p className="serif-body">A gallery experience shaped by art, technology, and a belief in thoughtful digital craft.</p>
        </div>
      </section>
    </>
  );
}
