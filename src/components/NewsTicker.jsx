import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../api';

const NewsTicker = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/ticker-alerts`);
                if (response.ok) {
                    const data = await response.json();
                    setAlerts(data);
                }
            } catch (error) {
                console.error("Failed to fetch ticker alerts:", error);
            }
        };
        fetchAlerts();
    }, []);

    if (alerts.length === 0) return null;

    const renderItem = (item, key) => (
        <a
            key={key}
            href={item.link || '#'}
            className="ticker-item"
            target={item.link && item.link.startsWith('http') ? "_blank" : "_self"}
            rel="noopener noreferrer"
        >
            {item.message} <span className="ticker-separator">|</span>
        </a>
    );

    return (
        <div className="ticker-wrapper">
            <div className="ticker-label">
                IMPORTANT ALERTS
            </div>
            <div className="ticker-container">
                <div className="ticker-track">
                    {alerts.map((item, index) => renderItem(item, index))}
                    {/* Duplicate for continuous feel */}
                    {alerts.map((item, index) => renderItem(item, `dup-${index}`))}
                </div>
            </div>
            <style>{`
                .ticker-wrapper {
                    background: #dc2626; /* Red-600 */
                    color: white;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    position: relative;
                    z-index: 1001; /* Above navbar if needed */
                }
                .ticker-label {
                    background: #991b1b; /* Red-800 */
                    padding: 0 1.5rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                    box-shadow: 4px 0 8px rgba(0,0,0,0.2);
                    white-space: nowrap;
                }
                .ticker-container {
                    flex-grow: 1;
                    overflow: hidden;
                    position: relative;
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
                .ticker-track {
                    display: flex;
                    white-space: nowrap;
                    animation: marquee 40s linear infinite;
                    padding-left: 20px;
                }
                .ticker-item {
                    margin-right: 0.5rem;
                    text-decoration: none;
                    color: inherit;
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                }
                .ticker-item:hover {
                    text-decoration: underline;
                }
                .ticker-separator {
                    margin: 0 1rem;
                    opacity: 0.5;
                }
                .ticker-track:hover {
                    animation-play-state: paused;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
                /* Mobile adjustments */
                @media (max-width: 768px) {
                    .ticker-label {
                        padding: 0 0.5rem;
                        font-size: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default NewsTicker;
