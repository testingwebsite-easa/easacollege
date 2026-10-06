import React, { useEffect } from 'react';

const InstagramFeedWidget = ({ embedId = "25719657" }) => {
    useEffect(() => {
        const scriptSrc = "https://widgets.sociablekit.com/instagram-feed/widget.js";

        // Ensure SociableKIT widget script executes for newly mounted DOM element
        const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
        if (existingScript) {
            existingScript.remove();
        }

        const script = document.createElement('script');
        script.src = scriptSrc;
        script.defer = true;
        script.async = true;
        document.body.appendChild(script);

        // MutationObserver to remove SociableKIT promotional / branding attribution text & profile header
        const removeBranding = () => {
            // 1. Remove branding / watermark elements
            const brandingElements = document.querySelectorAll(`
                a[href*="sociablekit.com"],
                .sk-branding,
                .sk_branding,
                .sk-creator,
                .sk-watermark,
                .sk-promotion,
                .sk-ig-attribution,
                .sk_ig_attribution,
                .sk-attribution,
                .sk-ig-powered-by
            `);
            brandingElements.forEach(el => {
                el.remove();
            });

            // 2. Remove profile heading (avatar, username, bio, header banner)
            const headerElements = document.querySelectorAll(`
                .sk-instagram-feed .sk-ig-user-profile,
                .sk_ig_user_profile,
                .sk-instagram-feed [class*="user-profile"],
                .sk-instagram-feed [class*="profile-header"],
                .sk-instagram-feed [class*="user_profile"],
                .sk-instagram-feed .sk-ig-header,
                .sk-instagram-feed .sk-ig-profile,
                .sk-instagram-feed [class*="sk-ig-user"],
                .sk-instagram-feed [class*="sk_ig_user"],
                .sk-instagram-feed [class*="sk-ig-profile"],
                .sk-instagram-feed [class*="sk_ig_profile"],
                .sk-instagram-feed [class*="profile_container"]
            `);
            headerElements.forEach(el => {
                // Ensure we do not remove modal dialog content
                if (!el.closest('.modal-content') && !el.closest('.sk-ig-modal') && !el.closest('[class*="modal"]')) {
                    el.remove();
                }
            });

            // 3. Find any remaining profile header container by content
            const usernameNodes = document.querySelectorAll('.sk-instagram-feed h1, .sk-instagram-feed h2, .sk-instagram-feed h3, .sk-instagram-feed h4, .sk-instagram-feed strong, .sk-instagram-feed span, .sk-instagram-feed a');
            usernameNodes.forEach(node => {
                if (node.innerText && node.innerText.trim() === '@easacollege') {
                    if (!node.closest('.modal-content') && !node.closest('.sk-ig-modal') && !node.closest('[class*="modal"]')) {
                        const parentHeader = node.closest('.sk-ig-user-profile') || node.closest('[class*="profile"]') || node.closest('[class*="header"]') || node.parentElement?.parentElement;
                        if (parentHeader && !parentHeader.classList.contains('sk-instagram-feed') && !parentHeader.classList.contains('sociablekit-themed-wrapper')) {
                            parentHeader.remove();
                        }
                    }
                }
            });
        };

        const observer = new MutationObserver(() => {
            removeBranding();
        });

        observer.observe(document.body, { childList: true, subtree: true });
        const interval = setInterval(removeBranding, 500);

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
        <div className="sociablekit-themed-wrapper">
            <div className="sk-instagram-feed" data-embed-id={embedId}></div>

            <style>{`
                /* =========================================================
                   1. MAIN FEED CONTAINER & BACKGROUND THEME
                   ========================================================= */
                .sociablekit-themed-wrapper {
                    width: 100%;
                    min-height: 520px;
                    margin: 1.5rem 0 3rem;
                    background: linear-gradient(180deg, #0B1120 0%, #0F172A 50%, #1E293B 100%) !important;
                    border: 1px solid rgba(253, 188, 18, 0.22) !important;
                    border-radius: 24px;
                    padding: 2rem 1.75rem;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
                    box-sizing: border-box;
                    position: relative;
                }

                /* HIDE SOCIABLEKIT PROMOTIONAL BRANDING FOOTER */
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

                /* Dark Theme Overrides for SociableKIT feed container & children */
                .sk-instagram-feed,
                .sk_instagram_feed_container,
                .sk_ig_feed_container,
                [class*="sk_instagram_feed"] {
                    background: transparent !important;
                    color: #E2E8F0 !important;
                    font-family: inherit !important;
                }

                .sk-instagram-feed * {
                    box-sizing: border-box;
                }

                /* HIDE FEED PROFILE HEADING BANNER COMPLETELY */
                .sk-instagram-feed .sk-ig-user-profile,
                .sk_ig_user_profile,
                .sk-instagram-feed [class*="user-profile"],
                .sk-instagram-feed [class*="profile-header"],
                .sk-instagram-feed [class*="user_profile"],
                .sk-instagram-feed .sk-ig-header,
                .sk-instagram-feed .sk-ig-profile,
                .sk-instagram-feed [class*="feed-header"],
                .sk-instagram-feed [class*="feed_header"] {
                    display: none !important;
                    opacity: 0 !important;
                    visibility: hidden !important;
                    height: 0 !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow: hidden !important;
                }

                .sk-instagram-feed a,
                .sk-instagram-feed [class*="website"] {
                    color: #FDBC12 !important;
                    font-weight: 600 !important;
                }

                /* Follow button */
                .sk-instagram-feed .sk-ig-follow-btn,
                .sk-instagram-feed button[class*="follow"],
                .sk-instagram-feed a[class*="follow"],
                .sk-instagram-feed [class*="sk-ig-follow"] {
                    background: linear-gradient(135deg, #2e2d78 0%, #1B2A6B 100%) !important;
                    color: #FDBC12 !important;
                    border: 1px solid rgba(253, 188, 18, 0.4) !important;
                    border-radius: 50px !important;
                    padding: 9px 24px !important;
                    font-weight: 800 !important;
                    box-shadow: 0 6px 18px rgba(46, 45, 120, 0.5) !important;
                    text-decoration: none !important;
                    transition: all 0.25s ease !important;
                }

                .sk-instagram-feed .sk-ig-follow-btn:hover,
                .sk-instagram-feed button[class*="follow"]:hover,
                .sk-instagram-feed a[class*="follow"]:hover {
                    background: linear-gradient(135deg, #373591 0%, #243585 100%) !important;
                    color: #FFFFFF !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 8px 24px rgba(253, 188, 18, 0.35) !important;
                }

                /* Post cards and borders in grid */
                .sk-instagram-feed .sk-ig-post,
                .sk-instagram-feed .sk_instagram_post,
                .sk-instagram-feed .sk-ig-post-item,
                .sk-instagram-feed [class*="post-item"],
                .sk-instagram-feed [class*="post_item"] {
                    background: rgba(15, 23, 42, 0.9) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 18px !important;
                    overflow: hidden !important;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4) !important;
                    cursor: pointer !important;
                    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease !important;
                }

                .sk-instagram-feed .sk-ig-post:hover,
                .sk-instagram-feed .sk_instagram_post:hover,
                .sk-instagram-feed [class*="post-item"]:hover {
                    transform: translateY(-6px) scale(1.02) !important;
                    border-color: rgba(253, 188, 18, 0.5) !important;
                    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7), 0 0 20px rgba(253, 188, 18, 0.25) !important;
                }

                /* Load more button / bottom bar */
                .sk-instagram-feed .sk-ig-load-more-btn,
                .sk-instagram-feed .sk-ig-bottom-btn,
                .sk-instagram-feed button[class*="load-more"],
                .sk-instagram-feed [class*="load_more"] {
                    background: linear-gradient(135deg, #2e2d78 0%, #1B2A6B 100%) !important;
                    color: #FDBC12 !important;
                    border: 1px solid rgba(253, 188, 18, 0.4) !important;
                    border-radius: 50px !important;
                    padding: 12px 34px !important;
                    font-size: 0.95rem !important;
                    font-weight: 800 !important;
                    cursor: pointer !important;
                    box-shadow: 0 8px 24px rgba(46, 45, 120, 0.4) !important;
                    transition: all 0.25s ease !important;
                }

                .sk-instagram-feed .sk-ig-load-more-btn:hover {
                    background: #1B2A6B !important;
                    transform: translateY(-2px) scale(1.03) !important;
                    box-shadow: 0 12px 30px rgba(253, 188, 18, 0.3) !important;
                    color: #FFFFFF !important;
                }

                /* =========================================================
                   2. POPUP / LIGHTBOX MODAL: 3/4 SCREEN & THEMED
                   ========================================================= */

                /* Modal Backdrop */
                .modal-backdrop.in,
                .modal-backdrop.show,
                .sk-ig-modal-backdrop {
                    background: rgba(3, 7, 18, 0.88) !important;
                    backdrop-filter: blur(12px) !important;
                    opacity: 1 !important;
                }

                /* Modal Dialog - 3/4 Screen Dimensions */
                .sk-ig-modal .modal-dialog,
                .sk_instagram_feed_modal .modal-dialog,
                .sk-ig-modal-dialog {
                    width: 75vw !important;
                    max-width: 1200px !important;
                    min-width: 320px !important;
                    margin: 30px auto !important;
                }

                /* Modal Content Card */
                .sk-ig-modal .modal-content,
                .sk_instagram_feed_modal .modal-content,
                .sk-ig-modal-content {
                    background: #0F172A !important;
                    border: 1px solid rgba(253, 188, 18, 0.35) !important;
                    border-radius: 22px !important;
                    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.95), 0 0 40px rgba(46, 45, 120, 0.4) !important;
                    overflow: hidden !important;
                    color: #F1F5F9 !important;
                }

                /* Modal Media & Image Holder (Left Side) */
                .sk-ig-modal-image-holder,
                .sk-ig-modal .modal-content [class*="image-holder"],
                .sk-ig-modal .modal-content [class*="modal-left"],
                .sk-ig-modal .modal-content [class*="modal-media"] {
                    background: #030712 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }

                .sk-ig-modal .modal-content img,
                .sk-ig-modal .modal-content video {
                    max-height: 75vh !important;
                    object-fit: contain !important;
                    background: #030712 !important;
                }

                /* Modal Details (Right Side) */
                .sk-ig-modal-content-details,
                .sk-ig-modal .modal-content [class*="content-details"],
                .sk-ig-modal .modal-content [class*="modal-right"],
                .sk-ig-modal .modal-content [class*="modal-details"] {
                    background: #0F172A !important;
                    color: #F1F5F9 !important;
                }

                /* Modal User Info & Header */
                .sk-ig-modal .modal-content strong,
                .sk-ig-modal .modal-content h4,
                .sk-ig-modal .modal-content [class*="username"] {
                    color: #FFFFFF !important;
                    font-weight: 800 !important;
                }

                .sk-ig-modal .modal-content [class*="date"],
                .sk-ig-modal .modal-content [class*="time"] {
                    color: #94A3B8 !important;
                }

                /* Caption Text */
                .sk-ig-modal .modal-content [class*="caption"],
                .sk-ig-modal .modal-content [class*="text"] {
                    color: #CBD5E1 !important;
                    line-height: 1.6 !important;
                }

                .sk-ig-modal .modal-content a {
                    color: #FDBC12 !important;
                    font-weight: 600 !important;
                }

                /* Controls & Navigation */
                .sk-ig-modal-close,
                .sk-ig-modal .close,
                .sk-ig-modal button[class*="close"] {
                    background: rgba(15, 23, 42, 0.9) !important;
                    color: #FFFFFF !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    border-radius: 50% !important;
                    opacity: 1 !important;
                    cursor: pointer !important;
                    transition: all 0.2s ease !important;
                }

                .sk-ig-modal-close:hover,
                .sk-ig-modal .close:hover {
                    background: #2e2d78 !important;
                    color: #FDBC12 !important;
                }

                .sk-ig-modal [class*="browse"],
                .sk-ig-modal [class*="nav"],
                .sk-ig-modal [class*="prev"],
                .sk-ig-modal [class*="next"] {
                    background: rgba(15, 23, 42, 0.95) !important;
                    color: #FFFFFF !important;
                    border: 1px solid rgba(253, 188, 18, 0.35) !important;
                    border-radius: 50px !important;
                }

                /* Mobile Sizing */
                @media (max-width: 768px) {
                    .sk-ig-modal .modal-dialog,
                    .sk_instagram_feed_modal .modal-dialog,
                    .sk-ig-modal-dialog {
                        width: 92vw !important;
                        margin: 15px auto !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default InstagramFeedWidget;
