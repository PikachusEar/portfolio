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
        <section id="home" className="min-h-screen flex items-center relative bg-gray-50 pt-20 md:pt-24">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl">
                    <div className="mb-6">
                        <div className="block">
                        <DecryptedText
                            text="I'M JEREMY"
                            speed={60}
                            maxIterations={10}
                            sequential={true}
                            revealDirection="start"
                            animateOn="view"
                            className="text-6xl md:text-8xl font-bold"
                            parentClassName="block"
                            encryptedClassName="text-6xl md:text-8xl font-bold block text-gray-300"
                            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
                        />
                        </div>
                        <div className="block">
                        <DecryptedText
                            text="A FULL-STACK"
                            speed={60}
                            maxIterations={10}
                            sequential={true}
                            revealDirection="start"
                            animateOn="view"
                            className="text-6xl md:text-8xl font-bold text-gray-400"
                            parentClassName="block"
                            encryptedClassName="text-6xl md:text-8xl font-bold block text-gray-300"
                            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
                        />
                        </div>
                        <div className="block">
                        <DecryptedText
                            text="DEVELOPER"
                            speed={60}
                            maxIterations={10}
                            sequential={true}
                            revealDirection="start"
                            animateOn="view"
                            className="text-6xl md:text-8xl font-bold"
                            parentClassName="block"
                            encryptedClassName="text-6xl md:text-8xl font-bold block text-gray-300"
                            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
                        />
                        </div>
                    </div>

                    {/*<Heading level={1} className="mb-6">
                        <span className="block">I'M JEREMY</span>
                        <span className="block text-gray-400">A FULL-STACK</span>
                        <span className="block">DEVELOPER</span>
                    </Heading>*/}
                    <DecryptedText
                        text="Building exceptional digital experiences with modern technologies and creative solutions."
                        className="text-xl text-gray-600 mb-8 max-w-xl"
                        animateOn="view"
                        sequential={true}
                        speed={10}
                        maxIterations={5}
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