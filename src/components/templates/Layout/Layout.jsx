// src/components/templates/Layout/Layout.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User, Briefcase, Code2, BookOpen, Mail } from 'lucide-react';
import { Navigation, Footer } from '../../organisms';

const Layout = ({ children }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorRef = useRef(null);
    const rafId = useRef(null);
    const lastUpdate = useRef(0);
    const hoverTimeout = useRef(null);

    const MAX_FPS = 60;
    const FRAME_TIME = 1000 / MAX_FPS;

    const checkMobile = useCallback(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        return mobile;
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (isMobile) return;
        const now = performance.now();
        if (now - lastUpdate.current < FRAME_TIME) return;
        lastUpdate.current = now;
        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() => {
            if (cursorRef.current) {
                const offset = isHovering ? 24 : 16;
                cursorRef.current.style.transform = `translate3d(${e.clientX - offset}px, ${e.clientY - offset}px, 0)`;
            }
        });
    }, [isMobile, FRAME_TIME, isHovering]);

    const handleMouseOver = useCallback((e) => {
        if (isMobile) return;
        const isHoverTarget = !!(
            e.target.tagName === 'A' ||
            e.target.tagName === 'BUTTON' ||
            e.target.closest('a') ||
            e.target.closest('button') ||
            e.target.closest('[role="button"]')
        );
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => {
            if (isHoverTarget !== isHovering) setIsHovering(isHoverTarget);
        }, 6);
    }, [isMobile, isHovering]);

    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 50);
    }, []);

    useEffect(() => {
        checkMobile();
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
            if (rafId.current) cancelAnimationFrame(rafId.current);
            if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        };
    }, [handleScroll, handleMouseMove, checkMobile, handleMouseOver]);

    const navItems = [
        { label: 'About', href: '/#about', icon: User },
        { label: 'Experience', href: '/#experience', icon: Briefcase },
        { label: 'Projects', href: '/#projects', icon: Code2 },
        { label: 'Blog', href: '/#blog', icon: BookOpen },
        { label: 'Contact', href: '/#contact', icon: Mail },
    ];

    // For detail pages, nav links are anchor hrefs — no smooth scroll needed
    const handleNavClick = (e, href) => {
        // Let the browser navigate normally to /#section
    };

    return (
        <div
            className="min-h-screen bg-white text-black overflow-x-hidden"
            style={{ cursor: !isMobile ? 'none' : 'auto' }}
        >
            {!isMobile && (
                <div
                    ref={cursorRef}
                    className={`fixed bg-white mix-blend-difference rounded-full pointer-events-none z-50 transition-all duration-200 ease-out ${
                        isHovering ? 'w-12 h-12' : 'w-8 h-8'
                    }`}
                    style={{
                        transform: 'translate3d(-16px, -16px, 0)',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                    }}
                />
            )}
            <Navigation
                scrolled={scrolled}
                navItems={navItems}
                scrollToSection={handleNavClick}
            />
            <main className="pt-20 md:pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;