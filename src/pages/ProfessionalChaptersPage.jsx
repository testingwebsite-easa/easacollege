import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChevronRight, FaStar, FaUsers, FaArrowRight, FaLaptopCode, FaMicrochip,
    FaGlobe, FaSearch, FaCogs, FaPhoneAlt, FaDownload, FaEnvelope,
    FaGraduationCap, FaTrophy, FaBookReader, FaCalendarAlt, FaImages,
    FaUserTie, FaCheckCircle, FaRocket, FaLightbulb, FaEye, FaBullseye, FaFilePdf,
    FaSatelliteDish, FaLayerGroup, FaCertificate, FaExternalLinkAlt, FaAward,
    FaMapMarkedAlt, FaChalkboardTeacher, FaAtom, FaShieldAlt
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';

const ProfessionalChaptersPage = ({ defaultChapter }) => {
    const [searchParams] = useSearchParams();
    const location = useLocation();

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
            fullName: 'IIRS-ISRO Outreach Nodal Centre',
            description: 'The IIRS-ISRO Outreach Programme is a premium distance-learning initiative by the Indian Institute of Remote Sensing (IIRS), a constituent unit of the Indian Space Research Organisation (ISRO). Established to bridge the gap between cutting-edge space technology and mainstream academia, the program utilizes state-of-the-art internet and satellite communication tools (such as the E-CLASS platform) to deliver live, interactive, and self-paced digital courses. It primarily targets students, faculty, and researchers across universities to build a robust pool of skilled manpower in geospatial technologies.',
            activities: [
                'Live IIRS Outreach Courses & Certification Programs',
                'Technical Assessment Tests & E-CLASS Satellite Broadcast Sessions',
                'Short-term Workshops on Advanced Space Science Applications',
                'ISRO START (Space Science and Technology Awareness Training)',
                'Hands-on GIS & Remote Sensing Practical Labs (QGIS, SAGA, Google Earth Engine)',
                'Expert Webinars and Live Q&A Panels with ISRO Scientists',
                'Faculty Development Programs (FDPs) in Geospatial Disciplines',
                'Defense & Industry Geospatial Expert Guest Lectures'
            ],
            icon: <FaSatelliteDish />,
            color: '#9b59b6'
        },
        {
            id: 'qcfi',
            name: 'QCFI',
            fullName: 'Quality Circle Forum of India',
            vision: 'To develop quality-conscious, innovative, ethical, and future-ready students who strive for continuous improvement and excellence in academic, professional, and social life.',
            mission: [
                'To empower students with Quality Concepts, Quality Circle practices, teamwork, problem-solving, leadership, and innovation, enabling them to become Total Quality Professionals and responsible contributors to society.'
            ],
            description: 'The Quality Circle Forum of India (QCFI) is a national body committed to promoting quality concepts, continuous improvement, and excellence in organizations. The QCFI chapter encourages students/members to develop problem-solving skills, teamwork, and a culture of quality through participative management practices.',
            departmentMembers: [
                {
                    department: 'Department of Mechanical Engineering',
                    staffInCharge: 'Mr R. Nithyananth',
                    students: [
                        { name: 'Inbaganesan R', year: 'Final Year' },
                        { name: 'Madura K', year: 'Third Year' }
                    ]
                }
            ],
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

    const initialChapter = defaultChapter || searchParams.get('chapter') || (location.pathname.includes('iirs') ? 'iirs' : chapters[0].id);
    const [activeSection, setActiveSection] = useState(initialChapter);
    const [ieeeSubTab, setIeeeSubTab] = useState('all');
    const [iirsSubTab, setIirsSubTab] = useState('all');

    useEffect(() => {
        const param = searchParams.get('chapter');
        if (param && chapters.some(c => c.id === param.toLowerCase())) {
            setActiveSection(param.toLowerCase());
        } else if (defaultChapter && chapters.some(c => c.id === defaultChapter)) {
            setActiveSection(defaultChapter);
        } else if (location.pathname.includes('iirs')) {
            setActiveSection('iirs');
        }
    }, [searchParams, defaultChapter, location.pathname]);

    const activeChapter = chapters.find(c => c.id === activeSection) || chapters[0];

    // ==========================================
    // IEEE Specialized Datasets
    // ==========================================
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
        { sNo: 1, date: '29.08.2025', duration: '1 Hr', name: 'IEEE Awareness Drive', participants: 62 },
        { sNo: 2, date: '22.11.2025', duration: '1 Hr', name: 'IEEE Student branch Inauguration', participants: 31 },
        { sNo: 3, date: '27.12.2025', duration: '1 Hr', name: 'AI in Health Care', participants: 40 },
        { sNo: 4, date: '27.12.2025', duration: '1 Hr', name: 'AI in Computer Vision', participants: 35 },
        { sNo: 5, date: '11.02.2026', duration: '1.30 Hr', name: 'Short-Term Money and Long-Term Success', participants: 100 },
        { sNo: 6, date: '16.02.2026', duration: '1 Hr', name: 'Electric Vehicle Technology: From Fundamentals to Future Mobility', participants: 60 },
        { sNo: 7, date: '02.03.2026 to 06.03.2026', duration: '5 Days', name: 'Advances In Energy Storage and Power Electronics for Sustainable Transportation and Smart Grids', participants: 100 },
        { sNo: 8, date: '07.03.2026', duration: '1 Day', name: "International Women's Day", participants: 350 },
        { sNo: 9, date: '14.03.2026', duration: '1 Day', name: 'Build & Program Robots – GAADI & DOG', participants: 73 },
        { sNo: 10, date: '26.03.2026', duration: '1 Day', name: 'Sustainable Project Expo', participants: 41 }
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

    // ==========================================
    // IIRS-ISRO Specialized Datasets
    // ==========================================
    const iirsNavTabs = [
        { id: 'all', label: 'All Overview' },
        { id: 'about', label: 'About & Vision' },
        { id: 'objectives', label: 'Objectives' },
        { id: 'coordinators', label: 'Coordinators' },
        { id: 'activities', label: 'Activities & Outreach' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'benefits', label: 'Student Benefits' },
        { id: 'gallery', label: 'Gallery Glimpses' },
        { id: 'resources', label: 'Resources & Links' },
        { id: 'contact', label: 'Contact Details' }
    ];

    const iirsObjectives = [
        'To act as an official institutional hub for the Indian Institute of Remote Sensing (IIRS) and ISRO Distance Learning initiatives.',
        'To bridge the gap between academia and advanced space technology by facilitating students and faculty access to live online courses, webinars, and workshops.',
        'To strengthen capacity building in the core areas of Remote Sensing, Geographic Information Systems (GIS), Global Navigation Satellite Systems (GNSS), and Geo-computation.',
        'To support and guide students through specialized programs like the ISRO Space Science and Technology Awareness Training (START).',
        'To foster research capabilities, technological awareness, and career readiness among students in space science applications and earth observation technologies.'
    ];

    const iirsStudentBenefits = [
        {
            title: 'Direct Expert Guidance',
            desc: 'Opportunity to attend live, interactive classroom sessions and technical demonstrations led by distinguished ISRO scientists and IIRS field experts.',
            icon: <FaSatelliteDish />,
            accent: '#9b59b6'
        },
        {
            title: 'Official ISRO/IIRS Certification',
            desc: 'Eligible students earn verifiable institutional course certificates directly from IIRS-ISRO upon fulfilling attendance criteria and passing online examinations.',
            icon: <FaCertificate />,
            accent: '#2ecc71'
        },
        {
            title: 'Cutting-Edge Technical Skills',
            desc: 'Gain foundational and specialized expertise in high-demand domains like Remote Sensing (RS), Geographic Information Systems (GIS), Global Navigation Satellite Systems (GNSS), and Drone/UAV data analysis.',
            icon: <FaLayerGroup />,
            accent: '#3498db'
        },
        {
            title: 'Cost-Free Learning Resources',
            desc: 'Access to premium digital study materials, open-source software tools, recorded video archives, and course handouts completely free of cost.',
            icon: <FaBookReader />,
            accent: '#e67e22'
        },
        {
            title: 'Career & Research Advancement',
            desc: 'Significantly upgrades a student’s technical profile, paving the way for advanced academic research, space-industry internships, and strategic placements in government and private geospatial sectors.',
            icon: <FaRocket />,
            accent: '#e74c3c'
        }
    ];

    const iirsActivitiesCategories = [
        {
            title: 'Live IIRS Outreach Courses',
            badge: 'ISRO E-CLASS',
            icon: <FaLaptopCode />,
            color: '#9b59b6',
            items: [
                'Enrolling students in real-time certification programs directly broadcasted by IIRS-ISRO.',
                'Facilitating technical assessment tests and managing institutional attendance for final certification.'
            ]
        },
        {
            title: 'Workshops & Awareness Camps',
            badge: 'Hands-on',
            icon: <FaAtom />,
            color: '#3498db',
            items: [
                'Organizing short-term technical workshops on advanced space science applications.',
                'Collaborating with regional institutes to host community-level space technology awareness camps.'
            ]
        },
        {
            title: 'Webinars & Interactive Panels',
            badge: 'Live Streaming',
            icon: <FaGlobe />,
            color: '#2ecc71',
            items: [
                'Hosting expert-led digital seminars on trending space tech developments and satellite missions.',
                'Streaming live interactive question-and-answer panels featuring premier ISRO scientists.'
            ]
        },
        {
            title: 'Training Programs & FDPs',
            badge: 'ISRO START',
            icon: <FaGraduationCap />,
            color: '#e67e22',
            items: [
                'Conducting dedicated student sessions under the ISRO START (Space Science and Technology Awareness Training) initiative.',
                'Organizing faculty development programs (FDPs) to upgrade academic teaching standards in geospatial fields.'
            ]
        },
        {
            title: 'Guest Lectures & Industry Connect',
            badge: 'Expert Talks',
            icon: <FaUserTie />,
            color: '#f1c40f',
            items: [
                'Inviting external core industrial professionals and defense geospatial experts for technical talks.',
                'Hosting alumni who are working in drone technology and space start-ups to share field experiences.'
            ]
        },
        {
            title: 'Hands-on GIS & Remote Sensing Labs',
            badge: 'Practical Labs',
            icon: <FaMapMarkedAlt />,
            color: '#e74c3c',
            items: [
                'Running practical laboratory sessions using open-source platforms like QGIS, SAGA, and Google Earth Engine.',
                'Guiding students through real-time satellite data downloading, image processing, and digital map creation.'
            ]
        }
    ];

    const iirsAchievementsList = [
        {
            metric: '8+',
            title: 'Core Digital Courses Completed',
            desc: 'Successfully facilitated and concluded 8+ core digital certification courses since establishment in 2023. Curated curriculum completions spanning GIS foundations, global navigation systems, and advanced remote sensing analytics.',
            icon: <FaAward />,
            color: '#9b59b6'
        },
        {
            metric: '120+',
            title: 'Official ISRO Certificates Earned',
            desc: 'More than 120+ official IIRS-ISRO student completion certificates processed and distributed. Achieved a consistent high passing rate on the final online assessment examinations conducted by IIRS.',
            icon: <FaCertificate />,
            color: '#2ecc71'
        },
        {
            metric: '250+',
            title: 'Student Participants Enrolled',
            desc: 'Enrolled a total of 250+ student participants across multiple technical branches, led actively by the Department of Agricultural Engineering. Sustained a commendable 85%+ overall attendance record during live interactive satellite broadcasting sessions (E-CLASS platform).',
            icon: <FaUsers />,
            color: '#3498db'
        },
        {
            metric: 'Active',
            title: 'Recognized Nodal Centre',
            desc: 'Recognized formally as an Active Nodal Centre by the Indian Institute of Remote Sensing (IIRS), ISRO Dehradun. Received appreciation certificates for the Faculty Coordinator for promoting geospatial literacy and space tech disciplines in the region.',
            icon: <FaTrophy />,
            color: '#f1c40f'
        }
    ];

    const iirsGalleryItems = [
        {
            category: 'Event Photos',
            icon: <FaImages />,
            color: '#9b59b6',
            items: [
                'Inauguration ceremony of the IIRS-ISRO Nodal Centre Chapter at EASA College.',
                'Active student gatherings during the national space awareness programs and START training events.'
            ]
        },
        {
            category: 'Course Screenshots & Labs',
            icon: <FaLaptopCode />,
            color: '#3498db',
            items: [
                'Live interactive streaming sessions on the IIRS E-CLASS online platform.',
                'Group laboratory visuals showing students using open-source QGIS software during hands-on practicals.'
            ]
        },
        {
            category: 'Certificate Distribution',
            icon: <FaAward />,
            color: '#2ecc71',
            items: [
                'Official presentation of IIRS-ISRO certificates to students by the Principal and Head of Department.',
                'Group photograph of certified student candidates alongside Faculty Coordinator Dr. K. RAJAPRIAN.'
            ]
        }
    ];

    const iirsResourcePortals = [
        {
            title: 'Course Calendar & Schedules',
            portalName: 'IIRS EDUSAT News Portal',
            desc: 'Track active digital schedules, module dates, and upcoming space science program streams via the official IIRS EDUSAT News Portal. Access real-time timetables for live interactive sessions broadcasted under the comprehensive geospatial course tracks.',
            link: 'https://www.iirs.gov.in/EDUSAT-News',
            badge: 'Live Schedules',
            icon: <FaCalendarAlt />,
            actionLabel: 'View Course Calendar'
        },
        {
            title: 'Online Registration Guidelines',
            portalName: 'IIRS Online Registration Form',
            desc: 'Complete student enrollment requests exclusively using the formal IIRS Online Registration Form. Select "EASA College of Engineering and Technology" as the designated institutional Nodal Centre to ensure systematic profile verification, assignment monitoring, and internal coordinate approvals.',
            link: 'https://isrolms.iirs.gov.in/edusatregistration/',
            badge: 'Nodal Centre: EASA',
            icon: <FaCheckCircle />,
            actionLabel: 'Open Registration Form'
        },
        {
            title: 'Course Brochures & Curriculum',
            portalName: 'ISRO LMS Resource Portal',
            desc: 'Download official curriculum syllabi, structural modules, and prerequisite system guidelines directly through the ISRO LMS Resource Portal. Review core criteria for attendance, technical assignments, and final certification exam parameters.',
            link: 'https://isrolms.iirs.gov.in/edusatregistration/course_calendar/Course_Brochure_189.pdf',
            badge: 'PDF Download',
            icon: <FaFilePdf />,
            actionLabel: 'Download Course Brochure'
        },
        {
            title: 'Live Virtual Classroom',
            portalName: 'ISRO E-Class Platform',
            desc: 'Connect to daily live learning programs, video workspaces, and lecture archives via the high-performance ISRO E-Class interactive platform for enrolled students and registered nodal coordinators.',
            link: 'https://eclass.iirs.gov.in/',
            badge: 'Classroom Login',
            icon: <FaSatelliteDish />,
            actionLabel: 'Launch E-Class Portal'
        },
        {
            title: 'Main Institutional Domain',
            portalName: 'Indian Institute of Remote Sensing (IIRS)',
            desc: 'Access full institutional announcements, research directives, academic initiatives, satellite datasets, and space program updates via the primary Indian Institute of Remote Sensing (IIRS - ISRO Dehradun) website.',
            link: 'https://www.iirs.gov.in/',
            badge: 'Official Portal',
            icon: <FaGlobe />,
            actionLabel: 'Visit IIRS Website'
        }
    ];

    return (
        <div className="professional-chapters-page" style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)' }}>
            <SEO
                title="Professional Chapters | EASA College"
                description="Explore the various professional chapters at EASA College of Engineering and Technology, including IIRS (ISRO Outreach), IEEE, CSI, ICTACT, QCFI, and YUVA."
            />

            <Navbar />

            <GlobalHero
                pageKey="professional-chapters"
                defaultTitle="PROFESSIONAL CHAPTERS"
                defaultSubtitle="EXCELLENCE THROUGH EMPOWERMENT & SPACE SCIENCE OUTREACH"
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '4rem' }}>
                <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
                    <div style={{ background: 'var(--bg-card)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>Chapters & Outreach Cells</div>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {chapters.map(chapter => (
                                <button
                                    key={chapter.id}
                                    onClick={() => {
                                        setActiveSection(chapter.id);
                                        if (chapter.id === 'iirs') setIirsSubTab('all');
                                        if (chapter.id === 'ieee') setIeeeSubTab('all');
                                    }}
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
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                        <span style={{ fontSize: '1.1rem', opacity: activeSection === chapter.id ? 1 : 0.7 }}>
                                            {chapter.icon}
                                        </span>
                                        <span>{chapter.name}</span>
                                    </div>
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
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                        style={{ fontSize: '3.8rem', color: activeChapter.color || 'var(--secondary)', display: 'inline-block' }}
                                    >
                                        {activeChapter.icon}
                                    </motion.div>

                                    {activeSection === 'iirs' && (
                                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                            <span style={{
                                                background: 'rgba(155, 89, 182, 0.15)',
                                                color: '#a855f7',
                                                border: '1px solid rgba(155, 89, 182, 0.3)',
                                                padding: '0.45rem 1rem',
                                                borderRadius: '30px',
                                                fontWeight: '800',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem'
                                            }}>
                                                <FaRocket size={12} /> ISRO Distance Learning Hub
                                            </span>
                                            <span style={{
                                                background: 'rgba(46, 204, 113, 0.15)',
                                                color: '#2ecc71',
                                                border: '1px solid rgba(46, 204, 113, 0.3)',
                                                padding: '0.45rem 1rem',
                                                borderRadius: '30px',
                                                fontWeight: '800',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem'
                                            }}>
                                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ecc71', display: 'inline-block', boxShadow: '0 0 8px #2ecc71' }}></span>
                                                Active Nodal Centre (Est. 2023)
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <h1 style={{ fontSize: '3.2rem', fontWeight: '900', margin: '0 0 0.5rem 0', lineHeight: '1.1', color: 'var(--text-main)' }}>{activeChapter.name}</h1>
                                <p style={{ fontSize: '1.3rem', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{activeChapter.fullName}</p>
                            </div>

                            {/* ============================================================== */}
                            {/* IIRS SPECIALIZED FULL-FEATURED COMPREHENSIVE VIEW */}
                            {/* ============================================================== */}
                            {activeSection === 'iirs' ? (
                                <div>
                                    {/* Internal Sub-Navigation for IIRS */}
                                    <div style={{
                                        display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem',
                                        padding: '0.8rem', background: 'var(--bg-section)', borderRadius: '20px',
                                        border: '1px solid var(--glass-border)'
                                    }}>
                                        {iirsNavTabs.map(tab => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setIirsSubTab(tab.id)}
                                                style={{
                                                    padding: '0.6rem 1.1rem', borderRadius: '12px', border: 'none',
                                                    fontSize: '0.86rem', fontWeight: '700', cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    background: iirsSubTab === tab.id ? 'var(--secondary)' : 'transparent',
                                                    color: iirsSubTab === tab.id ? 'var(--bg-dark)' : 'var(--text-muted)'
                                                }}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Quick Info Strip */}
                                    <div style={{
                                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '1.2rem', marginBottom: '2.5rem'
                                    }}>
                                        <div style={{ background: 'var(--bg-section)', padding: '1.3rem 1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Chapter / Cell</div>
                                            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '0.3rem' }}>IIRS Outreach Cell</div>
                                        </div>
                                        <div style={{ background: 'var(--bg-section)', padding: '1.3rem 1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Established Year</div>
                                            <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '0.3rem' }}>2023</div>
                                        </div>
                                        <div style={{ background: 'var(--bg-section)', padding: '1.3rem 1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Nodal Centre</div>
                                            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.3rem' }}>EASA College of Engg. & Tech.</div>
                                        </div>
                                        <div style={{ background: 'var(--bg-section)', padding: '1.3rem 1.5rem', borderRadius: '18px', border: '1px solid var(--glass-border)' }}>
                                            <div style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Department Lead</div>
                                            <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '0.3rem' }}>Agricultural Engineering</div>
                                        </div>
                                    </div>

                                    {/* -------------------------------------------------------- */}
                                    {/* CONDENSED FOCUSED ALL OVERVIEW TAB */}
                                    {/* -------------------------------------------------------- */}
                                    {iirsSubTab === 'all' && (
                                        <div style={{ marginBottom: '2rem' }}>
                                            {/* Executive Overview Highlight Card */}
                                            <div className="card-3d-subtle" style={{
                                                background: 'linear-gradient(135deg, var(--bg-section) 0%, rgba(155, 89, 182, 0.08) 100%)',
                                                padding: '2.5rem', borderRadius: '28px', border: '1px solid var(--glass-border)',
                                                marginBottom: '2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(155, 89, 182, 0.15)', color: '#9b59b6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                                        <FaGlobe />
                                                    </div>
                                                    <div>
                                                        <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: 'var(--text-main)' }}>
                                                            Overview & Core Mandate
                                                        </h3>
                                                        <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: '700' }}>
                                                            Indian Institute of Remote Sensing (IIRS - ISRO) Nodal Centre
                                                        </span>
                                                    </div>
                                                </div>
                                                <p style={{ fontSize: '1.12rem', lineHeight: '1.8', color: 'var(--text-muted)', margin: '0 0 2rem 0' }}>
                                                    The <strong>IIRS-ISRO Outreach Programme</strong> at EASA College of Engineering and Technology (Est. 2023) serves as an official institutional distance-learning hub connecting students and faculty with the <strong>Indian Space Research Organisation (ISRO)</strong>. Utilizing satellite and digital broadcasting via the E-CLASS platform, the centre delivers live courses, hands-on GIS workshops, and the ISRO START initiative to build skilled manpower in geospatial technologies and satellite earth observation.
                                                </p>

                                                {/* Key Metrics Strip */}
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.8rem' }}>
                                                    <div style={{ background: 'var(--bg-card)', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#9b59b6' }}>8+</div>
                                                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Courses Completed</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-card)', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#2ecc71' }}>120+</div>
                                                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Certificates Earned</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-card)', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#3498db' }}>250+</div>
                                                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Participants Enrolled</div>
                                                    </div>
                                                    <div style={{ background: 'var(--bg-card)', padding: '1.2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                                                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#f1c40f' }}>85%+</div>
                                                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', marginTop: '0.2rem' }}>E-CLASS Attendance</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Vision & Mission Summary Cards */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                                <div className="card-3d-subtle" style={{ background: 'var(--bg-section)', padding: '1.8rem', borderRadius: '22px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                                        <FaEye style={{ color: '#9b59b6', fontSize: '1.4rem' }} />
                                                        <h4 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Vision</h4>
                                                    </div>
                                                    <p style={{ fontSize: '0.98rem', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>
                                                        To empower academic institutions by mainstreaming advanced space technology and satellite applications into higher education, fostering a self-reliant nation with top-tier scientific capabilities.
                                                    </p>
                                                </div>

                                                <div className="card-3d-subtle" style={{ background: 'var(--bg-section)', padding: '1.8rem', borderRadius: '22px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                                                        <FaBullseye style={{ color: '#2ecc71', fontSize: '1.4rem' }} />
                                                        <h4 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Mission</h4>
                                                    </div>
                                                    <p style={{ fontSize: '0.98rem', lineHeight: '1.6', color: 'var(--text-muted)', margin: 0 }}>
                                                        To continuously strengthen academia through accessible online learning platforms, providing comprehensive, high-quality technical education in space sciences, earth observation data, and remote sensing tools.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Core Focus Domains & Coordinators Snapshot */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                                {/* Technical Pillars */}
                                                <div className="card-3d-subtle" style={{ background: 'var(--bg-section)', padding: '1.8rem', borderRadius: '22px', border: '1px solid var(--glass-border)' }}>
                                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 1rem 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                        <FaLayerGroup style={{ color: 'var(--secondary)' }} /> Core Technical Domains
                                                    </h4>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                                        {['Remote Sensing (RS)', 'Geographic Info Systems (GIS)', 'Global Navigation (GNSS)', 'Drone / UAV Data', 'ISRO START Training', 'QGIS & Earth Engine'].map((tag, tIdx) => (
                                                            <span key={tIdx} style={{
                                                                padding: '0.45rem 0.9rem', borderRadius: '12px',
                                                                background: 'var(--bg-card)', border: '1px solid var(--glass-border)',
                                                                fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)'
                                                            }}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Coordinator Snapshot */}
                                                <div className="card-3d-subtle" style={{ background: 'var(--bg-section)', padding: '1.8rem', borderRadius: '22px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: '0 0 0.8rem 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                            <FaUserTie style={{ color: '#9b59b6' }} /> Faculty In-Charge
                                                        </h4>
                                                        <div style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>Dr. K. RAJAPRIAN</div>
                                                        <div style={{ fontSize: '0.88rem', color: 'var(--secondary)', fontWeight: '700' }}>Associate Professor, Agricultural Engineering</div>
                                                        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Student Coordinator: SANTHOSH G (President, 2nd Yr Agri)</div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.88rem' }}>
                                                        <a href="mailto:rajapriyan.k@ecetonline.com" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <FaEnvelope /> Email
                                                        </a>
                                                        <a href="tel:+917397626874" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <FaPhoneAlt /> +91 73976 26874
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Official Portal Links Bar */}
                                            <div style={{ background: 'var(--bg-section)', padding: '1.6rem 2rem', borderRadius: '22px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                                <div>
                                                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>Official IIRS-ISRO Portals</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Quick access to live courses, LMS registration, and calendar</div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                                    <a href="https://isrolms.iirs.gov.in/edusatregistration/" target="_blank" rel="noopener noreferrer" style={{ padding: '0.6rem 1.1rem', borderRadius: '12px', background: 'var(--secondary)', color: 'var(--bg-dark)', fontWeight: '800', fontSize: '0.88rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span>Student Registration</span>
                                                        <FaExternalLinkAlt size={10} />
                                                    </a>
                                                    <a href="https://eclass.iirs.gov.in/" target="_blank" rel="noopener noreferrer" style={{ padding: '0.6rem 1.1rem', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span>E-Class Login</span>
                                                        <FaExternalLinkAlt size={10} />
                                                    </a>
                                                    <a href="https://www.iirs.gov.in/EDUSAT-News" target="_blank" rel="noopener noreferrer" style={{ padding: '0.6rem 1.1rem', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <span>Course Calendar</span>
                                                        <FaExternalLinkAlt size={10} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* -------------------------------------------------------- */}
                                    {/* DETAILED SUB-TAB VIEWS */}
                                    {/* -------------------------------------------------------- */}

                                    {/* About IIRS-ISRO Outreach Section */}
                                    {iirsSubTab === 'about' && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                <FaGlobe style={{ color: '#9b59b6' }} /> Introduction to IIRS-ISRO Outreach Programme
                                            </h3>
                                            <p style={{ fontSize: '1.12rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                                                The <strong>IIRS-ISRO Outreach Programme</strong> is a premium distance-learning initiative by the <strong>Indian Institute of Remote Sensing (IIRS)</strong>, a constituent unit of the <strong>Indian Space Research Organisation (ISRO)</strong>. Established to bridge the gap between cutting-edge space technology and mainstream academia, the program utilizes state-of-the-art internet and satellite communication tools (such as the E-CLASS platform) to deliver live, interactive, and self-paced digital courses. It primarily targets students, faculty, and researchers across universities to build a robust pool of skilled manpower in geospatial technologies.
                                            </p>

                                            {/* Vision & Mission Cards Grid */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
                                                <div className="card-3d-subtle" style={{ background: 'linear-gradient(135deg, var(--bg-section) 0%, rgba(155, 89, 182, 0.05) 100%)', padding: '2.2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(155, 89, 182, 0.15)', color: '#9b59b6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                                            <FaEye />
                                                        </div>
                                                        <h4 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Vision</h4>
                                                    </div>
                                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
                                                        To empower academic institutions by mainstreaming advanced space technology and satellite applications into higher education, fostering a self-reliant nation equipped with top-tier scientific and technological capabilities.
                                                    </p>
                                                </div>

                                                <div className="card-3d-subtle" style={{ background: 'linear-gradient(135deg, var(--bg-section) 0%, rgba(46, 204, 113, 0.05) 100%)', padding: '2.2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                                            <FaBullseye />
                                                        </div>
                                                        <h4 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Mission</h4>
                                                    </div>
                                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
                                                        To continuously strengthen academia and user segments through accessible online learning platforms, providing comprehensive, high-quality technical education in space sciences, earth observation data, and remote sensing tools.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Objectives */}
                                    {iirsSubTab === 'objectives' && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                                <FaLightbulb style={{ color: 'var(--secondary)', fontSize: '1.8rem' }} />
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: 'var(--text-main)' }}>Centre Objectives</h3>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                {iirsObjectives.map((obj, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="card-3d-subtle"
                                                        style={{
                                                            display: 'flex', alignItems: 'flex-start', gap: '1.2rem',
                                                            background: 'var(--bg-section)', padding: '1.3rem 1.6rem',
                                                            borderRadius: '18px', border: '1px solid var(--glass-border)',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <div style={{
                                                            width: '32px', height: '32px', borderRadius: '50%',
                                                            background: 'rgba(155, 89, 182, 0.15)', color: '#9b59b6',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontWeight: '900', fontSize: '0.9rem', flexShrink: 0
                                                        }}>
                                                            {idx + 1}
                                                        </div>
                                                        <span style={{ fontSize: '1.02rem', fontWeight: '600', color: 'var(--text-main)', lineHeight: '1.6' }}>
                                                            {obj}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Coordinators Section */}
                                    {iirsSubTab === 'coordinators' && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                <FaUsers style={{ color: '#9b59b6' }} /> Faculty & Student Coordinators
                                            </h3>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                                                {/* Faculty Coordinator Card */}
                                                <div
                                                    className="card-3d-subtle"
                                                    style={{
                                                        background: 'linear-gradient(135deg, var(--bg-section) 0%, rgba(155, 89, 182, 0.08) 100%)',
                                                        padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)',
                                                        boxShadow: '0 15px 35px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <div>
                                                        <div style={{
                                                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                                            background: 'rgba(155, 89, 182, 0.15)', color: '#a855f7',
                                                            padding: '0.4rem 0.9rem', borderRadius: '50px', fontSize: '0.78rem',
                                                            fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.2rem'
                                                        }}>
                                                            <FaUserTie /> Faculty Coordinator
                                                        </div>
                                                        <h4 style={{ fontSize: '1.7rem', fontWeight: '900', margin: '0 0 0.4rem 0', color: 'var(--text-main)' }}>
                                                            Dr. K. RAJAPRIAN
                                                        </h4>
                                                        <p style={{ fontSize: '1rem', fontWeight: '800', color: '#9b59b6', margin: '0 0 0.4rem 0', textTransform: 'uppercase' }}>
                                                            ASSOCIATE PROFESSOR
                                                        </p>
                                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '0 0 1.8rem 0', fontWeight: '600' }}>
                                                            Department of Agricultural Engineering<br />
                                                            EASA College of Engineering and Technology
                                                        </p>
                                                    </div>

                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.4rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                                            <FaEnvelope style={{ color: '#9b59b6' }} />
                                                            <a href="mailto:rajapriyan.k@ecetonline.com" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '600' }}>
                                                                rajapriyan.k@ecetonline.com
                                                            </a>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                                            <FaPhoneAlt style={{ color: '#9b59b6' }} />
                                                            <a href="tel:+917397626874" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '700' }}>
                                                                +91 73976 26874
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Student Coordinator Card */}
                                                <div
                                                    className="card-3d-subtle"
                                                    style={{
                                                        background: 'linear-gradient(135deg, var(--bg-section) 0%, rgba(52, 152, 219, 0.08) 100%)',
                                                        padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)',
                                                        boxShadow: '0 15px 35px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                                                    }}
                                                >
                                                    <div>
                                                        <div style={{
                                                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                                            background: 'rgba(52, 152, 219, 0.15)', color: '#38bdf8',
                                                            padding: '0.4rem 0.9rem', borderRadius: '50px', fontSize: '0.78rem',
                                                            fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.2rem'
                                                        }}>
                                                            <FaGraduationCap /> Student Coordinator
                                                        </div>
                                                        <h4 style={{ fontSize: '1.7rem', fontWeight: '900', margin: '0 0 0.4rem 0', color: 'var(--text-main)' }}>
                                                            SANTHOSH G
                                                        </h4>
                                                        <div style={{ display: 'inline-block', background: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.8rem' }}>
                                                            Position: President
                                                        </div>
                                                        <p style={{ fontSize: '1rem', fontWeight: '700', color: '#3498db', margin: '0 0 0.4rem 0' }}>
                                                            2ND YEAR / 3RD SEMESTER
                                                        </p>
                                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '0 0 1.8rem 0', fontWeight: '600' }}>
                                                            Department of Agricultural Engineering<br />
                                                            EASA College of Engineering and Technology
                                                        </p>
                                                    </div>

                                                    <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.4rem' }}>
                                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                                            Responsible for student onboarding, course attendance coordination, and laboratory peer facilitation.
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Activities & Outreach Section */}
                                    {iirsSubTab === 'activities' && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                                                <div>
                                                    <div style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--secondary)', marginBottom: '0.3rem' }}>
                                                        IIRS-ISRO Outreach Centre
                                                    </div>
                                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: 'var(--text-main)' }}>
                                                        Outreach Initiatives & Technical Activities
                                                    </h3>
                                                </div>
                                                <span style={{ background: 'rgba(155, 89, 182, 0.15)', color: '#a855f7', border: '1px solid rgba(155, 89, 182, 0.3)', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: '700', fontSize: '0.85rem' }}>
                                                    6 Active Tracks
                                                </span>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
                                                {iirsActivitiesCategories.map((act, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        whileHover={{ y: -4, borderColor: act.color }}
                                                        className="card-3d-subtle"
                                                        style={{
                                                            background: 'var(--bg-section)', padding: '2rem', borderRadius: '22px',
                                                            border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column',
                                                            justifyContent: 'space-between', gap: '1.2rem', transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <div>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                                                                <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: `${act.color}22`, color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                                                    {act.icon}
                                                                </div>
                                                                <span style={{ fontSize: '0.75rem', fontWeight: '800', padding: '0.3rem 0.75rem', borderRadius: '50px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--secondary)' }}>
                                                                    {act.badge}
                                                                </span>
                                                            </div>
                                                            <h4 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 1rem 0', color: 'var(--text-main)' }}>
                                                                {act.title}
                                                            </h4>
                                                            <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.6' }}>
                                                                {act.items.map((it, iIdx) => (
                                                                    <li key={iIdx}>{it}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Achievements Section */}
                                    {iirsSubTab === 'achievements' && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.8rem' }}>
                                                <FaTrophy style={{ color: '#f1c40f', fontSize: '1.8rem' }} />
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: 'var(--text-main)' }}>Achievements & Recognition</h3>
                                            </div>

                                            {/* Key Metrics Stats Grid */}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                                {iirsAchievementsList.map((ach, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="card-3d-subtle"
                                                        style={{
                                                            background: 'linear-gradient(135deg, var(--bg-section) 0%, rgba(255,255,255,0.02) 100%)',
                                                            padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)',
                                                            display: 'flex', flexDirection: 'column', gap: '0.8rem'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            <div style={{ fontSize: '2.8rem', fontWeight: '900', color: ach.color, lineHeight: '1' }}>
                                                                {ach.metric}
                                                            </div>
                                                            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${ach.color}22`, color: ach.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                                                {ach.icon}
                                                            </div>
                                                        </div>
                                                        <h4 style={{ fontSize: '1.15rem', fontWeight: '800', margin: '0.2rem 0 0 0', color: 'var(--text-main)' }}>
                                                            {ach.title}
                                                        </h4>
                                                        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
                                                            {ach.desc}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Student Benefits Section */}
                                    {iirsSubTab === 'benefits' && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.8rem' }}>
                                                <FaRocket style={{ color: '#e74c3c', fontSize: '1.8rem' }} />
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: 'var(--text-main)' }}>Benefits for Students</h3>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                                {iirsStudentBenefits.map((b, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="card-3d-subtle"
                                                        style={{
                                                            background: 'var(--bg-section)', padding: '2rem', borderRadius: '22px',
                                                            border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column',
                                                            gap: '0.8rem', transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '0.4rem' }}>
                                                            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${b.accent}22`, color: b.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                                                                {b.icon}
                                                            </div>
                                                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                                                                {idx + 1}. {b.title}
                                                            </h4>
                                                        </div>
                                                        <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.7' }}>
                                                            {b.desc}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Gallery Glimpses */}
                                    {iirsSubTab === 'gallery' && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.8rem' }}>
                                                <FaImages style={{ color: '#9b59b6', fontSize: '1.8rem' }} />
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: 'var(--text-main)' }}>Gallery & Event Glimpses</h3>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.8rem' }}>
                                                {iirsGalleryItems.map((g, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="card-3d-subtle"
                                                        style={{
                                                            background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px',
                                                            border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column',
                                                            justifyContent: 'space-between', gap: '1.2rem'
                                                        }}
                                                    >
                                                        <div>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                                                                <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: `${g.color}22`, color: g.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                                                                    {g.icon}
                                                                </div>
                                                                <h4 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                                                                    {g.category}
                                                                </h4>
                                                            </div>
                                                            <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem', color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.6' }}>
                                                                {g.items.map((item, iIdx) => (
                                                                    <li key={iIdx}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--secondary)', fontSize: '0.85rem', fontWeight: '700' }}>
                                                            <span>IIRS Nodal Gallery</span>
                                                            <FaChevronRight size={10} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Resources & Portal Links */}
                                    {iirsSubTab === 'resources' && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.8rem' }}>
                                                <FaDownload style={{ color: 'var(--secondary)', fontSize: '1.8rem' }} />
                                                <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: 'var(--text-main)' }}>Resources & Official Portals</h3>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.8rem' }}>
                                                {iirsResourcePortals.map((res, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="card-3d-subtle"
                                                        style={{
                                                            background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px',
                                                            border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column',
                                                            justifyContent: 'space-between', gap: '1.5rem', transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        <div>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(155, 89, 182, 0.15)', color: '#9b59b6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                                                                    {res.icon}
                                                                </div>
                                                                <span style={{ fontSize: '0.75rem', fontWeight: '800', padding: '0.3rem 0.75rem', borderRadius: '50px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: '#a855f7' }}>
                                                                    {res.badge}
                                                                </span>
                                                            </div>
                                                            <h4 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 0.3rem 0', color: 'var(--text-main)' }}>
                                                                {res.title}
                                                            </h4>
                                                            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--secondary)', marginBottom: '0.8rem' }}>
                                                                {res.portalName}
                                                            </div>
                                                            <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
                                                                {res.desc}
                                                            </p>
                                                        </div>

                                                        <a
                                                            href={res.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                background: 'var(--bg-card)', padding: '0.9rem 1.4rem', borderRadius: '14px',
                                                                border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center',
                                                                justifyContent: 'space-between', textDecoration: 'none', color: 'var(--secondary)',
                                                                fontWeight: '700', fontSize: '0.92rem', transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <span>{res.actionLabel}</span>
                                                            <FaExternalLinkAlt size={12} />
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact Section */}
                                    {iirsSubTab === 'contact' && (
                                        <div>
                                            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1.8rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                                <FaPhoneAlt style={{ color: '#9b59b6' }} /> Contact Details & Institutional Node
                                            </h3>
                                            <div style={{ background: 'var(--bg-section)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                <h4 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '0.8rem' }}>
                                                    IIRS-ISRO Outreach Nodal Centre
                                                </h4>
                                                <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                                    Department of Agricultural Engineering<br />
                                                    EASA College of Engineering and Technology<br />
                                                    NH-47, Palakkad Main Road, Navakkarai (PO), Coimbatore - 641 105, Tamil Nadu
                                                </p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', fontSize: '1.05rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                                                        <FaUserTie style={{ color: '#9b59b6' }} />
                                                        <span>Coordinator: <strong style={{ color: 'var(--text-main)' }}>Dr. K. RAJAPRIAN</strong> (Associate Professor)</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                                                        <FaEnvelope style={{ color: '#9b59b6' }} />
                                                        <a href="mailto:rajapriyan.k@ecetonline.com" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '700' }}>rajapriyan.k@ecetonline.com</a>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                                                        <FaPhoneAlt style={{ color: '#9b59b6' }} />
                                                        <a href="tel:+917397626874" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '700' }}>+91 73976 26874</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : activeSection === 'ieee' ? (
                                /* ============================================================== */
                                /* IEEE Specialized Comprehensive Layout */
                                /* ============================================================== */
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
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                                                <div>
                                                    <div style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '800',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '1.5px',
                                                        color: 'var(--secondary)',
                                                        marginBottom: '0.4rem'
                                                    }}>
                                                        <span>Consolidated Report (2025–2026)</span> • <span>Chapter: IEEE</span>
                                                    </div>
                                                    <h3 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0, color: 'var(--text-main)' }}>
                                                        Major Events & Technical Activities
                                                    </h3>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                    <span style={{
                                                        background: 'rgba(217, 119, 6, 0.12)',
                                                        color: 'var(--secondary)',
                                                        border: '1px solid rgba(217, 119, 6, 0.3)',
                                                        padding: '0.4rem 0.9rem',
                                                        borderRadius: '20px',
                                                        fontWeight: '700',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        10 Total Events
                                                    </span>
                                                    <span style={{
                                                        background: 'rgba(46, 204, 113, 0.15)',
                                                        color: '#2ecc71',
                                                        border: '1px solid rgba(46, 204, 113, 0.3)',
                                                        padding: '0.4rem 0.9rem',
                                                        borderRadius: '20px',
                                                        fontWeight: '700',
                                                        fontSize: '0.85rem'
                                                    }}>
                                                        892+ Participants
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="card-3d-subtle" style={{ background: 'var(--bg-section)', borderRadius: '24px', padding: '1.5rem', border: '1px solid var(--glass-border)', overflowX: 'auto' }}>
                                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                                                    <thead>
                                                        <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                                                            <th style={{ padding: '1rem 0.8rem', fontSize: '0.9rem', fontWeight: '800', color: 'var(--secondary)', width: '60px' }}>S.NO</th>
                                                            <th style={{ padding: '1rem 0.8rem', fontSize: '0.9rem', fontWeight: '800', color: 'var(--secondary)', width: '160px' }}>Date</th>
                                                            <th style={{ padding: '1rem 0.8rem', fontSize: '0.9rem', fontWeight: '800', color: 'var(--secondary)', width: '100px' }}>Duration</th>
                                                            <th style={{ padding: '1rem 0.8rem', fontSize: '0.9rem', fontWeight: '800', color: 'var(--secondary)' }}>Name of the Event</th>
                                                            <th style={{ padding: '1rem 0.8rem', fontSize: '0.9rem', fontWeight: '800', color: 'var(--secondary)', textAlign: 'center', width: '140px' }}>No. of Participants</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {ieeeEvents.map((ev) => (
                                                            <tr key={ev.sNo} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s ease' }} className="table-row-hover">
                                                                <td style={{ padding: '1rem 0.8rem', fontWeight: '700', color: 'var(--secondary)' }}>
                                                                    {ev.sNo}.
                                                                </td>
                                                                <td style={{ padding: '1rem 0.8rem', color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: '600' }}>
                                                                    {ev.date}
                                                                </td>
                                                                <td style={{ padding: '1rem 0.8rem', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                                                                    <span style={{
                                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                                        padding: '0.2rem 0.5rem',
                                                                        borderRadius: '6px',
                                                                        border: '1px solid var(--glass-border)',
                                                                        fontSize: '0.82rem',
                                                                        fontWeight: '600'
                                                                    }}>
                                                                        {ev.duration}
                                                                    </span>
                                                                </td>
                                                                <td style={{ padding: '1rem 0.8rem', fontWeight: '700', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                                                                    {ev.name}
                                                                </td>
                                                                <td style={{ padding: '1rem 0.8rem', textAlign: 'center' }}>
                                                                    <span style={{
                                                                        background: 'rgba(46, 204, 113, 0.15)',
                                                                        color: '#2ecc71',
                                                                        padding: '0.35rem 0.85rem',
                                                                        borderRadius: '20px',
                                                                        fontWeight: '800',
                                                                        fontSize: '0.88rem',
                                                                        display: 'inline-block',
                                                                        border: '1px solid rgba(46, 204, 113, 0.25)'
                                                                    }}>
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
                                                            justifyContent: 'space-between', textDecoration: 'none', transition: 'all 0.3s ease'
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
                                                        <a href="mailto:ieee@ecetonline.com" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '700' }}>ieee@ecetonline.com</a>
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
                                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: (activeChapter.vision || activeChapter.mission) ? '2.5rem' : '4rem', maxWidth: '850px' }}>
                                        {activeChapter.description}
                                    </p>

                                    {/* Vision & Mission Cards Grid if available */}
                                    {(activeChapter.vision || activeChapter.mission) && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
                                            {activeChapter.vision && (
                                                <div className="card-3d-subtle" style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                        <FaEye style={{ color: activeChapter.color || 'var(--secondary)', fontSize: '1.8rem' }} />
                                                        <h4 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Vision</h4>
                                                    </div>
                                                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
                                                        {activeChapter.vision}
                                                    </p>
                                                </div>
                                            )}

                                            {activeChapter.mission && (
                                                <div className="card-3d-subtle" style={{ background: 'var(--bg-section)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                                        <FaBullseye style={{ color: activeChapter.color || 'var(--secondary)', fontSize: '1.8rem' }} />
                                                        <h4 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>Mission</h4>
                                                    </div>
                                                    {Array.isArray(activeChapter.mission) ? (
                                                        <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
                                                            {activeChapter.mission.map((m, i) => <li key={i}>{m}</li>)}
                                                        </ul>
                                                    ) : (
                                                        <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
                                                            {activeChapter.mission}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Department Representatives / Chapter Committee */}
                                    {activeChapter.departmentMembers && activeChapter.departmentMembers.length > 0 && (
                                        <div style={{ marginBottom: '3.5rem' }}>
                                            <h3 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
                                                <FaUsers style={{ color: activeChapter.color || 'var(--secondary)' }} /> Chapter Members & Coordinators
                                            </h3>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
                                                {activeChapter.departmentMembers.map((dept, dIdx) => (
                                                    <div
                                                        key={dIdx}
                                                        className="card-3d-subtle"
                                                        style={{
                                                            background: 'linear-gradient(135deg, var(--bg-section) 0%, rgba(255,255,255,0.02) 100%)',
                                                            borderRadius: '24px',
                                                            padding: '2.2rem',
                                                            border: '1px solid var(--glass-border)',
                                                            boxShadow: '0 15px 35px rgba(0,0,0,0.04)',
                                                            position: 'relative',
                                                            overflow: 'hidden'
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.8rem' }}>
                                                            <div style={{
                                                                width: '48px',
                                                                height: '48px',
                                                                borderRadius: '14px',
                                                                background: 'rgba(231, 76, 60, 0.15)',
                                                                color: activeChapter.color || '#e74c3c',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '1.3rem',
                                                                flexShrink: 0
                                                            }}>
                                                                <FaCogs />
                                                            </div>
                                                            <div>
                                                                <h4 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
                                                                    {dept.department}
                                                                </h4>
                                                                <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: '600' }}>
                                                                    Quality Circle Cell
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {/* Staff In-charge */}
                                                        <div style={{
                                                            background: 'var(--bg-card)',
                                                            border: '1px solid var(--glass-border)',
                                                            borderRadius: '16px',
                                                            padding: '1.2rem 1.4rem',
                                                            marginBottom: '1.4rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            gap: '1rem'
                                                        }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                                                                <div style={{
                                                                    width: '38px',
                                                                    height: '38px',
                                                                    borderRadius: '10px',
                                                                    background: 'rgba(59, 130, 246, 0.15)',
                                                                    color: '#60a5fa',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: '1.05rem',
                                                                    flexShrink: 0
                                                                }}>
                                                                    <FaUserTie />
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                                                        {dept.staffInCharge}
                                                                    </div>
                                                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                                                                        Staff In-charge
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <span style={{
                                                                padding: '0.3rem 0.8rem',
                                                                background: 'rgba(59, 130, 246, 0.12)',
                                                                color: '#93c5fd',
                                                                borderRadius: '50px',
                                                                fontSize: '0.78rem',
                                                                fontWeight: '700',
                                                                whiteSpace: 'nowrap'
                                                            }}>
                                                                Staff i/c
                                                            </span>
                                                        </div>

                                                        {/* Student Members */}
                                                        <div>
                                                            <div style={{
                                                                fontSize: '0.85rem',
                                                                fontWeight: '700',
                                                                color: 'var(--text-muted)',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em',
                                                                marginBottom: '0.8rem',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '0.5rem'
                                                            }}>
                                                                <FaGraduationCap style={{ color: 'var(--secondary)' }} /> Student Members
                                                            </div>
                                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.8rem' }}>
                                                                {dept.students.map((stu, sIdx) => (
                                                                    <div
                                                                        key={sIdx}
                                                                        style={{
                                                                            background: 'var(--bg-card)',
                                                                            border: '1px solid var(--glass-border)',
                                                                            borderRadius: '14px',
                                                                            padding: '1rem',
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            gap: '0.3rem'
                                                                        }}
                                                                    >
                                                                        <span style={{
                                                                            fontSize: '0.75rem',
                                                                            color: 'var(--secondary)',
                                                                            fontWeight: '700',
                                                                            textTransform: 'uppercase'
                                                                        }}>
                                                                            {stu.year}
                                                                        </span>
                                                                        <span style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                                                            {stu.name}
                                                                        </span>
                                                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                                            Student Member
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

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
