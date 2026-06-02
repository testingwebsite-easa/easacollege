import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [activeTab, setActiveTab] = useState('login');
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        name: '',
        phone: '',
        department: '',
        employeeId: '',
        studentId: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

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

    // Handle Register
    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (registerData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...dataToSend } = registerData;
            const data = await register(dataToSend);

            // register() sets token and user in context for auto-approved roles
            if (data && data.user && data.user.isApproved) {
                // If approved immediately (e.g., admin), navigate to dashboard
                navigate('/dashboard');
                return;
            }

            // Otherwise show success message and switch to login
            setSuccessMessage('Registration successful! Please wait for admin approval. You will receive an email notification.');

            setRegisterData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: 'student',
                name: '',
                phone: '',
                department: '',
                employeeId: '',
                studentId: ''
            });

            setTimeout(() => {
                setActiveTab('login');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Registration failed. Please check if backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        setError('');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>EASA College</h1>
                    <p>Syllabus Management System</p>
                </div>

                <div className="auth-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('login'); setError(''); }}
                    >
                        Login
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('register'); setError(''); }}
                    >
                        Register
                    </button>
                </div>

                {error && <div className="alert alert-error">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                {/* LOGIN FORM */}
                {activeTab === 'login' && (
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

                        <p className="auth-info-text">
                            <strong>Admin Password:</strong> Use your admin credentials<br/>
                            <strong>HOD/Staff/Student:</strong> Wait for admin approval after registration
                        </p>
                    </form>
                )}

                {/* REGISTER FORM */}
                {activeTab === 'register' && (
                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reg-name">Full Name *</label>
                                <input
                                    id="reg-name"
                                    type="text"
                                    name="name"
                                    placeholder="Your full name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-email">Email *</label>
                                <input
                                    id="reg-email"
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reg-username">Username *</label>
                                <input
                                    id="reg-username"
                                    type="text"
                                    name="username"
                                    placeholder="Choose a username"
                                    value={registerData.username}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-role">Role *</label>
                                <select
                                    id="reg-role"
                                    name="role"
                                    value={registerData.role}
                                    onChange={handleRegisterChange}
                                    required
                                >
                                    <option value="student">Student</option>
                                    <option value="staff">Staff</option>
                                    <option value="hod">HOD (Head of Department)</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reg-department">Department</label>
                                <input
                                    id="reg-department"
                                    type="text"
                                    name="department"
                                    placeholder="e.g., Computer Science"
                                    value={registerData.department}
                                    onChange={handleRegisterChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-phone">Phone</label>
                                <input
                                    id="reg-phone"
                                    type="tel"
                                    name="phone"
                                    placeholder="Your phone number"
                                    value={registerData.phone}
                                    onChange={handleRegisterChange}
                                />
                            </div>
                        </div>

                        {registerData.role === 'staff' && (
                            <div className="form-group">
                                <label htmlFor="reg-employeeId">Employee ID *</label>
                                <input
                                    id="reg-employeeId"
                                    type="text"
                                    name="employeeId"
                                    placeholder="Your employee ID"
                                    value={registerData.employeeId}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        )}

                        {registerData.role === 'student' && (
                            <div className="form-group">
                                <label htmlFor="reg-studentId">Student ID *</label>
                                <input
                                    id="reg-studentId"
                                    type="text"
                                    name="studentId"
                                    placeholder="Your student ID"
                                    value={registerData.studentId}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="reg-password">Password *</label>
                                <input
                                    id="reg-password"
                                    type="password"
                                    name="password"
                                    placeholder="At least 6 characters"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="reg-confirmPassword">Confirm Password *</label>
                                <input
                                    id="reg-confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="auth-btn" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>

                        <p className="auth-info-text">
                            After registration, your account will need approval from an admin.
                            You will receive an email notification once approved.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
