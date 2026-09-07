import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { 
    FaFilePdf, FaSearch, FaChevronDown, FaChevronUp, FaLeaf, 
    FaFilter, FaTimes, FaExternalLinkAlt, FaAward, FaCheckCircle, 
    FaBookOpen, FaDownload, FaLayerGroup, FaArrowRight
} from "react-icons/fa";
import "./inner1.css";

const naacData = [
    {
        id: "c1",
        number: 1,
        title: "Criterion 1 - Curricular Aspects",
        description: "Curriculum planning, delivery, academic calendar adherence, certificate courses, and stakeholder feedback mechanisms.",
        subCriteria: [
            {
                id: "1.1",
                title: "Criterion 1.1 - Curricular Planning and Implementation",
                items: [
                    { metric: "1.1.1", parameter: "The Institution ensures effective curriculum planning and delivery through a well-planned and documented process including Academic calendar and conduct of continuous internal Assessment (Within 500 words)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-1/1.1.1/1.1.1.pdf" },
                    { metric: "1.1.2", parameter: "Academic Calendar for the Institute 2024 - 2025", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/Institute-academic-calendar-24-25.pdf" }
                ]
            },
            {
                id: "1.2",
                title: "Criterion 1.2 - Academic Flexibility",
                items: [
                    { metric: "1.2.1", parameter: "Number of Add on /Certificate/Value added programs offered during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-1/1.2.1/viewpage.pdf" },
                    { metric: "1.2.2", parameter: "Percentage of students enrolled in Certificate/ Add-on/Value added programs as against the total number of students during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-1/1.2.2/viewpage.pdf" }
                ]
            },
            {
                id: "1.3",
                title: "Criterion 1.3 - Curriculum Enrichment",
                items: [
                    { metric: "1.3.1", parameter: "Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability into the Curriculum", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-1/1.3.1/1.3.1.pdf" },
                    { metric: "1.3.2", parameter: "Percentage of students undertaking project work/field work/ internships (Data for the latest completed academic year)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-1/1.3.2/viewpage.pdf" }
                ]
            },
            {
                id: "1.4",
                title: "Criterion 1.4 - Feedback System",
                items: [
                    { metric: "1.4.1", parameter: "Institution obtains feedback on the academic performance and ambience of the institution from various stakeholders, such as Students, Teachers, Employers, Alumni etc. and action taken report on the feedback is made available on institutional website", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-1/1.4.1/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c2",
        number: 2,
        title: "Criterion 2 - Teaching-Learning and Evaluation",
        description: "Student enrollment, teacher-student ratio, experiential learning methods, faculty qualification, and transparent evaluation outcomes.",
        subCriteria: [
            {
                id: "2.1",
                title: "Criterion 2.1 - Student Enrolment and Profile",
                items: [
                    { metric: "2.1.1", parameter: "Enrolment percentage", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.1.1/viewpage.pdf" },
                    { metric: "2.1.2", parameter: "Percentage of seats filled against seats reserved for various categories (SC, ST, OBC, Divyangjan, etc. as per applicable reservation policy during the last five years (Exclusive of supernumerary seats)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.1.2/viewpage.pdf" }
                ]
            },
            {
                id: "2.2",
                title: "Criterion 2.2 - Student Teacher Ratio",
                items: [
                    { metric: "2.2.1", parameter: "Student – Full time Teacher Ratio (Data for the latest completed academic year)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.2.1/viewpage.pdf" }
                ]
            },
            {
                id: "2.3",
                title: "Criterion 2.3 - Teaching- Learning Process",
                items: [
                    { metric: "2.3.1", parameter: "Student centric methods, such as experiential learning, participative learning and problem solving methodologies are used for enhancing learning experiences using ICT tools", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.3.1/2.3.1.pdf" }
                ]
            },
            {
                id: "2.4",
                title: "Criterion 2.4 - Teacher Profile and Quality",
                items: [
                    { metric: "2.4.1", parameter: "Percentage of full-time teachers against sanctioned posts during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.4.1/viewpage.pdf" },
                    { metric: "2.4.2", parameter: "Percentage of full time teachers with NET/SET/SLET/ Ph. D. / D.M. / M.Ch. / D.N.B Super specialty / D.Sc. / D.Litt. during the last five years (Consider only highest degree for count)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.4.2/viewpage.pdf" }
                ]
            },
            {
                id: "2.5",
                title: "Criterion 2.5 - Evaluation Process and Reforms",
                items: [
                    { metric: "2.5.1", parameter: "Mechanism of internal/ external assessment is transparent and the grievance redressal system is time-bound and efficient", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.5.1/viewpage.pdf" }
                ]
            },
            {
                id: "2.6",
                title: "Criterion 2.6 - Student Performance and Learning Outcomes",
                items: [
                    { metric: "2.6.1", parameter: "Programme Outcomes (POs) and Course Outcomes (COs) for all Programmes offered by the institution are stated and displayed on website and attainment of POs and COs are evaluated", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.6.1/viewpage.pdf" },
                    { metric: "2.6.2", parameter: "Pass percentage of Students during last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.6.2/2.6.2-index.pdf" }
                ]
            },
            {
                id: "2.7",
                title: "Criterion 2.7 - Student Satisfaction Survey",
                items: [
                    { metric: "2.7.1", parameter: "Online student satisfaction survey regarding to teaching learning process (Online survey conducted)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-2/2.7.1/2.7.1-index.pdf" }
                ]
            }
        ]
    },
    {
        id: "c3",
        number: 3,
        title: "Criterion 3 - Research, Innovations and Extension",
        description: "Research grants, innovation ecosystem, publications, community extension activities, and industry MOUs.",
        subCriteria: [
            {
                id: "3.1",
                title: "Criterion 3.1 - Resource Mobilization for Research",
                items: [
                    { metric: "3.1.1", parameter: "Grants received from Government and non-governmental agencies for research projects / endowments in the institution during the last five years (INR in Lakhs)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.1.1/viewpage.pdf" }
                ]
            },
            {
                id: "3.2",
                title: "Criterion 3.2 - Innovation Ecosystem",
                items: [
                    { metric: "3.2.1", parameter: "Institution has created an ecosystem for innovations and has initiatives for creation and transfer of knowledge (patents filed, published, incubation center facilities in the HEI)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.2.1/viewpage.pdf" },
                    { metric: "3.2.2", parameter: "Number of workshops/seminars/conferences including on Research Methodology, Intellectual Property Rights (IPR) and entrepreneurship conducted during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.2.2/viewpage.pdf" }
                ]
            },
            {
                id: "3.3",
                title: "Criterion 3.3 - Research Publications and Awards",
                items: [
                    { metric: "3.3.1", parameter: "Number of research papers published per teacher in the Journals notified on UGC care list during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.3.1/viewpage.pdf" },
                    { metric: "3.3.2", parameter: "Number of books and chapters in edited volumes/books published and papers published in national/ international conference proceedings per teacher during last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.3.2/viewpage.pdf" }
                ]
            },
            {
                id: "3.4",
                title: "Criterion 3.4 - Extension Activities",
                items: [
                    { metric: "3.4.1", parameter: "Extension activities are carried out in the neighborhood community, sensitizing students to social issues, for their holistic development, and impact thereof during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.4.1/viewpage.pdf" },
                    { metric: "3.4.2", parameter: "Awards and recognitions received for extension activities from government / government recognised bodies", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.4.2/viewpage.pdf" },
                    { metric: "3.4.3", parameter: "Number of extension and outreach programs conducted by the institution through NSS/NCC/Red cross/YRC etc., during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.4.3/viewpage.pdf" }
                ]
            },
            {
                id: "3.5",
                title: "Criterion 3.5 - Collaboration",
                items: [
                    { metric: "3.5.1", parameter: "The number of MoUs, collaborations/linkages for Faculty exchange, Student exchange, Internship, Field trip, On-the-job training, research and other academic activities during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-3/3.5.1/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c4",
        number: 4,
        title: "Criterion 4 - Infrastructure and Learning Resources",
        description: "Physical classrooms, modern labs, ICT facilities, automated digital library resources, IT infrastructure, and campus maintenance.",
        subCriteria: [
            {
                id: "4.1",
                title: "Criterion 4.1 - Physical Facilities",
                items: [
                    { metric: "4.1.1", parameter: "Availability of adequate infrastructure and physical facilities viz., classrooms, laboratories, ICT facilities, cultural activities, gymnasium, yoga centre etc. in the institution", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-4/4.1.1/4.1.1-index.pdf" },
                    { metric: "4.1.2", parameter: "Percentage of expenditure, excluding salary for infrastructure augmentation during last five years (INR in Lakhs)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-4/4.1.2/viewpage.pdf" }
                ]
            },
            {
                id: "4.2",
                title: "Criterion 4.2 - Library as a Learning Resource",
                items: [
                    { metric: "4.2.1", parameter: "Library is automated using Integrated Library Management System (ILMS), subscription to e-resources, amount spent on purchase of books, journals and per day usage of library", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-4/4.2.1/4.2.1-index.pdf" }
                ]
            },
            {
                id: "4.3",
                title: "Criterion 4.3 - IT Infrastructure",
                items: [
                    { metric: "4.3.1", parameter: "Institution frequently updates its IT facilities and provides sufficient bandwidth for internet connection", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-4/4.3.1/4.3.1-index.pdf" },
                    { metric: "4.3.2", parameter: "Student – Computer ratio (Data for the latest completed academic year)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-4/4.3.2/4.3.2-index.pdf" }
                ]
            },
            {
                id: "4.4",
                title: "Criterion 4.4 - Maintenance of Campus Infrastructure",
                items: [
                    { metric: "4.4.1", parameter: "Percentage of expenditure incurred on maintenance of infrastructure (physical and academic support facilities) excluding salary component during the last five years (INR in Lakhs)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-4/4.4.1/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c5",
        number: 5,
        title: "Criterion 5 - Student Support and Progression",
        description: "Scholarships, skills enhancement programs, career guidance, grievance redressal, placements, sports, and registered alumni association.",
        subCriteria: [
            {
                id: "5.1",
                title: "Criterion 5.1 - Student Support",
                items: [
                    { metric: "5.1.1", parameter: "Percentage of students benefited by scholarships and freeships provided by the Government and Non-Government agencies during last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.1.1/viewpage.pdf" },
                    { metric: "5.1.2", parameter: "Capacity building and skills enhancement initiatives taken by the institution include: Soft skills, Language and communication skills, Life skills, ICT/computing skills", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.1.2/viewpage.pdf" },
                    { metric: "5.1.3", parameter: "Percentage of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.1.3/viewpage.pdf" },
                    { metric: "5.1.4", parameter: "The Institution has a transparent mechanism for timely redressal of student grievances including sexual harassment and ragging cases", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.1.4/viewpage.pdf" }
                ]
            },
            {
                id: "5.2",
                title: "Criterion 5.2 - Student Progression",
                items: [
                    { metric: "5.2.1", parameter: "Percentage of placement of outgoing students and students progressing to higher education during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.2.1/viewpage.pdf" },
                    { metric: "5.2.2", parameter: "Percentage of students qualifying in state/national/ international level examinations during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.2.2/viewpage.pdf" }
                ]
            },
            {
                id: "5.3",
                title: "Criterion 5.3 - Student Participation and Activities",
                items: [
                    { metric: "5.3.1", parameter: "Number of awards/medals for outstanding performance in sports/ cultural activities at University / state/ national / international level during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.3.1/viewpage.pdf" },
                    { metric: "5.3.2", parameter: "Average number of sports and cultural programs in which students of the Institution participated during last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.3.2/viewpage.pdf" }
                ]
            },
            {
                id: "5.4",
                title: "Criterion 5.4 - Alumni Engagement",
                items: [
                    { metric: "5.4.1", parameter: "There is a registered Alumni Association that contributes significantly to the development of the institution through financial and/or other support services", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-5/5.4.1/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c6",
        number: 6,
        title: "Criterion 6 - Governance, Leadership and Management",
        description: "Visionary governance, e-governance deployment, staff welfare, faculty development programs, resource mobilization, and IQAC quality assurance.",
        subCriteria: [
            {
                id: "6.1",
                title: "Criterion 6.1 - Institutional Vision and Leadership",
                items: [
                    { metric: "6.1.1", parameter: "The governance and leadership is in accordance with vision and mission of the institution and it is visible in various institutional practices such as decentralization and participation in the institutional governance", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.1.1/viewpage.pdf" }
                ]
            },
            {
                id: "6.2",
                title: "Criterion 6.2 - Strategy Development and Deployment",
                items: [
                    { metric: "6.2.1", parameter: "The functioning of the institutional bodies is effective and efficient as visible from policies, administrative setup, appointment and service rules, procedures, deployment of institutional Strategic/ perspective/development plan etc", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.2.1/viewpage.pdf" },
                    { metric: "6.2.2", parameter: "Implementation of e-governance in areas of operation: Administration, Finance and Accounts, Student Admission and Support, Examination", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.2.2/viewpage.pdf" }
                ]
            },
            {
                id: "6.3",
                title: "Criterion 6.3 - Faculty Empowerment Strategies",
                items: [
                    { metric: "6.3.1", parameter: "The institution has effective welfare measures and Performance Appraisal System for teaching and non-teaching staff", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.3.1/viewpage.pdf" },
                    { metric: "6.3.2", parameter: "Percentage of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.3.2/viewpage.pdf" },
                    { metric: "6.3.3", parameter: "Percentage of teaching and non-teaching staff participating in Faculty development Programmes (FDP), professional development /administrative training programs during the last five years", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.3.3/viewpage.pdf" }
                ]
            },
            {
                id: "6.4",
                title: "Criterion 6.4 - Financial Management and Resource Mobilization",
                items: [
                    { metric: "6.4.1", parameter: "Institution has strategies for mobilization and optimal utilization of resources and funds from various sources and it conducts financial audits regularly", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.4.1/viewpage.pdf" }
                ]
            },
            {
                id: "6.5",
                title: "Criterion 6.5 - Internal Quality Assurance System",
                items: [
                    { metric: "6.5.1", parameter: "Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing the quality assurance strategies and processes", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.5.1/viewpage.pdf" },
                    { metric: "6.5.2", parameter: "Quality assurance initiatives of the institution include: Regular meeting of IQAC, Collaborative quality initiatives, Participation in NIRF, Any other quality audit", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-6/6.5.2/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c7",
        number: 7,
        title: "Criterion 7 - Institutional Values and Best Practices",
        description: "Gender equity, environmental sustainability, energy audits, inclusive cultural harmony, institutional best practices, and distinctive institutional thrust.",
        subCriteria: [
            {
                id: "7.1",
                title: "Criterion 7.1 - Institutional Values and Social Responsibilities",
                items: [
                    { metric: "7.1.1", parameter: "Measures initiated by the Institution for the promotion of gender equity and Institutional initiatives to celebrate / organize national and international commemorative days, events and festivals during the last five years (Within 500 words)", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-7/7.1.1/viewpage.pdf" },
                    { metric: "7.1.2", parameter: "The Institution has facilities and initiatives for Alternate sources of energy, Waste management, Water conservation, Green campus, Disabled-friendly environment", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-7/7.1.2/viewpage.pdf" },
                    { metric: "7.1.3", parameter: "Quality audits on environment and energy regularly undertaken by the Institution", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-7/7.1.3/viewpage.pdf" },
                    { metric: "7.1.4", parameter: "Describe the Institutional efforts/initiatives in providing an inclusive environment i.e., tolerance and harmony towards cultural, regional, linguistic, communal socioeconomic and Sensitization of students and employees", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-7/7.1.4/viewpage.pdf" }
                ]
            },
            {
                id: "7.2",
                title: "Criterion 7.2 - Best Practices",
                items: [
                    { metric: "7.2.1", parameter: "Describe two best practices successfully implemented by the Institution as per NAAC format provided in the Manual", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-7/7.2.1/viewpage.pdf" }
                ]
            },
            {
                id: "7.3",
                title: "Criterion 7.3 - Institutional Distinctiveness",
                items: [
                    { metric: "7.3.1", parameter: "Portray the performance of the Institution in one area distinctive to its priority and thrust within 1000 words", link: "https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/criterion-7/7.3.1/viewpage.pdf" }
                ]
            }
        ]
    }
];

const Naac = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCriterionFilter, setSelectedCriterionFilter] = useState("all");
    const [expandedCriteria, setExpandedCriteria] = useState({
        c1: true,
        c2: true,
        c3: true,
        c4: true,
        c5: true,
        c6: true,
        c7: true
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Toggle single criterion
    const toggleCriterion = (id) => {
        setExpandedCriteria(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Expand / Collapse all
    const handleExpandAll = (expand = true) => {
        const updated = {};
        naacData.forEach(c => {
            updated[c.id] = expand;
        });
        setExpandedCriteria(updated);
    };

    // Smooth scroll to section
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 190;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    // Calculate metric counts
    const totalMetricsCount = useMemo(() => {
        return naacData.reduce((acc, crit) => {
            return acc + crit.subCriteria.reduce((subAcc, sub) => subAcc + sub.items.length, 0);
        }, 0);
    }, []);

    // Filtered data based on search and criterion tab
    const filteredNaacData = useMemo(() => {
        return naacData
            .filter(criterion => {
                if (selectedCriterionFilter === "all") return true;
                return criterion.id === selectedCriterionFilter;
            })
            .map(criterion => {
                if (!searchTerm.trim()) return criterion;

                const lowerSearch = searchTerm.toLowerCase().trim();
                const matchedSubCriteria = criterion.subCriteria.map(sub => {
                    const matchedItems = sub.items.filter(item => 
                        item.metric.toLowerCase().includes(lowerSearch) ||
                        item.parameter.toLowerCase().includes(lowerSearch)
                    );
                    return {
                        ...sub,
                        items: matchedItems
                    };
                }).filter(sub => sub.items.length > 0);

                return {
                    ...criterion,
                    subCriteria: matchedSubCriteria
                };
            })
            .filter(criterion => criterion.subCriteria.length > 0);
    }, [searchTerm, selectedCriterionFilter]);

    // Total matched metrics in search
    const visibleMetricsCount = useMemo(() => {
        return filteredNaacData.reduce((acc, crit) => {
            return acc + crit.subCriteria.reduce((subAcc, sub) => subAcc + sub.items.length, 0);
        }, 0);
    }, [filteredNaacData]);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true }
    };

    return (
        <div className="naac-page">
            <SEO
                title="NAAC Accreditation | EASA College of Engineering and Technology"
                description="Official NAAC Documentation, Self-Study Report (SSR), DVV Clarifications, Extended Profile, and All 7 Criteria Documentation for EASA College."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac"
                defaultTitle="National Assessment and Accreditation Council"
                defaultSubtitle="Institutional Assessment, Self Study Reports & Quality Benchmark Documentation"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp"
            />

            {/* Quick Access Top Bar */}
            <section className="scroll-menu-container">
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem' }}>
                    <ul className="scroll-menu-list">
                        <li className="ssr-link-item">
                            <a href="https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/ssr.pdf" target="_blank" rel="noreferrer" className="highlight-pill">
                                <FaDownload style={{ marginRight: '6px' }} /> SSR Report
                            </a>
                        </li>
                        <li><a href="/naac-dvv-clarifications"><FaCheckCircle className="menu-icon" /> DVV Clarification</a></li>
                        <li><a href="/naac-extended-profile"><FaBookOpen className="menu-icon" /> Extended Profile</a></li>
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                            <li key={num}>
                                <a 
                                    href={`#c${num}`} 
                                    onClick={(e) => { 
                                        e.preventDefault(); 
                                        setSelectedCriterionFilter("all");
                                        scrollToSection(`c${num}`); 
                                    }}
                                >
                                    <FaLeaf className="menu-icon" /> Criterion {num}
                                </a>
                            </li>
                        ))}
                        <li><a href="/naac-committee"><FaLayerGroup className="menu-icon" /> Committees</a></li>
                        <li><a href="/naac-distinction"><FaAward className="menu-icon" /> Distinction</a></li>
                        <li><a href="/naac-best-practices"><FaLeaf className="menu-icon" /> Best Practices</a></li>
                        <li><a href="/naac-feedback"><FaCheckCircle className="menu-icon" /> Feedback</a></li>
                        <li><a href="/naac-rti"><FaBookOpen className="menu-icon" /> RTI</a></li>
                    </ul>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="container naac-content py-12" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>
                
                {/* 3D Overview Highlights Banner */}
                <div className="naac-overview-grid mb-10">
                    <div className="overview-3d-card primary-highlight">
                        <div className="overview-icon-box">
                            <FaAward className="overview-icon" />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge">Institutional Commitment</span>
                            <h3 className="overview-title">NAAC Accreditation</h3>
                            <p className="overview-text">
                                Complete compliance with NAAC quality parameters upholding academic and research excellence across all 7 criteria.
                            </p>
                        </div>
                    </div>

                    <div className="overview-3d-card action-card-item">
                        <div className="overview-icon-box gold">
                            <FaFilePdf className="overview-icon" />
                        </div>
                        <div className="overview-details">
                            <span className="overview-badge gold">Direct Download</span>
                            <h3 className="overview-title">Self Study Report (SSR)</h3>
                            <p className="overview-text">
                                Access the official Self Study Report submitted to NAAC.
                            </p>
                            <a 
                                href="https://easa-college.s3.eu-north-1.amazonaws.com/assets/naac/ssr.pdf" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="btn-ssr-download"
                            >
                                <FaDownload /> Download SSR PDF <FaArrowRight />
                            </a>
                        </div>
                    </div>

                    <div className="overview-3d-card stat-summary-card">
                        <div className="stat-pill-row">
                            <div className="stat-pill-item">
                                <span className="stat-num">7</span>
                                <span className="stat-label">Core Criteria</span>
                            </div>
                            <div className="stat-pill-item">
                                <span className="stat-num">{totalMetricsCount}</span>
                                <span className="stat-label">Verified Metrics</span>
                            </div>
                            <div className="stat-pill-item">
                                <span className="stat-num">100%</span>
                                <span className="stat-label">Transparency</span>
                            </div>
                        </div>
                        <div className="quick-links-mini">
                            <a href="/naac-dvv-clarifications" className="mini-link">DVV Clarifications <FaExternalLinkAlt /></a>
                            <a href="/naac-extended-profile" className="mini-link">Extended Profile <FaExternalLinkAlt /></a>
                        </div>
                    </div>
                </div>

                {/* Interactive Search & Filter Controls */}
                <div className="search-filter-card mb-8">
                    <div className="search-filter-header">
                        <div className="search-input-wrapper">
                            <FaSearch className="search-icon-field" />
                            <input
                                type="text"
                                placeholder="Search metric (e.g. 1.1.1, 2.3.1) or keywords (curriculum, research, placement, library)..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="naac-search-input"
                            />
                            {searchTerm && (
                                <button 
                                    className="clear-search-btn" 
                                    onClick={() => setSearchTerm("")}
                                    title="Clear search"
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>

                        <div className="view-controls">
                            <button 
                                className="control-btn" 
                                onClick={() => handleExpandAll(true)}
                                title="Expand all sections"
                            >
                                <FaChevronDown /> Expand All
                            </button>
                            <button 
                                className="control-btn" 
                                onClick={() => handleExpandAll(false)}
                                title="Collapse all sections"
                            >
                                <FaChevronUp /> Collapse All
                            </button>
                        </div>
                    </div>

                    {/* Criteria Tab Filters */}
                    <div className="criteria-tabs-wrapper">
                        <span className="filter-label"><FaFilter /> Filter:</span>
                        <div className="criteria-tabs-list">
                            <button
                                className={`criteria-tab-pill ${selectedCriterionFilter === "all" ? "active" : ""}`}
                                onClick={() => setSelectedCriterionFilter("all")}
                            >
                                All Criteria ({totalMetricsCount})
                            </button>
                            {naacData.map(c => {
                                const count = c.subCriteria.reduce((sum, s) => sum + s.items.length, 0);
                                return (
                                    <button
                                        key={c.id}
                                        className={`criteria-tab-pill ${selectedCriterionFilter === c.id ? "active" : ""}`}
                                        onClick={() => setSelectedCriterionFilter(c.id)}
                                    >
                                        Criterion {c.number} <span className="pill-count">({count})</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Results Counter Banner */}
                    <div className="results-status-row">
                        <span className="results-badge">
                            Showing <strong>{visibleMetricsCount}</strong> metric parameters
                            {searchTerm && ` matching "${searchTerm}"`}
                            {selectedCriterionFilter !== "all" && ` in ${naacData.find(c => c.id === selectedCriterionFilter)?.title}`}
                        </span>
                        {searchTerm && (
                            <button className="reset-filter-btn" onClick={() => { setSearchTerm(""); setSelectedCriterionFilter("all"); }}>
                                Reset All Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Criteria Content List */}
                {filteredNaacData.length === 0 ? (
                    <div className="no-results-card">
                        <FaSearch className="no-results-icon" />
                        <h3>No metrics found matching "{searchTerm}"</h3>
                        <p>Try searching for another metric number (e.g., 1.1.1, 2.1.1, 3.4.1) or clear filters to view all documents.</p>
                        <button className="btn btn-warning" onClick={() => { setSearchTerm(""); setSelectedCriterionFilter("all"); }}>
                            View All NAAC Metrics
                        </button>
                    </div>
                ) : (
                    filteredNaacData.map((criterion) => {
                        const isExpanded = expandedCriteria[criterion.id] !== false;
                        const criterionMetricsTotal = criterion.subCriteria.reduce((sum, s) => sum + s.items.length, 0);

                        return (
                            <motion.section
                                key={criterion.id}
                                id={criterion.id}
                                className="criterion-card-wrapper mb-10"
                                {...fadeInUp}
                            >
                                {/* Criterion Header */}
                                <div 
                                    className={`criterion-card-header ${isExpanded ? "open" : ""}`}
                                    onClick={() => toggleCriterion(criterion.id)}
                                >
                                    <div className="header-left">
                                        <div className="criterion-badge-3d">
                                            <span>CRITERION</span>
                                            <strong>{criterion.number}</strong>
                                        </div>
                                        <div className="header-text-group">
                                            <h3 className="criterion-heading">{criterion.title}</h3>
                                            <p className="criterion-subdesc">{criterion.description}</p>
                                        </div>
                                    </div>
                                    <div className="header-right">
                                        <span className="metrics-counter-pill">
                                            {criterionMetricsTotal} {criterionMetricsTotal === 1 ? 'Metric' : 'Metrics'}
                                        </span>
                                        <div className="accordion-arrow-btn">
                                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                                        </div>
                                    </div>
                                </div>

                                {/* Criterion Body */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: "easeInOut" }}
                                            className="criterion-card-body"
                                        >
                                            {criterion.subCriteria.map((sub) => (
                                                <div key={sub.id} className="subcriterion-group mb-6">
                                                    <div className="subcriterion-header">
                                                        <h4 className="subcriterion-title">
                                                            <span className="gold-bar"></span> {sub.title}
                                                        </h4>
                                                        <span className="sub-count-tag">{sub.items.length} {sub.items.length === 1 ? 'item' : 'items'}</span>
                                                    </div>

                                                    {/* Metric Cards List */}
                                                    <div className="metric-items-list">
                                                        {sub.items.map((item, idx) => (
                                                            <div key={idx} className="metric-row-card">
                                                                <div className="metric-id-column">
                                                                    <span className="metric-code-pill">{item.metric}</span>
                                                                </div>
                                                                <div className="metric-parameter-column">
                                                                    <p className="parameter-description">{item.parameter}</p>
                                                                </div>
                                                                <div className="metric-action-column">
                                                                    <a 
                                                                        href={item.link} 
                                                                        target="_blank" 
                                                                        rel="noreferrer" 
                                                                        className="btn-view-document"
                                                                        title={`View PDF document for Metric ${item.metric}`}
                                                                    >
                                                                        <FaFilePdf className="pdf-icon" />
                                                                        <span>View Document</span>
                                                                        <FaExternalLinkAlt className="ext-icon" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.section>
                        );
                    })
                )}
            </div>

            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    );
};

export default Naac;
