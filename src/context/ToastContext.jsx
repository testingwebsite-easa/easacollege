import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaCheckCircle, 
    FaExclamationTriangle, 
    FaTimesCircle, 
    FaInfoCircle, 
    FaTimes 
} from 'react-icons/fa';
import { useTheme } from './ThemeContext';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const { theme } = useTheme();
    const isDark = theme !== 'light';
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'info', title = '', duration = 4500) => {
        const id = Date.now() + Math.random().toString(36).substring(2, 9);
        
        let defaultTitle = '';
        if (!title) {
            switch (type) {
                case 'success':
                    defaultTitle = 'Success';
                    break;
                case 'error':
                    defaultTitle = 'Action Failed';
                    break;
                case 'warning':
                    defaultTitle = 'Missing Information';
                    break;
                default:
                    defaultTitle = 'Notice';
                    break;
            }
        } else {
            defaultTitle = title;
        }

        const newToast = {
            id,
            message: typeof message === 'string' ? message : JSON.stringify(message),
            type,
            title: defaultTitle,
            duration
        };

        setToasts((prev) => [...prev, newToast]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    // Set up global window helpers and intercept native browser alert
    useEffect(() => {
        window.toast = {
            success: (msg, title) => showToast(msg, 'success', title),
            error: (msg, title) => showToast(msg, 'error', title),
            warning: (msg, title) => showToast(msg, 'warning', title),
            info: (msg, title) => showToast(msg, 'info', title),
            show: showToast
        };

        const originalAlert = window.alert;
        window.alert = (msg) => {
            const strMsg = typeof msg === 'string' ? msg : String(msg);
            let type = 'info';
            let title = 'Notice';
            const lower = strMsg.toLowerCase();
            if (lower.includes('success') || lower.includes('congratulat') || lower.includes('thank you') || strMsg.includes('🎉') || strMsg.includes('✨') || strMsg.includes('🌿')) {
                type = 'success';
                title = 'Success';
            } else if (lower.includes('fail') || lower.includes('error') || lower.includes('invalid') || lower.includes('could not') || lower.includes('wrong')) {
                type = 'error';
                title = 'Alert';
            } else if (lower.includes('please enter') || lower.includes('required') || lower.includes('missing') || lower.includes('valid 10') || lower.includes('select')) {
                type = 'warning';
                title = 'Form Incomplete';
            }
            showToast(strMsg, type, title);
        };

        return () => {
            window.alert = originalAlert;
        };
    }, [showToast]);

    const getToastStyle = (type) => {
        switch (type) {
            case 'success':
                return {
                    border: isDark ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(16, 185, 129, 0.5)',
                    background: isDark 
                        ? 'linear-gradient(135deg, rgba(6, 78, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                        : 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)',
                    iconColor: '#10B981',
                    glow: '0 10px 30px rgba(16, 185, 129, 0.2)',
                    progressColor: '#10B981'
                };
            case 'error':
                return {
                    border: isDark ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                    background: isDark 
                        ? 'linear-gradient(135deg, rgba(127, 29, 29, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                        : 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
                    iconColor: '#EF4444',
                    glow: '0 10px 30px rgba(239, 68, 68, 0.2)',
                    progressColor: '#EF4444'
                };
            case 'warning':
                return {
                    border: isDark ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(217, 119, 6, 0.4)',
                    background: isDark 
                        ? 'linear-gradient(135deg, rgba(120, 53, 15, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                        : 'linear-gradient(135deg, #fffbeb 0%, #ffffff 100%)',
                    iconColor: isDark ? '#F59E0B' : '#D97706',
                    glow: '0 10px 30px rgba(245, 158, 11, 0.25)',
                    progressColor: '#F59E0B'
                };
            default:
                return {
                    border: isDark ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(37, 99, 235, 0.35)',
                    background: isDark 
                        ? 'linear-gradient(135deg, rgba(12, 74, 110, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                        : 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
                    iconColor: isDark ? '#38BDF8' : '#2563EB',
                    glow: '0 10px 30px rgba(56, 189, 248, 0.2)',
                    progressColor: '#38BDF8'
                };
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <FaCheckCircle size={22} />;
            case 'error':
                return <FaTimesCircle size={22} />;
            case 'warning':
                return <FaExclamationTriangle size={22} />;
            default:
                return <FaInfoCircle size={22} />;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 999999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    maxWidth: '440px',
                    width: 'calc(100vw - 40px)',
                    pointerEvents: 'none'
                }}
            >
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const style = getToastStyle(toast.type);
                        return (
                            <motion.div
                                key={toast.id}
                                layout
                                initial={{ opacity: 0, y: -25, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                                style={{
                                    pointerEvents: 'auto',
                                    borderRadius: '16px',
                                    border: style.border,
                                    background: style.background,
                                    boxShadow: `${style.glow}, 0 20px 40px rgba(0, 0, 0, ${isDark ? '0.5' : '0.12'})`,
                                    backdropFilter: 'blur(20px)',
                                    color: isDark ? '#f8fafc' : '#0f172a',
                                    padding: '1rem 1.25rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'flex-start'
                                }}
                            >
                                {/* Progress Bar Animation */}
                                {toast.duration > 0 && (
                                    <motion.div
                                        initial={{ width: '100%' }}
                                        animate={{ width: '0%' }}
                                        transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            height: '3px',
                                            background: style.progressColor,
                                            opacity: 0.8
                                        }}
                                    />
                                )}

                                {/* Icon */}
                                <div
                                    style={{
                                        color: style.iconColor,
                                        marginTop: '2px',
                                        flexShrink: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        filter: `drop-shadow(0 2px 6px ${style.iconColor}55)`
                                    }}
                                >
                                    {getIcon(toast.type)}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div
                                        style={{
                                            fontWeight: '800',
                                            fontSize: '0.95rem',
                                            marginBottom: '3px',
                                            color: isDark ? '#ffffff' : '#0f172a',
                                            letterSpacing: '0.3px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <span>{toast.title}</span>
                                    </div>
                                    <div
                                        style={{
                                            fontSize: '0.88rem',
                                            color: isDark ? 'rgba(255, 255, 255, 0.82)' : '#334155',
                                            lineHeight: '1.45',
                                            wordBreak: 'break-word',
                                            fontWeight: '500'
                                        }}
                                    >
                                        {toast.message}
                                    </div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    aria-label="Close notification"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#94a3b8',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: '0.2s',
                                        marginTop: '-2px',
                                        marginRight: '-4px'
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = isDark ? '#ffffff' : '#0f172a')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = isDark ? 'rgba(255, 255, 255, 0.5)' : '#94a3b8')}
                                >
                                    <FaTimes size={14} />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        // Fallback if accessed outside provider
        return {
            showToast: (msg, type, title) => {
                if (window.toast && window.toast[type]) {
                    window.toast[type](msg, title);
                } else {
                    console.log(`[${type?.toUpperCase() || 'TOAST'}] ${title ? title + ': ' : ''}${msg}`);
                }
            }
        };
    }
    return context;
};
export default ToastContext;
