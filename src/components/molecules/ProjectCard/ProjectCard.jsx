// src/components/molecules/ProjectCard/ProjectCard.jsx
import React from 'react';

const ProjectCard = ({ title, index }) => (
    <div className="group relative overflow-hidden cursor-pointer">
        <div className="aspect-video bg-gray-100 relative">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white to-transparent">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-700">View Details →</p>
            </div>
        </div>
    </div>
);

export default ProjectCard;