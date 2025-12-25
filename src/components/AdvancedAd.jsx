import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Unified Ad Component handling multiple formats
export default function AdvancedAd({ ad, format = 'native', onClose }) {
    if (!ad || !ad.active) return null;

    // Interstitial (Popup)
    if (format === 'interstitial') {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                    <button onClick={onClose} className="absolute top-4 right-4 bg-black/10 hover:bg-black/20 p-2 rounded-full transition">
                        <X size={20} />
                    </button>
                    <div className="p-8 text-center space-y-4">
                        <span className="text-xs font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded">SPONSORED</span>
                        <h2 className="text-2xl font-bold text-slate-800">{ad.title}</h2>
                        <p className="text-slate-600 text-lg">{ad.content}</p>
                        <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 hover:scale-105 transition shadow-lg shadow-primary/30">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Banner (Sticky Bottom/Top) - Defaulting to bottom fixed for this demo
    if (format === 'banner') {
        return (
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-40 flex justify-between items-center shadow-lg border-t border-white/10">
                <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-4">
                    <div className="flex items-center gap-4">
                        <span className="bg-white/20 text-xs px-2 py-1 rounded">Ad</span>
                        <p className="font-medium">{ad.content}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/50 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        );
    }

    // Native (Inline Card)
    return (
        <div className="my-8 mx-auto max-w-4xl bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition">
            <div className="bg-slate-200 rounded-lg w-full md:w-32 h-24 flex items-center justify-center text-slate-400 font-bold text-xl">
                AD
            </div>
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-bold text-slate-800">{ad.title}</h3>
                <p className="text-slate-600">{ad.content}</p>
            </div>
            <button className="whitespace-nowrap px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">
                View Offer
            </button>
        </div>
    );
}
