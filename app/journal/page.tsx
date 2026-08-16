import React from 'react';
import { journalArticles } from '@/lib/data';
import { JournalCard } from '@/components/JournalCard';

export default function JournalPage() {
  return (
    <>
      <section className="about-hero" style={{ paddingBottom: '32px' }}>
        <span className="label" style={{ marginBottom: '16px', display: 'block' }}>Publications &bull; Essays &bull; Notes</span>
        <h1 className="heading-1">The Gallery Journal</h1>
        <p>
          Critical perspectives, studio visits, and essays exploring contemporary Mediterranean painting and artistic technique.
        </p>
      </section>

      <section className="section section-border">
        <div className="container">
          <div className="journal-grid">
            {journalArticles.map(article => (
              <JournalCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
