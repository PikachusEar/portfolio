// src/components/templates/Blog/Blog.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../Layout/Layout';
import strapiAPI from '../../../service/api';
import { DEFAULT_BLOG_POSTS } from '../../../data/defaultData';

/* ─── Strapi v5 Blocks → HTML converter ────────────────────────────────────────
   Strapi's "blocks" rich-text field returns a JSON array of block nodes.
   This function walks the tree and produces an HTML string that matches the
   existing .blog-content CSS already defined in index.css.
────────────────────────────────────────────────────────────────────────────── */
const inlineToHtml = (children = []) =>
    children.map(child => {
        if (child.type === 'link') {
            return `<a href="${child.url}">${inlineToHtml(child.children)}</a>`;
        }
        let text = child.text ?? '';
        // Escape HTML entities in raw text
        text = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        if (child.bold)          text = `<strong>${text}</strong>`;
        if (child.italic)        text = `<em>${text}</em>`;
        if (child.underline)     text = `<u>${text}</u>`;
        if (child.strikethrough) text = `<s>${text}</s>`;
        if (child.code)          text = `<code>${text}</code>`;
        return text;
    }).join('');

const blocksToHtml = (blocks = []) => {
    if (!Array.isArray(blocks)) return typeof blocks === 'string' ? blocks : '';

    return blocks.map(block => {
        const inner = inlineToHtml(block.children || []);

        switch (block.type) {
            case 'paragraph':
                return `<p>${inner}</p>`;

            case 'heading': {
                const level = block.level ?? 2;
                return `<h${level}>${inner}</h${level}>`;
            }

            case 'list': {
                const tag = block.format === 'ordered' ? 'ol' : 'ul';
                const items = (block.children || [])
                    .map(item => `<li>${inlineToHtml(item.children || [])}</li>`)
                    .join('');
                return `<${tag}>${items}</${tag}>`;
            }

            case 'quote':
                return `<blockquote>${inner}</blockquote>`;

            case 'code':
                return `<pre><code>${inlineToHtml(block.children || [])}</code></pre>`;

            case 'image': {
                const src = block.image?.url ?? '';
                const alt = block.image?.alternativeText ?? '';
                return `<img src="${src}" alt="${alt}" />`;
            }

            case 'divider':
                return '<hr />';

            default:
                // Unknown block type — render its text children as a paragraph
                return inner ? `<p>${inner}</p>` : '';
        }
    }).join('\n');
};

/* ─── Reading time helper ─────────────────────────────────────────────────────
   Handles both a plain HTML string (default/fallback data) and a Strapi v5
   blocks array so calcReadTime never crashes on a non-string value.
────────────────────────────────────────────────────────────────────────────── */
const calcReadTime = (content = '') => {
    // If it's an array it came from Strapi v5 blocks — convert first
    const html = Array.isArray(content) ? blocksToHtml(content) : String(content);
    const text = html.replace(/<[^>]+>/g, '');
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
};

/* ─── Loading skeleton ─────────────────────────────────────────────────────── */
const Skeleton = () => (
    <div className="container mx-auto px-6 py-20 max-w-3xl animate-pulse">
        <div className="h-4 bg-gray-200 w-24 mb-16" />
        <div className="h-4 bg-gray-200 w-32 mb-6" />
        <div className="h-16 bg-gray-200 w-full mb-4" />
        <div className="h-16 bg-gray-200 w-3/4 mb-12" />
        <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-4 bg-gray-200" style={{ width: `${100 - (i % 3) * 10}%` }} />
            ))}
        </div>
    </div>
);

/* ─── Not found ─────────────────────────────────────────────────────────────── */
const NotFound = ({ onBack }) => (
    <div className="container mx-auto px-6 py-40 text-center">
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="text-5xl font-bold mb-8">Post not found.</h1>
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-all">
            <ArrowLeft size={16} /> Back to blog
        </button>
    </div>
);

/* ─── Main component ────────────────────────────────────────────────────────── */
const Blog = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPost = async () => {
            try {
                const data = await strapiAPI.getBlogPost(slug);
                if (data) {
                    setPost(data);
                } else {
                    const fallback = DEFAULT_BLOG_POSTS.find(p => p.slug === slug);
                    setPost(fallback || null);
                }
            } catch {
                const fallback = DEFAULT_BLOG_POSTS.find(p => p.slug === slug);
                setPost(fallback || null);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    const handleBack = () => navigate('/#blog');

    if (loading) return <Layout><Skeleton /></Layout>;
    if (!post) return <Layout><NotFound onBack={handleBack} /></Layout>;

    const { date, title, excerpt, content, featuredImage } = post;

    // Convert blocks → HTML string once so both readTime and the renderer use it
    const contentHtml = Array.isArray(content)
        ? blocksToHtml(content)
        : (content || '');

    const readTime = calcReadTime(contentHtml || excerpt || '');

    return (
        <Layout>
            {/* ── Back button ── */}
            <div className="border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <button
                        onClick={handleBack}
                        className="group inline-flex items-center gap-2 py-5 text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        All Posts
                    </button>
                </div>
            </div>

            {/* ── Header ── */}
            <header className="container mx-auto px-6 pt-16 pb-12 max-w-3xl">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-widest text-gray-400 mb-8">
                    <span>{date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{readTime} min read</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-8">
                    {title}
                </h1>

                {/* Excerpt / standfirst */}
                {excerpt && (
                    <p className="text-xl text-gray-500 leading-relaxed border-l-4 border-black pl-6">
                        {excerpt}
                    </p>
                )}
            </header>

            {/* ── Featured image ── */}
            {featuredImage && (
                <div className="container mx-auto px-6 max-w-3xl mb-12">
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <img
                            src={featuredImage}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-black -z-10 pointer-events-none" />
                    </div>
                </div>
            )}

            {/* ── Divider ── */}
            <div className="container mx-auto px-6 max-w-3xl mb-16">
                <div className="border-t border-gray-200" />
            </div>

            {/* ── Body ── */}
            <article className="container mx-auto px-6 max-w-3xl pb-24">
                {contentHtml ? (
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                ) : (
                    /* Fallback: no content yet (default data only has excerpt) */
                    <p className="text-xl leading-relaxed text-gray-700">{excerpt}</p>
                )}
            </article>

            {/* ── Bottom nav ── */}
            <section className="border-t border-gray-200 py-12">
                <div className="container mx-auto px-6 max-w-3xl">
                    <button
                        onClick={handleBack}
                        className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-500 transition-colors"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        All Posts
                    </button>
                </div>
            </section>
        </Layout>
    );
};

export default Blog;