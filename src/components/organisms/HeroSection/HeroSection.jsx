// src/components/organisms/HeroSection/HeroSection.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroButton, Heading, SplitText } from '../../atoms';





const HERO_ANIMATIONS = {
    slideUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 }
    }
};

const HeroSection = ({ scrollToSection }) => {
    const handleProjectSelect = (projectTitle, index) => {
        console.log(`Selected project: ${projectTitle} (index: ${index})`);
        // TODO: Navigate to specific project or show project details
        // For now, scroll to projects section
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    return (
        <section id="home" className="min-h-screen flex items-center relative bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl">
                    <SplitText
                        text="Hello, GSAP!"
                        className="text-2xl font-semibold text-center"
                        delay={10}
                        duration={1.5}
                        ease="elastic.out(0.3, 0.2)"
                        splitType="chars"
                        from={ HERO_ANIMATIONS.slideUp.from }
                        to={ HERO_ANIMATIONS.slideUp.to }
                        threshold={0.1}
                        /*rootMargin="-100px"*/
                        textAlign="center"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />

                    <Heading level={1} className="mb-6">
                        <span className="block">I'M JEREMY</span>
                        <span className="block text-gray-400">A FULL-STACK</span>
                        <span className="block">DEVELOPER</span>
                    </Heading>
                    <p className="text-xl text-gray-600 mb-8 max-w-xl">
                        Building exceptional digital experiences with modern technologies and creative solutions.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <HeroButton
                            variant="primary"
                            onClick={(e) => scrollToSection(e, '#projects')}
                            href="#projects"
                            className="group"
                            showBubbles={true}
                            onProjectSelect={handleProjectSelect}
                        >
                            <span>VIEW PROJECTS</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </HeroButton>

                    </div>
                </div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 right-20 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
            </div>
        </section>
    );
};

export default HeroSection;