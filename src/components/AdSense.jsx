import React, { useEffect } from 'react';

export default function AdSense({ slotId, clientKey = "ca-pub-XXXXXXXXXXXXXXXX", style = {} }) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense Error", e);
        }
    }, []);

    return (
        <div className="my-8 text-center overflow-hidden">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client={clientKey}
                data-ad-slot={slotId}
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
            <p className="text-xs text-slate-300 mt-1">Advertisement</p>
        </div>
    );
}
