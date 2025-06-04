// src/components/molecules/SkillCategory/SkillCategory.jsx
import React from 'react';

const SkillCategory = ({ category, skills }) => (
    <div className="border border-gray-200 p-6 hover:border-black transition-colors">
        <h3 className="text-xl font-bold mb-4">{category.toUpperCase()}</h3>
        <ul className="space-y-2 text-gray-600">
            {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
            ))}
        </ul>
    </div>
);

export default SkillCategory;