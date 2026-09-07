import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ManagementSection from '../components/ManagementSection';
import LeadershipHierarchy from '../components/LeadershipHierarchy';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Award, 
    BookOpen, 
    Building, 
    CheckCircle2, 
    FileText, 
    GraduationCap, 
    Layers, 
    ShieldCheck, 
    Users, 
    Briefcase, 
    Settings, 
    Compass, 
    Dumbbell, 
    Home as HomeIcon, 
    Landmark 
} from 'lucide-react';

function AdministrationPage() {
    useScrollAnimation();
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const roleCategories = [
        { id: 'all', label: 'All Roles' },
        { id: 'executive', label: 'Apex Leadership' },
        { id: 'examination', label: 'Autonomous & Exam Cell' },
        { id: 'academic', label: 'Academic Deans & HODs' },
        { id: 'quality', label: 'Quality & Governance' },
        { id: 'operations', label: 'Admin & Career Wings' },
        { id: 'auxiliary', label: 'Campus & Student Living' }
    ];

    const rolesData = [
        {
            category: 'executive',
            icon: Landmark,
            title: "Chairperson",
            subtitle: "Apex Strategic & Institutional Governance",
            color: "#3b82f6",
            points: [
                "Envisions and steers the overarching institutional vision, policy framework, and long-range strategic masterplan.",
                "Presides over apex Governing Council deliberations to ensure institutional growth aligns with global technological benchmarks.",
                "Oversees capital allocations, major infrastructure investments, and transformative academic initiatives.",
                "Fosters strategic alliances with global universities, government bodies, and premier industrial consortia."
            ]
        },
        {
            category: 'executive',
            icon: ShieldCheck,
            title: "Secretary",
            subtitle: "Statutory, Legal & Corporate Administration",
            color: "#f97316",
            points: [
                "Oversees statutory approvals, regulatory compliances, and legal mandates from statutory authorities (AICTE, Anna University, UGC, DOTE).",
                "Directs institutional human resource policies, talent governance, executive appointments, and staff welfare schemes.",
                "Supervises financial budgeting, audited balance sheets, capital funds, and organizational sustainability.",
                "Guides large-scale campus infrastructure projects, construction developments, and vendor negotiations."
            ]
        },
        {
            category: 'executive',
            icon: Compass,
            title: "Correspondent",
            subtitle: "Institutional Outreach, Affiliations & Admissions",
            color: "#eab308",
            points: [
                "Acts as the official representative and liaison between the college and university/government directorates.",
                "Directs student admissions planning, scholarship programs, brand outreach, and public relations campaigns.",
                "Facilitates institutional approvals, sanctioning of new engineering disciplines, and annual intake renewals.",
                "Promotes community development, philanthropic outreach, and stakeholder engagement across student and parent communities."
            ]
        },
        {
            category: 'executive',
            icon: GraduationCap,
            title: "Principal",
            subtitle: "Chief Executive & Academic Officer",
            color: "#6366f1",
            points: [
                "Leads complete academic administration, curriculum execution, faculty development, and educational quality across all branches.",
                "Implements autonomous academic regulations, Board of Studies recommendations, and Academic Council directives.",
                "Fosters a culture of research, patent generation, external funding, industry MoUs, and startup incubations.",
                "Ensures strict campus discipline, student safety, anti-ragging measures, and continuous faculty appraisal."
            ]
        },
        {
            category: 'examination',
            icon: FileText,
            title: "Controller of Examinations (COE)",
            subtitle: "Autonomous Evaluation & Assessment Apex",
            color: "#0284c7",
            points: [
                "Directs the Autonomous Examination Cell for confidential planning, question bank creation, and end-semester examinations.",
                "Conducts central valuation camps, moderation boards, result processing, and timely publication of grades.",
                "Manages the generation of transcripts, grade sheets, provisional certificates, and academic audit reports.",
                "Convenes the Examination Malpractice Committee and enforces strict examination integrity protocols."
            ]
        },
        {
            category: 'examination',
            icon: CheckCircle2,
            title: "Deputy & Assistant Controllers (DCOE / ACOE)",
            subtitle: "Operational Exam Management & Records",
            color: "#0ea5e9",
            points: [
                "Organize student exam registrations, hall ticket generation, exam venue allocations, and invigilation schedules.",
                "Manage Continuous Internal Assessment (CIA) marks collation and secure integration with the autonomous database.",
                "Coordinate confidential printing, coding/decoding of answer scripts, and post-valuation scrutiny.",
                "Supervise exam administrative staff and facilitate revaluation / photocopy applications."
            ]
        },
        {
            category: 'academic',
            icon: Layers,
            title: "Academic Deans (Computing / Electrical / Mechanical / S&H)",
            subtitle: "Cluster-Level Academic & Research Leadership",
            color: "#0d9488",
            points: [
                "Oversee curriculum modernization, interdisciplinary projects, and laboratory modernization across respective departments.",
                "Drive research grant applications, national/international publications, consultancy projects, and student hackathons.",
                "Review academic delivery, pedagogical techniques, continuous assessments, and Outcome-Based Education (OBE) attainment.",
                "Mentor department Heads of Departments (HODs) and encourage faculty upskilling through FDPs and certifications."
            ]
        },
        {
            category: 'academic',
            icon: Users,
            title: "Heads of Departments (HODs)",
            subtitle: "Departmental Operations & Faculty Supervision",
            color: "#14b8a6",
            points: [
                "Direct day-to-day departmental academic workflows, timetable scheduling, subject allocations, and syllabus completion.",
                "Coordinate departmental laboratories, equipment calibration, software licenses, and safety compliance.",
                "Supervise teaching faculty, teaching assistants, system administrators, and lab technicians.",
                "Organize guest lectures, industrial visits, alumni interactions, and student value-added certificate courses."
            ]
        },
        {
            category: 'academic',
            icon: BookOpen,
            title: "Faculty, Teaching Assistants & Technical Staff",
            subtitle: "Classroom Mentoring & Laboratory Instruction",
            color: "#10b981",
            points: [
                "Deliver high-impact classroom instruction utilizing modern ICT tools and interactive learning methods.",
                "Maintain course files, laboratory manuals, question banks, and student continuous assessment portfolios.",
                "Act as class proctors/mentors to track individual student academic progress, attendance, and career aspirations.",
                "Manage laboratory practical sessions, student mini-projects, hardware maintenance, and software configurations."
            ]
        },
        {
            category: 'quality',
            icon: Award,
            title: "Dean - IQAC (Internal Quality Assurance Cell)",
            subtitle: "Accreditation, Quality Benchmarks & Audits",
            color: "#16a34a",
            points: [
                "Designs and monitors quality parameters for academic and administrative operations across the institution.",
                "Leads institutional preparations for NAAC, NBA, NIRF, ISO certifications, and Autonomous compliance reviews.",
                "Conducts periodic internal and external Academic and Administrative Audits (AAA) for continuous improvement.",
                "Collects, analyzes, and implements institutional feedback from students, parents, alumni, and employers."
            ]
        },
        {
            category: 'quality',
            icon: Building,
            title: "Dean - Autonomous",
            subtitle: "Autonomous Curriculum & Regulatory Framework",
            color: "#22c55e",
            points: [
                "Formulates academic regulations, curriculum frameworks, credit systems, and choice-based credit system (CBCS) rules.",
                "Coordinates Board of Studies (BOS) meetings across all engineering departments to review emerging industry trends.",
                "Organizes Academic Council meetings for syllabus ratifications, academic policies, and value-added course approvals.",
                "Ensures strict compliance with University Grants Commission (UGC) and Anna University autonomous guidelines."
            ]
        },
        {
            category: 'quality',
            icon: Users,
            title: "Dean - Student Affairs",
            subtitle: "Student Welfare, Campus Life & Societies",
            color: "#84cc16",
            points: [
                "Supervises student clubs, professional societies (IEEE, CSI, IETE, SAE), and extracurricular campus organizations.",
                "Coordinates annual cultural fests (Dhruva Fest), technical symposiums, youth welfare initiatives, and talent showcases.",
                "Manages student grievance redressal cells, anti-ragging committees, and gender sensitization forums.",
                "Facilitates psychological counseling, leadership training, and orientation programs for freshers."
            ]
        },
        {
            category: 'operations',
            icon: Briefcase,
            title: "Training & Placement Cell",
            subtitle: "Corporate Alliances & Career Enablement",
            color: "#f97316",
            points: [
                "Builds partnerships with top MNCs, Tier-1 recruiters, and emerging startups for on-campus and virtual hiring drives.",
                "Conducts comprehensive placement training programs covering aptitude, coding, group discussions, and mock interviews.",
                "Facilitates paid industry internships, industrial apprenticeships, and live student industrial projects.",
                "Maintains comprehensive placement analytics and tracks alumni career progression in global industries."
            ]
        },
        {
            category: 'operations',
            icon: Settings,
            title: "Human Resources (HR) Department",
            subtitle: "Talent Acquisition & Employee Services",
            color: "#ea580c",
            points: [
                "Heads recruitment campaigns for faculty, research scholars, and technical support staff.",
                "Manages employee onboarding, orientation, service books, leaves, and biometric attendance records.",
                "Coordinates annual performance appraisals, promotion benchmarks, and merit recognitions.",
                "Oversees staff welfare policies, health insurance, and professional development support."
            ]
        },
        {
            category: 'operations',
            icon: Building,
            title: "Administration, Accounts & ERP Office",
            subtitle: "Institutional Maintenance, Transport & Finance",
            color: "#ca8a04",
            points: [
                "Administers college finance, tuition fee collection, scholarship disbursements, and statutory audits.",
                "Maintains institutional ERP/Nodal portal, student databases, certificate verifications, and bonafide records.",
                "Manages college fleet transportation, route planning, bus passes, vehicle maintenance, and driver safety.",
                "Supervises campus security, housekeeping, power backups, civil maintenance, and water conservation facilities."
            ]
        },
        {
            category: 'auxiliary',
            icon: Dumbbell,
            title: "Physical Education Director (PED)",
            subtitle: "Sports, Athletics & Fitness Development",
            color: "#9333ea",
            points: [
                "Organizes inter-college, zonal, Anna University, and national-level sports tournaments and athletic meets.",
                "Maintains indoor sports complexes, fitness gymnasium, football/cricket grounds, and athletic tracks.",
                "Conducts sports coaching camps, fitness programs, and yoga wellness sessions for students and staff.",
                "Recognizes and awards talented sports achievers through fee concessions and athletic sponsorships."
            ]
        },
        {
            category: 'auxiliary',
            icon: BookOpen,
            title: "Central Library & Librarian",
            subtitle: "Knowledge Resources, E-Journals & Digital Archives",
            color: "#7e22ce",
            points: [
                "Manages the central library repository comprising thousands of print volumes, reference titles, and technical handbooks.",
                "Maintains subscriptions to IEEE Xplore, DELNET, ScienceDirect, and national digital library resources.",
                "Implements automated RFID / barcode circulation systems and digital OPAC catalog search services.",
                "Provides quiet research carrels, reprography facilities, and multimedia digital learning terminals."
            ]
        },
        {
            category: 'auxiliary',
            icon: HomeIcon,
            title: "Hostel Wardens (Boys & Girls)",
            subtitle: "Residential Welfare, Safety & Dining",
            color: "#a855f7",
            points: [
                "Oversee hostel room allotments, residential discipline, study hours, and peaceful campus living environment.",
                "Supervise hygienic kitchen food preparation, nutrition quality, mess committees, and dining halls.",
                "Enforce 24/7 campus security, biometric gate entry, student medical care, and emergency first-aid protocols.",
                "Coordinate recreational common rooms, indoor games, Wi-Fi connectivity, and student wellness support."
            ]
        }
    ];

    const filteredRoles = activeTab === 'all' 
        ? rolesData 
        : rolesData.filter(r => r.category === activeTab);

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="Administration | EASA College" description="Explore the Organizational Structure and comprehensive administrative governance framework at EASA College of Engineering and Technology." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="administration"
                defaultTitle="Administration"
                defaultSubtitle="Efficient administrative structure and governance for academic excellence."
            />

            <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem' }}>
                
                {/* 1. MANAGEMENT TEAM SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '5.5rem' }}
                >
                    <ManagementSection
                        category="administration"
                        title="Administrative Team"
                        subtitle="Ensuring a smooth and efficient campus environment for academic success."
                        isStatic={true}
                    />
                </motion.div>

                {/* 2. ORGANIZATIONAL STRUCTURE FLOW CHART SECTION */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'var(--bg-card)',
                        borderRadius: '32px',
                        padding: '4rem 2rem',
                        border: '1px solid var(--glass-border)',
                        textAlign: 'center',
                        marginBottom: '6rem',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ maxWidth: '900px', margin: '0 auto 2.5rem auto' }}>
                        <span style={{ 
                            fontSize: '0.85rem', 
                            fontWeight: '800', 
                            letterSpacing: '2px', 
                            textTransform: 'uppercase', 
                            color: 'var(--primary)',
                            background: 'rgba(30, 58, 138, 0.1)',
                            padding: '0.4rem 1.2rem',
                            borderRadius: '30px',
                            display: 'inline-block',
                            marginBottom: '1rem'
                        }}>
                            Governance Framework
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem' }}>
                            Organizational Structure
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                            A transparent and well-defined hierarchical flow chart illustrating the administrative reporting lines, autonomous wings, academic dean clusters, and operational departments of EASA College.
                        </p>
                    </div>

                    <LeadershipHierarchy />
                </motion.div>

                {/* 3. ROLES & RESPONSIBILITIES BREAKDOWN SECTION */}
                <div style={{ marginBottom: '6rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
                    >
                        <span style={{ 
                            fontSize: '0.85rem', 
                            fontWeight: '800', 
                            letterSpacing: '2px', 
                            textTransform: 'uppercase', 
                            color: 'var(--secondary)',
                            background: 'rgba(13, 148, 136, 0.1)',
                            padding: '0.4rem 1.2rem',
                            borderRadius: '30px',
                            display: 'inline-block',
                            marginBottom: '1rem'
                        }}>
                            Functional Portfolio
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', marginBottom: '1rem' }}>
                            Roles & Key Responsibilities
                        </h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '850px', margin: '0 auto', lineHeight: '1.8' }}>
                            Detailed breakdown of key duties, administrative portfolios, and operational mandates for every leadership level in our organizational chart.
                        </p>

                        {/* CATEGORY FILTER TABS */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '0.6rem',
                            marginTop: '2.5rem'
                        }}>
                            {roleCategories.map(cat => {
                                const isActive = activeTab === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveTab(cat.id)}
                                        style={{
                                            padding: '0.65rem 1.4rem',
                                            borderRadius: '50px',
                                            border: isActive ? '1px solid var(--secondary)' : '1px solid var(--glass-border)',
                                            background: isActive ? 'var(--secondary)' : 'var(--bg-card)',
                                            color: isActive ? '#ffffff' : 'var(--text-main)',
                                            fontWeight: '700',
                                            fontSize: '0.9rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease',
                                            boxShadow: isActive ? '0 4px 15px rgba(13, 148, 136, 0.3)' : 'none'
                                        }}
                                        onMouseOver={(e) => {
                                            if (!isActive) e.currentTarget.style.borderColor = 'var(--secondary)';
                                        }}
                                        onMouseOut={(e) => {
                                            if (!isActive) e.currentTarget.style.borderColor = 'var(--glass-border)';
                                        }}
                                    >
                                        {cat.label}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* ROLES GRID */}
                    <motion.div 
                        layout
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
                            gap: '2rem' 
                        }}
                    >
                        <AnimatePresence>
                            {filteredRoles.map((role, idx) => {
                                const IconComponent = role.icon;
                                return (
                                    <motion.div
                                        key={role.title}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, delay: idx * 0.04 }}
                                        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                                        style={{
                                            background: 'var(--bg-card)',
                                            borderRadius: '24px',
                                            border: '1px solid var(--glass-border)',
                                            padding: '2.5rem 2rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                        }}
                                    >
                                        {/* Accent top bar */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '4px',
                                            background: role.color
                                        }} />

                                        {/* Header with Icon */}
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '1.5rem' }}>
                                            <div style={{
                                                width: '52px',
                                                height: '52px',
                                                borderRadius: '16px',
                                                background: `${role.color}18`,
                                                color: role.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                border: `1px solid ${role.color}35`
                                            }}>
                                                <IconComponent size={26} />
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.3rem 0', lineHeight: '1.3' }}>
                                                    {role.title}
                                                </h3>
                                                <p style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>
                                                    {role.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Points list */}
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            padding: 0, 
                                            margin: 0, 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            gap: '0.85rem' 
                                        }}>
                                            {role.points.map((point, pIdx) => (
                                                <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                                                    <span style={{ 
                                                        color: role.color, 
                                                        marginTop: '4px',
                                                        display: 'inline-flex',
                                                        flexShrink: 0
                                                    }}>
                                                        <CheckCircle2 size={16} />
                                                    </span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* 4. ADMINISTRATIVE PILLARS */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '6rem' }}>
                    {[
                        {
                            title: "Administrative Departments",
                            desc: "Responsible for managing smooth day-to-day operations, including institutional finances, human resources, asset management, and statutory reporting."
                        },
                        {
                            title: "Student Support Services",
                            desc: "Dedicated to student holistic success through academic mentoring, career counseling, grievance redressal, placement services, and scholarship facilitation."
                        },
                        {
                            title: "Infrastructure & Living Management",
                            desc: "Ensures advanced smart classrooms, modern engineering laboratories, central computing centers, campus fleet transport, and secure student residential hostels."
                        }
                    ].map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            style={{
                                padding: '3.5rem 3rem',
                                background: 'linear-gradient(to bottom right, var(--bg-card), var(--bg-section))',
                                borderRadius: '32px',
                                border: '1px solid var(--glass-border)',
                                boxShadow: '0 15px 40px rgba(0,0,0,0.03)',
                                minHeight: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.2rem', color: 'var(--secondary)', borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem' }}>
                                {section.title}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem', margin: 0 }}>
                                {section.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* 5. CORE OPERATIONS OFFICE BANNER */}
                <div style={{ padding: '5rem 3rem', background: 'var(--bg-section)', borderRadius: '40px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.2rem' }}>Core Operations Office</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '800px', margin: '0 auto', marginBottom: '3.5rem' }}>
                        Providing robust operational systems to empower our academic fraternity and students in their continuous pursuit of engineering excellence.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '2.2rem' }}>📅</span>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Academic Calendar</h4>
                            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>Efficient scheduling and institutional planning.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '2.2rem' }}>👨‍💼</span>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Recruitment & HR</h4>
                            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>Attracting and empowering top academic talent.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '2.2rem' }}>🏗️</span>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Campus Maintenance</h4>
                            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>Maintaining world-class academic infrastructure.</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '2.2rem' }}>📋</span>
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>Regulatory Compliance</h4>
                            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>Ensuring adherence to AICTE, Anna University & UGC norms.</p>
                        </div>
                    </div>
                </div>

            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                @media (max-width: 768px) {
                    .container {
                        padding: 3rem 1rem !important;
                    }
                }
            `}</style>
        </div>
    );
}

export default AdministrationPage;

