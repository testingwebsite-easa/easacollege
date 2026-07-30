import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../api';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';

function InfrastructurePage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/infrastructure`)
            .then(res => res.json())
            .then(data => {
                if (data && Object.keys(data).length > 0) setPageData(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="infrastructure-page" style={{ position: 'relative', overflowX: 'hidden', background: 'var(--bg-main)', color: 'var(--text-main)' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="infrastructure"
                defaultTitle={pageData?.title || "Infrastructure"}
                defaultSubtitle={pageData?.subtitle || "World-class facilities to support learning and growth."}
                defaultImage={pageData?.heroImage}
            />

            <div className="container" style={{ padding: '6rem 2rem' }}>
                <div style={{ background: 'var(--bg-card)', borderRadius: '40px', padding: '4rem', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                    {pageData ? (
                        <>
                            {/* Description */}
                            <div dangerouslySetInnerHTML={{ __html: pageData.description }} style={{ lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.15rem', whiteSpace: 'pre-wrap' }} />

                            {/* Facilities Grid */}
                            {pageData.facilities && pageData.facilities.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                                    {pageData.facilities.map((fac, idx) => (
                                        <div key={idx} style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--bg-section)', borderRadius: '32px', border: '1px solid var(--glass-border)', transition: 'all 0.3s ease' }}>
                                            {fac.image && (
                                                <div style={{ width: '100%', height: '220px', marginBottom: '1.5rem', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                                                    <img src={fac.image} alt={fac.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>{fac.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>{fac.desc || fac.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                            {/* Fallback Static Content */}
                            {[
                                { title: 'Smart Classrooms', desc: 'ICT enabled classrooms for interactive learning.' },
                                { title: 'Laboratories', desc: 'State-of-the-art labs with latest equipment.' },
                                { title: 'Central Library', desc: 'Vast collection of books, journals and digital resources.' },
                                { title: 'Auditorium', desc: 'Large seating capacity auditorium for events.' },
                                { title: 'Sports Complex', desc: 'Facilities for indoor and outdoor sports.' },
                                { title: 'Hostels', desc: 'Comfortable accommodation for boys and girls.' },
                            ].map((fac, idx) => (
                                <div key={idx} style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--bg-section)', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ width: '100%', height: '220px', background: 'var(--glass-highlight)', marginBottom: '1.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                    </div>
                                    <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>{fac.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>{fac.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer />
        </div >
    );
}

export default InfrastructurePage;
