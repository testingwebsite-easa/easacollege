import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import API_BASE_URL from '../api';
import '../styles/LoginPage.css';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [passwordData, setPasswordData] = useState({ password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleResetChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (passwordData.password !== passwordData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (passwordData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token,
                    newPassword: passwordData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to reset password');
            }

            setSuccess(data.message || 'Password has been reset successfully.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>EASA College</h1>
                    <p>Syllabus Management System</p>
                </div>

                <div className="auth-form">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#333', marginBottom: '0.5rem', textAlign: 'center' }}>Reset Password</h2>
                    
                    {!token ? (
                        <div className="alert alert-error">
                            Invalid or missing reset token. Please request a new password reset link.
                        </div>
                    ) : (
                        <>
                            {error && <div className="alert alert-error">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}

                            {!success && (
                                <form onSubmit={handleResetSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="reset-password">New Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                id="reset-password"
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="Enter new password"
                                                value={passwordData.password}
                                                onChange={handleResetChange}
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

                                    <div className="form-group">
                                        <label htmlFor="reset-confirm-password">Confirm Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                id="reset-confirm-password"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                placeholder="Confirm new password"
                                                value={passwordData.confirmPassword}
                                                onChange={handleResetChange}
                                                required
                                                style={{ paddingRight: '40px' }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <button type="submit" className="auth-btn" disabled={loading}>
                                        {loading ? 'Resetting Password...' : 'Reset Password'}
                                    </button>
                                </form>
                            )}
                        </>
                    )}

                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <button 
                            type="button" 
                            onClick={() => navigate('/login')} 
                            style={{ background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
