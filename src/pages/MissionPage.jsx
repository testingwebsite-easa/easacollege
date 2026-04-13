import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MissionVision from '../components/MissionVision';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';

function MissionPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Vision & Mission | EASA College" description="Learn about the vision and mission of EASA College of Engineering and Technology, our core values, and our commitment to excellence." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="vision-mission"
                defaultTitle="Vision & Mission"
                defaultSubtitle="Foundation of our excellence. Roadmap to your future."
            />

            <div style={{ position: 'relative', zIndex: 10, marginTop: '-4rem' }}>
                <MissionVision />
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
}

export default MissionPage;
