import React, { useState, useEffect } from 'react';
import AdSense from './AdSense';

export default function AdBanner({ ads }) {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);

    const today = new Date().toISOString().split('T')[0];

    // Filter ads: active AND today is between start and end date
    const validAds = ads.filter(ad => {
        return ad.active && ad.startDate <= today && ad.endDate >= today;
    });

    // Rotate ads every 8 seconds if there are multiple
    useEffect(() => {
        if (validAds.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentAdIndex(prev => (prev + 1) % validAds.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [validAds.length]);

    if (validAds.length === 0) {
        // If no local ads, maybe show AdSense fallback?
        // Uncomment below if you have a real AdSense Key
        // return <AdSense slotId="12345678" />;
        return null;
    }

    const ad = validAds[currentAdIndex];

    return (
        <div className="space-y-8">
            {/* Primary Local Ad */}
            <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in duration-700">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-white bg-orange-500 px-2 py-0.5 rounded uppercase tracking-wider">Local Partner</span>
                        <span className="text-xs text-orange-400">Expires: {ad.endDate}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">{ad.title}</h3>
                    <p className="text-slate-600 mt-1">{ad.content}</p>
                </div>
                <button className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition shadow-orange-200 shadow-lg whitespace-nowrap">
                    View Offer
                </button>
            </div>

            {/* Example AdSense Placement (Commented out until configured) */}
            {/* <AdSense slotId="1234567890" /> */}
        </div>
    );
}
