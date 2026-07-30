import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChevronRight, FaStar, FaUsers, FaArrowRight, FaLaptopCode, FaMicrochip,
    FaGlobe, FaSearch, FaCogs, FaPhoneAlt, FaDownload, FaEnvelope,
    FaGraduationCap, FaTrophy, FaBookReader, FaCalendarAlt, FaImages,
    FaUserTie, FaCheckCircle, FaRocket, FaLightbulb, FaEye, FaBullseye, FaFilePdf
} from 'react-icons/fa';
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
            description: 'The IEEE Student Branch provides students with opportunities to enhance their technical knowledge, leadership skills, and professional development. Through workshops, seminars, technical competitions, industrial visits, and networking events, the branch connects students with the global engineering community and promotes innovation and research.',
            activities: [
                'Technical Workshops',
                'Expert Talks',
                'Webinars',
                'Industrial Visits',
                'Coding Competitions',
                'Hackathons',
                'Project Exhibitions',
                'Technical Quiz',
                'Robotics Workshops',
                'AI & Machine Learning Programs',
                'IoT Workshops',
                'Career Guidance Sessions',
                'Soft Skills Training',
                'Entrepreneurship Programs'
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
    const [ieeeSubTab, setIeeeSubTab] = useState('all');
    const activeChapter = chapters.find(c => c.id === activeSection);

    // IEEE specific detailed datasets
    const ieeeNavTabs = [
        { id: 'all', label: 'All Overview' },
        { id: 'about', label: 'About & Vision' },
        { id: 'committee', label: 'Executive Committee' },
        { id: 'activities', label: 'Activities' },
        { id: 'events', label: 'Major Events' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'membership', label: 'Membership Benefits' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'downloads', label: 'Downloads' },
        { id: 'contact', label: 'Contact' }
    ];

    const ieeeMissions = [
        'Promote technical and professional development.',
        'Encourage innovation, research, and entrepreneurship.',
        'Organize industry-oriented workshops and seminars.',
        'Develop leadership and teamwork among students.',
        'Connect students with global IEEE resources and professionals.'
    ];

    const ieeeObjectives = [
        'Enhance technical knowledge beyond the classroom.',
        'Organize coding competitions, hackathons, and project expos.',
        'Facilitate interaction with industry experts.',
        'Promote research publications and patent activities.',
        'Encourage participation in IEEE conferences and competitions.'
    ];

    const ieeeCommittee = [
        { position: 'Chairperson', name: 'Antony Nelson ' },
        { position: 'Vice Chair', name: 'Sivaram Surya' },
        { position: 'Secretary', name: 'Kathiresan' },
        { position: 'Treasurer', name: 'Gowseelan' },
    ];

    const ieeeEvents = [
        { name: 'IEEE Orientation Program', date: 'DD/MM/YYYY', participants: '200+' },
        { name: 'AI Workshop', date: 'DD/MM/YYYY', participants: '150+' },
        { name: 'Hackathon', date: 'DD/MM/YYYY', participants: '300+' },
        { name: 'Industry Expert Lecture', date: 'DD/MM/YYYY', participants: '180+' }
    ];

    const ieeeAchievements = [
        'IEEE Membership Growth',
        'Student Research Publications',
        'National-Level Competition Winners',
        'IEEE Conference Paper Presentations',
        'Technical Innovation Awards',
        'Best Project Awards',
        'Patent Filings',
        'Community Outreach Programs'
    ];

    const ieeeBenefits = [
        { title: 'IEEE Xplore Library Access', desc: 'Unlimited access to cutting-edge research publications and journals.' },
        { title: 'Global Networking', desc: 'Connect with international engineering professionals and student chapters worldwide.' },
        { title: 'Conference Discounts', desc: 'Exclusive member discounts on IEEE sponsored global conferences and workshops.' },
        { title: 'Technical Magazines', desc: 'Regular digital and print subscriptions to IEEE Spectrum and domain publications.' },
        { title: 'Online Certifications', desc: 'Special member pricing for professional certifications and learning courses.' },
        { title: 'Leadership Development', desc: 'Opportunities to hold office, lead projects, and direct national events.' },
        { title: 'Scholarships & Awards', desc: 'Eligibility for prestigious IEEE student grants, awards, and travel stipends.' },
        { title: 'Internship Opportunities', desc: 'Access to IEEE Job Site, career fairs, and industry mentoring programs.' }
    ];

    const ieeeGalleryCategories = [
        { title: 'Workshop Photos', icon: <FaLaptopCode />, color: '#3498db' },
        { title: 'Technical Events', icon: <FaRocket />, color: '#e67e22' },
        { title: 'Hackathons', icon: <FaMicrochip />, color: '#9b59b6' },
        { title: 'Industrial Visits', icon: <FaGlobe />, color: '#2ecc71' },
        { title: 'Guest Lectures', icon: <FaUserTie />, color: '#f1c40f' },
        { title: 'Award Ceremonies', icon: <FaTrophy />, color: '#e74c3c' }
    ];

    const ieeeDownloads = [
        { title: 'Membership Form', file: 'IEEE_Membership_Form.pdf' },
        { title: 'Annual Report', file: 'IEEE_Annual_Report.pdf' },
        { title: 'Event Brochure', file: 'IEEE_Event_Brochure.pdf' },
        { title: 'Newsletters', file: 'IEEE_Newsletters.pdf' },
        { title: 'Activity Calendar', file: 'IEEE_Activity_Calendar.pdf' }
    ];

    const showIeeeSub = (tabId) => ieeeSubTab === 'all' || ieeeSubTab === tabId;

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
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Chapters</div>
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
                                padding: '4rem 3.5rem', border: '1px solid var(--glass-border)',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden'
                            }}
                        >
                            {/* Chapter Header */}
                            <div style={{ marginBottom: '2.5rem' }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200 }}
                                    style={{ fontSize: '4rem', color: 'var(--secondary)', marginBottom: '1rem', display: 'inline-block' }}
                                >
                                    {activeChapter.icon}
                                </motion.div>
                                <h1 style={{ fontSize: '3.2rem', fontWeight: '900', margin: '0 0 0.5rem 0', lineHeight: '1.1', color: 'var(--text-main)' }}>{activeChapter.name}</h1>
                                <p style={{ fontSize: '1.3rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{activeChapter.fullName}</p>
                            </div>

                            {/* IEEE Specialized Comprehensive Layout */}
                            {activeSection === 'ieee' ? (
                                <div>
                                    {/* Internal Sub-Navigation for IEEE */}
                                    <div style={{
                                        display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem',
                                        padding: '0.8rem', background: 'var(--bg-section)', borderRadius: '20px',
                                        border: '1px solid var(--glass-border)'
                                    }}>
                                        {ieeeNavTabs.map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setIeeeSubTab(tab.id)}
                                                style={{
                                                    padding: '0.6rem 1.2rem', borderRadius: '12px', border: 'none',
                                                    fontSize: '0.88rem', fontWeight: '700', cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    background: ieeeSubTab === tab.id ? 'var(--secondary)' : 'transparent',
                                                    color: ieeeSubTab === tab.id ? 'var(--bg-dark)' : 'var(--text-muted)'
                                                }}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* About IEEE Student Branch */}
                                    {showIeeeSub('about') && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--text-main)' }}>About IEEE Student Branch</h3>
                                            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                                                {activeChapter.description}
                                            </p>

                                            {/* Vision & Mission Cards Grid */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                                                <div style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                        <FaEye style={{ color: 'var(--secondary)', fontSize: '1.8rem' }} />
                                                        <h4 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Vision</h4>
                                                    </div>
                                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
                                                        To empower students through technology, innovation, and professional excellence while fostering lifelong learning and leadership.
                                                    </p>
                                                </div>

                                                <div style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                        <FaBullseye style={{ color: 'var(--secondary)', fontSize: '1.8rem' }} />
                                                        <h4 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Mission</h4>
                                                    </div>
                                                    <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1rem' }}>
                                                        {ieeeMissions.map((m, i) => <li key={i}>{m}</li>)}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Objectives */}
                                            <div style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
                                                    <FaLightbulb style={{ color: 'var(--secondary)', fontSize: '1.8rem' }} />
                                                    <h4 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Objectives</h4>
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                                    {ieeeObjectives.map((obj, idx) => (
                                                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'var(--bg-card)', padding: '1rem 1.2rem', borderRadius: '14px', border: '1px solid var(--glass-border)' }}>
                                                            <FaCheckCircle style={{ color: 'var(--secondary)', marginTop: '0.2rem', flexShrink: 0 }} />
                                                            <span style={{ fontSize: '0.98rem', fontWeight: '600', color: 'var(--text-main)' }}>{obj}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Faculty Counselor & Executive Committee */}
                                    {showIeeeSub('committee') && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)' }}>Faculty Counselor & Executive Committee</h3>
                                            
                                            {/* Counselor Card */}
                                            <div style={{
                                                background: 'linear-gradient(135deg, var(--bg-section), var(--bg-card))',
                                                padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)',
                                                marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                                            }}>
                                                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.8rem' }}>Faculty Counselor</div>
                                                <h4 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '0 0 0.4rem 0', color: 'var(--text-main)' }}>Mrs.Indhumathi.R </h4>
                                                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--secondary)', margin: '0 0 1.5rem 0' }}>Assistant Professor, Department of EEE</p>
                                                
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)' }}>
                                                        <FaEnvelope style={{ color: 'var(--secondary)' }} />
                                                        <span>indhumathi.r@ecetonline.com</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Executive Committee Table */}
                                            <div style={{ background: 'var(--bg-section)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--glass-border)', overflowX: 'auto' }}>
                                                <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Student Executive Committee</h4>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                                    <thead>
                                                        <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                                                            <th style={{ padding: '1rem', fontSize: '1rem', fontWeight: '800', color: 'var(--secondary)' }}>Position</th>
                                                            <th style={{ padding: '1rem', fontSize: '1rem', fontWeight: '800', color: 'var(--secondary)' }}>Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ieeeCommittee.map((item, idx) => (
                                                            <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                                <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>{item.position}</td>
                                                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.name}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {/* Activities Grid */}
                                    {showIeeeSub('activities') && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                                                <FaStar style={{ color: 'var(--secondary)' }} /> Activities Organized
                                            </h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
                                                {activeChapter.activities.map((act, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        whileHover={{ scale: 1.02, borderColor: 'var(--secondary)' }}
                                                        style={{
                                                            background: 'var(--bg-section)', padding: '1.5rem', borderRadius: '18px',
                                                            border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem'
                                                        }}
                                                    >
                                                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '900' }}>
                                                            {idx + 1}
                                                        </div>
                                                        <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>{act}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Major Events Table */}
                                    {showIeeeSub('events') && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)' }}>Major Events</h3>
                                            <div style={{ background: 'var(--bg-section)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--glass-border)', overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                                    <thead>
                                                        <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                                                            <th style={{ padding: '1.2rem 1rem', fontSize: '1rem', fontWeight: '800', color: 'var(--secondary)' }}>Event</th>
                                                            <th style={{ padding: '1.2rem 1rem', fontSize: '1rem', fontWeight: '800', color: 'var(--secondary)' }}>Date</th>
                                                            <th style={{ padding: '1.2rem 1rem', fontSize: '1rem', fontWeight: '800', color: 'var(--secondary)' }}>Participants</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ieeeEvents.map((ev, idx) => (
                                                            <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                                                <td style={{ padding: '1.2rem 1rem', fontWeight: '700', color: 'var(--text-main)' }}>{ev.name}</td>
                                                                <td style={{ padding: '1.2rem 1rem', color: 'var(--text-muted)' }}>{ev.date}</td>
                                                                <td style={{ padding: '1.2rem 1rem' }}>
                                                                    <span style={{ background: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', padding: '0.4rem 0.9rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.9rem' }}>
                                                                        {ev.participants}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {/* Achievements */}
                                    {showIeeeSub('achievements') && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)' }}>Achievements & Recognition</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                                {ieeeAchievements.map((ach, idx) => (
                                                    <div key={idx} style={{ background: 'var(--bg-section)', padding: '1.6rem', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                                        <FaTrophy style={{ color: 'var(--secondary)', fontSize: '1.8rem', flexShrink: 0 }} />
                                                        <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>{ach}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Membership Benefits */}
                                    {showIeeeSub('membership') && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)' }}>Membership Benefits</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                                {ieeeBenefits.map((b, idx) => (
                                                    <div key={idx} style={{ background: 'var(--bg-section)', padding: '1.8rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 0.6rem 0', color: 'var(--secondary)' }}>{b.title}</h4>
                                                        <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>{b.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Gallery */}
                                    {showIeeeSub('gallery') && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)' }}>Gallery</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                                                {ieeeGalleryCategories.map((g, idx) => (
                                                    <div key={idx} style={{
                                                        background: 'var(--bg-section)', height: '180px', borderRadius: '24px',
                                                        border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column',
                                                        alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.5rem',
                                                        textAlign: 'center', transition: 'all 0.3s ease'
                                                    }}>
                                                        <div style={{ fontSize: '2.5rem', color: g.color }}>{g.icon}</div>
                                                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>{g.title}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Downloads */}
                                    {showIeeeSub('downloads') && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)' }}>Downloads</h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
                                                {ieeeDownloads.map((dl, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={`#download-${dl.file}`}
                                                        onClick={(e) => { e.preventDefault(); alert(`Downloading ${dl.title}...`); }}
                                                        style={{
                                                            background: 'var(--bg-section)', padding: '1.4rem 1.8rem', borderRadius: '20px',
                                                            border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center',
                                                            justify: 'space-between', textDecoration: 'none', transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                            <FaFilePdf style={{ color: '#e74c3c', fontSize: '1.6rem' }} />
                                                            <span style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>{dl.title}</span>
                                                        </div>
                                                        <FaDownload style={{ color: 'var(--secondary)' }} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact */}
                                    {showIeeeSub('contact') && (
                                        <div>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)' }}>Contact Details</h3>
                                            <div style={{ background: 'var(--bg-section)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                <h4 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '0.8rem' }}>IEEE Student Branch</h4>
                                                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700', marginBottom: '1.5rem' }}>
                                                    Department of Electrical & Electronics Engineering<br />
                                                    EASA College of Engineering and Technology
                                                </p>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '1.05rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                                                        <FaEnvelope style={{ color: 'var(--secondary)' }} />
                                                        <a href="mailto:ieee@easacollege.edu.in" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '700' }}>ieee@easacollege.edu.in</a>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                                                        <FaPhoneAlt style={{ color: 'var(--secondary)' }} />
                                                        <a href="tel:+918220008082" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '700' }}>+91 82200 08082</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* Default Chapter Render for other chapters */
                                <div>
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
                                </div>
                            )}
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

