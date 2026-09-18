import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DepartmentManager from '../components/DepartmentManager';
import { FaShieldAlt, FaSignOutAlt, FaBookOpen } from 'react-icons/fa';

const AdminSyllabusPage = () => {
    const navigate = useNavigate();
    const { user, token, logout } = useAuth();

    useEffect(() => {
        const adminToken = localStorage.getItem('admin_token') || localStorage.getItem('authToken') || token;
        if (!adminToken) {
            navigate('/login?redirect=/admin/syllabus');
        }
    }, [navigate, token]);

    const handleLogout = () => {
        if (logout) logout();
        localStorage.removeItem('admin_token');
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark, #0b0c16)', color: 'var(--text-main, #f8fafc)' }}>
            {/* Top Navigation Bar */}
            <header style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #6366f1, #3b82f6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontSize: '1.1rem'
                        }}>
                            <FaBookOpen />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0, color: '#f8fafc' }}>
                                Autonomous Syllabus & Curriculum Admin
                            </h1>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                Full Administrative Control • R-2023 Autonomous Regulations
                            </span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {user && (
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(99, 102, 241, 0.15)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '20px',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            fontSize: '0.85rem',
                            color: '#c7d2fe'
                        }}>
                            <FaShieldAlt size={12} />
                            <span>{user.username || user.email} ({user.role?.toUpperCase() || 'ADMIN'})</span>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#f87171',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            padding: '0.4rem 0.9rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}
                    >
                        <FaSignOutAlt size={12} /> Logout
                    </button>
                </div>
            </header>

            {/* Main Content Area Rendering DepartmentManager with Full Control */}
            <main style={{ padding: '2rem 1.5rem', maxWidth: '1600px', margin: '0 auto' }}>
                <DepartmentManager />
            </main>
        </div>
    );
};

export default AdminSyllabusPage;
