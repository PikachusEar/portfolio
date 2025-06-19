// src/components/atoms/Heading/Heading.jsx
import React from 'react';

const Heading = ({ level = 1, children, className = "", ...props }) => {
    const sizes = {
        1: "text-4xl sm:text-5xl md:text-6xl lg:text-8xl",
        2: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
        3: "text-xl sm:text-2xl",
        4: "text-lg sm:text-xl"
    };

    const Tag = `h${level}`;
    return React.createElement(
        Tag,
        { className: `font-bold leading-tight ${sizes[level]} ${className}`, ...props },
        children
    );
};

export default Heading;