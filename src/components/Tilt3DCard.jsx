import React, { useState, useRef } from 'react';

/**
 * Tilt3DCard - A lightweight, ultra-smooth 3D card wrapper.
 * Provides ~20% subtle depth, perspective rotation, and specular glare reflection on hover.
 */
const Tilt3DCard = ({
    children,
    className = '',
    style = {},
    maxTilt = 7, // Subtle ~20% intensity tilt
    perspective = 1000,
    glareOpacity = 0.15,
    scale = 1.02,
    ...props
}) => {
    const cardRef = useRef(null);
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate rotation angles (-maxTilt to +maxTilt)
        const rotateY = ((mouseX / width) - 0.5) * (maxTilt * 2);
        const rotateX = -((mouseY / height) - 0.5) * (maxTilt * 2);

        setTransform(`perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px) scale3d(${scale}, ${scale}, ${scale})`);
        setGlarePosition({
            x: (mouseX / width) * 100,
            y: (mouseY / height) * 100,
            opacity: glareOpacity
        });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTransform(`perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)`);
        setGlarePosition(prev => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            ref={cardRef}
            className={`tilt-3d-wrapper ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                position: 'relative',
                ...style
            }}
            {...props}
        >
            {children}
            {/* Specular 3D Glare Light Reflection */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    background: `radial-gradient(circle 250px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glarePosition.opacity}), transparent 80%)`,
                    transition: isHovered ? 'opacity 0.2s ease' : 'opacity 0.5s ease',
                    opacity: glarePosition.opacity > 0 ? 1 : 0,
                    zIndex: 10
                }}
            />
        </div>
    );
};

export default Tilt3DCard;
