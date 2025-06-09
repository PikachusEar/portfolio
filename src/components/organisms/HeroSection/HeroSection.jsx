// src/components/organisms/HeroSection/HeroSection.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroButton, Heading, SplitText, DecryptedText } from '../../atoms';

const HeroSection = ({ scrollToSection }) => {
    const handleProjectSelect = (projectTitle, index) => {
        console.log(`Selected project: ${projectTitle} (index: ${index})`);
        // TODO: Navigate to specific project or show project details
        // For now, scroll to projects section
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };


    return (
        <section id="home" className="min-h-screen flex items-center relative bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl">
                    <div className="mb-6">
                        <span className="block">
                        <DecryptedText
                            text="I'M JEREMY"
                            speed={30}
                            maxIterations={15}
                            sequential={true}
                            revealDirection="start"
                            animateOn="view"
                            className="text-black"
                            encryptedClassName="text-gray-500"
                            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
                        />
                        </span>
                        <SplitText
                            text="I'M JEREMY"
                            className="text-6xl md:text-8xl font-bold block"
                            delay={10}
                            duration={1.5}
                            ease="elastic.out(1, 0.3)"
                            splitType="chars"
                            from={{ opacity: 0, y: 60, rotateX: -90 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            threshold={0.1}
                            textAlign="left"
                        />
                        <SplitText
                            text="A FULL-STACK"
                            className="text-6xl md:text-8xl font-bold block text-gray-400"
                            delay={10}
                            duration={1.5}
                            ease="elastic.out(1, 0.3)"
                            splitType="chars"
                            from={{ opacity: 0, y: 60, rotateX: -90 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            threshold={0.1}
                            textAlign="left"
                        />
                        <SplitText
                            text="DEVELOPER"
                            className="text-6xl md:text-8xl font-bold block"
                            delay={10}
                            duration={1.5}
                            ease="elastic.out(1, 0.3)"
                            splitType="chars"
                            from={{ opacity: 0, y: 60, rotateX: -90 }}
                            to={{ opacity: 1, y: 0, rotateX: 0 }}
                            threshold={0.1}
                            textAlign="left"
                        />
                    </div>

                    {/*<Heading level={1} className="mb-6">
                        <span className="block">I'M JEREMY</span>
                        <span className="block text-gray-400">A FULL-STACK</span>
                        <span className="block">DEVELOPER</span>
                    </Heading>*/}
                    <SplitText
                        text="Building exceptional digital experiences with modern technologies and creative solutions."
                        className="text-xl text-gray-600 mb-8 max-w-xl"
                        delay={10}
                        duration={1.5}
                        ease="elastic.out(0.3, 0.3)"
                        splitType="chars"
                        from={{ opacity: 0, y: 60, rotateX: -90 }}
                        to={{ opacity: 1, y: 0, rotateX: 0 }}
                        threshold={0.1}
                        textAlign="left"
                    />
                    <DecryptedText
                        text="This text animates when in view"
                        className="text-xl text-gray-600 mb-8 max-w-xl"
                        animateOn="view"
                        speed={60}
                        revealDirection="start"

                    />
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