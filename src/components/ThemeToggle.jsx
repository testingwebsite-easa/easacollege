import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="btn-theme-toggle"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            <div className={`toggle-track ${theme === 'dark' ? 'dark' : 'light'}`}>
                <div className="toggle-thumb">
                    {theme === 'dark' ? <FaMoon size={12} /> : <FaSun size={12} color="#f59e0b" />}
                </div>
            </div>
        </button>
    );
};

export default ThemeToggle;
