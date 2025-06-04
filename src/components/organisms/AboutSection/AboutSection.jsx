// src/components/organisms/AboutSection/AboutSection.jsx
import React from 'react';
import { SectionHeader, SocialLinks } from '../../molecules';

const AboutSection = () => (
    <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6">
            <SectionHeader number="01" title="ABOUT ME" />
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
                    <SocialLinks className="mt-8" />
                </div>
            </div>
        </div>
    </section>
);

export default AboutSection;