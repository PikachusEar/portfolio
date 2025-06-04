// src/components/atoms/Heading/Heading.jsx
import React from 'react';

const Heading = ({ level = 1, children, className = "", ...props }) => {
    const sizes = {
        1: "text-6xl md:text-8xl",
        2: "text-5xl md:text-7xl",
        3: "text-2xl",
        4: "text-xl"
    };

    const Tag = `h${level}`;
    return React.createElement(
        Tag,
        { className: `font-bold ${sizes[level]} ${className}`, ...props },
        children
    );
};

export default Heading;