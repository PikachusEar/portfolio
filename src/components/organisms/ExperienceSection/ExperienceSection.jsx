// src/components/organisms/ExperienceSection/ExperienceSection.jsx
import React from 'react';
import { SectionHeader } from '../../molecules';
import { ExperienceItem } from '../../molecules';

const ExperienceSection = () => {
    const experiences = [
        {
            title: "SENIOR FULL-STACK DEVELOPER",
            company: "Tech Company Inc.",
            period: "2022 - PRESENT",
            description: "Led development of enterprise applications, implemented CI/CD pipelines, and mentored junior developers."
        },
        {
            title: "FULL-STACK DEVELOPER",
            company: "Digital Agency Ltd.",
            period: "2020 - 2022",
            description: "Built responsive web applications using React and Node.js, collaborated with design teams to create user-friendly interfaces."
        },
        {
            title: "FRONTEND DEVELOPER",
            company: "Startup Solutions",
            period: "2018 - 2020",
            description: "Developed interactive user interfaces, optimized performance, and implemented modern JavaScript frameworks."
        }
    ];

    return (
        <section id="experience" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <SectionHeader number="02" title="EXPERIENCE" />
                <div className="max-w-4xl space-y-12">
                    {experiences.map((exp, i) => (
                        <ExperienceItem key={i} {...exp} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;