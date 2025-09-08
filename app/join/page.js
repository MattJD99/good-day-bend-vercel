import Link from 'next/link';

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Join Good Day Bend
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Connect your business with thousands of locals and visitors looking for events and experiences in Bend, Oregon.
            </p>
            <div className="mt-10">
              <Link
                href="/business-signup"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, effective, and designed to help your business thrive in Bend's vibrant community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Create Your Account</h3>
              <p className="text-gray-600">
                Sign up with your business information and verify your email address.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Add Your Events</h3>
              <p className="text-gray-600">
                Post your events, classes, workshops, or special promotions with photos and details.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Reach Your Audience</h3>
              <p className="text-gray-600">
                Get discovered by locals and tourists searching for things to do in Bend.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Join Good Day Bend?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Benefit 1 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Reach Targeted Audience</h3>
              </div>
              <p className="text-gray-600">
                Connect with people actively searching for events and experiences in Bend. Our platform attracts both locals and tourists looking for things to do.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Real-Time Updates</h3>
              </div>
              <p className="text-gray-600">
                Keep your audience informed with instant updates. Change event details, add new events, or cancel with just a few clicks.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Analytics & Insights</h3>
              </div>
              <p className="text-gray-600">
                Track how many people view and interact with your events. Understand what works best for your audience.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="ml-4 text-xl font-semibold text-gray-900">Verified Business Profiles</h3>
              </div>
              <p className="text-gray-600">
                Build trust with verified business profiles. Show customers you're a legitimate local business they can rely on.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Start free and upgrade as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Starter</h3>
                <p className="text-4xl font-bold text-gray-900 mb-4">Free</p>
                <p className="text-gray-600 mb-6">Perfect for small businesses just getting started</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 5 events per month
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic event details
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Verified business profile
                  </li>
                </ul>
                <Link
                  href="/business-signup"
                  className="w-full block text-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Get Started Free
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-blue-600 border border-blue-600 rounded-lg shadow-xl transform scale-105">
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white mb-4">
                  Most Popular
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Professional</h3>
                <p className="text-4xl font-bold text-white mb-4">$29<span className="text-lg font-normal">/month</span></p>
                <p className="text-blue-100 mb-6">For businesses ready to grow their reach</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Unlimited events</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Rich media support</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Priority placement</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">Analytics dashboard</span>
                  </li>
                </ul>
                <Link
                  href="/business-signup"
                  className="w-full block text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-4xl font-bold text-gray-900 mb-4">$99<span className="text-lg font-normal">/month</span></p>
                <p className="text-gray-600 mb-6">For large organizations with multiple venues</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Professional
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Multiple business locations
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    API access
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated support
                  </li>
                </ul>
                <Link
                  href="/business-signup"
                  className="w-full block text-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to grow your business?
            </h2>
            <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
              Join hundreds of Bend businesses already using Good Day Bend to reach their customers.
            </p>
            <div className="mt-8">
              <Link
                href="/business-signup"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: 'Join Good Day Bend - List Your Events & Grow Your Business',
    description: 'Connect your Bend, Oregon business with thousands of locals and visitors. List your events, reach your audience, and grow with Good Day Bend.',
    openGraph: {
      title: 'Join Good Day Bend - List Your Events & Grow Your Business',
      description: 'Connect your Bend, Oregon business with thousands of locals and visitors. List your events, reach your audience, and grow with Good Day Bend.',
      type: 'website',
    },
  };
}
