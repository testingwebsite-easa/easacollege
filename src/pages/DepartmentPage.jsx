import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGraduationCap, FaBook, FaChalkboardTeacher, FaTrophy,
    FaCalendarAlt, FaDownload, FaArrowRight, FaUniversity, FaUsers, FaLightbulb, FaRocket, FaGlobe, FaChevronRight,
    FaBalanceScale, FaLaptopCode, FaStar, FaHandHoldingHeart, FaGlobeAsia, FaImages, FaFlask, FaHandshake, FaFileSignature
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import API_BASE_URL from '../api';
import { getDepartment } from '../data/departmentsData';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';

const iconMap = {
    FaGraduationCap, FaBook, FaChalkboardTeacher, FaTrophy,
    FaCalendarAlt, FaDownload, FaArrowRight,
    FaBalanceScale, FaLaptopCode, FaStar, FaHandHoldingHeart, FaGlobeAsia
};

const getIcon = (iconName) => {
    if (React.isValidElement(iconName)) return iconName;
    const Icon = iconMap[iconName] || FaUniversity;
    return <Icon />;
};

const DepartmentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [facultyList, setFacultyList] = useState([]);
    const [galleryData, setGalleryData] = useState({ events: [], images: [] });
    const [deptEvents, setDeptEvents] = useState([]);

    // Fetch dynamic data based on active section
    useEffect(() => {
        if (activeSection === 'faculty' && id) {
            fetch(`${API_BASE_URL}/api/faculty?department=${id}`)
                .then(res => res.json())
                .then(data => setFacultyList(data))
                .catch(err => console.error("Error fetching faculty:", err));
        }
        if (activeSection === 'gallery' && id) {
            fetch(`${API_BASE_URL}/api/departments/${id}/gallery`)
                .then(res => res.json())
                .then(data => setGalleryData(data))
                .catch(err => console.error("Error fetching gallery:", err));
        }
        if (activeSection === 'events' && id) {
            fetch(`${API_BASE_URL}/api/departments/${id}/events`)
                .then(res => res.json())
                .then(data => setDeptEvents(data))
                .catch(err => console.error("Error fetching events:", err));
        }
    }, [activeSection, id]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        // Fetch live department data from backend
        fetch(`${API_BASE_URL}/api/departments/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Backend response not ok");
                return res.json();
            })
            .then(data => {
                const staticDept = getDepartment(id);
                // Ensure we have a valid static department
                if (!staticDept) {
                    setDepartment(null);
                    return;
                }
                
                // If the static dept's slug differs from the URL id, redirect
                if (staticDept.slug !== id) {
                    navigate(`/department/${staticDept.slug}`, { replace: true });
                    return;
                }
                
                // Merge the live data with the static data
                if (data && (data.mission?.length > 0 || data.vision?.length > 0 || data.peo?.length > 0 || data.pso?.length > 0 || data.po?.length > 0)) {
                    setDepartment({
                        ...staticDept,
                        mission: data.mission?.length > 0 ? data.mission : staticDept.mission || [],
                        vision: data.vision?.length > 0 ? data.vision : staticDept.vision || [],
                        peo: data.peo?.length > 0 ? data.peo : staticDept.peo || [],
                        pso: data.pso?.length > 0 ? data.pso : staticDept.pso || [],
                        po: data.po?.length > 0 ? data.po : staticDept.po || []
                    });
                } else {
                    setDepartment(staticDept);
                }
            })
            .catch(err => {
                console.warn("Could not fetch live department data, using static fallback:", err);
                const staticDept = getDepartment(id);
                if (staticDept && staticDept.slug !== id) {
                    navigate(`/department/${staticDept.slug}`, { replace: true });
                    return;
                }
                setDepartment(staticDept || null);
            })
            .finally(() => {
                setLoading(false);
                setActiveSection('overview');
            });
    }, [id, navigate]);

    const renderVisionMission = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="vision-mission-card" style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '3rem', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '10rem', color: 'var(--secondary)', opacity: 0.05 }}><FaGlobe /></div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                    <span style={{ padding: '0.6rem', background: 'var(--glass-highlight)', borderRadius: '12px', color: 'var(--secondary)', display: 'flex' }}><FaGlobe size={24} /></span> Vision
                </h3>
                {Array.isArray(department.vision) ? (
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {department.vision.map((item, idx) => (
                            <li key={idx} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', fontSize: '1.15rem', color: 'var(--text-muted)' }}>
                                <span style={{ minWidth: '10px', height: '10px', background: 'var(--secondary)', borderRadius: '50%', marginTop: '10px' }}></span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>{department.vision}</p>
                )}
            </div>
            <div className="vision-mission-card" style={{ background: 'var(--bg-card)', borderRadius: '24px', padding: '3rem', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '10rem', color: 'var(--secondary)', opacity: 0.05 }}><FaRocket /></div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                    <span style={{ padding: '0.6rem', background: 'var(--glass-highlight)', borderRadius: '12px', color: 'var(--secondary)', display: 'flex' }}><FaRocket size={24} /></span> Mission
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {department.mission?.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', fontSize: '1.15rem', color: 'var(--text-muted)' }}>
                            <span style={{ minWidth: '10px', height: '10px', background: 'var(--secondary)', borderRadius: '50%', marginTop: '10px' }}></span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const renderPEO = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {department.po && (
                <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                        <FaGraduationCap style={{ color: 'var(--secondary)' }} /> Program Outcomes (POs)
                    </h3>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {department.po.map((po, idx) => {
                            const hasColon = po.includes(':');
                            const title = hasColon ? po.split(':')[0] : `PO ${idx + 1}`;
                            const description = hasColon ? po.split(':').slice(1).join(':').trim() : po.trim();

                            return (
                                <div key={idx} style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '20px', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                    <div style={{ minWidth: '100px', fontSize: '1.2rem', fontWeight: '900', color: 'var(--secondary)', background: 'var(--glass-highlight)', padding: '0.5rem 1rem', borderRadius: '12px', textAlign: 'center' }}>
                                        {title.split(' ')[0]}
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{title.split(' ').slice(1).join(' ') || 'Outcome Objective'}</h4>
                                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {department.peo && (
                <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                        <FaGraduationCap style={{ color: 'var(--secondary)' }} /> Program Educational Objectives (PEOs)
                    </h3>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {department.peo.map((peo, idx) => (
                            <div key={idx} style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '20px', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--secondary)', opacity: 0.3, lineHeight: 1 }}>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{peo}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {department.pso && (
                <div style={{ marginTop: '2rem' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                        <FaLightbulb style={{ color: 'var(--secondary)' }} /> Program Specific Outcomes (PSOs)
                    </h3>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {department.pso.map((pso, idx) => (
                            <div key={idx} style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '20px', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--secondary)', opacity: 0.3, lineHeight: 1 }}>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                                <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{pso}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderMilestones = () => (
        <div className="milestones-section" style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '4rem', border: '1px solid var(--glass-border)', position: 'relative' }}>
            <div className="milestone-line" style={{ position: 'absolute', left: '4.5rem', top: '4rem', bottom: '4rem', width: '2px', background: 'linear-gradient(to bottom, var(--secondary), transparent)' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {department.milestones?.map((milestone, idx) => (
                    <div key={idx} className="milestone-item" style={{ display: 'flex', gap: '3rem', position: 'relative' }}>
                        <div className="milestone-dot" style={{ width: '20px', height: '20px', background: 'var(--secondary)', borderRadius: '50%', border: '4px solid var(--bg-card)', zIndex: 2, marginTop: '10px' }}></div>
                        <div style={{ background: 'var(--bg-section)', borderRadius: '20px', padding: '2rem', flex: 1, border: '1px solid var(--glass-border)' }}>
                            <span style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)', display: 'block', marginBottom: '0.8rem' }}>{milestone.year}</span>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>{milestone.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderHOD = () => (
        department.hod && (
            <div className="hod-section" style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '4rem', border: '1px solid var(--glass-border)', display: 'grid', gridTemplateColumns: 'minmax(300px, auto) 1fr', gap: '4rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ position: 'relative', marginBottom: '2rem' }}>
                        <div className="hod-image-container" style={{ width: '250px', height: '250px', borderRadius: '50%', overflow: 'hidden', border: '6px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                            <img src={department.hod.image} alt={department.hod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--secondary)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-dark)', fontSize: '1.5rem', border: '4px solid var(--bg-card)' }}>
                            <FaChalkboardTeacher />
                        </div>
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{department.hod.name}</h3>
                    <div style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{department.hod.designation}</div>
                </div>
                <div style={{ paddingTop: '2.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ fontSize: '5rem', color: 'var(--secondary)', opacity: 0.1, position: 'absolute', top: '-40px', left: '-20px', fontFamily: 'serif' }}>"</span>
                        <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-muted)', fontStyle: 'italic', position: 'relative', zIndex: 1, textAlign: 'justify' }}>{department.hod.message}</p>
                        <span style={{ fontSize: '5rem', color: 'var(--secondary)', opacity: 0.1, position: 'absolute', bottom: '-60px', right: '0', fontFamily: 'serif' }}>"</span>
                    </div>
                </div>
            </div>
        )
    );

    const renderFaculty = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {facultyList.length === 0 ? <p className="text-muted">Faculty list is being updated.</p> : facultyList.map((fac, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--text-main)' }}>{fac.name}</h4>
                    <div style={{ fontSize: '0.95rem', color: 'var(--secondary)', fontWeight: '600', textTransform: 'uppercase' }}>{fac.designation}</div>
                </div>
            ))}
        </div>
    );

    const renderGallery = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {galleryData.events.length === 0 && galleryData.images.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="gallery-empty-state"
                    style={{
                        textAlign: 'center',
                        padding: '6rem 2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                >
                    {/* Background Glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                        opacity: 0.1,
                        pointerEvents: 'none',
                        filter: 'blur(40px)'
                    }} />

                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: 'var(--glass-highlight)',
                            padding: '1.5rem',
                            borderRadius: '50%',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <FaImages size={50} color="var(--secondary)" />
                    </motion.div>

                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        Visual Experience Arriving Soon
                    </h3>

                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: '1.8'
                    }}>
                        We are crafting an immersive gallery to showcase our department's vibrant life, events, and achievements.
                        A stunning new interface is on its way!
                    </p>
                </motion.div>
            )}

            {/* Gallery Events */}
            {galleryData.events.map((event, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-main)' }}>{event.eventName}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {event.photos.map((photo, pIdx) => (
                            <div key={pIdx} style={{ borderRadius: '12px', overflow: 'hidden', height: '150px' }}>
                                <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Loose Images */}
            {galleryData.images.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {galleryData.images.map((img, idx) => (
                        <div key={idx} style={{ borderRadius: '16px', overflow: 'hidden', height: '200px', border: '1px solid var(--glass-border)' }}>
                            <img src={img.src} alt={img.caption || 'Gallery'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderEvents = () => (
        <div style={{ display: 'grid', gap: '2rem' }}>
            {deptEvents.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="events-empty-state"
                    style={{
                        textAlign: 'center',
                        padding: '6rem 2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
                        opacity: 0.1,
                        pointerEvents: 'none',
                        filter: 'blur(40px)'
                    }} />

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, -5, 5, 0]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: 'var(--glass-highlight)',
                            padding: '1.5rem',
                            borderRadius: '50%',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <FaCalendarAlt size={50} color="var(--secondary)" />
                    </motion.div>

                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        Exciting Events on the Horizon
                    </h3>

                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: '1.8'
                    }}>
                        We are organizing a series of workshops, seminars, and technical fests.
                        The updated schedule with impressive new opportunities will be available soon!
                    </p>
                </motion.div>
            ) : deptEvents.map((event, idx) => (
                <div key={idx} className="event-card" style={{ display: 'flex', gap: '2rem', background: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: 'var(--glass-highlight)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', flexShrink: 0 }}>
                        <span style={{ fontSize: '1.8rem', fontWeight: '900' }}>{new Date(event.date || Date.now()).getDate()}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase' }}>{new Date(event.date || Date.now()).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{event.title}</h4>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{event.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderLabs = () => (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {department.labs ? department.labs.map((lab, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                    <div style={{ height: '220px', background: 'var(--glass-highlight)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                        {lab.image ? (
                            <img src={lab.image} alt={lab.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <FaFlask size={50} />
                        )}
                    </div>
                    <div style={{ padding: '2rem' }}>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>{lab.name}</h4>
                        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{lab.description}</p>
                        {lab.equipment && (
                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '0.5rem' }}>Key Equipment</div>
                                <div style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{lab.equipment}</div>
                            </div>
                        )}
                    </div>
                </div>
            )) : <p className="text-muted">Laboratories information coming soon.</p>}
        </div>
    );

    const renderMOU = () => (
        <div style={{ display: 'grid', gap: '2rem' }}>
            {!department.mou || department.mou.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        textAlign: 'center',
                        padding: '6rem 2rem',
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}
                >
                    <div style={{
                        background: 'var(--glass-highlight)',
                        padding: '1.5rem',
                        borderRadius: '50%',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}>
                        <FaHandshake size={50} color="var(--secondary)" />
                    </div>
                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        background: 'linear-gradient(135deg, var(--text-main) 0%, var(--secondary) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: 0
                    }}>
                        Strategic Partnerships
                    </h3>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: '1.8'
                    }}>
                        Information about our Memorandums of Understanding (MOUs) with leading industries and academic institutions is currently being updated.
                    </p>
                </motion.div>
            ) : (
                department.mou.map((mou, idx) => (
                    <div key={idx} style={{
                        background: 'var(--bg-card)',
                        padding: '2.5rem',
                        borderRadius: '24px',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        gap: '2.5rem',
                        alignItems: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: 'var(--glass-highlight)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: 'var(--secondary)'
                        }}>
                            <FaFileSignature size={40} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', margin: 0 }}>{mou.partner}</h3>
                                <span style={{ padding: '0.4rem 1rem', background: 'var(--glass-highlight)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--secondary)' }}>{mou.year}</span>
                            </div>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{mou.purpose}</p>
                            {mou.benefits && (
                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <strong style={{ color: 'var(--secondary)' }}>Focus:</strong> {mou.benefits}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    const sections = [
        { id: 'overview', label: 'Overview', icon: <FaUniversity /> },
        { id: 'labs', label: 'Laboratories', icon: <FaFlask /> },
        { id: 'hod', label: 'HOD\'s Message', icon: <FaChalkboardTeacher /> },
        { id: 'faculty', label: 'Faculty', icon: <FaUsers /> },
        { id: 'mou', label: 'MOUs', icon: <FaHandshake /> },
        { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
        { id: 'events', label: 'Events', icon: <FaCalendarAlt /> },
        { id: 'milestones', label: 'Milestones', icon: <FaTrophy /> }
    ];

    if (loading) return null;

    if (!department) return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ color: 'var(--text-main)' }}>Department Not Found</h2>
        </div>
    );

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title={`Best B.Tech in ${department.name} in Coimbatore`}
                description={`Apply for the B.Tech in ${department.name} at EASA College. Ranked among the top programs, we offer a future-proof curriculum, expert faculty, and 100% placement assistance. Check eligibility, fees, and curriculum.`}
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                // pageKey={`dept-${department.id}`}
                defaultTitle={department.name}
                defaultSubtitle="Excellence in Engineering and Professional Innovation"
                defaultImage={department.heroImage}
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '6rem 2rem', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '5rem' }}>
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Menu Navigation</div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    style={{
                                        textAlign: 'left', padding: '1rem 1.2rem', borderRadius: '12px',
                                        background: activeSection === section.id ? 'var(--secondary)' : 'transparent',
                                        border: 'none', color: activeSection === section.id ? 'var(--bg-dark)' : 'var(--text-muted)',
                                        cursor: 'pointer', fontSize: '0.95rem', fontWeight: '700', transition: 'all 0.3s ease',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        {section.icon}
                                        <span>{section.label}</span>
                                    </div>
                                    {activeSection === section.id && <FaChevronRight size={10} />}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {activeSection === 'overview' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-main)' }}>Overview</h2>
                                    <div className="overview-card" style={{ background: 'var(--bg-card)', borderRadius: '32px', padding: '3.5rem', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
                                        <p style={{ fontSize: '1.25rem', lineHeight: '1.9', color: 'var(--text-muted)', marginBottom: '3rem' }}>{department.overview}</p>
                                        {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
                                            
                                            <div style={{ padding: '2rem', background: 'var(--bg-section)', borderRadius: '20px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                                <FaChalkboardTeacher style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '1rem' }} />
                                                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)' }}>{department.facultyCount || '25+'}</div>
                                                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Faculty</div>
                                            </div> 
                                            <div style={{ padding: '2rem', background: 'var(--bg-section)', borderRadius: '20px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                                <FaLaptopCode style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '1rem' }} />
                                                <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)' }}>{department.labCount || '10+'}</div>
                                                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: '700' }}>Labs</div>
                                            </div> 
                                        </div>  */}
                                    </div>
                                </div>
                            )}

                            {activeSection === 'labs' && renderLabs()}
                            {activeSection === 'hod' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                    <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--text-main)' }}>HOD MESSAGE</h2>
                                    {renderHOD()}
                                </div>
                            )}
                            {activeSection === 'faculty' && renderFaculty()}
                            {activeSection === 'mou' && renderMOU()}
                            {activeSection === 'gallery' && renderGallery()}
                            {activeSection === 'events' && renderEvents()}
                            {activeSection === 'milestones' && renderMilestones()}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <style>{`
                @media (max-width: 1024px) {
                    .container { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; gap: 3rem !important; }
                    aside { position: sticky !important; top: 60px; z-index: 999; margin: 0 !important; width: 100% !important; }
                    aside > div { 
                        border-radius: 0 !important; 
                        margin: 0 !important;
                        width: 100vw !important;
                        margin-left: -1.5rem !important; /* Counteract container padding */
                        padding: 0.8rem 1rem !important;
                        background: rgba(15, 23, 42, 0.95) !important; /* Darker, more solid background */
                        backdrop-filter: blur(16px);
                        border-bottom: 1px solid var(--glass-border);
                        border-top: 1px solid var(--glass-border);
                        display: flex !important;
                        align-items: center;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                    }
                    nav { 
                        flex-direction: row !important; 
                        overflow-x: auto !important; 
                        padding-bottom: 0 !important; 
                        gap: 0.8rem !important; 
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                        display: flex !important;
                        flex-wrap: nowrap !important;
                        align-items: center;
                        -webkit-overflow-scrolling: touch;
                        width: 100%;
                    }
                    nav::-webkit-scrollbar { display: none; }
                    button { 
                        white-space: nowrap !important; 
                        background: transparent !important; /* Clean look */
                        border: 1px solid var(--glass-border) !important;
                        color: var(--text-muted) !important; 
                        padding: 0.5rem 1rem !important; 
                        border-radius: 50px !important; 
                        font-size: 0.85rem !important;
                        flex-shrink: 0;
                        transition: all 0.2s ease;
                    }
                    button[style*="var(--secondary)"] { /* Active State Override */
                         background: var(--secondary) !important;
                         color: var(--bg-dark) !important;
                         border-color: var(--secondary) !important;
                         font-weight: 700 !important;
                    }
                    
                    /* Hide non-essential elements in mobile nav to save space */
                    aside > div > div:first-child { display: none; } /* Hide "Menu Navigation" title */
                    aside > div > div:last-child { display: none; } /* Hide social icons */
                    
                    /* Section Specifics */
                    .section-title { fontSize: 2.5rem !important; }
                    .overview-card, .vision-mission-card, .hod-section, .milestones-section { padding: 2.5rem !important; }
                    .hod-section { grid-template-columns: 1fr !important; text-align: center; gap: 2rem !important; }
                    .hod-image-container { margin: 0 auto; }
                    .milestone-line { left: 2.5rem !important; }
                    .milestone-item { gap: 1.5rem !important; }
                    .milestone-dot { width: 16px !important; height: 16px !important; margin-top: 5px !important; }
                }

                @media (max-width: 768px) {
                    .container { padding: 6rem 1rem !important; } /* Adjust for fixed header */
                    .section-title { fontSize: 2rem !important; }
                    
                    /* HOD Section Mobile */
                    .hod-section { padding: 2rem 1.5rem !important; }
                    .hod-image-container { width: 180px !important; height: 180px !important; }
                    
                    /* Milestones Mobile */
                    .milestones-section { padding: 1.5rem !important; }
                    .milestone-line { display: none; }
                    .milestone-item { flex-direction: column; gap: 1rem !important; }
                    .milestone-dot { display: none; }
                    
                    /* Events Mobile */
                    .event-card { flex-direction: column; text-align: center; padding: 1.5rem !important; gap: 1rem !important; }
                    
                    /* General Padding Reduction */
                    .overview-card, .vision-mission-card { padding: 1.5rem !important; }
                }
            `}</style>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />
        </div>
    );
};

export default DepartmentPage;
