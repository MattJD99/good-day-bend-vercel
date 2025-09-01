'use client'; // This directive indicates that this is a client-side component in Next.js App Router

import React, { useState, useEffect } from 'react';

// --- MOCK API & SERVER-SIDE LOGIC ---
// In a real Next.js project, the following two functions would be in separate files
// inside the `pages/api/` directory (e.g., `pages/api/events.js` and `pages/api/contact.js`).
// I am including them here to provide the complete, functional logic in one file.

/**
 * MOCK SERVER-SIDE FUNCTION: /api/events
 * Fetches and consolidates events from multiple RSS feeds.
 * @param {string[]} feedUrls - An array of RSS feed URLs to fetch.
 * @returns {Promise<object[]>} A promise that resolves to an array of event objects.
 */
const fetchEventsFromFeeds = async (feedUrls) => {
    // In a real backend, you would use a library like 'rss-parser'.
    // For this demonstration, we'll simulate a fetch with mock data.
    console.log("Fetching events from:", feedUrls);
    // MOCK DATA - Replace this logic with actual fetching and parsing.
    const mockEvents = [
        { title: "Annual Cruxapalooza", link: "#", date: new Date(), source: "Crux Fermentation", description: "Celebrate craft beer, live music, and good times at this annual festival." },
        { title: "NWX Farmer Market", link: "#", date: new Date(Date.now() + 86400000), source: "NW Crossing", description: "Fresh local produce, artisan goods, and community vibes." },
        { title: "Deschutes River Cleanup", link: "#", date: new Date(Date.now() + 172800000), source: "Visit Bend", description: "Join the community in keeping our beautiful river clean and pristine." },
        { title: "Live Music at The Volcanic", link: "#", date: new Date(Date.now() + 259200000), source: "Bend Source", description: "Local bands take the stage for a night of incredible music." },
        { title: "Kids Entrepreneur Market", link: "#", date: new Date(Date.now() + 345600000), source: "DIY Cave", description: "Support young entrepreneurs and discover amazing kid-made products." },
    ];
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockEvents;
};


/**
 * MOCK SERVER-SIDE FUNCTION: /api/contact
 * Handles form submissions and sends data to GoHighLevel.
 * @param {object} formData - The data from the contact form.
 * @param {string} apiKey - The GoHighLevel API Key.
 * @returns {Promise<{success: boolean, message: string}>} A promise indicating success or failure.
 */
const submitContactToGHL = async (formData, apiKey) => {
    console.log("Submitting to GHL with API Key:", apiKey ? "Key Provided" : "No Key");
    console.log("Form Data:", formData);
    
    // This is where you would make a POST request to the GHL API.
    // const GHL_API_ENDPOINT = 'https://services.leadconnectorhq.com/contacts/';
    // const response = await fetch(GHL_API_ENDPOINT, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${apiKey}`,
    //         'Content-Type': 'application/json',
    //         'Version': '2021-07-28'
    //     },
    //     body: JSON.stringify({
    //         firstName: formData.name.split(' ')[0],
    //         lastName: formData.name.split(' ').slice(1).join(' ') || 'N/A',
    //         email: formData.email,
    //         phone: formData.phone,
    //         website: formData.website,
    //         tags: ['Website Lead', 'Newsletter Signup']
    //     })
    // });
    
    // Mocking the API response for demonstration.
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (formData.email && apiKey) {
        return { success: true, message: "Thank you for connecting!" };
    } else {
        return { success: false, message: "Submission failed. Please try again." };
    }
};


// --- UI COMPONENTS ---

