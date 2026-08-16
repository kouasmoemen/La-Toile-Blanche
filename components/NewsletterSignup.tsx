'use client';

import React, { useState } from 'react';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="section section-cream">
      <div className="container">
        <div className="newsletter">
          <span className="label" style={{ marginBottom: '12px', display: 'block' }}>
            Private Dispatch
          </span>
          <h2 className="heading-2">Join the Art Letter</h2>
          <p>
            Receive private previews of new original paintings, studio notes, and exhibition invitations directly from the gallery.
          </p>

          {submitted ? (
            <p style={{ color: 'var(--color-sage)', fontWeight: 500 }}>
              Thank you for subscribing. You are now on our private collector list.
            </p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
