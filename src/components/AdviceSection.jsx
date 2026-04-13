import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import API_BASE_URL from '../api';
import { FaQuoteLeft } from 'react-icons/fa';

const AdviceSection = () => {
    const [advice, setAdvice] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/advice`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setAdvice(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch advice", err);
                setLoading(false);
            });
    }, []);

    if (loading || advice.length === 0) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <section className="section-container" style={{ padding: 'clamp(2rem, 5vw, 4rem) 2rem', background: 'var(--bg-main)' }}>
            <div className="section-header text-center" style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
                <h2 className="section-title text-gradient">Student Voices</h2>
                <div className="section-line"></div>
                <p className="section-subtitle">Hear from our students and alumni about their journey at EASA.</p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Slider {...settings}>
                    {advice.map((item, index) => (
                        <div key={item._id || index} style={{ padding: '1rem' }}>
                            <div className="advice-card" style={{
                                background: 'var(--bg-card)',
                                padding: '2rem',
                                borderRadius: '20px',
                                position: 'relative',
                                border: '1px solid var(--glass-border)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                height: '100%',
                                minHeight: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    fontSize: '1.2rem'
                                }}>
                                    <FaQuoteLeft />
                                </div>

                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    marginBottom: '1rem',
                                    marginTop: '1rem',
                                    border: '3px solid var(--primary-light)'
                                }}>
                                    <img
                                        src={item.image || 'https://via.placeholder.com/100'}
                                        alt={item.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <p style={{
                                    fontStyle: 'italic',
                                    color: 'var(--text-main)',
                                    marginBottom: '1.5rem',
                                    lineHeight: '1.6',
                                    fontSize: '1rem'
                                }}>
                                    "{item.message}"
                                </p>

                                <div style={{ marginTop: 'auto' }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--primary)', margin: 0 }}>{item.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default AdviceSection;
