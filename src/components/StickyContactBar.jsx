import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaFileAlt, FaWhatsapp, FaGraduationCap, FaCommentDots } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import AdmissionForm from './AdmissionForm';
import EnquiryForm from './EnquiryForm';

const StickyContactBar = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [showEnquiryForm, setShowEnquiryForm] = useState(false);

    useEffect(() => {
        const checkVisibility = () => {
            const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/login';

            if (isAdmin) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        // Check on mount and location change
        checkVisibility();

        // Check on resize
        window.addEventListener('resize', checkVisibility);
        return () => window.removeEventListener('resize', checkVisibility);
    }, [location]);

    if (!isVisible) return null;

    return (
        <>
            <div className="right-side-bar">
                {/* Icons Section */}
                <div className="sidebar-contact-container">
                    {/* Call (Hover for more) */}
                    <div className="sidebar-item">
                        <div className="sidebar-numbers">
                            <a href="tel:+917373732569" className="number-link">Admission: +91 73737 32569</a>
                            <a href="tel: +919342628013" className="number-link">Office: +91 9342628013</a>
                            {/* <a href="tel:+914224050500" className="number-link">Landline: 0422 4050500</a> */}
                            <a href="tel:+917373732569" className="number-link">Enquiry: +91 7373732569</a>
                        </div>
                        <div className="sidebar-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                            <FaPhoneAlt />
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <a href="https://wa.me/917373732569" target="_blank" rel="noreferrer" className="sidebar-link" aria-label="Contact via WhatsApp">
                        <span className="sidebar-label">WhatsApp</span>
                        <div className="sidebar-icon" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                            <FaWhatsapp />
                        </div>
                    </a>

                    {/* Email */}
                    <a href="mailto:info@ecetonline.ac.in" className="sidebar-link" aria-label="Send Email">
                        <span className="sidebar-label">Send Email</span>
                        <div className="sidebar-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                            <FaEnvelope />
                        </div>
                    </a>
                </div>

                {/* Right Side Vertical Buttons Section */}
                <div className="vertical-tabs-container">
                    <button
                        onClick={() => setShowAdmissionForm(true)}
                        className="side-tab-btn admission-tab"
                        aria-label="Admission"
                    >
                        <span className="tab-yellow-accent"></span>
                        <div className="tab-content">
                            <FaGraduationCap className="tab-micro-icon" />
                            <span className="tab-text">Admission</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setShowEnquiryForm(true)}
                        className="side-tab-btn enquiry-tab"
                        aria-label="Enquire Now"
                    >
                        <span className="tab-yellow-accent"></span>
                        <div className="tab-content">
                            <FaCommentDots className="tab-micro-icon" />
                            <span className="tab-text">Enquire Now</span>
                        </div>
                    </button>
                </div>
            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <EnquiryForm isOpen={showEnquiryForm} onClose={() => setShowEnquiryForm(false)} />

            <style>{`
                .right-side-bar {
                    position: fixed;
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 1.2rem;
                    z-index: 99999;
                    pointer-events: none;
                }

                .sidebar-contact-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding-right: 15px;
                    pointer-events: auto;
                }
                .sidebar-link {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    text-decoration: none;
                    position: relative;
                }
                .sidebar-icon {
                    width: 46px;
                    height: 46px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.1rem;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                    z-index: 2;
                }
                .sidebar-link:hover .sidebar-icon {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
                }
                .sidebar-label {
                    position: absolute;
                    right: 56px;
                    background: rgba(15, 23, 42, 0.9);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 500;
                    white-space: nowrap;
                    opacity: 0;
                    transform: translateX(20px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .sidebar-link:hover .sidebar-label {
                    opacity: 1;
                    transform: translateX(0);
                }

                .sidebar-item {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    position: relative;
                    cursor: pointer;
                }

                .sidebar-item:hover .sidebar-icon {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
                }

                /* Numbers Popup for Call */
                .sidebar-numbers {
                    position: absolute;
                    right: 56px;
                    background: rgba(15, 23, 42, 0.95);
                    padding: 0.5rem;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    opacity: 0;
                    transform: translateX(20px);
                    visibility: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid rgba(255,255,255,0.1);
                    min-width: 160px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                }

                .sidebar-item:hover .sidebar-numbers {
                    opacity: 1;
                    transform: translateX(0);
                    visibility: visible;
                }

                .number-link {
                    color: white;
                    text-decoration: none;
                    font-size: 0.85rem;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    transition: background 0.2s;
                    white-space: nowrap;
                    display: block;
                    text-align: right;
                }

                .number-link:hover {
                    background: rgba(255,255,255,0.1);
                    color: #fff;
                }

                /* Side Tab Buttons - Premium & Impressive Design */
                .vertical-tabs-container {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    pointer-events: auto;
                }

                .side-tab-btn {
                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    color: #ffffff;
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    border-right: none;
                    border-radius: 8px 0 0 8px;
                    padding: 0;
                    cursor: pointer;
                    overflow: hidden;
                    box-shadow: -4px 6px 16px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15);
                    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
                    position: relative;
                    margin-right: 0;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    touch-action: manipulation;
                    -webkit-tap-highlight-color: transparent;
                }

                /* Subtle Shimmer Light Sweep */
                .side-tab-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        180deg,
                        transparent 0%,
                        rgba(255, 255, 255, 0.25) 50%,
                        transparent 100%
                    );
                    transform: translateY(-110%);
                    animation: tabShimmer 4.5s ease-in-out infinite;
                    pointer-events: none;
                }

                @keyframes tabShimmer {
                    0%, 75% { transform: translateY(-110%); opacity: 0; }
                    80% { opacity: 1; }
                    95% { transform: translateY(110%); opacity: 1; }
                    96%, 100% { transform: translateY(110%); opacity: 0; }
                }

                .admission-tab {
                    background: linear-gradient(160deg, #1e1b4b 0%, #0f172a 75%, #020617 100%) !important;
                    border-color: rgba(129, 140, 248, 0.35) !important;
                }

                .admission-tab:hover {
                    transform: translateX(-5px);
                    background: linear-gradient(160deg, #312e81 0%, #1e1b4b 75%, #0f172a 100%) !important;
                    border-color: rgba(165, 180, 252, 0.6) !important;
                    box-shadow: -6px 8px 24px rgba(30, 27, 75, 0.6), 0 0 12px rgba(99, 102, 241, 0.35) !important;
                }

                .enquiry-tab {
                    background: linear-gradient(160deg, #ea580c 0%, #c2410c 65%, #7c2d12 100%) !important;
                    border-color: rgba(253, 186, 116, 0.4) !important;
                }

                .enquiry-tab:hover {
                    transform: translateX(-5px);
                    background: linear-gradient(160deg, #f97316 0%, #ea580c 65%, #9a3412 100%) !important;
                    border-color: rgba(254, 215, 170, 0.75) !important;
                    box-shadow: -6px 8px 24px rgba(194, 65, 12, 0.6), 0 0 12px rgba(249, 115, 22, 0.4) !important;
                }

                .tab-yellow-accent {
                    width: 3.5px;
                    align-self: stretch;
                    background: linear-gradient(180deg, #FEF08A 0%, #FBBF24 50%, #D97706 100%);
                    box-shadow: 0 0 8px rgba(251, 191, 36, 0.65);
                    flex-shrink: 0;
                    transition: all 0.25s ease;
                }

                .side-tab-btn:hover .tab-yellow-accent {
                    background: linear-gradient(180deg, #FFFFFF 0%, #FDE047 50%, #F59E0B 100%);
                    box-shadow: 0 0 12px rgba(251, 191, 36, 1);
                }

                .tab-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    padding: 0.65rem 0.32rem;
                }

                .tab-micro-icon {
                    font-size: 0.72rem;
                    color: #FDE047;
                    filter: drop-shadow(0 0 4px rgba(253, 224, 71, 0.6));
                    flex-shrink: 0;
                    transition: transform 0.25s ease;
                }

                .side-tab-btn:hover .tab-micro-icon {
                    transform: scale(1.15);
                }

                .tab-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                    color: #ffffff;
                    font-weight: 800;
                    font-size: 0.72rem;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    white-space: nowrap;
                    font-family: inherit;
                    user-select: none;
                    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                }

                /* Mobile View - Small, Unobtrusive & Highly Impressive */
                @media (max-width: 768px) {
                    .sidebar-contact-container {
                        display: none;
                    }
                    .right-side-bar {
                        top: 50%;
                        gap: 5px;
                        right: 0;
                    }
                    .vertical-tabs-container {
                        gap: 5px;
                    }
                    .side-tab-btn {
                        border-radius: 6px 0 0 6px;
                        border-width: 1px;
                        box-shadow: -3px 4px 10px rgba(0, 0, 0, 0.35);
                    }
                    /* Generous touch target area without visual bulk */
                    .side-tab-btn::before {
                        content: '';
                        position: absolute;
                        inset: -6px -12px -6px -10px;
                    }
                    .tab-yellow-accent {
                        width: 2px;
                        box-shadow: 0 0 5px rgba(251, 191, 36, 0.7);
                    }
                    .tab-content {
                        gap: 3px;
                        padding: 0.35rem 0.15rem;
                    }
                    .tab-micro-icon {
                        font-size: 0.52rem;
                        filter: drop-shadow(0 0 3px rgba(253, 224, 71, 0.6));
                    }
                    .tab-text {
                        font-size: 0.52rem;
                        letter-spacing: 0.35px;
                        font-weight: 700;
                    }
                    .side-tab-btn:active {
                        transform: scale(0.95) translateX(-2px);
                    }
                }
            `}</style>
        </>
    );
}
export default StickyContactBar;
