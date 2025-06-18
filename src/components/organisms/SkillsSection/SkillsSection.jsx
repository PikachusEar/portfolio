// src/components/organisms/SkillsSection/SkillsSection.jsx
import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../../molecules';
import { SkillCategory } from '../../molecules';
import strapiAPI from '../../../service/api';
import { DEFAULT_SKILLS } from '../../../data/defaultData';

const SkillsSection = () => {
    const [skillCategories, setSkillCategories] = useState(DEFAULT_SKILLS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await strapiAPI.getSkills();
                if (data && data.length > 0) {
                    setSkillCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <SectionHeader number="04" title="SKILLS" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="border border-gray-200 p-6 animate-pulse">
                                <div className="h-6 bg-gray-200 mb-4 w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 w-full"></div>
                                    <div className="h-4 bg-gray-200 w-4/5"></div>
                                    <div className="h-4 bg-gray-200 w-3/5"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <SectionHeader number="04" title="SKILLS" />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
                    {skillCategories.map((category) => (
                        <SkillCategory key={category.id || category.category} {...category} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;