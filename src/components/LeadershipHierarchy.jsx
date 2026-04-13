import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import API_BASE_URL from '../api';

const HierarchyNode = ({ member, delay = 0 }) => {
    if (!member) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                width: '100%',
                maxWidth: '300px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                margin: '0 auto',
                zIndex: 2,
                position: 'relative'
            }}
        >
            <div style={{ width: '100px', height: '100px', margin: '0 auto 1rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--secondary)' }}>
                <img
                    src={member.image_url}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3E3E7E&color=fff&size=200`;
                    }}
                />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '0.3rem' }}>{member.name}</h3>
            <p style={{ color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.designation}</p>
        </motion.div>
    );
};

const ConnectingLine = ({ height = '40px', horizontal = false }) => {
    return (
        <div style={{
            width: horizontal ? '100%' : '2px',
            height: horizontal ? '2px' : height,
            background: 'linear-gradient(to bottom, var(--secondary), transparent)',
            margin: '0 auto',
            position: 'relative',
            opacity: 0.6
        }} />
    );
};

const LeadershipHierarchy = () => {
    const [members, setMembers] = useState({
        founder: [],
        chairperson: [],
        secretary: [],
        correspondent: [],
        principal: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLevel = async (category) => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/management-team?category=${category}`);
                if (res.ok) return await res.json();
                return [];
            } catch (err) {
                console.error(`Error fetching ${category}:`, err);
                return [];
            }
        };

        const loadAll = async () => {
            const [f, c, s, cor, p] = await Promise.all([
                fetchLevel('founder'),
                fetchLevel('chairperson'),
                fetchLevel('secretary'),
                fetchLevel('correspondent'),
                fetchLevel('principal')
            ]);
            setMembers({
                founder: f,
                chairperson: c,
                secretary: s,
                correspondent: cor,
                principal: p
            });
            setLoading(false);
        };

        loadAll();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading Hierarchy...</div>;

    return (
        <div style={{ padding: '2rem 0', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Level 1: Founder */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {members.founder.map((m, i) => (
                    <React.Fragment key={m._id}>
                        <HierarchyNode member={m} delay={i * 0.1} />
                        <ConnectingLine />
                    </React.Fragment>
                ))}
            </div>

            {/* Level 2: Chairperson */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {members.chairperson.map((m, i) => (
                    <React.Fragment key={m._id}>
                        <HierarchyNode member={m} delay={0.2 + i * 0.1} />
                        <ConnectingLine />
                    </React.Fragment>
                ))}
            </div>

            {/* Level 3: Secretary & Correspondent */}
            <div style={{ position: 'relative', width: '100%' }}>
                {/* T-junction line */}
                <div style={{
                    width: '60%',
                    height: '2px',
                    background: 'var(--secondary)',
                    margin: '0 auto',
                    opacity: 0.6,
                    position: 'absolute',
                    top: '-2px',
                    left: '20%'
                }} />

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '1rem 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <div style={{ width: '2px', height: '20px', background: 'var(--secondary)', opacity: 0.6 }} />
                        {members.secretary.map((m, i) => (
                            <HierarchyNode key={m._id} member={m} delay={0.4 + i * 0.1} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <div style={{ width: '2px', height: '20px', background: 'var(--secondary)', opacity: 0.6 }} />
                        {members.correspondent.map((m, i) => (
                            <HierarchyNode key={m._id} member={m} delay={0.4 + i * 0.1} />
                        ))}
                    </div>
                </div>

                {/* Bottom junction */}
                <div style={{
                    width: '60%',
                    height: '2px',
                    background: 'var(--secondary)',
                    margin: '0 auto',
                    opacity: 0.6,
                    position: 'relative'
                }} />
                <ConnectingLine height="30px" />
            </div>

            {/* Level 4: Principal */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {members.principal.map((m, i) => (
                    <HierarchyNode key={m._id} member={m} delay={0.6 + i * 0.1} />
                ))}
            </div>
        </div>
    );
};

export default LeadershipHierarchy;
