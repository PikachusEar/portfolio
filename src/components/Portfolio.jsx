import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Briefcase, User, BookOpen, Mail, ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';

const PortfolioBold = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Add hover detection
        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
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

    // Style for hiding cursor on interactive elements
    const cursorStyle = !isMobile ? { cursor: 'none' } : {};

    const navItems = [
        { label: 'About', href: '#about', icon: User },
        { label: 'Experience', href: '#experience', icon: Briefcase },
        { label: 'Projects', href: '#projects', icon: Code2 },
        { label: 'Blog', href: '#blog', icon: BookOpen },
        { label: 'Contact', href: '#contact', icon: Mail }
    ];

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    return (

        <div className="min-h-screen bg-white text-black overflow-x-hidden scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-200"
             style={{ cursor: !isMobile ? 'none' : 'auto' }}>
            {/* Cursor Follower - Only on Desktop */}
            {!isMobile && (
                <>
                    <div
                        className={`fixed bg-white mix-blend-difference rounded-full pointer-events-none z-50 transition-all duration-200 ease-out ${
                            isHovering ? 'w-12 h-12' : 'w-8 h-8'
                        }`}
                        style={{
                            transform: `translate(${mousePos.x - (isHovering ? 24 : 16)}px, ${mousePos.y - (isHovering ? 24 : 16)}px)`
                        }}
                    />
                    {/*<div
                        className={`fixed border-2 border-black rounded-full pointer-events-none z-50 transition-all duration-400 ease-out opacity-30 ${
                            isHovering ? 'w-16 h-16' : 'w-10 h-10'
                        }`}
                        style={{
                            transform: `translate(${mousePos.x - (isHovering ? 40 : 24)}px, ${mousePos.y - (isHovering ? 40 : 24)}px)`
                        }}
                    />*/}
                </>
            )}

            {/* Navigation */}
            <nav className={`fixed w-full z-40 transition-all duration-500 ${
                scrolled ? 'bg-white border-b border-gray-200 py-4' : 'bg-transparent py-6'
            }`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a href="#home" className="text-3xl font-bold">
                        <span className="bg-black text-white px-2 py-1">JD</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="group flex items-center space-x-2 text-sm uppercase tracking-wider hover:text-gray-600 transition-colors"
                            >
                                <item.icon size={16} className="group-hover:rotate-12 transition-transform" />
                                <span>{item.label}</span>
                            </a>
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
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="flex items-center space-x-3 px-6 py-4 text-sm uppercase tracking-wider hover:bg-gray-100"
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center relative bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <h1 className="text-6xl md:text-8xl font-bold mb-6">
                            <span className="block">I'M JEREMY</span>
                            <span className="block text-gray-400">A FULL-STACK</span>
                            <span className="block">DEVELOPER</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-xl">
                            Building exceptional digital experiences with modern technologies and creative solutions.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                onClick={(e) => scrollToSection(e, '#projects')}
                                className="group px-8 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-all flex items-center space-x-2"
                            >
                                <span>VIEW PROJECTS</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => scrollToSection(e, '#contact')}
                                className="px-8 py-4 border-2 border-black hover:bg-black hover:text-white transition-all font-bold"
                            >
                                HIRE ME
                            </a>
                        </div>
                    </div>
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 relative">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-16">
                        <span className="text-gray-400">01.</span> ABOUT ME
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl">
                        <div className="relative">
                            <div className="aspect-square bg-gray-100"></div>
                            <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-black -z-10"></div>
                        </div>
                        <div>
                            <p className="text-xl leading-relaxed mb-6">
                                I'm a creative developer who loves to build things that live on the internet.
                                My passion lies in creating pixel-perfect, performant experiences.
                            </p>
                            <p className="text-xl leading-relaxed text-gray-600">
                                With expertise in both front-end and back-end technologies, I bring ideas to life
                                from concept to deployment.
                            </p>
                            <div className="flex space-x-4 mt-8">
                                <a href="#" className="p-3 border border-black hover:bg-black hover:text-white transition-all">
                                    <Github size={24} />
                                </a>
                                <a href="#" className="p-3 border border-black hover:bg-black hover:text-white transition-all">
                                    <Linkedin size={24} />
                                </a>
                                <a href="#" className="p-3 border border-black hover:bg-black hover:text-white transition-all">
                                    <Twitter size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-16">
                        <span className="text-gray-400">02.</span> EXPERIENCE
                    </h2>
                    <div className="max-w-4xl space-y-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <h3 className="text-2xl font-bold">SENIOR FULL-STACK DEVELOPER</h3>
                                    <span className="text-gray-500">2022 - PRESENT</span>
                                </div>
                                <p className="text-gray-600 text-lg mb-4">Tech Company Inc.</p>
                                <p className="text-gray-700 group-hover:text-black transition-colors">
                                    Led development of enterprise applications, implemented CI/CD pipelines,
                                    and mentored junior developers.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-16">
                        <span className="text-gray-400">03.</span> PROJECTS
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative overflow-hidden cursor-pointer">
                                <div className="aspect-video bg-gray-100 relative">
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white to-transparent">
                                        <h3 className="text-xl font-bold mb-2">PROJECT {i}</h3>
                                        <p className="text-gray-700">View Details →</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-16">
                        <span className="text-gray-400">04.</span> SKILLS
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
                        {['Frontend', 'Backend', 'Database', 'DevOps'].map((category, i) => (
                            <div key={category} className="border border-gray-200 p-6 hover:border-black transition-colors">
                                <h3 className="text-xl font-bold mb-4">{category.toUpperCase()}</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>Technology {i * 3 + 1}</li>
                                    <li>Technology {i * 3 + 2}</li>
                                    <li>Technology {i * 3 + 3}</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-16">
                        <span className="text-gray-400">05.</span> BLOG
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
                        {[1, 2, 3, 4].map((i) => (
                            <article key={i} className="group cursor-pointer border-b border-gray-200 pb-8">
                                <span className="text-gray-500 text-sm uppercase tracking-wider">MARCH {i}, 2024</span>
                                <h3 className="text-2xl font-bold my-2 group-hover:text-gray-600 transition-colors">
                                    Building Scalable Applications with Modern Stack
                                </h3>
                                <p className="text-gray-600">
                                    Exploring best practices and patterns for building applications that scale...
                                </p>
                                <span className="inline-block mt-4 text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
                  Read More →
                </span>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8">
                        <span className="text-gray-400">06.</span> LET'S WORK
                    </h2>
                    <p className="text-2xl mb-12 max-w-2xl">
                        Have a project in mind? Let's create something amazing together.
                    </p>
                    <a
                        href="mailto:john@example.com"
                        className="inline-flex items-center space-x-2 text-3xl font-bold hover:text-gray-600 transition-colors"
                    >
                        <span>HELLO@JOHNDOE.COM</span>
                        <ArrowRight size={32} />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 text-center text-gray-500">
                    <p>&copy; 2024 JOHN DOE. CRAFTED WITH PASSION.</p>
                </div>
            </footer>
        </div>
    );
};

export default PortfolioBold;