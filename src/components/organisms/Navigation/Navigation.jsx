// src/components/organisms/Navigation/Navigation.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '../../atoms';
import { NavItem } from '../../molecules';

const MobileNavItem = ({ item, onClick }) => (
    <a
        href={item.href}
        onClick={(e) => onClick(e, item.href)}
        className="flex items-center space-x-3 px-6 py-4 text-sm uppercase tracking-wider hover:bg-gray-100"
    >
        <item.icon size={20} />
        <span>{item.label}</span>
    </a>
);

const Navigation = ({ scrolled, navItems, scrollToSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className={`fixed w-full z-40 transition-all duration-500 ${
            scrolled ? 'bg-white border-b border-gray-200 py-4' : 'bg-transparent py-6'
        }`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Logo />

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <NavItem key={item.label} item={item} onClick={scrollToSection} />
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg">
                    {navItems.map((item) => (
                        <MobileNavItem
                            key={item.label}
                            item={item}
                            onClick={(e, href) => {
                                scrollToSection(e, href);
                                setIsMenuOpen(false);
                            }}
                        />
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navigation;