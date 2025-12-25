import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function Slider({ slides }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!slides || slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [slides]);

    if (!slides || slides.length === 0) return null;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    const slide = slides[current];

    return (
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform hover:scale-105"
                style={{ backgroundImage: `url(${slide.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80'})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center px-4 md:px-16">
                <div className="max-w-2xl text-white space-y-6 animate-in slide-in-from-bottom-10 duration-700 fade-in">
                    <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/50 rounded-full text-primary-foreground text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                        Featured
                    </span>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                        {slide.title || "Welcome"}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-lg">
                        {slide.text}
                    </p>
                    {slide.link && (
                        <a
                            href={slide.link}
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition group-hover:translate-x-1"
                        >
                            Learn More <ArrowRight size={18} />
                        </a>
                    )}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-8 flex gap-2">
                <button onClick={prevSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white transition">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white transition">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-8 md:left-16 flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-8 bg-primary' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
}
