import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdmissionForm from '../components/AdmissionForm';
import JobApplicationForm from '../components/JobApplicationForm';
import AdmissionCTA from '../components/AdmissionCTA';
import API_BASE_URL from '../api';
import GlobalHero from '../components/GlobalHero';

const CareerPage = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [applyingPosition, setApplyingPosition] = useState('');
  const [applyingDepartment, setApplyingDepartment] = useState('');
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
      setCareers(data);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCareers = careers.filter(career => {
    const typeMatch = selectedType === 'All' || career.type === selectedType;
    const deptMatch = selectedDepartment === 'All' || career.department === selectedDepartment;
    return typeMatch && deptMatch;
  });

  const departments = ['All', ...new Set(careers.map(c => c.department))];
  const types = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship'];

  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', background: 'var(--bg-main)' }}>
      <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

      <GlobalHero
        pageKey="careers"
        defaultTitle="Join Our Team"
        defaultSubtitle="Shape the future of education. Explore exciting career opportunities at EASA College."
        defaultImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="container" style={{ marginTop: '-50px', position: 'relative', zIndex: 10, display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            padding: '1.5rem 3rem',
            borderRadius: '24px',
            border: '1px solid var(--glass-border)',
            minWidth: '200px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.2rem' }}>{careers.length === 0 ? '0' : `${careers.length}+`}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>Positions</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            padding: '1.5rem 3rem',
            borderRadius: '24px',
            border: '1px solid var(--glass-border)',
            minWidth: '200px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.2rem' }}>{departments.length > 1 ? departments.length - 1 : 0}+</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>Departments</div>
        </motion.div>
      </div>


      {/* FILTERS SECTION */}
      <div style={{
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        position: 'sticky',
        top: '70px',
        zIndex: 10,
        borderBottom: '1px solid var(--glass-border)',
        marginTop: '3rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                Job Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  outline: 'none',
                  fontWeight: '500'
                }}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>
                Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  outline: 'none',
                  fontWeight: '500'
                }}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
              <button
                onClick={() => {
                  setSelectedType('All');
                  setSelectedDepartment('All');
                }}
                className="btn"
                style={{
                  padding: '0.8rem 1.5rem', border: '1px solid var(--glass-border)',
                  background: 'var(--glass-highlight)', color: 'var(--text-main)',
                  fontWeight: '700', borderRadius: '12px'
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem', minHeight: '50vh' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p>Loading opportunities...</p>
          </div>
        ) : filteredCareers.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '6rem 2rem',
            color: 'var(--text-muted)',
            background: 'var(--bg-card)',
            borderRadius: '32px',
            border: '1px solid var(--glass-border)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: '800' }}>No Positions Found</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
              We don't have any openings matching your criteria right now. Try adjusting your filters or check back later!
            </p>
            <button
              onClick={() => { setSelectedType('All'); setSelectedDepartment('All'); }}
              className="btn btn-primary"
            >
              Show All Jobs
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {filteredCareers.map((career, index) => (
              <motion.div
                key={career._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  border: '1px solid var(--glass-border)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}
                whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.1)', borderColor: 'var(--primary)' }}
                onClick={() => setSelectedCareer(career)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '2rem' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ padding: '0.4rem 1rem', background: 'var(--primary-glow)', color: 'var(--primary)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {career.department}
                      </span>
                      <span style={{ padding: '0.4rem 1rem', background: 'var(--glass-highlight)', color: 'var(--text-main)', borderRadius: '50px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {career.type}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: '1.2' }}>
                      {career.title}
                    </h2>

                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7', fontSize: '1.1rem', maxWidth: '700px' }}>
                      {career.description}
                    </p>

                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-main)', fontWeight: '700' }}>
                        <span style={{ fontSize: '1.2rem' }}>💰</span> {career.salary}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-muted)' }}>
                        <span style={{ fontSize: '1.2rem' }}>📍</span> {career.location}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Posted: {formatDate(career.postedDate)}
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', alignSelf: 'center' }}>
                    View & Apply
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* CAREER DETAIL MODAL */}
      {selectedCareer && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'
          }}
          onClick={() => setSelectedCareer(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            style={{
              background: 'var(--bg-section)',
              borderRadius: '32px',
              maxWidth: '850px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid var(--glass-border)',
              position: 'relative',
              boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{
              background: 'var(--primary)',
              padding: '3rem',
              borderRadius: '32px 32px 0 0',
              position: 'relative',
              color: 'white'
            }}>
              <button
                onClick={() => setSelectedCareer(null)}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', color: 'white', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >×</button>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>{selectedCareer.title}</h2>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', opacity: 0.9 }}>
                <div style={{ fontWeight: '600' }}>🏢 {selectedCareer.department}</div>
                <div style={{ fontWeight: '600' }}>⏰ {selectedCareer.type}</div>
                <div style={{ fontWeight: '600' }}>📍 {selectedCareer.location}</div>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '3rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }} className="modal-body-grid">
                <div>
                  <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>Role Overview</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.1rem' }}>{selectedCareer.description}</p>
                  </div>

                  {selectedCareer.requirements && selectedCareer.requirements.length > 0 && (
                    <div style={{ marginBottom: '2.5rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>Requirements</h3>
                      <ul style={{ color: 'var(--text-muted)', lineHeight: '2', paddingLeft: '1.5rem' }}>
                        {selectedCareer.requirements.map((req, idx) => <li key={idx}>{req}</li>)}
                      </ul>
                    </div>
                  )}

                  {selectedCareer.responsibilities && selectedCareer.responsibilities.length > 0 && (
                    <div style={{ marginBottom: '2.5rem' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem' }}>Responsibilities</h3>
                      <ul style={{ color: 'var(--text-muted)', lineHeight: '2', paddingLeft: '1.5rem' }}>
                        {selectedCareer.responsibilities.map((resp, idx) => <li key={idx}>{resp}</li>)}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', position: 'sticky', top: '0' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '0.4rem' }}>Salary Scale</div>
                      <div style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '800' }}>{selectedCareer.salary}</div>
                    </div>
                    {selectedCareer.closingDate && (
                      <div style={{ marginBottom: '2rem' }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '0.4rem' }}>Apply Before</div>
                        <div style={{ color: '#f87171', fontSize: '1.2rem', fontWeight: '800' }}>{formatDate(selectedCareer.closingDate)}</div>
                      </div>
                    )}
                    <button
                      onClick={() => { setApplyingPosition(selectedCareer.title); setApplyingDepartment(selectedCareer.department); setSelectedCareer(null); setShowJobForm(true); }}
                      className="btn btn-primary"
                      style={{ width: '100%', padding: '1rem' }}
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
          @media (max-width: 850px) {
            .modal-body-grid { grid-template-columns: 1fr !important; }
            .modal-body-grid > div:last-child { order: -1; }
          }
      `}</style>
    </div>
  );
};

export default CareerPage;
