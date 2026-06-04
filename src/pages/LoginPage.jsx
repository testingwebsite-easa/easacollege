import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(loginData.username, loginData.password);
            // Navigate based on role
            setTimeout(() => {
                navigate('/dashboard');
            }, 500);
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

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>EASA College</h1>
                    <p>Syllabus Management System</p>
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
                        <input
                            id="login-password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
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
