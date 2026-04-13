import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { FaFilePdf, FaLeaf, FaTable, FaInfoCircle } from "react-icons/fa";
import "./inner1.css";

const dvvData = {
    extendedProfile: [
        { metric: "1.1", parameter: "Number of students year wise during the last five years", link: "/assets/naac/dvv-clarification/extended-profile/1.1/viewpage.pdf" },
        { metric: "2.1", parameter: "Number of teaching staff / full time teachers during the last five years (Without repeat count)", link: "/assets/naac/dvv-clarification/extended-profile/2.1/viewpage.pdf" },
        { metric: "2.2", parameter: "Number of teaching staff / full time teachers year wise during the last five years", link: "/assets/naac/dvv-clarification/extended-profile/2.2/viewpage.pdf" },
        { metric: "3.1", parameter: "Expenditure excluding salary component year wise during the last five years (INR in lakhs)", link: "/assets/naac/dvv-clarification/extended-profile/3.1/viewpage.pdf" }
    ],
    criteria: [
        {
            id: "c1",
            title: "Criteria 1 - Curricular Aspects",
            items: [
                { metric: "1.2.1", parameter: "Number of Add on /Certificate/ Value added programs offered during the last five years", link: "/assets/naac/dvv-clarification/criterion-1/1.2.1/viewpage.pdf" },
                { metric: "1.2.2", parameter: "Percentage of students enrolled in Certificate/ Add-on/Value added programs as against the total number of students during the last five years", link: "/assets/naac/dvv-clarification/criterion-1/1.2.2/viewpage.pdf" },
                { metric: "1.3.2", parameter: "Percentage of students undertaking project work/field work/ internships (Data for the latest completed academic year)", link: "/assets/naac/dvv-clarification/criterion-1/1.3.2/viewpage.pdf" },
                { metric: "1.4.1", parameter: "Institution obtains feedback on the academic performance and ambience of the institution from various stakeholders, such as Students, Teachers, Employers, Alumni etc. and action taken report on the feedback is made available on institutional website (Yes or No)", link: "/assets/naac/dvv-clarification/criterion-1/1.4.1/viewpage.pdf" }
            ]
        },
        {
            id: "c2",
            title: "Criteria 2 – Teaching Learning and Evaluation",
            items: [
                { metric: "2.1.1", parameter: "Enrolment percentage", link: "/assets/naac/dvv-clarification/criterion-2/2.1.1/viewpage.pdf" },
                { metric: "2.1.2", parameter: "Percentage of seats filled against seats reserved for various categories (SC, ST, OBC, Divyangjan, etc. as per applicable reservation policy) during the last five years (Exclusive of supernumerary seats)", link: "/assets/naac/dvv-clarification/criterion-2/2.1.2/viewpage.pdf" },
                { metric: "2.2.1", parameter: "Student – Full time Teacher Ratio (Data for the latest completed academic year)", link: "/assets/naac/dvv-clarification/criterion-2/2.2.1/viewpage.pdf" },
                { metric: "2.4.1", parameter: "Percentage of full-time teachers against sanctioned posts during the last five years", link: "/assets/naac/dvv-clarification/criterion-2/2.4.1/viewpage.pdf" },
                { metric: "2.4.2", parameter: "Percentage of full time teachers with NET/SET/SLET/ Ph. D. / D.M. / M.Ch. / D.N.B Superspeciality / D.Sc. / D.Litt. during the last five years (consider only highest degree for count)", link: "/assets/naac/dvv-clarification/criterion-2/2.4.2/viewpage.pdf" },
                { metric: "2.6.2", parameter: "Pass percentage of Students during last five years", link: "/assets/naac/dvv-clarification/criterion-2/2.6.2/viewpage.pdf" }
            ]
        },
        {
            id: "c3",
            title: "Criteria 3 - Research, Innovations and Extension",
            items: [
                { metric: "3.1.1", parameter: "Grants received from Government and non-governmental agencies for research projects / endowments in the institution during the last five years (INR in Lakhs)", link: "/assets/naac/dvv-clarification/criterion-3/3.1.1/viewpage.pdf" },
                { metric: "3.2.2", parameter: "Number of workshops/seminars/conferences including on Research Methodology, Intellectual Property Rights (IPR) and entrepreneurship conducted during the last five years", link: "/assets/naac/dvv-clarification/criterion-3/3.2.2/viewpage.pdf" },
                { metric: "3.3.1", parameter: "Number of research papers published per teacher in the Journals notified on UGC care list during the last five years", link: "/assets/naac/dvv-clarification/criterion-3/3.3.1/viewpage.pdf" },
                { metric: "3.3.2", parameter: "Number of books and chapters in edited volumes/books published and papers published in national/ international conference proceedings per teacher during last five years", link: "/assets/naac/dvv-clarification/criterion-3/3.3.2/viewpage.pdf" },
                { metric: "3.4.3", parameter: "Number of extension and outreach programs conducted by the institution through NSS/NCC/Red cross/YRC etc., (including the programmes such as Swachh Bharat, AIDS awareness, Gender issues etc. and/or those organised in collaboration with industry, community and NGOs) during the last five years", link: "/assets/naac/dvv-clarification/criterion-3/3.4.3/viewpage.pdf" },
                { metric: "3.5.1", parameter: "Number of functional MoUs/linkages with institutions/ industries in India and abroad for internship, on-the-job training, project work, student / faculty exchange and collaborative research during the last five years.", link: "/assets/naac/dvv-clarification/criterion-3/3.5.1/viewpage.pdf" }
            ]
        },
        {
            id: "c4",
            title: "Criteria 4 - Infrastructure and Learning Resources",
            items: [
                { metric: "4.1.2", parameter: "Percentage of expenditure, excluding salary for infrastructure augmentation during last five years (INR in Lakhs)", link: "/assets/naac/dvv-clarification/criterion-4/4.1.2/viewpage.pdf" },
                { metric: "4.3.2", parameter: "Student – Computer ratio (Data for the latest completed academic year)", link: "/assets/naac/dvv-clarification/criterion-4/4.3.2/viewpage.pdf" },
                { metric: "4.4.1", parameter: "Percentage of expenditure incurred on maintenance of infrastructure (physical and academic support facilities) excluding salary component during the last five years (INR in Lakhs)", link: "/assets/naac/dvv-clarification/criterion-4/4.4.1/viewpage.pdf" }
            ]
        },
        {
            id: "c5",
            title: "Criteria 5 - Student Support and Progression",
            items: [
                { metric: "5.1.1", parameter: "Percentage of students benefited by scholarships and free ships provided by the Government and Non-Government agencies during last five years", link: "/assets/naac/dvv-clarification/criterion-5/5.1.1/viewpage.pdf" },
                { metric: "5.1.2", parameter: "Capacity building and skills enhancement initiatives taken by the institution include: Soft skills, Language and communication skills, Life skills, ICT/computing skills", link: "/assets/naac/dvv-clarification/criterion-5/5.1.2/viewpage.pdf" },
                { metric: "5.1.3", parameter: "Percentage of students benefitted by guidance for competitive examinations and career counselling offered by the Institution during the last five years", link: "/assets/naac/dvv-clarification/criterion-5/5.1.3/viewpage.pdf" },
                { metric: "5.1.4", parameter: "The Institution has a transparent mechanism for timely redressal of student grievances including sexual harassment and ragging cases", link: "/assets/naac/dvv-clarification/criterion-5/5.1.4/viewpage.pdf" },
                { metric: "5.2.1", parameter: "Percentage of placement of outgoing students and students progressing to higher education during the last five years", link: "/assets/naac/dvv-clarification/criterion-5/5.2.1/viewpage.pdf" },
                { metric: "5.2.2", parameter: "Percentage of students qualifying in state/national/ international level examinations during the last five years", link: "/assets/naac/dvv-clarification/criterion-5/5.2.2/viewpage.pdf" },
                { metric: "5.3.1", parameter: "Number of awards/medals for outstanding performance in sports/ cultural activities at University / state/ national / international level during the last five years", link: "/assets/naac/dvv-clarification/criterion-5/5.3.1/viewpage.pdf" },
                { metric: "5.3.2", parameter: "Average number of sports and cultural programs in which students of the Institution participated during last five years", link: "/assets/naac/dvv-clarification/criterion-5/5.3.2/viewpage.pdf" }
            ]
        },
        {
            id: "c6",
            title: "Criteria 6 - Governances, Leadership and Management",
            items: [
                { metric: "6.2.2", parameter: "Implementation of e-governance in areas of operation: Administration, Finance and Accounts, Student Admission and Support, Examination", link: "/assets/naac/dvv-clarification/criterion-6/6.2.2/viewpage.pdf" },
                { metric: "6.3.2", parameter: "Percentage of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies during the last five years", link: "/assets/naac/dvv-clarification/criterion-6/6.3.2/viewpage.pdf" },
                { metric: "6.3.3", parameter: "Percentage of teaching and non-teaching staff participating in Faculty development Programmes (FDP), professional development /administrative training programs during the last five years", link: "/assets/naac/dvv-clarification/criterion-6/6.3.3/viewpage.pdf" },
                { metric: "6.5.2", parameter: "Quality assurance initiatives of the institution include: Regular meeting of IQAC, Collaborative quality initiatives, Participation in NIRF, Any other quality audit", link: "/assets/naac/dvv-clarification/criterion-6/6.5.2/viewpage.pdf" }
            ]
        },
        {
            id: "c7",
            title: "Criteria 7 - Institutional Values and Best Practices",
            items: [
                { metric: "7.1.2", parameter: "The Institution has facilities and initiatives for: Alternate sources of energy, Waste management, Water conservation, Green campus, Disabled-friendly environment", link: "/assets/naac/dvv-clarification/criterion-7/7.1.2/viewpage.pdf" },
                { metric: "7.1.3", parameter: "Quality audits on environment and energy regularly undertaken by the Institution.", link: "/assets/naac/dvv-clarification/criterion-7/7.1.3/viewpage.pdf" }
            ]
        }
    ]
};

