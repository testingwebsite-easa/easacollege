import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import GlobalHero from '../components/GlobalHero';
import Footer from '../components/Footer';
import AdmissionCTA from '../components/AdmissionCTA';
import AdmissionForm from '../components/AdmissionForm';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const milestonesData = [
    { year: '2008', desc: 'Established', sub: 'UG - ECE, CSE, EEE, IT', color: '#34495e', borderColor: '#34495e' },
    { year: '2009', desc: 'UG - MECH', sub: 'PG - MBA', color: '#9b59b6', borderColor: '#8e44ad' },
    { year: '2011', desc: 'PG - CSE', sub: '', color: '#795548', borderColor: '#5d4037' },
    { year: '2012', desc: 'PG - PED, CS', sub: '', color: '#3498db', borderColor: '#2980b9' },
    { year: '2013', desc: 'PG - SE', sub: '', color: '#2980b9', borderColor: '#1f618d' },
    { year: '2014', desc: 'PG - CEM, MFE', sub: '', color: '#f1c40f', borderColor: '#d4ac0d' },
    { year: '2015', desc: 'ISO 9001 : 2015', sub: 'certification', color: '#3f51b5', borderColor: '#303f9f' },
    { year: '2020', desc: 'UG - AIDS, AGRI', sub: '', color: '#8e44ad', borderColor: '#7d3c98' },
    { year: '2022', desc: 'IIC MoE', sub: 'UG - CSE (CYBER)', color: '#c0392b', borderColor: '#a93226' },
    { year: '2023', desc: 'NAAC "A" Grade', sub: 'CGPA: 3.18, UGC 2(f), UG - BME, AIML', color: '#27ae60', borderColor: '#229954' },
    { year: '2024', desc: 'UGC Conferred Autonomous', sub: 'From AY 2024 - 25', color: '#8e44ad', borderColor: '#7d3c98' },
    { year: '2025', desc: 'Proposal for NBA', sub: '', color: '#f39c12', borderColor: '#d35400' }
];

const orgChartData = {
    label: "BOARD OF TRUST",
    children: [{
        label: "CHAIRPERSON AND MANAGING TRUSTEE",
        children: [{
            label: "GOVERNING BODY",
            children: [{
                label: "CEO & COO",
                children: [{
                    label: "PRINCIPAL",
                    children: [
                        {
                            label: "IQAC",
                            layout: "vertical",
                            children: [
                                { label: "ACADEMIC AUDIT" },
                                { label: "PLANNING & MONITORING" }
                            ]
                        },
                        {
                            label: "PROGRAM COORDINATORS",
                            children: [
                                {
                                    label: "FACULTY",
                                    children: [{ label: "STUDENTS" }]
                                }
                            ]
                        },
                        {
                            label: "DEANS, HODS"
                        },
                        {
                            label: "DEAN R&D, DEAN INNOVATIONS",
                            layout: "vertical",
                            children: [
                                { label: "RESEARCH ADVISORY BOARD" },
                                { label: "RESEARCH CLUSTERS" }
                            ]
                        },
                        {
                            label: "DEAN STUDENT AFFAIRS",
                            layout: "vertical",
                            children: [
                                { label: "ADMISSION COMMITTEE" },
                                { label: "ANTI RAGGING COMMITTEE" },
                                { label: "GRIEVANCE REDRESSAL COMMITTEE" },
                                { label: "STUDENT WELFARE COMMITTEE" }
                            ]
                        },
                        {
                            label: "COE",
                            layout: "vertical",
                            children: [
                                { label: "DEPUTY COEs" },
                                { label: "EXAMINATION COMMITTEE" },
                                { label: "RESULT PASSING BOARD" },
                                { label: "MALPRACTICE COMMITTEE" }
                            ]
                        },
                        {
                            label: "DEAN PLACEMENTS",
                            children: [
                                {
                                    label: "CAREER DEVELOPMENT CELL",
                                    children: [{ label: "TRAINERS" }]
                                }
                            ]
                        },
                        {
                            label: "ADMIN OFFICER",
                            children: [
                                {
                                    label: "FIELD MANAGER",
                                    children: [{ label: "SUPERVISOR" }]
                                }
                            ]
                        },
                        {
                            label: "LIBRARIAN",
                            children: [
                                {
                                    label: "DEPUTY LIBRARIAN",
                                    children: [{ label: "LIBRARY STAFF" }]
                                }
                            ]
                        },
                        {
                            label: "PHYSICAL DIRECTOR",
                            children: [
                                { label: "ASST. PED" }
                            ]
                        }
                    ]
                }]
            }]
        }]
    }]
};

