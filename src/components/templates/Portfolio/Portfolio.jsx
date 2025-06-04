// src/components/templates/Portfolio/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { User, Briefcase, Code2, BookOpen, Mail } from 'lucide-react';

// Import organisms
import {
    Navigation,
    HeroSection,
    AboutSection,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    BlogSection,
    ContactSection,
    Footer
} from '../../organisms';

const Portfolio = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        const handleMouseOver = (e) => {
            setIsHovering(!!(e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')));
        };

        checkMobile();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', checkMobile);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    const navItems = [
        { label: 'About', href: '#about', icon: User },
        { label: 'Experience', href: '#experience', icon: Briefcase },
        { label: 'Projects', href: '#projects', icon: Code2 },
        { label: 'Blog', href: '#blog', icon: BookOpen },
        { label: 'Contact', href: '#contact', icon: Mail }
    ];

    const scrollToSection = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white text-black overflow-x-hidden" style={{ cursor: !isMobile ? 'none' : 'auto' }}>
            {/* Custom Cursor */}
            {!isMobile && (
                <div
                    className={`fixed bg-white mix-blend-difference rounded-full pointer-events-none z-50 transition-all duration-200 ease-out ${
                        isHovering ? 'w-12 h-12' : 'w-8 h-8'
                    }`}
                    style={{
                        transform: `translate(${mousePos.x - (isHovering ? 24 : 16)}px, ${mousePos.y - (isHovering ? 24 : 16)}px)`
                    }}
                />
            )}

            <Navigation scrolled={scrolled} navItems={navItems} scrollToSection={scrollToSection} />
            <HeroSection scrollToSection={scrollToSection} />
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <BlogSection />
            <ContactSection />
            <Footer />
        </div>
    );
};

export default Portfolio;