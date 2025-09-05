import { NextResponse } from 'next/server';

import { jwtDecode } from 'jwt-decode';

export async function POST(request) {
    const formData = await request.json();
    
    // Use private environment variable for server-side API calls
    const apiKey = process.env.GHL_API_KEY;
    
    console.log("Received business signup form data:", formData);
    console.log("Using API key:", apiKey ? `${apiKey.substring(0, 20)}...` : 'No API key found');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.businessName) {
        console.error("Missing required fields");
        return NextResponse.json({ 
            success: false, 
            message: "Missing required fields. Please fill out all required fields." 
        }, { status: 400 });
    }

    try {
        // Get location ID from JWT payload
        const decoded = jwtDecode(process.env.GHL_API_KEY);
        const GHL_API_ENDPOINT = `https://services.leadconnectorhq.com/contacts/${decoded.location_id}`;
        
        const requestBody = {
            firstName: formData.name.split(' ')[0],
            lastName: formData.name.split(' ').slice(1).join(' ') || 'N/A',
            email: formData.email,
            phone: formData.phone || '',
            companyName: formData.businessName,
            website: formData.website || '',
            tags: ['Website Lead', 'Business Signup', 'Business Signup Form']
        };

        console.log("Sending to GHL API:", JSON.stringify(requestBody, null, 2));
        
        // Add required API version header
        const response = await fetch(GHL_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'Version': '2021-07-28',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const responseText = await response.text();
        console.log("GHL API Response Status:", response.status);
        console.log("GHL API Response Text:", responseText);

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.error("Failed to parse GHL API response:", parseError);
            data = { message: responseText };
        }

        if (!response.ok) {
            console.error("GHL API Error Response:", data);
            throw new Error(data.message || `API Error: ${response.status} - ${responseText}`);
        }

        console.log("Successfully submitted to GHL API:", data);

        return NextResponse.json({ 
            success: true, 
            message: "Thank you for joining our community! We will be in touch shortly." 
        });

    } catch (error) {
        console.error("GHL API submission error:", error.message);
        console.error("Full error:", error);
        
        // Return a more specific error message for debugging
        return NextResponse.json({ 
            success: false, 
            message: `Submission failed: ${error.message}. Please try again or contact support.` 
        }, { status: 500 });
    }
}
