import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold text-primary">RK Portfolio</Link>
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex space-x-8">
                            <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">Home</Link>
                            <Link to="/#services" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">Services</Link>
                            <Link to="/#about" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">About</Link>
                            <Link to="/login" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm">Admin</Link>
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-primary">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Home</Link>
                            <Link to="/#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">Services</Link>
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50">Admin Panel</Link>
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-slate-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>© {new Date().getFullYear()} Ravindra Khillare. All rights reserved.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        {/* Social links placeholder */}
                        <span className="text-slate-400">Digital Education & Technology</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
