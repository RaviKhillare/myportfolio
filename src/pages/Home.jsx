import React, { useEffect, useState } from 'react';
import { DataService } from '../services/DataService';
import Slider from '../components/Slider';
import AdBanner from '../components/AdBanner';
import ChatWidget from '../components/ChatWidget';
import { BookOpen, Code, Cpu, Bot, GraduationCap } from 'lucide-react';

const IconMap = {
    Cpu: Cpu,
    Code: Code,
    Bot: Bot,
    BookOpen: BookOpen,
    GraduationCap: GraduationCap
};

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Basic polling to fetch updates from local storage/db
        const fetchData = async () => {
            const result = await DataService.get();
            setData(result);
        };
        fetchData();
        window.addEventListener('storage', fetchData); // Listen for cross-tab updates
        return () => window.removeEventListener('storage', fetchData);
    }, []);

    if (!data) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="pb-20">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                            Hello, I'm <span className="text-primary">{data.profile.name}</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            {data.profile.title}
                        </p>
                        <p className="text-slate-500 max-w-lg">
                            {data.profile.bio}
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/30">
                                Contact Me
                            </button>
                            <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition">
                                View Projects
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                            <img
                                src={data.profile.image}
                                alt="Ravindra Khillare"
                                className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Slider Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Slider slides={data.slider.filter(s => s.active)} />
            </section>

            {/* Ads Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AdBanner ads={data.ads} />
            </section>

            {/* Projecs Section */}
            <section className="py-20 px-4 md:px-8 bg-slate-50" id="projects">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Featured Projects</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            A showcase of my recent work in software development, robotics, and digital education.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.projects?.map((project) => (
                            <Link to={`/project/${project.id}`} key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all z-10" />
                                    <img
                                        src={project.thumbnail || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {project.tags?.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                    <div className="mt-auto flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                                        View Case Study <ArrowRight size={18} className="ml-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services/Focus Areas */}
            <section id="services" className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900">What I Do</h2>
                        <p className="mt-4 text-slate-500">Expertise in Technology and Education</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {data.services.map((service) => {
                            const Icon = IconMap[service.icon] || Code;
                            return (
                                <div key={service.id} className="p-6 bg-slate-50 rounded-xl hover:shadow-lg transition duration-300 border border-slate-100 group">
                                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm mb-4 group-hover:bg-primary group-hover:text-white transition">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <ChatWidget />
        </div>
    );
}
