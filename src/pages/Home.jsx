import React, { useState, useEffect, lazy, Suspense } from 'react'
import SEO from '../components/SEO'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { HeroCarousel } from '../components/HeroCarousel'
import { HeroQuickStats } from '../components/HeroQuickStats'
import { LuxuryMarquee } from '../components/LuxuryMarquee'
import AboutSection from '../components/AboutSection'
import { AccreditationsBar } from '../components/AccreditationsBar'
import Footer from '../components/Footer'
import useScrollAnimation from '../hooks/useScrollAnimation'

const ProgramsSection = lazy(() => import('../components/ProgramsSection'))
const PlacementSection = lazy(() => import('../components/PlacementSection'))
const ForeignLanguageSection = lazy(() => import('../components/ForeignLanguageSection'))
const NewsEventsSection = lazy(() => import('../components/NewsEventsSection'))
const HomeGalleryButton = lazy(() => import('../components/HomeGalleryButton'))
const ManagementSection = lazy(() => import('../components/ManagementSection'))
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
            <HeroQuickStats />
            <LuxuryMarquee />
            <AboutSection />
            <AccreditationsBar />

            <Suspense fallback={<div style={{ minHeight: '100px' }} />}>
                <PlacementSection />
                <ForeignLanguageSection />
                <NewsEventsSection />
                <HomeGalleryButton />
                <ProgramsSection />
                <ManagementSection isStatic={true} />
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
