import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const InstagramFeedWidget = ({ embedId = "25719657" }) => {
    const { theme } = useTheme();

    useEffect(() => {
        const scriptSrc = "https://widgets.sociablekit.com/instagram-feed/widget.js";

        // Re-inject script on mount to guarantee widget initialization
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);

        // Continuous observer to immediately strip SociableKIT watermark links and promo lines
        const removeSociableKitBranding = () => {
            const promoLinks = document.querySelectorAll(`
                a[href*="sociablekit.com"],
                .sk-branding,
                .sk_branding,
                .sk-creator,
                .sk-watermark,
                .sk-promotion,
                .sk-ig-attribution,
                .sk_ig_attribution,
                .sk-attribution,
                .sk-ig-powered-by,
                .sk-ig-link,
                div:has(> a[href*="sociablekit.com"]),
                div:has(> p > a[href*="sociablekit.com"])
            `);
            promoLinks.forEach(el => el.remove());

            // Check for any remaining element by innerText
            const allElements = document.querySelectorAll('.sk-instagram-feed a, .sk-instagram-feed p, .sk-instagram-feed div, .sk-instagram-feed span');
            allElements.forEach(el => {
                if (el.innerText && (
                    el.innerText.includes("Embed Instagram Feed on your website with SociableKIT") ||
                    el.innerText.includes("SociableKIT") ||
                    el.innerText.includes("Free Instagram Feed Widget")
                )) {
                    el.remove();
                }
            });
        };

        const observer = new MutationObserver(() => {
            removeSociableKitBranding();
        });

        observer.observe(document.body, { childList: true, subtree: true });
        const interval = setInterval(removeSociableKitBranding, 400);

        return () => {
            observer.disconnect();
            clearInterval(interval);
            const s = document.querySelector(`script[src="${scriptSrc}"]`);
            if (s) {
                s.remove();
            }
        };
    }, [embedId]);

    return (
        <div className={`sociablekit-themed-feed-container ${theme === 'dark' ? 'feed-dark-theme' : 'feed-light-theme'}`}>
            <div className="sk-instagram-feed" data-embed-id={embedId}></div>

            <style>{`
                /* Container Background & Theme Styling */
                .sociablekit-themed-feed-container {
                    width: 100%;
                    min-height: 480px;
                    border-radius: 20px;
                    padding: 2rem 1.5rem;
                    box-sizing: border-box;
                    transition: all 0.3s ease;
                }

                .sociablekit-themed-feed-container.feed-dark-theme {
                    background: var(--bg-card, #0F172A);
                    border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.1));
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
                }

                .sociablekit-themed-feed-container.feed-light-theme {
                    background: #FFFFFF;
                    border: 1px solid rgba(226, 232, 240, 0.9);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                }

                /* HIDE ALL SOCIABLEKIT BRANDING & PROMO LINKS */
                .sk-branding,
                .sk_branding,
                .sk-creator,
                .sk-watermark,
                .sk-promotion,
                .sk-ig-attribution,
                .sk_ig_attribution,
                .sk-attribution,
                .sk-ig-powered-by,
                .sk-ig-link,
                a[href*="sociablekit.com"],
                div[class*="sk_branding"],
                div[class*="branding"],
                div:has(> a[href*="sociablekit.com"]),
                .sk-instagram-feed a[href*="sociablekit.com"],
                .sk-ig-bottom-btn[href*="sociablekit.com"] {
                    display: none !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    pointer-events: none !important;
                    height: 0 !important;
                    width: 0 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    position: absolute !important;
                    overflow: hidden !important;
                }

                /* Adaptive Feed Styles */
                .sk-instagram-feed {
                    background: transparent !important;
                }

                .feed-dark-theme .sk-instagram-feed,
                .feed-dark-theme .sk-instagram-feed * {
                    color: #E2E8F0 !important;
                }

                .feed-light-theme .sk-instagram-feed,
                .feed-light-theme .sk-instagram-feed * {
                    color: #1E293B !important;
                }

                .feed-dark-theme .sk-instagram-feed .sk-ig-post,
                .feed-dark-theme .sk-instagram-feed [class*="post-item"] {
                    background: rgba(15, 23, 42, 0.8) !important;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                }

                .feed-light-theme .sk-instagram-feed .sk-ig-post,
                .feed-light-theme .sk-instagram-feed [class*="post-item"] {
                    background: #FFFFFF !important;
                    border: 1px solid rgba(226, 232, 240, 0.8) !important;
                }

                /* Modals / Lightboxes */
                .feed-dark-theme .sk-ig-modal .modal-content,
                .feed-dark-theme .sk_instagram_feed_modal .modal-content {
                    background: #0F172A !important;
                    color: #F1F5F9 !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                }

                .feed-light-theme .sk-ig-modal .modal-content,
                .feed-light-theme .sk_instagram_feed_modal .modal-content {
                    background: #FFFFFF !important;
                    color: #0F172A !important;
                    border: 1px solid rgba(226, 232, 240, 0.9) !important;
                }
            `}</style>
        </div>
    );
};

export default InstagramFeedWidget;