const Header = ({ setActivePage }) => (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm fixed w-full top-0 z-50 transition-all duration-300">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActivePage('home')}>
                <svg className="w-10 h-10 text-stone-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M2 7L12 12M12 12L22 7M12 12V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="font-bold text-xl text-stone-800 font-serif">Good Day Bend</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 font-medium text-stone-600">
                <a onClick={() => setActivePage('home')} className="cursor-pointer hover:text-amber-600 transition-colors">Home</a>
                <a onClick={() => setActivePage('calendar')} className="cursor-pointer hover:text-amber-600 transition-colors">Calendar</a>
                <a onClick={() => setActivePage('business')} className="cursor-pointer hover:text-amber-600 transition-colors">For Businesses</a>
                <a onClick={() => setActivePage('creators')} className="cursor-pointer hover:text-amber-600 transition-colors">For Creators</a>
            </div>
            <a href="#contact" className="hidden md:block bg-stone-800 text-white px-5 py-2 rounded-full font-semibold hover:bg-stone-700 transition-transform hover:scale-105">
                Get In Touch
            </a>
        </nav>
    </header>
);

const HeroSection = () => (
    <section className="min-h-screen bg-amber-50 flex items-center pt-24 md:pt-0">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-stone-800 font-serif leading-tight">
                Discover What's Good in <span className="text-amber-600">Bend</span>.
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-2xl mx-auto">
                Your daily guide to authentic local events, stories, and experiences. We celebrate what makes this place special—for locals, by locals.
            </p>
            <div className="mt-10 flex justify-center gap-4">
                <a href="#events" className="bg-stone-800 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-stone-700 transition-transform hover:scale-105 shadow-lg">
                    See Today's Events
                </a>
            </div>
        </div>
    </section>
);

