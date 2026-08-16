'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';

interface NavigationProps {
  onOpenCart: () => void;
  isDarkHero?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenCart, isDarkHero = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isDarkNav = isDarkHero && !isScrolled;

  return (
    <header
      className={`site-nav ${isScrolled ? 'is-scrolled' : ''} ${isDarkNav ? 'is-dark' : ''}`}
    >
      <Link href="/" className="nav-brand">
        La Toile Blanche
      </Link>

      <nav className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}>
        <Link href="/collection" className={`nav-link ${pathname === '/collection' ? 'is-active' : ''}`}>
          Collection
        </Link>
        <Link href="/artists/ayoub-awadi" className={`nav-link ${pathname.startsWith('/artists') ? 'is-active' : ''}`}>
          Artist
        </Link>
        <Link href="/about" className={`nav-link ${pathname === '/about' ? 'is-active' : ''}`}>
          About
        </Link>
        <Link href="/journal" className={`nav-link ${pathname === '/journal' ? 'is-active' : ''}`}>
          Journal
        </Link>
        <Link href="/developer" className={`nav-link ${pathname === '/developer' ? 'is-active' : ''}`}>
          Studio
        </Link>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={onOpenCart}
          className="nav-bag"
          aria-label={`Shopping bag with ${itemCount} items`}
        >
          <span>Bag</span>
          {itemCount > 0 && <span className="nav-bag-count">{itemCount}</span>}
        </button>

        <button
          className={`nav-menu-btn ${isMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};
