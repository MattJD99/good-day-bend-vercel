import { NextResponse } from 'next/server';

export async function POST(request) {
    const formData = await request.json();
    const apiKey = process.env.NEXT_PUBLIC_GHL_API_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6ImxqYlhnaWdKZnF4enNQckU0a3FwIiwidmVyc2lvbiI6MSwiaWF0IjoxNzU2NzE0NjA0MjU0LCJzdWIiOiJOSjIwN2hId2ZXVVRrZVdnSDNjOSJ9.Giu8htyy0Mujg14_OIDO6t4NI4K2vcfKqA78q3xQDso";

    console.log("Received business signup form data:", formData);

    try {
        const GHL_API_ENDPOINT = 'https://services.leadconnectorhq.com/contacts/';
        const response = await fetch(GHL_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Version': '2021-07-28'
            },
            body: JSON.stringify({
                firstName: formData.name.split(' ')[0],
                lastName: formData.name.split(' ').slice(1).join(' ') || 'N/A',
                email: formData.email,
                phone: formData.phone,
                businessName: formData.businessName,
                website: formData.website,
                tags: ['Website Lead', 'Business Signup', 'Business Signup Form']
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        console.log("Successfully submitted to GHL API");

        return NextResponse.json({ success: true, message: "Thank you for joining our community! We will be in touch shortly." });

    } catch (error) {
        console.error("GHL API submission error:", error);
        return NextResponse.json({ success: false, message: "Submission failed. Please try again." }, { status: 500 });
    }
}
