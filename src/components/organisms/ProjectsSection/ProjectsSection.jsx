// src/components/organisms/ProjectsSection/ProjectsSection.jsx
import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../../molecules';
import { ProjectCard } from '../../molecules';
import StrapiAPI from '../../../service/api';
import { DEFAULT_PROJECTS } from '../../../data/defaultData';

const ProjectsSection = () => {
    const [projects, setProjects] = useState(DEFAULT_PROJECTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await StrapiAPI.getProjects();
                if (data && data.length > 0) {
                    setProjects(data);
                }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <section id="projects" className="py-20">
                <div className="container mx-auto px-6">
                    <SectionHeader number="03" title="PROJECTS" />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative overflow-hidden">
                                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader number="03" title="PROJECTS" />
                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;