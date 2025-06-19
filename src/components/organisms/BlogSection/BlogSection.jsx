// src/components/organisms/BlogSection/BlogSection.jsx
import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../../molecules';
import { BlogArticle } from '../../molecules';
import strapiAPI from '../../../service/api';
import { DEFAULT_BLOG_POSTS } from '../../../data/defaultData';

const BlogSection = () => {
    const [articles, setArticles] = useState(DEFAULT_BLOG_POSTS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const data = await strapiAPI.getBlogPosts();
                if (data && data.length > 0) {
                    setArticles(data);
                }
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    if (loading) {
        return (
            <section id="blog" className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6">
                    <SectionHeader number="5" title="BLOG" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl">
                        {[1, 2, 3, 4].map((i) => (
                            <article key={i} className="border-b border-gray-200 pb-8 animate-pulse">
                                <div className="h-4 bg-gray-200 mb-2 w-1/3"></div>
                                <div className="h-6 bg-gray-200 my-2 w-4/5"></div>
                                <div className="h-4 bg-gray-200 mb-2"></div>
                                <div className="h-4 bg-gray-200 w-3/4"></div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="blog" className="py-20">
            <div className="container mx-auto px-6">
                <SectionHeader number="05" title="BLOG" />
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
                    {articles.map((article) => (
                        <BlogArticle key={article.id} {...article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;