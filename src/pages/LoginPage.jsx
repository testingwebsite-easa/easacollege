import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { FaGraduationCap, FaBookOpen, FaShieldAlt } from 'react-icons/fa';
import API_BASE_URL from '../api';
import '../styles/LoginPage.css';

const PG_PROGRAMMES = [
    'M.E. Computer Science & Engg',
    'M.E. Construction Engg & Mgmt',
    'M.E. Communication Systems',
    'M.E. Manufacturing Engg',
    'M.E. Power Electronics & Drives',
    'M.E. Structural Engg',
    'Master of Business Administration (MBA)'
];

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Path & Query detections
    const searchParams = new URLSearchParams(location.search);
    const queryLevel = searchParams.get('level')?.toUpperCase();
    const redirectParam = searchParams.get('redirect');

    const isPGPath = location.pathname.includes('/pg') || 
                     location.pathname.includes('pg-login') || 
                     queryLevel === 'PG' ||
                     (redirectParam && redirectParam.includes('level=PG'));

    const isAdminPath = (location.pathname.includes('/admin') || location.pathname === '/admin/login') && 
                        !location.pathname.includes('syllabus');

    // Portal state: 'ug' | 'pg' | 'admin'
    const [portalType, setPortalType] = useState(() => {
        if (isPGPath) return 'pg';
        if (isAdminPath) return 'admin';
        return 'ug';
    });

    // Update portalType when location changes
    useEffect(() => {
        if (isPGPath) {
            setPortalType('pg');
        } else if (isAdminPath) {
            setPortalType('admin');
        }
    }, [location.pathname, location.search, isPGPath, isAdminPath]);

    // Forgot Password States
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotSuccess, setForgotSuccess] = useState('');
    const [forgotError, setForgotError] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login(loginData.username, loginData.password);
            
            // Set tokens based on authenticated user role
            if (data?.token) {
                localStorage.setItem('authToken', data.token);
                const roleLower = (data?.user?.role || '').toLowerCase().trim();
                if (roleLower === 'admin' || roleLower === 'superadmin' || portalType === 'admin') {
                    localStorage.setItem('admin_token', data.token);
                } else {
                    localStorage.removeItem('admin_token');
                }
            }

            // Check if redirect query param exists
            const queryParams = new URLSearchParams(location.search);
            const redirectUrl = queryParams.get('redirect');

            // Navigate based on selected portal & destination
            setTimeout(() => {
                if (redirectUrl) {
                    navigate(redirectUrl);
                } else if (portalType === 'pg') {
                    if (data?.user?.role === 'admin' || data?.user?.role === 'superadmin') {
                        navigate('/admin/syllabus?level=PG');
                    } else if (data?.user?.role === 'hod' || data?.user?.role === 'staff' || data?.user?.role === 'student') {
                        navigate('/dashboard');
                    } else {
                        navigate('/admin/syllabus?level=PG');
                    }
                } else if (portalType === 'ug') {
                    if (data?.user?.role === 'admin' || data?.user?.role === 'superadmin') {
                        navigate('/admin/syllabus?level=UG');
                    } else if (data?.user?.role === 'hod' || data?.user?.role === 'staff' || data?.user?.role === 'student') {
                        navigate('/dashboard');
                    } else {
                        navigate('/admin/syllabus?level=UG');
                    }
                } else if (portalType === 'admin') {
                    if (data?.user?.role === 'admin' || data?.user?.role === 'superadmin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }
                } else {
                    navigate('/dashboard');
                }
            }, 300);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setForgotError('');
        setForgotSuccess('');
        setForgotLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: forgotEmail })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send reset email');
            }

            setForgotSuccess(data.message || 'Password reset link sent to your email.');
        } catch (err) {
            setForgotError(err.message);
        } finally {
            setForgotLoading(false);
        }
    };

    // Header content by portal
    const getHeaderInfo = () => {
        if (portalType === 'pg') {
            return {
                title: 'EASA College',
                subtitle: 'Postgraduate (PG) Courses Syllabus Portal',
                badgeText: '🎓 PG Degree Programmes (M.E. & M.B.A.)',
                badgeClass: 'portal-badge-pg',
                headerClass: 'login-header-pg',
                bgStyle: { background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)' },
                buttonClass: 'auth-btn-pg',
                buttonText: 'Login to PG Syllabus Portal'
            };
        }
        if (portalType === 'admin') {
            return {
                title: 'EASA College',
                subtitle: 'Central College Admin Portal',
                badgeText: '🛡️ Central Administration',
                badgeClass: 'portal-badge-admin',
                headerClass: 'login-header-admin',
                bgStyle: { background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' },
                buttonClass: 'auth-btn-admin',
                buttonText: 'Login as Administrator'
            };
        }
        return {
            title: 'EASA College',
            subtitle: 'Undergraduate (UG) Course Syllabus Portal',
            badgeText: '🏛️ B.E. & B.Tech Programmes',
            badgeClass: 'portal-badge-ug',
            headerClass: 'login-header-ug',
            bgStyle: { background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' },
            buttonClass: 'auth-btn-ug',
            buttonText: 'Login to UG Syllabus Portal'
        };
    };

    const headerInfo = getHeaderInfo();

    if (isForgotMode) {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-header" style={headerInfo.bgStyle}>
                        <h1>{headerInfo.title}</h1>
                        <p>{headerInfo.subtitle}</p>
                    </div>

                    <div className="auth-form">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333', marginBottom: '0.5rem', textAlign: 'center' }}>Forgot Password</h2>
                        <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.4' }}>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        {forgotError && <div className="alert alert-error">{forgotError}</div>}
                        {forgotSuccess && <div className="alert alert-success">{forgotSuccess}</div>}

                        {!forgotSuccess && (
                            <form onSubmit={handleForgotSubmit}>
                                <div className="form-group">
                                    <label htmlFor="forgot-email">Email Address</label>
                                    <input
                                        id="forgot-email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={forgotEmail}
                                        onChange={(e) => { setForgotEmail(e.target.value); setForgotError(''); }}
                                        required
                                    />
                                </div>

                                <button type="submit" className={`auth-btn ${headerInfo.buttonClass}`} disabled={forgotLoading}>
                                    {forgotLoading ? 'Sending Link...' : 'Send Reset Link'}
                                </button>
                            </form>
                        )}

                        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                            <button 
                                type="button" 
                                onClick={() => { setIsForgotMode(false); setForgotSuccess(''); setForgotError(''); }} 
                                style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="login-page">
            <div className="login-container">
                {/* Multi-Portal Selector Tabs */}
                <div className="login-portal-tabs">
                    <button
                        type="button"
                        className={`portal-tab ${portalType === 'ug' ? 'active-ug' : ''}`}
                        onClick={() => { setPortalType('ug'); setError(''); }}
                        title="Undergraduate (B.E. / B.Tech) Syllabus Portal"
                    >
                        <FaBookOpen />
                        <span>UG Syllabus</span>
                    </button>
                    <button
                        type="button"
                        className={`portal-tab ${portalType === 'pg' ? 'active-pg' : ''}`}
                        onClick={() => { setPortalType('pg'); setError(''); }}
                        title="Postgraduate (M.E. / MBA) Courses Syllabus Portal"
                    >
                        <FaGraduationCap />
                        <span>PG Courses</span>
                    </button>
                    <button
                        type="button"
                        className={`portal-tab ${portalType === 'admin' ? 'active-admin' : ''}`}
                        onClick={() => { setPortalType('admin'); setError(''); }}
                        title="Central College Admin Portal"
                    >
                        <FaShieldAlt />
                        <span>Central Admin</span>
                    </button>
                </div>

                {/* Dynamic Header */}
                <div className="login-header" style={headerInfo.bgStyle}>
                    <h1>{headerInfo.title}</h1>
                    <p style={{ margin: '8px 0 0 0', fontWeight: '500' }}>{headerInfo.subtitle}</p>
                    <div style={{ marginTop: '8px' }}>
                        <span className={`portal-badge ${headerInfo.badgeClass}`}>
                            {headerInfo.badgeText}
                        </span>
                    </div>
                </div>

                {error && <div className="alert alert-error" style={{ margin: '20px 30px 0 30px' }}>{error}</div>}

                {/* LOGIN FORM */}
                <form onSubmit={handleLogin} className="auth-form">
                    {/* PG Covered Courses Preview Chips */}
                    {portalType === 'pg' && (
                        <div className="pg-programs-preview">
                            <div className="pg-programs-title">
                                <FaGraduationCap />
                                <span>PG Program Portals Covered:</span>
                            </div>
                            <div className="pg-dept-chips">
                                {PG_PROGRAMMES.map((prog, i) => (
                                    <span key={i} className="pg-dept-chip">{prog}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="login-username">
                            {portalType === 'pg' ? 'PG Faculty / HOD / Admin Username or Email' : 'Username or Email'}
                        </label>
                        <input
                            id="login-username"
                            type="text"
                            name="username"
                            placeholder={portalType === 'pg' ? "Enter PG username (e.g. pgadmin or email)" : "Enter your username or email"}
                            value={loginData.username}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="login-password">Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                                style={{ paddingRight: '40px' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#666',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '5px'
                                }}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
                        <button 
                            type="button" 
                            onClick={() => setIsForgotMode(true)} 
                            style={{ background: 'none', border: 'none', color: portalType === 'pg' ? '#7c3aed' : '#2563eb', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button type="submit" className={`auth-btn ${headerInfo.buttonClass}`} disabled={loading}>
                        {loading ? 'Logging in...' : headerInfo.buttonText}
                    </button>

                    <div className="auth-info-text" style={{ textAlign: 'center', marginTop: '1.5rem', color: '#64748b', fontSize: '0.825rem', lineHeight: '1.5' }}>
                        {portalType === 'pg' ? (
                            <>
                                🎓 <strong>Postgraduate Courses Portal</strong> for M.E. & M.B.A. Faculty and HODs.<br/>
                                <span style={{ color: '#94a3b8' }}>Switch to <a href="#ug" onClick={(e) => { e.preventDefault(); setPortalType('ug'); }} style={{ color: '#2563eb', fontWeight: 'bold' }}>UG Syllabus Portal</a> or <a href="#admin" onClick={(e) => { e.preventDefault(); setPortalType('admin'); }} style={{ color: '#0f172a', fontWeight: 'bold' }}>Admin Login</a></span>
                            </>
                        ) : portalType === 'ug' ? (
                            <>
                                🏛️ <strong>Undergraduate Syllabus Portal</strong> for B.E. & B.Tech Department Curricula.<br/>
                                <span style={{ color: '#94a3b8' }}>Switch to <a href="#pg" onClick={(e) => { e.preventDefault(); setPortalType('pg'); }} style={{ color: '#7c3aed', fontWeight: 'bold' }}>PG Courses Syllabus Portal</a> or <a href="#admin" onClick={(e) => { e.preventDefault(); setPortalType('admin'); }} style={{ color: '#0f172a', fontWeight: 'bold' }}>Admin Login</a></span>
                            </>
                        ) : (
                            <>
                                🛡️ Central Management Portal for college administrators.<br/>
                                <span style={{ color: '#94a3b8' }}>Access <a href="#pg" onClick={(e) => { e.preventDefault(); setPortalType('pg'); }} style={{ color: '#7c3aed', fontWeight: 'bold' }}>PG Portal</a> or <a href="#ug" onClick={(e) => { e.preventDefault(); setPortalType('ug'); }} style={{ color: '#2563eb', fontWeight: 'bold' }}>UG Portal</a></span>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
