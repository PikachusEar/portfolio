// src/components/molecules/BlogArticle/BlogArticle.jsx
import React from 'react';

const BlogArticle = ({ date, title, excerpt }) => (
    <article className="group cursor-pointer border-b border-gray-200 pb-8">
        <span className="text-gray-500 text-sm uppercase tracking-wider">{date}</span>
        <h3 className="text-2xl font-bold my-2 group-hover:text-gray-600 transition-colors">
            {title}
        </h3>
        <p className="text-gray-600">{excerpt}</p>
        <span className="inline-block mt-4 text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
      Read More →
    </span>
    </article>
);

export default BlogArticle;