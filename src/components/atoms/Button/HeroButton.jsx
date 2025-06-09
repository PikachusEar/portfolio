// src/components/atoms/HeroButton/HeroButton.jsx
import React, { useState, useRef, useEffect } from 'react';

const HeroButton = ({
                    children,
                    variant = 'primary',
                    onClick,
                    href,
                    className = '',
                    showBubbles = false,
                    projectTitles = [
                        "E-Commerce Platform",
                        "Task Management App",
                        "Weather Dashboard",
                        "Social Media Analytics",
                        "Portfolio Website"
                    ], // Default temporary data
                    onProjectSelect = () => {}, // Callback for project selection
                    ...props
                }) => {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setIsHovered(false), 150);
    };

    const handleMenuMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsHovered(true);
    };

    const handleMenuMouseLeave = () => {
        setIsHovered(false);
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const baseClasses = "px-8 py-4 font-bold transition-all flex items-center space-x-2 relative overflow-visible";
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "border-2 border-black hover:bg-black hover:text-white"
    };

    const classes = `${baseClasses} ${variants[variant]} ${className}`;

    const renderBubbles = () => {
        if (!showBubbles) return null;

        return (
            <div
                data-bubble-menu="true"
                className={`absolute top-0 left-full ml-4 pointer-events-auto transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
                }`}
                onMouseEnter={handleMenuMouseEnter}
                onMouseLeave={handleMenuMouseLeave}
            >
                <div className="flex flex-col space-y-2">
                    {projectTitles.map((title, index) => (
                        <div
                            key={title}
                            className={`bg-white text-black px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border transition-all duration-300 cursor-pointer hover:bg-gray-100 hover:scale-105 ${
                                isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                            }`}
                            style={{
                                transitionDelay: `${index * 50}ms`,
                                zIndex: 50
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onProjectSelect(title, index);
                                setIsHovered(false); // Close menu after selection
                            }}
                        >
                            {title}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (href) {
        return (
            <a
                href={href}
                onClick={onClick}
                className={classes}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...props}
            >
                {children}
                {renderBubbles()}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            className={classes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
            {renderBubbles()}
        </button>
    );
};

export default HeroButton;