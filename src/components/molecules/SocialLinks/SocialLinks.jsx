// src/components/molecules/SocialLinks/SocialLinks.jsx
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { IconButton } from '../../atoms';

const SocialLinks = ({ className = "" }) => (
    <div className={`flex space-x-4 ${className}`}>
        <IconButton icon={Github} href="#" />
        <IconButton icon={Linkedin} href="#" />
        <IconButton icon={Twitter} href="#" />
    </div>
);

export default SocialLinks;