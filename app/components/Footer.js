'use client';

import React, { useState } from 'react';

const Footer = ({ onFormSubmit, submissionStatus }) => {
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onFormSubmit) {
            onFormSubmit(formData);
        }
    };

    // Default submission status if not provided
    const defaultSubmissionStatus = { loading: false, success: false, message: '' };
    const status = submissionStatus || defaultSubmissionStatus;

    return (
        <footer id="contact" className="bg-stone-800 text-white">
            <div className="container mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-4xl font-bold font-serif">Stay Connected</h2>
                        <p className="mt-4 text-stone-300">Get the best of Bend delivered to your inbox. Sign up for our newsletter for weekly event highlights, giveaways, and good news.</p>
                        <div className="mt-8 flex space-x-4">
                            {/* Add social links here */}
                        </div>
                    </div>
                    <div>
                        {status.message ? (
                            <div className={`p-6 rounded-lg text-center ${status.success ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                <p className="font-bold text-lg">{status.message}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input 
                                    type="text" 
                                    name="name" 
                                    placeholder="Your Name" 
                                    required 
                                    value={formData.name}
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-stone-700 rounded-2xl border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-stone-400"
                                />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Your Email" 
                                    required 
                                    value={formData.email}
                                    onChange={handleChange} 
                                    className="w-full p-3 bg-stone-700 rounded-2xl border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-white placeholder-stone-400"
                                />
                                <button 
                                    type="submit" 
                                    disabled={status.loading} 
                                    className="w-full bg-amber-500 py-3 rounded-2xl font-semibold hover:bg-amber-600 transition-colors disabled:bg-stone-500 text-white"
                                >
                                    {status.loading ? 'Submitting...' : 'Subscribe'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="mt-16 border-t border-stone-700 pt-8 text-center text-stone-400">
                    <p>© {new Date().getFullYear()} Good Day Bend. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
