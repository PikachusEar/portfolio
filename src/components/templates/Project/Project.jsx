// src/components/templates/Project/Project.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Layout from '../Layout/Layout';
import strapiAPI from '../../../service/api';
import { DEFAULT_PROJECTS, PLACEHOLDER_IMAGE } from '../../../data/defaultData';

/* ─── Loading skeleton ─────────────────────────────────────────────────────── */
const Skeleton = () => (
    <div className="container mx-auto px-6 py-20 max-w-5xl animate-pulse">
        <div className="h-4 bg-gray-200 w-24 mb-16" />
        <div className="h-16 bg-gray-200 w-2/3 mb-6" />
        <div className="h-4 bg-gray-200 w-1/3 mb-20" />
        <div className="aspect-video bg-gray-100 mb-16" />
        <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-4 bg-gray-200" style={{ width: `${90 - i * 10}%` }} />)}
        </div>
    </div>
);

/* ─── Not found state ───────────────────────────────────────────────────────── */
const NotFound = ({ onBack }) => (
    <div className="container mx-auto px-6 py-40 text-center">
        <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="text-5xl font-bold mb-8">Project not found.</h1>
        <button onClick={onBack} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-all">
            <ArrowLeft size={16} /> Back to projects
        </button>
    </div>
);

/* ─── Main component ────────────────────────────────────────────────────────── */
const Project = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProject = async () => {
            try {
                const data = await strapiAPI.getProject(id);
                if (data) {
                    setProject(data);
                } else {
                    // Fallback to default data
                    const fallback = DEFAULT_PROJECTS.find(p => String(p.id) === String(id));
                    setProject(fallback || null);
                }
            } catch {
                const fallback = DEFAULT_PROJECTS.find(p => String(p.id) === String(id));
                setProject(fallback || null);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleBack = () => navigate('/#projects');

    if (loading) return <Layout><Skeleton /></Layout>;
    if (!project) return <Layout><NotFound onBack={handleBack} /></Layout>;

    const {
        title,
        description,
        longDescription,
        image,
        gallery = [],
        techStack = [],
        liveUrl,
        githubUrl,
        challenges,
        solutions,
        features = [],
    } = project;

    const heroImage = !imgError && image ? image : PLACEHOLDER_IMAGE;

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
                        All Projects
                    </button>
                </div>
            </div>

            {/* ── Hero ── */}
            <section className="container mx-auto px-6 pt-16 pb-12 max-w-5xl">
                <div className="mb-12">
                    {/* Index label */}
                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
                        Project
                    </p>

                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-none mb-8 break-words">
                        {title}
                    </h1>

                    {/* CTA links */}
                    <div className="flex flex-wrap gap-4">
                        {liveUrl && liveUrl !== '#' && (
                            <a
                                href={liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
                            >
                                <ExternalLink size={16} /> Live Site
                            </a>
                        )}
                        {githubUrl && githubUrl !== '#' && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border border-black px-6 py-3 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                            >
                                <Github size={16} /> Source Code
                            </a>
                        )}
                    </div>
                </div>

                {/* Hero image */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden mb-6">
                    <img
                        src={heroImage}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                    />
                    {/* Decorative offset border */}
                    <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-black -z-10 pointer-events-none" />
                </div>
            </section>

            {/* ── Divider ── */}
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="border-t border-gray-200" />
            </div>

            {/* ── Content body ── */}
            <section className="container mx-auto px-6 py-16 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Left: case study text */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Short description */}
                        {description && (
                            <div>
                                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Overview</h2>
                                <p className="text-xl leading-relaxed text-gray-700">{description}</p>
                            </div>
                        )}

                        {/* Long description / case study */}
                        {longDescription && (
                            <div>
                                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Case Study</h2>
                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                                    {longDescription.split('\n\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Challenges */}
                        {challenges && (
                            <div>
                                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Challenges</h2>
                                <p className="text-lg leading-relaxed text-gray-700">{challenges}</p>
                            </div>
                        )}

                        {/* Solutions */}
                        {solutions && (
                            <div>
                                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Solutions</h2>
                                <p className="text-lg leading-relaxed text-gray-700">{solutions}</p>
                            </div>
                        )}

                        {/* Features list */}
                        {features.length > 0 && (
                            <div>
                                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-4">Key Features</h2>
                                <ul className="space-y-3">
                                    {features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <span className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right: tech stack sidebar */}
                    <aside className="space-y-8">
                        {techStack.length > 0 && (
                            <div className="border border-gray-200 p-6 hover:border-black transition-colors">
                                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-5">Tech Stack</h2>
                                <div className="flex flex-wrap gap-2">
                                    {techStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-all cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links card */}
                        {(liveUrl && liveUrl !== '#' || githubUrl && githubUrl !== '#') && (
                            <div className="border border-gray-200 p-6 hover:border-black transition-colors">
                                <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-5">Links</h2>
                                <div className="space-y-3">
                                    {liveUrl && liveUrl !== '#' && (
                                        <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                                           className="flex items-center gap-2 text-sm hover:text-gray-500 transition-colors">
                                            <ExternalLink size={14} /> Live Site
                                        </a>
                                    )}
                                    {githubUrl && githubUrl !== '#' && (
                                        <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                                           className="flex items-center gap-2 text-sm hover:text-gray-500 transition-colors">
                                            <Github size={14} /> GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </section>

            {/* ── Gallery ── */}
            {gallery.length > 0 && (
                <section className="bg-gray-50 py-16">
                    <div className="container mx-auto px-6 max-w-5xl">
                        <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-8">Gallery</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {gallery.map((img, i) => (
                                <div key={i} className="aspect-video bg-gray-100 overflow-hidden">
                                    <img src={img} alt={`${title} screenshot ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Bottom nav ── */}
            <section className="border-t border-gray-200 py-12">
                <div className="container mx-auto px-6 max-w-5xl flex justify-between items-center">
                    <button
                        onClick={handleBack}
                        className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-500 transition-colors"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        All Projects
                    </button>
                </div>
            </section>
        </Layout>
    );
};

export default Project;