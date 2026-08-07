import React from 'react';
import { useTheme } from '../context/ThemeContext';

// Reusable SVG Arrow Connector Component with Theme Awareness
const ArrowDown = ({ length = 16, color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2px 0' }}>
        <div style={{ width: '2px', height: `${length}px`, background: color }}></div>
        <div style={{
            width: 0,
            height: 0,
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: `6px solid ${color}`,
            marginTop: '-1px'
        }}></div>
    </div>
);

const LeadershipHierarchy = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Theme palette variables
    const palette = {
        bgContainer: isDark ? 'rgba(15, 23, 42, 0.95)' : '#ffffff',
        borderContainer: isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1',
        textMain: isDark ? '#f8fafc' : '#1e293b',
        textMuted: isDark ? '#94a3b8' : '#64748b',
        lineColor: isDark ? '#60a5fa' : '#1e3a8a',

        // Governing Nodes
        headerBg: isDark ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' : '#1e293b',
        headerText: '#ffffff',
        headerBorder: isDark ? '#3b82f6' : '#1e3a8a',

        // COE Column
        coeBg: isDark ? 'rgba(30, 58, 138, 0.25)' : '#eff6ff',
        coeBorder: isDark ? 'rgba(96, 165, 250, 0.4)' : '#93c5fd',
        coeTitle: isDark ? '#93c5fd' : '#1e3a8a',

        // Academics Column
        acadBg: isDark ? 'rgba(13, 148, 136, 0.15)' : '#eff6ff',
        acadBorder: isDark ? 'rgba(20, 184, 166, 0.4)' : '#bfdbfe',
        acadTitle: isDark ? '#2dd4bf' : '#1e3a8a',

        // Admin Deans Column
        adminBg: isDark ? 'rgba(22, 101, 52, 0.2)' : '#f0fdf4',
        adminBorder: isDark ? 'rgba(34, 197, 94, 0.4)' : '#bbf7d0',
        adminTitle: isDark ? '#4ade80' : '#15803d',

        // Purple Auxiliary (PED, Library, Wardens)
        purpBg: isDark ? 'rgba(107, 33, 168, 0.25)' : '#faf5ff',
        purpBorder: isDark ? 'rgba(168, 85, 247, 0.4)' : '#e9d5ff',
        purpTitle: isDark ? '#c084fc' : '#6b21a8',

        // Inner Card Elements
        cardBg: isDark ? 'rgba(30, 41, 59, 0.9)' : '#ffffff',
        cardBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
        cardText: isDark ? '#e2e8f0' : '#334155',

        // Lower Reporting Branches
        secBranchBg: isDark ? 'rgba(194, 65, 12, 0.15)' : '#fff7ed',
        secBranchBorder: isDark ? 'rgba(249, 115, 22, 0.4)' : '#ffedd5',
        secBranchTitle: isDark ? '#fb923c' : '#c2410c',

        corBranchBg: isDark ? 'rgba(161, 98, 7, 0.15)' : '#fefce8',
        corBranchBorder: isDark ? 'rgba(234, 179, 8, 0.4)' : '#fef08a',
        corBranchTitle: isDark ? '#facc15' : '#a16207'
    };

    return (
        <section className="leadership-hierarchy-section" style={{
            width: '100%',
            padding: '0.5rem 0',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: palette.textMain,
            boxSizing: 'border-box',
            transition: 'all 0.3s ease'
        }}>
            <style>{`
                @media (max-width: 768px) {
                    .lh-desktop-only { display: none !important; }
                    .lh-mobile-only { display: block !important; }
                    .lh-container { padding: 1rem 0.6rem !important; border-radius: 14px !important; }
                    .lh-title { font-size: 1.1rem !important; }
                    .lh-subtitle { font-size: 0.72rem !important; }
                    .lh-gov-box { padding: 0.45rem 1.2rem !important; font-size: 0.8rem !important; }
                    .lh-sec-cor-row { flex-direction: row !important; gap: 0.5rem !important; width: 100% !important; justify-content: center !important; }
                    .lh-sec-cor-box { padding: 0.45rem 0.8rem !important; font-size: 0.75rem !important; min-width: 120px; text-align: center; }
                    .lh-mobile-stack { display: flex; flex-direction: column; gap: 1rem; width: 100%; }
                    .lh-mobile-card { padding: 0.6rem; border-radius: 8px; border: 1px solid; width: 100%; box-sizing: border-box; }
                    .lh-mobile-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; width: 100%; }
                    .lh-mobile-grid-3 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; width: 100%; }
                }
                @media (min-width: 769px) {
                    .lh-desktop-only { display: block !important; }
                    .lh-mobile-only { display: none !important; }
                }
            `}</style>

            <div className="lh-container" style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                background: palette.bgContainer,
                borderRadius: '20px',
                border: `1px solid ${palette.borderContainer}`,
                padding: '1.8rem 1rem',
                boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.05)',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease'
            }}>

                {/* CHART HEADER */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    padding: '0 0.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                        <div style={{ height: '2px', width: '35px', background: palette.lineColor }}></div>
                        <h2 className="lh-title" style={{ fontSize: '1.35rem', fontWeight: '900', color: palette.lineColor, letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>
                            ORGANIZATIONAL CHART
                        </h2>
                        <div style={{ height: '2px', width: '35px', background: palette.lineColor }}></div>
                    </div>
                    <p className="lh-subtitle" style={{ fontSize: '0.8rem', color: palette.textMain, fontWeight: '800', margin: '0.2rem 0 0 0', letterSpacing: '0.5px' }}>
                        EASA COLLEGE OF ENGINEERING AND TECHNOLOGY
                    </p>
                </div>

                {/* GOVERNING LEVEL (CHAIRPERSON -> SECRETARY/CORRESPONDENT -> PRINCIPAL) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>

                    {/* CHAIRPERSON */}
                    <div className="lh-gov-box" style={{
                        background: palette.headerBg,
                        color: palette.headerText,
                        border: `1px solid ${palette.headerBorder}`,
                        padding: '0.6rem 2.5rem',
                        borderRadius: '6px',
                        fontWeight: '900',
                        fontSize: '0.95rem',
                        letterSpacing: '1px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        textAlign: 'center'
                    }}>
                        CHAIRPERSON
                    </div>

                    <ArrowDown length={16} color={palette.lineColor} />

                    {/* SECRETARY & CORRESPONDENT (DESKTOP MODE WITH EXTENDED LINES) */}
                    <div className="lh-desktop-only" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div style={{ position: 'relative', width: '80%', maxWidth: '580px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: '2px', background: palette.lineColor }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '0px' }}>
                                    <ArrowDown length={14} color={palette.lineColor} />
                                    <ArrowDown length={14} color={palette.lineColor} />
                                </div>
                            </div>

                            {/* SECRETARY & CORRESPONDENT ROW WITH ATTACHED SIDE FLOW LINES */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%', maxWidth: '600px', marginBottom: '2px', position: 'relative' }}>
                                
                                {/* SECRETARY WRAPPER WITH DIRECT ATTACHED LEFT FLOW LINE */}
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <div style={{
                                        position: 'absolute',
                                        right: '100%',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '250px',
                                        height: '2px',
                                        background: palette.secBranchTitle,
                                        zIndex: 4
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            width: '2px',
                                            height: '540px',
                                            background: palette.secBranchTitle
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: 0,
                                                width: '35px',
                                                height: '2px',
                                                background: palette.secBranchTitle
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    right: '-6px',
                                                    top: '-4px',
                                                    width: 0,
                                                    height: 0,
                                                    borderTop: '5px solid transparent',
                                                    borderBottom: '5px solid transparent',
                                                    borderLeft: `8px solid ${palette.secBranchTitle}`
                                                }}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        background: palette.headerBg,
                                        color: palette.headerText,
                                        border: `1px solid ${palette.secBranchBorder}`,
                                        padding: '0.55rem 1.6rem',
                                        borderRadius: '6px',
                                        fontWeight: '900',
                                        fontSize: '0.88rem',
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                    }}>
                                        SECRETARY
                                    </div>
                                </div>

                                {/* CORRESPONDENT WRAPPER WITH DIRECT ATTACHED RIGHT FLOW LINE */}
                                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <div style={{
                                        background: palette.headerBg,
                                        color: palette.headerText,
                                        border: `1px solid ${palette.corBranchBorder}`,
                                        padding: '0.55rem 1.6rem',
                                        borderRadius: '6px',
                                        fontWeight: '900',
                                        fontSize: '0.88rem',
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                    }}>
                                        CORRESPONDENT
                                    </div>

                                    <div style={{
                                        position: 'absolute',
                                        left: '100%',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '250px',
                                        height: '2px',
                                        background: palette.corBranchTitle,
                                        zIndex: 4
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            width: '2px',
                                            height: '540px',
                                            background: palette.corBranchTitle
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                width: '35px',
                                                height: '2px',
                                                background: palette.corBranchTitle
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    left: '-6px',
                                                    top: '-4px',
                                                    width: 0,
                                                    height: 0,
                                                    borderTop: '5px solid transparent',
                                                    borderBottom: '5px solid transparent',
                                                    borderRight: `8px solid ${palette.corBranchTitle}`
                                                }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* LINES CONVERGING TO PRINCIPAL */}
                            <div style={{ position: 'relative', width: '85%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <div style={{ width: '2px', height: '14px', background: palette.secBranchTitle }}></div>
                                    <div style={{ width: '2px', height: '14px', background: palette.corBranchTitle }}></div>
                                </div>
                                <div style={{ width: '100%', height: '2px', background: palette.lineColor }}></div>
                            </div>
                        </div>
                    </div>

                    {/* SECRETARY & CORRESPONDENT (MOBILE MODE - COMPACT NO OVERFLOW) */}
                    <div className="lh-mobile-only" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div style={{ position: 'relative', width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: '2px', background: palette.lineColor }}></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                    <ArrowDown length={10} color={palette.lineColor} />
                                    <ArrowDown length={10} color={palette.lineColor} />
                                </div>
                            </div>

                            <div className="lh-sec-cor-row" style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', width: '100%', marginBottom: '2px' }}>
                                <div className="lh-sec-cor-box" style={{
                                    background: palette.headerBg,
                                    color: palette.headerText,
                                    border: `1px solid ${palette.secBranchBorder}`,
                                    padding: '0.4rem 0.6rem',
                                    borderRadius: '6px',
                                    fontWeight: '900',
                                    fontSize: '0.75rem',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                                }}>
                                    SECRETARY
                                </div>
                                <div className="lh-sec-cor-box" style={{
                                    background: palette.headerBg,
                                    color: palette.headerText,
                                    border: `1px solid ${palette.corBranchBorder}`,
                                    padding: '0.4rem 0.6rem',
                                    borderRadius: '6px',
                                    fontWeight: '900',
                                    fontSize: '0.75rem',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                                }}>
                                    CORRESPONDENT
                                </div>
                            </div>

                            <div style={{ position: 'relative', width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: '2px', background: palette.lineColor }}></div>
                            </div>
                        </div>
                    </div>

                    <ArrowDown length={14} color={palette.lineColor} />

                    {/* PRINCIPAL */}
                    <div className="lh-gov-box" style={{
                        background: palette.headerBg,
                        color: palette.headerText,
                        border: `1px solid ${palette.headerBorder}`,
                        padding: '0.6rem 2.8rem',
                        borderRadius: '6px',
                        fontWeight: '900',
                        fontSize: '0.9rem',
                        letterSpacing: '1px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        textAlign: 'center'
                    }}>
                        PRINCIPAL
                    </div>

                    <ArrowDown length={16} color={palette.lineColor} />

                </div>

                {/* DESKTOP FULL HIERARCHY CANVAS (minWidth 1000px with horizontal scroll) */}
                <div className="lh-desktop-only" style={{ position: 'relative', width: '100%' }}>
                    <div style={{ overflowX: 'auto', width: '100%', paddingBottom: '0.5rem' }}>
                        <div style={{ minWidth: '1000px', width: '100%', boxSizing: 'border-box' }}>
                            
                            {/* TOP BEAM DISTRIBUTING TO MAIN ARMS UNDER PRINCIPAL */}
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: 'calc(100% - (100% / 7))', height: '2px', background: palette.lineColor, margin: '0 auto' }}></div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', width: '100%', marginBottom: '6px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown length={12} color={palette.lineColor} /></div>
                                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}><ArrowDown length={12} color={palette.lineColor} /></div>
                                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'center' }}><ArrowDown length={12} color={palette.lineColor} /></div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown length={12} color={palette.lineColor} /></div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}><ArrowDown length={12} color={palette.lineColor} /></div>
                                </div>
                            </div>

                            {/* 7-COLUMN GRID FOR CONTENT */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.6rem', width: '100%', boxSizing: 'border-box' }}>

                                {/* 1. COE COLUMN */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{ width: '100%', background: palette.coeBg, border: `1px solid ${palette.coeBorder}`, borderRadius: '6px', padding: '0.5rem 0.2rem', textAlign: 'center' }}>
                                        <div style={{ color: palette.coeTitle, fontWeight: '900', fontSize: '0.78rem' }}>COE</div>
                                        <div style={{ color: palette.textMuted, fontSize: '0.58rem', fontWeight: '700' }}>CONTROLLER OF EXAMINATIONS</div>
                                    </div>
                                    <ArrowDown length={8} color={palette.coeBorder} />
                                    <div style={{ width: '100%', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem 0.2rem', textAlign: 'center' }}>
                                        <div style={{ color: palette.textMain, fontWeight: '800', fontSize: '0.7rem' }}>DCOE</div>
                                        <div style={{ color: palette.textMuted, fontSize: '0.55rem', fontWeight: '600' }}>DEPUTY CONTROLLER</div>
                                    </div>
                                    <ArrowDown length={8} color={palette.cardBorder} />
                                    <div style={{ width: '100%', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem 0.2rem', textAlign: 'center' }}>
                                        <div style={{ color: palette.textMain, fontWeight: '800', fontSize: '0.7rem' }}>ACOE</div>
                                        <div style={{ color: palette.textMuted, fontSize: '0.55rem', fontWeight: '600' }}>ASSISTANT CONTROLLER</div>
                                    </div>
                                    <ArrowDown length={8} color={palette.cardBorder} />
                                    <div style={{ width: '100%', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.35rem', textAlign: 'center', fontSize: '0.62rem', fontWeight: '700', color: palette.textMain }}>
                                        ADMIN STAFFS
                                    </div>
                                </div>

                                {/* 2. DEANS (ACADEMICS) COLUMN */}
                                <div style={{ gridColumn: 'span 2', background: palette.acadBg, border: `1px solid ${palette.acadBorder}`, borderRadius: '6px', padding: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <div style={{ textAlign: 'center', background: isDark ? 'rgba(13,148,136,0.3)' : '#dbeafe', color: palette.acadTitle, fontWeight: '900', fontSize: '0.78rem', padding: '0.3rem', borderRadius: '4px', letterSpacing: '0.5px' }}>
                                        DEANS (ACADEMICS)
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.25rem' }}>
                                        <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.58rem' }}>
                                            <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', fontSize: '0.56rem', textAlign: 'center' }}>DEAN COMPUTING</div>
                                            <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• IT<br />• CSE<br />• AI&DS<br />• AI&ML<br />• CYBER</div>
                                        </div>
                                        <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.58rem' }}>
                                            <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', fontSize: '0.56rem', textAlign: 'center' }}>DEAN ELECTRICAL</div>
                                            <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• ECE<br />• EEE<br />• BME</div>
                                        </div>
                                        <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.58rem' }}>
                                            <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', fontSize: '0.56rem', textAlign: 'center' }}>DEAN MECHANICAL</div>
                                            <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• MECH<br />• AGRI</div>
                                        </div>
                                        <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.58rem' }}>
                                            <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', fontSize: '0.56rem', textAlign: 'center' }}>DEAN SCIENCE & HUM</div>
                                            <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• MATHS<br />• SCIENCES<br />• LANGS</div>
                                        </div>
                                    </div>
                                    <div style={{ background: isDark ? '#0f172a' : '#1e293b', color: '#ffffff', borderRadius: '4px', padding: '0.35rem 0.2rem', textAlign: 'center', border: `1px solid ${palette.cardBorder}` }}>
                                        <div style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.3px', marginBottom: '0.2rem' }}>
                                            COMMON FACULTY STRUCTURE UNDER EACH DEPT (HOD)
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '0.55rem', fontWeight: '700' }}>
                                            <div>FACULTIES</div>
                                            <div>TEACHING ASSTS</div>
                                            <div>SYSTEM ADMINS</div>
                                            <div>LAB TECHS</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. DEANS (ADMIN) COLUMN */}
                                <div style={{ gridColumn: 'span 2', background: palette.adminBg, border: `1px solid ${palette.adminBorder}`, borderRadius: '6px', padding: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <div style={{ textAlign: 'center', background: isDark ? 'rgba(22,101,52,0.35)' : '#dcfce7', color: palette.adminTitle, fontWeight: '900', fontSize: '0.78rem', padding: '0.3rem', borderRadius: '4px', letterSpacing: '0.5px' }}>
                                        DEANS (ADMIN)
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.25rem' }}>
                                        <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.55rem' }}>
                                            <div style={{ fontWeight: '800', color: palette.adminTitle, marginBottom: '0.1rem' }}>DEAN ACADEMICS</div>
                                            <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• PG COORD<br />• UG COORD<br />• ADMIN STAFFS</div>
                                        </div>
                                        <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.55rem' }}>
                                            <div style={{ fontWeight: '800', color: palette.adminTitle, marginBottom: '0.1rem' }}>DEAN AUTONOMOUS</div>
                                            <div style={{ color: palette.cardText }}>• ADMIN STAFFS</div>
                                        </div>
                                        <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.55rem' }}>
                                            <div style={{ fontWeight: '800', color: palette.adminTitle, marginBottom: '0.1rem' }}>DEAN IQAC</div>
                                            <div style={{ color: palette.cardText }}>• ADMIN STAFFS</div>
                                        </div>
                                        <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.55rem' }}>
                                            <div style={{ fontWeight: '800', color: palette.adminTitle, marginBottom: '0.1rem' }}>DEAN STUDENT AFFAIRS</div>
                                            <div style={{ color: palette.cardText }}>• ADMIN STAFFS</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 4 & 5. PHYSICAL EDUCATION & LIBRARY COLUMN GROUP WITH WARDENS CENTERED BELOW */}
                                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: 'calc(100% - 64px)', background: palette.lineColor, zIndex: 2, pointerEvents: 'none' }}></div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%' }}>
                                        {/* PHYSICAL EDUCATION */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: '100%', background: palette.purpBg, border: `1px solid ${palette.purpBorder}`, borderRadius: '6px', padding: '0.4rem 0.2rem', textAlign: 'center' }}>
                                                <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.65rem' }}>PHYSICAL ED DIRECTOR</div>
                                            </div>
                                            <ArrowDown length={8} color={palette.purpBorder} />
                                            <div style={{ width: '100%', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.35rem 0.2rem', textAlign: 'center' }}>
                                                <div style={{ color: palette.textMain, fontWeight: '700', fontSize: '0.62rem' }}>PHYSICAL DIRECTOR</div>
                                            </div>
                                            <ArrowDown length={8} color={palette.cardBorder} />
                                            <div style={{ width: '100%', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.35rem 0.2rem', textAlign: 'center', fontSize: '0.62rem', fontWeight: '700', color: palette.textMuted }}>
                                                ASST. PED
                                            </div>
                                        </div>
                                        {/* LIBRARY */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ width: '100%', background: palette.purpBg, border: `1px solid ${palette.purpBorder}`, borderRadius: '6px', padding: '0.4rem 0.2rem', textAlign: 'center' }}>
                                                <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.68rem' }}>LIBRARY</div>
                                            </div>
                                            <ArrowDown length={8} color={palette.purpBorder} />
                                            <div style={{ width: '100%', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.35rem 0.2rem', textAlign: 'center' }}>
                                                <div style={{ color: palette.textMain, fontWeight: '700', fontSize: '0.62rem' }}>LIBRARIAN</div>
                                            </div>
                                            <ArrowDown length={8} color={palette.cardBorder} />
                                            <div style={{ width: '100%', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.35rem 0.2rem', textAlign: 'center', fontSize: '0.62rem', fontWeight: '700', color: palette.textMuted }}>
                                                ASST. LIBRARIAN
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2px 0' }}>
                                        <ArrowDown length={12} color={palette.lineColor} />
                                    </div>

                                    {/* WARDENS SECTION */}
                                    <div style={{ width: '100%', background: palette.purpBg, border: `1px solid ${palette.purpBorder}`, borderRadius: '6px', padding: '0.4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
                                        <div style={{ textAlign: 'center', marginBottom: '0.3rem' }}>
                                            <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.72rem' }}>WARDENS</div>
                                            <div style={{ color: palette.textMuted, fontSize: '0.55rem', fontWeight: '700' }}>REPORTING TO PRINCIPAL</div>
                                        </div>
                                        <ArrowDown length={8} color={palette.purpBorder} />
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', width: '100%' }}>
                                            <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.35rem 0.2rem', textAlign: 'center', fontSize: '0.6rem', fontWeight: '700', color: palette.textMain }}>
                                                WARDEN BOYS HOSTEL
                                            </div>
                                            <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.35rem 0.2rem', textAlign: 'center', fontSize: '0.6rem', fontWeight: '700', color: palette.textMain }}>
                                                WARDEN GIRLS HOSTEL
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DIRECT REPORTING BRANCHES ATTACHED TO SECRETARY & CORRESPONDENT */}
                    <div style={{ marginTop: '1.8rem', position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', width: '100%' }}>
                            {/* LEFT BRANCH: DIRECT REPORTING TO SECRETARY */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: isDark ? 'rgba(194, 65, 12, 0.08)' : 'rgba(255, 247, 237, 0.6)', border: `1px solid ${palette.secBranchBorder}`, borderRadius: '12px', padding: '0.8rem', boxSizing: 'border-box' }}>
                                <div style={{ background: palette.secBranchBg, color: palette.secBranchTitle, border: `1px solid ${palette.secBranchBorder}`, padding: '0.35rem 0.8rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.5px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', marginBottom: '0.6rem' }}>
                                    ↵ DIRECT REPORTING UNDER SECRETARY
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', width: '100%' }}>
                                    <div style={{ background: palette.cardBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '6px', padding: '0.5rem 0.3rem', fontSize: '0.6rem' }}>
                                        <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.25rem', textAlign: 'center' }}>HR DEPT</div>
                                        <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• HR DIRECTOR<br />• HR EXECUTIVE</div>
                                    </div>
                                    <div style={{ background: palette.cardBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '6px', padding: '0.5rem 0.3rem', fontSize: '0.6rem' }}>
                                        <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.25rem', textAlign: 'center' }}>TRAINING & PLACEMENT</div>
                                        <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• PLACEMENT DIR<br />• TRAINING HEAD<br />• TRAINERS</div>
                                    </div>
                                    <div style={{ background: palette.cardBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '6px', padding: '0.5rem 0.3rem', fontSize: '0.6rem' }}>
                                        <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.25rem', textAlign: 'center' }}>EXAMINATION CELL</div>
                                        <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• COE<br />• DEPUTY COE<br />• ASST COE<br />• EXAM STAFF</div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT BRANCH: DIRECT REPORTING TO CORRESPONDENT */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: isDark ? 'rgba(161, 98, 7, 0.08)' : 'rgba(254, 252, 232, 0.6)', border: `1px solid ${palette.corBranchBorder}`, borderRadius: '12px', padding: '0.8rem', boxSizing: 'border-box' }}>
                                <div style={{ background: palette.corBranchBg, color: palette.corBranchTitle, border: `1px solid ${palette.corBranchBorder}`, padding: '0.35rem 0.8rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.5px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', marginBottom: '0.6rem' }}>
                                    ↳ DIRECT REPORTING UNDER CORRESPONDENT
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', width: '100%' }}>
                                    <div style={{ background: palette.cardBg, border: `1px solid ${palette.corBranchBorder}`, borderRadius: '6px', padding: '0.5rem 0.4rem', fontSize: '0.6rem' }}>
                                        <div style={{ fontWeight: '800', color: palette.corBranchTitle, marginBottom: '0.25rem', textAlign: 'center' }}>ADMISSION DEPT</div>
                                        <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• ADMISSION HEAD<br />• ADMISSION COORDS<br />• COUNSELLORS<br />• TELECALLERS</div>
                                    </div>
                                    <div style={{ background: palette.cardBg, border: `1px solid ${palette.corBranchBorder}`, borderRadius: '6px', padding: '0.5rem 0.4rem', fontSize: '0.6rem' }}>
                                        <div style={{ fontWeight: '800', color: palette.corBranchTitle, marginBottom: '0.25rem', textAlign: 'center' }}>ADMINISTRATION DEPT</div>
                                        <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• ADMIN OFFICER<br />• SUPERVISORS & PRO<br />• OFFICE SUPERINTENDENT<br />• NODAL OFFICER & ERP<br />• ACCOUNTANTS & STAFFS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE RESPONSIVE VERTICAL TREE FLOW (<= 768px ONLY) */}
                <div className="lh-mobile-only" style={{ width: '100%' }}>
                    <div className="lh-mobile-stack">

                        {/* 1. COE SECTION */}
                        <div className="lh-mobile-card" style={{ background: palette.coeBg, borderColor: palette.coeBorder }}>
                            <div style={{ color: palette.coeTitle, fontWeight: '900', fontSize: '0.8rem', textAlign: 'center', marginBottom: '0.3rem' }}>
                                CONTROLLER OF EXAMINATIONS (COE)
                            </div>
                            <div className="lh-mobile-grid-2">
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', textAlign: 'center' }}>
                                    <div style={{ color: palette.textMain, fontWeight: '800', fontSize: '0.72rem' }}>DCOE</div>
                                    <div style={{ color: palette.textMuted, fontSize: '0.58rem' }}>DEPUTY CONTROLLER</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', textAlign: 'center' }}>
                                    <div style={{ color: palette.textMain, fontWeight: '800', fontSize: '0.72rem' }}>ACOE</div>
                                    <div style={{ color: palette.textMuted, fontSize: '0.58rem' }}>ASSISTANT CONTROLLER</div>
                                </div>
                            </div>
                            <div style={{ marginTop: '0.3rem', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.3rem', textAlign: 'center', fontSize: '0.65rem', fontWeight: '700', color: palette.textMain }}>
                                ADMIN STAFFS
                            </div>
                        </div>

                        {/* 2. DEANS (ACADEMICS) SECTION */}
                        <div className="lh-mobile-card" style={{ background: palette.acadBg, borderColor: palette.acadBorder }}>
                            <div style={{ color: palette.acadTitle, fontWeight: '900', fontSize: '0.8rem', textAlign: 'center', marginBottom: '0.4rem' }}>
                                DEANS (ACADEMICS)
                            </div>
                            <div className="lh-mobile-grid-2">
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', textAlign: 'center' }}>DEAN COMPUTING</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• IT • CSE • AI&DS • AI&ML • CYBER</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', textAlign: 'center' }}>DEAN ELECTRICAL</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• ECE • EEE • BME</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', textAlign: 'center' }}>DEAN MECHANICAL</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• MECH • AGRI</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', textAlign: 'center' }}>DEAN SCIENCE & HUM</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• MATHS • SCIENCES • LANGS</div>
                                </div>
                            </div>
                            <div style={{ marginTop: '0.4rem', background: isDark ? '#0f172a' : '#1e293b', color: '#ffffff', borderRadius: '6px', padding: '0.35rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.6rem', fontWeight: '800', marginBottom: '0.2rem' }}>COMMON FACULTY UNDER HOD</div>
                                <div style={{ fontSize: '0.56rem', color: '#cbd5e1' }}>FACULTIES • TEACHING ASSTS • SYSTEM ADMINS • LAB TECHS</div>
                            </div>
                        </div>

                        {/* 3. DEANS (ADMIN) SECTION */}
                        <div className="lh-mobile-card" style={{ background: palette.adminBg, borderColor: palette.adminBorder }}>
                            <div style={{ color: palette.adminTitle, fontWeight: '900', fontSize: '0.8rem', textAlign: 'center', marginBottom: '0.4rem' }}>
                                DEANS (ADMIN)
                            </div>
                            <div className="lh-mobile-grid-2">
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.adminTitle, marginBottom: '0.1rem' }}>DEAN ACADEMICS</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• PG COORD<br />• UG COORD<br />• ADMIN STAFFS</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.adminTitle, marginBottom: '0.1rem' }}>DEAN AUTONOMOUS</div>
                                    <div style={{ color: palette.cardText }}>• ADMIN STAFFS</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.adminTitle, marginBottom: '0.1rem' }}>DEAN IQAC</div>
                                    <div style={{ color: palette.cardText }}>• ADMIN STAFFS</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.adminTitle, marginBottom: '0.1rem' }}>DEAN STUDENT AFFAIRS</div>
                                    <div style={{ color: palette.cardText }}>• ADMIN STAFFS</div>
                                </div>
                            </div>
                        </div>

                        {/* 4. PHYSICAL ED, LIBRARY & WARDENS SECTION */}
                        <div className="lh-mobile-card" style={{ background: palette.purpBg, borderColor: palette.purpBorder }}>
                            <div style={{ color: palette.purpTitle, fontWeight: '900', fontSize: '0.8rem', textAlign: 'center', marginBottom: '0.4rem' }}>
                                PHYSICAL ED, LIBRARY & WARDENS
                            </div>
                            <div className="lh-mobile-grid-2">
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', textAlign: 'center' }}>
                                    <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.68rem' }}>PHYSICAL ED</div>
                                    <div style={{ color: palette.textMain, fontWeight: '700', fontSize: '0.62rem', marginTop: '0.2rem' }}>PHYSICAL DIR</div>
                                    <div style={{ color: palette.textMuted, fontSize: '0.58rem' }}>ASST. PED</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', textAlign: 'center' }}>
                                    <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.68rem' }}>LIBRARY</div>
                                    <div style={{ color: palette.textMain, fontWeight: '700', fontSize: '0.62rem', marginTop: '0.2rem' }}>LIBRARIAN</div>
                                    <div style={{ color: palette.textMuted, fontSize: '0.58rem' }}>ASST. LIBRARIAN</div>
                                </div>
                            </div>
                            <div style={{ marginTop: '0.4rem', background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '6px', padding: '0.4rem', textAlign: 'center' }}>
                                <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.68rem', marginBottom: '0.2rem' }}>WARDENS</div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '0.62rem', fontWeight: '700', color: palette.textMain }}>
                                    <div>BOYS HOSTEL</div>
                                    <div>GIRLS HOSTEL</div>
                                </div>
                            </div>
                        </div>

                        {/* 5. DIRECT REPORTING UNDER SECRETARY */}
                        <div className="lh-mobile-card" style={{ background: palette.secBranchBg, borderColor: palette.secBranchBorder }}>
                            <div style={{ color: palette.secBranchTitle, fontWeight: '900', fontSize: '0.78rem', textAlign: 'center', marginBottom: '0.4rem' }}>
                                ↵ DIRECT REPORTING UNDER SECRETARY
                            </div>
                            <div className="lh-mobile-grid-3">
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.2rem', textAlign: 'center' }}>HR DEPT</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• HR DIRECTOR<br />• HR EXECUTIVE</div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.2rem', textAlign: 'center' }}>TRAINING & PLACEMENT</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3' }}>• PLACEMENT DIR<br />• TRAINING HEAD<br />• TRAINERS</div>
                                </div>
                                <div style={{ gridColumn: 'span 2', background: palette.cardBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.2rem', textAlign: 'center' }}>EXAMINATION CELL</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3', display: 'flex', justifyContent: 'space-around' }}>
                                        <span>• COE</span>
                                        <span>• DEPUTY COE</span>
                                        <span>• ASST COE</span>
                                        <span>• EXAM STAFF</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 6. DIRECT REPORTING UNDER CORRESPONDENT */}
                        <div className="lh-mobile-card" style={{ background: palette.corBranchBg, borderColor: palette.corBranchBorder }}>
                            <div style={{ color: palette.corBranchTitle, fontWeight: '900', fontSize: '0.78rem', textAlign: 'center', marginBottom: '0.4rem' }}>
                                ↳ DIRECT REPORTING UNDER CORRESPONDENT
                            </div>
                            <div className="lh-mobile-grid-2">
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.corBranchBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.corBranchTitle, marginBottom: '0.2rem', textAlign: 'center' }}>ADMISSION DEPT</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3' }}>
                                        • ADMISSION HEAD<br />
                                        • ADMISSION COORDS<br />
                                        • COUNSELLORS<br />
                                        • TELECALLERS
                                    </div>
                                </div>
                                <div style={{ background: palette.cardBg, border: `1px solid ${palette.corBranchBorder}`, borderRadius: '6px', padding: '0.4rem', fontSize: '0.6rem' }}>
                                    <div style={{ fontWeight: '800', color: palette.corBranchTitle, marginBottom: '0.2rem', textAlign: 'center' }}>ADMINISTRATION DEPT</div>
                                    <div style={{ color: palette.cardText, lineHeight: '1.3' }}>
                                        • ADMIN OFFICER<br />
                                        • SUPERVISORS & PRO<br />
                                        • OFFICE SUPERINTENDENT<br />
                                        • NODAL OFFICER & ERP<br />
                                        • ACCOUNTANTS & STAFFS
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default LeadershipHierarchy;
