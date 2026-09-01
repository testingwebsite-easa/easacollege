import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaLeaf, FaSolarPanel, FaWater, FaRecycle,
    FaHandsHelping, FaGraduationCap, FaVenusMars, FaHeartbeat,
    FaIndustry, FaUsers, FaCity, FaShieldAlt,
    FaGlobeAmericas, FaHandshake, FaCheckCircle, FaChartLine,
    FaTree, FaSeedling, FaPhone, FaEnvelope,
    FaMapMarkerAlt, FaExternalLinkAlt, FaAward, FaArrowRight,
    FaFilePdf, FaBookOpen, FaCalendarAlt
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AdmissionForm from '../components/AdmissionForm';
import GlobalHero from '../components/GlobalHero';

const sdgWheelUrl = "https://www.kpriet.ac.in/asset/frontend/images/general/sdg/wheel.png";

const all17SdgsData = [
    {
        id: 1,
        goalNumber: "SDG 01",
        title: "No Poverty",
        subTitle: "EASA's Financial Inclusion Action Plan",
        color: "#EB1C2D",
        bgLight: "rgba(235, 28, 45, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000",
        policies: 3,
        mediaCoverage: 32,
        events: 486,
        description: "We ensure our academic programs and campus services are accessible and equitable. We foster a culture that improves financial inclusion and student resilience through exclusive scholarship programs. Over 3,000 scholarships have been awarded to undergraduate, postgraduate, and research scholars valued collectively at over ₹3.5 Crore.",
        initiatives: [
            "Institutional merit-cum-means fee waivers for rural farming families",
            "Subsidized boarding, free college bus transport, and zero-interest education loan assistance",
            "Skill-based vocational livelihood training for neighboring village communities"
        ],
        metric: { value: "₹3.5 Cr+", label: "Scholarships Disbursed" }
    },
    {
        id: 2,
        goalNumber: "SDG 02",
        title: "Zero Hunger",
        subTitle: "Sustainable Food Waste Minimization & Organic Agriculture",
        color: "#D3A029",
        bgLight: "rgba(211, 160, 41, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg",
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&q=80&w=1000",
        policies: 4,
        mediaCoverage: 19,
        events: 320,
        description: "EASA College addresses food security and waste reduction across all campus dining facilities. We implement sustainable farm-to-table frameworks, automated solar drip-irrigation testbeds, and daily cafeteria organic scrap composting to enrich our agricultural soil.",
        initiatives: [
            "5-acre experimental organic cultivation farm managed by Agri Engineering students",
            "100% campus cafeteria organic scrap converted to bio-fertilizer via vermicomposting",
            "Student food distribution drives to local rural rehabilitation homes"
        ],
        metric: { value: "100%", label: "Cafeteria Waste Composted" }
    },
    {
        id: 3,
        goalNumber: "SDG 03",
        title: "Good Health and Well-being",
        subTitle: "24/7 Campus Health, Counselling & Telemedicine",
        color: "#279B48",
        bgLight: "rgba(39, 155, 72, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000",
        policies: 4,
        mediaCoverage: 18,
        events: 276,
        description: "EASA provides comprehensive healthcare and professional counselling for students and employees to receive psychological and physical wellness support. Our on-campus medical clinic, emergency ambulance, and regular free rural medical camps serve thousands annually.",
        initiatives: [
            "24/7 resident medical clinic with qualified doctor, nurse, and emergency ambulance",
            "Free psychological counseling, wellness workshops, and annual health insurance",
            "Bi-annual blood donation and village free general screening camps (2,500+ screened)"
        ],
        metric: { value: "2,500+", label: "Villagers Screened Annually" }
    },
    {
        id: 4,
        goalNumber: "SDG 04",
        title: "Quality Education",
        subTitle: "Industrial Co-Design & Outcome-Based Education (OBE)",
        color: "#C31F33",
        bgLight: "rgba(195, 31, 51, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
        policies: 15,
        mediaCoverage: 42,
        events: 587,
        description: "EASA's engineering courses are co-designed with industry to align curricula with Industry 4.0 demands. Through the AICTE IDEA Lab, Outcome-Based Education (OBE), and digital library resources, students gain practical competencies for global excellence.",
        initiatives: [
            "NAAC 'A' Grade accredited Outcome-Based Education (OBE) curriculum",
            "AICTE IDEA Lab with 24/7 prototyping tools: 3D printers, CNC laser routers, and IoT kits",
            "Active NPTEL, SWAYAM, IEEE, and DELNET digital research database access"
        ],
        metric: { value: "100%", label: "OBE & AICTE IDEA Lab Access" }
    },
    {
        id: 5,
        goalNumber: "SDG 05",
        title: "Gender Equality",
        subTitle: "Empowering Women in STEM & Inclusive Leadership",
        color: "#EF402B",
        bgLight: "rgba(239, 64, 43, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
        policies: 8,
        mediaCoverage: 32,
        events: 164,
        description: "EASA continuously works to put gender equality into practice, focusing on attracting, supporting, and promoting women in engineering. Women hold 45%+ of senior faculty and administrative leadership roles with dedicated Women in Tech coding tracks.",
        initiatives: [
            "Over 45% female enrollment across AI&DS, Biomedical, and Computer Science programs",
            "Active Women Empowerment Cell & Internal Complaints Committee (ICC)",
            "Specialized Women in Tech leadership summits and corporate hackathons"
        ],
        metric: { value: "45%+", label: "Women Faculty & Students" }
    },
    {
        id: 6,
        goalNumber: "SDG 06",
        title: "Clean Water and Sanitation",
        subTitle: "Operational Water Conservation & STP Recycling",
        color: "#00AED9",
        bgLight: "rgba(0, 174, 217, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&q=80&w=1000",
        policies: 5,
        mediaCoverage: 41,
        events: 122,
        description: "EASA's sustainability policies related to SDG 6 provide guidance to minimize water consumption, actively promoting efficient water usage, rainwater percolation, and 100% recycling of treated greywater across campus lawns and tree plantations.",
        initiatives: [
            "100 kLD Sewage Treatment Plant (STP) recycling wastewater for landscaping",
            "5,00,000+ liters rainwater harvesting capacity recharging local groundwater aquifers",
            "Automated sensor-based water dispensers and UV/RO purified stations in every block"
        ],
        metric: { value: "5,00,000 L", label: "Rainwater Harvesting" }
    },
    {
        id: 7,
        goalNumber: "SDG 07",
        title: "Affordable and Clean Energy",
        subTitle: "Rooftop Solar PV Generation & Smart Grid Infrastructure",
        color: "#FDB713",
        bgLight: "rgba(253, 183, 19, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg",
        image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
        policies: 3,
        mediaCoverage: 17,
        events: 98,
        description: "EASA has installed rooftop solar panels across campus buildings to maximize on-site clean energy generation. Solar installation sites were selected with the assistance of EASA's Eco Club, meeting significant daytime power demands.",
        initiatives: [
            "200 kWp rooftop solar photovoltaic power plant connected to the institutional grid",
            "100% campus-wide transition to energy-efficient LED and automated daylight sensors",
            "Student-developed Solar-EV dual charging station prototype in the AICTE IDEA Lab"
        ],
        metric: { value: "200 kWp", label: "Solar Energy Generated" }
    },
    {
        id: 8,
        goalNumber: "SDG 08",
        title: "Decent Work and Economic Growth",
        subTitle: "ASCEND Career Advancement Centre & Industrial Partnerships",
        color: "#8F1838",
        bgLight: "rgba(143, 24, 56, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
        policies: 5,
        mediaCoverage: 12,
        events: 136,
        description: "EASA's ASCEND Career Advancement Centre and Industry-Institute Partnership Cell (IIPC) prepare students for futuristic careers, driving sustainable economic growth through 85%+ consistent campus placements and startup venture support.",
        initiatives: [
            "350+ placement offers with top national and multinational recruitment corporations",
            "₹12 LPA highest salary package secured in technology and core engineering verticals",
            "Mandatory industrial internships with stipends for all pre-final year engineering students"
        ],
        metric: { value: "85%+", label: "Consistent Placement Rate" }
    },
    {
        id: 9,
        goalNumber: "SDG 09",
        title: "Industry, Innovation and Infrastructure",
        subTitle: "Nature-Inspired Solutions & Startup Incubation",
        color: "#F36D25",
        bgLight: "rgba(243, 109, 37, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
        policies: 4,
        mediaCoverage: 41,
        events: 378,
        description: "EASA brings academicians, designers, policymakers, and industry leaders together to implement green infrastructure and technology innovation on campus. We host active incubators, seed grant funds, and subsidize student patent filings.",
        initiatives: [
            "28+ student-led startups incubated at the EASA Incubation & Entrepreneurship Cell",
            "45+ patents filed by faculty and student research teams with institutional subsidies",
            "₹85 Lakhs+ mobilized in government, MSME, and institutional seed capital grants"
        ],
        metric: { value: "45+", label: "Patents Published & Filed" }
    },
    {
        id: 10,
        goalNumber: "SDG 10",
        title: "Reduced Inequalities",
        subTitle: "Diversity and Inclusion Framework",
        color: "#E11484",
        bgLight: "rgba(225, 20, 132, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000",
        policies: 15,
        mediaCoverage: 26,
        events: 154,
        description: "Led by the core values of inclusion, passion, and equity, EASA creates an environment where everyone can contribute, grow, and succeed. A high-level committee reporting directly to the Principal oversees barrier-free campus accessibility.",
        initiatives: [
            "100% barrier-free campus with wheelchair ramps, tactile paths, and dedicated lifts",
            "Bridge courses in communicative English and foundational mathematics for rural students",
            "Active SC/ST, Minority Welfare, and Equal Opportunity Advisory Cells"
        ],
        metric: { value: "100%", label: "Barrier-Free Inclusive Campus" }
    },
    {
        id: 11,
        goalNumber: "SDG 11",
        title: "Sustainable Cities and Communities",
        subTitle: "Support of Arts, Culture, Heritage & UBA Village Adoption",
        color: "#F99D26",
        bgLight: "rgba(249, 157, 38, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg",
        image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&q=80&w=1000",
        policies: 6,
        mediaCoverage: 14,
        events: 64,
        description: "EASA significantly contributes to local heritage, cultural preservation, and sustainable community transport. Under the Unnat Bharat Abhiyan (UBA) government scheme, we have adopted 5 surrounding rural villages for smart water and solar electrification.",
        initiatives: [
            "5 rural villages adopted under Unnat Bharat Abhiyan (UBA) for solar lighting and clean water",
            "Zero-emission campus transport routes connecting Coimbatore and Palakkad",
            "Annual cultural fest 'Dhruva' promoting regional arts and heritage"
        ],
        metric: { value: "5 Villages", label: "Adopted under UBA" }
    },
    {
        id: 12,
        goalNumber: "SDG 12",
        title: "Responsible Consumption & Production",
        subTitle: "Circular Economy & Campus Waste Minimization",
        color: "#CF8D2A",
        bgLight: "rgba(207, 141, 42, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000",
        policies: 6,
        mediaCoverage: 21,
        events: 316,
        description: "EASA applies circular economy principles across all capital and operational projects to avoid waste and strengthen reuse. We enforce certified e-waste recycling, single-use plastic bans, and paperless digital academic governance.",
        initiatives: [
            "Campus-wide ban on single-use plastics and polythene disposables",
            "Certified electronic and electrical waste disposal through authorized recyclers",
            "Paperless autonomous examination, digital valuation, and student fee portal"
        ],
        metric: { value: "Zero Waste", label: "Single-Use Plastic Ban" }
    },
    {
        id: 13,
        goalNumber: "SDG 13",
        title: "Climate Action",
        subTitle: "Carbon Neutrality Roadmap & Afforestation",
        color: "#48773E",
        bgLight: "rgba(72, 119, 62, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
        policies: 13,
        mediaCoverage: 11,
        events: 82,
        description: "EASA is committed to progressive carbon neutrality and is taking urgent institutional actions to combat climate change. We maintain extensive green cover, conduct certified environmental audits, and drive student eco-campaigns.",
        initiatives: [
            "Over 5,000+ indigenous trees maintained on campus offsetting carbon footprint",
            "Annual Green, Energy, and Environmental audits conducted by accredited third-party auditors",
            "Active Eco Club organizing regular tree-planting drives along Western Ghats foothills"
        ],
        metric: { value: "5,000+", label: "Trees Maintained on Campus" }
    },
    {
        id: 14,
        goalNumber: "SDG 14",
        title: "Life Below Water",
        subTitle: "Plastic Elimination & Safe Effluent Neutralization",
        color: "#007DBC",
        bgLight: "rgba(0, 125, 188, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000",
        policies: 5,
        mediaCoverage: 9,
        events: 31,
        description: "EASA promotes the waste hierarchy of 'Reduce, Reuse, Recycle' to protect local aquatic resources. We ensure 100% neutralization of chemistry and environmental laboratory effluents prior to safe discharge.",
        initiatives: [
            "Zero untreated chemical discharge from laboratory drains with specialized neutralization pits",
            "Student-led water quality surveys in surrounding streams and lakes in Coimbatore",
            "Awareness campaigns promoting reusable metal bottles and zero plastic litter"
        ],
        metric: { value: "100%", label: "Safe Neutralized Effluent" }
    },
    {
        id: 15,
        goalNumber: "SDG 15",
        title: "Life on Land",
        subTitle: "Western Ghats Biodiversity Reserve & Herbal Sanctuary",
        color: "#3EB049",
        bgLight: "rgba(62, 176, 73, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1000",
        policies: 17,
        mediaCoverage: 5,
        events: 124,
        description: "Through our institutional sustainability policy, EASA is committed to preserving local ecosystems, enhancing biodiversity, and maintaining a lush, pesticide-free botanical environment spanning 45+ scenic acres.",
        initiatives: [
            "Preservation of native flora and fauna across 45+ acres of campus in Western Ghats foothills",
            "Herbal and medicinal garden maintained by the Biomedical Engineering department",
            "Organic soil enrichment and strict prohibition of hazardous chemical pesticides"
        ],
        metric: { value: "45 Acres", label: "Bio-Diverse Green Ecosystem" }
    },
    {
        id: 16,
        goalNumber: "SDG 16",
        title: "Peace, Justice & Strong Institutions",
        subTitle: "Ethical Autonomous Governance & Anti-Ragging Integrity",
        color: "#02558B",
        bgLight: "rgba(2, 85, 139, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000",
        policies: 7,
        mediaCoverage: 12,
        events: 108,
        description: "EASA upholds statutory transparency, participatory governance, and ethical integrity through institutional committees, digital grievance redressal portals, anti-ragging squads, and student councils.",
        initiatives: [
            "Zero tolerance anti-ragging policy with 24/7 squad monitoring and campus CCTV coverage",
            "Online student and staff grievance redressal portal reviewed directly by the Ombudsman",
            "Democratic student council elections and participatory institutional committees"
        ],
        metric: { value: "100%", label: "Statutory Transparency" }
    },
    {
        id: 17,
        goalNumber: "SDG 17",
        title: "Partnerships for the Goals",
        subTitle: "Commitment to Global Alliances & Industry MoUs",
        color: "#183668",
        bgLight: "rgba(24, 54, 104, 0.08)",
        icon: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
        policies: 18,
        mediaCoverage: 38,
        events: 240,
        description: "EASA recognizes that partnerships are vital for achieving the SDGs. Our genuine collaborations with governments, corporate tech leaders, and international universities amplify our sustainable development impact.",
        initiatives: [
            "45+ active MoUs with international academic universities and corporate tech giants",
            "Active Student Chapters: IEEE, ISTE, CSI, SAE, and Institution of Engineers (India)",
            "Collaborative community research projects funded by government and industrial bodies"
        ],
        metric: { value: "45+ MoUs", label: "Active Global Partnerships" }
    }
];

