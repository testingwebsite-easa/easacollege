import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import GlobalHero from '../components/GlobalHero';
import AdmissionForm from '../components/AdmissionForm';
import { FaCalendarAlt, FaCheckCircle, FaMoneyBillWave, FaQuestionCircle, FaFileDownload } from 'react-icons/fa';

const AdmissionsPage = () => {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const admissionDates = [
        { title: "Starting of online registration", date: "1st week of May 2026" },
        { title: "Last date for registration & uploading of documents", date: "1st week of June 2026" },
        { title: "Assigning Random Numbers", date: "2nd week of June 2026" },
        { title: "Certificate verification at TFC’s", date: "2nd week of June 2026" },
        { title: "Display of Rank list", date: "2nd week of July 2026" },
        { title: "Grievances Redressal", date: "2nd week of July 2026" },
        { title: "Counselling for Government (7.5%) special reservation categories", date: "4th week of July 2026" },
        { title: "Commencement of General special reservation categories", date: "4th week of July 2026" },
        { title: "General counselling", date: "4th week of July 2026" },
        { title: "Supplementary Counseling", date: "1st week of September 2026" },
        { title: "SCA to SC Counseling", date: "2nd week of September 2026" }
    ];

    const eligibilityCriteria = [
        "Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/Biotechnology/Biology/Technical Vocational subject.",
        "Obtained at least 45% marks (40% in case of candidates belonging to reserved category) in the above subjects taken together.",
        "Valid score in State Entrance Exam or JEE Mains (for specific quotas)."
    ];

    const faqs = [
        { q: "What is the admission cutoff?", a: "The cutoff varies each year based on the entrance exam results. Please check our latest cutoff list on the website or contact the admission office." },
        { q: "Is there a scholarship for merit students?", a: "Yes, EASA College offers scholarships for meritorious students based on their 12th-grade marks and entrance exam scores. We also facilitate government scholarships." },
        { q: "Can I apply online?", a: "Absolutely! You can use the 'Apply Now' button on this page to start your application process immediately." },
        { q: "What documents are required during admission?", a: "You will need your 10th and 12th mark sheets, transfer certificate, migration certificate (if applicable), and passport-sized photographs." }
    ];

    const academicEligibility = [
        { sl: 1, community: "General Category", marks: "45.00 %" },
        { sl: 2, community: "Backward Class including Backward Class Muslim", marks: "40.00 %" },
        { sl: 3, community: "MBC & DNC", marks: "40.00 %" },
        { sl: 4, community: "SC/SCA/ST", marks: "40.00 %" }
    ];

    const vocationalEligibility = [
        { sl: 1, community: "General Category", marks: "45.00 %" },
        { sl: 2, community: "Backward Class including Backward Class Muslim", marks: "40.00 %" },
        { sl: 3, community: "MBC & DNC", marks: "40.00 %" },
        { sl: 4, community: "SC/SCA/ST", marks: "40.00 %" }
    ];

    const vocationalCourses = [
        { code: "2921 / 2971", subject: "Basic Mechanical Engineering" },
        { code: "2922 / 2972", subject: "Basic Electrical Engineering" },
        { code: "2923 / 2973", subject: "Basic Electronics Engineering" },
        { code: "2924 / 2974", subject: "Basic Civil Engineering" },
        { code: "2925 / 2975", subject: "Basic Automobile Engineering" },
        { code: "2926 / 2976", subject: "Textile Technology" }
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)' }}>
            <SEO
                title="TNEA 2026 Engineering Admission: Dates, Eligibility, Application | EASA College"
                description="Your journey to a top engineering career starts here. Get all the information on EASA College's admission process for TNEA 2026, including important dates, eligibility criteria, and more. Apply online today."
            />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="admissions"
                defaultTitle="TNEA 2026 Admissions: Your Path to a Bright Future"
                defaultSubtitle="Join the next generation of innovators at EASA College"
                defaultImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
            />

            <div className="container py-16">

                {/* Introduction */}
                <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h2 style={{ fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Welcome to EASA College Admissions</h2>
                    <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: '1.8', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        EASA College of Engineering and Technology offers a dynamic learning environment where innovation meets excellence.
                        We invite aspiring engineers to join our community and embark on a journey of academic and professional growth.
                    </p>
                    <div style={{ marginTop: '2.5rem' }}>
                        <button
                            onClick={() => setShowAdmissionForm(true)}
                            className="btn btn-warning"
                            style={{
                                padding: '1rem 3rem',
                                fontSize: '1.1rem',
                                height: 'auto'
                            }}
                        >
                            Apply Now
                        </button>
                    </div>
                </section>

                <div className="grid-2" style={{ gap: '2rem', marginBottom: '4rem' }}>

                    {/* Important Dates */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <FaCalendarAlt style={{ color: 'var(--secondary)' }} /> TNEA 2026 Admission Dates
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {admissionDates.map((item, idx) => (
                                <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.8rem', gap: '2rem', alignItems: 'baseline' }}>
                                    <span style={{ fontWeight: '600', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item.title}</span>
                                    <span style={{ fontWeight: '800', color: 'var(--text-main)', textAlign: 'right' }}>{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Eligibility */}
                    <div id="eligibility" className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <FaCheckCircle style={{ color: 'var(--secondary)' }} /> Eligibility Criteria
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {eligibilityCriteria.map((item, idx) => (
                                <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    <span style={{ minWidth: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '50%', marginTop: '6px' }}></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Detailed Eligibility Tables */}
                <section style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem', textAlign: 'center' }}>
                        Qualifying Examinations and Eligibility
                    </h3>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                        A pass in the HSC (Academic: both +1 and +2) or its equivalent with a minimum average percentage as given below.
                    </p>
                    
                    {/* Academic Table */}
                    <div className="glass-card" style={{ padding: 'clamp(1rem, 2vw, 2rem)', overflowX: 'auto', marginBottom: '3rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--secondary)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '800', width: '10%' }}>Sl.No.</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '800', width: '40%' }}>Community</th>
                                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '800', width: '50%' }}>A Pass with Minimum average marks in Mathematics, Physics and Chemistry put together in +2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {academicEligibility.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1rem' }}>{row.sl}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.community}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '700' }}>{row.marks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'var(--glass-border)' }}></div>
                        <span style={{ position: 'relative', background: 'var(--bg-main)', padding: '0 2rem', fontWeight: '900', color: 'var(--secondary)', fontSize: '1.5rem' }}>OR</span>
                    </div>

                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '1000px', margin: '0 auto 2.5rem auto' }}>
                        A pass in any one of the HSC (Vocational Subject: both +1 and +2) as given below with any one of the Engineering related subjects namely Mathematics, Physics or Chemistry with a minimum average percentage put together as given below.
                    </p>

                    {/* Vocational Table */}
                    <div className="glass-card" style={{ padding: 'clamp(1rem, 2vw, 2rem)', overflowX: 'auto', marginBottom: '4rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)', minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--secondary)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '800', width: '10%' }}>Sl.No.</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '800', width: '40%' }}>Community</th>
                                    <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '800', width: '50%' }}>A Pass with Minimum average marks in Related Subject, Vocational Theory and Practicals put together in +2</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vocationalEligibility.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1rem' }}>{row.sl}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.community}</td>
                                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '700' }}>{row.marks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Prescribed Courses Table
                    <h3 style={{ fontWeight: '900', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center' }}>
                        Vocational Courses prescribed for B.E. / B. Tech. Degree Admission
                    </h3>
                    <div className="glass-card" style={{ padding: 'clamp(1rem, 2vw, 2rem)', overflowX: 'auto', maxWidth: '800px', margin: '0 auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--secondary)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '800', width: '40%' }}>Group Code</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '800', width: '60%' }}>Name of the Vocational Subjects</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vocationalCourses.map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                        <td style={{ padding: '1rem' }}>{row.code}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.subject}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                </section>

                {/* Branch Specific Special Requirements */}
                <section style={{ marginBottom: '4rem' }}>
                    <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--secondary)', background: 'rgba(239, 68, 68, 0.05)' }}>
                        <h4 style={{ fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <FaCheckCircle style={{ color: 'var(--secondary)' }} /> Important Notes
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <li style={{ display: 'flex', gap: '0.8rem' }}>
                                <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>(i)</span>
                                <span>When the candidates produce grade certificates, they have to produce the actual marks also, otherwise only the minimum marks applicable to the grades in the eligible subjects (Mathematics, Physics, Chemistry and Fourth Optional Subject) will be taken into account.</span>
                            </li>
                            <li style={{ display: 'flex', gap: '0.8rem' }}>
                                <span style={{ fontWeight: '700', color: 'var(--secondary)' }}>(ii)</span>
                                <span>For minimum eligibility rounding of marks and normalized marks will not be considered.</span>
                            </li>
                            <li style={{ marginTop: '1rem', padding: '1rem', background: 'var(--glass-highlight)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                <p style={{ margin: 0 }}>
                                    <strong>Improvement marks:</strong> As per the G.O. No. 184 HE (J2) Dept. dt: 09.06.2005 and G.O. (st) No. 143 HE (J2) Dept. dt: 06.05.2008 improvement marks obtained by the candidates including Other State candidates from 2006 onwards will not be considered.
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* FAQ Section */}
                <section style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontWeight: '900', color: 'var(--text-main)', marginBottom: '2.5rem', textAlign: 'center' }}>
                        Frequently Asked Questions
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
                        gap: '1.5rem'
                    }}>
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="glass-card" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.8rem', display: 'flex', gap: '0.8rem' }}>
                                    <FaQuestionCircle style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '3px' }} />
                                    {faq.q}
                                </h4>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Download Brochure CTA */}
                <section style={{ textAlign: 'center', padding: 'clamp(2rem, 5vw, 4rem)', background: 'var(--glass-highlight)', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                    <FaFileDownload style={{ fontSize: '3rem', color: 'var(--secondary)', marginBottom: '1.5rem' }} />
                    <h3 style={{ fontWeight: '900', color: 'var(--text-main)', marginBottom: '1rem' }}>Want to know more?</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>Download our comprehensive brochure to get detailed insights into our programs and campus life.</p>
                    <button
                        className="btn"
                        style={{ border: '2px solid var(--secondary)', height: 'auto' }}
                        onMouseOver={(e) => {
                            e.target.style.background = 'var(--secondary)';
                            e.target.style.color = 'var(--bg-dark)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.color = 'var(--text-main)';
                        }}>
                        Download Brochure
                    </button>
                </section>

            </div>

            <AdmissionForm isOpen={showAdmissionForm} onClose={() => setShowAdmissionForm(false)} />
            <Footer onOpenAdmission={() => setShowAdmissionForm(true)} />
        </div>
    );
};

export default AdmissionsPage;