const NaacDvv = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [activeTab, setActiveTab] = useState("dvv"); // "dvv" or "profile"

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (id) => {
        if (id.startsWith('c') && id !== 'c') {
            setActiveTab('dvv');
        } else if (id === 'c') {
            setActiveTab('profile');
        }

        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const offset = 220;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }, 100);
    };

    const handleViewPdf = (e, link) => {
        e.preventDefault();
        setPdfUrl(link);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="naac-page">
            <SEO
                title="DVV Clarification | NAAC | EASA College"
                description="DVV Clarification details and documentation for National Assessment and Accreditation Council (NAAC) at EASA College."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac-dvv"
                defaultTitle="DVV Clarification"
                defaultSubtitle="Data Validation and Verification for NAAC Accreditation"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp"
            />

            {/* PDF Modal */}
            <AnimatePresence>
                {pdfUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pdf-modal-overlay"
                        onClick={() => setPdfUrl(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="pdf-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="pdf-modal-header">
                                <h3>Document Viewer</h3>
                                <button className="close-btn" onClick={() => setPdfUrl(null)}>&times;</button>
                            </div>
                            <div className="pdf-modal-body">
                                <iframe
                                    src={pdfUrl}
                                    title="PDF Viewer"
                                    className="pdf-iframe"
                                />
                            </div>
                            <div className="pdf-modal-footer">
                                <a href={pdfUrl} target="_blank" rel="noreferrer" className="view-btn">
                                    Open in New Tab
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Menu */}
            <section className="scroll-menu-container">
                <ul className="scroll-menu-list">
                    <li className="ssr-link-item"><a href="/assets/naac/ssr.pdf" target="_blank" rel="noreferrer">SSR</a></li>
                    <li><a href="/naac-dvv-clarifications" className="active"><FaLeaf className="menu-icon" /> DVV Clarification</a></li>
                    <li><a href="/naac-extended-profile"><FaLeaf className="menu-icon" /> Extended Profile</a></li>
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <li key={num}><a href={`#c${num}`} onClick={(e) => { e.preventDefault(); scrollToSection(`c${num}`); }}><FaLeaf className="menu-icon" /> Criterion {num}</a></li>
                    ))}
                    <li><a href="/naac-committee"><FaLeaf className="menu-icon" /> Committees</a></li>
                    <li><a href="/naac-distinction"><FaLeaf className="menu-icon" /> Distinction</a></li>
                    <li><a href="/naac-best-practices"><FaLeaf className="menu-icon" /> Best Practices</a></li>
                    <li><a href="/naac-feedback"><FaLeaf className="menu-icon" /> Feedback</a></li>
                    <li><a href="/naac-rti"><FaLeaf className="menu-icon" /> RTI</a></li>
                </ul>
            </section>

            <div className="container mt-5">
                {/* Custom Tab Switcher */}
                <div className="nav-tabs-container mb-5">
                    <button
                        className={`tab-item ${activeTab === 'dvv' ? 'active' : ''}`}
                        onClick={() => setActiveTab('dvv')}
                    >
                        <FaTable className="tab-icon" /> DVV Clarification
                    </button>
                    <button
                        className={`tab-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        <FaInfoCircle className="tab-icon" /> Extended Profile
                    </button>
                    <div className={`tab-indicator ${activeTab}`} />
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'dvv' ? (
                        <motion.div
                            key="dvv-tab"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {dvvData.criteria.map((criterion) => (
                                <section
                                    key={criterion.id}
                                    id={criterion.id}
                                    className="criterion-section mb-5"
                                >
                                    <div className="criterion-header">
                                        <span className="criterion-number">{criterion.id.toUpperCase()}</span>
                                        <h3>{criterion.title}</h3>
                                    </div>

                                    <div className="metric-box">
                                        <div className="table-responsive">
                                            <table className="naac-table">
                                                <thead>
                                                    <tr>
                                                        <th>Metric</th>
                                                        <th>Parameter</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {criterion.items.map((item, idx) => (
                                                        <tr key={idx}>
                                                            <td className="metric-id">{item.metric}</td>
                                                            <td className="parameter-text">{item.parameter}</td>
                                                            <td className="action-cell">
                                                                <button onClick={(e) => handleViewPdf(e, item.link)} className="view-btn">
                                                                    <FaFilePdf /> VIEW
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="profile-tab"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <section id="c" className="criterion-section">
                                <div className="criterion-header">
                                    <span className="criterion-number">EP</span>
                                    <h3>Extended Profile</h3>
                                </div>
                                <div className="metric-box">
                                    <div className="table-responsive">
                                        <table className="naac-table">
                                            <thead>
                                                <tr>
                                                    <th>Metric</th>
                                                    <th>Parameter</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dvvData.extendedProfile.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="metric-id">{item.metric}</td>
                                                        <td className="parameter-text">{item.parameter}</td>
                                                        <td className="action-cell">
                                                            <button onClick={(e) => handleViewPdf(e, item.link)} className="view-btn">
                                                                <FaFilePdf /> VIEW
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AdmissionForm
                isOpen={showAdmissionForm}
                onClose={() => setShowAdmissionForm(false)}
            />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    );
};

export default NaacDvv;
