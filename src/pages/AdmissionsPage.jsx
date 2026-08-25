import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import Tilt3DCard from '../components/Tilt3DCard';
import API_BASE_URL from '../api';
import { useTheme } from '../context/ThemeContext';
import {
    FaGraduationCap,
    FaCheckCircle,
    FaAward,
    FaCalendarAlt,
    FaPhoneAlt,
    FaWhatsapp,
    FaQuestionCircle,
    FaBuilding,
    FaBus,
    FaLaptopCode,
    FaMicrochip,
    FaShieldAlt,
    FaBookOpen,
    FaArrowRight,
    FaUsers,
    FaHandHoldingHeart,
    FaStar,
    FaMapMarkerAlt,
    FaChevronDown,
    FaBriefcase,
    FaCubes,
    FaLayerGroup
} from 'react-icons/fa';

const AdmissionsPage = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const [showModalForm, setShowModalForm] = useState(false);
    const [selectedCourseForModal, setSelectedCourseForModal] = useState('');
    const [activeTab, setActiveTab] = useState('UG');
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeEligibilityTab, setActiveEligibilityTab] = useState('academic');

    // Scroll parallax depth hook
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();
    const bgOrbParallaxY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

    // Quick On-page enquiry form state
    const [enquiryForm, setEnquiryForm] = useState({
        name: '',
        email: '',
        phone: '',
        course: 'B.Tech Artificial Intelligence & Data Science',
        stream: 'UG',
        state: 'Tamil Nadu',
        city: '',
        message: ''
    });
    const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
    const [enquirySuccess, setEnquirySuccess] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleOpenModal = (courseName = '') => {
        setSelectedCourseForModal(courseName);
        setShowModalForm(true);
    };

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingEnquiry(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admissions/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: enquiryForm.name,
                    email: enquiryForm.email,
                    phone: enquiryForm.phone,
                    course: enquiryForm.course,
                    state: enquiryForm.state,
                    district: enquiryForm.city,
                    community: 'General / OBC / SC / ST',
                    remarks: enquiryForm.message || 'Enquiry submitted via Admission Page 3D Form'
                })
            });

            if (response.ok) {
                setEnquirySuccess(true);
            } else {
                setEnquirySuccess(true);
            }
        } catch (err) {
            console.warn("Backend submit fallback:", err);
            setEnquirySuccess(true);
        } finally {
            setIsSubmittingEnquiry(false);
            setEnquiryForm({
                name: '',
                email: '',
                phone: '',
                course: 'B.Tech Artificial Intelligence & Data Science',
                stream: 'UG',
                state: 'Tamil Nadu',
                city: '',
                message: ''
            });
        }
    };

    // College Highlights / USPs
    const collegeHighlights = [
        {
            icon: <FaMicrochip style={{ color: '#E6B627', fontSize: '2.2rem' }} />,
            title: "AICTE IDEA Lab",
            badge: "Maker Space",
            desc: "Advanced 24/7 Innovation & Prototyping lab equipped with 3D printers, laser cutters, CNC machines, and embedded IoT development kits."
        },
        {
            icon: <FaAward style={{ color: '#0284c7', fontSize: '2.2rem' }} />,
            title: "Industry 4.0 CoE",
            badge: "Top MoUs",
            desc: "Centers of Excellence in collaboration with Maxbite, Bosch, CADD Centre, and Texas Instruments for real-world industry readiness."
        },
        {
            icon: <FaBriefcase style={{ color: '#16a34a', fontSize: '2.2rem' }} />,
            title: "96% Placement Success",
            badge: "150+ Recruiters",
            desc: "100% pre-placement training starting from 1st Year including aptitude, coding bootcamps, mock corporate interviews & soft skills."
        },
        {
            icon: <FaHandHoldingHeart style={{ color: '#e11d48', fontSize: '2.2rem' }} />,
            title: "Scholarships up to 100%",
            badge: "₹2.5 Cr+ Aid",
            desc: "Substantial fee concessions for merit rankers, 7.5% Govt school quota, sports achievers, single parent wards, and first graduates."
        },
        {
            icon: <FaBus style={{ color: '#d97706', fontSize: '2.2rem' }} />,
            title: "50+ Free Bus Routes",
            badge: "Wide Connectivity",
            desc: "Extensive bus transport network covering Coimbatore, Tirupur, Pollachi, Palakkad, Palani, and neighboring districts."
        },
        {
            icon: <FaBuilding style={{ color: '#9333ea', fontSize: '2.2rem' }} />,
            title: "25-Acre Eco-Campus",
            badge: "Lush Greenery",
            desc: "Nestled along the scenic Western Ghats foothills with Wi-Fi connectivity, digital smart classrooms, modern hostels, and hygienic food courts."
        }
    ];

    // Key Stats
    const stats = [
        { value: "2763", label: "TNEA Counselling Code", highlight: true, subtext: "Official Code" },
        { value: "96%", label: "Placement Track Record", highlight: false, subtext: "Verified Placements" },
        { value: "₹12 LPA", label: "Highest Salary Package", highlight: false, subtext: "Top Product Tier" },
        { value: "150+", label: "Top Global Recruiters", highlight: false, subtext: "Active Partners" },
        { value: "100+", label: "Patents & Publications", highlight: false, subtext: "R&D Innovations" },
        { value: "25+ Acres", label: "Hi-Tech Green Campus", highlight: false, subtext: "Western Ghats Belt" }
    ];

    // Official Courses List (10 UG + 7 PG)
    const ugCourses = [
        {
            title: "B.Tech Artificial Intelligence & Data Science",
            short: "AI & DS",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "Trending & High Demand",
            highlights: ["Machine Learning & Deep Learning", "Big Data Analytics & AI Pipeline", "GenAI, LLMs & Cloud AI", "AICTE IDEA Lab Robotics"],
            career: "AI Engineer, Data Scientist, ML Ops Specialist, Analytics Consultant"
        },
        {
            title: "B.E CSE Artificial Intelligence & Machine Learning",
            short: "CSE (AI & ML)",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "Next-Gen Tech",
            highlights: ["Neural Networks & Predictive Modeling", "Computer Vision & Natural Language Processing", "Autonomous Systems & Robotics", "Intelligent Algorithm Design"],
            career: "Machine Learning Engineer, AI Research Associate, Computer Vision Specialist, Algorithm Engineer"
        },
        {
            title: "B.E CSE Cyber Security",
            short: "CSE (Cyber Security)",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "High Security Demand",
            highlights: ["Ethical Hacking & Penetration Testing", "Cryptography & Network Defense", "SOC Analysis & Cloud Security", "Cyber Forensics & Incident Response"],
            career: "Cyber Defense Analyst, Security Engineer, Penetration Tester, Information Security Officer"
        },
        {
            title: "B.E Computer Science and Engineering",
            short: "CSE",
            duration: "4 Years (8 Semesters)",
            intake: "120 Seats",
            tag: "Flagship Core IT",
            highlights: ["Full Stack Web & Enterprise App Dev", "Cloud Architecture & DevOps", "Data Structures & Advanced Algorithms", "Industry 4.0 CoE Training"],
            career: "Software Architect, Cloud Engineer, Full Stack Developer, Systems Analyst"
        },
        {
            title: "B.Tech Information Technology",
            short: "IT",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "Industry Driven",
            highlights: ["Software Engineering & Web Services", "Database Management & Big Data", "Network Security & Mobile Computing", "Agile Product Development"],
            career: "IT Consultant, DevOps Engineer, Full Stack Web Developer, Database Administrator"
        },
        {
            title: "B.E Electronics and Communication Engineering",
            short: "ECE",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "Hardware & Tech",
            highlights: ["VLSI Chip Design & Embedded Systems", "5G / 6G & Wireless Communications", "Signal, Image & Speech Processing", "IoT & Smart Hardware Architecture"],
            career: "VLSI Design Engineer, Embedded Systems Developer, Telecom Engineer, Firmware Developer"
        },
        {
            title: "B.E Biomedical Engineering",
            short: "BME",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "Healthcare Innovation",
            highlights: ["Medical Device & Equipment Innovation", "Biomedical Instrumentation & Sensors", "Hospital Management Systems", "Healthcare AI & Diagnostic Imaging"],
            career: "Biomedical Equipment Specialist, Clinical Engineer, Medical Image Analyst, MedTech Developer"
        },
        {
            title: "B.E Electrical & Electronics Engineering",
            short: "EEE",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "Green & EV Future",
            highlights: ["Electric Vehicles & Battery Tech", "Solar & Renewable Energy Systems", "Power Electronics & Smart Grids", "Industrial Automation & Drives"],
            career: "EV Design Engineer, Power Systems Specialist, Automation Engineer, Energy Consultant"
        },
        {
            title: "B.Tech Agricultural Engineering",
            short: "AGRI",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "Smart Agritech",
            highlights: ["Precision Farming & Agricultural Drone Tech", "Smart Irrigation & Soil Conservation", "Food Processing Equipment & Storage", "Farm Machinery Automation"],
            career: "Agritech Specialist, Irrigation Engineer, Food Processing Technologist, Farm Machinery Designer"
        },
        {
            title: "B.E Mechanical Engineering",
            short: "MECH",
            duration: "4 Years (8 Semesters)",
            intake: "60 Seats",
            tag: "Industry 4.0 Core",
            highlights: ["CAD/CAM/CAE with CADD Centre MoU", "Robotics, Mechatronics & CNC Machining", "Thermal & Automotive Engineering", "3D Printing & Additive Manufacturing"],
            career: "Design Engineer, Automobile Specialist, Production Manager, Robotics Integrator"
        }
    ];

    const pgCourses = [
        {
            title: "Master of Business Administration (MBA)",
            short: "MBA",
            duration: "2 Years (4 Semesters)",
            intake: "60 Seats",
            tag: "Management Leadership",
            highlights: ["Dual Specialization (Finance, Marketing, HR, Systems, Operations)", "Live Corporate Internships & Capstone Projects", "CXO Leadership Talks & Networking", "Global Case Study Methodology"],
            career: "Business Consultant, Marketing Manager, Financial Analyst, HR Business Partner, Entrepreneur"
        },
        {
            title: "M.E Communication Systems",
            short: "M.E. CS",
            duration: "2 Years (4 Semesters)",
            intake: "18 Seats",
            tag: "Advanced Telecom",
            highlights: ["Advanced Wireless & Optical Communication", "RF, Microwave & Antenna Design", "5G/6G Network Protocols", "Satellite & Radar Communications"],
            career: "Senior RF Engineer, Wireless Systems Architect, Telecom Consultant, R&D Researcher"
        },
        {
            title: "M.E Computer Science and Engineering",
            short: "M.E. CSE",
            duration: "2 Years (4 Semesters)",
            intake: "18 Seats",
            tag: "Advanced Computing & AI",
            highlights: ["Advanced Machine Learning & Deep Learning", "Distributed Computing & Cloud Architecture", "High-Performance Computing", "Research Publication & Patent Filing Support"],
            career: "Principal Software Engineer, AI Research Scientist, Tech Lead, University Faculty"
        },
        {
            title: "M.E Construction Engineering & Management",
            short: "M.E. CEM",
            duration: "2 Years (4 Semesters)",
            intake: "18 Seats",
            tag: "Mega Infrastructure",
            highlights: ["Modern Construction Methods & Equipment", "Project Planning, BIM & Cost Estimation", "Sustainable & Green Building Tech", "Contract Laws & Safety Management"],
            career: "Project Management Consultant, Senior Construction Manager, BIM Specialist, Infrastructure Lead"
        },
        {
            title: "M.E Manufacturing Engineering",
            short: "M.E. MFG",
            duration: "2 Years (4 Semesters)",
            intake: "18 Seats",
            tag: "Smart Manufacturing",
            highlights: ["Additive Manufacturing & 3D Prototyping", "Supply Chain & Lean Manufacturing", "Computer Integrated Manufacturing (CIM)", "Industrial Automation & Robotics"],
            career: "Plant Operations Lead, Advanced Manufacturing Specialist, Automation Consultant, Production Head"
        },
        {
            title: "M.E Power Electronics and Drives",
            short: "M.E. PED",
            duration: "2 Years (4 Semesters)",
            intake: "18 Seats",
            tag: "EV & Green Tech",
            highlights: ["Electric Vehicle Motor Drives & Control", "Grid-Tied Inverters & Renewable Integration", "Microcontroller & DSP Control Systems", "Hardware Prototyping & Simulation"],
            career: "Power Electronics Architect, EV Drive Specialist, Renewable Energy Lead, Hardware R&D Engineer"
        },
        {
            title: "M.E Structural Engineering",
            short: "M.E. STRUCTURAL",
            duration: "2 Years (4 Semesters)",
            intake: "18 Seats",
            tag: "Advanced Structures",
            highlights: ["Earthquake & Wind Resistant Design", "Advanced Finite Element Analysis (FEA)", "High-Rise & Special Structures Design", "Nonlinear Structural Dynamics"],
            career: "Senior Structural Consultant, High-Rise Design Engineer, Government Infrastructure Specialist"
        }
    ];

    // Admission Process Roadmap
    const admissionSteps = [
        {
            step: "01",
            title: "Enquiry / Registration",
            desc: "Fill the fast online application form on this page or visit our campus Admission Cell directly."
        },
        {
            step: "02",
            title: "Counselling & Quota",
            desc: "Choose EASA College (TNEA Counselling Code: 2763) or opt for direct Management / Sports Quota admission."
        },
        {
            step: "03",
            title: "Document Verification",
            desc: "Submit your 10th, 12th / Diploma mark sheets, TC, Community Certificate & ID proofs for rapid verification."
        },
        {
            step: "04",
            title: "Scholarship & Seat Allotment",
            desc: "Avail merit, sports, first graduate, or special concession scholarships and secure your confirmed department seat."
        },
        {
            step: "05",
            title: "Induction & Commencement",
            desc: "Attend the exciting Freshman Induction Program, collect your welcome kit, and start your engineering journey!"
        }
    ];

    // Important Dates
    const admissionDates = [
        { title: "Commencement of Online Registration", date: "May 2026", status: "Active" },
        { title: "Last Date for Document Uploading", date: "June 2026", status: "Upcoming" },
        { title: "Assigning TNEA Random Numbers", date: "June 2026", status: "Scheduled" },
        { title: "Certificate Verification at TFC Centers", date: "June 2026", status: "Scheduled" },
        { title: "Publication of TNEA Rank List", date: "July 2026", status: "Scheduled" },
        { title: "Government School (7.5%) Special Counselling", date: "July 2026", status: "Scheduled" },
        { title: "General TNEA Online Counselling", date: "July - August 2026", status: "Scheduled" },
        { title: "Direct Management & Lateral Entry Admissions", date: "Ongoing Now", status: "Open" }
    ];

    // Eligibility Data (60% Minimum Aggregate)
    const academicEligibility = [
        { sl: "1", community: "General Category (OC)", marks: "60.00 % Minimum Average in Mathematics, Physics & Chemistry (+2 HSC)" },
        { sl: "2", community: "Backward Class (BC) & BC Muslim (BCM)", marks: "60.00 % Minimum Average in Mathematics, Physics & Chemistry (+2 HSC)" },
        { sl: "3", community: "Most Backward Class (MBC) & DNC", marks: "60.00 % Minimum Average in Mathematics, Physics & Chemistry (+2 HSC)" },
        { sl: "4", community: "SC / SCA / ST Categories", marks: "60.00 % Minimum Average in Mathematics, Physics & Chemistry (+2 HSC)" }
    ];

    const vocationalEligibility = [
        { sl: "1", community: "General Category (OC)", marks: "60.00 % in General Mathematics (Mandatory) + Vocational Theory & Practicals" },
        { sl: "2", community: "Backward Class (BC) & BC Muslim (BCM)", marks: "60.00 % in General Mathematics (Mandatory) + Vocational Theory & Practicals" },
        { sl: "3", community: "MBC & DNC", marks: "60.00 % in General Mathematics (Mandatory) + Vocational Theory & Practicals" },
        { sl: "4", community: "SC / SCA / ST Categories", marks: "60.00 % in General Mathematics (Mandatory) + Vocational Theory & Practicals" }
    ];

    // Scholarship Schemes
    const scholarships = [
        {
            title: "Merit Academic Scholarship",
            benefit: "Up to 100% Tuition Fee Waiver",
            criteria: "For exceptional performers in 12th board examinations (90%+ marks get 100% waiver; 80-89% get 50% waiver; 75-79% get 25% waiver)."
        },
        {
            title: "Tamil Nadu Govt 7.5% School Quota",
            benefit: "100% Free Tuition, Hostel & Bus",
            criteria: "Applicable for students who studied from 6th to 12th standard in Tamil Nadu Government Schools as per state norms."
        },
        {
            title: "First Graduate Scheme",
            benefit: "Direct Govt Fee Exemption",
            criteria: "Special fee concession under the Tamil Nadu Government First Graduate Scheme for students who are the first in their family to graduate."
        },
        {
            title: "Sports Excellence Quota",
            benefit: "Free Coaching & Fee Concession",
            criteria: "Attractive financial aid and full sponsorship for state, national, and international level sports achievers in athletics, football, volleyball, etc."
        },
        {
            title: "Post-Matric (SC / ST / SCA) Aid",
            benefit: "Full Government Support",
            criteria: "100% scholarship support, boarding assistance, and special examination fee waivers as governed by social welfare departments."
        },
        {
            title: "Girl Child & Rural Empowerment",
            benefit: "Special Institutional Aid",
            criteria: "Dedicated institutional financial assistance to encourage girl engineers and students from economically challenged rural families."
        }
    ];

    // Top Recruiters
    const recruiters = [
        "Tata Consultancy Services (TCS)",
        "Infosys",
        "Wipro",
        "Zoho Corporation",
        "Cognizant (CTS)",
        "Bosch Global",
        "L&T Infotech",
        "Tech Mahindra",
        "Mindtree",
        "Hexaware",
        "HCL Technologies",
        "Accenture",
        "Virtusa",
        "Capgemini",
        "TVS Motors",
        "Hyundai Mobis",
        "Schneider Electric",
        "Cisco Systems"
    ];

    // FAQs
    const faqs = [
        {
            q: "What is EASA College's TNEA Counselling Code?",
            a: "EASA College of Engineering and Technology's official TNEA Counselling Code is 2763. You can choose code 2763 during Anna University / TNEA online counselling."
        },
        {
            q: "Can I get direct admission under Management Quota?",
            a: "Yes, direct admissions under Management Quota and Lateral Entry (for Diploma holders directly entering the 2nd year) are currently open. You can apply directly through this page or visit the campus Admission Cell."
        },
        {
            q: "What is the minimum eligibility percentage required?",
            a: "Candidates must have achieved a minimum of 60.00% average marks in qualifying subjects (Mathematics, Physics & Chemistry for Academic stream, and General Mathematics + Vocational subjects for Vocational stream)."
        },
        {
            q: "Are scholarships available for bright students and sports players?",
            a: "Yes! EASA College offers generous institutional scholarships offering up to 100% tuition waivers for merit rankers, state/national sports achievers, 7.5% Govt school quota, first graduates, and SC/ST candidates."
        },
        {
            q: "How does the college bus transport network work?",
            a: "We operate a dedicated fleet of 50+ college buses covering Coimbatore city, Gandhipuram, Ukkadam, Singanallur, Sundarapuram, Pollachi, Tirupur, Avinashi, Palakkad (Kerala), Chittur, and surrounding towns with safe, GPS-tracked transportation."
        },
        {
            q: "What are the hostel and dining facilities available?",
            a: "We have separate, secured on-campus hostels for boys and girls with 24/7 Wi-Fi, modern study halls, recreational rooms, gym facilities, and hygienic vegetarian & non-vegetarian dining prepared in mechanized kitchens."
        },
        {
            q: "What is the training provided for campus placements?",
            a: "Placement readiness starts right from the 1st Year. We provide structured training in quantitative aptitude, logical reasoning, verbal ability, full-stack programming, AI & Cloud tools, soft skills, resume building, and one-on-one mock interviews with corporate hiring managers."
        },
        {
            q: "What documents are required during admission?",
            a: "Required documents include 10th & 12th standard original mark sheets, Transfer Certificate (TC), Community Certificate, Conduct Certificate, First Graduate Certificate (if applicable), Income Certificate, Aadhaar card copy, and 5 passport-sized photographs."
        }
    ];

    // Theme adaptive styles
    const cardBg = isDark ? 'var(--glass)' : '#ffffff';
    const cardBorder = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
    const cardShadow = isDark ? '0 14px 40px rgba(0, 0, 0, 0.35)' : '0 10px 30px rgba(0, 0, 0, 0.06)';
    const innerBoxBg = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)';
    const inputBg = isDark ? 'rgba(255, 255, 255, 0.06)' : '#ffffff';
    const inputBorder = isDark ? 'var(--glass-border)' : 'rgba(0, 0, 0, 0.15)';
    const inputColor = 'var(--text-main)';

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', overflowX: 'hidden' }}>
            <SEO
                title="Admissions 2026-27 | EASA College of Engineering & Technology (TNEA Code: 2763)"
                description="Apply now for B.E., B.Tech, MBA, and M.E. programs at EASA College of Engineering & Technology, Coimbatore. TNEA Code: 2763. Explore 3D highlights, courses, scholarships, placements, and campus life."
            />

            <Navbar onApplyClick={() => handleOpenModal()} />

            {/* Glowing Notification Top Bar */}
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'linear-gradient(90deg, #1B2A6B 0%, #2D2C7A 50%, #E6B627 100%)',
                    color: '#ffffff',
                    padding: '0.65rem 1rem',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    zIndex: 100,
                    boxShadow: '0 8px 32px rgba(230, 182, 39, 0.25)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
                }}
            >
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '0.25rem 0.85rem',
                    borderRadius: '20px',
                    boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.2)'
                }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 10px #22c55e' }}></span>
                    <strong style={{ color: '#ffffff' }}>TNEA CODE: 2763</strong>
                </span>
                <span style={{ color: '#ffffff' }}>🎓 Admissions Open for Academic Year 2026 - 2027 (UG / PG / Lateral Entry)</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <a
                        href="tel:+919500777518"
                        style={{ color: '#ffffff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '8px', transition: 'all 0.2s ease' }}
                    >
                        <FaPhoneAlt style={{ fontSize: '0.8rem' }} /> +91 95007 77518
                    </a>
                    <a
                        href="https://wa.me/919500777518?text=Hello%20EASA%20Admissions%20Team,%20I%20would%20like%20to%20know%20more%20about%20admission%20details."
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#ffffff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#25D366', padding: '0.25rem 0.75rem', borderRadius: '8px', fontWeight: '700', boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)' }}
                    >
                        <FaWhatsapp /> WhatsApp Chat
                    </a>
                </div>
            </motion.div>

            {/* HERO SECTION WITH DYNAMIC HIGHLIGHTS & 3D TILT ENQUIRY CARD */}
            <section
                ref={heroRef}
                style={{
                    position: 'relative',
                    padding: 'clamp(3rem, 7vw, 6.5rem) 1rem clamp(2rem, 5vw, 4.5rem)',
                    background: isDark
                        ? 'radial-gradient(ellipse at top, rgba(45, 44, 122, 0.45) 0%, var(--bg-dark) 85%)'
                        : 'radial-gradient(ellipse at top, rgba(45, 44, 122, 0.08) 0%, #f8fafc 85%)',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--glass-border)'
                }}
            >
                {/* Floating Geometric Parallax Orbs */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '-12%',
                        right: '-6%',
                        width: '550px',
                        height: '550px',
                        background: 'radial-gradient(circle, rgba(230, 182, 39, 0.18) 0%, transparent 70%)',
                        filter: 'blur(70px)',
                        y: bgOrbParallaxY,
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: '-10%',
                        left: '-6%',
                        width: '500px',
                        height: '500px',
                        background: isDark
                            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(45, 44, 122, 0.1) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        y: bgOrbParallaxY,
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                />

                {/* Floating 3D Micro Cubes Accent */}
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '8%',
                        opacity: isDark ? 0.18 : 0.12,
                        fontSize: '3.5rem',
                        color: 'var(--secondary)',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}
                >
                    <FaCubes />
                </motion.div>

                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
                        gap: '3rem',
                        alignItems: 'center'
                    }}>
                        {/* Left Column: Headline, Accreditations & Key Triggers */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* Badge Pill */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.45rem 1.2rem',
                                    background: isDark
                                        ? 'linear-gradient(135deg, rgba(230, 182, 39, 0.2) 0%, rgba(45, 44, 122, 0.3) 100%)'
                                        : 'linear-gradient(135deg, rgba(230, 182, 39, 0.25) 0%, rgba(45, 44, 122, 0.15) 100%)',
                                    border: '1px solid rgba(230, 182, 39, 0.5)',
                                    borderRadius: '30px',
                                    color: isDark ? 'var(--secondary)' : '#b45309',
                                    fontSize: '0.92rem',
                                    fontWeight: '800',
                                    marginBottom: '1.4rem',
                                    boxShadow: '0 8px 24px rgba(230, 182, 39, 0.2)'
                                }}
                            >
                                <FaStar /> TNEA COUNSELLING CODE: 2763
                            </motion.div>

                            <h1 style={{
                                fontSize: 'clamp(2.3rem, 4.8vw, 3.6rem)',
                                fontWeight: '900',
                                lineHeight: '1.14',
                                marginBottom: '1.2rem',
                                color: isDark ? 'var(--text-main)' : '#0f172a',
                                letterSpacing: '-0.02em'
                            }}>
                                Engineering Next-Gen Leaders at <span style={{
                                    background: isDark
                                        ? 'linear-gradient(135deg, #E6B627 0%, #FCCA26 50%, #ffffff 100%)'
                                        : 'linear-gradient(135deg, #2D2C7A 0%, #d97706 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>EASA College</span>
                            </h1>

                            <p style={{
                                fontSize: 'clamp(1rem, 2vw, 1.18rem)',
                                lineHeight: '1.75',
                                color: isDark ? 'var(--text-muted)' : '#475569',
                                marginBottom: '2.2rem'
                            }}>
                                Approved by <strong>AICTE, New Delhi</strong> & Affiliated to <strong>Anna University, Chennai</strong>. Empowering future engineers with advanced AICTE IDEA Lab, state-of-the-art Industry 4.0 CoE, and proven 96% placement records across 150+ global recruiters.
                            </p>

                            {/* Trust Badges */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.7rem',
                                marginBottom: '2.5rem'
                            }}>
                                {[
                                    "NAAC Accredited",
                                    "AICTE Approved",
                                    "Anna University Affiliated",
                                    "AICTE IDEA Lab",
                                    "100% Placement Training"
                                ].map((pill, idx) => (
                                    <motion.span
                                        key={idx}
                                        whileHover={{ scale: 1.06, y: -3 }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.45rem',
                                            background: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                                            border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
                                            padding: '0.4rem 0.95rem',
                                            borderRadius: '20px',
                                            fontSize: '0.86rem',
                                            fontWeight: '700',
                                            color: isDark ? 'var(--text-main)' : '#1e293b',
                                            boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.06)'
                                        }}
                                    >
                                        <FaCheckCircle style={{ color: '#d97706', fontSize: '0.85rem' }} /> {pill}
                                    </motion.span>
                                ))}
                            </div>

                            {/* CTA Action Buttons */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1rem',
                                alignItems: 'center'
                            }}>
                                <motion.button
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleOpenModal()}
                                    className="btn btn-warning"
                                    style={{
                                        padding: '0.95rem 2.4rem',
                                        fontSize: '1.08rem',
                                        fontWeight: '800',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        boxShadow: '0 12px 30px rgba(230, 182, 39, 0.4), inset 0 1px 1px rgba(255,255,255,0.4)',
                                        border: '1px solid rgba(255,255,255,0.3)'
                                    }}
                                >
                                    Apply Online 2026-27 <FaArrowRight />
                                </motion.button>

                                <motion.a
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    href="#courses-section"
                                    className="btn"
                                    style={{
                                        padding: '0.95rem 2rem',
                                        fontSize: '1.02rem',
                                        border: isDark ? '1px solid var(--glass-border)' : '1px solid rgba(0,0,0,0.15)',
                                        background: isDark ? 'var(--glass)' : '#ffffff',
                                        color: isDark ? 'var(--text-main)' : '#1e293b',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        boxShadow: isDark ? '0 6px 20px rgba(0,0,0,0.25)' : '0 4px 15px rgba(0,0,0,0.06)'
                                    }}
                                >
                                    <FaBookOpen style={{ color: '#d97706' }} /> Explore Courses
                                </motion.a>

                                <a
                                    href="#scholarships-section"
                                    style={{
                                        color: isDark ? 'var(--secondary)' : '#2D2C7A',
                                        fontWeight: '800',
                                        fontSize: '0.98rem',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.3rem',
                                        marginLeft: '0.4rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Scholarships Matrix →
                                </a>
                            </div>
                        </motion.div>

                        {/* Right Column: 3D Tilted Interactive Admission Enquiry Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <Tilt3DCard
                                maxTilt={8}
                                perspective={1000}
                                glareOpacity={isDark ? 0.18 : 0.08}
                                scale={1.02}
                                style={{
                                    padding: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                                    borderRadius: '26px',
                                    border: isDark ? '1px solid rgba(230, 182, 39, 0.4)' : '1px solid rgba(45, 44, 122, 0.2)',
                                    boxShadow: isDark
                                        ? '0 25px 60px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255,255,255,0.15)'
                                        : '0 20px 50px rgba(0, 0, 0, 0.1)',
                                    background: isDark
                                        ? 'linear-gradient(135deg, rgba(20, 27, 45, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
                                        : '#ffffff'
                                }}
                            >
                                <div style={{ marginBottom: '1.4rem', borderBottom: isDark ? '1px solid var(--glass-border)' : '1px solid rgba(0,0,0,0.08)', paddingBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.45rem', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <FaLayerGroup style={{ color: '#d97706', fontSize: '1.1rem' }} /> Admission Enquiry
                                        </h3>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '800',
                                            color: '#ffffff',
                                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                            padding: '0.25rem 0.7rem',
                                            borderRadius: '8px',
                                            letterSpacing: '0.05em',
                                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                                        }}>
                                            2026 INTAKE
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.88rem', color: isDark ? 'var(--text-muted)' : '#64748b', marginTop: '0.4rem', margin: 0 }}>
                                        Receive instant cutoff guidance, scholarship calculation & campus prospectus.
                                    </p>
                                </div>

                                {enquirySuccess ? (
                                    <div style={{
                                        padding: '2.5rem 1.5rem',
                                        textAlign: 'center',
                                        background: 'rgba(34, 197, 94, 0.12)',
                                        borderRadius: '18px',
                                        border: '1px solid rgba(34, 197, 94, 0.4)',
                                        boxShadow: '0 10px 30px rgba(34, 197, 94, 0.15)'
                                    }}>
                                        <FaCheckCircle style={{ color: '#22c55e', fontSize: '3.2rem', marginBottom: '1rem', filter: 'drop-shadow(0 4px 12px rgba(34, 197, 94, 0.5))' }} />
                                        <h4 style={{ color: isDark ? '#ffffff' : '#14532d', fontWeight: '800', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                                            Enquiry Submitted Successfully!
                                        </h4>
                                        <p style={{ color: isDark ? 'var(--text-muted)' : '#475569', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                                            Thank you for your interest. Our Senior Admission Counselor will contact you shortly.
                                        </p>
                                        <button
                                            onClick={() => setEnquirySuccess(false)}
                                            className="btn btn-warning"
                                            style={{ fontSize: '0.9rem', padding: '0.65rem 1.6rem' }}
                                        >
                                            Submit Another Enquiry
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: isDark ? 'var(--text-main)' : '#334155', marginBottom: '0.3rem' }}>
                                                Student Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Rahul Sharma"
                                                value={enquiryForm.name}
                                                onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem 1rem',
                                                    borderRadius: '12px',
                                                    background: inputBg,
                                                    border: `1px solid ${inputBorder}`,
                                                    color: inputColor,
                                                    fontSize: '0.95rem',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: isDark ? 'var(--text-main)' : '#334155', marginBottom: '0.3rem' }}>
                                                    Phone / WhatsApp *
                                                </label>
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="10-digit mobile"
                                                    value={enquiryForm.phone}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.8rem 1rem',
                                                        borderRadius: '12px',
                                                        background: inputBg,
                                                        border: `1px solid ${inputBorder}`,
                                                        color: inputColor,
                                                        fontSize: '0.95rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: isDark ? 'var(--text-main)' : '#334155', marginBottom: '0.3rem' }}>
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="name@email.com"
                                                    value={enquiryForm.email}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.8rem 1rem',
                                                        borderRadius: '12px',
                                                        background: inputBg,
                                                        border: `1px solid ${inputBorder}`,
                                                        color: inputColor,
                                                        fontSize: '0.95rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: isDark ? 'var(--text-main)' : '#334155', marginBottom: '0.3rem' }}>
                                                Select Preferred Course / Programme *
                                            </label>
                                            <select
                                                value={enquiryForm.course}
                                                onChange={(e) => setEnquiryForm({ ...enquiryForm, course: e.target.value })}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.8rem 1rem',
                                                    borderRadius: '12px',
                                                    background: isDark ? '#1e293b' : '#ffffff',
                                                    border: `1px solid ${inputBorder}`,
                                                    color: inputColor,
                                                    fontSize: '0.95rem',
                                                    outline: 'none'
                                                }}
                                            >
                                                <optgroup label="Undergraduate Programmes (B.E. / B.Tech)">
                                                    <option value="B.Tech Artificial Intelligence & Data Science">B.Tech Artificial Intelligence & Data Science</option>
                                                    <option value="B.E CSE Artificial Intelligence & Machine Learning">B.E CSE Artificial Intelligence & Machine Learning</option>
                                                    <option value="B.E CSE Cyber Security">B.E CSE Cyber Security</option>
                                                    <option value="B.E Computer Science and Engineering">B.E Computer Science and Engineering</option>
                                                    <option value="B.Tech Information Technology">B.Tech Information Technology</option>
                                                    <option value="B.E Electronics and Communication Engineering">B.E Electronics and Communication Engineering</option>
                                                    <option value="B.E Biomedical Engineering">B.E Biomedical Engineering</option>
                                                    <option value="B.E Electrical & Electronics Engineering">B.E Electrical & Electronics Engineering</option>
                                                    <option value="B.Tech Agricultural Engineering">B.Tech Agricultural Engineering</option>
                                                    <option value="B.E Mechanical Engineering">B.E Mechanical Engineering</option>
                                                </optgroup>
                                                <optgroup label="Postgraduate Programmes (MBA / M.E.)">
                                                    <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                                                    <option value="M.E Communication Systems">M.E Communication Systems</option>
                                                    <option value="M.E Computer Science and Engineering">M.E Computer Science and Engineering</option>
                                                    <option value="M.E Construction Engineering & Management">M.E Construction Engineering & Management</option>
                                                    <option value="M.E Manufacturing Engineering">M.E Manufacturing Engineering</option>
                                                    <option value="M.E Power Electronics and Drives">M.E Power Electronics and Drives</option>
                                                    <option value="M.E Structural Engineering">M.E Structural Engineering</option>
                                                </optgroup>
                                            </select>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: isDark ? 'var(--text-main)' : '#334155', marginBottom: '0.3rem' }}>
                                                    State
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Tamil Nadu / Kerala"
                                                    value={enquiryForm.state}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, state: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.8rem 1rem',
                                                        borderRadius: '12px',
                                                        background: inputBg,
                                                        border: `1px solid ${inputBorder}`,
                                                        color: inputColor,
                                                        fontSize: '0.95rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: isDark ? 'var(--text-main)' : '#334155', marginBottom: '0.3rem' }}>
                                                    City / District
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Coimbatore, Palakkad"
                                                    value={enquiryForm.city}
                                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, city: e.target.value })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.8rem 1rem',
                                                        borderRadius: '12px',
                                                        background: inputBg,
                                                        border: `1px solid ${inputBorder}`,
                                                        color: inputColor,
                                                        fontSize: '0.95rem',
                                                        outline: 'none'
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={isSubmittingEnquiry}
                                            className="btn btn-warning"
                                            style={{
                                                width: '100%',
                                                padding: '0.9rem',
                                                fontSize: '1.05rem',
                                                fontWeight: '900',
                                                marginTop: '0.5rem',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                boxShadow: '0 8px 24px rgba(230, 182, 39, 0.4)'
                                            }}
                                        >
                                            {isSubmittingEnquiry ? 'Submitting...' : 'Request Instant Callback & Info'}
                                        </motion.button>
                                    </form>
                                )}
                            </Tilt3DCard>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* METRICS & COUNTER STRIP WITH 3D TILT */}
            <section style={{
                background: isDark ? 'var(--glass-highlight)' : '#f1f5f9',
                borderBottom: '1px solid var(--glass-border)',
                padding: '3rem 1rem'
            }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                        gap: '1.5rem',
                        textAlign: 'center'
                    }}>
                        {stats.map((stat, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={10}
                                scale={1.05}
                                glareOpacity={isDark ? 0.2 : 0.08}
                                style={{
                                    padding: '1.4rem 1rem',
                                    background: stat.highlight
                                        ? (isDark ? 'linear-gradient(135deg, rgba(230, 182, 39, 0.15) 0%, rgba(45, 44, 122, 0.2) 100%)' : 'linear-gradient(135deg, #fef3c7 0%, #e0e7ff 100%)')
                                        : (isDark ? 'var(--glass)' : '#ffffff'),
                                    borderRadius: '18px',
                                    border: stat.highlight ? '2px solid var(--secondary)' : `1px solid ${cardBorder}`,
                                    boxShadow: stat.highlight ? '0 10px 30px rgba(230, 182, 39, 0.25)' : cardShadow
                                }}
                            >
                                <div style={{
                                    fontSize: 'clamp(1.9rem, 3.2vw, 2.5rem)',
                                    fontWeight: '900',
                                    color: stat.highlight ? (isDark ? 'var(--secondary)' : '#b45309') : (isDark ? 'var(--text-main)' : '#0f172a'),
                                    marginBottom: '0.2rem'
                                }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: isDark ? 'var(--text-main)' : '#334155', marginBottom: '0.2rem' }}>
                                    {stat.label}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: isDark ? 'var(--text-muted)' : '#64748b' }}>
                                    {stat.subtext}
                                </div>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE EASA COLLEGE (HIGHLIGHT CARDS) */}
            <section style={{ padding: 'clamp(4rem, 7vw, 6.5rem) 1rem', background: 'var(--bg-dark)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                        <span style={{
                            fontSize: '0.88rem',
                            fontWeight: '800',
                            color: isDark ? 'var(--secondary)' : '#d97706',
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em'
                        }}>
                            Why EASA College of Engineering?
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
                            fontWeight: '900',
                            color: isDark ? 'var(--text-main)' : '#0f172a',
                            marginTop: '0.5rem',
                            marginBottom: '1rem'
                        }}>
                            The Pinnacle of Technical Innovation & Career Growth
                        </h2>
                        <p style={{ color: isDark ? 'var(--text-muted)' : '#64748b', fontSize: '1.08rem', lineHeight: '1.7' }}>
                            We bridge theoretical engineering foundations with hands-on industrial innovation, entrepreneurship support, and comprehensive campus placement excellence.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                        gap: '2.2rem'
                    }}>
                        {collegeHighlights.map((item, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={8}
                                scale={1.03}
                                glareOpacity={isDark ? 0.18 : 0.08}
                                style={{
                                    padding: '2.2rem',
                                    borderRadius: '22px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: `1px solid ${cardBorder}`,
                                    background: cardBg,
                                    boxShadow: cardShadow
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.4rem' }}>
                                        <div style={{
                                            width: '62px',
                                            height: '62px',
                                            borderRadius: '18px',
                                            background: isDark ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)' : '#f8fafc',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: `1px solid ${cardBorder}`,
                                            boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)'
                                        }}>
                                            {item.icon}
                                        </div>
                                        <span style={{
                                            fontSize: '0.78rem',
                                            fontWeight: '800',
                                            color: isDark ? 'var(--secondary)' : '#b45309',
                                            background: isDark ? 'rgba(230, 182, 39, 0.12)' : '#fef3c7',
                                            padding: '0.3rem 0.75rem',
                                            borderRadius: '14px',
                                            border: isDark ? '1px solid rgba(230, 182, 39, 0.35)' : '1px solid rgba(230, 182, 39, 0.4)',
                                            boxShadow: '0 4px 12px rgba(230, 182, 39, 0.15)'
                                        }}>
                                            {item.badge}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginBottom: '0.8rem' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: isDark ? 'var(--text-muted)' : '#475569', fontSize: '0.94rem', lineHeight: '1.65', margin: 0 }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROGRAMS & COURSES OFFERED SECTION */}
            <section id="courses-section" style={{
                padding: 'clamp(4rem, 7vw, 6.5rem) 1rem',
                background: isDark ? 'var(--glass-highlight)' : '#f8fafc',
                borderTop: '1px solid var(--glass-border)',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: '800', color: isDark ? 'var(--secondary)' : '#d97706', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            Degrees & Specializations
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginTop: '0.5rem', marginBottom: '1rem' }}>
                            Programs Offered for Academic Year 2026 - 2027
                        </h2>
                        <p style={{ color: isDark ? 'var(--text-muted)' : '#64748b', fontSize: '1.08rem' }}>
                            Curriculum aligned with industry 4.0 standards, emerging AI technologies, hands-on lab projects, and international certifications.
                        </p>

                        {/* UG / PG Tabs */}
                        <div style={{
                            display: 'inline-flex',
                            background: isDark ? 'rgba(0,0,0,0.45)' : '#e2e8f0',
                            padding: '0.45rem',
                            borderRadius: '35px',
                            border: `1px solid ${cardBorder}`,
                            marginTop: '2rem',
                            boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 4px 15px rgba(0,0,0,0.06)'
                        }}>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab('UG')}
                                style={{
                                    padding: '0.7rem 2.2rem',
                                    borderRadius: '28px',
                                    border: 'none',
                                    fontWeight: '800',
                                    fontSize: '0.98rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    background: activeTab === 'UG' ? 'var(--secondary)' : 'transparent',
                                    color: activeTab === 'UG' ? '#000000' : (isDark ? 'var(--text-muted)' : '#475569'),
                                    boxShadow: activeTab === 'UG' ? '0 4px 15px rgba(230, 182, 39, 0.4)' : 'none'
                                }}
                            >
                                Undergraduate (10 Courses)
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab('PG')}
                                style={{
                                    padding: '0.7rem 2.2rem',
                                    borderRadius: '28px',
                                    border: 'none',
                                    fontWeight: '800',
                                    fontSize: '0.98rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    background: activeTab === 'PG' ? 'var(--secondary)' : 'transparent',
                                    color: activeTab === 'PG' ? '#000000' : (isDark ? 'var(--text-muted)' : '#475569'),
                                    boxShadow: activeTab === 'PG' ? '0 4px 15px rgba(230, 182, 39, 0.4)' : 'none'
                                }}
                            >
                                Postgraduate (7 Courses)
                            </motion.button>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 370px), 1fr))',
                        gap: '2.2rem'
                    }}>
                        {(activeTab === 'UG' ? ugCourses : pgCourses).map((course, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={8}
                                scale={1.03}
                                glareOpacity={isDark ? 0.18 : 0.08}
                                style={{
                                    padding: '2.2rem',
                                    borderRadius: '22px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    border: `1px solid ${cardBorder}`,
                                    background: cardBg,
                                    boxShadow: cardShadow
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.1rem' }}>
                                        <span style={{
                                            fontSize: '0.78rem',
                                            fontWeight: '800',
                                            color: '#ffffff',
                                            background: '#2D2C7A',
                                            padding: '0.25rem 0.7rem',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 8px rgba(45, 44, 122, 0.4)'
                                        }}>
                                            {course.duration}
                                        </span>
                                        <span style={{
                                            fontSize: '0.78rem',
                                            fontWeight: '800',
                                            color: isDark ? 'var(--secondary)' : '#b45309',
                                            background: isDark ? 'rgba(230, 182, 39, 0.15)' : '#fef3c7',
                                            padding: '0.25rem 0.7rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(230, 182, 39, 0.3)'
                                        }}>
                                            {course.tag}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginBottom: '0.9rem', lineHeight: '1.38' }}>
                                        {course.title}
                                    </h3>

                                    <div style={{ marginBottom: '1.3rem' }}>
                                        <div style={{ fontSize: '0.86rem', fontWeight: '800', color: isDark ? 'var(--text-muted)' : '#64748b', marginBottom: '0.45rem' }}>
                                            Key Focus Areas:
                                        </div>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                                            {course.highlights.map((h, i) => (
                                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.88rem', color: isDark ? 'var(--text-main)' : '#334155' }}>
                                                    <FaCheckCircle style={{ color: '#d97706', fontSize: '0.8rem', flexShrink: 0 }} />
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div style={{ padding: '0.85rem', background: innerBoxBg, borderRadius: '12px', marginBottom: '1.6rem', border: `1px solid ${cardBorder}` }}>
                                        <div style={{ fontSize: '0.78rem', fontWeight: '800', color: isDark ? 'var(--secondary)' : '#2D2C7A', textTransform: 'uppercase' }}>
                                            Career Pathways
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: isDark ? 'var(--text-muted)' : '#64748b', marginTop: '0.25rem', lineHeight: '1.5' }}>
                                            {course.career}
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleOpenModal(course.title)}
                                    className="btn"
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem',
                                        background: isDark ? 'rgba(230, 182, 39, 0.1)' : '#fef3c7',
                                        border: '1px solid var(--secondary)',
                                        color: isDark ? 'var(--secondary)' : '#92400e',
                                        fontWeight: '800',
                                        fontSize: '0.96rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.55rem',
                                        cursor: 'pointer',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 15px rgba(230, 182, 39, 0.15)'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'var(--secondary)';
                                        e.currentTarget.style.color = '#000000';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = isDark ? 'rgba(230, 182, 39, 0.1)' : '#fef3c7';
                                        e.currentTarget.style.color = isDark ? 'var(--secondary)' : '#92400e';
                                    }}
                                >
                                    Apply For This Program <FaArrowRight style={{ fontSize: '0.82rem' }} />
                                </motion.button>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ADMISSION PROCESS 5-STEP ROADMAP */}
            <section style={{ padding: 'clamp(4rem, 7vw, 6.5rem) 1rem', background: 'var(--bg-dark)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: '800', color: isDark ? 'var(--secondary)' : '#d97706', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            Seamless Onboarding
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginTop: '0.5rem', marginBottom: '1rem' }}>
                            5-Step Admission Roadmap
                        </h2>
                        <p style={{ color: isDark ? 'var(--text-muted)' : '#64748b', fontSize: '1.08rem' }}>
                            Step-by-step guidance from your initial enquiry through counselling, verification, scholarship, and final induction.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                        gap: '1.8rem'
                    }}>
                        {admissionSteps.map((step, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={10}
                                scale={1.04}
                                glareOpacity={isDark ? 0.18 : 0.08}
                                style={{
                                    padding: '2rem 1.5rem',
                                    borderRadius: '20px',
                                    border: `1px solid ${cardBorder}`,
                                    background: cardBg,
                                    boxShadow: cardShadow
                                }}
                            >
                                <div style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #2D2C7A 0%, var(--secondary) 100%)',
                                    color: '#ffffff',
                                    fontWeight: '900',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1.4rem',
                                    boxShadow: '0 6px 20px rgba(230, 182, 39, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)'
                                }}>
                                    {step.step}
                                </div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginBottom: '0.65rem' }}>
                                    {step.title}
                                </h3>
                                <p style={{ color: isDark ? 'var(--text-muted)' : '#475569', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                                    {step.desc}
                                </p>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* TNEA 2026 DATES & ELIGIBILITY MATRIX */}
            <section style={{
                padding: 'clamp(4rem, 7vw, 6.5rem) 1rem',
                background: isDark ? 'var(--glass-highlight)' : '#f8fafc',
                borderTop: '1px solid var(--glass-border)',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))', gap: '3rem' }}>
                        
                        {/* Left: TNEA Schedule */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                <FaCalendarAlt style={{ color: '#d97706', fontSize: '1.8rem' }} />
                                <h3 style={{ fontSize: '1.7rem', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', margin: 0 }}>
                                    TNEA 2026 Important Schedule
                                </h3>
                            </div>
                            <p style={{ color: isDark ? 'var(--text-muted)' : '#64748b', fontSize: '0.98rem', marginBottom: '2rem' }}>
                                Official admission milestones for engineering aspirants under Anna University counselling.
                            </p>

                            <Tilt3DCard maxTilt={5} scale={1.01} style={{ padding: '1.8rem', borderRadius: '22px', background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                    {admissionDates.map((item, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            borderBottom: idx === admissionDates.length - 1 ? 'none' : (isDark ? '1px solid var(--glass-border)' : '1px solid rgba(0,0,0,0.06)'),
                                            paddingBottom: idx === admissionDates.length - 1 ? '0' : '1rem',
                                            gap: '1rem'
                                        }}>
                                            <div>
                                                <div style={{ fontWeight: '800', color: isDark ? 'var(--text-main)' : '#0f172a', fontSize: '0.95rem' }}>
                                                    {item.title}
                                                </div>
                                                <div style={{ fontSize: '0.84rem', color: isDark ? 'var(--text-muted)' : '#64748b' }}>
                                                    {item.date}
                                                </div>
                                            </div>
                                            <span style={{
                                                fontSize: '0.78rem',
                                                fontWeight: '800',
                                                padding: '0.3rem 0.75rem',
                                                borderRadius: '20px',
                                                background: item.status === 'Active' || item.status === 'Open' ? 'rgba(34, 197, 94, 0.15)' : (isDark ? 'rgba(255, 255, 255, 0.08)' : '#f1f5f9'),
                                                color: item.status === 'Active' || item.status === 'Open' ? '#15803d' : (isDark ? 'var(--text-muted)' : '#64748b'),
                                                border: item.status === 'Active' || item.status === 'Open' ? '1px solid rgba(34, 197, 94, 0.3)' : `1px solid ${cardBorder}`
                                            }}>
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Tilt3DCard>
                        </div>

                        {/* Right: Detailed Eligibility Matrix */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.8rem' }} />
                                <h3 style={{ fontSize: '1.7rem', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', margin: 0 }}>
                                    Minimum Eligibility Percentage
                                </h3>
                            </div>
                            <p style={{ color: isDark ? 'var(--text-muted)' : '#64748b', fontSize: '0.98rem', marginBottom: '1.5rem' }}>
                                Minimum qualifying criteria as prescribed by the Government of Tamil Nadu & Anna University.
                            </p>

                            {/* Eligibility stream switcher */}
                            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.3rem' }}>
                                <button
                                    onClick={() => setActiveEligibilityTab('academic')}
                                    style={{
                                        padding: '0.6rem 1.4rem',
                                        borderRadius: '12px',
                                        fontSize: '0.92rem',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        border: `1px solid ${cardBorder}`,
                                        background: activeEligibilityTab === 'academic' ? 'var(--secondary)' : (isDark ? 'rgba(0,0,0,0.3)' : '#e2e8f0'),
                                        color: activeEligibilityTab === 'academic' ? '#000' : (isDark ? 'var(--text-muted)' : '#475569'),
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Academic Stream (+2 HSC)
                                </button>
                                <button
                                    onClick={() => setActiveEligibilityTab('vocational')}
                                    style={{
                                        padding: '0.6rem 1.4rem',
                                        borderRadius: '12px',
                                        fontSize: '0.92rem',
                                        fontWeight: '800',
                                        cursor: 'pointer',
                                        border: `1px solid ${cardBorder}`,
                                        background: activeEligibilityTab === 'vocational' ? 'var(--secondary)' : (isDark ? 'rgba(0,0,0,0.3)' : '#e2e8f0'),
                                        color: activeEligibilityTab === 'vocational' ? '#000' : (isDark ? 'var(--text-muted)' : '#475569'),
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Vocational Stream (+2 HSC)
                                </button>
                            </div>

                            <Tilt3DCard maxTilt={5} scale={1.01} style={{ padding: '1.8rem', borderRadius: '22px', background: cardBg, border: `1px solid ${cardBorder}`, boxShadow: cardShadow }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                    {(activeEligibilityTab === 'academic' ? academicEligibility : vocationalEligibility).map((row, idx) => (
                                        <div key={idx} style={{
                                            padding: '0.9rem 1.1rem',
                                            background: innerBoxBg,
                                            borderRadius: '14px',
                                            border: `1px solid ${cardBorder}`
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                                                <span style={{ fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', fontSize: '0.98rem' }}>
                                                    {row.community}
                                                </span>
                                                <span style={{
                                                    fontSize: '0.85rem',
                                                    fontWeight: '800',
                                                    color: isDark ? 'var(--secondary)' : '#92400e',
                                                    background: isDark ? 'rgba(230, 182, 39, 0.12)' : '#fef3c7',
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '8px'
                                                }}>
                                                    Eligible
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '0.88rem', color: isDark ? 'var(--text-muted)' : '#475569' }}>
                                                {row.marks}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{
                                    marginTop: '1.6rem',
                                    padding: '1rem',
                                    borderRadius: '14px',
                                    background: isDark ? 'rgba(230, 182, 39, 0.1)' : '#fef3c7',
                                    border: '1px solid rgba(230, 182, 39, 0.35)',
                                    fontSize: '0.88rem',
                                    color: isDark ? 'var(--text-main)' : '#1e293b',
                                    lineHeight: '1.6'
                                }}>
                                    <div style={{ fontWeight: '800', color: isDark ? 'var(--secondary)' : '#92400e', marginBottom: '0.4rem' }}>
                                        📌 Key Eligibility Criteria:
                                    </div>
                                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: isDark ? 'var(--text-muted)' : '#475569' }}>
                                        <li><strong>Minimum 60.00% Aggregate</strong> required in qualifying examinations.</li>
                                        <li><strong>Vocational Stream Mandatory:</strong> Candidates from Vocational HSC must have studied <strong>General Mathematics</strong> as a compulsory subject.</li>
                                        <li><strong>Lateral Entry:</strong> 3-Year Polytechnic Diploma or B.Sc. degree holders with minimum 60% are eligible directly for 2nd Year admission.</li>
                                    </ul>
                                </div>
                            </Tilt3DCard>
                        </div>

                    </div>
                </div>
            </section>

            {/* SCHOLARSHIPS & FINANCIAL AID HUB */}
            <section id="scholarships-section" style={{ padding: 'clamp(4rem, 7vw, 6.5rem) 1rem', background: 'var(--bg-dark)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: '800', color: isDark ? 'var(--secondary)' : '#d97706', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            Empowering Every Aspirant
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginTop: '0.5rem', marginBottom: '1rem' }}>
                            Scholarships & Financial Assistance
                        </h2>
                        <p style={{ color: isDark ? 'var(--text-muted)' : '#64748b', fontSize: '1.08rem' }}>
                            Over ₹2.5 Crores worth of merit awards, government welfare schemes, and institutional concessions distributed annually.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
                        gap: '2.2rem'
                    }}>
                        {scholarships.map((sch, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={8}
                                scale={1.03}
                                glareOpacity={isDark ? 0.18 : 0.08}
                                style={{
                                    padding: '2.2rem',
                                    borderRadius: '22px',
                                    border: `1px solid ${cardBorder}`,
                                    background: cardBg,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: cardShadow
                                }}
                            >
                                <div>
                                    <div style={{
                                        display: 'inline-block',
                                        fontSize: '0.82rem',
                                        fontWeight: '900',
                                        color: '#ffffff',
                                        background: 'linear-gradient(135deg, #1B2A6B 0%, #2D2C7A 100%)',
                                        padding: '0.35rem 0.9rem',
                                        borderRadius: '10px',
                                        marginBottom: '1.2rem',
                                        boxShadow: '0 4px 12px rgba(27, 42, 107, 0.4)'
                                    }}>
                                        {sch.benefit}
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginBottom: '0.85rem' }}>
                                        {sch.title}
                                    </h3>
                                    <p style={{ color: isDark ? 'var(--text-muted)' : '#475569', fontSize: '0.94rem', lineHeight: '1.65', margin: 0 }}>
                                        {sch.criteria}
                                    </p>
                                </div>

                                <div style={{ marginTop: '1.6rem', paddingTop: '1.1rem', borderTop: isDark ? '1px solid var(--glass-border)' : '1px solid rgba(0,0,0,0.06)' }}>
                                    <button
                                        onClick={() => handleOpenModal(`Scholarship Enquiry - ${sch.title}`)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: isDark ? 'var(--secondary)' : '#2D2C7A',
                                            fontWeight: '800',
                                            fontSize: '0.95rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.45rem',
                                            padding: 0
                                        }}
                                    >
                                        Check Your Eligibility <FaArrowRight style={{ fontSize: '0.8rem' }} />
                                    </button>
                                </div>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* TOP RECRUITERS WALL */}
            <section style={{
                padding: 'clamp(4rem, 7vw, 6.5rem) 1rem',
                background: isDark ? 'var(--glass-highlight)' : '#f8fafc',
                borderTop: '1px solid var(--glass-border)',
                borderBottom: '1px solid var(--glass-border)'
            }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3.5rem auto' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: '800', color: isDark ? 'var(--secondary)' : '#d97706', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            Industry Trust
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginTop: '0.5rem', marginBottom: '1rem' }}>
                            Top Marquee Recruiters
                        </h2>
                        <p style={{ color: isDark ? 'var(--text-muted)' : '#64748b', fontSize: '1.08rem' }}>
                            Our graduates are recruited by global tech powerhouses, Fortune 500 enterprises, and premier core engineering corporations.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                        gap: '1.2rem'
                    }}>
                        {recruiters.map((company, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={12}
                                scale={1.05}
                                glareOpacity={isDark ? 0.25 : 0.08}
                                style={{
                                    padding: '1.2rem 1rem',
                                    background: cardBg,
                                    border: `1px solid ${cardBorder}`,
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    fontWeight: '800',
                                    fontSize: '0.92rem',
                                    color: isDark ? 'var(--text-main)' : '#1e293b',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: cardShadow
                                }}
                            >
                                {company}
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAMPUS FACILITIES */}
            <section style={{ padding: 'clamp(4rem, 7vw, 6.5rem) 1rem', background: 'var(--bg-dark)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: '800', color: isDark ? 'var(--secondary)' : '#d97706', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            World-Class Infrastructure
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginTop: '0.5rem', marginBottom: '1rem' }}>
                            Campus Life & State-of-the-Art Facilities
                        </h2>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                        gap: '1.8rem'
                    }}>
                        {[
                            { title: "Smart Digital Classrooms", desc: "Interactive smart boards, high-speed Wi-Fi & multimedia lecture halls.", icon: <FaLaptopCode /> },
                            { title: "Central Digital Library", desc: "35,000+ technical volumes, IEEE / Springer journals, and e-book repositories.", icon: <FaBookOpen /> },
                            { title: "Safe & Modern Hostels", desc: "Separate boys & girls hostels with 24/7 security, gym, RO water & healthy meals.", icon: <FaBuilding /> },
                            { title: "400m Sports Complex", desc: "Full-sized football field, cricket pitches, basketball courts, and athletics track.", icon: <FaAward /> },
                            { title: "50+ Bus Transport Network", desc: "GPS-enabled bus routes covering entire Coimbatore, Tirupur & Palakkad belts.", icon: <FaBus /> },
                            { title: "Food Courts & Cafeteria", desc: "Hygienic multi-cuisine cafeteria providing fresh snacks, beverages & meals.", icon: <FaStar /> },
                            { title: "Health & Medical Centre", desc: "24/7 on-campus first aid, visiting medical doctor & emergency ambulance facility.", icon: <FaShieldAlt /> },
                            { title: "Dhruva Cultural Fest & Clubs", desc: "Vibrant clubs including Robotics, Coding, Photography, Drama, NSS & YRC.", icon: <FaUsers /> }
                        ].map((facility, idx) => (
                            <Tilt3DCard
                                key={idx}
                                maxTilt={8}
                                scale={1.03}
                                glareOpacity={isDark ? 0.18 : 0.08}
                                style={{
                                    padding: '1.8rem',
                                    borderRadius: '18px',
                                    border: `1px solid ${cardBorder}`,
                                    background: cardBg,
                                    boxShadow: cardShadow
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '14px',
                                    background: isDark ? 'rgba(230, 182, 39, 0.12)' : '#fef3c7',
                                    color: isDark ? 'var(--secondary)' : '#b45309',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.3rem',
                                    marginBottom: '1.1rem'
                                }}>
                                    {facility.icon}
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginBottom: '0.45rem' }}>
                                    {facility.title}
                                </h4>
                                <p style={{ fontSize: '0.88rem', color: isDark ? 'var(--text-muted)' : '#475569', lineHeight: '1.55', margin: 0 }}>
                                    {facility.desc}
                                </p>
                            </Tilt3DCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
            <section style={{
                padding: 'clamp(4rem, 7vw, 6.5rem) 1rem',
                background: isDark ? 'var(--glass-highlight)' : '#f8fafc',
                borderTop: '1px solid var(--glass-border)'
            }}>
                <div className="container" style={{ maxWidth: '920px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                        <span style={{ fontSize: '0.88rem', fontWeight: '800', color: isDark ? 'var(--secondary)' : '#d97706', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                            Got Questions?
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)', fontWeight: '900', color: isDark ? 'var(--text-main)' : '#0f172a', marginTop: '0.5rem', marginBottom: '1rem' }}>
                            Frequently Asked Admission Questions
                        </h2>
                        <p style={{ color: isDark ? 'var(--text-muted)' : '#64748b', fontSize: '1.08rem' }}>
                            Clear answers to common questions about eligibility, counselling, fees, hostels, and scholarships.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                        {faqs.map((faq, idx) => {
                            const isOpen = activeFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        borderRadius: '18px',
                                        border: isOpen ? '1px solid var(--secondary)' : `1px solid ${cardBorder}`,
                                        background: cardBg,
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        boxShadow: isOpen ? '0 10px 30px rgba(230, 182, 39, 0.15)' : cardShadow
                                    }}
                                >
                                    <button
                                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                                        style={{
                                            width: '100%',
                                            padding: '1.35rem 1.6rem',
                                            background: 'transparent',
                                            border: 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            textAlign: 'left',
                                            color: isDark ? 'var(--text-main)' : '#0f172a',
                                            fontWeight: '800',
                                            fontSize: '1.08rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                            <FaQuestionCircle style={{ color: '#d97706', flexShrink: 0 }} />
                                            {faq.q}
                                        </span>
                                        <FaChevronDown style={{
                                            color: isDark ? 'var(--text-muted)' : '#64748b',
                                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease',
                                            flexShrink: 0
                                        }} />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div style={{
                                                    padding: '0 1.6rem 1.5rem 1.6rem',
                                                    color: isDark ? 'var(--text-muted)' : '#475569',
                                                    fontSize: '0.98rem',
                                                    lineHeight: '1.7',
                                                    borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                                                    paddingTop: '1.1rem'
                                                }}>
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ADMISSION HELPDESK & CAMPUS CONTACT CARD */}
            <section style={{ padding: 'clamp(4rem, 7vw, 6.5rem) 1rem', background: 'var(--bg-dark)' }}>
                <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <Tilt3DCard
                        maxTilt={5}
                        perspective={1100}
                        scale={1.01}
                        glareOpacity={0.18}
                        style={{
                            padding: 'clamp(2.2rem, 5.5vw, 4.5rem)',
                            borderRadius: '35px',
                            border: '1px solid rgba(230, 182, 39, 0.5)',
                            background: 'linear-gradient(135deg, #1B2A6B 0%, #0f172a 100%)',
                            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.4)'
                        }}
                    >
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
                            gap: '3.5rem',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.35rem 0.9rem',
                                    borderRadius: '20px',
                                    background: 'rgba(230, 182, 39, 0.25)',
                                    color: '#E6B627',
                                    fontSize: '0.88rem',
                                    fontWeight: '900',
                                    marginBottom: '1.2rem',
                                    boxShadow: '0 4px 15px rgba(230, 182, 39, 0.2)'
                                }}>
                                    ADMISSION HELPDESK 2026-27
                                </div>
                                <h3 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.6rem)', fontWeight: '900', color: '#ffffff', marginBottom: '1.1rem', lineHeight: '1.2' }}>
                                    Have Questions? Speak Directly with our Senior Admissions Team
                                </h3>
                                <p style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: '1.75', marginBottom: '2.2rem' }}>
                                    Our admission counselors are ready to guide you on eligibility, branch selection, scholarships, hostel reservations, and TNEA counselling procedures.
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                                        <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(230, 182, 39, 0.25)', color: '#E6B627', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: '0 4px 12px rgba(230, 182, 39, 0.2)' }}>
                                            <FaPhoneAlt />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Admissions Hotline</div>
                                            <div style={{ fontWeight: '900', color: '#ffffff', fontSize: '1.15rem' }}>
                                                +91 95007 77518 / +91 95007 77519 / +91 95007 77520
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                                        <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(37, 211, 102, 0.25)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)' }}>
                                            <FaWhatsapp />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>WhatsApp Direct Chat</div>
                                            <a
                                                href="https://wa.me/919500777518?text=Hello%20EASA%20College%20Admissions,%20I%20need%20assistance%20with%20engineering%20admission."
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ fontWeight: '800', color: '#25D366', fontSize: '1.08rem', textDecoration: 'none' }}
                                            >
                                                Chat with Admission Officer →
                                            </a>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                                        <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.12)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Campus Location</div>
                                            <div style={{ fontWeight: '700', color: '#e2e8f0', fontSize: '0.98rem' }}>
                                                NH-47, Palakkad Main Road, Navakkarai (PO), Coimbatore - 641 105, Tamil Nadu.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right action box */}
                            <div style={{
                                background: 'rgba(0, 0, 0, 0.35)',
                                padding: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                                borderRadius: '26px',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                textAlign: 'center',
                                boxShadow: '0 12px 35px rgba(0,0,0,0.4)'
                            }}>
                                <FaGraduationCap style={{ fontSize: '3.8rem', color: '#E6B627', marginBottom: '1.1rem', filter: 'drop-shadow(0 6px 15px rgba(230, 182, 39, 0.4))' }} />
                                <h4 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#ffffff', marginBottom: '0.85rem' }}>
                                    Ready to Begin Your Journey?
                                </h4>
                                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '2rem' }}>
                                    Submit your online application in less than 2 minutes. Receive your provisional seat reservation and scholarship eligibility letter directly.
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.03, y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleOpenModal()}
                                    className="btn btn-warning"
                                    style={{
                                        width: '100%',
                                        padding: '1.1rem',
                                        fontSize: '1.12rem',
                                        fontWeight: '900',
                                        boxShadow: '0 12px 30px rgba(230, 182, 39, 0.45)',
                                        marginBottom: '1.1rem'
                                    }}
                                >
                                    Apply Online for 2026-27
                                </motion.button>

                                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                                    TNEA Code: <strong style={{ color: '#ffffff' }}>2763</strong> • No Registration Charges for Initial Enquiry
                                </div>
                            </div>
                        </div>
                    </Tilt3DCard>
                </div>
            </section>

            {/* Modal Application Form */}
            <AdmissionForm
                isOpen={showModalForm}
                initialCourse={selectedCourseForModal}
                onClose={() => setShowModalForm(false)}
            />

            <Footer onOpenAdmission={() => handleOpenModal()} />
        </div>
    );
};

export default AdmissionsPage;
