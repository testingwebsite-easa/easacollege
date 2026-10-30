import React, { useState, useEffect } from 'react';
import defaultBannerImg from '../assets/about-main.webp';

/**
 * =========================================================================
 * 🎛️ POPUP MASTER CONTROLLER
 * =========================================================================
 * You have 100% FULL CONTROL right here in this file!
 * You do NOT need to edit Home.jsx at all.
 * Simply change any of the settings below:
 */
export const POPUP_CONFIG = {
  // 1. SHOW / HIDE POPUP:
  // Set to 'true' to show popup on website, or 'false' to disable it completely
  isEnabled: true,

  // 2. BANNER IMAGE:
  // Use 'defaultBannerImg' (from src/assets/about-main.webp),
  // OR paste any URL e.g. "https://example.com/banner.jpg"
  imageSrc: defaultBannerImg,

  // 3. ALT TEXT (for accessibility):
  altText: "EASA College of Engineering and Technology Announcement",

  // 4. CLICK DESTINATION LINK:
  // When user clicks the banner image:
  // e.g. "/admissions", "https://easacollege.com", or "#" / "" if not clickable
  linkUrl: "#",

  // 5. OPEN LINK IN NEW TAB?
  // true = open in new tab | false = open in current tab
  openInNewTab: false,

  // 6. FREQUENCY:
  // "always"  -> Pops up every time user loads or refreshes the page
  // "once"    -> Pops up only once per browser visit (uses sessionStorage)
  frequency: "always",

  // 7. DELAY BEFORE SHOWING (in milliseconds):
  // 0 = instant, 300 = 0.3 seconds, 1000 = 1 second
  delayMs: 300,

  // 8. SHOW BOTTOM "CLOSE" BAR:
  // true = show footer bar with close button | false = image only with top-right 'X'
  showBottomBar: true,
};

const BannerPopup = (props) => {
  // Merge config with any optional props passed from outside
  const isEnabled = props.isEnabled ?? POPUP_CONFIG.isEnabled;
  const imageSrc = props.imageSrc ?? POPUP_CONFIG.imageSrc;
  const altText = props.altText ?? POPUP_CONFIG.altText;
  const linkUrl = props.linkUrl ?? POPUP_CONFIG.linkUrl;
  const openInNewTab = props.openInNewTab ?? POPUP_CONFIG.openInNewTab;
  const frequency = props.frequency ?? POPUP_CONFIG.frequency;
  const delayMs = props.delayMs ?? POPUP_CONFIG.delayMs;
  const showBottomBar = props.showBottomBar ?? POPUP_CONFIG.showBottomBar;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // If disabled in config, don't show
    if (!isEnabled) {
      return;
    }

    // If frequency is 'once', check whether it has already been shown in this session
    if (frequency === 'once') {
      const hasShown = sessionStorage.getItem('easa_banner_popup_shown');
      if (hasShown) return;
    }

    // Timer delay before showing
    const timer = setTimeout(() => {
      setIsOpen(true);
      if (frequency === 'once') {
        sessionStorage.setItem('easa_banner_popup_shown', 'true');
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isEnabled, frequency, delayMs]);

  // Close popup on 'Escape' key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // If disabled or closed, render nothing
  if (!isEnabled || !isOpen) return null;

  const isClickable = Boolean(linkUrl && linkUrl !== '#' && linkUrl !== '');

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label={altText}
      onClick={() => setIsOpen(false)} // Clicking backdrop closes popup
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'easaFadeIn 0.25s ease-out',
      }}
    >
      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent close on clicking modal card
        style={{
          position: 'relative',
          maxWidth: '650px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
          overflow: 'hidden',
          animation: 'easaScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Top-Right Close Button ('×') */}
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close popup"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            color: '#ffffff',
            border: 'none',
            fontSize: '22px',
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)')}
        >
          &times;
        </button>

        {/* Banner Image Content */}
        <div style={{ position: 'relative', width: '100%', lineHeight: 0 }}>
          {isClickable ? (
            <a
              href={linkUrl}
              target={openInNewTab ? '_blank' : '_self'}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
              onClick={() => setIsOpen(false)}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <img
                src={imageSrc}
                alt={altText}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '78vh',
                  objectFit: 'contain',
                  display: 'block',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.96')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              />
            </a>
          ) : (
            <img
              src={imageSrc}
              alt={altText}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '78vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          )}
        </div>

        {/* Bottom Bar with Close Button (Optional) */}
        {showBottomBar && (
          <div
            style={{
              padding: '10px 16px',
              backgroundColor: '#f9fafb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isClickable ? 'space-between' : 'flex-end',
              borderTop: '1px solid #f3f4f6',
            }}
          >
            {isClickable && (
              <a
                href={linkUrl}
                target={openInNewTab ? '_blank' : '_self'}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1e40af',
                  textDecoration: 'none',
                }}
              >
                Click here to know more &rarr;
              </a>
            )}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                padding: '6px 18px',
                fontSize: '13px',
                fontWeight: 500,
                color: '#374151',
                backgroundColor: '#e5e7eb',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#d1d5db')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Embedded Animations */}
      <style>{`
        @keyframes easaFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes easaScaleUp {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default BannerPopup;