const OrgTree = ({ data }) => {
    return (
        <li>
            <div className="org-node">
                {data.label}
            </div>
            {data.children && data.children.length > 0 && (
                <ul className={data.layout === 'vertical' ? 'vertical-tree' : ''}>
                    {data.children.map((child, index) => (
                        <OrgTree key={index} data={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};



function MilestonesPage() {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    // Org Chart Auto-scaling
    const wrapperRef = useRef(null);
    const treeRef = useRef(null);
    const [treeStyles, setTreeStyles] = useState({ scale: 1, marginBottom: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (wrapperRef.current && treeRef.current) {
                const wrapperWidth = wrapperRef.current.offsetWidth;
                const treeElement = treeRef.current;
                const treeWidth = treeElement.scrollWidth;
                const treeHeight = treeElement.scrollHeight;

                // Calculate scale to fit (with 20px padding buffer)
                const availableWidth = wrapperWidth - 20;
                let newScale = 1;

                if (treeWidth > availableWidth) {
                    newScale = availableWidth / treeWidth;
                }

                const newMarginBottom = -(treeHeight * (1 - newScale));

                setTreeStyles({
                    scale: newScale,
                    marginBottom: newMarginBottom
                });
            }
        };

        // Initial calculation
        // Small delay to ensure rendering is complete
        const timer = setTimeout(handleResize, 100);

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timer);
        };
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <div style={{ position: 'relative', overflowX: 'hidden', background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh' }}>
            <SEO title="Institute Milestones | EASA College" description="Tracing the journey of EASA College from its inception to becoming a premier educational institution." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="milestones"
                defaultTitle="Institute Milestones"
                defaultSubtitle="Celebrating our journey of growth, innovation, and educational excellence."
            />

            <div className="milestone-container" style={{ padding: '6rem 2rem' }}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="timeline-grid"
                    style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        position: 'relative'
                    }}
                >
                    {milestonesData.map((item, index) => {
                        // Position Logic
                        const isTopRow = index >= 8;
                        const gridColumn = isTopRow ? 16 - index : index + 1;
                        const gridRow = isTopRow ? 1 : 2;

                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="milestone-card"
                                style={{
                                    gridColumn: gridColumn,
                                    gridRow: gridRow,
                                    position: 'relative',
                                    zIndex: 2
                                }}
                            >
                                <div style={{
                                    border: `5px solid ${item.borderColor}`,
                                    borderRadius: '20px',
                                    padding: '1.5rem 1rem',
                                    background: 'var(--bg-card)',
                                    textAlign: 'center',
                                    minHeight: '160px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                                    position: 'relative'
                                }}>
                                    {/* Speech Bubble Tail */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-14px', /* Roughly centered on border? No, below */
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: 0,
                                        height: 0,
                                        borderLeft: '15px solid transparent',
                                        borderRight: '15px solid transparent',
                                        borderTop: `15px solid ${item.borderColor}`,
                                        display: 'block' // Always show tail? Image shows tails.
                                    }}></div>

                                    <h3 style={{
                                        color: item.borderColor,
                                        fontWeight: '800',
                                        fontSize: '2rem',
                                        marginBottom: '0.4rem',
                                        lineHeight: 1
                                    }}>{item.year}</h3>

                                </div>

                                {/* Text Below the box */}
                                <div style={{
                                    marginTop: '1.5rem',
                                    textAlign: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: 'var(--text-main)',
                                    lineHeight: '1.4'
                                }}>
                                    <div style={{ fontWeight: '700', marginBottom: '0.2rem' }}>{item.desc}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                                </div>

                                {/* Connectors */}
                                {index < 7 && (
                                    <div className="connector-h" style={{
                                        position: 'absolute',
                                        top: '80px', // Middle of box (160px height)
                                        right: '-2rem', // Half gap
                                        width: '2rem', // Gap size
                                        height: '3px',
                                        background: 'transparent',
                                        borderTop: '3px dashed #cbd5e1',
                                        zIndex: 1
                                    }}>

                                    </div>
                                )}
                                {index === 7 && (
                                    <div className="connector-v" style={{
                                        position: 'absolute',
                                        top: '-4rem', // Gap above box
                                        left: '50%',
                                        height: '4rem',
                                        width: '3px',
                                        background: 'transparent',
                                        borderLeft: '3px dashed #cbd5e1',
                                        zIndex: 1
                                    }}>

                                    </div>
                                )}
                                {index >= 8 && index < 11 && (
                                    <div className="connector-h-rev" style={{
                                        position: 'absolute',
                                        top: '80px',
                                        left: '-2rem',
                                        width: '2rem',
                                        height: '3px',
                                        background: 'transparent',
                                        borderTop: '3px dashed #a6adb5ff',
                                        zIndex: 1
                                    }}>

                                    </div>
                                )}

                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Organizational Chart Section */}
            <div style={{ padding: '4rem 2rem', background: 'var(--bg-main)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                    ORGANIZATIONAL CHART
                </h2>
                <div
                    className="org-chart-wrapper"
                    ref={wrapperRef}
                    style={{
                        overflow: 'hidden',
                        paddingBottom: '2rem',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        className="tree"
                        ref={treeRef}
                        style={{
                            transform: `scale(${treeStyles.scale})`,
                            transformOrigin: 'top center',
                            marginBottom: `${treeStyles.marginBottom}px`
                        }}
                    >
                        <ul>
                            <OrgTree data={orgChartData} />
                        </ul>
                    </div>
                </div>
            </div>

            <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer />

            <style>{`
                .timeline-grid {
                    display: grid;
                    grid-template-columns: repeat(8, 1fr);
                    gap: 2rem;
                }
                
                @media (max-width: 1200px) {
                    .timeline-grid {
                        display: flex !important;
                        flex-direction: column;
                        align-items: center;
                        gap: 3rem !important;
                    }
                    .milestone-card {
                        width: 100%;
                        max-width: 350px;
                        grid-column: auto !important;
                        grid-row: auto !important;
                        margin-bottom: 2rem;
                    }
                    .connector-h, .connector-v, .connector-h-rev {
                        display: none !important;
                    }
                    /* Add vertical line for mobile */
                    .milestone-card::after {
                        content: '';
                        position: absolute;
                        bottom: -40px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 2px;
                        height: 40px;
                        border-left: 2px dashed #cbd5e1;
                        opacity: 0.5;
                    }
                    .milestone-card:last-child::after {
                        display: none;
                    }
                    .milestone-container {
                        padding: 4rem 1rem !important;
                    }
                }

                /* Org Chart Styles */
                .org-chart-wrapper {
                   scrollbar-width: thin;
                   scrollbar-color: var(--text-muted) transparent;
                   padding-top: 20px;
                }
                .tree {
                    width: max-content;
                    padding: 20px;
                    margin: 0 auto;
                }
                .tree ul {
                    padding-top: 20px; 
                    position: relative;
                    display: flex;
                    justify-content: center;
                }
                .tree li {
                    text-align: center;
                    list-style-type: none;
                    position: relative;
                    padding: 20px 10px 0 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                /* Connecting Lines - Green Color #79c942 or generally green */
                .tree li::before, .tree li::after {
                    content: '';
                    position: absolute; top: 0; right: 50%;
                    border-top: 2px solid #5e9e34;
                    width: 50%; height: 20px;
                }
                .tree li::after {
                    right: auto; left: 50%;
                    border-left: 2px solid #5e9e34;
                }
                
                /* Connector Logic */
                .tree li:only-child::after, .tree li:only-child::before {
                    display: none;
                }
                .tree li:only-child { 
                    padding-top: 0;
                }
                .tree li:first-child::before, .tree li:last-child::after {
                    border: 0 none;
                }
                .tree li:last-child::before {
                    border-right: 2px solid #5e9e34;
                    border-radius: 0 5px 0 0;
                }
                .tree li:first-child::after {
                    border-radius: 5px 0 0 0;
                }
                .tree ul ul::before {
                    content: '';
                    position: absolute; top: 0; left: 50%;
                    border-left: 2px solid #5e9e34;
                    width: 0; height: 20px;
                }

                /* Vertical Tree Nodes connection */
                .tree ul.vertical-tree {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 20px; /* Space for line coming from parent */
                    position: relative;
                }

                .tree ul.vertical-tree li {
                    padding: 0;
                    margin-top: 20px; /* Gap between vertical nodes */
                    width: 100%;
                    position: relative;
                }
                
                /* Reset standard tree connectors for vertical list */
                .tree ul.vertical-tree li::before, 
                .tree ul.vertical-tree li::after {
                    display: none;
                }

                /* Draw line connecting to previous sibling for vertical items */
                .tree ul.vertical-tree li::before {
                    display: block !important;
                    content: '';
                    position: absolute;
                    top: -22px; /* Connect to bottom of previous */
                    left: 50%;
                    width: 2px; 
                    height: 25px; /* Reach down to the arrow */
                    background: #5e9e34;
                    border: none;
                    transform: translateX(-50%);
                    right: auto;
                }
                
                /* Special Case: First child in vertical tree needs line connecting to Parent */
                /* The ul::before handles parent-to-ul connection. 
                   It ends at top of UL padding. First LI is at top. 
                   So ul::before line meets top of first LI.
                   We don't need extra line for first child.
                */
                .tree ul.vertical-tree li:first-child {
                    margin-top: 0;
                }
                .tree ul.vertical-tree li:first-child::before {
                    display: none !important;
                }

                /* The Line from Parent to this Vertical UL needs to be visible. 
                   Standard tree ul::before handles it.
                */

                /* Node Styling */
                .org-node {
                    border: 2px solid #5e9e34;
                    padding: 8px 12px;
                    text-decoration: none;
                    color: #000;
                    background: #fff;
                    font-size: 0.75rem; 
                    line-height: 1.2;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    /* box-shadow: 0 4px 6px rgba(0,0,0,0.1); */
                    transition: all 0.3s;
                    min-width: 100px;
                    max-width: 180px;
                    text-align: center;
                    position: relative;
                    text-transform: uppercase;
                }
                
                /* Hover Effect */
                .org-node:hover {
                    background: #f0fdf4;
                    box-shadow: 0 8px 15px rgba(94, 158, 52, 0.2);
                    transform: translateY(-2px);
                }

                /* ARROW Styling */
                /* Add arrow to the top of EVERY node (except root maybe? No, root needs to be top).
                   Root is first LI of first UL. 
                   But root usually doesn't need arrow from nothing.
                   The provided data wrapper has "BOARD OF TRUST" as root.
                   It probably shouldn't have an arrow.
                */

                .org-node::before {
                    content: '';
                    position: absolute;
                    top: -10px; /* Position at top edge */
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0; 
                    height: 0; 
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 8px solid #5e9e34;
                }
                
                /* Hide arrow for the absolute Root Node if needed. 
                   In OrgTree coponent, we can't easily distinguish root by class.
                   But we can hide for very first node using :first-child of tree?
                   .tree > ul > li > .org-node::before { display: none; }
                */
                .tree > ul > li:first-child > .org-node::before {
                    display: none;
                }
            `}</style>
        </div>
    );
}

export default MilestonesPage;
