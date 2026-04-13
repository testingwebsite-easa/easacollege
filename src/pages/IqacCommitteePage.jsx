import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalHero from '../components/GlobalHero';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

function IqacCommitteePage() {
    const [showAdmissionForm, setShowAdmissionForm] = useState(false);

    const members = [
        { sl: 1, name: "Shri T E Ajith", designation: "CEO & Secretary, EASA College of Engineering and Technology", category: "Member : Management" },
        { sl: 2, name: "Dr Z Robert Kennedy", designation: "Principal", category: "Chairperson" },
        { sl: 3, name: "Dr P Manju", designation: "Dean, Quality Assurance & Student Affairs", category: "IQAC Co-ordinator" },
        { sl: 4, name: "Dr N Natarajan", designation: "Dean, Academic & Autonomous Affairs", category: "Member : Teacher" },
        { sl: 5, name: "Dr S Santhosh", designation: "Professor & Dean, Mechanical Sciences", category: "Member : Teacher" },
        { sl: 6, name: "Dr Sasikala P", designation: "HoD , Department of CSE (Cyber Security)", category: "Member : Teacher" },
        { sl: 7, name: "Mr Madhan P", designation: "Assistant Professor, Department of Agricultural Engineering", category: "Member : Teacher" },
        { sl: 8, name: "Dr S Kathiresan", designation: "Secretary, COODU Organisation, Coimbatore", category: "Member : Local Society" },
        { sl: 9, name: "Mr M Nagavijay (20TUME701)", designation: "Third Year, BE Electronics and Communication Engineering", category: "Member : Student" },
        { sl: 10, name: "Mr Pradeep Mohandoss", designation: "Founder, Hexo Global Technologies Pvt Limited, Bengaluru", category: "Member : Alumni" },
        { sl: 11, name: "Mr K Saravana Kumar", designation: "Kavin Engineering, Tidal Park, Coimbatore", category: "Member : Employer" },
        { sl: 12, name: "Mr Sridhar P", designation: "Robert Bosch, Coimbatore", category: "Member : Industrialist" },
        { sl: 13, name: "Mr K Mohan", designation: "Assistant Engineer TNEB, Mangoon(ss), F/o Mr M Srimanikandamoorthy (Batch 2023-2027), BE Agricultural Engineering", category: "Member : Parent" },
        { sl: 14, name: "Ms Janani", designation: "Office Assistant", category: "Member : Non-Teaching" },
        { sl: 15, name: "Mr Karthikeyan", designation: "Office Assistant", category: "Member: Non-Teaching" },
    ];

    return (
        <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', position: 'relative' }}>
            <SEO title="IQAC Committee | EASA College" description="Members of Internal Quality Assurance Cell (IQAC)." />
            <Navbar onApplyClick={() => setShowAdmissionForm(true)} />

            <GlobalHero
                pageKey="iqac-committee"
                defaultTitle="IQAC Members"
                defaultSubtitle="The team driving quality assurance and institutional excellence."
            />

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="overflow-x-auto"
                >
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--secondary)' }}>
                                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', whiteSpace: 'nowrap' }}>Sl. No.</th>
                                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Name & Designation</th>
                                <th style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)' }}>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member, index) => (
                                <tr key={index} style={{ background: 'rgba(255,255,255,0.03)', transition: 'background 0.3s' }}>
                                    <td style={{ padding: '1.5rem', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px', verticalAlign: 'top', fontWeight: 'bold' }}>{member.sl}</td>
                                    <td style={{ padding: '1.5rem', verticalAlign: 'top' }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.4rem' }}>{member.name}</div>
                                        <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{member.designation}</div>
                                    </td>
                                    <td style={{ padding: '1.5rem', borderTopRightRadius: '12px', borderBottomRightRadius: '12px', verticalAlign: 'top' }}>
                                        <span style={{
                                            background: 'rgba(230, 182, 39, 0.1)',
                                            color: 'var(--secondary)',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '50px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {member.category}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}

export default IqacCommitteePage;
