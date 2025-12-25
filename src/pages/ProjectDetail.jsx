import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { DataService } from '../services/DataService';
import ShareButton from '../components/ShareButton';

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProject = async () => {
            const data = await DataService.get();
            const found = data.projects?.find(p => p.id === parseInt(id));
            setProject(found);
            setLoading(false);
        };
        loadProject();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found.</div>;

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] bg-slate-900">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition">
                            <ArrowLeft size={20} /> Back to Home
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                        <div className="flex flex-wrap items-center gap-4">
                            {project.tags?.map((tag, idx) => (
                                <span key={idx} className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur">
                                    {tag}
                                </span>
                            ))}
                            <div className="ml-auto">
                                <ShareButton title={project.title} text={project.description} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Blocks */}
            <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
                {project.blocks?.map((block) => (
                    <div key={block.id} className="animate-in slide-in-from-bottom-4 duration-700">
                        {block.type === 'text' && (
                            <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">{block.content}</p>
                        )}

                        {block.type === 'image' && (
                            <figure>
                                <img src={block.content} alt="Project Block" className="rounded-xl shadow-lg w-full" />
                                {block.caption && <figcaption className="text-center text-sm text-slate-500 mt-2">{block.caption}</figcaption>}
                            </figure>
                        )}

                        {block.type === 'video' && (
                            <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                                {/* Simple iframe support for YouTube/Vimeo if URL contains 'embed', otherwise generic video tag */}
                                {block.content.includes('embed') ? (
                                    <iframe src={block.content} className="w-full h-full" allowFullScreen title="Video"></iframe>
                                ) : (
                                    <video src={block.content} controls className="w-full h-full"></video>
                                )}
                            </div>
                        )}

                        {block.type === 'link' && (
                            <a
                                href={block.content}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg hover:border-primary/50 hover:shadow-md transition group"
                            >
                                <span className="font-medium text-slate-700 group-hover:text-primary">{block.label || block.content}</span>
                                <ExternalLink size={20} className="text-slate-400 group-hover:text-primary" />
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
