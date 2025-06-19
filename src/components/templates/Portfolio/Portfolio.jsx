// src/components/templates/Portfolio/Portfolio.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // 🚀 PERFORMANCE OPTIMIZATION REFS (NO VISUAL CHANGES)
    const cursorRef = useRef(null);
    const rafId = useRef(null);
    const lastUpdate = useRef(0);
    const hoverTimeout = useRef(null);

    // 🎮 HIGH REFRESH RATE THROTTLING (VISUAL REMAINS SMOOTH)
    const MAX_FPS = 60;
    const FRAME_TIME = 1000 / MAX_FPS;

    // 📱 MOBILE DETECTION (NO VISUAL CHANGES ON DESKTOP)
    const checkMobile = useCallback(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        return mobile;
    }, []);

    // 🔥 ULTRA-OPTIMIZED MOUSE HANDLER (PRESERVES EXACT VISUAL BEHAVIOR)
    const handleMouseMove = useCallback((e) => {
        // Early exit for mobile (cursor hidden anyway)
        if (isMobile) return;

        const now = performance.now();

        // 🎮 THROTTLE FOR HIGH REFRESH RATES (MAINTAINS SMOOTH APPEARANCE)
        if (now - lastUpdate.current < FRAME_TIME) {
            return;
        }

        lastUpdate.current = now;

        // Cancel pending frame to prevent queue buildup
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
        }

        // 🚀 OPTIMIZED RAF UPDATE (IDENTICAL VISUAL RESULT)
        rafId.current = requestAnimationFrame(() => {
            if (cursorRef.current) {
                const x = e.clientX;
                const y = e.clientY;
                const offset = isHovering ? 24 : 16;

                // 🎯 PERFORMANCE OPTIMIZATION WITH IDENTICAL VISUAL OUTPUT
                // Using transform3d for GPU acceleration while preserving mix-blend-mode
                cursorRef.current.style.transform = `translate3d(${x - offset}px, ${y - offset}px, 0)`;
            }
        });
    }, [isMobile, FRAME_TIME, isHovering]);

    // 🎯 OPTIMIZED HOVER DETECTION (PRESERVES EXACT HOVER BEHAVIOR)
    const handleMouseOver = useCallback((e) => {
        if (isMobile) return;

        const isHoverTarget = !!(
            e.target.tagName === 'A' ||
            e.target.tagName === 'BUTTON' ||
            e.target.closest('a') ||
            e.target.closest('button') ||
            e.target.closest('[role="button"]')
        );
        
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }

        hoverTimeout.current = setTimeout(() => {
            if (isHoverTarget !== isHovering) {
                setIsHovering(isHoverTarget);
            }
        }, 6); // Minimal delay, invisible to users but prevents excessive updates

    }, [isMobile, isHovering]);
    
    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 50);
    }, []);
    
    useEffect(() => {
        checkMobile();

        // 🎧 PASSIVE EVENT LISTENERS (PERFORMANCE BOOST, NO VISUAL CHANGES)
        const options = { passive: true };

        window.addEventListener('scroll', handleScroll, options);
        window.addEventListener('mousemove', handleMouseMove, options);
        window.addEventListener('resize', checkMobile, options);
        window.addEventListener('mouseover', handleMouseOver, options);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mouseover', handleMouseOver);

            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            if (hoverTimeout.current) {
                clearTimeout(hoverTimeout.current);
            }
        };
    }, [handleScroll, handleMouseMove, checkMobile, handleMouseOver]);

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
            {!isMobile && (
                <div
                    ref={cursorRef}
                    className={`fixed bg-white mix-blend-difference rounded-full pointer-events-none z-50 transition-all duration-200 ease-out ${
                        isHovering ? 'w-12 h-12' : 'w-8 h-8'
                    }`}
                    style={{
                        transform: 'translate3d(-16px, -16px, 0)', // GPU acceleration + initial position
                        willChange: 'transform', // Optimize for frequent transforms
                        backfaceVisibility: 'hidden', // Prevent flickering
                    }}
                />
            )}

            {/* 🏗️ ORIGINAL COMPONENT STRUCTURE UNCHANGED */}
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