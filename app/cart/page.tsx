'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import {
  getArtwork,
  getArtist,
  formatPrice,
  generateWhatsAppMessage,
  WHATSAPP_NUMBER,
  TUNISIAN_GOVERNORATES,
} from '@/lib/data';
import { CheckoutFormData } from '@/lib/types';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  governorate?: string;
  city?: string;
  address?: string;
  postalCode?: string;
}

export default function CheckoutPage() {
  const { state, removeItem, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    country: 'Tunisia',
    governorate: 'Tunis',
    city: '',
    address: '',
    postalCode: '',
    notes: '',
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@domain.com)';
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required for WhatsApp handoff';
    } else if (phoneDigits.length < 8) {
      newErrors.phone = 'Please enter a valid phone number (min. 8 digits)';
    }

    if (!form.governorate) {
      newErrors.governorate = 'Please select a Tunisian governorate';
    }

    if (!form.city.trim()) {
      newErrors.city = 'City / Town is required';
    }

    if (!form.address.trim()) {
      newErrors.address = 'Full delivery address is required';
    }

    if (!form.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItemsWithDetails.length === 0) return;

    // 1. Generate formatted WhatsApp message
    const message = generateWhatsAppMessage(
      cartItemsWithDetails as { artwork: any; quantity: number }[],
      form
    );

    // 2. Build WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // 3. Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // 4. Mark submitted state & clear cart
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="confirmation">
        <span className="label" style={{ color: 'var(--color-sage)' }}>
          Acquisition Request Prepared
        </span>
        <h1 className="heading-1">Your Acquisition Request is Ready.</h1>
        <p>
          We have generated your structured order summary and opened WhatsApp to connect you directly with gallery leadership at La Toile Blanche.
        </p>
        <p style={{ fontSize: '0.88rem', color: 'var(--color-stone)' }}>
          If WhatsApp did not open automatically, please click below to send your pre-filled message.
        </p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/collection" className="btn btn-primary">
            Return to Collection
          </Link>
        </div>
      </div>
    );
  }

  if (cartItemsWithDetails.length === 0) {
    return (
      <div
        className="checkout-page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{ padding: '64px 20px', maxWidth: '480px' }}>
          <span className="label" style={{ marginBottom: '12px', display: 'block' }}>
            Acquisition Bag
          </span>
          <h1 className="heading-2" style={{ marginBottom: '16px' }}>Your Bag is Empty</h1>
          <p style={{ color: 'var(--color-stone)', marginBottom: '28px' }}>
            Explore our collection of original hand-painted canvases to begin your acquisition.
          </p>
          <Link href="/collection" className="btn btn-primary">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-layout">
        {/* Left Column: Customer & Shipping Information Form */}
        <div className="checkout-form-section">
          <div>
            <div className="checkout-step-label">Step 01 of 02 &bull; Collector Details</div>
            <h1>Acquisition Checkout</h1>
            <p style={{ color: 'var(--color-stone)', fontSize: '0.9rem', marginTop: '6px' }}>
              Please enter your contact and delivery details below. Clicking &ldquo;BUY NOW&rdquo; will generate your complete order summary and open WhatsApp to send it directly to La Toile Blanche.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form-grid" noValidate>
            {/* Personal Information */}
            <div className="checkout-form-full" style={{ marginBottom: '8px' }}>
              <span className="label" style={{ color: 'var(--color-charcoal)', fontWeight: 600 }}>
                Personal Information
              </span>
            </div>

            <div className="form-field">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                placeholder="e.g. Aymen"
                value={form.firstName}
                onChange={handleChange}
                style={{ borderColor: errors.firstName ? '#c4775a' : undefined }}
              />
              {errors.firstName && (
                <span style={{ fontSize: '0.75rem', color: '#c4775a', marginTop: '2px' }}>
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                placeholder="e.g. Ben Ali"
                value={form.lastName}
                onChange={handleChange}
                style={{ borderColor: errors.lastName ? '#c4775a' : undefined }}
              />
              {errors.lastName && (
                <span style={{ fontSize: '0.75rem', color: '#c4775a', marginTop: '2px' }}>
                  {errors.lastName}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="e.g. collector@example.com"
                value={form.email}
                onChange={handleChange}
                style={{ borderColor: errors.email ? '#c4775a' : undefined }}
              />
              {errors.email && (
                <span style={{ fontSize: '0.75rem', color: '#c4775a', marginTop: '2px' }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="phone">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                placeholder="e.g. +216 98 123 456"
                value={form.phone}
                onChange={handleChange}
                style={{ borderColor: errors.phone ? '#c4775a' : undefined }}
              />
              {errors.phone && (
                <span style={{ fontSize: '0.75rem', color: '#c4775a', marginTop: '2px' }}>
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Delivery Location */}
            <div className="checkout-form-full" style={{ margin: '16px 0 8px' }}>
              <span className="label" style={{ color: 'var(--color-charcoal)', fontWeight: 600 }}>
                Delivery Location
              </span>
            </div>

            <div className="form-field">
              <label htmlFor="country">Country *</label>
              <select id="country" name="country" value={form.country} onChange={handleChange}>
                <option value="Tunisia">Tunisia</option>
                <option value="France">France</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Other">Other International</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="governorate">Governorate / Wilaya (Tunisia) *</label>
              <select
                id="governorate"
                name="governorate"
                required
                value={form.governorate}
                onChange={handleChange}
                style={{ borderColor: errors.governorate ? '#c4775a' : undefined }}
              >
                {TUNISIAN_GOVERNORATES.map(gov => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
              {errors.governorate && (
                <span style={{ fontSize: '0.75rem', color: '#c4775a', marginTop: '2px' }}>
                  {errors.governorate}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="city">City / Town *</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder="e.g. Sidi Bou Saïd / Marsa / Sousse"
                value={form.city}
                onChange={handleChange}
                style={{ borderColor: errors.city ? '#c4775a' : undefined }}
              />
              {errors.city && (
                <span style={{ fontSize: '0.75rem', color: '#c4775a', marginTop: '2px' }}>
                  {errors.city}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="postalCode">Postal Code *</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                required
                placeholder="e.g. 2078"
                value={form.postalCode}
                onChange={handleChange}
                style={{ borderColor: errors.postalCode ? '#c4775a' : undefined }}
              />
              {errors.postalCode && (
                <span style={{ fontSize: '0.75rem', color: '#c4775a', marginTop: '2px' }}>
                  {errors.postalCode}
                </span>
              )}
            </div>

            <div className="form-field checkout-form-full">
              <label htmlFor="address">Full Street Address *</label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                placeholder="Street address, building, apartment number, landmark..."
                value={form.address}
                onChange={handleChange}
                style={{ borderColor: errors.address ? '#c4775a' : undefined }}
              />
              {errors.address && (
                <span style={{ fontSize: '0.75rem', color: '#c4775a', marginTop: '2px' }}>
                  {errors.address}
                </span>
              )}
            </div>

            <div className="form-field checkout-form-full">
              <label htmlFor="notes">Additional Order &amp; Delivery Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                rows={2}
                placeholder="Any special handling instructions, framing preferences, or gift notes..."
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            <div className="checkout-form-full" style={{ marginTop: '20px' }}>
              <button type="submit" className="btn btn-gold btn-large btn-full">
                BUY NOW — SEND ORDER VIA WHATSAPP
              </button>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-stone)',
                  textAlign: 'center',
                  marginTop: '12px',
                }}
              >
                No credit-card online payment required. Your order is confirmed directly with La Toile Blanche via WhatsApp.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Order Review Sidebar */}
        <aside className="checkout-summary">
          <div className="checkout-summary-title">Step 02 of 02 &bull; Order Summary</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cartItemsWithDetails.map(item => {
              if (!item) return null;
              const { artwork, artist } = item;
              return (
                <div key={artwork.id} className="checkout-artwork">
                  <div className="checkout-artwork-image">
                    <Image
                      src={artwork.images[0]}
                      alt={`${artwork.title} — original artwork — LaToileBlanche`}
                      width={100}
                      height={133}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="checkout-artwork-info">
                    <div className="checkout-artwork-title">{artwork.title}</div>
                    <div className="checkout-artwork-detail">By {artist?.name || 'Ayoub Awadi'}</div>
                    <div className="checkout-artwork-detail">
                      {artwork.medium} &bull; {artwork.dimensions}
                    </div>
                    <div
                      className="checkout-artwork-detail"
                      style={{ fontSize: '0.72rem', color: 'var(--color-sage)' }}
                    >
                      Ref: {artwork.certificateId}
                    </div>
                    <div className="checkout-artwork-price">
                      {formatPrice(artwork.price, artwork.currency)}
                    </div>
                    <button
                      onClick={() => removeItem(artwork.id)}
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--color-stone)',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        marginTop: '4px',
                        textDecoration: 'underline',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <dl className="checkout-totals">
            <div className="checkout-total-row">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal, currency)}</dd>
            </div>
            <div className="checkout-total-row">
              <dt>Certificate of Authenticity</dt>
              <dd>Included (Physical &amp; Sealed)</dd>
            </div>
            <div className="checkout-total-row">
              <dt>Insured Shipping</dt>
              <dd>Handled via WhatsApp</dd>
            </div>
            <div className="checkout-total-row is-total">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal, currency)}</dd>
            </div>
          </dl>

          <div
            style={{
              padding: '16px',
              background: 'rgba(44, 44, 44, 0.04)',
              border: '1px solid var(--color-border)',
              fontSize: '0.8rem',
              color: 'var(--color-stone)',
              lineHeight: '1.6',
            }}
          >
            <strong>Authenticity Guarantee:</strong> Every physical artwork is signed by Ayoub Awadi and delivered with an official Certificate of Authenticity.
          </div>
        </aside>
      </div>
    </div>
  );
}
