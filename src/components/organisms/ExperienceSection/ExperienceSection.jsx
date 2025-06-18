// src/components/organisms/ExperienceSection/ExperienceSection.jsx
import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../../molecules';
import { ExperienceItem } from '../../molecules';
import strapiAPI from '../../../service/api';
import { DEFAULT_EXPERIENCES } from '../../../data/defaultData';

const ExperienceSection = () => {
    const [experiences, setExperiences] = useState(DEFAULT_EXPERIENCES);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const data = await strapiAPI.getExperiences();
                if (data && data.length > 0) {
                    setExperiences(data);
                }
            } catch (error) {
                console.error('Failed to fetch experiences:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    if (loading) {
        return (
            <section id="experience" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <SectionHeader number="02" title="EXPERIENCE" />
                    <div className="max-w-4xl space-y-12">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-8 bg-gray-200 mb-4 w-3/4"></div>
                                <div className="h-6 bg-gray-200 mb-4 w-1/2"></div>
                                <div className="h-4 bg-gray-200 mb-2"></div>
                                <div className="h-4 bg-gray-200 w-4/5"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <SectionHeader number="02" title="EXPERIENCE" />
                <div className="max-w-4xl space-y-12">
                    {experiences.map((exp) => (
                        <ExperienceItem key={exp.id || exp.title} {...exp} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;