// src/components/atoms/Button/Button.jsx
import React from 'react';

const Button = ({
                    children,
                    variant = 'primary',
                    onClick,
                    href,
                    className = '',
                    ...props
                }) => {
    const baseClasses = "px-8 py-4 font-bold transition-all flex items-center space-x-2";
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "border-2 border-black hover:bg-black hover:text-white"
    };

    const classes = `${baseClasses} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} onClick={onClick} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;