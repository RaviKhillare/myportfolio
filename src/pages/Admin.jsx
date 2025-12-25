import React, { useEffect, useState } from 'react';
import { DataService } from '../services/DataService';
import { useAuth } from '../context/AuthContext';
import { User, Image, Monitor, MessageSquare, Save, Trash2, Plus } from 'lucide-react';

export default function Admin() {
    const { logout } = useAuth();
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [toast, setToast] = useState('');

    useEffect(() => {
        const loadData = async () => {
            const result = await DataService.get();
            setData(result);
        };
        loadData();
    }, []);

    const handleSave = async (section, newData) => {
        // Optimistically update UI
        setData(prev => ({ ...prev, [section]: newData }));

        // Persist
        await DataService.update(section, newData);
        showToast('Saved successfully!');
    };
    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    if (!data) return <div>Loading...</div>;

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'projects', label: 'Projects', icon: LayoutDashboard }, // New Projects Tab
        { id: 'config', label: 'General', icon: Monitor }, // Changed Monitor to something else properly if needed, but Monitor is fine for now
        { id: 'services', label: 'Services', icon: Image }, // Re-using icons for now
        { id: 'slider', label: 'Slider', icon: Image },
        { id: 'ads', label: 'Ads', icon: Monitor },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'settings', label: 'Security', icon: User }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium">Logout</button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
                    <nav className="space-y-2">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === tab.id ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    {toast && (
                        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-right fade-in z-50">
                            {toast}
                        </div>
                    )}

                    {activeTab === 'config' && (
                        <div className="space-y-8">
                            <h2 className="text-xl font-bold">General Settings</h2>

                            {/* Website Identity */}
                            <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
                                <h3 className="font-semibold text-slate-700">Identity</h3>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Website Title</label>
                                    <input
                                        className="w-full border p-2 rounded mt-1"
                                        value={data.config?.websiteTitle || ''}
                                        onChange={(e) => setData({ ...data, config: { ...data.config, websiteTitle: e.target.value } })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Logo URL (Optional)</label>
                                    <input
                                        className="w-full border p-2 rounded mt-1"
                                        placeholder="https://..."
                                        value={data.config?.logoUrl || ''}
                                        onChange={(e) => setData({ ...data, config: { ...data.config, logoUrl: e.target.value } })}
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
                                <h3 className="font-semibold text-slate-700">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                                        <input
                                            className="w-full border p-2 rounded mt-1"
                                            value={data.config?.email || ''}
                                            onChange={(e) => setData({ ...data, config: { ...data.config, email: e.target.value } })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                                        <input
                                            className="w-full border p-2 rounded mt-1"
                                            value={data.config?.phone || ''}
                                            onChange={(e) => setData({ ...data, config: { ...data.config, phone: e.target.value } })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-slate-700">Social Media Links</h3>
                                    <button
                                        onClick={() => {
                                            const newLink = { id: Date.now(), platform: "Platform", url: "https://", icon: "Link" };
                                            const newLinks = [...(data.config?.socialLinks || []), newLink];
                                            setData({ ...data, config: { ...data.config, socialLinks: newLinks } });
                                        }}
                                        className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
                                    >
                                        + Add Link
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.config?.socialLinks?.map((link, idx) => (
                                        <div key={link.id} className="flex gap-2 items-center">
                                            <input
                                                className="w-1/3 border p-2 rounded"
                                                placeholder="Platform Name"
                                                value={link.platform}
                                                onChange={(e) => {
                                                    const newLinks = [...data.config.socialLinks];
                                                    newLinks[idx].platform = e.target.value;
                                                    setData({ ...data, config: { ...data.config, socialLinks: newLinks } });
                                                }}
                                            />
                                            <input
                                                className="flex-1 border p-2 rounded"
                                                placeholder="URL"
                                                value={link.url}
                                                onChange={(e) => {
                                                    const newLinks = [...data.config.socialLinks];
                                                    newLinks[idx].url = e.target.value;
                                                    setData({ ...data, config: { ...data.config, socialLinks: newLinks } });
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const newLinks = data.config.socialLinks.filter(l => l.id !== link.id);
                                                    setData({ ...data, config: { ...data.config, socialLinks: newLinks } });
                                                }}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => handleSave('config', data.config)}
                                className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2"
                            >
                                <Save size={18} /> Save Settings
                            </button>
                        </div>
                    )}

                    {activeTab === 'services' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Manage Services</h2>
                                <button
                                    onClick={() => {
                                        const newItem = { id: Date.now(), title: "New Service", description: "Service Description", icon: "Box" };
                                        const newItems = [...(data.services || []), newItem];
                                        handleSave('services', newItems);
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                                >
                                    <Plus size={16} /> Add Service
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.services?.map((service, idx) => (
                                    <div key={service.id} className="bg-slate-50 p-6 rounded-xl border relative group">
                                        <button
                                            onClick={() => {
                                                const newItems = data.services.filter(s => s.id !== service.id);
                                                handleSave('services', newItems);
                                            }}
                                            className="absolute top-4 right-4 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Service Title</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1 bg-white"
                                                    value={service.title}
                                                    onChange={(e) => {
                                                        const newItems = [...data.services];
                                                        newItems[idx].title = e.target.value;
                                                        setData({ ...data, services: newItems });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Icon (Lucide Name)</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1 bg-white"
                                                    value={service.icon}
                                                    onChange={(e) => {
                                                        const newItems = [...data.services];
                                                        newItems[idx].icon = e.target.value;
                                                        setData({ ...data, services: newItems });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                                                <textarea
                                                    className="w-full border p-2 rounded mt-1 bg-white h-24"
                                                    value={service.description}
                                                    onChange={(e) => {
                                                        const newItems = [...data.services];
                                                        newItems[idx].description = e.target.value;
                                                        setData({ ...data, services: newItems });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => handleSave('services', data.services)}
                                className="mt-6 bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2"
                            >
                                <Save size={18} /> Update Services
                            </button>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="space-y-6 max-w-2xl">
                            <h2 className="text-xl font-bold mb-6">Edit Profile</h2>
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={data.profile.name}
                                    onChange={(e) => setData({ ...data, profile: { ...data.profile, name: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={data.profile.title}
                                    onChange={(e) => setData({ ...data, profile: { ...data.profile, title: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Bio</label>
                                <textarea
                                    className="w-full border p-2 rounded h-24"
                                    value={data.profile.bio}
                                    onChange={(e) => setData({ ...data, profile: { ...data.profile, bio: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    className="w-full border p-2 rounded"
                                    value={data.profile.image}
                                    onChange={(e) => setData({ ...data, profile: { ...data.profile, image: e.target.value } })}
                                />
                            </div>
                            <button
                                onClick={() => handleSave('profile', data.profile)}
                                className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
                            >
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Manage Projects</h2>
                                <button
                                    onClick={() => {
                                        const newProject = {
                                            id: Date.now(),
                                            title: "New Project",
                                            description: "Project Description",
                                            thumbnail: "",
                                            tags: [],
                                            blocks: []
                                        };
                                        const newProjects = [...(data.projects || []), newProject];
                                        handleSave('projects', newProjects);
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                                >
                                    <Plus size={16} /> Create Project
                                </button>
                            </div>

                            <div className="space-y-8">
                                {data.projects?.map((project, idx) => (
                                    <div key={project.id} className="bg-slate-50 p-6 rounded-xl border space-y-4">
                                        {/* Project Header */}
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Project Title</label>
                                                <input
                                                    className="w-full border p-2 rounded bg-white text-lg font-bold"
                                                    value={project.title}
                                                    onChange={(e) => {
                                                        const newProjects = [...data.projects];
                                                        newProjects[idx].title = e.target.value;
                                                        setData({ ...data, projects: newProjects });
                                                    }}
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Delete project?')) {
                                                        const newProjects = data.projects.filter(p => p.id !== project.id);
                                                        handleSave('projects', newProjects);
                                                    }
                                                }}
                                                className="ml-4 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                        {/* Metadata */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Short Description</label>
                                                <textarea
                                                    className="w-full border p-2 rounded mt-1 bg-white h-20"
                                                    value={project.description}
                                                    onChange={(e) => {
                                                        const newProjects = [...data.projects];
                                                        newProjects[idx].description = e.target.value;
                                                        setData({ ...data, projects: newProjects });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Thumbnail URL</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1 bg-white"
                                                    value={project.thumbnail}
                                                    placeholder="https://..."
                                                    onChange={(e) => {
                                                        const newProjects = [...data.projects];
                                                        newProjects[idx].thumbnail = e.target.value;
                                                        setData({ ...data, projects: newProjects });
                                                    }}
                                                />
                                                <label className="text-xs font-bold text-slate-500 uppercase mt-2 block">Tags (comma separated)</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1 bg-white"
                                                    value={project.tags?.join(', ') || ''}
                                                    placeholder="React, IoT, Design"
                                                    onChange={(e) => {
                                                        const newProjects = [...data.projects];
                                                        newProjects[idx].tags = e.target.value.split(',').map(t => t.trim());
                                                        setData({ ...data, projects: newProjects });
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Block Editor */}
                                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                                            <h4 className="font-semibold text-slate-700 mb-4">Content Blocks</h4>
                                            <div className="space-y-4 mb-4">
                                                {project.blocks?.map((block, bIdx) => (
                                                    <div key={block.id} className="flex gap-4 items-start p-3 bg-slate-50 rounded border group">
                                                        <span className="text-xs font-bold uppercase text-slate-400 mt-2 w-12">{block.type}</span>
                                                        <div className="flex-1 space-y-2">
                                                            {block.type !== 'link' && (
                                                                <textarea
                                                                    className="w-full border p-2 rounded text-sm min-h-[60px]"
                                                                    value={block.content}
                                                                    placeholder={block.type === 'image' ? 'Image URL' : 'Content...'}
                                                                    onChange={(e) => {
                                                                        const newProjects = [...data.projects];
                                                                        newProjects[idx].blocks[bIdx].content = e.target.value;
                                                                        setData({ ...data, projects: newProjects });
                                                                    }}
                                                                />
                                                            )}
                                                            {block.type === 'link' && (
                                                                <>
                                                                    <input
                                                                        className="w-full border p-2 rounded text-sm"
                                                                        value={block.label}
                                                                        placeholder="Link Label (e.g. View Code)"
                                                                        onChange={(e) => {
                                                                            const newProjects = [...data.projects];
                                                                            newProjects[idx].blocks[bIdx].label = e.target.value;
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                    />
                                                                    <input
                                                                        className="w-full border p-2 rounded text-sm"
                                                                        value={block.content}
                                                                        placeholder="https://..."
                                                                        onChange={(e) => {
                                                                            const newProjects = [...data.projects];
                                                                            newProjects[idx].blocks[bIdx].content = e.target.value;
                                                                            setData({ ...data, projects: newProjects });
                                                                        }}
                                                                    />
                                                                </>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                const newProjects = [...data.projects];
                                                                newProjects[idx].blocks = newProjects[idx].blocks.filter(b => b.id !== block.id);
                                                                setData({ ...data, projects: newProjects });
                                                            }}
                                                            className="text-slate-400 hover:text-red-500"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Add Block Controls */}
                                            <div className="flex gap-2 text-sm">
                                                <span className="text-slate-500 py-1">Add Block:</span>
                                                {['text', 'image', 'video', 'link'].map(type => (
                                                    <button
                                                        key={type}
                                                        onClick={() => {
                                                            const newBlock = { id: Date.now(), type, content: "", label: "" };
                                                            const newProjects = [...data.projects];
                                                            if (!newProjects[idx].blocks) newProjects[idx].blocks = [];
                                                            newProjects[idx].blocks.push(newBlock);
                                                            setData({ ...data, projects: newProjects });
                                                        }}
                                                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded capitalize text-slate-700"
                                                    >
                                                        + {type}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => handleSave('projects', data.projects)}
                                                className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2"
                                            >
                                                <Save size={18} /> Save Project
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'slider' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Manage Slider</h2>
                                <button
                                    onClick={() => {
                                        const newItem = { id: Date.now(), title: "Title", text: "Description", image: "", link: "#", active: true };
                                        const newSlider = [...data.slider];
                                        handleSave('slider', newSlider);
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                                >
                                    <Plus size={16} /> Add Slide
                                </button>
                            </div>
                            <div className="space-y-6">
                                {data.slider.map((slide, idx) => (
                                    <div key={slide.id} className="bg-slate-50 p-6 rounded-xl border space-y-4">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold text-slate-700">Slide #{idx + 1}</h3>
                                            <button
                                                onClick={() => {
                                                    const newSlider = data.slider.filter(s => s.id !== slide.id);
                                                    handleSave('slider', newSlider);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1"
                                                    value={slide.title || ''}
                                                    onChange={(e) => {
                                                        const newSlider = [...data.slider];
                                                        newSlider[idx].title = e.target.value;
                                                        setData({ ...data, slider: newSlider });
                                                    }}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                                                <textarea
                                                    className="w-full border p-2 rounded mt-1 h-20"
                                                    value={slide.text}
                                                    onChange={(e) => {
                                                        const newSlider = [...data.slider];
                                                        newSlider[idx].text = e.target.value;
                                                        setData({ ...data, slider: newSlider });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Image URL</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1"
                                                    value={slide.image || ''}
                                                    placeholder="https://..."
                                                    onChange={(e) => {
                                                        const newSlider = [...data.slider];
                                                        newSlider[idx].image = e.target.value;
                                                        setData({ ...data, slider: newSlider });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Link URL</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1"
                                                    value={slide.link || ''}
                                                    placeholder="#"
                                                    onChange={(e) => {
                                                        const newSlider = [...data.slider];
                                                        newSlider[idx].link = e.target.value;
                                                        setData({ ...data, slider: newSlider });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => {
                                                    const newSlider = [...data.slider];
                                                    newSlider[idx].active = !newSlider[idx].active;
                                                    handleSave('slider', newSlider);
                                                }}
                                                className={`px-3 py-1 rounded text-sm ${slide.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                            >
                                                {slide.active ? 'Active' : 'Hidden'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleSave('slider', data.slider)}
                                    className="mt-4 bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2"
                                >
                                    <Save size={18} /> Update Slider
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'ads' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Ad Management</h2>
                                <button
                                    onClick={() => {
                                        const newItem = {
                                            id: Date.now(),
                                            title: "New Ad",
                                            content: "Ad Content",
                                            startDate: new Date().toISOString().split('T')[0],
                                            endDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
                                            active: true
                                        };
                                        const newAds = [...data.ads, newItem];
                                        handleSave('ads', newAds);
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                                >
                                    <Plus size={16} /> Create Ad
                                </button>
                            </div>
                            <div className="grid gap-6">
                                {data.ads.map((ad, idx) => (
                                    <div key={ad.id} className="bg-slate-50 p-6 rounded-xl border space-y-4">
                                        <div className="flex justify-between">
                                            <h3 className="font-semibold text-slate-700">Ad #{idx + 1}</h3>
                                            <button
                                                onClick={() => {
                                                    const newAds = data.ads.filter(a => a.id !== ad.id);
                                                    handleSave('ads', newAds);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1"
                                                    value={ad.title}
                                                    onChange={(e) => {
                                                        const newAds = [...data.ads];
                                                        newAds[idx].title = e.target.value;
                                                        setData({ ...data, ads: newAds });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                                                <select
                                                    className="w-full border p-2 rounded mt-1"
                                                    value={ad.active}
                                                    onChange={(e) => {
                                                        const newAds = [...data.ads];
                                                        newAds[idx].active = e.target.value === 'true';
                                                        setData({ ...data, ads: newAds }); // Just update local state, duplicate save button below handles persistance
                                                    }}
                                                >
                                                    <option value="true">Active</option>
                                                    <option value="false">Inactive</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                                                <select
                                                    className="w-full border p-2 rounded mt-1 uppercase"
                                                    value={ad.type || 'banner'}
                                                    onChange={(e) => {
                                                        const newAds = [...data.ads];
                                                        newAds[idx].type = e.target.value;
                                                        setData({ ...data, ads: newAds });
                                                    }}
                                                >
                                                    <option value="banner">Banner (Sticky)</option>
                                                    <option value="interstitial">Interstitial (Popup)</option>
                                                    <option value="native">Native (Inline)</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Content</label>
                                                <input
                                                    className="w-full border p-2 rounded mt-1"
                                                    value={ad.content}
                                                    onChange={(e) => {
                                                        const newAds = [...data.ads];
                                                        newAds[idx].content = e.target.value;
                                                        setData({ ...data, ads: newAds });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">Start Date</label>
                                                <input
                                                    type="date"
                                                    className="w-full border p-2 rounded mt-1"
                                                    value={ad.startDate}
                                                    onChange={(e) => {
                                                        const newAds = [...data.ads];
                                                        newAds[idx].startDate = e.target.value;
                                                        setData({ ...data, ads: newAds });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 uppercase">End Date</label>
                                                <input
                                                    type="date"
                                                    className="w-full border p-2 rounded mt-1"
                                                    value={ad.endDate}
                                                    onChange={(e) => {
                                                        const newAds = [...data.ads];
                                                        newAds[idx].endDate = e.target.value;
                                                        setData({ ...data, ads: newAds });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleSave('ads', data.ads)}
                                    className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 w-max"
                                >
                                    <Save size={18} /> Update Ads
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div>
                            <h2 className="text-xl font-bold mb-6">Inbox</h2>
                            {data.messages.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-lg border border-dashed">
                                    No messages yet.
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {[...data.messages].reverse().map((msg, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="font-bold text-slate-800">{msg.sender}</span>
                                                <span className="text-xs text-slate-500">{new Date(msg.date).toLocaleString()}</span>
                                            </div>
                                            <p className="text-slate-600">{msg.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="max-w-md">
                            <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                            <div className="bg-slate-50 p-6 rounded-xl border">
                                <label className="block text-sm font-medium mb-1">New Password</label>
                                <input
                                    type="password"
                                    className="w-full border p-2 rounded mb-4"
                                    placeholder="Enter new password"
                                    id="new-password"
                                />
                                <button
                                    onClick={() => {
                                        const newPass = document.getElementById('new-password').value;
                                        if (newPass) {
                                            handleSave('settings', { ...data.settings, password: newPass });
                                        }
                                    }}
                                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Update Password
                                </button>
                            </div>
                            <div className="mt-8">
                                <h3 className="font-bold mb-2">Build Information</h3>
                                <p className="text-sm text-slate-500">Version: 2.0.0 (Production Ready)</p>
                                <p className="text-sm text-slate-500">Backend: Hybrid (Firebase / LocalStorage)</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
