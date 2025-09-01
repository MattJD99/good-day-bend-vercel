'use client';

import React from 'react';
import Image from 'next/image';

const Header = ({ setActivePage, currentPage = 'home' }) => {
    const handleNavClick = (page, event) => {
        if (setActivePage) {
            event.preventDefault();
            setActivePage(page);
        }
    };

    return (
        <header className="bg-white/80 backdrop-blur-lg shadow-sm fixed w-full top-0 z-50 transition-all duration-300">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={(e) => handleNavClick('home', e)}>
                    <a href="/" className="flex items-center space-x-2">
                        <Image src="/good day bend logo.jpg" alt="Good Day Bend" width={40} height={40} />
                        <span className="font-bold text-xl text-stone-800 font-serif">Good Day Bend</span>
                    </a>
                </div>
                <div className="hidden md:flex items-center space-x-8 font-medium text-stone-600">
                    <a href="/" className="cursor-pointer hover:text-amber-600 transition-colors">Home</a>
                    <a onClick={(e) => handleNavClick('calendar', e)} className="cursor-pointer hover:text-amber-600 transition-colors">Calendar</a>
                    <a onClick={(e) => handleNavClick('business', e)} className="cursor-pointer hover:text-amber-600 transition-colors">For Businesses</a>
                    <a href="/business-signup" className="cursor-pointer hover:text-amber-600 transition-colors">Join</a>
                </div>
                <a href="#contact" className="hidden md:block bg-stone-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-stone-700 transition-transform hover:scale-105">
                    Get In Touch
                </a>
            </nav>
        </header>
    );
};

export default Header;
