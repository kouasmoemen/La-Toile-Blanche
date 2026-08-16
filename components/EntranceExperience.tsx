'use client';

import React, { useEffect, useState } from 'react';

export const EntranceExperience: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('ltb-has-seen-intro');
    if (hasSeenIntro) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      handleDismiss();
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsLeaving(true);
    sessionStorage.setItem('ltb-has-seen-intro', 'true');
    setTimeout(() => {
      setIsVisible(false);
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div className={`entrance ${isLeaving ? 'is-leaving' : ''}`}>
      <div className="entrance-brand">La Toile Blanche</div>
      <div className="entrance-line" />
      <button className="entrance-skip" onClick={handleDismiss}>
        Skip Intro
      </button>
    </div>
  );
};
