'use client';

import React, { useState } from 'react';

const BusinessSignupPage = () => {
    const [formData, setFormData] = useState({ name: '', businessName: '', email: '', phone: '', website: '' });
    const [submissionStatus, setSubmissionStatus] = useState({ loading: false, success: false, message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus({ loading: true, success: false, message: '' });

        // MOCK API SUBMISSION
        console.log("Submitting business signup form:", formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        const result = { success: true, message: "Thank you for joining our community! We will be in touch shortly." };

        setSubmissionStatus({ loading: false, success: result.success, message: result.message });
    };

    return (
        <div className="min-h-screen bg-stone-100 py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-stone-800 font-serif text-center">Join the Community</h1>
                    <p className="mt-4 text-stone-600 text-center">Become a part of the Good Day Bend network. Fill out your details below to get started.</p>

                    <div className="mt-10">
                        {submissionStatus.message ? (
                            <div className={`p-6 rounded-lg text-center ${submissionStatus.success ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                <p className="font-bold text-lg text-white">{submissionStatus.message}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-stone-700">Your Name</label>
                                    <input type="text" name="name" id="name" required onChange={handleChange} className="mt-1 w-full p-3 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                                </div>
                                <div>
                                    <label htmlFor="businessName" className="block text-sm font-medium text-stone-700">Business Name</label>
                                    <input type="text" name="businessName" id="businessName" required onChange={handleChange} className="mt-1 w-full p-3 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email Address</label>
                                    <input type="email" name="email" id="email" required onChange={handleChange} className="mt-1 w-full p-3 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700">Phone Number</label>
                                    <input type="tel" name="phone" id="phone" onChange={handleChange} className="mt-1 w-full p-3 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                                </div>
                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium text-stone-700">Business Website</label>
                                    <input type="url" name="website" id="website" onChange={handleChange} className="mt-1 w-full p-3 bg-stone-50 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                                </div>
                                <button type="submit" disabled={submissionStatus.loading} className="w-full bg-stone-800 text-white py-3 rounded-lg font-semibold hover:bg-stone-700 transition-colors disabled:bg-stone-500">
                                    {submissionStatus.loading ? 'Submitting...' : 'Join Now'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessSignupPage;
