import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import GlobalHero from './GlobalHero';
import SEO from './SEO';
import AdmissionForm from './AdmissionForm';
import { useTheme } from '../context/ThemeContext';
import {
  FaFilePdf,
  FaDownload,
  FaSearch,
  FaTimes,
  FaGraduationCap,
  FaBookOpen,
  FaCheckCircle,
  FaInfoCircle,
  FaArrowRight
} from 'react-icons/fa';

const DCSSummary = () => {
  const { theme } = useTheme();
  const isDark = theme !== 'light';
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dcsData = [
    {
      id: 1,
      department: "Agricultural Engineering",
      shortCode: "AGRI",
      degree: "B.E.",
      file: "/assets/dcs/AGRI.pdf",
    },
    {
      id: 2,
      department: "Artificial Intelligence and Data Science",
      shortCode: "AI & DS",
      degree: "B.Tech",
      file: "/assets/dcs/AI&DS.pdf",
    },
    {
      id: 3,
      department: "Electronics & Communication Engineering",
      shortCode: "ECE",
      degree: "B.E.",
      file: "/assets/dcs/ECE.pdf",
    },
    {
      id: 4,
      department: "Mechanical Engineering",
      shortCode: "MECH",
      degree: "B.E.",
      file: "/assets/dcs/MECH.pdf",
    },
    {
      id: 5,
      department: "Information Technology",
      shortCode: "IT",
      degree: "B.Tech",
      file: "/assets/dcs/IT.pdf",
    },
  ];

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return dcsData;
    const query = searchQuery.toLowerCase().trim();
    return dcsData.filter(
      item =>
        item.department.toLowerCase().includes(query) ||
        item.shortCode.toLowerCase().includes(query) ||
        item.degree.toLowerCase().includes(query)
    );
  }, [searchQuery, dcsData]);

  // Color tokens
  const cardBg = isDark ? 'var(--bg-card)' : '#ffffff';
  const cardBorder = isDark ? '1px solid var(--glass-border)' : '1px solid rgba(226, 232, 240, 0.9)';
  const cardShadow = isDark ? '0 20px 50px rgba(0, 0, 0, 0.35)' : '0 12px 35px rgba(0, 0, 0, 0.06)';
  const primaryTextColor = isDark ? '#f8fafc' : '#0F172A';
  const secondaryTextColor = isDark ? '#94a3b8' : '#475569';
  const accentColor = isDark ? '#38BDF8' : '#2563EB';
  const inputBg = isDark ? 'rgba(15, 23, 42, 0.6)' : 'rgba(241, 245, 249, 0.8)';
  const tableBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.85)';

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <SEO
        title="DCS Summary | EASA College of Engineering and Technology"
        description="Official Department Course Summary (DCS) reports and curriculum documentation for EASA College of Engineering and Technology, Coimbatore."
      />

      {/* HEADER / NAVBAR */}
      <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

      {/* HERO BANNER */}
      <GlobalHero
        pageKey="dcs-summary"
        defaultTitle="DCS Summary"
        defaultSubtitle="Department Course Summary & Academic Documentation"
        defaultImage="/images/banner/naac-a-grade-accreditation-2.webp"
      />

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: isMobile ? '2.5rem 1rem 4rem' : '4rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              background: cardBg,
              borderRadius: '24px',
              padding: isMobile ? '1.75rem 1.25rem' : '3.5rem 3rem',
              border: cardBorder,
              boxShadow: cardShadow,
              backdropFilter: isDark ? 'blur(16px)' : 'none',
              transition: 'background 0.3s ease, border-color 0.3s ease'
            }}
          >
            {/* Heading Section */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.4rem 1.2rem',
                  background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                  color: accentColor,
                  borderRadius: '50px',
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '1rem'
                }}
              >
                <FaGraduationCap size={14} /> Academic Documentation
              </span>

              <h1
                style={{
                  color: primaryTextColor,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: '900',
                  margin: '0 0 0.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                Department Course Summary (DCS)
              </h1>

              <div
                style={{
                  width: '85px',
                  height: '4px',
                  background: 'var(--secondary, #febc12)',
                  borderRadius: '10px',
                  margin: '0 auto 1.2rem'
                }}
              />

              <p
                style={{
                  color: secondaryTextColor,
                  fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                  maxWidth: '720px',
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}
              >
                Access approved Department Course Summary (DCS) reports providing course distribution, curriculum breakdown, and outcome alignments across engineering departments.
              </p>
            </div>

            {/* Search & Control Bar */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'stretch' : 'center',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              {/* Search input */}
              <div
                style={{
                  position: 'relative',
                  flex: '1',
                  maxWidth: isMobile ? '100%' : '380px'
                }}
              >
                <FaSearch
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: secondaryTextColor,
                    fontSize: '0.9rem',
                    pointerEvents: 'none'
                  }}
                />
                <input
                  type="text"
                  placeholder="Search department or degree..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 2.8rem',
                    borderRadius: '14px',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(203, 213, 225, 0.9)',
                    background: inputBg,
                    color: primaryTextColor,
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  className="dcs-search-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: secondaryTextColor,
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Clear search"
                  >
                    <FaTimes size={13} />
                  </button>
                )}
              </div>

              {/* Department count badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: secondaryTextColor,
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  justifyContent: isMobile ? 'flex-start' : 'flex-end'
                }}
              >
                <FaCheckCircle style={{ color: accentColor }} />
                <span>
                  Showing {filteredData.length} of {dcsData.length} Departments
                </span>
              </div>
            </div>

            {/* Table Container */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: tableBorderColor,
                boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.04)',
                background: isDark ? 'rgba(15, 23, 42, 0.4)' : '#ffffff'
              }}
            >
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
                  <thead>
                    <tr
                      style={{
                        background: 'linear-gradient(135deg, #1B2A6B 0%, #2563EB 100%)',
                        color: '#ffffff'
                      }}
                    >
                      <th
                        style={{
                          padding: '1.2rem 1.4rem',
                          width: '90px',
                          textAlign: 'center',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        S.No
                      </th>
                      <th
                        style={{
                          padding: '1.2rem 1.4rem',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        Department Name
                      </th>
                     
                      <th
                        style={{
                          padding: '1.2rem 1.4rem',
                          width: '220px',
                          minWidth: '200px',
                          textAlign: 'center',
                          fontWeight: '800',
                          fontSize: '0.88rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <tr
                          key={item.id}
                          className="dcs-table-row"
                          style={{
                            background:
                              index % 2 === 0
                                ? 'transparent'
                                : isDark
                                ? 'rgba(255, 255, 255, 0.02)'
                                : 'rgba(248, 250, 252, 0.7)',
                            borderBottom:
                              index === filteredData.length - 1 ? 'none' : tableBorderColor,
                            transition: 'background 0.2s ease'
                          }}
                        >
                          {/* S.No */}
                          <td style={{ padding: '1.2rem 1.4rem', textAlign: 'center' }}>
                            <span
                              style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                color: accentColor,
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.88rem',
                                fontWeight: '800'
                              }}
                            >
                              {item.id}
                            </span>
                          </td>

                          {/* Department */}
                          <td style={{ padding: '1.2rem 1.4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                              <div
                                style={{
                                  width: '38px',
                                  height: '38px',
                                  borderRadius: '10px',
                                  background: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
                                  color: '#EF4444',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '1.15rem',
                                  flexShrink: 0
                                }}
                              >
                                <FaFilePdf />
                              </div>
                              <div>
                                <a
                                  href={item.file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="dcs-dept-link"
                                  style={{
                                    color: primaryTextColor,
                                    textDecoration: 'none',
                                    fontWeight: '700',
                                    fontSize: '1.02rem',
                                    display: 'inline-block',
                                    transition: 'color 0.2s ease'
                                  }}
                                >
                                  {item.department}
                                </a>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginTop: '4px'
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: '0.72rem',
                                      padding: '2px 8px',
                                      borderRadius: '6px',
                                      fontWeight: '700',
                                      background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.8)',
                                      color: secondaryTextColor,
                                      letterSpacing: '0.3px'
                                    }}
                                  >
                                    {item.degree}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: '0.75rem',
                                      color: secondaryTextColor,
                                      fontWeight: '500'
                                    }}
                                  >
                                    Code: {item.shortCode}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>


                          {/* Action */}
                          <td style={{ padding: '1.2rem 1.4rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                            <a
                              href={item.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={isMobile}
                              className="dcs-action-btn"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '0.6rem 1.35rem',
                                borderRadius: '50px',
                                background: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                color: accentColor,
                                textDecoration: 'none',
                                fontSize: '0.86rem',
                                fontWeight: '800',
                                transition: 'all 0.25s ease',
                                border: '1px solid transparent',
                                whiteSpace: 'nowrap',
                                flexShrink: 0
                              }}
                            >
                              <FaDownload size={13} style={{ flexShrink: 0 }} />
                              <span style={{ whiteSpace: 'nowrap' }}>View / Download</span>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          style={{
                            padding: '3rem 1.5rem',
                            textAlign: 'center',
                            color: secondaryTextColor
                          }}
                        >
                          <FaInfoCircle size={28} style={{ marginBottom: '0.75rem', opacity: 0.6 }} />
                          <p style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                            No department found matching "{searchQuery}"
                          </p>
                          <button
                            onClick={() => setSearchQuery('')}
                            style={{
                              marginTop: '0.8rem',
                              padding: '0.4rem 1rem',
                              borderRadius: '8px',
                              background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                              color: primaryTextColor,
                              border: 'none',
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Reset Filter
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* ADMISSION FORM MODAL */}
      <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />

      {/* FOOTER */}
      <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />

      {/* COMPONENT STYLES */}
      <style>{`
        .dcs-table-row:hover {
          background: ${isDark ? 'rgba(56, 189, 248, 0.08)' : 'rgba(37, 99, 235, 0.06)'} !important;
        }

        .dcs-dept-link:hover {
          color: ${accentColor} !important;
        }

        .dcs-action-btn {
          white-space: nowrap !important;
        }

        .dcs-action-btn span {
          white-space: nowrap !important;
        }

        .dcs-action-btn:hover {
          background: #2563EB !important;
          color: #ffffff !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
        }

        .dcs-search-input:focus {
          border-color: ${accentColor} !important;
          box-shadow: 0 0 0 3px ${isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(37, 99, 235, 0.15)'};
        }

        .dcs-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.45);
        }
      `}</style>
    </div>
  );
};

export default DCSSummary;
