import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Note: Backend currently only checks password, but we send username for future extensibility
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('admin_token', data.token);
                // Optional: Store username if needed
                localStorage.setItem('admin_user', username || 'Admin');
                navigate('/admin');
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Login failed. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-main)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background Elements */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                left: '-10%',
                width: '60vw',
                height: '60vw',
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                opacity: '0.15',
                filter: 'blur(100px)',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-20%',
                right: '-10%',
                width: '50vw',
                height: '50vw',
                background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                opacity: '0.1',
                filter: 'blur(100px)',
                zIndex: 0
            }} />

            {/* Main Content */}
            <div className="glass-card" style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '480px',
                padding: '3rem',
                margin: '1.5rem',
                background: 'rgba(20, 20, 30, 0.65)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                borderRadius: '24px'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 10px 25px -5px rgba(var(--primary-rgb), 0.5)'
                    }}>
                        <Lock size={32} color="white" />
                    </div>
                    <h1 className="text-gradient" style={{
                        fontSize: '2.25rem',
                        fontWeight: '700',
                        marginBottom: '0.75rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Welcome Back
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                        Sign in to access the admin dashboard
                    </p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    {/* Username Input */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)',
                            pointerEvents: 'none'
                        }}>
                            <User size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 1rem 1rem 3rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'var(--text-main)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                        />
                    </div>

                    {/* Password Input */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)',
                            pointerEvents: 'none'
                        }}>
                            <Lock size={20} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1rem 3rem 1rem 3rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'var(--text-main)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {error && (
                        <div style={{
                            padding: '0.75rem',
                            background: 'rgba(255, 68, 68, 0.1)',
                            border: '1px solid rgba(255, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#ff6b6b',
                            fontSize: '0.9rem',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginTop: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            opacity: isLoading ? 0.7 : 1
                        }}
                    >
                        {isLoading ? 'Signing In...' : (
                            <>
                                Sign In <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
