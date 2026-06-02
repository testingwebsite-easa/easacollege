import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API_BASE_URL from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load token from localStorage on mount
    useEffect(() => {
        const savedToken = localStorage.getItem('authToken');
        if (savedToken) {
            setToken(savedToken);
            // Verify token with backend
            verifyTokenWithBackend(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyTokenWithBackend = useCallback(async (tokenToVerify) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${tokenToVerify}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                localStorage.removeItem('authToken');
                setToken(null);
            }
        } catch (err) {
            console.error('Token verification failed:', err);
            localStorage.removeItem('authToken');
            setToken(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Registration failed');
            }

            const data = await response.json();
            const newToken = data.token;
            
            setToken(newToken);
            setUser(data.user);
            localStorage.setItem('authToken', newToken);
            
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
            const newToken = data.token;
            
            setToken(newToken);
            setUser(data.user);
            localStorage.setItem('authToken', newToken);
            
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            if (token) {
                await fetch(`${API_BASE_URL}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem('authToken');
        }
    }, [token]);

    const isAuthenticated = !!token && !!user;
    const userRole = user?.role;

    const value = {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        userRole,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
