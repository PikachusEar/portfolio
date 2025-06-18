// src/components/molecules/ProjectCard/ProjectCard.jsx
import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { PLACEHOLDER_IMAGE } from '../../../data/defaultData';

const ProjectCard = ({
                         id,
                         title,
                         description,
                         image,
                         techStack = [],
                         liveUrl,
                         githubUrl,
                         featured = false
                     }) => (
    <div className="group relative overflow-hidden cursor-pointer">
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
            <img
                src={image || PLACEHOLDER_IMAGE}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

            {/* Project Links */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {liveUrl && liveUrl !== "#" && (
                    <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink size={16} />
                    </a>
                )}
                {githubUrl && githubUrl !== "#" && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github size={16} />
                    </a>
                )}
            </div>

            {/* Featured Badge */}
            {featured && (
                <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-black text-white text-xs font-bold rounded">
                        FEATURED
                    </span>
                </div>
            )}

            {/* Project Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white to-transparent">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                {description && (
                    <p className="text-gray-700 mb-3 text-sm">{description}</p>
                )}
                {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {techStack.slice(0, 3).map((tech, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                                {tech}
                            </span>
                        ))}
                        {techStack.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                +{techStack.length - 3}
                            </span>
                        )}
                    </div>
                )}
                <p className="text-gray-700 font-medium">View Details →</p>
            </div>
        </div>
    </div>
);

export default ProjectCard;