const PromotedEvents = () => {
    const promotions = [
        { name: "The Ale Apothecary", deal: "Exclusive Tasting Flight", bg: "bg-emerald-700" },
        { name: "Worthy Brewing", deal: "Star Gazing Party", bg: "bg-indigo-700" },
        { name: "Bend Rock Gym", deal: "Family Climb Night", bg: "bg-rose-700" },
    ];

    return (
        <section className="py-20 bg-stone-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-stone-800 font-serif">Community Spotlights</h2>
                    <p className="mt-4 text-stone-600">A special thank you to our partners for helping us keep the good news flowing.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {promotions.map(promo => (
                        <div key={promo.name} className={`rounded-2xl p-8 text-white flex flex-col justify-between shadow-xl transform hover:-translate-y-2 transition-transform duration-300 ${promo.bg}`}>
                            <div>
                                <h3 className="text-2xl font-bold font-serif">{promo.name}</h3>
                                <p className="mt-2 text-lg opacity-90">{promo.deal}</p>
                            </div>
                            <a href="#" className="mt-6 bg-white/20 text-white px-5 py-2 rounded-full font-semibold self-start hover:bg-white/30 transition-colors">Learn More</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const EventsFeed = ({ events, loading }) => (
    <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                 <h2 className="text-4xl font-bold text-stone-800 font-serif">Happening in Bend</h2>
                 <p className="mt-4 text-stone-600">Always current. Automatically updated every day.</p>
            </div>
            <div className="space-y-6 max-w-4xl mx-auto">
                {loading ? (
                    <p className="text-center text-stone-500">Fetching the latest events...</p>
                ) : (
                    events.map((event, index) => (
                        <div key={index} className="bg-stone-50 rounded-xl p-6 flex flex-col md:flex-row items-start gap-6 transition-shadow hover:shadow-lg">
                             <div className="w-full md:w-40 text-left md:text-right">
                                <p className="font-bold text-amber-600">{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(event.date)}</p>
                                <p className="text-stone-500 text-sm">{event.source}</p>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-stone-800">{event.title}</h3>
                                <p className="mt-2 text-stone-600">{event.description}</p>
                                <a href={event.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-amber-700 hover:text-amber-600">View Event →</a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </section>
);

const CalendarView = ({ events }) => (
    <div className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-stone-800 font-serif">Event Calendar</h2>
                <p className="mt-4 text-stone-600">A monthly view of what's happening in Bend.</p>
            </div>
            <div className="bg-stone-50 rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-stone-800">September 2025</h3>
                </div>
                {/* Note: This is a simplified static calendar for demonstration.
                A real implementation would use a library like 'react-big-calendar' */}
                <div className="grid grid-cols-7 gap-2 text-center">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="font-bold text-stone-500">{day}</div>)}
                    {Array.from({ length: 30 }).map((_, i) => {
                        const day = i + 1;
                        const event = events.find(e => e.date.getDate() === day);
                        return (
                            <div key={i} className={`p-4 rounded-lg h-24 flex flex-col items-start ${event ? 'bg-amber-100 border border-amber-200' : 'bg-white'}`}>
                                <span className="font-bold text-stone-700">{day}</span>
                                {event && <p className="text-xs mt-1 text-amber-800 truncate">{event.title}</p>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
);


const BusinessTiers = () => {
    const tiers = [
        { name: "Local Listing", price: "Free", features: ["Interactive Map Listing", "Submit events for consideration", "Access to business newsletter"], cta: "Get Listed" },
        { name: "Bend Builder", price: "$29/mo", features: ["Everything in Free, plus:", "1 guaranteed event feature/month", "Access to owner WhatsApp group", "Priority in guides & collabs"], cta: "Become a Builder", highlight: true },
        { name: "Local Legend", price: "$99/mo", features: ["Everything in Builder, plus:", "1 guaranteed event feature/week", "Annual short-form video", "Spotlight map placement", "Annual blog feature & invites"], cta: "Become a Legend" },
    ];
    return (
        <section className="py-20 bg-stone-100">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-stone-800 font-serif">Grow With Us</h2>
                <p className="mt-4 text-stone-600 max-w-2xl mx-auto">Built for visibility, growth, and community connection. Join the network of businesses that make Bend special.</p>
                <div className="mt-12 grid md:grid-cols-3 gap-8">
                    {tiers.map(tier => (
                        <div key={tier.name} className={`bg-white rounded-2xl p-8 text-left flex flex-col shadow-lg ${tier.highlight ? 'border-4 border-amber-500' : ''}`}>
                            <h3 className="text-2xl font-bold text-stone-800 font-serif">{tier.name}</h3>
                            <p className="text-4xl font-bold text-stone-800 mt-4">{tier.price}</p>
                            <ul className="mt-6 space-y-3 text-stone-600 flex-grow">
                                {tier.features.map(f => <li key={f} className="flex items-start"><span className="text-amber-500 mr-2">✓</span>{f}</li>)}
                            </ul>
                            <a href="#contact" className={`mt-8 w-full text-center py-3 rounded-full font-semibold ${tier.highlight ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-stone-800 text-white hover:bg-stone-700'}`}>{tier.cta}</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

const CreatorCollective = () => (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                 <h2 className="text-4xl font-bold text-stone-800 font-serif">The Creator Collective</h2>
                 <p className="mt-4 text-stone-600 max-w-2xl mx-auto">This is not an influencer program. We’re building a trusted group of local storytellers who love our town as much as we do.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                <div className="bg-stone-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-stone-800 font-serif mb-4">Creator Perks</h3>
                    <ul className="space-y-3 text-stone-600">
                        <li className="flex"><span className="text-amber-500 mr-2">✓</span>Exclusive access to collabs</li>
                        <li className="flex"><span className="text-amber-500 mr-2">✓</span>Monthly content outings</li>
                        <li className="flex"><span className="text-amber-500 mr-2">✓</span>Private networking group chat</li>
                        <li className="flex"><span className="text-amber-500 mr-2">✓</span>Featured profile on our website</li>
                    </ul>
                </div>
                 <div className="bg-stone-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-stone-800 font-serif mb-4">What We Ask</h3>
                    <ul className="space-y-3 text-stone-600">
                        <li className="flex"><span className="text-amber-500 mr-2">✓</span>Passion for Central Oregon</li>
                        <li className="flex"><span className="text-amber-500 mr-2">✓</span>Experience with short-form video</li>
                        <li className="flex"><span className="text-amber-500 mr-2">✓</span>A positive, community-aligned vibe</li>
                        <li className="flex"><span className="text-amber-500 mr-2">✓</span>Help us make social media fun!</li>
                    </ul>
                </div>
            </div>
            <div className="text-center mt-12">
                <a href="#contact" className="bg-stone-800 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-stone-700 transition-transform hover:scale-105 shadow-lg">Apply to Join</a>
            </div>
        </div>
    </section>
);

const AboutSection = () => (
    <section className="py-20 bg-stone-100">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-stone-800 font-serif">Our Foundations</h2>
            <div className="mt-8 max-w-2xl mx-auto">
                 <h3 className="text-2xl font-bold text-stone-700 mb-2 font-serif">Mission</h3>
                 <p className="text-stone-600">To uplift the Bend community through local stories, authentic experiences, and a joyful platform that celebrates what makes this place so special.</p>
            </div>
            <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-stone-800">Community First.</h4>
                    <p className="text-stone-600 mt-1">Our network is built by people who love this place. Every business, creator, and event reflects that shared pride.</p>
                </div>
                <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-bold text-lg text-stone-800">Only Good News. Always.</h4>
                    <p className="text-stone-600 mt-1">No politics, no negativity—just the best of Bend.</p>
                </div>
            </div>
        </div>
    </section>
);

const Footer = ({ onFormSubmit, submissionStatus }) => {
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(formData);
    };

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
                        {submissionStatus.message ? (
                            <div className={`p-6 rounded-lg text-center ${submissionStatus.success ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                                <p className="font-bold text-lg">{submissionStatus.message}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} className="w-full p-3 bg-stone-700 rounded-lg border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                                <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} className="w-full p-3 bg-stone-700 rounded-lg border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
                                <button type="submit" disabled={submissionStatus.loading} className="w-full bg-amber-500 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:bg-stone-500">
                                    {submissionStatus.loading ? 'Submitting...' : 'Subscribe'}
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

// --- MAIN APP COMPONENT ---

export default function GoodDayBendApp() {
    const [activePage, setActivePage] = useState('home');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submissionStatus, setSubmissionStatus] = useState({ loading: false, success: false, message: '' });

    // ACTION REQUIRED: Add your RSS feed URLs here.
    const RSS_FEED_URLS = [
    'https://www.visitbend.com/feed/',
    'https://www.bendsource.com/bend/Rss.xml',
    'https://cascadebusnews.com/feed/',
    'https://ktvz.com/category/community-calendar/feed/'
];

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            const fetchedEvents = await fetchEventsFromFeeds(RSS_FEED_URLS);
            setEvents(fetchedEvents);
            setLoading(false);
        };
        loadEvents();
    }, []);

    const handleFormSubmit = async (formData) => {
        setSubmissionStatus({ loading: true, success: false, message: '' });
        // ACTION REQUIRED: Set this GHL_API_KEY in your Vercel Environment Variables
        const apiKey = process.env.NEXT_PUBLIC_GHL_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6ImxqYlhnaWdKZnF4enNQckU0a3FwIiwidmVyc2lvbiI6MSwiaWF0IjoxNzU2NzE0NjA0MjU0LCJzdWIiOiJOSjIwN2hId2ZXVVRrZVdnSDNjOSJ9.Giu8htyy0Mujg14_OIDO6t4NI4K2vcfKqA78q3xQDso";
        const result = await submitContactToGHL(formData, apiKey);
        setSubmissionStatus({ loading: false, success: result.success, message: result.message });
    };

    const renderPage = () => {
        switch (activePage) {
            case 'calendar':
                return <CalendarView events={events} />;
            case 'business':
                return <BusinessTiers />;
            case 'creators':
                return <CreatorCollective />;
            case 'home':
            default:
                return (
                    <>
                        <HeroSection />
                        <PromotedEvents />
                        <EventsFeed events={events} loading={loading} />
                        <AboutSection />
                        <BusinessTiers />
                        <CreatorCollective />
                    </>
                );
        }
    };

    return (
        <div className="bg-white">
            <Header setActivePage={setActivePage} />
            <main className="pt-20">
                {renderPage()}
            </main>
            <Footer onFormSubmit={handleFormSubmit} submissionStatus={submissionStatus} />
        </div>
    );
}
