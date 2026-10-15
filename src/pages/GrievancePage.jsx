import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import API_BASE_URL from '../api';
import { useToast } from '../context/ToastContext';
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaIdCard,
    FaHeading,
    FaCommentAlt,
    FaSearch,
    FaClock,
    FaShieldAlt,
    FaUserGraduate,
    FaUsers,
    FaChalkboardTeacher,
    FaCity,
    FaCopy,
    FaCheck,
    FaPhoneAlt,
    FaExclamationTriangle,
    FaTicketAlt,
    FaUserFriends,
    FaGraduationCap,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaBriefcase,
    FaHome
} from 'react-icons/fa';

const DEPARTMENTS = [
    "Computer Science and Engineering",
    "Artificial Intelligence and Data Science",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Agricultural Engineering",
    "Biomedical Engineering",
    "Civil Engineering",
    "Master of Business Administration (MBA)",
    "Science and Humanities",
    "Administrative / General"
];

const STAKEHOLDER_DATA = {
    students: {
        id: 'students',
        route: '/grievance-students',
        pageTitle: 'Student Grievance Redressal Form',
        seoTitle: 'Student Grievance Redressal | EASA College',
        heroTitle: 'Student Grievance Redressal Form',
        heroSubtitle: 'Official statutory redressal mechanism for academic, examination, lab, hostel, transport, and campus welfare concerns.',
        badge: 'STUDENT STATUTORY CELL',
        themeColor: '#1B2A6B',
        accentColor: '#3b82f6',
        icon: <FaUserGraduate />,
        categories: [
            "Academic Curriculum & Teaching",
            "Continuous Internal Assessment (CIA) & Examinations",
            "Laboratory Computing & Equipment Availability",
            "Hostel Accommodation, Hygiene & Food Quality",
            "College Bus Transportation & Route Timings",
            "Anti-Ragging & Campus Safety (Zero Tolerance)",
            "Library & Digital E-Resource Access",
            "Tuition Fees, Accounts & Scholarship Office",
            "Sports, Gymnasium & Extracurricular Amenities",
            "Other Student Concern"
        ]
    },
    parents: {
        id: 'parents',
        route: '/grievance-parents',
        pageTitle: 'Parents & Guardians Grievance Form',
        seoTitle: 'Parents Grievance Redressal | EASA College',
        heroTitle: 'Parents & Guardians Grievance Form',
        heroSubtitle: 'Direct, transparent communication channel for parents and guardians to register representations regarding student welfare and institutional facilities.',
        badge: 'PARENT-COLLEGE LIAISON DESK',
        themeColor: '#0f766e',
        accentColor: '#14b8a6',
        icon: <FaUsers />,
        categories: [
            "Ward Academic Progress, Attendance & Mentoring",
            "Hostel Safety, Cleanliness & Living Conditions",
            "College Bus Routes, Stops & Timings",
            "Fee Payment Schedules, Receipts & Clarifications",
            "Campus Security, Anti-Ragging & Discipline",
            "Medical Care & Student Well-Being",
            "General Institutional Suggestion / Concern"
        ]
    },
    faculty: {
        id: 'faculty',
        route: '/grievance-faculty',
        pageTitle: 'Faculty & Staff Grievance Form',
        seoTitle: 'Faculty & Staff Grievance | EASA College',
        heroTitle: 'Faculty & Staff Grievance Redressal Form',
        heroSubtitle: 'Internal institutional mechanism for teaching and non-teaching personnel to register grievances regarding service matters and working conditions.',
        badge: 'STAFF WELFARE & INTERNAL OMBUDSMAN',
        themeColor: '#7c2d12',
        accentColor: '#ea580c',
        icon: <FaChalkboardTeacher />,
        categories: [
            "Academic Timetables & Workload Allocation",
            "Research Facilities, Grants & Lab Equipment",
            "IT Infrastructure, Campus Wi-Fi & ERP Portal",
            "Service Matters, HR & Administrative Approvals",
            "Faculty Amenities & Workspace Facilities",
            "Workplace Environment & Inter-departmental Support",
            "Other Staff Concern"
        ]
    },
    visitors: {
        id: 'visitors',
        route: '/grievance-visitors',
        pageTitle: 'Visitors & Public Grievance Form',
        seoTitle: 'Visitors & Public Grievance | EASA College',
        heroTitle: 'Visitors & Public Grievance Form',
        heroSubtitle: 'Redressal and feedback desk for corporate recruiters, guests, vendors, alumni, and campus visitors.',
        badge: 'PUBLIC RELATIONS & VISITOR DESK',
        themeColor: '#431407',
        accentColor: '#d97706',
        icon: <FaCity />,
        categories: [
            "Campus Security & Entry Facilitation",
            "Placement, HR & Corporate Drive Amenities",
            "Admission Enquiry & Campus Tour Experience",
            "Visitor Parking, Canteen & Public Amenities",
            "Administrative Coordination & Communication",
            "General Public Representation"
        ]
    },
    track: {
        id: 'track',
        route: '/grievance-track',
        pageTitle: 'Track Grievance Status',
        seoTitle: 'Track Grievance Status | EASA College',
        heroTitle: 'Track Grievance Status & Progress',
        heroSubtitle: 'Look up live progress, committee review status, and official Ombudsman remarks using your 6-digit Ticket ID.',
        badge: 'LIVE TICKET TRACKER',
        themeColor: '#1e293b',
        accentColor: '#FCCA26',
        icon: <FaSearch />,
        categories: []
    }
};

