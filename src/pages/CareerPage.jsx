import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaBriefcase, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaCalendarAlt, 
  FaGraduationCap, 
  FaFlask, 
  FaAward, 
  FaHeartbeat, 
  FaArrowRight, 
  FaTimes, 
  FaFilter,
  FaCheckCircle
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionForm from '../components/AdmissionForm';
import JobApplicationForm from '../components/JobApplicationForm';
import AdmissionCTA from '../components/AdmissionCTA';
import API_BASE_URL from '../api';
import GlobalHero from '../components/GlobalHero';
import { useTheme } from '../context/ThemeContext';

const CareerPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [applyingPosition, setApplyingPosition] = useState('');
  const [applyingDepartment, setApplyingDepartment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedCareer, setSelectedCareer] = useState(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/careers?status=Active`);
      const data = await response.json();
      setCareers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCareers = careers.filter(career => {
    const typeMatch = selectedType === 'All' || career.type === selectedType;
    const deptMatch = selectedDepartment === 'All' || career.department === selectedDepartment;
    const query = searchQuery.toLowerCase().trim();
    const searchMatch = !query || 
      (career.title && career.title.toLowerCase().includes(query)) ||
      (career.department && career.department.toLowerCase().includes(query)) ||
      (career.description && career.description.toLowerCase().includes(query)) ||
      (career.location && career.location.toLowerCase().includes(query));
    return typeMatch && deptMatch && searchMatch;
  });

  const departments = ['All', ...new Set(careers.map(c => c.department).filter(Boolean))];
  const types = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];

  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Color Theme Palette Tokens
  const palette = {
    bgMain: isDark ? '#060a17' : '#f8fafc',
    bgRadial: isDark 
      ? 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(245, 158, 11, 0.08), transparent)' 
      : 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(45, 44, 122, 0.06), transparent)',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.75)' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(226, 232, 240, 0.8)',
    cardHoverBorder: isDark ? 'rgba(129, 140, 248, 0.5)' : '#2D2C7A',
    textPrimary: isDark ? '#f8fafc' : '#0f172a',
    textSecondary: isDark ? '#cbd5e1' : '#334155',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    primaryAccent: isDark ? '#818cf8' : '#2D2C7A',
    secondaryAccent: isDark ? '#fbbf24' : '#d97706',
    emeraldAccent: isDark ? '#34d399' : '#059669',
    emeraldBg: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.1)',
    filterBg: isDark ? 'rgba(11, 19, 38, 0.85)' : 'rgba(255, 255, 255, 0.85)',
    filterBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(226, 232, 240, 0.9)',
    inputBg: isDark ? '#0f172a' : '#ffffff',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1',
    modalBg: isDark ? '#0f172a' : '#ffffff',
    statCardBg: isDark ? 'rgba(15, 23, 42, 0.8)' : '#ffffff',
  };

  // Helper for Department Badges
  const getDeptBadgeStyle = (dept = '') => {
    const d = dept.toLowerCase();
    if (d.includes('computer') || d.includes('ai') || d.includes('intelligence') || d.includes('tech') || d.includes('data')) {
      return {
        bg: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.1)',
        color: isDark ? '#a5b4fc' : '#4338ca',
        border: isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(79, 70, 229, 0.2)'
      };
    }
    if (d.includes('management') || d.includes('mba') || d.includes('business')) {
      return {
        bg: isDark ? 'rgba(245, 158, 11, 0.15)' : 'rgba(217, 119, 6, 0.1)',
        color: isDark ? '#fcd34d' : '#b45309',
        border: isDark ? 'rgba(245, 158, 11, 0.3)' : 'rgba(217, 119, 6, 0.2)'
      };
    }
    if (d.includes('science') || d.includes('humanities') || d.includes('math') || d.includes('physics')) {
      return {
        bg: isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(5, 150, 105, 0.1)',
        color: isDark ? '#6ee7b7' : '#047857',
        border: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(5, 150, 105, 0.2)'
      };
    }
    return {
      bg: isDark ? 'rgba(236, 72, 153, 0.15)' : 'rgba(219, 39, 119, 0.1)',
      color: isDark ? '#f472b6' : '#be185d',
      border: isDark ? 'rgba(236, 72, 153, 0.3)' : 'rgba(219, 39, 119, 0.2)'
    };
  };

  const perks = [
    {
      icon: <FaGraduationCap style={{ fontSize: '1.8rem', color: isDark ? '#818cf8' : '#2D2C7A' }} />,
      title: 'Academic Autonomy',
      desc: 'Freedom to innovate curricula, lead research groups, and publish in international journals.'
    },
    {
      icon: <FaFlask style={{ fontSize: '1.8rem', color: isDark ? '#34d399' : '#059669' }} />,
      title: 'Funded Research Labs',
      desc: 'Access to high-performance AI labs, IoT facilities, and university-backed seed funding.'
    },
    {
      icon: <FaAward style={{ fontSize: '1.8rem', color: isDark ? '#fbbf24' : '#d97706' }} />,
      title: 'Competitive Compensation',
      desc: 'Industry-matched salary scales, performance bonuses, and annual research incentives.'
    },
    {
      icon: <FaHeartbeat style={{ fontSize: '1.8rem', color: isDark ? '#f472b6' : '#db2777' }} />,
      title: 'Comprehensive Health & Perks',
      desc: 'Group medical insurance, paid sabbatical leaves, on-campus quarters, and transport support.'
    }
  ];

  return (
    <div style={{
      position: 'relative',
      overflowX: 'hidden',
      minHeight: '100vh',
      background: palette.bgMain,
      backgroundImage: palette.bgRadial,
      backgroundAttachment: 'fixed',
      color: palette.textPrimary,
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

      <GlobalHero
        pageKey="careers"
        defaultTitle="Join Our Team"
        defaultSubtitle="Empowering educators and innovators. Discover rewarding teaching, research, and leadership opportunities at EASA College."
        defaultImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
      />

      {/* STATS HIGHLIGHT CARDS */}
      <div className="container" style={{
        marginTop: '-50px',
        position: 'relative',
        zIndex: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        maxWidth: '1100px',
        margin: '-50px auto 0',
        padding: '0 1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: palette.statCardBg,
            backdropFilter: 'blur(20px)',
            padding: '1.75rem 2rem',
            borderRadius: '20px',
            border: `1px solid ${palette.cardBorder}`,
            textAlign: 'center',
            boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.4)' : '0 15px 35px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: palette.primaryAccent, marginBottom: '0.2rem', lineHeight: '1' }}>
            {careers.length === 0 ? '0' : `${careers.length}+`}
          </div>
          <div style={{ fontSize: '0.75rem', color: palette.textMuted, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>
            Active Openings
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: palette.statCardBg,
            backdropFilter: 'blur(20px)',
            padding: '1.75rem 2rem',
            borderRadius: '20px',
            border: `1px solid ${palette.cardBorder}`,
            textAlign: 'center',
            boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.4)' : '0 15px 35px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: palette.secondaryAccent, marginBottom: '0.2rem', lineHeight: '1' }}>
            {departments.length > 1 ? departments.length - 1 : 0}+
          </div>
          <div style={{ fontSize: '0.75rem', color: palette.textMuted, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>
            Hiring Departments
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: palette.statCardBg,
            backdropFilter: 'blur(20px)',
            padding: '1.75rem 2rem',
            borderRadius: '20px',
            border: `1px solid ${palette.cardBorder}`,
            textAlign: 'center',
            boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.4)' : '0 15px 35px rgba(0,0,0,0.06)'
          }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: palette.emeraldAccent, marginBottom: '0.2rem', lineHeight: '1' }}>
            100%
          </div>
          <div style={{ fontSize: '0.75rem', color: palette.textMuted, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>
            Autonomous Faculty Perks
          </div>
        </motion.div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div style={{
        background: palette.filterBg,
        backdropFilter: 'blur(25px)',
        padding: '1.75rem 1rem',
        position: 'sticky',
        top: '70px',
        zIndex: 20,
        borderBottom: `1px solid ${palette.filterBorder}`,
        marginTop: '3.5rem',
        boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.03)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            
            {/* Search Input */}
            <div style={{ flex: '2', minWidth: '260px', position: 'relative' }}>
              <FaSearch style={{
                position: 'absolute',
                left: '1.1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: palette.textMuted,
                fontSize: '1rem'
              }} />
              <input
                type="text"
                placeholder="Search job title, skills, keyword, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.2rem 0.85rem 2.8rem',
                  borderRadius: '14px',
                  border: `1px solid ${palette.inputBorder}`,
                  background: palette.inputBg,
                  color: palette.textPrimary,
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxShadow: isDark ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : 'inset 0 1px 3px rgba(0,0,0,0.05)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: palette.textMuted,
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Job Type Dropdown */}
            <div style={{ flex: '1', minWidth: '170px' }}>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.2rem',
                  borderRadius: '14px',
                  border: `1px solid ${palette.inputBorder}`,
                  background: palette.inputBg,
                  color: palette.textPrimary,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  outline: 'none',
                  fontWeight: '600'
                }}
              >
                {types.map(type => (
                  <option 
                    key={type} 
                    value={type}
                    style={{ background: isDark ? '#0f172a' : '#ffffff', color: isDark ? '#ffffff' : '#0f172a' }}
                  >
                    {type === 'All' ? 'All Job Types' : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Dropdown */}
            <div style={{ flex: '1.2', minWidth: '200px' }}>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.2rem',
                  borderRadius: '14px',
                  border: `1px solid ${palette.inputBorder}`,
                  background: palette.inputBg,
                  color: palette.textPrimary,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  outline: 'none',
                  fontWeight: '600'
                }}
              >
                {departments.map(dept => (
                  <option 
                    key={dept} 
                    value={dept}
                    style={{ background: isDark ? '#0f172a' : '#ffffff', color: isDark ? '#ffffff' : '#0f172a' }}
                  >
                    {dept === 'All' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            {(selectedType !== 'All' || selectedDepartment !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedType('All');
                  setSelectedDepartment('All');
                  setSearchQuery('');
                }}
                style={{
                  padding: '0.85rem 1.25rem',
                  border: `1px solid ${palette.cardBorder}`,
                  background: isDark ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2',
                  color: isDark ? '#fca5a5' : '#b91c1c',
                  fontWeight: '700',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s'
                }}
              >
                <FaTimes /> Clear Filters
              </button>
            )}

          </div>

          {/* Results Counter Pill */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <span style={{ color: palette.textMuted }}>
              Showing <strong style={{ color: palette.textPrimary }}>{filteredCareers.length}</strong> available position{filteredCareers.length === 1 ? '' : 's'}
            </span>
            {filteredCareers.length > 0 && (
              <span style={{ color: palette.emeraldAccent, display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: palette.emeraldAccent, display: 'inline-block' }}></span>
                Applications currently open
              </span>
            )}
          </div>

        </div>
      </div>

      {/* MAIN JOB LISTINGS SECTION */}
      <main style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1rem', minHeight: '40vh' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: palette.textMuted }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: `3px solid ${palette.cardBorder}`,
              borderTopColor: palette.primaryAccent,
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ fontSize: '1.1rem', fontWeight: '600', color: palette.textSecondary }}>Fetching opportunities...</p>
          </div>
        ) : filteredCareers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              color: palette.textMuted,
              background: palette.cardBg,
              borderRadius: '28px',
              border: `1px solid ${palette.cardBorder}`,
              maxWidth: '620px',
              margin: '0 auto',
              boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: isDark ? 'rgba(99, 102, 241, 0.15)' : 'rgba(45, 44, 122, 0.08)',
              color: palette.primaryAccent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 1.5rem'
            }}>
              <FaBriefcase />
            </div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: palette.textPrimary, fontWeight: '800' }}>
              No Positions Matching Your Filters
            </h3>
            <p style={{ fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.7', color: palette.textMuted }}>
              We couldn't find any openings matching your selected criteria. Try adjusting your search query or reset your filters.
            </p>
            <button
              onClick={() => { setSelectedType('All'); setSelectedDepartment('All'); setSearchQuery(''); }}
              style={{
                padding: '0.85rem 2rem',
                borderRadius: '12px',
                background: isDark ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'var(--primary)',
                color: '#ffffff',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: isDark ? '0 10px 25px rgba(99, 102, 241, 0.4)' : '0 10px 20px rgba(45, 44, 122, 0.2)'
              }}
            >
              View All Positions
            </button>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gap: '1.75rem' }}>
            {filteredCareers.map((career, index) => {
              const deptBadge = getDeptBadgeStyle(career.department);

              return (
                <motion.div
                  key={career._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  style={{
                    background: palette.cardBg,
                    backdropFilter: 'blur(16px)',
                    borderRadius: '24px',
                    padding: '2.25rem',
                    border: `1px solid ${palette.cardBorder}`,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isDark ? '0 15px 35px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  whileHover={{ 
                    y: -6, 
                    boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.6), 0 0 20px rgba(99, 102, 241, 0.2)' : '0 20px 40px rgba(0,0,0,0.08)',
                    borderColor: palette.cardHoverBorder 
                  }}
                  onClick={() => setSelectedCareer(career)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '1.75rem' }}>
                    <div style={{ flex: '1', minWidth: '300px' }}>
                      
                      {/* Department and Type Badges */}
                      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{
                          padding: '0.4rem 0.9rem',
                          background: deptBadge.bg,
                          color: deptBadge.color,
                          border: `1px solid ${deptBadge.border}`,
                          borderRadius: '50px',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          textTransform: 'uppercase',
                          letterSpacing: '0.75px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}>
                          <FaBuilding style={{ fontSize: '0.7rem' }} />
                          {career.department}
                        </span>

                        <span style={{
                          padding: '0.4rem 0.9rem',
                          background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                          color: palette.textSecondary,
                          borderRadius: '50px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.75px',
                          border: `1px solid ${palette.cardBorder}`
                        }}>
                          {career.type}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h2 style={{
                        fontSize: '1.85rem',
                        fontWeight: '800',
                        marginBottom: '0.75rem',
                        color: palette.textPrimary,
                        lineHeight: '1.25'
                      }}>
                        {career.title}
                      </h2>

                      {/* Description Snippet */}
                      <p style={{
                        color: palette.textSecondary,
                        marginBottom: '1.75rem',
                        lineHeight: '1.7',
                        fontSize: '1.025rem',
                        maxWidth: '820px'
                      }}>
                        {career.description}
                      </p>

                      {/* Job Meta Details */}
                      <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        
                        {/* Salary */}
                        {career.salary && (
                          <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: palette.emeraldAccent,
                            fontWeight: '800',
                            fontSize: '1rem',
                            background: palette.emeraldBg,
                            padding: '0.35rem 0.85rem',
                            borderRadius: '10px'
                          }}>
                            <FaMoneyBillWave /> {career.salary}
                          </div>
                        )}

                        {/* Location */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: palette.textMuted, fontSize: '0.925rem', fontWeight: '500' }}>
                          <FaMapMarkerAlt style={{ color: palette.primaryAccent }} /> {career.location || 'Coimbatore, Tamil Nadu'}
                        </div>

                        {/* Posted Date */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: palette.textMuted, fontSize: '0.925rem', fontWeight: '500' }}>
                          <FaCalendarAlt /> Posted: {formatDate(career.postedDate)}
                        </div>

                      </div>

                    </div>

                    {/* View & Apply CTA Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCareer(career);
                      }}
                      style={{
                        padding: '0.9rem 2.25rem',
                        background: isDark ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'var(--primary)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '14px',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        alignSelf: 'center',
                        boxShadow: isDark ? '0 10px 25px rgba(99, 102, 241, 0.35)' : '0 8px 20px rgba(45, 44, 122, 0.2)',
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                    >
                      View & Apply <FaArrowRight style={{ fontSize: '0.8rem' }} />
                    </button>

                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* WHY JOIN EASA / CULTURE HIGHLIGHTS SECTION */}
      <section style={{
        maxWidth: '1200px',
        margin: '2rem auto 5rem',
        padding: '0 1rem'
      }}>
        <div style={{
          background: palette.cardBg,
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          border: `1px solid ${palette.cardBorder}`,
          padding: '3.5rem 2.5rem',
          boxShadow: isDark ? '0 30px 60px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.05)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span style={{
              padding: '0.4rem 1.1rem',
              borderRadius: '50px',
              background: isDark ? 'rgba(251, 191, 36, 0.15)' : 'rgba(217, 119, 6, 0.1)',
              color: palette.secondaryAccent,
              fontSize: '0.8rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Why Join EASA College
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: palette.textPrimary, marginBottom: '0.75rem', lineHeight: '1.2' }}>
              Thrive in an Environment Built for Excellence
            </h2>
            <p style={{ color: palette.textSecondary, fontSize: '1.05rem', lineHeight: '1.7' }}>
              We empower our faculty, researchers, and administrators with world-class facilities, academic autonomy, and continuous career growth.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                style={{
                  background: isDark ? 'rgba(11, 19, 38, 0.6)' : '#f8fafc',
                  padding: '2rem',
                  borderRadius: '20px',
                  border: `1px solid ${palette.cardBorder}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  transition: 'transform 0.2s, border-color 0.2s'
                }}
                whileHover={{ y: -4, borderColor: palette.primaryAccent }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: isDark ? 'rgba(255, 255, 255, 0.06)' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.06)'
                }}>
                  {perk.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: palette.textPrimary }}>
                  {perk.title}
                </h3>
                <p style={{ color: palette.textMuted, fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {perk.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER DETAIL MODAL */}
      <AnimatePresence>
        {selectedCareer && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
            onClick={() => setSelectedCareer(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              style={{
                background: palette.modalBg,
                borderRadius: '28px',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                border: `1px solid ${palette.cardBorder}`,
                position: 'relative',
                boxShadow: isDark ? '0 40px 100px rgba(0,0,0,0.8)' : '0 40px 100px rgba(0,0,0,0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{
                background: isDark ? 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)' : 'var(--primary)',
                padding: '2.5rem',
                borderRadius: '28px 28px 0 0',
                position: 'relative',
                color: '#ffffff',
                borderBottom: `1px solid ${palette.cardBorder}`
              }}>
                <button
                  onClick={() => setSelectedCareer(null)}
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                >
                  <FaTimes />
                </button>

                <div style={{ display: 'inline-block', marginBottom: '0.75rem' }}>
                  <span style={{
                    padding: '0.35rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {selectedCareer.department}
                  </span>
                </div>

                <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.25' }}>
                  {selectedCareer.title}
                </h2>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', opacity: 0.9, fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FaBriefcase /> {selectedCareer.type}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FaMapMarkerAlt /> {selectedCareer.location || 'Coimbatore, Tamil Nadu'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FaCalendarAlt /> Posted: {formatDate(selectedCareer.postedDate)}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div style={{ padding: '2.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2.5rem' }} className="modal-body-grid">
                  <div>
                    {/* Role Overview */}
                    <div style={{ marginBottom: '2.25rem' }}>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: palette.textPrimary, marginBottom: '0.75rem' }}>
                        Role Overview
                      </h3>
                      <p style={{ color: palette.textSecondary, lineHeight: '1.8', fontSize: '1.05rem' }}>
                        {selectedCareer.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    {selectedCareer.requirements && selectedCareer.requirements.length > 0 && (
                      <div style={{ marginBottom: '2.25rem' }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: palette.textPrimary, marginBottom: '0.75rem' }}>
                          Key Requirements
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {selectedCareer.requirements.map((req, idx) => (
                            <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: palette.textSecondary, lineHeight: '1.6' }}>
                              <FaCheckCircle style={{ color: palette.emeraldAccent, marginTop: '0.25rem', flexShrink: 0 }} />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Responsibilities */}
                    {selectedCareer.responsibilities && selectedCareer.responsibilities.length > 0 && (
                      <div style={{ marginBottom: '2.25rem' }}>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: palette.textPrimary, marginBottom: '0.75rem' }}>
                          Core Responsibilities
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          {selectedCareer.responsibilities.map((resp, idx) => (
                            <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: palette.textSecondary, lineHeight: '1.6' }}>
                              <FaCheckCircle style={{ color: palette.primaryAccent, marginTop: '0.25rem', flexShrink: 0 }} />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Application Card */}
                  <div>
                    <div style={{
                      background: isDark ? '#0b1329' : '#f8fafc',
                      padding: '2rem',
                      borderRadius: '22px',
                      border: `1px solid ${palette.cardBorder}`,
                      position: 'sticky',
                      top: '0',
                      boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.04)'
                    }}>
                      
                      {selectedCareer.salary && (
                        <div style={{ marginBottom: '1.5rem' }}>
                          <div style={{ color: palette.textMuted, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '0.35rem' }}>
                            Offered Salary Scale
                          </div>
                          <div style={{ color: palette.emeraldAccent, fontSize: '1.4rem', fontWeight: '800' }}>
                            {selectedCareer.salary}
                          </div>
                        </div>
                      )}

                      {selectedCareer.closingDate && (
                        <div style={{ marginBottom: '1.75rem' }}>
                          <div style={{ color: palette.textMuted, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '0.35rem' }}>
                            Application Deadline
                          </div>
                          <div style={{ color: isDark ? '#f87171' : '#dc2626', fontSize: '1.1rem', fontWeight: '800' }}>
                            {formatDate(selectedCareer.closingDate)}
                          </div>
                        </div>
                      )}

                      <div style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        background: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(45, 44, 122, 0.05)',
                        border: `1px solid ${isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(45, 44, 122, 0.1)'}`,
                        marginBottom: '1.5rem',
                        fontSize: '0.85rem',
                        color: palette.textSecondary,
                        lineHeight: '1.5'
                      }}>
                        💡 Upload your updated Resume (PDF) and academic credentials via our streamlined application portal.
                      </div>

                      <button
                        onClick={() => {
                          setApplyingPosition(selectedCareer.title);
                          setApplyingDepartment(selectedCareer.department);
                          setSelectedCareer(null);
                          setShowJobForm(true);
                        }}
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: isDark ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'var(--primary)',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '14px',
                          fontWeight: '800',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          boxShadow: isDark ? '0 10px 25px rgba(99, 102, 241, 0.4)' : '0 10px 20px rgba(45, 44, 122, 0.2)',
                          transition: 'transform 0.2s'
                        }}
                      >
                        Apply for this Role
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AdmissionCTA onApplyClick={() => setShowAdmissionForm(true)} />
      <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
      
      <JobApplicationForm
        isOpen={showJobForm}
        onClose={() => setShowJobForm(false)}
        position={applyingPosition}
        department={applyingDepartment}
      />

      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 850px) {
          .modal-body-grid { grid-template-columns: 1fr !important; }
          .modal-body-grid > div:last-child { order: -1; }
        }
      `}</style>
    </div>
  );
};

export default CareerPage;
