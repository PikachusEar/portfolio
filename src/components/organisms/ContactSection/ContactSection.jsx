// src/components/organisms/ContactSection/ContactSection.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '../../molecules';

const ContactSection = () => (
    <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <SectionHeader number="06" title="LET'S WORK" />
            <p className="text-2xl mb-12 max-w-2xl">
                Have a project in mind? Let's create something amazing together.
            </p>
            <a
                href="mailto:hello@johndoe.com"
                className="inline-flex items-center space-x-2 text-3xl font-bold hover:text-gray-600 transition-colors"
            >
                <span>HELLO@JOHNDOE.COM</span>
                <ArrowRight size={32} />
            </a>
        </div>
    </section>
);

export default ContactSection;