import React, { useEffect, useState } from 'react';
import * as Icons from 'lucide-react';
import { DataService } from '../services/DataService';

export default function FloatingSocials() {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        const loadLinks = async () => {
            const data = await DataService.get();
            if (data.config && data.config.socialLinks) {
                setLinks(data.config.socialLinks);
            }
        };
        loadLinks();
    }, []);

    if (links.length === 0) return null;

    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2 p-2 bg-white/10 backdrop-blur-md rounded-l-xl border border-r-0 border-white/20 shadow-lg">
            {links.map((link) => {
                const Icon = Icons[link.icon] || Icons.Link;
                return (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white text-slate-700 hover:text-primary hover:scale-110 transition-all rounded-lg shadow-sm"
                        title={link.platform}
                    >
                        <Icon size={20} />
                    </a>
                );
            })}
        </div>
    );
}
