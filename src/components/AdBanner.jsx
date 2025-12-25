import React from 'react';

export default function AdBanner({ ads }) {
    const today = new Date().toISOString().split('T')[0];

    // Filter ads: active AND today is between start and end date
    const validAds = ads.filter(ad => {
        return ad.active && ad.startDate <= today && ad.endDate >= today;
    });

    if (validAds.length === 0) return null;

    // For now, just show the first valid ad, or could rotate them
    const ad = validAds[0];

    return (
        <div className="w-full bg-accent/10 border border-accent/20 rounded-xl p-6 mt-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1 block">Sponsored</span>
                <h3 className="text-xl font-bold text-slate-800">{ad.title}</h3>
                <p className="text-slate-600">{ad.content}</p>
            </div>
            <button className="px-6 py-2 bg-accent text-white font-semibold rounded-lg hover:bg-yellow-600 transition shadow-sm whitespace-nowrap">
                Learn More
            </button>
        </div>
    );
}
