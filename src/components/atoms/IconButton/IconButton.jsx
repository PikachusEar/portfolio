// src/components/atoms/IconButton/IconButton.jsx
import React from 'react';

/**
 * IconButton Component
 *
 * @param {Object} props
 * @param {React.Component} props.icon - The icon component to render (destructured as Icon)
 * @param {string} props.href - The URL to link to
 * @param {string} props.className - Additional CSS classes
 * @param {...Object} props.props - Any additional props to pass to the anchor element
 *
 * Explanation of the destructuring:
 * { icon: Icon } - This destructures the 'icon' prop and renames it to 'Icon'
 * This is useful because:
 * 1. React components must start with uppercase letters
 * 2. We can use <Icon /> instead of <icon />
 * 3. Makes it clear this is a component, not a string
 */
const IconButton = ({
                        icon: Icon,     // Destructure 'icon' prop and rename to 'Icon'
                        href,
                        className = "",
                        ...props       // Spread operator to capture all other props
                    }) => (
    <a
        href={href}
        className={`p-3 border border-black hover:bg-black hover:text-white transition-all ${className}`}
        {...props}   // Spread operator to pass all other props to the element
    >
        <Icon size={24} />
    </a>
);

export default IconButton;