import React, { useState } from 'react'
import API_BASE_URL from '../api'
import Navbar from '../components/Navbar'
import GlobalHero from '../components/GlobalHero'
import Footer from '../components/Footer'
import AdmissionCTA from '../components/AdmissionCTA'
import AdmissionForm from '../components/AdmissionForm'
import useScrollAnimation from '../hooks/useScrollAnimation'

function CommunityOutreachPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    const [pageData, setPageData] = useState(null);

    React.useEffect(() => {
        fetch(`${API_BASE_URL}/api/community-outreach`)
            .then(res => res.json())
            .then(data => {
                if (data && Object.keys(data).length > 0) setPageData(data);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="community-outreach-page" style={{ position: 'relative', overflowX: 'hidden' }}>
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="community-outreach"
                defaultTitle="Community Outreach"
                defaultSubtitle="Serving society effectively through education and engagement."
                defaultImage={pageData?.heroImage}
            />

            <div className="container" style={{ padding: '5rem 2rem' }}>
                <div className="glass-card" style={{ padding: '3rem' }}>
                    {pageData ? (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: pageData.description }} style={{ lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '3rem', whiteSpace: 'pre-wrap' }} />

                            {pageData.projects && pageData.projects.length > 0 && (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                                    {pageData.projects.map((project, idx) => (
                                        <div key={idx} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                                            {project.image && (
                                                <div style={{ width: '100%', height: '180px', marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden' }}>
                                                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </div>
                                            )}
                                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--primary)' }}>{project.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{project.desc || project.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <h2 className="text-gradient">NSS & Social Activities</h2>
                            <p style={{ marginTop: '1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                Our students actively participate in social service activities through NSS, YRC, and other clubs. We believe in giving back to the community and instilling social responsibility in our students.
                            </p>

                            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                                <div style={{ border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '1rem' }}>
                                    <h3 style={{ color: 'var(--primary)' }}>Village Adoption</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Adopting nearby villages for holistic development.</p>
                                </div>
                                <div style={{ border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '1rem' }}>
                                    <h3 style={{ color: 'var(--primary)' }}>Blood Donation</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Regular blood donation camps organized on campus.</p>
                                </div>
                                <div style={{ border: '1px solid var(--glass-border)', padding: '1.5rem', borderRadius: '1rem' }}>
                                    <h3 style={{ color: 'var(--primary)' }}>Awareness Camps</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Health and hygiene awareness programs.</p>
                                </div>
                            </div>
                        </>
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
    )
}

export default CommunityOutreachPage;
