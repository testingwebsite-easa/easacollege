import React from 'react';
import { FaUserTie, FaChalkboardTeacher, FaLaptop, FaFlask, FaSun, FaMoon } from 'react-icons/fa';
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
    const { theme, toggleTheme } = useTheme();
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
        <section style={{
            width: '100%',
            padding: '0.5rem 0',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: palette.textMain,
            boxSizing: 'border-box',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
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
                        <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: palette.lineColor, letterSpacing: '1px', margin: 0, textTransform: 'uppercase' }}>
                            ORGANIZATIONAL CHART
                        </h2>
                        <div style={{ height: '2px', width: '35px', background: palette.lineColor }}></div>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: palette.textMain, fontWeight: '800', margin: '0.2rem 0 0 0', letterSpacing: '0.5px' }}>
                        EASA COLLEGE OF ENGINEERING AND TECHNOLOGY
                    </p>
                </div>

                {/* GOVERNING LEVEL (CHAIRPERSON -> SECRETARY/CORRESPONDENT -> PRINCIPAL) */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

                    {/* CHAIRPERSON */}
                    <div style={{
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

                    {/* HORIZONTAL CONNECTOR FOR SECRETARY & CORRESPONDENT */}
                    <div style={{ position: 'relative', width: '80%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '100%', height: '2px', background: palette.lineColor }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '0px' }}>
                            <ArrowDown length={14} color={palette.lineColor} />
                            <ArrowDown length={14} color={palette.lineColor} />
                        </div>
                    </div>

                    {/* SECRETARY & CORRESPONDENT ROW */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%', maxWidth: '520px', marginBottom: '2px' }}>
                        <div style={{
                            background: palette.headerBg,
                            color: palette.headerText,
                            border: `1px solid ${palette.headerBorder}`,
                            padding: '0.5rem 1.4rem',
                            borderRadius: '6px',
                            fontWeight: '800',
                            fontSize: '0.85rem',
                            letterSpacing: '0.5px'
                        }}>
                            SECRETARY
                        </div>
                        <div style={{
                            background: palette.headerBg,
                            color: palette.headerText,
                            border: `1px solid ${palette.headerBorder}`,
                            padding: '0.5rem 1.4rem',
                            borderRadius: '6px',
                            fontWeight: '800',
                            fontSize: '0.85rem',
                            letterSpacing: '0.5px'
                        }}>
                            CORRESPONDENT
                        </div>
                    </div>

                    {/* LINES CONVERGING TO PRINCIPAL */}
                    <div style={{ position: 'relative', width: '80%', maxWidth: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ width: '2px', height: '12px', background: palette.lineColor }}></div>
                            <div style={{ width: '2px', height: '12px', background: palette.lineColor }}></div>
                        </div>
                        <div style={{ width: '100%', height: '2px', background: palette.lineColor }}></div>
                        <ArrowDown length={14} color={palette.lineColor} />
                    </div>

                    {/* PRINCIPAL */}
                    <div style={{
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

                    <ArrowDown length={18} color={palette.lineColor} />

                    {/* TOP BEAM DISTRIBUTING TO 6 MAIN ARMS */}
                    <div style={{ width: '96%', height: '2px', background: palette.lineColor, position: 'relative' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '96%', marginBottom: '6px' }}>
                        <ArrowDown length={12} color={palette.lineColor} />
                        <ArrowDown length={12} color={palette.lineColor} />
                        <ArrowDown length={12} color={palette.lineColor} />
                        <ArrowDown length={12} color={palette.lineColor} />
                        <ArrowDown length={12} color={palette.lineColor} />
                        <ArrowDown length={12} color={palette.lineColor} />
                    </div>
                </div>

                {/* 6 MAIN COLUMNS - FULLY RESPONSIVE AND FIT TO SCREEN */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.5rem',
                    width: '100%',
                    boxSizing: 'border-box'
                }}>

                    {/* 1. COE COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: '100%',
                            background: palette.coeBg,
                            border: `1px solid ${palette.coeBorder}`,
                            borderRadius: '6px',
                            padding: '0.5rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.coeTitle, fontWeight: '900', fontSize: '0.78rem' }}>COE</div>
                            <div style={{ color: palette.textMuted, fontSize: '0.58rem', fontWeight: '700' }}>CONTROLLER OF EXAMINATIONS</div>
                        </div>

                        <ArrowDown length={8} color={palette.coeBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.4rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.textMain, fontWeight: '800', fontSize: '0.7rem' }}>DCOE</div>
                            <div style={{ color: palette.textMuted, fontSize: '0.55rem', fontWeight: '600' }}>DEPUTY CONTROLLER</div>
                        </div>

                        <ArrowDown length={8} color={palette.cardBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.4rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.textMain, fontWeight: '800', fontSize: '0.7rem' }}>ACOE</div>
                            <div style={{ color: palette.textMuted, fontSize: '0.55rem', fontWeight: '600' }}>ASSISTANT CONTROLLER</div>
                        </div>

                        <ArrowDown length={8} color={palette.cardBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.35rem',
                            textAlign: 'center',
                            fontSize: '0.62rem',
                            fontWeight: '700',
                            color: palette.textMain
                        }}>
                            ADMIN STAFFS
                        </div>
                    </div>

                    {/* 2. DEANS (ACADEMICS) COLUMN */}
                    <div style={{
                        gridColumn: 'span 2',
                        background: palette.acadBg,
                        border: `1px solid ${palette.acadBorder}`,
                        borderRadius: '6px',
                        padding: '0.4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            background: isDark ? 'rgba(13,148,136,0.3)' : '#dbeafe',
                            color: palette.acadTitle,
                            fontWeight: '900',
                            fontSize: '0.78rem',
                            padding: '0.3rem',
                            borderRadius: '4px',
                            letterSpacing: '0.5px'
                        }}>
                            DEANS (ACADEMICS)
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.25rem' }}>
                            {/* School 1 */}
                            <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', fontSize: '0.56rem', textAlign: 'center' }}>
                                    DEAN COMPUTING
                                </div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>
                                    • IT<br />• CSE<br />• AI&DS<br />• AI&ML<br />• CYBER
                                </div>
                            </div>

                            {/* School 2 */}
                            <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', fontSize: '0.56rem', textAlign: 'center' }}>
                                    DEAN ELECTRICAL
                                </div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>
                                    • ECE<br />• EEE<br />• BME
                                </div>
                            </div>

                            {/* School 3 */}
                            <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', fontSize: '0.56rem', textAlign: 'center' }}>
                                    DEAN MECHANICAL
                                </div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>
                                    • MECH<br />• AGRI
                                </div>
                            </div>

                            {/* School 4 */}
                            <div style={{ background: palette.cardBg, border: `1px solid ${palette.cardBorder}`, borderRadius: '4px', padding: '0.3rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.acadTitle, marginBottom: '0.2rem', fontSize: '0.56rem', textAlign: 'center' }}>
                                    DEAN SCIENCE & HUM
                                </div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>
                                    • MATHS<br />• SCIENCES<br />• LANGS
                                </div>
                            </div>
                        </div>

                        {/* COMMON FACULTY BANNER */}
                        <div style={{
                            background: isDark ? '#0f172a' : '#1e293b',
                            color: '#ffffff',
                            borderRadius: '4px',
                            padding: '0.35rem 0.2rem',
                            textAlign: 'center',
                            border: `1px solid ${palette.cardBorder}`
                        }}>
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
                    <div style={{
                        background: palette.adminBg,
                        border: `1px solid ${palette.adminBorder}`,
                        borderRadius: '6px',
                        padding: '0.4rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            background: isDark ? 'rgba(22,101,52,0.35)' : '#dcfce7',
                            color: palette.adminTitle,
                            fontWeight: '900',
                            fontSize: '0.78rem',
                            padding: '0.3rem',
                            borderRadius: '4px',
                            letterSpacing: '0.5px'
                        }}>
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

                    {/* 4. PHYSICAL EDUCATION */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: '100%',
                            background: palette.purpBg,
                            border: `1px solid ${palette.purpBorder}`,
                            borderRadius: '6px',
                            padding: '0.4rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.65rem' }}>PHYSICAL ED DIRECTOR</div>
                        </div>

                        <ArrowDown length={8} color={palette.purpBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.35rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.textMain, fontWeight: '700', fontSize: '0.62rem' }}>PHYSICAL DIRECTOR</div>
                        </div>

                        <ArrowDown length={8} color={palette.cardBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.35rem 0.2rem',
                            textAlign: 'center',
                            fontSize: '0.62rem',
                            fontWeight: '700',
                            color: palette.textMuted
                        }}>
                            ASST. PED
                        </div>
                    </div>

                    {/* 5. LIBRARY */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: '100%',
                            background: palette.purpBg,
                            border: `1px solid ${palette.purpBorder}`,
                            borderRadius: '6px',
                            padding: '0.4rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.68rem' }}>LIBRARY</div>
                        </div>

                        <ArrowDown length={8} color={palette.purpBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.35rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.textMain, fontWeight: '700', fontSize: '0.62rem' }}>LIBRARIAN</div>
                        </div>

                        <ArrowDown length={8} color={palette.cardBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.35rem 0.2rem',
                            textAlign: 'center',
                            fontSize: '0.62rem',
                            fontWeight: '700',
                            color: palette.textMuted
                        }}>
                            ASST. LIBRARIAN
                        </div>
                    </div>

                    {/* 6. WARDENS */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{
                            width: '100%',
                            background: palette.purpBg,
                            border: `1px solid ${palette.purpBorder}`,
                            borderRadius: '6px',
                            padding: '0.4rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.purpTitle, fontWeight: '800', fontSize: '0.68rem' }}>WARDENS</div>
                        </div>

                        <ArrowDown length={8} color={palette.purpBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.35rem 0.2rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ color: palette.textMain, fontWeight: '700', fontSize: '0.6rem' }}>WARDEN BOYS HOSTEL</div>
                        </div>

                        <ArrowDown length={8} color={palette.cardBorder} />

                        <div style={{
                            width: '100%',
                            background: palette.cardBg,
                            border: `1px solid ${palette.cardBorder}`,
                            borderRadius: '6px',
                            padding: '0.35rem 0.2rem',
                            textAlign: 'center',
                            fontSize: '0.6rem',
                            fontWeight: '700',
                            color: palette.textMain
                        }}>
                            WARDEN GIRLS HOSTEL
                        </div>
                    </div>

                </div>

                {/* BOTTOM REPORTING BRANCHES (SECRETARY & CORRESPONDENT SUPPORT DEPARTMENTS) */}
                <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: `2px dashed ${palette.borderContainer}`,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem'
                }}>

                    {/* LEFT BRANCH: UNDER SECRETARY */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.68rem', fontWeight: '800', color: palette.lineColor, marginBottom: '0.4rem' }}>
                            <span>↵ REPORTING UNDER SECRETARY</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
                            <div style={{ background: palette.secBranchBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '4px', padding: '0.4rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.2rem' }}>HR DEPT</div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• HR DIRECTOR<br />• HR EXECUTIVE</div>
                            </div>

                            <div style={{ background: palette.secBranchBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '4px', padding: '0.4rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.2rem' }}>TRAINING & PLACEMENT</div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• PLACEMENT DIR<br />• TRAINING HEAD<br />• TRAINERS</div>
                            </div>

                            <div style={{ background: palette.secBranchBg, border: `1px solid ${palette.secBranchBorder}`, borderRadius: '4px', padding: '0.4rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.secBranchTitle, marginBottom: '0.2rem' }}>EXAMINATION CELL</div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>• COE<br />• DEPUTY COE<br />• ASST COE<br />• EXAM STAFF</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT BRANCH: UNDER CORRESPONDENT */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.68rem', fontWeight: '800', color: palette.lineColor, marginBottom: '0.4rem' }}>
                            <span>↳ REPORTING UNDER CORRESPONDENT</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                            <div style={{ background: palette.corBranchBg, border: `1px solid ${palette.corBranchBorder}`, borderRadius: '4px', padding: '0.4rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.corBranchTitle, marginBottom: '0.2rem' }}>ADMISSION DEPT</div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>
                                    • ADMISSION HEAD<br />
                                    • ADMISSION COORDS<br />
                                    • COUNSELLORS<br />
                                    • TELECALLERS
                                </div>
                            </div>

                            <div style={{ background: palette.corBranchBg, border: `1px solid ${palette.corBranchBorder}`, borderRadius: '4px', padding: '0.4rem', fontSize: '0.58rem' }}>
                                <div style={{ fontWeight: '800', color: palette.corBranchTitle, marginBottom: '0.2rem' }}>ADMINISTRATION DEPT</div>
                                <div style={{ color: palette.cardText, lineHeight: '1.2' }}>
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
        </section>
    );
};

export default LeadershipHierarchy;
