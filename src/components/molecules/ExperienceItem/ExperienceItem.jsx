// src/components/molecules/ExperienceItem/ExperienceItem.jsx
import React from 'react';

const ExperienceItem = ({ title, company, period, description }) => (
    <div className="group">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <span className="text-gray-500">{period}</span>
        </div>
        <p className="text-gray-600 text-lg mb-4">{company}</p>
        <p className="text-gray-700 group-hover:text-black transition-colors">
            {description}
        </p>
    </div>
);

export default ExperienceItem;