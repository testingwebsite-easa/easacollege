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
                    <a href="https://wa.me/918220008082" target="_blank" rel="noreferrer" className="sidebar-link" aria-label="Contact via WhatsApp">
                        <span className="sidebar-label">WhatsApp</span>
                        <div className="sidebar-icon" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                            <FaWhatsapp />
                        </div>
                    </a>

                    {/* Email */}
                    <a href="mailto:info@easacollege.ac.in" className="sidebar-link" aria-label="Send Email">
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
                        <span className="tab-text">Admission</span>
                    </button>
                    <button
                        onClick={() => setShowEnquiryForm(true)}
                        className="side-tab-btn enquiry-tab"
                        aria-label="Enquire Now"
                    >
                        <span className="tab-yellow-accent"></span>
                        <span className="tab-text">Enquire Now</span>
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

                /* Side Tab Buttons matching image style (Compact size) */
                .vertical-tabs-container {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    pointer-events: auto;
                }

                .side-tab-btn {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    color: #ffffff;
                    border: none;
                    border-radius: 6px 0 0 6px;
                    padding: 0;
                    cursor: pointer;
                    overflow: hidden;
                    box-shadow: -4px 4px 15px rgba(0, 0, 0, 0.4);
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    margin-right: 0;
                }

                .admission-tab {
                    background: linear-gradient(180deg, #1e1b4b 0%, #030712 100%) !important;
                }

                .admission-tab:hover {
                    transform: translateX(-5px);
                    background: linear-gradient(180deg, #2e1065 0%, #1e1b4b 100%) !important;
                    box-shadow: -6px 6px 20px rgba(0, 0, 0, 0.5);
                }

                .enquiry-tab {
                    background: linear-gradient(180deg, #c2410c 0%, #7c2d12 100%) !important;
                }

                .enquiry-tab:hover {
                    transform: translateX(-5px);
                    background: linear-gradient(180deg, #ea580c 0%, #c2410c 100%) !important;
                    box-shadow: -6px 6px 20px rgba(0, 0, 0, 0.5);
                }

                .tab-yellow-accent {
                    width: 4px;
                    align-self: stretch;
                    background: #FCCA26;
                    box-shadow: 0 0 8px rgba(252, 202, 38, 0.7);
                    flex-shrink: 0;
                }

                .side-tab-btn:hover .tab-yellow-accent {
                    background: #FFE066;
                    box-shadow: 0 0 12px rgba(252, 202, 38, 1);
                }

                .tab-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                    padding: 0.8rem 0.38rem;
                    color: #ffffff;
                    font-weight: 800;
                    font-size: 0.75rem;
                    letter-spacing: 0.8px;
                    text-transform: uppercase;
                    white-space: nowrap;
                    font-family: inherit;
                    user-select: none;
                }

                @media (max-width: 768px) {
                    .sidebar-contact-container {
                        display: none;
                    }
                    .right-side-bar {
                        top: 55%;
                    }
                    .tab-text {
                        padding: 0.6rem 0.3rem;
                        font-size: 0.65rem;
                        letter-spacing: 0.5px;
                    }
                    .tab-yellow-accent {
                        width: 3px;
                    }
                }
            `}</style>
        </>
    );
}
export default StickyContactBar;
