// src/components/molecules/SectionHeader/SectionHeader.jsx
import React from 'react';
import { Heading } from '../../atoms';

const SectionHeader = ({ number, title, className = "" }) => (
    <Heading level={2} className={`mb-16 ${className}`}>
        <span className="text-gray-400">{number}.</span> {title}
    </Heading>
);

export default SectionHeader;