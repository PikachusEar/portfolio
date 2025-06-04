// src/components/organisms/BlogSection/BlogSection.jsx
import React from 'react';
import { SectionHeader } from '../../molecules';
import { BlogArticle } from '../../molecules';

const BlogSection = () => {
    const articles = [
        {
            date: "MARCH 1, 2024",
            title: "Building Scalable Applications with Modern Stack",
            excerpt: "Exploring best practices and patterns for building applications that scale..."
        },
        {
            date: "FEBRUARY 15, 2024",
            title: "The Future of Web Development",
            excerpt: "Discussing emerging trends and technologies shaping the web development landscape..."
        },
        {
            date: "JANUARY 28, 2024",
            title: "Optimizing React Performance",
            excerpt: "Tips and techniques for improving React application performance and user experience..."
        },
        {
            date: "JANUARY 10, 2024",
            title: "CSS Grid vs Flexbox: When to Use What",
            excerpt: "A comprehensive guide to choosing the right layout method for your projects..."
        }
    ];

    return (
        <section id="blog" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader number="05" title="BLOG" />
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
                    {articles.map((article, i) => (
                        <BlogArticle key={i} {...article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;