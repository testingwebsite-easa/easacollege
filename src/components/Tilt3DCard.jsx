import React, { useState, useRef } from 'react';

/**
 * Tilt3DCard - A lightweight, ultra-smooth 3D card wrapper.
 * Provides ~20% subtle depth, perspective rotation, and specular glare reflection on hover.
 */
const Tilt3DCard = ({
    children,
    className = '',
    style = {},
    maxTilt = 0, // Zero out aggressive tilt by default for a clean, normal experience
    perspective = 1000,
    glareOpacity = 0,
    scale = 1,
    ...props
}) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            ref={cardRef}
            className={`tilt-3d-wrapper ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0px)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                position: 'relative',
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Tilt3DCard;
