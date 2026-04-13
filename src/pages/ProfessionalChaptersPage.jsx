import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaStar, FaUsers, FaArrowRight, FaLaptopCode, FaMicrochip, FaGlobe, FaSearch, FaCogs, FaPhoneAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';

const ProfessionalChaptersPage = () => {
    const chapters = [
        {
            id: 'csi',
            name: 'CSI',
            fullName: 'Computer Society of India',
            description: 'The Computer Society of India (CSI) is a premier professional body dedicated to advancing knowledge and innovation in the field of computer science and information technology. The CSI chapter provides a platform for students/members to enhance technical skills, stay updated with emerging technologies, and connect with industry and academia.',
            activities: [
                'Technical workshops and hands-on training programs',
                'Seminars and guest lectures by industry experts',
                'Coding contests, hackathons, and quizzes',
                'Webinars on emerging technologies and career trends',
                'Technical paper presentations and project showcases',
                'Industry interaction and professional development activities'
            ],
            icon: <FaLaptopCode />,
            color: '#3498db'
        },
        {
            id: 'ictact',
            name: 'ICTACT',
            fullName: 'ICTACT Academy',
            description: 'ICTACT Academy is an industry-driven initiative focused on enhancing the employability of students by bridging the gap between academia and industry. The academy provides skill-based training, certification programs, and exposure to emerging technologies to prepare learners for successful careers in the IT and allied sectors.',
            activities: [
                'Skill development and certification programs',
                'Industry-oriented technical training workshops',
                'Faculty development programs (FDPs)',
                'Guest lectures and webinars by industry professionals',
                'Internship, placement, and career guidance support',
                'Innovation, entrepreneurship, and startup initiatives'
            ],
            icon: <FaMicrochip />,
            color: '#e67e22'
        },
        {
            id: 'ieee',
            name: 'IEEE',
            fullName: 'IEEE Student Chapter',
            description: 'The IEEE Student Chapter is a global professional association that fosters technical innovation and excellence among students in engineering and technology. The chapter provides opportunities for students to enhance technical knowledge, develop leadership skills, and engage with industry and research communities worldwide.',
            activities: [
                'Technical workshops and hands-on training programs',
                'Seminars, webinars, and guest lectures by IEEE professionals',
                'Technical paper presentations and project competitions',
                'Coding contests, hackathons, and innovation challenges',
                'Participation in IEEE conferences and events',
                'Professional development and leadership activities'
            ],
            icon: <FaGlobe />,
            color: '#2ecc71'
        },
        {
            id: 'iirs',
            name: 'IIRS',
            fullName: 'IIRS Outreach Cell',
            description: 'The IIRS Outreach Cell aims to promote awareness and knowledge in remote sensing, GIS, GPS, and geospatial technologies. In association with the Indian Institute of Remote Sensing (ISRO), the cell provides learners with opportunities to gain exposure to cutting-edge space and geospatial applications through training and online programs.',
            activities: [
                'Participation in IIRS–ISRO online courses and certification programs',
                'Workshops and webinars on Remote Sensing, GIS, and Geospatial Technologies',
                'Awareness programs on space technology and its applications',
                'Project-based learning and case study discussions',
                'Expert talks by scientists and industry professionals',
                'Promotion of research and innovation in geospatial domains'
            ],
            icon: <FaSearch />,
            color: '#9b59b6'
        },
        {
            id: 'qcfi',
            name: 'QCFI',
            fullName: 'Quality Circle Forum of India',
            description: 'The Quality Circle Forum of India (QCFI) is a national body committed to promoting quality concepts, continuous improvement, and excellence in organizations. The QCFI chapter encourages students/members to develop problem-solving skills, teamwork, and a culture of quality through participative management practices.',
            activities: [
                'Awareness programs on quality concepts and tools',
                'Quality circle formation and case study discussions',
                'Workshops on problem-solving and continuous improvement techniques',
                'Seminars and guest lectures by quality professionals',
                'Participation in quality conventions and competitions',
                'Industry interaction and best-practice sharing sessions'
            ],
            icon: <FaCogs />,
            color: '#e74c3c'
        },
        {
            id: 'yuva',
            name: 'YUVA',
            fullName: 'YUVA (Young Indians)',
            description: 'YUVA (Young Indians) is a youth-led movement of the Confederation of Indian Industry (CII) that empowers young minds to contribute to nation-building. The YUVA Chapter nurtures leadership, social responsibility, and innovation by engaging students in impactful initiatives that drive positive change in society.',
            activities: [
                'Leadership and personality development programs',
                'Social impact and community development initiatives',
                'Entrepreneurship and innovation workshops',
                'Awareness campaigns on national and social issues',
                'Interaction with industry leaders and changemakers',
                'Youth forums, conferences, and networking events'
            ],
            icon: <FaUsers />,
            color: '#f1c40f'
        }
    ];

    const [activeSection, setActiveSection] = useState(chapters[0].id);
    const activeChapter = chapters.find(c => c.id === activeSection);

    return (
        <div className="professional-chapters-page" style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)' }}>
            <SEO
                title="Professional Chapters | EASA College"
                description="Explore the various professional chapters at EASA College of Engineering and Technology, including CSI, IEEE, ICTACT, and more."
            />

            <Navbar />

            <GlobalHero
                pageKey="professional-chapters"
                defaultTitle="PROFESSIONAL CHAPTERS"
                defaultSubtitle="EXCELLENCE THROUGH EMPOWERMENT"
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '4rem' }}>
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {chapters.map(chapter => (
                                <button
                                    key={chapter.id}
                                    onClick={() => setActiveSection(chapter.id)}
                                    className={`nav-btn ${activeSection === chapter.id ? 'active' : ''}`}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '1.2rem 1.5rem', borderRadius: '14px',
                                        background: activeSection === chapter.id ? 'var(--secondary)' : 'transparent',
                                        border: 'none', color: activeSection === chapter.id ? 'var(--bg-dark)' : 'var(--text-muted)',
                                        cursor: 'pointer', transition: 'all 0.3s ease', textAlign: 'left',
                                        fontWeight: '700', fontSize: '1rem'
                                    }}
                                >
                                    <span>{chapter.name}</span>
                                    {activeSection === chapter.id && <FaChevronRight size={12} />}
                                </button>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main style={{ minHeight: '600px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                background: 'var(--bg-card)', borderRadius: '40px',
                                padding: '4.5rem', border: '1px solid var(--glass-border)',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden'
                            }}
                        >
                            <div style={{ marginBottom: '3.5rem' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    style={{ fontSize: '4.5rem', color: 'var(--secondary)', marginBottom: '1.5rem', display: 'inline-block' }}
                                >
                                    {activeChapter.icon}
                                </motion.div>
                                <h2 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 0.5rem 0', lineHeight: '1.1', color: 'var(--text-main)' }}>{activeChapter.name}</h2>
                                <p style={{ fontSize: '1.4rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{activeChapter.fullName}</p>
                            </div>

                            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '800px' }}>{activeChapter.description}</p>

                            <div>
                                <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                                    <FaStar style={{ color: 'var(--secondary)' }} /> Key Activities
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                                    {activeChapter.activities.map((activity, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            style={{
                                                background: 'var(--bg-section)', borderRadius: '18px',
                                                padding: '1.8rem', display: 'flex', gap: '1.2rem',
                                                alignItems: 'flex-start', border: '1px solid var(--glass-border)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            whileHover={{ x: 10, borderColor: 'var(--secondary)', background: 'var(--glass-highlight)' }}
                                        >
                                            <FaArrowRight style={{ color: 'var(--secondary)', marginTop: '0.3rem', flexShrink: 0 }} size={16} />
                                            <span style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-main)', lineHeight: '1.5' }}>{activity}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <section style={{ background: 'linear-gradient(135deg, var(--bg-card), var(--bg-main))', padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <p style={{ fontSize: '1.4rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '1.5rem' }}>Ready to Join Us?</p>
                        <a href="tel:+918220008082" style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                            <div style={{ width: '80px', height: '80px', background: 'var(--secondary)', color: 'var(--bg-dark)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(230, 182, 39, 0.4)' }}>
                                <FaPhoneAlt size={30} />
                            </div>
                            <span>+91 82200 08082</span>
                        </a>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '2.5rem auto 0', lineHeight: '1.7' }}>
                            Have questions about chapters, activities, or admissions?
                            Our expert counselors are just a call away to guide you.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
            <style>{`
                @media (max-width: 1024px) {
                    .container { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; }
                    aside { position: static !important; margin-bottom: 2rem; }
                    main { min-height: auto !important; }
                }
            `}</style>
        </div>
    );
};

export default ProfessionalChaptersPage;
