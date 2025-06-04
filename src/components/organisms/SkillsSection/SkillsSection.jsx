// src/components/organisms/SkillsSection/SkillsSection.jsx
import React from 'react';
import { SectionHeader } from '../../molecules';
import { SkillCategory } from '../../molecules';

const SkillsSection = () => {
    const skillCategories = [
        {
            category: 'Frontend',
            skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS']
        },
        {
            category: 'Backend',
            skills: ['Node.js', 'Python', 'Express', 'FastAPI']
        },
        {
            category: 'Database',
            skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma']
        },
        {
            category: 'DevOps',
            skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes']
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <SectionHeader number="04" title="SKILLS" />
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
                    {skillCategories.map((category, i) => (
                        <SkillCategory key={category.category} {...category} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;