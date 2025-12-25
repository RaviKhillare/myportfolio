import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { DataService } from '../services/DataService';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState('details'); // details | chat
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", sender: "bot" }
    ]);

    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        if (userDetails.name) setStep('chat');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        const newMessages = [...messages, { text: message, sender: "user" }];
        setMessages(newMessages);

        // Save to backend including user details
        const fullMessage = `[${userDetails.name} (${userDetails.email || 'No Email'})]: ${message}`;
        await DataService.addMessage(fullMessage);

        setMessage('');

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thanks for reaching out! I'll get back to you shortly.",
                sender: "bot"
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Search/Chat Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-primary/50 transition-all hover:scale-110"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="bg-primary p-4 text-white">
                        <h3 className="font-bold flex items-center gap-2">
                            <MessageCircle size={20} /> Chat with Me
                        </h3>
                        <p className="text-xs text-primary-foreground/80">I usually reply within an hour</p>
                    </div>

                    <div className="h-96 flex flex-col">
                        {step === 'details' ? (
                            <div className="flex-1 p-6 flex flex-col justify-center">
                                <p className="text-slate-600 mb-4 text-sm">Please provide your details so I can get back to you.</p>
                                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                                        <input
                                            className="w-full border p-2 rounded mt-1 text-sm outline-none focus:border-primary"
                                            placeholder="John Doe"
                                            required
                                            value={userDetails.name}
                                            onChange={e => setUserDetails({ ...userDetails, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase">Email (Optional)</label>
                                        <input
                                            className="w-full border p-2 rounded mt-1 text-sm outline-none focus:border-primary"
                                            placeholder="john@example.com"
                                            value={userDetails.email}
                                            onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary/90">
                                        Start Chat
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
                                    {messages.map((msg, idx) => (
                                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                                    ? 'bg-primary text-white rounded-br-none'
                                                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'
                                                }`}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex gap-2">
                                    <input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!message.trim()}
                                        className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                    >
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
