import SEO from '../components/SEO'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { HeroCarousel } from '../components/HeroCarousel'
import AboutSection from '../components/AboutSection'
import ProgramsSection from '../components/ProgramsSection'
// Renamed from LifeAtEASA.jsx
import LifeAtEASASection from '../components/LifeAtEASASection'
import ManagementSection from '../components/ManagementSection'
import PlacementSection from '../components/PlacementSection'
import GalleryCarousel from '../components/GalleryCarousel'
import FacultyStats from '../components/FacultyStats'
// import NewsEvents from '../components/NewsEvents'
import AdmissionCTA from '../components/AdmissionCTA'
import Footer from '../components/Footer'
import AdmissionForm from '../components/AdmissionForm'
import useScrollAnimation from '../hooks/useScrollAnimation'
import NewsEventsSection from '../components/NewsEventsSection'
import AdviceSection from '../components/AdviceSection'

function Home() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.openAdmission) {
            setShowAdmissionForm(true);
            // Optional: Clear state so it doesn't reopen on refresh? 
            // window.history.replaceState({}, document.title)
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
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    )
}

export default Home
