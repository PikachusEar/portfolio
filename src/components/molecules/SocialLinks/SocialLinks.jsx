// src/components/molecules/SocialLinks/SocialLinks.jsx
import React from 'react';
import { Github, Linkedin, Twitter, Mail, Instagram, Facebook } from 'lucide-react';
import { IconButton } from '../../atoms';

const getIconComponent = (iconName) => {
    const iconMap = {
        Github,
        Linkedin,
        Twitter,
        Mail,
        Instagram,
        Facebook
    };

    return iconMap[iconName] || Github;
};

const SocialLinks = ({ className = "", socialLinks = [] }) => {
    // Default social links if none provided
    const defaultLinks = [
        { platform: "Github", url: "#", icon: "Github" },
        { platform: "Linkedin", url: "#", icon: "Linkedin" },
        { platform: "Twitter", url: "#", icon: "Twitter" }
    ];

    const linksToRender = socialLinks.length > 0 ? socialLinks : defaultLinks;

    return (
        <div className={`flex space-x-4 ${className}`}>
            {linksToRender.map((link, index) => {
                const IconComponent = getIconComponent(link.icon);
                return (
                    <IconButton
                        key={index}
                        icon={IconComponent}
                        href={link.url}
                        aria-label={`${link.platform} profile`}
                    />
                );
            })}
        </div>
    );
};
export default SocialLinks;