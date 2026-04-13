import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaFileAlt, FaWhatsapp } from 'react-icons/fa';
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
            const isMobile = window.innerWidth <= 768;
            const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/login';

            if (isMobile || isAdmin) {
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
                            <a href="tel:+918220008082" className="number-link">Admission: +91 82200 08082</a>
                            <a href="tel:+917373722922" className="number-link">Office: +91 73737 22922</a>
                            <a href="tel:+914224050500" className="number-link">Landline: 0422 4050500</a>
                            <a href="tel:+918098000000" className="number-link">Enquiry: +91 80980 00000</a>
                        </div>
                        <div className="sidebar-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                            <FaPhoneAlt />
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <a href="https://wa.me/918220008082" target="_blank" rel="noreferrer" className="sidebar-link">
                        <span className="sidebar-label">WhatsApp</span>
                        <div className="sidebar-icon" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                            <FaWhatsapp />
                        </div>
                    </a>

                    {/* Email */}
                    <a href="mailto:info@easacollege.ac.in" className="sidebar-link">
                        <span className="sidebar-label">Send Email</span>
                        <div className="sidebar-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                            <FaEnvelope />
                        </div>
                    </a>
                </div>

                {/* Vertical Tabs Section */}
                <div className="vertical-tabs-container">
                    <button
                        onClick={() => setShowAdmissionForm(true)}
                        className="vertical-tab admission-tab"
                        style={{ cursor: 'pointer', border: 'none', textAlign: 'center' }}
                    >
                        Apply Online
                    </button>
                    <button
                        onClick={() => setShowEnquiryForm(true)}
                        className="vertical-tab enquiry-tab"
                        style={{ cursor: 'pointer', border: 'none', textAlign: 'center' }}
                    >
                        Enquire Now
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
                    align-items: flex-end; /* Align contents to the right */
                    gap: 1.5rem; /* Gap between icons block and tabs block */
                    z-index: 99999;
                    pointer-events: none; /* Let clicks pass through empty areas */
                }

                .sidebar-contact-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    padding-right: 20px; /* Floating effect for icons */
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
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.2rem;
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
                    right: 60px; /* Position to the left of the icon */
                    background: rgba(15, 23, 42, 0.9);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
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
                    right: 60px;
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
                    font-size: 0.9rem;
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

                .vertical-tabs-container {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    pointer-events: auto;
                }

                .vertical-tab {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                    transform: rotate(180deg);
                    padding: 1.5rem 0.6rem;
                    color: white;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: -4px 4px 15px rgba(0,0,0,0.2);
                    border-radius: 0 4px 4px 0;
                    border: 1px solid rgba(255,255,255,0.1);
                    font-family: inherit;
                }

                .admission-tab {
                    background: #3b0764;
                    background: linear-gradient(to top, #3b0764, #581c87);
                }

                .enquiry-tab {
                    background: #c2410c;
                    background: linear-gradient(to top, #ea580c, #c2410c);
                }

                .fees-tab {
                    background: #1e3a8a;
                    background: linear-gradient(to top, #1e3a8a, #1d4ed8);
                }

                .vertical-tab:hover {
                    padding-bottom: 2rem;
                    padding-top: 2rem;
                    width: 45px;
                }

                @media (max-width: 768px) {
                    .right-side-bar {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
};

export default StickyContactBar;
