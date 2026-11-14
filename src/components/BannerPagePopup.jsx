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
  isEnabled: true,

  // 2. BANNER IMAGE:
  imageSrc: defaultBannerImg,

  // 3. ALT TEXT:
  altText: "EASA College of Engineering and Technology Announcement",

  // 4. CLICK DESTINATION LINK (leave '#' if not linking anywhere):
  linkUrl: "#",

  // 5. OPEN LINK IN NEW TAB?
  openInNewTab: false,

  // 6. FREQUENCY: 'always' (every load) or 'once' (once per session)
  frequency: "always",

  // 7. DELAY BEFORE SHOWING (ms):
  delayMs: 300,

  // 8. SHOW TOP-RIGHT 'X' CLOSE BUTTON:
  // true = show 'X' button | false = hide 'X' button (100% pure image)
  showCloseButton: true,

  // 9. SHOW BOTTOM "CLOSE" BAR:
  // false = image only with no bottom bar | true = show footer bar with close button
  showBottomBar: false,

  // 10. FULL IMAGE PRESENTATION SIZE:
  maxWidth: "min(92vw, 1100px)",
  maxHeight: "86vh",
};

const BannerPopup = (props) => {
  const isEnabled = props.isEnabled ?? POPUP_CONFIG.isEnabled;
  const imageSrc = props.imageSrc ?? POPUP_CONFIG.imageSrc;
  const altText = props.altText ?? POPUP_CONFIG.altText;
  const linkUrl = props.linkUrl ?? POPUP_CONFIG.linkUrl;
  const openInNewTab = props.openInNewTab ?? POPUP_CONFIG.openInNewTab;
  const frequency = props.frequency ?? POPUP_CONFIG.frequency;
  const delayMs = props.delayMs ?? POPUP_CONFIG.delayMs;
  const showCloseButton = props.showCloseButton ?? POPUP_CONFIG.showCloseButton;
  const showBottomBar = props.showBottomBar ?? POPUP_CONFIG.showBottomBar;
  const maxWidth = props.maxWidth ?? POPUP_CONFIG.maxWidth;
  const maxHeight = props.maxHeight ?? POPUP_CONFIG.maxHeight;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    if (frequency === 'once') {
      const hasShown = sessionStorage.getItem('easa_banner_popup_shown');
      if (hasShown) return;
    }
    const timer = setTimeout(() => {
      setIsOpen(true);
      if (frequency === 'once') {
        sessionStorage.setItem('easa_banner_popup_shown', 'true');
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [isEnabled, frequency, delayMs]);
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isEnabled || !isOpen) return null;

  const isClickable = Boolean(linkUrl && linkUrl !== '#' && linkUrl !== '');

  // Dynamic responsive viewport-aware constraints:
  const resolvedMaxWidth = maxWidth ? `min(calc(100vw - 28px), ${maxWidth})` : 'min(calc(100vw - 28px), 1100px)';
  const resolvedMaxHeight = maxHeight ? `min(calc(100dvh - 28px), ${maxHeight})` : 'min(calc(100dvh - 28px), 86vh)';

  return (
    <div
      aria-modal="true"
      role="dialog"
      aria-label={altText}
      onClick={() => setIsOpen(false)} // Clicking backdrop closes popup
      className="easa-popup-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(0, 0, 0, 0.78)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        touchAction: 'pan-y',
        animation: 'easaFadeIn 0.25s ease-out',
      }}
    >
      {/* Modal Card - hugs the image boundaries precisely */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent close on clicking modal card
        className="easa-popup-card"
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'fit-content',
          height: 'fit-content',
          maxWidth: resolvedMaxWidth,
          maxHeight: resolvedMaxHeight,
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          borderRadius: '20px',
          animation: 'easaScaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Top-Right Close Button ('×') - attached directly to the curved edge of the image */}
        {showCloseButton && (
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close popup"
            title="Close popup"
            className="easa-popup-close-btn"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 30,
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#ffffff',
              border: '2px solid rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              fontSize: '22px',
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
              transition: 'background-color 0.2s, transform 0.15s',
              touchAction: 'manipulation',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.92)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            &times;
          </button>
        )}

        {/* Banner Image Content - with curved rounded edges */}
        <div
          className="easa-popup-img-wrapper"
          style={{
            position: 'relative',
            lineHeight: 0,
            borderRadius: '20px',
            overflow: 'hidden',
            maxWidth: '100%',
            maxHeight: resolvedMaxHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.75)',
            boxSizing: 'border-box',
          }}
        >
          {isClickable ? (
            <a
              href={linkUrl}
              target={openInNewTab ? '_blank' : '_self'}
              rel={openInNewTab ? 'noopener noreferrer' : undefined}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                textDecoration: 'none',
                borderRadius: '20px',
                overflow: 'hidden',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            >
              <img
                src={imageSrc}
                alt={altText}
                className="easa-popup-img"
                style={{
                  display: 'block',
                  width: 'auto',
                  height: 'auto',
                  maxWidth: resolvedMaxWidth,
                  maxHeight: resolvedMaxHeight,
                  objectFit: 'contain',
                  borderRadius: '20px',
                  boxSizing: 'border-box',
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
              onClick={() => setIsOpen(false)}
              title="Click anywhere to close"
              className="easa-popup-img"
              style={{
                display: 'block',
                width: 'auto',
                height: 'auto',
                maxWidth: resolvedMaxWidth,
                maxHeight: resolvedMaxHeight,
                objectFit: 'contain',
                borderRadius: '20px',
                boxSizing: 'border-box',
                cursor: 'pointer',
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
              width: '100%',
              boxSizing: 'border-box',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
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

      {/* Embedded Animations & Responsive Rules */}
      <style>{`
        @keyframes easaFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes easaScaleUp {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 640px) {
          .easa-popup-overlay {
            padding: 12px !important;
          }
          .easa-popup-card {
            max-width: calc(100vw - 24px) !important;
            max-height: calc(100dvh - 24px) !important;
            border-radius: 16px !important;
          }
          .easa-popup-img-wrapper {
            border-radius: 16px !important;
            max-width: calc(100vw - 24px) !important;
            max-height: calc(100dvh - 24px) !important;
          }
          .easa-popup-img {
            max-width: calc(100vw - 24px) !important;
            max-height: calc(100dvh - 24px) !important;
            border-radius: 16px !important;
            object-fit: contain !important;
          }
          .easa-popup-close-btn {
            top: 8px !important;
            right: 8px !important;
            width: 34px !important;
            height: 34px !important;
            font-size: 19px !important;
            background-color: rgba(0, 0, 0, 0.75) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BannerPopup;

