import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AdmissionForm from "../components/AdmissionForm";
import GlobalHero from "../components/GlobalHero";
import { FaFilePdf, FaSearch, FaChevronDown, FaChevronUp, FaLeaf } from "react-icons/fa";
import "./inner1.css";

const naacData = [
    {
        id: "c1",
        title: "Criterion 1 - Curricular Aspects",
        subCriteria: [
            {
                id: "1.1",
                title: "Criterion 1.1",
                items: [
                    { metric: "1.1.1", parameter: "The Institution ensures effective curriculum planning and delivery through a well-planned and documented process including Academic calendar and conduct of continuous internal Assessment (Within 500 words)", link: "/assets/naac/criterion-1/1.1.1/1.1.1.pdf" },
                    { metric: "1.1.2", parameter: "Academic Calendar for the Institute 2024 - 2025", link: "/assets/naac/Institute-academic-calendar-24-25.pdf" }
                ]
            },
            {
                id: "1.2",
                title: "Criterion 1.2",
                items: [
                    { metric: "1.2.1", parameter: "Number of Add on /Certificate/Value added programs offered during the last five years", link: "/assets/naac/criterion-1/1.2.1/viewpage.pdf" },
                    { metric: "1.2.2", parameter: "Percentage of students enrolled in Certificate/ Add-on/Value added programs as against the total number of students during the last five years", link: "/assets/naac/criterion-1/1.2.2/viewpage.pdf" }
                ]
            },
            {
                id: "1.3",
                title: "Criterion 1.3",
                items: [
                    { metric: "1.3.1", parameter: "Institution integrates crosscutting issues relevant to Professional Ethics, Gender, Human Values, Environment and Sustainability into the Curriculum", link: "/assets/naac/criterion-1/1.3.1/1.3.1.pdf" },
                    { metric: "1.3.2", parameter: "Percentage of students undertaking project work/field work/ internships (Data for the latest completed academic year)", link: "/assets/naac/criterion-1/1.3.2/viewpage.pdf" }
                ]
            },
            {
                id: "1.4",
                title: "Criterion 1.4",
                items: [
                    { metric: "1.4.1", parameter: "Institution obtains feedback on the academic performance and ambience of the institution from various stakeholders, such as Students, Teachers, Employers, Alumni etc. and action taken report on the feedback is made available on institutional website (Yes or No)", link: "/assets/naac/criterion-1/1.4.1/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c2",
        title: "Criterion 2 - Teaching-Learning and Evaluation",
        subCriteria: [
            {
                id: "2.1",
                title: "Criterion 2.1",
                items: [
                    { metric: "2.1.1", parameter: "Enrolment percentage", link: "/assets/naac/criterion-2/2.1.1/viewpage.pdf" },
                    { metric: "2.1.2", parameter: "Percentage of seats filled against seats reserved for various categories (SC, ST, OBC, Divyangjan, etc. as per applicable reservation policy during the last five years. (Exclusive of supernumerary seats)", link: "/assets/naac/criterion-2/2.1.2/viewpage.pdf" }
                ]
            },
            {
                id: "2.2",
                title: "Criterion 2.2",
                items: [
                    { metric: "2.2.1", parameter: "Student – Full time Teacher Ratio. (Data for the latest completed academic year)", link: "/assets/naac/criterion-2/2.2.1/viewpage.pdf" }
                ]
            },
            {
                id: "2.3",
                title: "Criterion 2.3",
                items: [
                    { metric: "2.3.1", parameter: "Student centric methods, such as experiential learning, participative learning and problem solving methodologies are used for enhancing learning experiences using ICT tools", link: "/assets/naac/criterion-2/2.3.1/2.3.1.pdf" }
                ]
            },
            {
                id: "2.4",
                title: "Criterion 2.4",
                items: [
                    { metric: "2.4.1", parameter: "Percentage of full-time teachers against sanctioned posts during the last five years", link: "/assets/naac/criterion-2/2.4.1/viewpage.pdf" },
                    { metric: "2.4.2", parameter: "Percentage of full time teachers with NET/SET/SLET/ Ph. D. / D.M. / M.Ch. / D.N.B Super specialty / D.Sc. / D.Litt. during the last five years (Consider only highest degree for count)", link: "/assets/naac/criterion-2/2.4.2/viewpage.pdf" }
                ]
            },
            {
                id: "2.5",
                title: "Criterion 2.5",
                items: [
                    { metric: "2.5.1", parameter: "Mechanism of internal/ external assessment is transparent and the grievance redressal system is time- bound and efficient", link: "/assets/naac/criterion-2/2.5.1/viewpage.pdf" }
                ]
            },
            {
                id: "2.6",
                title: "Criterion 2.6",
                items: [
                    { metric: "2.6.1", parameter: "Programme Outcomes (POs) and Course Outcomes (COs) for all Programmes offered by the institution are stated and displayed on website and attainment of POs and COs are evaluated", link: "/assets/naac/criterion-2/2.6.1/viewpage.pdf" },
                    { metric: "2.6.2", parameter: "Pass percentage of Students during last five years", link: "/assets/naac/criterion-2/2.6.2/2.6.2-index.pdf" }
                ]
            },
            {
                id: "2.7",
                title: "Criterion 2.7",
                items: [
                    { metric: "2.7.1", parameter: "Online student satisfaction survey regarding to teaching learning process. (Online survey to be conducted)", link: "/assets/naac/criterion-2/2.7.1/2.7.1-index.pdf" }
                ]
            }
        ]
    },
    {
        id: "c3",
        title: "Criterion 3 - Research, Innovations and Extension",
        subCriteria: [
            {
                id: "3.1",
                title: "Criterion 3.1",
                items: [
                    { metric: "3.1.1", parameter: "Grants received from Government and non-governmental agencies for research projects / endowments in the institution during the last five years (INR in Lakhs)", link: "/assets/naac/criterion-3/3.1.1/viewpage.pdf" }
                ]
            },
            {
                id: "3.2",
                title: "Criterion 3.2",
                items: [
                    { metric: "3.2.1", parameter: "Institution has created an ecosystem for innovations and has initiatives for creation and transfer of knowledge(patents filed, published, incubation center facilities in the HEI to be considered)", link: "/assets/naac/criterion-3/3.2.1/viewpage.pdf" },
                    { metric: "3.2.2", parameter: "Number of workshops/seminars/conferences including on Research Methodology, Intellectual Property Rights (IPR) and entrepreneurship conducted during the last five years", link: "/assets/naac/criterion-3/3.2.2/viewpage.pdf" }
                ]
            },
            {
                id: "3.3",
                title: "Criterion 3.3",
                items: [
                    { metric: "3.3.1", parameter: "Number of research papers published per teacher in the Journals notified on UGC care list during the last five years", link: "/assets/naac/criterion-3/3.3.1/viewpage.pdf" },
                    { metric: "3.3.2", parameter: "Number of books and chapters in edited volumes/books published and papers published in national/ international conference proceedings per teacher during last five years", link: "/assets/naac/criterion-3/3.3.2/viewpage.pdf" }
                ]
            },
            {
                id: "3.4",
                title: "Criterion 3.4",
                items: [
                    { metric: "3.4.1", parameter: "Extension activities are carried out in the neighborhood community, sensitizing students to social issues, for their holistic development, and impact thereof during the last five years.", link: "/assets/naac/criterion-3/3.4.1/viewpage.pdf" },
                    { metric: "3.4.2", parameter: "Awards and recognitions received for extension activities from government / government recognised bodies", link: "/assets/naac/criterion-3/3.4.2/viewpage.pdf" },
                    { metric: "3.4.3", parameter: "Number of extension and outreach programs conducted by the institution through NSS/NCC/Red cross/YRC etc., (including the programmes such as Swachh Bharat, AIDS awareness, Gender issues etc. and/or those organised in collaboration with industry, community and NGOs) during the last five years", link: "/assets/naac/criterion-3/3.4.3/viewpage.pdf" }
                ]
            },
            {
                id: "3.5",
                title: "Criterion 3.5",
                items: [
                    { metric: "3.5.1", parameter: "The number of MoUs, collaborations/linkages for Faculty exchange, Student exchange, Internship, Field trip, On-the- job training, research and other academic activities during the last five years", link: "/assets/naac/criterion-3/3.5.1/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c4",
        title: "Criterion 4 - Infrastructure and Learning Resources",
        subCriteria: [
            {
                id: "4.1",
                title: "Criterion 4.1",
                items: [
                    { metric: "4.1.1", parameter: "Availability of adequate infrastructure and physical facilities viz., classrooms, laboratories, ICT facilities, cultural activities, gymnasium, yoga centre etc. in the institution", link: "/assets/naac/criterion-4/4.1.1/4.1.1-index.pdf" },
                    { metric: "4.1.2", parameter: "Percentage of expenditure, excluding salary for infrastructure augmentation during last five years (INR in Lakhs)", link: "/assets/naac/criterion-4/4.1.2/viewpage.pdf" }
                ]
            },
            {
                id: "4.2",
                title: "Criterion 4.2",
                items: [
                    { metric: "4.2.1", parameter: "Library is automated using Integrated Library Management System (ILMS), subscription to e-resources, amount spent on purchase of books, journals and per day usage of library", link: "/assets/naac/criterion-4/4.2.1/4.2.1-index.pdf" }
                ]
            },
            {
                id: "4.3",
                title: "Criterion 4.3",
                items: [
                    { metric: "4.3.1", parameter: "Institution frequently updates its IT facilities and provides sufficient bandwidth for internet connection", link: "/assets/naac/criterion-4/4.3.1/4.3.1-index.pdf" },
                    { metric: "4.3.2", parameter: "Student – Computer ratio (Data for the latest completed academic year)", link: "/assets/naac/criterion-4/4.3.2/4.3.2-index.pdf" }
                ]
            },
            {
                id: "4.4",
                title: "Criterion 4.4",
                items: [
                    { metric: "4.4.1", parameter: "Percentage of expenditure incurred on maintenance of infrastructure (physical and academic support facilities) excluding salary component during the last five years (INR in Lakhs)", link: "/assets/naac/criterion-4/4.4.1/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c5",
        title: "Criterion 5 - Student Support and Progression",
        subCriteria: [
            {
                id: "5.1",
                title: "Criterion 5.1",
                items: [
                    { metric: "5.1.1", parameter: "Percentage of students benefited by scholarships and freeships provided by the Government and Non-Government agencies during last five years", link: "/assets/naac/criterion-5/5.1.1/viewpage.pdf" },
                    { metric: "5.1.2", parameter: "Capacity building and skills enhancement initiatives taken by the institution include: Soft skills, Language and communication skills, Life skills, ICT/computing skills", link: "/assets/naac/criterion-5/5.1.2/viewpage.pdf" },
                    { metric: "5.1.3", parameter: "Percentage of students benefitted by guidance for competitive examinations and career counseling offered by the Institution during the last five years", link: "/assets/naac/criterion-5/5.1.3/viewpage.pdf" },
                    { metric: "5.1.4", parameter: "The Institution has a transparent mechanism for timely redressal of student grievances including sexual harassment and ragging cases", link: "/assets/naac/criterion-5/5.1.4/viewpage.pdf" }
                ]
            },
            {
                id: "5.2",
                title: "Criterion 5.2",
                items: [
                    { metric: "5.2.1", parameter: "Percentage of placement of outgoing students and students progressing to higher education during the last five years", link: "/assets/naac/criterion-5/5.2.1/viewpage.pdf" },
                    { metric: "5.2.2", parameter: "Percentage of students qualifying in state/national/ international level examinations during the last five years", link: "/assets/naac/criterion-5/5.2.2/viewpage.pdf" }
                ]
            },
            {
                id: "5.3",
                title: "Criterion 5.3",
                items: [
                    { metric: "5.3.1", parameter: "Number of awards/medals for outstanding performance in sports/ cultural activities at University / state/ national / international level during the last five years", link: "/assets/naac/criterion-5/5.3.1/viewpage.pdf" },
                    { metric: "5.3.2", parameter: "Average number of sports and cultural programs in which students of the Institution participated during last five years", link: "/assets/naac/criterion-5/5.3.2/viewpage.pdf" }
                ]
            },
            {
                id: "5.4",
                title: "Criterion 5.4",
                items: [
                    { metric: "5.4.1", parameter: "There is a registered Alumni Association that contributes significantly to the development of the institution through financial and/or other support services", link: "/assets/naac/criterion-5/5.4.1/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c6",
        title: "Criterion 6 - Governance, Leadership and Management",
        subCriteria: [
            {
                id: "6.1",
                title: "Criterion 6.1",
                items: [
                    { metric: "6.1.1", parameter: "The governance and leadership is in accordance with vision and mission of the institution and it is visible in various institutional practices such as decentralization and participation in the institutional governance", link: "/assets/naac/criterion-6/6.1.1/viewpage.pdf" }
                ]
            },
            {
                id: "6.2",
                title: "Criterion 6.2",
                items: [
                    { metric: "6.2.1", parameter: "The functioning of the institutional bodies is effective and efficient as visible from policies, administrative setup, appointment and service rules, procedures, deployment of institutional Strategic/ perspective/development plan etc", link: "/assets/naac/criterion-6/6.2.1/viewpage.pdf" },
                    { metric: "6.2.2", parameter: "Implementation of e-governance in areas of operation: Administration, Finance and Accounts, Student Admission and Support, Examination", link: "/assets/naac/criterion-6/6.2.2/viewpage.pdf" }
                ]
            },
            {
                id: "6.3",
                title: "Criterion 6.3",
                items: [
                    { metric: "6.3.1", parameter: "The institution has effective welfare measures and Performance Appraisal System for teaching and non-teaching staff", link: "/assets/naac/criterion-6/6.3.1/viewpage.pdf" },
                    { metric: "6.3.2", parameter: "Percentage of teachers provided with financial support to attend conferences/workshops and towards membership fee of professional bodies during the last five years", link: "/assets/naac/criterion-6/6.3.2/viewpage.pdf" },
                    { metric: "6.3.3", parameter: "Percentage of teaching and non-teaching staff participating in Faculty development Programmes (FDP), professional development /administrative training programs during the last five years", link: "/assets/naac/criterion-6/6.3.3/viewpage.pdf" }
                ]
            },
            {
                id: "6.4",
                title: "Criterion 6.4",
                items: [
                    { metric: "6.4.1", parameter: "Institution has strategies for mobilization and optimal utilization of resources and funds from various sources and it conducts financial audits regularly", link: "/assets/naac/criterion-6/6.4.1/viewpage.pdf" }
                ]
            },
            {
                id: "6.5",
                title: "Criterion 6.5",
                items: [
                    { metric: "6.5.1", parameter: "Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing the quality assurance strategies and processes.", link: "/assets/naac/criterion-6/6.5.1/viewpage.pdf" },
                    { metric: "6.5.2", parameter: "Quality assurance initiatives of the institution include: Regular meeting of IQAC, Collaborative quality initiatives, Participation in NIRF, Any other quality audit", link: "/assets/naac/criterion-6/6.5.2/viewpage.pdf" }
                ]
            }
        ]
    },
    {
        id: "c7",
        title: "Criterion 7 - Institutional Values and Best Practices",
        subCriteria: [
            {
                id: "7.1",
                title: "Criterion 7.1",
                items: [
                    { metric: "7.1.1", parameter: "Measures initiated by the Institution for the promotion of gender equity and Institutional initiatives to celebrate / organize national and international commemorative days, events and festivals during the last five years (Within 500 words)", link: "/assets/naac/criterion-7/7.1.1/viewpage.pdf" },
                    { metric: "7.1.2", parameter: "The Institution has facilities and initiatives for Alternate sources of energy, Waste management, Water conservation, Green campus, Disabled-friendly environment", link: "/assets/naac/criterion-7/7.1.2/viewpage.pdf" },
                    { metric: "7.1.3", parameter: "Quality audits on environment and energy regularly undertaken by the Institution.", link: "/assets/naac/criterion-7/7.1.3/viewpage.pdf" },
                    { metric: "7.1.4", parameter: "Describe the Institutional efforts/initiatives in providing an inclusive environment i.e., tolerance and harmony towards cultural, regional, linguistic, communal socioeconomic and Sensitization of students and employees", link: "/assets/naac/criterion-7/7.1.4/viewpage.pdf" }
                ]
            },
            {
                id: "7.2",
                title: "Criterion 7.2",
                items: [
                    { metric: "7.2.1", parameter: "Describe two best practices successfully implemented by the Institution as per NAAC format provided in the Manual", link: "/assets/naac/criterion-7/7.2.1/viewpage.pdf" }
                ]
            },
            {
                id: "7.3",
                title: "Criterion 7.3",
                items: [
                    { metric: "7.3.1", parameter: "Portray the performance of the Institution in one area distinctive to its priority and thrust within 1000 words", link: "/assets/naac/criterion-7/7.3.1/viewpage.pdf" }
                ]
            }
        ]
    }
];

const Naac = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [activeCriterion, setActiveCriterion] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (id) => {
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
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true }
    };

    return (
        <div className="naac-page">
            <SEO
                title="NAAC Accreditation | EASA College"
                description="National Assessment and Accreditation Council (NAAC) details and SSR documentation for EASA College of Engineering and Technology."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="naac"
                defaultTitle="National Assessment and Accreditation Council"
                defaultSubtitle="Committed to Quality Education and Academic Excellence"
                defaultImage="/images/banner/naac-a-grade-accreditation-2.webp"
            />

            {/* Scroll Menu */}
            <section className="scroll-menu-container">
                <ul className="scroll-menu-list">
                    <li><a href="/assets/naac/ssr.pdf" target="_blank" rel="noreferrer">SSR</a></li>
                    <li><a href="/naac-dvv-clarifications"><FaLeaf className="menu-icon" /> DVV Clarification</a></li>
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

            <div className="container naac-content mt-5">
                {naacData.map((criterion) => (
                    <motion.section
                        key={criterion.id}
                        id={criterion.id}
                        className="criterion-section"
                        {...fadeInUp}
                    >
                        <div className="criterion-header" onClick={() => setActiveCriterion(activeCriterion === criterion.id ? null : criterion.id)}>
                            <span className="criterion-number">{criterion.id.toUpperCase()}</span>
                            <h3>{criterion.title}</h3>
                            <div className="accordion-toggle hide-on-desktop">
                                {activeCriterion === criterion.id ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                        </div>

                        <AnimatePresence>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="criterion-body"
                            >
                                {criterion.subCriteria.map((sub) => (
                                    <div key={sub.id} className="metric-box mb-4">
                                        <h4 className="metric-title">{sub.title}</h4>
                                        <div className="table-responsive">
                                            <table className="naac-table">
                                                <thead>
                                                    <tr>
                                                        <th>Metric</th>
                                                        <th>Parameter</th>
                                                        <th>Link to Relevant Document</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sub.items.map((item, idx) => (
                                                        <tr key={idx}>
                                                            <td className="metric-id">{item.metric}</td>
                                                            <td className="parameter-text">{item.parameter}</td>
                                                            <td className="action-cell">
                                                                <a href={item.link} target="_blank" rel="noreferrer" className="view-btn">
                                                                    <FaFilePdf style={{ marginRight: '8px' }} /> VIEW
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </motion.section>
                ))}
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
