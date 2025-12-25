import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import FloatingSocials from './FloatingSocials';
import AdvancedAd from './AdvancedAd';
import { DataService } from '../services/DataService';

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [title, setTitle] = useState("Ravindra Khillare");
    const [activeAd, setActiveAd] = useState(null);
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        const loadConfig = async () => {
            const data = await DataService.get();
            if (data.config?.websiteTitle) {
                setTitle(data.config.websiteTitle);
            }
            // Load Ads logic
            if (data.ads) {
                const bannerOrInterstitial = data.ads.find(a => a.active && (a.type === 'banner' || a.type === 'interstitial'));
                if (bannerOrInterstitial) {
                    setActiveAd(bannerOrInterstitial);
                    setShowAd(true);
                }
            }
        };
        loadConfig();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        {title}
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">Home</Link>
                        <a href="#services" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">Services</a>
                        <a href="#about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">About</a>
                        <Link to="/login" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm">Admin</Link>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-primary">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Home</Link>
                            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Services</a>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50">Admin Panel</Link>
                        </div>
                    </div>
                )}
            </header>

            <main>
                <Outlet />
            </main>
            <FloatingSocials />
            {/* Global Ad Layer */}
            {activeAd && showAd && (
                <AdvancedAd
                    ad={activeAd}
                    format={activeAd.type}
                    onClose={() => setShowAd(false)}
                />
            )}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>© {new Date().getFullYear()} {title}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
