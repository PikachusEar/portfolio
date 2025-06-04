// src/components/organisms/ProjectsSection/ProjectsSection.jsx
import React from 'react';
import { SectionHeader } from '../../molecules';
import { ProjectCard } from '../../molecules';

const ProjectsSection = () => (
    <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
            <SectionHeader number="03" title="PROJECTS" />
            <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <ProjectCard key={i} title={`PROJECT ${i}`} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default ProjectsSection;