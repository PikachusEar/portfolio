// src/components/organisms/AboutSection/AboutSection.jsx
import React, { useState, useEffect } from 'react';
import { SectionHeader, SocialLinks } from '../../molecules';
import strapiAPI from '../../../service/api';
import { DEFAULT_ABOUT, PLACEHOLDER_IMAGE } from '../../../data/defaultData';

const AboutSection = () => {
    const [aboutData, setAboutData] = useState(DEFAULT_ABOUT);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const data = await strapiAPI.getAbout();
                if (data) {
                    setAboutData(data);
                }
            } catch (error) {
                console.error('Failed to fetch about data:', error);
                // Keep default data
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    if (loading) {
        return (
            <section id="about" className="py-20 relative">
                <div className="container mx-auto px-6">
                    <SectionHeader number="01" title="ABOUT ME" />
                    <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl">
                        <div className="relative">
                            <div className="aspect-square bg-gray-200 animate-pulse"></div>
                        </div>
                        <div>
                            <div className="h-6 bg-gray-200 animate-pulse mb-4"></div>
                            <div className="h-6 bg-gray-200 animate-pulse mb-4 w-3/4"></div>
                            <div className="h-6 bg-gray-200 animate-pulse w-1/2"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="about" className="py-12 sm:py-16 md:py-20 relative">
            <div className="container mx-auto px-4 sm:px-6">
                <SectionHeader number="01" title={aboutData.title || "ABOUT ME"} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl">
                    <div className="relative order-2 md:order-1">
                        <div className="aspect-square bg-gray-100 relative">
                            {aboutData.image ? (
                                <img
                                    src={aboutData.image}
                                    alt="About"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <img
                                    src={PLACEHOLDER_IMAGE}
                                    alt="About placeholder"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        {/* Adjusted border positioning for mobile */}
                        <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-full h-full border-2 md:border-4 border-black -z-10"></div>
                    </div>
                    <div className="order-1 md:order-2">
                        <p className="text-lg sm:text-xl leading-relaxed mb-6">
                            {aboutData.description}
                        </p>
                        {aboutData.secondaryDescription && (
                            <p className="text-lg sm:text-xl leading-relaxed text-gray-600">
                                {aboutData.secondaryDescription}
                            </p>
                        )}
                        <SocialLinks className="mt-6 sm:mt-8" socialLinks={aboutData.socialLinks} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;