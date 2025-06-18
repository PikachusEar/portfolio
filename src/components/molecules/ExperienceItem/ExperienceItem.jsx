// src/components/molecules/ExperienceItem/ExperienceItem.jsx
import React from 'react';

const ExperienceItem = ({
                            title,
                            company,
                            period,
                            description,
                            technologies = []
                        }) => (
    <div className="group">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <span className="text-gray-500">{period}</span>
        </div>
        <p className="text-gray-600 text-lg mb-4">{company}</p>
        <p className="text-gray-700 group-hover:text-black transition-colors mb-4">
            {description}
        </p>
        {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        )}
    </div>
);

export default ExperienceItem;