import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { JournalArticle } from '@/lib/types';

interface JournalCardProps {
  article: JournalArticle;
}

export const JournalCard: React.FC<JournalCardProps> = ({ article }) => {
  return (
    <article className="journal-card">
      <Link href={`/journal#${article.slug}`}>
        {article.image && (
          <div className="journal-card-image">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className="journal-card-cat">{article.category} &bull; {article.readTime}</div>
        <h3 className="journal-card-title">{article.title}</h3>
        <p className="journal-card-excerpt">{article.excerpt}</p>
      </Link>
    </article>
  );
};