const GrievancePage = ({ defaultType }) => {
    const { type: paramType } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { showToast } = useToast();

    // Determine current stakeholder view from path or props
    const detectTab = () => {
        if (defaultType) return defaultType;
        if (paramType) {
            const clean = paramType.toLowerCase();
            if (STAKEHOLDER_DATA[clean]) return clean;
        }
        const path = location.pathname.toLowerCase();
        if (path.includes('students')) return 'students';
        if (path.includes('parents')) return 'parents';
        if (path.includes('faculty')) return 'faculty';
        if (path.includes('visitors')) return 'visitors';
        if (path.includes('track')) return 'track';
        return 'students';
    };

    const currentStakeholder = detectTab();
    const currentConfig = STAKEHOLDER_DATA[currentStakeholder] || STAKEHOLDER_DATA.students;

    // Form data state
    const [formData, setFormData] = useState({
        // Common
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
        priority: 'Normal',

        // Student Specific
        rollNo: '',
        department: '',
        year: '3rd Year',
        semester: 'Semester V',

        // Parent Specific
        relationship: 'Father',
        wardName: '',
        wardRollNo: '',
        wardDepartment: '',
        wardYear: '1st Year',
        residentialStatus: 'Hosteller',
        parentCity: '',

        // Faculty Specific
        employeeId: '',
        designation: 'Assistant Professor',
        facultyDepartment: '',

        // Visitor Specific
        organization: '',
        visitorType: 'Corporate Recruiter / HR',
        visitDate: ''
    });

    const [status, setStatus] = useState('');
    const [lastSubmission, setLastSubmission] = useState(null);
    const [copiedTicket, setCopiedTicket] = useState(false);

    // Tracking state
    const [trackQuery, setTrackQuery] = useState('');
    const [trackingResults, setTrackingResults] = useState(null);
    const [trackingLoading, setTrackingLoading] = useState(false);
    const [hasTracked, setHasTracked] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setStatus('');
    }, [currentStakeholder]);

    const handleSwitchStakeholder = (newTab) => {
        const targetRoute = STAKEHOLDER_DATA[newTab]?.route || '/grievance';
        navigate(targetRoute);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, phone: digitsOnly }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Common validations
        if (!formData.name?.trim()) {
            showToast('Please enter your full name', 'warning', 'Name Required');
            return;
        }
        if (!formData.email?.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            showToast('Please enter a valid email address', 'warning', 'Invalid Email');
            return;
        }
        const cleanPhone = (formData.phone || '').replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            showToast('Please enter a valid 10-digit mobile number', 'warning', 'Invalid Phone');
            return;
        }

        // Specific validations
        if (currentStakeholder === 'students') {
            if (!formData.rollNo?.trim()) {
                showToast('Please enter your College Roll / Register Number', 'warning', 'Roll No Required');
                return;
            }
            if (!formData.department) {
                showToast('Please select your Department', 'warning', 'Department Required');
                return;
            }
        } else if (currentStakeholder === 'parents') {
            if (!formData.wardName?.trim()) {
                showToast("Please enter your ward (student)'s full name", 'warning', 'Ward Name Required');
                return;
            }
            if (!formData.wardDepartment) {
                showToast("Please select your ward's department", 'warning', 'Department Required');
                return;
            }
        } else if (currentStakeholder === 'faculty') {
            if (!formData.employeeId?.trim()) {
                showToast('Please enter your Staff / Employee ID', 'warning', 'Employee ID Required');
                return;
            }
            if (!formData.facultyDepartment) {
                showToast('Please select your Department', 'warning', 'Department Required');
                return;
            }
        }

        if (!formData.subject?.trim()) {
            showToast('Please provide a subject line', 'warning', 'Subject Required');
            return;
        }
        if (!formData.message?.trim() || formData.message.trim().length < 15) {
            showToast('Please provide a detailed grievance statement (minimum 15 characters)', 'warning', 'Details Required');
            return;
        }

        setStatus('submitting');

        // Compile payload
        const payload = {
            name: formData.name,
            email: formData.email,
            phone: cleanPhone,
            type: currentConfig.pageTitle.replace(' Form', ''),
            category: formData.category || currentConfig.categories[0] || 'General',
            subject: formData.subject,
            message: formData.message,
            priority: formData.priority || 'Normal',

            // Specific assignments
            rollNo: currentStakeholder === 'students' ? formData.rollNo : undefined,
            department: currentStakeholder === 'students' ? formData.department
                : currentStakeholder === 'parents' ? formData.wardDepartment
                : currentStakeholder === 'faculty' ? formData.facultyDepartment
                : undefined,
            year: currentStakeholder === 'students' ? formData.year : undefined,
            wardName: currentStakeholder === 'parents' ? formData.wardName : undefined,
            wardRollNo: currentStakeholder === 'parents' ? formData.wardRollNo : undefined,
            employeeId: currentStakeholder === 'faculty' ? formData.employeeId : undefined,
            designation: currentStakeholder === 'faculty' ? formData.designation : undefined,
            organization: currentStakeholder === 'visitors' ? formData.organization : undefined
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/grievances`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus('success');
                setLastSubmission({
                    ticketId: result.ticketId,
                    type: payload.type,
                    name: formData.name,
                    category: payload.category,
                    subject: formData.subject,
                    date: new Date().toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                });
                showToast(`Grievance registered! Ticket ID: ${result.ticketId}`, 'success', 'Submitted');
            } else {
                setStatus('error');
                showToast(result.error || 'Failed to submit grievance', 'error', 'Error');
            }
        } catch (error) {
            console.error("Submission error:", error);
            setStatus('error');
            showToast('Network error. Please try again.', 'error', 'Network Error');
        }
    };

    const handleTrackSubmit = async (e) => {
        e.preventDefault();
        const query = trackQuery.trim();
        if (!query) {
            showToast('Enter your Ticket ID, Mobile, or Email to track', 'warning', 'Query Required');
            return;
        }

        setTrackingLoading(true);
        setHasTracked(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/grievances/track/${encodeURIComponent(query)}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setTrackingResults(data);
            } else if (data && data._id) {
                setTrackingResults([data]);
            } else {
                setTrackingResults([]);
            }
        } catch (err) {
            console.error("Tracking query error:", err);
            setTrackingResults([]);
            showToast('Failed to check status. Check network connection.', 'error', 'Error');
        } finally {
            setTrackingLoading(false);
        }
    };

    const copyTicket = (id) => {
        navigator.clipboard.writeText(id);
        setCopiedTicket(true);
        showToast('Ticket ID copied to clipboard!', 'info', 'Copied');
        setTimeout(() => setCopiedTicket(false), 3000);
    };

    return (
        <div style={{ background: 'var(--bg-main, #f8fafc)', minHeight: '100vh', color: 'var(--text-main, #0f172a)' }}>
            <SEO
                title={currentConfig.seoTitle}
                description={currentConfig.heroSubtitle}
            />
            <Navbar />

            {/* DYNAMIC HERO BANNER PER STAKEHOLDER */}
            <GlobalHero
                pageKey="grievance"
                defaultTitle={currentConfig.heroTitle}
                defaultSubtitle={currentConfig.heroSubtitle}
            />

            {/* Statutory Compliance Bar */}
            <div style={{ background: '#1B2A6B', color: '#ffffff', padding: '0.85rem 1.5rem', borderBottom: '3px solid #FCCA26' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaShieldAlt style={{ color: '#FCCA26', fontSize: '1.25rem' }} />
                        <span style={{ fontWeight: '700' }}>
                            {currentConfig.badge} • Governed by Statutory Ombudsman & AICTE Regulations
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1.2rem', opacity: 0.9 }}>
                        <span>⏱️ <strong>Resolution SLA:</strong> 3–5 Working Days</span>
                        <span>🔒 <strong>Confidentiality:</strong> Guaranteed</span>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.25rem 5rem 1.25rem' }}>

                {/* VISIBLE FORM SELECTOR NAVIGATION BAR */}
                <div style={{
                    background: '#ffffff',
                    borderRadius: '16px',
                    padding: '0.8rem',
                    marginBottom: '2.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #e2e8f0'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.8rem 0.8rem', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Select Redressal Portal:
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#1B2A6B', fontWeight: '700' }}>
                            Active: {currentConfig.pageTitle}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.6rem', marginTop: '0.6rem' }}>
                        {Object.values(STAKEHOLDER_DATA).map(item => {
                            const isCurrent = currentStakeholder === item.id;
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSwitchStakeholder(item.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        justifyContent: 'center',
                                        padding: '0.8rem 1rem',
                                        borderRadius: '10px',
                                        border: isCurrent ? '2px solid #1B2A6B' : '1px solid #e2e8f0',
                                        background: isCurrent ? '#1B2A6B' : '#f8fafc',
                                        color: isCurrent ? '#ffffff' : '#334155',
                                        fontWeight: '700',
                                        fontSize: '0.88rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: isCurrent ? '0 6px 16px rgba(27, 42, 107, 0.2)' : 'none'
                                    }}
                                >
                                    <span style={{ color: isCurrent ? '#FCCA26' : '#1B2A6B', fontSize: '1rem' }}>
                                        {item.icon}
                                    </span>
                                    {item.id === 'students' && 'Students Form'}
                                    {item.id === 'parents' && 'Parents Form'}
                                    {item.id === 'faculty' && 'Faculty Form'}
                                    {item.id === 'visitors' && 'Visitors Form'}
                                    {item.id === 'track' && 'Track Status'}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ============================================================== */}
                {/* VIEW A: TRACK STATUS                                           */}
                {/* ============================================================== */}
                {currentStakeholder === 'track' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: '#ffffff',
                            borderRadius: '20px',
                            padding: 'clamp(1.5rem, 4vw, 3rem)',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                    >
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#eff6ff', color: '#1B2A6B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.5rem' }}>
                                <FaSearch />
                            </div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                                Live Grievance Tracking Desk
                            </h2>
                            <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem' }}>
                                Enter your official 6-digit Ticket ID (e.g. <code>ECET-GRV-814920</code>), registered mobile number, or email address.
                            </p>
                        </div>

                        <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '0.8rem', maxWidth: '600px', margin: '0 auto 2.5rem', flexWrap: 'wrap' }}>
                            <input
                                type="text"
                                placeholder="Enter Ticket ID / Phone / Email"
                                value={trackQuery}
                                onChange={(e) => setTrackQuery(e.target.value)}
                                style={{
                                    flex: '1',
                                    minWidth: '240px',
                                    padding: '0.95rem 1.2rem',
                                    borderRadius: '12px',
                                    border: '2px solid #cbd5e1',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                disabled={trackingLoading}
                                style={{
                                    padding: '0.95rem 1.8rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: '#1B2A6B',
                                    color: '#ffffff',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {trackingLoading ? 'Searching...' : <><FaSearch /> Check Status</>}
                            </button>
                        </form>

                        {hasTracked && (
                            <div>
                                {trackingResults && trackingResults.length > 0 ? (
                                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                                        {trackingResults.map((item, idx) => (
                                            <div key={item._id || idx} style={{ background: '#f8fafc', borderRadius: '16px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                                                    <div>
                                                        <span style={{ background: '#1B2A6B', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '800', fontFamily: 'monospace' }}>
                                                            {item.ticketId || 'ECET-RECORD'}
                                                        </span>
                                                        <h4 style={{ margin: '0.5rem 0 0.2rem 0', fontSize: '1.2rem', fontWeight: '800' }}>{item.subject}</h4>
                                                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                                            Stakeholder: <strong>{item.type}</strong> • Category: <strong>{item.category}</strong>
                                                        </span>
                                                    </div>
                                                    <span style={{
                                                        padding: '4px 14px',
                                                        borderRadius: '9999px',
                                                        fontWeight: '800',
                                                        fontSize: '0.85rem',
                                                        background: item.status === 'Resolved' ? '#dcfce7' : item.status === 'Under Review' ? '#fef3c7' : '#fee2e2',
                                                        color: item.status === 'Resolved' ? '#15803d' : item.status === 'Under Review' ? '#b45309' : '#b91c1c'
                                                    }}>
                                                        ● {item.status || 'Pending'}
                                                    </span>
                                                </div>

                                                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#475569' }}>
                                                    <strong>Grievance Statement:</strong> {item.message}
                                                    {item.resolutionNotes && (
                                                        <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px solid #e2e8f0', color: '#166534', fontWeight: '600' }}>
                                                            Committee Notes: {item.resolutionNotes}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem', background: '#f8fafc', borderRadius: '12px' }}>
                                        <FaExclamationCircle style={{ color: '#d97706', fontSize: '2rem', marginBottom: '0.5rem' }} />
                                        <p style={{ margin: 0, fontWeight: '700' }}>No records found for "{trackQuery}"</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    /* ============================================================== */
                    /* VIEW B: DISTINCT STAKEHOLDER FORMS                            */
                    /* ============================================================== */
                    <motion.div
                        key={currentStakeholder}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: '#ffffff',
                            borderRadius: '20px',
                            padding: 'clamp(1.8rem, 4vw, 3.5rem)',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {status === 'success' && lastSubmission ? (
                                <motion.div
                                    key="success-box"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '2rem 1rem' }}
                                >
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
                                        <FaCheckCircle size={44} />
                                    </div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0f172a', margin: '0 0 0.5rem 0' }}>
                                        {currentConfig.pageTitle} Registered
                                    </h2>
                                    <p style={{ color: '#64748b', maxWidth: '520px', margin: '0 auto 2rem' }}>
                                        Your representation has been logged and assigned to the Grievance Redressal Committee.
                                    </p>

                                    <div style={{
                                        maxWidth: '460px',
                                        margin: '0 auto 2rem',
                                        padding: '1.5rem',
                                        background: '#1B2A6B',
                                        color: '#ffffff',
                                        borderRadius: '16px',
                                        textAlign: 'left'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#FCCA26', letterSpacing: '1px' }}>
                                                OFFICIAL TICKET ID
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => copyTicket(lastSubmission.ticketId)}
                                                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                                            >
                                                {copiedTicket ? '✓ Copied' : 'Copy'}
                                            </button>
                                        </div>
                                        <div style={{ fontSize: '1.8rem', fontWeight: '900', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                            {lastSubmission.ticketId}
                                        </div>
                                        <hr style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '0.8rem 0' }} />
                                        <div style={{ fontSize: '0.85rem', opacity: 0.9 }}>
                                            <div><strong>Complainant:</strong> {lastSubmission.name}</div>
                                            <div><strong>Category:</strong> {lastSubmission.category}</div>
                                            <div><strong>Subject:</strong> {lastSubmission.subject}</div>
                                            <div><strong>Date:</strong> {lastSubmission.date}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setTrackQuery(lastSubmission.ticketId);
                                                handleSwitchStakeholder('track');
                                            }}
                                            style={{ padding: '0.8rem 1.8rem', borderRadius: '10px', background: '#1B2A6B', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                                        >
                                            Track Status
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setStatus('')}
                                            style={{ padding: '0.8rem 1.8rem', borderRadius: '10px', background: '#ffffff', color: '#334155', border: '1px solid #cbd5e1', fontWeight: '700', cursor: 'pointer' }}
                                        >
                                            Submit Another
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>

                                    {/* FORM TITLE BANNER */}
                                    <div style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '12px',
                                            background: '#eff6ff',
                                            color: '#1B2A6B',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.8rem'
                                        }}>
                                            {currentConfig.icon}
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', color: '#1B2A6B', textTransform: 'uppercase' }}>
                                                {currentConfig.badge}
                                            </span>
                                            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0f172a', margin: '0.2rem 0' }}>
                                                {currentConfig.pageTitle}
                                            </h2>
                                            <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                                                {currentConfig.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* -------------------------------------------------------- */}
                                    {/* 1. STAKEHOLDER SPECIFIC SECTION                           */}
                                    {/* -------------------------------------------------------- */}

                                    {/* 1A. STUDENT FORM SECTION */}
                                    {currentStakeholder === 'students' && (
                                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: '800', color: '#1B2A6B', margin: '0 0 1.2rem 0' }}>
                                                <FaGraduationCap /> 1. Student Academic Details
                                            </h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                                                <div>
                                                    <label className="grv-field-label">Student Full Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="e.g. Anandha Kumar S"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Register No / Roll No *</label>
                                                    <input
                                                        type="text"
                                                        name="rollNo"
                                                        required
                                                        value={formData.rollNo}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 720522104018"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Department / Branch *</label>
                                                    <select
                                                        name="department"
                                                        required
                                                        value={formData.department}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    >
                                                        <option value="">-- Choose Department --</option>
                                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Current Year of Study *</label>
                                                    <select
                                                        name="year"
                                                        value={formData.year}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    >
                                                        <option value="1st Year">1st Year (B.E. / B.Tech / MBA)</option>
                                                        <option value="2nd Year">2nd Year (B.E. / B.Tech / MBA)</option>
                                                        <option value="3rd Year">3rd Year (B.E. / B.Tech)</option>
                                                        <option value="4th Year">4th Year (B.E. / B.Tech)</option>
                                                        <option value="Alumni">Recent Graduate / Alumni</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Student Email ID *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="student@ecetonline.com"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Student Mobile (10 Digits) *</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        maxLength={10}
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 9876543210"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 1B. PARENT FORM SECTION */}
                                    {currentStakeholder === 'parents' && (
                                        <div style={{ background: '#f0fdfa', padding: '1.5rem', borderRadius: '14px', border: '1px solid #ccfbf1' }}>
                                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: '800', color: '#0f766e', margin: '0 0 1.2rem 0' }}>
                                                <FaUsers /> 1. Parent & Ward (Student) Details
                                            </h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                                                <div>
                                                    <label className="grv-field-label">Parent / Guardian Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Parent/Guardian full name"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Relationship to Student</label>
                                                    <select
                                                        name="relationship"
                                                        value={formData.relationship}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    >
                                                        <option value="Father">Father</option>
                                                        <option value="Mother">Mother</option>
                                                        <option value="Guardian">Local Guardian</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Parent Contact Mobile *</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        maxLength={10}
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="10-digit mobile number"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Parent Email ID *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="parent@example.com"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Ward / Student's Name *</label>
                                                    <input
                                                        type="text"
                                                        name="wardName"
                                                        required
                                                        value={formData.wardName}
                                                        onChange={handleChange}
                                                        placeholder="Student's name studying at EASA"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Ward's Roll / Register No</label>
                                                    <input
                                                        type="text"
                                                        name="wardRollNo"
                                                        value={formData.wardRollNo}
                                                        onChange={handleChange}
                                                        placeholder="e.g. 720523106024"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Ward's Department *</label>
                                                    <select
                                                        name="wardDepartment"
                                                        required
                                                        value={formData.wardDepartment}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    >
                                                        <option value="">-- Select Ward's Dept --</option>
                                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Residential Status</label>
                                                    <select
                                                        name="residentialStatus"
                                                        value={formData.residentialStatus}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    >
                                                        <option value="Hosteller">College Hosteller</option>
                                                        <option value="Day Scholar">Day Scholar (College Bus / Private)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 1C. FACULTY FORM SECTION */}
                                    {currentStakeholder === 'faculty' && (
                                        <div style={{ background: '#fff7ed', padding: '1.5rem', borderRadius: '14px', border: '1px solid #ffedd5' }}>
                                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: '800', color: '#c2410c', margin: '0 0 1.2rem 0' }}>
                                                <FaChalkboardTeacher /> 1. Faculty / Staff Employment Profile
                                            </h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                                                <div>
                                                    <label className="grv-field-label">Faculty / Staff Full Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Faculty name"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Staff / Employee ID *</label>
                                                    <input
                                                        type="text"
                                                        name="employeeId"
                                                        required
                                                        value={formData.employeeId}
                                                        onChange={handleChange}
                                                        placeholder="e.g. ECET-FAC-102"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Cadre / Designation</label>
                                                    <select
                                                        name="designation"
                                                        value={formData.designation}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    >
                                                        <option value="Professor">Professor</option>
                                                        <option value="Associate Professor">Associate Professor</option>
                                                        <option value="Assistant Professor">Assistant Professor</option>
                                                        <option value="Lab Technician / Instructor">Lab Technician / Instructor</option>
                                                        <option value="Administrative Staff">Administrative Staff</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Department *</label>
                                                    <select
                                                        name="facultyDepartment"
                                                        required
                                                        value={formData.facultyDepartment}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    >
                                                        <option value="">-- Choose Department --</option>
                                                        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Official Email ID *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="name@ecetonline.com"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Contact Phone (10 Digits) *</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        maxLength={10}
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="Mobile phone number"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* 1D. VISITOR FORM SECTION */}
                                    {currentStakeholder === 'visitors' && (
                                        <div style={{ background: '#fefce8', padding: '1.5rem', borderRadius: '14px', border: '1px solid #fef08a' }}>
                                            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: '800', color: '#854d0e', margin: '0 0 1.2rem 0' }}>
                                                <FaCity /> 1. Visitor & Organization Particulars
                                            </h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
                                                <div>
                                                    <label className="grv-field-label">Visitor Full Name *</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Enter your name"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Organization / Company Name</label>
                                                    <input
                                                        type="text"
                                                        name="organization"
                                                        value={formData.organization}
                                                        onChange={handleChange}
                                                        placeholder="e.g. Infosys, TCS, Self"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Visitor Category</label>
                                                    <select
                                                        name="visitorType"
                                                        value={formData.visitorType}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    >
                                                        <option value="Corporate Recruiter / HR">Corporate Recruiter / HR</option>
                                                        <option value="Guest Lecturer / Academician">Guest Lecturer / Academician</option>
                                                        <option value="Prospective Parent / Student">Prospective Parent / Student</option>
                                                        <option value="Vendor / Supplier">Vendor / Supplier</option>
                                                        <option value="Alumni Visitor">Alumni Visitor</option>
                                                        <option value="General Public">General Public</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Contact Mobile *</label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        required
                                                        maxLength={10}
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        placeholder="10-digit mobile"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Email Address *</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="name@company.com"
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="grv-field-label">Date of Campus Visit</label>
                                                    <input
                                                        type="date"
                                                        name="visitDate"
                                                        value={formData.visitDate}
                                                        onChange={handleChange}
                                                        className="grv-input-ctrl"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* -------------------------------------------------------- */}
                                    {/* 2. GRIEVANCE PARTICULARS SECTION                          */}
                                    {/* -------------------------------------------------------- */}
                                    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem', fontWeight: '800', color: '#1B2A6B', margin: '0 0 1.2rem 0' }}>
                                            <FaHeading /> 2. Grievance Particulars & Statement
                                        </h4>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem', marginBottom: '1.2rem' }}>
                                            <div>
                                                <label className="grv-field-label">Specific Grievance Category *</label>
                                                <select
                                                    name="category"
                                                    required
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="grv-input-ctrl"
                                                >
                                                    <option value="">-- Choose Relevant Category --</option>
                                                    {currentConfig.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="grv-field-label">Priority / Urgency Level</label>
                                                <select
                                                    name="priority"
                                                    value={formData.priority}
                                                    onChange={handleChange}
                                                    className="grv-input-ctrl"
                                                >
                                                    <option value="Normal">Normal — Standard Review (3-5 Days)</option>
                                                    <option value="High">High — Urgent (24-48 Hours)</option>
                                                    <option value="Urgent">Emergency / Safety Concern</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '1.2rem' }}>
                                            <label className="grv-field-label">Grievance Subject / Brief Title *</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Brief title summarizing the issue"
                                                className="grv-input-ctrl"
                                            />
                                        </div>

                                        <div>
                                            <label className="grv-field-label">Detailed Grievance Statement *</label>
                                            <textarea
                                                name="message"
                                                required
                                                rows="5"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Please describe your grievance in detail including dates, locations, personnel involved (if any), and your desired resolution. All details are kept strictly confidential..."
                                                className="grv-input-ctrl"
                                                style={{ resize: 'vertical', minHeight: '130px' }}
                                            />
                                        </div>
                                    </div>

                                    {/* SUBMIT BUTTON */}
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            style={{
                                                width: '100%',
                                                padding: '1.2rem',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: '#1B2A6B',
                                                color: '#ffffff',
                                                fontWeight: '800',
                                                fontSize: '1.1rem',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                boxShadow: '0 8px 24px rgba(27, 42, 107, 0.3)'
                                            }}
                                        >
                                            {status === 'submitting' ? (
                                                <span>Submitting to Grievance Redressal Cell...</span>
                                            ) : (
                                                <>
                                                    <FaShieldAlt style={{ color: '#FCCA26' }} />
                                                    Submit {currentConfig.pageTitle}
                                                </>
                                            )}
                                        </button>
                                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '0.8rem' }}>
                                            🔒 Under AICTE & UGC regulations, all submissions receive an automated Tracking Ticket ID and are resolved impartially.
                                        </p>
                                    </div>

                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* HELPLINE & STATUTORY DESK CARDS */}
                <div style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                            <FaEnvelope style={{ color: '#1B2A6B', fontSize: '1.3rem' }} />
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>Direct Email Desk</h4>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>
                            For written representations:
                        </p>
                        <a href="mailto:grievance@ecetonline.com" style={{ color: '#1B2A6B', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>
                            grievance@ecetonline.com
                        </a>
                    </div>

                    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                            <FaPhoneAlt style={{ color: '#b45309', fontSize: '1.3rem' }} />
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>Ombudsman Phone</h4>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>
                            Campus administration line:
                        </p>
                        <a href="tel:+914222367800" style={{ color: '#1B2A6B', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>
                            +91 422 236 7800
                        </a>
                    </div>

                    <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.6rem' }}>
                            <FaExclamationTriangle style={{ color: '#b91c1c', fontSize: '1.3rem' }} />
                            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>Anti-Ragging Squad</h4>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.5rem 0' }}>
                            National 24x7 Toll-Free:
                        </p>
                        <a href="tel:18001805522" style={{ color: '#b91c1c', fontWeight: '800', fontSize: '0.9rem', textDecoration: 'none' }}>
                            1800-180-5522
                        </a>
                    </div>
                </div>

            </div>

            <Footer />

            <style>{`
                .grv-field-label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #334155;
                    margin-bottom: 0.4rem;
                }
                .grv-input-ctrl {
                    width: 100%;
                    padding: 0.85rem 1rem;
                    background: #ffffff;
                    border: 1.5px solid #cbd5e1;
                    border-radius: 10px;
                    color: #0f172a;
                    font-size: 0.92rem;
                    font-family: inherit;
                    outline: none;
                    transition: all 0.2s ease;
                }
                .grv-input-ctrl:focus {
                    border-color: #1B2A6B;
                    box-shadow: 0 0 0 3px rgba(27, 42, 107, 0.12);
                }
            `}</style>
        </div>
    );
};

export default GrievancePage;
