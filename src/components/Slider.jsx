import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Slider({ slides }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!slides || slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds

        return () => clearInterval(interval);
    }, [slides]);

    if (!slides || slides.length === 0) return null;

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative w-full h-64 md:h-80 bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden shadow-xl text-white flex items-center justify-center">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-10">
                <button onClick={prevSlide} className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur transition">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur transition">
                    <ChevronRight size={24} />
                </button>
            </div>

            <div className="text-center px-12 max-w-4xl transition-all duration-500 ease-in-out transform">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                    {slides[current].text}
                </h2>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${idx === current ? 'bg-white' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
}
