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
        { id: 'slider', label: 'Slider', icon: Image },
        { id: 'ads', label: 'Ads', icon: Monitor },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'settings', label: 'Security', icon: User } // Re-using User icon or could import Lock
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