const SdgsPage = () => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [flippedCards, setFlippedCards] = useState({});
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);
    const [partnerModal, setPartnerModal] = useState(false);
    const [partnerForm, setPartnerForm] = useState({
        orgName: '',
        contactPerson: '',
        email: '',
        phone: '',
        targetSdg: 'SDG 07: Affordable & Clean Energy',
        proposalDetails: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleFlip = (id) => {
        setFlippedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Calculate aggregated totals
    const totalPolicies = all17SdgsData.reduce((acc, curr) => acc + curr.policies, 0);
    const totalMedia = all17SdgsData.reduce((acc, curr) => acc + curr.mediaCoverage, 0);
    const totalEvents = all17SdgsData.reduce((acc, curr) => acc + curr.events, 0);

    // High contrast, glowing accessible colors in dark mode for blue and dark tones
    const getThematicAccent = (item) => {
        if (!isDark) return item.color;
        const darkAccessiblePalette = {
            1: '#FF5A6A', // SDG 1 No Poverty (Vivid Coral Red)
            2: '#FBBF24', // SDG 2 Zero Hunger (Warm Amber)
            3: '#34D399', // SDG 3 Good Health (Emerald Mint)
            4: '#F87171', // SDG 4 Quality Education (Bright Rose)
            5: '#FB7185', // SDG 5 Gender Equality (Bright Flamingo)
            6: '#38BDF8', // SDG 6 Clean Water (Electric Cyan Blue)
            7: '#FBBF24', // SDG 7 Clean Energy (Golden Amber)
            8: '#FB7185', // SDG 8 Decent Work (Warm Coral)
            9: '#FB923C', // SDG 9 Industry & Innovation (Bright Orange)
            10: '#F472B6', // SDG 10 Reduced Inequalities (Pink)
            11: '#FBBF24', // SDG 11 Sustainable Cities (Amber)
            12: '#FBBF24', // SDG 12 Responsible Consumption (Amber)
            13: '#4ADE80', // SDG 13 Climate Action (Bright Leaf Green)
            14: '#38BDF8', // SDG 14 Life Below Water (Bright Sky Blue)
            15: '#4ADE80', // SDG 15 Life on Land (Bright Grass Green)
            16: '#38BDF8', // SDG 16 Peace, Justice (Bright Vivid Blue - crystal clear on dark!)
            17: '#60A5FA'  // SDG 17 Partnerships (Bright Royal Blue - crystal clear on dark!)
        };
        return darkAccessiblePalette[item.id] || '#38BDF8';
    };

    const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
    const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
    const cardShadow = isDark ? '0 20px 50px rgba(0,0,0,0.35)' : '0 12px 35px rgba(0,0,0,0.05)';
    const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
    const secondaryTextColor = isDark ? '#cbd5e1' : '#475569';
    const accentColor = isDark ? '#38BDF8' : '#2563EB';

    const handlePartnerSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setPartnerModal(false);
            setFormSubmitted(false);
            setPartnerForm({
                orgName: '',
                contactPerson: '',
                email: '',
                phone: '',
                targetSdg: 'SDG 07: Affordable & Clean Energy',
                proposalDetails: ''
            });
            alert('🌿 Thank you for reaching out! EASA College SDG Coordinator will get in touch with you shortly to explore mutual sustainability collaborations.');
        }, 1500);
    };

    return (
        <div className="sdgs-page" style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO
                title="United Nations Sustainable Development Goals (SDG) | EASA College"
                description="Explore EASA College's institutional commitment to the 17 United Nations Sustainable Development Goals: Clean Energy, Quality Education, Green Campus, and Community Impact."
                keywords="Sustainable Development Goals, SDG EASA, UN SDG 2030, Green Campus Coimbatore, Solar Campus, Rainwater Harvesting, Women in STEM"
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            {/* HERO BANNER */}
            <GlobalHero
                pageKey="sdgs"
                defaultTitle="United Nations - SDG"
                defaultSubtitle="Sustainable Development Goals: A shared blueprint for peace and prosperity for people and the planet, now and into the future."
                defaultImage="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
            />

            <div className="container" style={{ maxWidth: '1350px', margin: '0 auto', padding: '4.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>

                {/* 1. UN 2030 AGENDA & ROTATING WHEEL SECTION */}
                <section style={{
                    background: cardBg,
                    borderRadius: '28px',
                    border: cardBorder,
                    padding: '3rem 2.5rem',
                    boxShadow: cardShadow
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                        <div>
                            <span style={{
                                padding: '0.4rem 1.2rem',
                                background: 'rgba(16, 185, 129, 0.15)',
                                color: '#10B981',
                                borderRadius: '50px',
                                fontSize: '0.82rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                United Nations 2030 Agenda
                            </span>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem', marginBottom: '1.2rem' }}>
                                Global Blueprint for Peace & Planet
                            </h2>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, marginBottom: '1rem' }}>
                                The Sustainable Development Goals (SDGs) or Global Goals are a collection of <strong>17 interlinked global goals</strong> designed by the United Nations General Assembly to be a "shared blueprint for peace and prosperity for people and the planet, now and into the future".
                            </p>
                            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: secondaryTextColor, marginBottom: '1.8rem' }}>
                                Adopted by all UN Member States in 2015, the 2030 Agenda sets ambitious targets for clean energy, zero hunger, poverty alleviation, gender equality, and climate action. EASA College is dedicated to implementing these 17 goals across all institutional curricula, operations, and community partnerships.
                            </p>
                            <a
                                href="https://sdgs.un.org/2030agenda"
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    padding: '0.85rem 1.8rem',
                                    borderRadius: '50px',
                                    background: isDark ? 'linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)' : 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                                    color: '#ffffff',
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.35)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <span>UN 2030 Agenda Details</span>
                                <FaExternalLinkAlt size={12} />
                            </a>
                        </div>

                        {/* ROTATING SDG WHEEL */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <div className="sdg-wheel-spinner" style={{ width: '220px', height: '220px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src={sdgWheelUrl}
                                    alt="UN SDG Color Wheel"
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <span style={{ marginTop: '1.2rem', fontSize: '0.85rem', fontWeight: '800', color: secondaryTextColor, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                17 Interlinked Global Goals
                            </span>
                        </div>
                    </div>
                </section>

                {/* 2. AGGREGATED IMPACT DASHBOARD */}
                <section>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            padding: '0.4rem 1.2rem',
                            background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                            color: accentColor,
                            borderRadius: '50px',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            EASA - UN SDG Report
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Institutional Impact Dashboard
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.8rem' }}>
                        <div style={{ background: cardBg, borderRadius: '24px', border: cardBorder, padding: '2.2rem 1.5rem', textAlign: 'center', boxShadow: cardShadow }}>
                            <div style={{ fontSize: '2.5rem', color: '#10B981', marginBottom: '0.5rem' }}><FaBookOpen /></div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor }}>{totalPolicies}+</div>
                            <div style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: secondaryTextColor, fontWeight: '800' }}>Formulated Policies</div>
                        </div>

                        <div style={{ background: cardBg, borderRadius: '24px', border: cardBorder, padding: '2.2rem 1.5rem', textAlign: 'center', boxShadow: cardShadow }}>
                            <div style={{ fontSize: '2.5rem', color: '#38BDF8', marginBottom: '0.5rem' }}><FaGlobeAmericas /></div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor }}>{totalMedia}+</div>
                            <div style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: secondaryTextColor, fontWeight: '800' }}>Media & Public Coverages</div>
                        </div>

                        <div style={{ background: cardBg, borderRadius: '24px', border: cardBorder, padding: '2.2rem 1.5rem', textAlign: 'center', boxShadow: cardShadow }}>
                            <div style={{ fontSize: '2.5rem', color: '#F59E0B', marginBottom: '0.5rem' }}><FaCalendarAlt /></div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor }}>{totalEvents.toLocaleString()}+</div>
                            <div style={{ fontSize: '0.88rem', textTransform: 'uppercase', color: secondaryTextColor, fontWeight: '800' }}>SDG Outreach & Campus Events</div>
                        </div>
                    </div>
                </section>

                {/* 3. THE 17 UN SDG GOALS - ALTERNATING ZIG-ZAG LAYOUT WITH RIGHT-TO-LEFT 3D FLIP CARDS REVEALING THE FULL LOGO ON BACK */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <span style={{
                            padding: '0.4rem 1.2rem',
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10B981',
                            borderRadius: '50px',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Action Roadmap
                        </span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            17 Sustainable Development Goals
                        </h2>
                    </div>

                    {all17SdgsData.map((item, index) => {
                        const isEven = index % 2 === 1;
                        const isFlipped = !!flippedCards[item.id];
                        const themeColor = getThematicAccent(item);

                        // FLIP CARD COMPONENT (RIGHT-TO-LEFT FLIP WITH FULL-BLEED SDG LOGO ON BACK)
                        const imageCardElement = (
                            <div
                                className={`sdg-flip-card-container ${isFlipped ? 'flipped' : ''}`}
                                onClick={() => toggleFlip(item.id)}
                            >
                                <div className="sdg-flip-card-inner">
                                    {/* FRONT FACE: Real Photo + Top Badge */}
                                    <div className="sdg-flip-card-front">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '1.2rem',
                                            left: '1.2rem',
                                            padding: '0.4rem 1rem',
                                            borderRadius: '50px',
                                            background: isDark ? themeColor : item.color,
                                            color: '#ffffff',
                                            fontWeight: '900',
                                            fontSize: '0.82rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.35)'
                                        }}>
                                            {item.goalNumber}
                                        </div>

                                        {/* CORNER SDG THUMBNAIL */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '1.2rem',
                                            left: '1.2rem',
                                            width: '54px',
                                            height: '54px',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            border: '2px solid rgba(255,255,255,0.9)',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
                                        }}>
                                            <img src={item.icon} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </div>

                                    {/* BACK FACE: FULL OFFICIAL SDG LOGO IN FULL CARD VIEW (CONTAIN FIT) */}
                                    <div
                                        className="sdg-flip-card-back"
                                        style={{
                                            background: item.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '1.2rem',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <img
                                            src={item.icon}
                                            alt={item.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                display: 'block'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );

                        // CONTENT ELEMENT
                        const contentElement = (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                <div>
                                    <span style={{
                                        padding: '0.35rem 1rem',
                                        borderRadius: '50px',
                                        background: isDark ? 'rgba(255, 255, 255, 0.08)' : item.bgLight,
                                        color: themeColor,
                                        border: isDark ? `1px solid ${themeColor}44` : 'none',
                                        fontSize: '0.82rem',
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        {item.goalNumber}
                                    </span>
                                    <h3 style={{ fontSize: '2rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.6rem', marginBottom: '0.2rem' }}>
                                        {item.title}
                                    </h3>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: themeColor }}>
                                        {item.subTitle}
                                    </div>
                                </div>

                                {/* 3-METRIC STATS BAR (POLICIES | MEDIA | EVENTS) */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, 1fr)',
                                    gap: '0.8rem',
                                    padding: '0.9rem 1.2rem',
                                    borderRadius: '16px',
                                    background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                                    border: cardBorder,
                                    textAlign: 'center'
                                }}>
                                    <div style={{ borderRight: cardBorder, paddingRight: '0.5rem' }}>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: themeColor }}>{item.policies}</div>
                                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: secondaryTextColor, fontWeight: '800' }}>Policies</div>
                                    </div>
                                    <div style={{ borderRight: cardBorder, paddingRight: '0.5rem' }}>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: themeColor }}>{item.mediaCoverage}</div>
                                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: secondaryTextColor, fontWeight: '800' }}>Media</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: '900', color: themeColor }}>{item.events}</div>
                                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: secondaryTextColor, fontWeight: '800' }}>Events</div>
                                    </div>
                                </div>

                                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: secondaryTextColor, margin: 0 }}>
                                    {item.description}
                                </p>

                                {/* KEY INITIATIVES */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                    <div style={{ fontSize: '0.88rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', color: primaryTextColor }}>
                                        Key Institutional Initiatives:
                                    </div>
                                    {item.initiatives.map((init, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.92rem', color: secondaryTextColor }}>
                                            <FaCheckCircle style={{ color: themeColor, marginTop: '0.25rem', flexShrink: 0 }} />
                                            <span>{init}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* KEY IMPACT STAT */}
                                <div style={{
                                    marginTop: '0.4rem',
                                    padding: '0.8rem 1.2rem',
                                    borderRadius: '16px',
                                    background: isDark ? 'rgba(255, 255, 255, 0.04)' : '#F8FAFC',
                                    border: cardBorder,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '1.2rem',
                                    width: 'fit-content'
                                }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: '900', color: themeColor }}>
                                        {item.metric.value}
                                    </span>
                                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: primaryTextColor }}>
                                        {item.metric.label}
                                    </span>
                                </div>
                            </div>
                        );

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                style={{
                                    background: cardBg,
                                    borderRadius: '32px',
                                    border: cardBorder,
                                    padding: '2.8rem',
                                    boxShadow: cardShadow,
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                    gap: '3.5rem',
                                    alignItems: 'center',
                                    position: 'relative'
                                }}
                            >
                                {isEven ? (
                                    <>
                                        {contentElement}
                                        {imageCardElement}
                                    </>
                                ) : (
                                    <>
                                        {imageCardElement}
                                        {contentElement}
                                    </>
                                )}
                            </motion.div>
                        );
                    })}
                </section>

                {/* 4. GREEN CAMPUS & TREE PLANTATION INITIATIVES */}
                <section style={{
                    background: cardBg,
                    borderRadius: '28px',
                    border: cardBorder,
                    padding: '3.5rem 2.5rem',
                    boxShadow: cardShadow
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <span style={{
                            padding: '0.4rem 1.2rem',
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10B981',
                            borderRadius: '50px',
                            fontSize: '0.82rem',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Eco-Stewardship
                        </span>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem' }}>
                            Green Campus & Tree Plantation Drives
                        </h2>
                        <p style={{ color: secondaryTextColor, maxWidth: '750px', margin: '0.6rem auto 0', fontSize: '1rem' }}>
                            Distinguished visiting dignitaries, academic scholars, and student eco-volunteers participate in our annual tree plantation and Western Ghats afforestation missions.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                        <div style={{ borderRadius: '20px', overflow: 'hidden', height: '240px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
                            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" alt="Plantation Drive" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff', fontWeight: '800', fontSize: '0.9rem' }}>
                                Annual Miyawaki Afforestation Drive
                            </div>
                        </div>
                        <div style={{ borderRadius: '20px', overflow: 'hidden', height: '240px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
                            <img src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&q=80&w=800" alt="Solar Installation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff', fontWeight: '800', fontSize: '0.9rem' }}>
                                200 kWp Rooftop Solar Grid Commissioning
                            </div>
                        </div>
                        <div style={{ borderRadius: '20px', overflow: 'hidden', height: '240px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
                            <img src="https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&q=80&w=800" alt="Rainwater Harvesting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', color: '#fff', fontWeight: '800', fontSize: '0.9rem' }}>
                                5 Lakh Liter Percolation & STP Reservoirs
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. CONTACT & PARTNERSHIP PROPOSAL SECTION */}
                <section style={{
                    background: isDark ? 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(16,185,129,0.2) 100%)' : 'linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)',
                    borderRadius: '32px',
                    border: isDark ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(167,243,208,1)',
                    padding: '3.5rem 2.5rem',
                    boxShadow: cardShadow
                }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
                        <div>
                            <span style={{
                                padding: '0.35rem 1rem',
                                borderRadius: '50px',
                                background: 'rgba(16, 185, 129, 0.15)',
                                color: '#10B981',
                                fontSize: '0.78rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Sustainability Partnership
                            </span>
                            <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: primaryTextColor, marginTop: '0.8rem', marginBottom: '1rem' }}>
                                Collaborate with EASA for SDG Missions
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: secondaryTextColor, lineHeight: '1.7', marginBottom: '2rem' }}>
                                We invite NGOs, government bodies, environmental organizations, research foundations, and CSR partners to join hands with EASA College for green energy, community water preservation, rural education, and clean technology projects.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.95rem', color: primaryTextColor }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#EFF6FF', color: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FaEnvelope />
                                    </div>
                                    <span><strong>SDG Cell Email:</strong> sdg@easacollege.com</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FaPhone />
                                    </div>
                                    <span><strong>Helpline:</strong> +91 (0422) 236-7000 / +91 94888 88000</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FEF3C7', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FaMapMarkerAlt />
                                    </div>
                                    <span><strong>Location:</strong> NH-47, Palakkad Main Road, Navakkarai, Coimbatore - 641105</span>
                                </div>
                            </div>
                        </div>

                        {/* PARTNER APPLICATION CARD */}
                        <div style={{
                            background: cardBg,
                            borderRadius: '24px',
                            border: cardBorder,
                            padding: '2.5rem',
                            boxShadow: cardShadow,
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '2.5rem', color: '#10B981', marginBottom: '0.8rem' }}><FaHandshake /></div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.5rem' }}>
                                Propose an SDG Project / CSR Tie-Up
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor, lineHeight: '1.6', marginBottom: '1.8rem' }}>
                                Submit your proposal for joint renewable energy research, rural water projects, or tree-planting initiatives.
                            </p>
                            <button
                                onClick={() => setPartnerModal(true)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    borderRadius: '50px',
                                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                    color: '#ffffff',
                                    fontWeight: '900',
                                    fontSize: '0.95rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 20px rgba(16,185,129,0.35)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Propose Collaboration
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* PARTNERSHIP PROPOSAL MODAL */}
            <AnimatePresence>
                {partnerModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.75)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                        backdropFilter: 'blur(8px)'
                    }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            style={{
                                background: cardBg,
                                borderRadius: '28px',
                                border: cardBorder,
                                width: '100%',
                                maxWidth: '560px',
                                padding: '2.5rem',
                                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
                                position: 'relative'
                            }}
                        >
                            <button
                                onClick={() => setPartnerModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1.2rem',
                                    right: '1.2rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    color: secondaryTextColor,
                                    cursor: 'pointer'
                                }}
                            >
                                ✕
                            </button>

                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: primaryTextColor, marginBottom: '0.4rem' }}>
                                Propose SDG Collaboration / CSR Tie-up
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: secondaryTextColor, marginBottom: '1.5rem' }}>
                                Connect with EASA College Sustainability & SDG Cell.
                            </p>

                            <form onSubmit={handlePartnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Organization / Foundation Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={partnerForm.orgName}
                                        onChange={(e) => setPartnerForm({ ...partnerForm, orgName: e.target.value })}
                                        placeholder="e.g. GreenTech Foundation / Rotary Club"
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Contact Person *</label>
                                        <input
                                            type="text"
                                            required
                                            value={partnerForm.contactPerson}
                                            onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                                            placeholder="Dr. K. Ramesh"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Phone *</label>
                                        <input
                                            type="tel"
                                            required
                                            value={partnerForm.phone}
                                            onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                                            placeholder="+91 9876543210"
                                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        value={partnerForm.email}
                                        onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                                        placeholder="partner@organization.org"
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Target SDG Focus Area *</label>
                                    <select
                                        value={partnerForm.targetSdg}
                                        onChange={(e) => setPartnerForm({ ...partnerForm, targetSdg: e.target.value })}
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none' }}
                                    >
                                        <option value="SDG 01: No Poverty & Scholarships">SDG 01: No Poverty & Scholarships</option>
                                        <option value="SDG 02: Zero Hunger & Organic Agriculture">SDG 02: Zero Hunger & Organic Agriculture</option>
                                        <option value="SDG 03: Good Health & Village Medical Camps">SDG 03: Good Health & Village Medical Camps</option>
                                        <option value="SDG 04: Quality Education & STEM Outreach">SDG 04: Quality Education & STEM Outreach</option>
                                        <option value="SDG 05: Gender Equality & Women in Tech">SDG 05: Gender Equality & Women in Tech</option>
                                        <option value="SDG 06: Clean Water & Rainwater Harvesting">SDG 06: Clean Water & Rainwater Harvesting</option>
                                        <option value="SDG 07: Affordable & Clean Solar Energy">SDG 07: Affordable & Clean Solar Energy</option>
                                        <option value="SDG 13: Climate Action & Tree Plantation">SDG 13: Climate Action & Tree Plantation</option>
                                        <option value="SDG 15: Life on Land & Bio-Diversity">SDG 15: Life on Land & Bio-Diversity</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.85rem', fontWeight: '700', color: primaryTextColor, display: 'block', marginBottom: '0.3rem' }}>Proposal Outline *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={partnerForm.proposalDetails}
                                        onChange={(e) => setPartnerForm({ ...partnerForm, proposalDetails: e.target.value })}
                                        placeholder="Describe your intended collaboration scope, target community, and timeline..."
                                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: cardBorder, background: isDark ? 'var(--bg-section)' : '#F8FAFC', color: primaryTextColor, outline: 'none', resize: 'vertical' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formSubmitted}
                                    style={{
                                        marginTop: '0.8rem',
                                        padding: '0.85rem',
                                        borderRadius: '50px',
                                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                        color: '#ffffff',
                                        fontWeight: '900',
                                        fontSize: '0.95rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 20px rgba(16,185,129,0.3)',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {formSubmitted ? 'Submitting...' : 'Submit Partnership Proposal'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            {/* FLIP CARD AND SPINNER STYLES (RIGHT-TO-LEFT FLIP) */}
            <style>{`
                @keyframes spinWheel {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .sdg-wheel-spinner img {
                    animation: spinWheel 25s linear infinite;
                }

                .sdg-wheel-spinner:hover img {
                    animation-play-state: paused;
                }

                /* 3D FLIP CARD STYLES */
                .sdg-flip-card-container {
                    perspective: 1200px;
                    width: 100%;
                    height: 380px;
                    cursor: pointer;
                }

                .sdg-flip-card-inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-style: preserve-3d;
                    border-radius: 24px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.18);
                }

                /* RIGHT TO LEFT FLIP ON HOVER OR FLIPPED CLASS */
                .sdg-flip-card-container:hover .sdg-flip-card-inner,
                .sdg-flip-card-container.flipped .sdg-flip-card-inner {
                    transform: rotateY(-180deg);
                }

                .sdg-flip-card-front,
                .sdg-flip-card-back {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    border-radius: 24px;
                    overflow: hidden;
                }

                .sdg-flip-card-front {
                    transform: rotateY(0deg);
                }

                .sdg-flip-card-back {
                    transform: rotateY(-180deg);
                }

                @media (max-width: 768px) {
                    .sdg-flip-card-container {
                        height: 320px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SdgsPage;
