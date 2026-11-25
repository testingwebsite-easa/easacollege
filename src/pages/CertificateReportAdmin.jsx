import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import {
    FaCertificate,
    FaUser,
    FaLock,
    FaSignOutAlt,
    FaArrowLeft,
    FaFileAlt,
    FaShieldAlt
} from 'react-icons/fa';
import API_BASE_URL from '../api';
import SEO from '../components/SEO';
import CertificateCollectionAdmin from '../components/CertificateCollectionAdmin';

const TOKEN_KEY = 'cert_admin_token';
const USER_KEY = 'cert_admin_user';

const CertificateReportAdmin = () => {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
    const [adminUser, setAdminUser] = useState(() => {
        try {
            const raw = localStorage.getItem(USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Verify existing token on mount so expired/tampered tokens return to login screen
    useEffect(() => {
        if (!token) return;
        let cancelled = false;

        fetch(`${API_BASE_URL}/api/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async (res) => {
                if (!res.ok) throw new Error('Invalid session');
                const data = await res.json();
                const role = String(data?.user?.role || '').toLowerCase().trim();
                if (!['admin', 'superadmin', 'coe'].includes(role)) {
                    throw new Error('Unauthorized role');
                }
                if (!cancelled && data.user) {
                    setAdminUser(data.user);
                    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
                }
            })
            .catch(() => {
                if (!cancelled) {
                    localStorage.removeItem(TOKEN_KEY);
                    localStorage.removeItem(USER_KEY);
                    setToken('');
                    setAdminUser(null);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.trim(),
                    password
                })
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok || !data.token) {
                throw new Error(data.error || data.message || 'Invalid username or password');
            }

            const role = String(data?.user?.role || '').toLowerCase().trim();
            if (!['admin', 'superadmin', 'coe'].includes(role)) {
                throw new Error('Access denied. Authorized COE or Admin credentials required.');
            }

            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            setToken(data.token);
            setAdminUser(data.user);
            setPassword('');
        } catch (err) {
            setLoginError(err.message || 'Unable to authenticate. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken('');
        setAdminUser(null);
        setUsername('');
        setPassword('');
    };

    // =========================================================================
    // LOGIN SCREEN
    // =========================================================================
    if (!token) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #060b19 0%, #111c3a 55%, #0b1120 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                fontFamily: 'var(--font-main, Outfit, sans-serif)'
            }}>
                <SEO
                    title="Certificate Collection Report Login | C.O.E Admin"
                    description="Authorized login portal for the EASA College COE Certificate Collection Report."
                />

                <div style={{
                    width: '100%',
                    maxWidth: '430px',
                    background: 'rgba(15, 23, 42, 0.88)',
                    backdropFilter: 'blur(18px)',
                    borderRadius: '22px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
                    padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                    color: '#f8fafc'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.85rem' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '18px',
                            background: 'linear-gradient(135deg, #1B2A6B 0%, #2563eb 100%)',
                            color: '#FCCA26',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.85rem',
                            margin: '0 auto 1rem',
                            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.35)'
                        }}>
                            <FaCertificate />
                        </div>

                        <span style={{
                            display: 'inline-block',
                            fontSize: '0.72rem',
                            fontWeight: '800',
                            letterSpacing: '1.1px',
                            textTransform: 'uppercase',
                            color: '#FCCA26',
                            background: 'rgba(252, 202, 38, 0.12)',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            border: '1px solid rgba(252, 202, 38, 0.3)',
                            marginBottom: '0.65rem'
                        }}>
                            OFFICE OF THE CONTROLLER OF EXAMINATIONS
                        </span>

                        <h1 style={{ fontSize: '1.55rem', fontWeight: '800', margin: '0.2rem 0', color: '#ffffff' }}>
                            Certificate Collection Report
                        </h1>
                        <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0 }}>
                            Sign in with authorized C.O.E credentials to manage certificate requests
                        </p>
                    </div>

                    {loginError && (
                        <div role="alert" style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            color: '#fca5a5',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            marginBottom: '1.35rem',
                            fontSize: '0.86rem',
                            fontWeight: '600'
                        }}>
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                        <div>
                            <label htmlFor="cert-admin-username" style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                                Username
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input
                                    id="cert-admin-username"
                                    type="text"
                                    required
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 1rem 0.85rem 2.65rem',
                                        background: 'rgba(15, 23, 42, 0.75)',
                                        border: '1px solid rgba(255, 255, 255, 0.14)',
                                        borderRadius: '12px',
                                        color: '#ffffff',
                                        fontSize: '0.95rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="cert-admin-password" style={{ display: 'block', color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.4rem' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                                <input
                                    id="cert-admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    style={{
                                        width: '100%',
                                        padding: '0.85rem 2.75rem 0.85rem 2.65rem',
                                        background: 'rgba(15, 23, 42, 0.75)',
                                        border: '1px solid rgba(255, 255, 255, 0.14)',
                                        borderRadius: '12px',
                                        color: '#ffffff',
                                        fontSize: '0.95rem',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    style={{
                                        position: 'absolute',
                                        right: '0.85rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: '#94a3b8',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '4px'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            style={{
                                background: isLoggingIn ? '#475569' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                color: '#ffffff',
                                border: 'none',
                                padding: '0.92rem',
                                borderRadius: '12px',
                                fontWeight: '700',
                                fontSize: '0.98rem',
                                cursor: isLoggingIn ? 'not-allowed' : 'pointer',
                                marginTop: '0.4rem',
                                boxShadow: '0 8px 20px -4px rgba(37, 99, 235, 0.45)'
                            }}
                        >
                            {isLoggingIn ? 'Verifying Credentials...' : 'Sign In to Certificate Report →'}
                        </button>
                    </form>

                    <div style={{
                        marginTop: '1.6rem',
                        paddingTop: '1.1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.82rem',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                    }}>
                        <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <FaArrowLeft size={11} /> Back to Website
                        </Link>
                        <Link to="/certificate-collection" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <FaFileAlt size={11} /> Student Application Form
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // =========================================================================
    // AUTHENTICATED REPORT DASHBOARD VIEW
    // =========================================================================
    return (
        <div style={{ minHeight: '100vh', background: '#070b16', color: '#f8fafc', fontFamily: 'var(--font-main, Outfit, sans-serif)' }}>
            <SEO
                title="Certificate Collection Report | C.O.E Admin Dashboard"
                description="EASA College Certificate Collection Report & Management Portal"
            />

            {/* Top Header */}
            <header style={{
                background: 'rgba(15, 23, 42, 0.95)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '1rem 1.75rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(12px)'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                        <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #1B2A6B, #2563eb)',
                            color: '#FCCA26',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem'
                        }}>
                            <FaCertificate />
                        </div>
                        <div>
                            <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>
                                Certificate Collection Report View
                            </h1>
                            <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                                Office of the Controller of Examinations (C.O.E) • EASA College
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'rgba(37, 99, 235, 0.16)',
                            color: '#93c5fd',
                            border: '1px solid rgba(59, 130, 246, 0.35)',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '999px',
                            fontSize: '0.8rem',
                            fontWeight: '700'
                        }}>
                            <FaShieldAlt /> {adminUser?.username || 'marksheet'}
                        </span>

                        <Link
                            to="/certificate-collection"
                            style={{
                                padding: '0.45rem 0.9rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 255, 255, 0.16)',
                                color: '#e2e8f0',
                                textDecoration: 'none',
                                fontSize: '0.84rem',
                                fontWeight: '600',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <FaFileAlt /> View Form
                        </Link>

                        <button
                            type="button"
                            onClick={handleLogout}
                            style={{
                                padding: '0.45rem 0.95rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                background: 'rgba(239, 68, 68, 0.14)',
                                color: '#fca5a5',
                                fontSize: '0.84rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Report Content */}
            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.75rem 1.25rem 4rem' }}>
                <CertificateCollectionAdmin
                    token={token}
                    onAuthError={handleLogout}
                />
            </main>
        </div>
    );
};

export default CertificateReportAdmin;
