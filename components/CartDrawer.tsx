'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { getArtwork, getArtist, formatPrice } from '@/lib/data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { state, removeItem } = useCart();

  const cartItemsWithDetails = state.items
    .map(item => {
      const artwork = getArtwork(item.artworkId);
      if (!artwork) return null;
      const artist = getArtist(artwork.artistId);
      return {
        artwork,
        artist,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = cartItemsWithDetails.reduce(
    (sum, item) => sum + (item ? item.artwork.price * item.quantity : 0),
    0
  );

  const currency = cartItemsWithDetails[0]?.artwork.currency || 'TND';

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
      />
      <aside className={`cart-drawer ${isOpen ? 'is-open' : ''}`}>
        <div className="cart-drawer-header">
          <h2>Acquisition Bag ({state.items.length})</h2>
          <button className="cart-drawer-close" onClick={onClose} aria-label="Close Bag">
            ✕
          </button>
        </div>

        <div className="cart-drawer-body">
          {cartItemsWithDetails.length === 0 ? (
            <div className="cart-drawer-empty">
              <p>Your acquisition bag is currently empty.</p>
              <Link href="/collection" className="btn btn-outline" onClick={onClose}>
                Explore Collection
              </Link>
            </div>
          ) : (
            cartItemsWithDetails.map(item => {
              if (!item) return null;
              const { artwork, artist } = item;
              return (
                <div key={artwork.id} className="cart-item">
                  <div className="cart-item-image">
                    <Image
                      src={artwork.images[0]}
                      alt={artwork.title}
                      width={100}
                      height={133}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-title">{artwork.title}</div>
                    <div className="cart-item-artist">{artist?.name}</div>
                    <div className="cart-item-dim">{artwork.dimensions}</div>
                    <div className="cart-item-price">
                      {formatPrice(artwork.price, artwork.currency)}
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeItem(artwork.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cartItemsWithDetails.length > 0 && (
          <div className="cart-drawer-footer">
            <dl className="cart-drawer-total">
              <dt>Total Value</dt>
              <dd>{formatPrice(subtotal, currency)}</dd>
            </dl>
            <Link
              href="/cart"
              className="btn btn-primary btn-full"
              onClick={onClose}
            >
              Proceed to Acquisition
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};
