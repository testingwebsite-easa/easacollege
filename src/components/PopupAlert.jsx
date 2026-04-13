import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../api';

const PopupAlert = () => {
    const [popupData, setPopupData] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchPopup = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/popup-alert`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.image && data.isVisible) {
                        // Check if already shown this session? 
                        // User said "load the first of the refesh", implying every refresh.
                        // I will show it every time for now as requested.
                        setPopupData(data);
                        setIsVisible(true);
                    }
                }
            } catch (err) {
                console.error("Failed to load popup", err);
            }
        };

        fetchPopup();
    }, []);

    if (!isVisible || !popupData) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(5px)'
        }}
            onClick={() => setIsVisible(false)}
        >
            <div style={{
                position: 'relative',
                maxWidth: '90%',
                maxHeight: '90vh',
                background: 'transparent',
                borderRadius: '12px',
                overflow: 'visible' // Allow close button to stick out if needed
            }}
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking content
            >
                <button
                    onClick={() => setIsVisible(false)}
                    style={{
                        position: 'absolute',
                        top: '-15px',
                        right: '-15px',
                        background: '#ff4444',
                        color: 'white',
                        border: '2px solid white',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}
                >
                    &times;
                </button>

                {popupData.link ? (
                    <a href={popupData.link} target="_blank" rel="noopener noreferrer">
                        <img
                            src={popupData.image}
                            alt="Announcement"
                            style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '80vh', // Ensure it fits vertically
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                            }}
                        />
                    </a>
                ) : (
                    <img
                        src={popupData.image}
                        alt="Announcement"
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PopupAlert;
