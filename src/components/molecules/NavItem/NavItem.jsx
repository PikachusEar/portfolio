// src/components/molecules/NavItem/NavItem.jsx
import React from 'react';

const NavItem = ({ item, onClick, className = "" }) => (
    <a
        href={item.href}
        onClick={(e) => onClick(e, item.href)}
        className={`group flex items-center space-x-2 text-sm uppercase tracking-wider hover:text-gray-600 transition-colors ${className}`}
    >
        <item.icon size={16} className="group-hover:rotate-12 transition-transform" />
        <span>{item.label}</span>
    </a>
);

export default NavItem;