'use client';

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BusinessSignupPage = () => {
    const [formData, setFormData] = useState({ name: '', businessName: '', email: '', phone: '', website: '' });
    const [submissionStatus, setSubmissionStatus] = useState({ loading: false, success: false, message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus({ loading: true, success: false, message: '' });

        try {
            const response = await fetch('/api/business-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setSubmissionStatus({ loading: false, success: result.success, message: result.message });

        } catch (error) {
            console.error("Form submission error:", error);
            setSubmissionStatus({ loading: false, success: false, message: "An unexpected error occurred. Please try again." });
        }
    };

    return (
        <div className="bg-white">
            <Header />
            <div className="min-h-screen bg-stone-100 pt-24 pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
                        <h1 className="text-4xl font-bold text-stone-800 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>Join the Community</h1>
                        <p className="mt-4 text-stone-600 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>Become a part of the Good Day Bend network. Fill out your details below to get started.</p>

                        <div className="mt-10">
                            {submissionStatus.message ? (
                                <div className={`p-6 rounded-3xl text-center ${submissionStatus.success ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                    <p className="font-bold text-lg text-white" style={{ fontFamily: 'Roboto, sans-serif' }}>{submissionStatus.message}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Your Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            id="name" 
                                            required 
                                            value={formData.name}
                                            onChange={handleChange} 
                                            className="w-full p-4 bg-white text-gray-900 rounded-3xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
                                            style={{ fontFamily: 'Roboto, sans-serif' }}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="businessName" className="block text-sm font-medium text-stone-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Business Name</label>
                                        <input 
                                            type="text" 
                                            name="businessName" 
                                            id="businessName" 
                                            required 
                                            value={formData.businessName}
                                            onChange={handleChange} 
                                            className="w-full p-4 bg-white text-gray-900 rounded-3xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
                                            style={{ fontFamily: 'Roboto, sans-serif' }}
                                            placeholder="Enter your business name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            required 
                                            value={formData.email}
                                            onChange={handleChange} 
                                            className="w-full p-4 bg-white text-gray-900 rounded-3xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
                                            style={{ fontFamily: 'Roboto, sans-serif' }}
                                            placeholder="Enter your email address"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Phone Number</label>
                                        <input 
                                            type="tel" 
                                            name="phone" 
                                            id="phone" 
                                            value={formData.phone}
                                            onChange={handleChange} 
                                            className="w-full p-4 bg-white text-gray-900 rounded-3xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
                                            style={{ fontFamily: 'Roboto, sans-serif' }}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-medium text-stone-700 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Business Website</label>
                                        <input 
                                            type="url" 
                                            name="website" 
                                            id="website" 
                                            value={formData.website}
                                            onChange={handleChange} 
                                            className="w-full p-4 bg-white text-gray-900 rounded-3xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
                                            style={{ fontFamily: 'Roboto, sans-serif' }}
                                            placeholder="Enter your website URL (optional)"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={submissionStatus.loading} 
                                        className="w-full bg-blue-600 text-white py-4 rounded-3xl font-medium hover:bg-blue-700 transition-all duration-200 disabled:bg-stone-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                        style={{ fontFamily: 'Roboto, sans-serif' }}
                                    >
                                        {submissionStatus.loading ? 'Submitting...' : 'Join Now'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BusinessSignupPage;
