import React from 'react';
import { Share2 } from 'lucide-react';

export default function ShareButton({ title, text, url }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title || document.title,
                    text: text || "Check out this project!",
                    url: url || window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(url || window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition"
            title="Share"
        >
            <Share2 size={18} />
            <span className="text-sm font-medium">Share</span>
        </button>
    );
}
