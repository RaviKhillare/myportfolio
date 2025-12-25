import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { DataService } from '../services/DataService';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        DataService.addMessage({
            text: message,
            sender: 'Guest User'
        });

        setSent(true);
        setMessage('');
        setTimeout(() => {
            setSent(false);
            setIsOpen(false);
        }, 2000); // Close after showing success
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary hover:bg-secondary text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-primary p-4 flex justify-between items-center text-white">
                        <h3 className="font-semibold">Chat with Us</h3>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1"><X size={20} /></button>
                    </div>

                    <div className="p-4 h-64 flex flex-col justify-between bg-slate-50">
                        {sent ? (
                            <div className="flex-1 flex items-center justify-center text-center text-green-600 animate-in zoom-in">
                                <div>
                                    <div className="text-4xl mb-2">✓</div>
                                    <p className="font-medium">Message sent!</p>
                                    <p className="text-sm text-slate-500">We'll get back to you soon.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                                    <div className="bg-slate-200 rounded-lg p-3 rounded-tl-none max-w-[85%] text-sm text-slate-700">
                                        Hi! I'm Ravindra's automated assistant. How can I help you regarding coding, robotics, or education?
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit} className="relative">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="w-full pl-4 pr-10 py-3 rounded-full border border-slate-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                                    />
                                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-primary p-1.5 hover:bg-slate-100 rounded-full">
                                        <Send size={18} />
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
