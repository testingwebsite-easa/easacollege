import React, { useState, useEffect, lazy, Suspense } from 'react'
import SEO from '../components/SEO'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { HeroCarousel } from '../components/HeroCarousel'
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'
import useScrollAnimation from '../hooks/useScrollAnimation'

const ProgramsSection = lazy(() => import('../components/ProgramsSection'))
const PlacementSection = lazy(() => import('../components/PlacementSection'))
const GalleryCarousel = lazy(() => import('../components/GalleryCarousel'))
const NewsEventsSection = lazy(() => import('../components/NewsEventsSection'))
const FacultyStats = lazy(() => import('../components/FacultyStats'))
const LifeAtEASASection = lazy(() => import('../components/LifeAtEASASection'))
const AdviceSection = lazy(() => import('../components/AdviceSection'))
const ManagementSection = lazy(() => import('../components/ManagementSection'))
const AdmissionCTA = lazy(() => import('../components/AdmissionCTA'))
const AdmissionForm = lazy(() => import('../components/AdmissionForm'))

function Home() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.openAdmission) {
            setShowAdmissionForm(true);
        }
    }, [location]);

    return (
        <div className="home-page">
            <SEO
                title="Top Engineering College in Coimbatore"
                description="Discover a top-tier engineering education at EASA College. Explore our rigorous B.Tech and M.Tech programs, world-class faculty, and outstanding placement records. Apply now!"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />
            <HeroCarousel onApplyClick={() => setShowAdmissionForm(true)} />
            <AboutSection />
            
            <Suspense fallback={<div style={{ minHeight: '100px' }} />}>
                <ProgramsSection />
                <PlacementSection />
                <GalleryCarousel />
                <NewsEventsSection />
                <FacultyStats />
                <LifeAtEASASection />
                <AdviceSection />
                <ManagementSection isStatic={true} />
                <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
                <AdmissionForm
                    isOpen={showAdmissionForm}
                    onClose={() => setShowAdmissionForm(false)}
                />
            </Suspense>

            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    )
}

export default Home
