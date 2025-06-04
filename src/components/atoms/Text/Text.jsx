// src/components/atoms/Text/Text.jsx
import React from 'react';

const Text = ({ children, variant = 'body', className = "", ...props }) => {
    const variants = {
        body: "text-xl leading-relaxed",
        caption: "text-gray-600",
        small: "text-sm uppercase tracking-wider"
    };

    return (
        <p className={`${variants[variant]} ${className}`} {...props}>
            {children}
        </p>
    );
};

export default Text;