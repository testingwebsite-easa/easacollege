import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import API_BASE_URL from '../api';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const isAdminPath = location.pathname.includes('/admin');
    const isSyllabusPath = location.pathname.includes('syllabus');

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
            
            // Set both tokens for seamless full control across CMS & Syllabus
            if (data?.token) {
                localStorage.setItem('authToken', data.token);
                if (data?.user?.role === 'admin' || isAdminPath || data?.user?.role === 'hod') {
                    localStorage.setItem('admin_token', data.token);
                }
            }

            // Check if redirect query param exists
            const queryParams = new URLSearchParams(location.search);
            const redirectUrl = queryParams.get('redirect');

            // Navigate based on role & destination
            setTimeout(() => {
                if (redirectUrl) {
                    navigate(redirectUrl);
                } else if (location.pathname === '/admin/syllabus' || isSyllabusPath || location.pathname === '/login' || location.pathname === '/syllabus-login' || location.pathname === '/syllabus/login') {
                    if (data?.user?.role === 'admin' || data?.user?.role === 'superadmin') {
                        navigate('/admin/syllabus');
                    } else if (data?.user?.role === 'hod' || data?.user?.role === 'staff' || data?.user?.role === 'student') {
                        navigate('/dashboard');
                    } else {
                        navigate('/admin/syllabus');
                    }
                } else if (location.pathname === '/admin/login' || location.pathname === '/admin') {
                    if (data?.user?.role === 'admin' || data?.user?.role === 'superadmin') {
                        navigate('/admin');
                    } else {
                        navigate('/dashboard');
                    }
                } else if (data?.user?.role === 'admin' || data?.user?.role === 'superadmin') {
                    navigate('/admin/syllabus');
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

    if (isForgotMode) {
        return (
            <div className="login-page">
                <div className="login-container">
                    <div className="login-header">
                        <h1>EASA College</h1>
                        <p>{isAdminPath ? 'Central College Admin Portal' : 'Academic & Syllabus Portal'}</p>
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

                                <button type="submit" className="auth-btn" disabled={forgotLoading}>
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
                <div className="login-header">
                    <h1>EASA College</h1>
                    <p>{isAdminPath ? 'Central College Admin Portal' : 'Academic & Syllabus Portal'}</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                {/* LOGIN FORM */}
                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="login-username">Username or Email</label>
                        <input
                            id="login-username"
                            type="text"
                            name="username"
                            placeholder="Enter your username or email"
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
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-0.5rem', marginBottom: '1.5rem' }}>
                        <button 
                            type="button" 
                            onClick={() => setIsForgotMode(true)} 
                            style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="auth-info-text" style={{ textAlign: 'center', marginTop: '1.5rem', color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', lineHeight: '1.4' }}>
                        Please use your system credentials to log in.<br/>
                        For new accounts, contact the administrator.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
