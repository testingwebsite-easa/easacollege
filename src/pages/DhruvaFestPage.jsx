import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import LoadingBar from '../components/LoadingBar';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUniversity, FaArrowRight, FaPlay, FaPause } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// LightGallery Imports
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';


const EventGallery = ({ event }) => {
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const sliderRef1 = useRef(null);
    const sliderRef2 = useRef(null);

    // Flatten images for this event
    const items = [
        { image: event.image, title: event.title, desc: event.description },
        ...(event.images || []).map((img, i) => ({ image: img, title: event.title, desc: `Photo ${i + 1}` }))
    ];

    useEffect(() => {
        setNav1(sliderRef1.current);
        setNav2(sliderRef2.current);
    }, []);

    const togglePlay = () => {
        if (sliderRef1.current) {
            isPlaying ? sliderRef1.current.slickPause() : sliderRef1.current.slickPlay();
            setIsPlaying(!isPlaying);
        }
    };

    const mainSettings = {
        dots: false, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1,
        arrows: true, fade: true, asNavFor: nav2, autoplay: false, autoplaySpeed: 3000
    };

    const thumbSettings = {
        dots: false, infinite: true, speed: 500, slidesToShow: 4, slidesToScroll: 1,
        swipeToSlide: true, focusOnSelect: true, asNavFor: nav1, centerMode: true, arrows: false,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: 3 } }, { breakpoint: 480, settings: { slidesToShow: 2 } }]
    };

    return (
        <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--secondary)' }}>{event.title}</h3>
            <div className="gallery-wrapper" style={{ position: 'relative', background: 'var(--bg-card)', padding: '20px', borderRadius: '24px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <button onClick={togglePlay} style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 20, background: 'rgba(0,0,0,0.6)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} style={{ marginLeft: '2px' }} />}
                </button>

                <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} elementClassNames="lightgallery-slider-wrapper" selector=".gallery-clickable">
                    <Slider {...mainSettings} ref={sliderRef1}>
                        {items.map((item, index) => (
                            <div key={index} className="gallery-main-slide">
                                <div className="gallery-clickable" data-src={item.image} data-sub-html={`<h4>${item.title}</h4><p>${item.desc}</p>`} style={{ cursor: 'pointer', display: 'block' }}>
                                    <div style={{ position: 'relative', width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden' }}>
                                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', padding: '3rem 2rem 1.5rem', color: 'white', textAlign: 'left' }}>
                                            <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#ffeb3b', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{item.title}</h3>
                                            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </LightGallery>
            </div>

            {items.length > 1 && (
                <Slider {...thumbSettings} ref={sliderRef2} className="gallery-thumbs" style={{ marginTop: '1rem' }}>
                    {items.map((item, index) => (
                        <div key={index} style={{ padding: '0 8px' }}>
                            <div className="thumb-item" style={{ height: '80px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                                <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

const DhruvaFestPage = () => {
    const slug = 'fest';
    const navigate = useNavigate();
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const pageRes = await fetch(`${API_BASE_URL}/api/fest-page`);
                if (!pageRes.ok) throw new Error('Page not found');
                const pData = await pageRes.json();
                setPageData(pData);
                if (pData.events) setEvents(pData.events);
            } catch (err) {
                console.error(err);
                if (!pageData) setPageData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingBar />;

    if (!pageData) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Navbar />
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h1 style={{ fontSize: '4rem', fontWeight: '900' }}>404</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Page Not Found</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary">Return Home</button>
                </div>
                <Footer />
            </div>
        );
    }

    // Mock Gallery Data (Fallback)
    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title={pageData.title} description={pageData.subtitle} image={pageData.heroImage} />
            <Navbar />

            <GlobalHero
                pageKey={slug}
                defaultTitle={pageData.title}
                defaultSubtitle={pageData.subtitle}
                defaultImage={pageData.heroImage}
                minHeight="60vh"
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
                <div style={{ marginBottom: '6rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '3rem', textAlign: 'center', color: 'var(--secondary)', textTransform: 'uppercase' }}>Dhruva Fest Gallery</h2>

                    {events.length > 0 ? (
                        events.map((event, index) => (
                            <EventGallery key={index} event={event} />
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No events found. Will be updated soon.</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />

            <style>{`
                .slick-arrow::before {
                    color: var(--secondary);
                    font-size: 30px;
                    opacity: 0.8;
                }
                .slick-prev { left: 25px; z-index: 10; }
                .slick-next { right: 25px; z-index: 10; }
                
                .gallery-thumbs .slick-slide {
                    padding: 0 5px;
                    opacity: 0.6;
                    transition: all 0.3s;
                }
                .gallery-thumbs .slick-center {
                    opacity: 1;
                    transform: scale(1.05);
                }
                .gallery-thumbs .slick-center .thumb-item {
                    border-color: var(--secondary) !important;
                }
                
                @media (max-width: 768px) {
                    .gallery-main-slide > div {
                        height: 300px !important;
                    }
                }
                .lg-backdrop {
                    background-color: rgba(0,0,0,0.9);
                }
            `}</style>
        </div>
    );
};

export default DhruvaFestPage;
