import { NextResponse } from 'next/server';

import { jwtDecode } from 'jwt-decode';

export async function POST(request) {
    const formData = await request.json();
    
    // Use private environment variable for server-side API calls
    const apiKey = process.env.GHL_API_KEY;
    
    console.log("Environment Variables:");
    console.log("GHL_API_KEY:", apiKey ? `${apiKey.substring(0, 20)}...` : 'MISSING');
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("Received business signup form data:", formData);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.businessName) {
        console.error("Missing required fields");
        return NextResponse.json({ 
            success: false, 
            message: "Missing required fields. Please fill out all required fields." 
        }, { status: 400 });
    }

    try {
    // Decode the JWT to get the location_id
    let locationId;
    try {
      // Ensure apiKey is a string
      if (typeof apiKey !== 'string') {
        throw new Error('GHL_API_KEY is not a valid string');
      }
      
      const decoded = jwtDecode(apiKey);
      locationId = decoded.location_id;
    } catch (error) {
      console.error('Error decoding API key:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid API key configuration: ' + error.message 
      }, { status: 500 });
    }

        if (!locationId) {
            throw new Error("Location ID not found in API key.");
        }

        // Use the correct GoHighLevel v2 API endpoint for creating a contact
        const GHL_API_ENDPOINT = `https://services.leadconnectorhq.com/contacts/`;
        
        const requestBody = {
            firstName: formData.name.split(' ')[0],
            lastName: formData.name.split(' ').slice(1).join(' ') || 'N/A',
            email: formData.email,
            phone: formData.phone || '',
            locationId: locationId, // Pass locationId in the request body
            companyName: formData.businessName,
            website: formData.website || '',
            tags: ['Website Lead', 'Business Signup', 'Business Signup Form']
        };

        console.log("Sending to GHL API v2:", JSON.stringify(requestBody, null, 2));
        
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
    console.log("Request details:", {
      endpoint: GHL_API_ENDPOINT,
      headers: {
        'Authorization': `Bearer [REDACTED]`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
        'Accept': 'application/json'
      },
      body: requestBody
    });

        return NextResponse.json({ 
            success: true, 
            message: "Thank you for joining our community! We will be in touch shortly." 
        });

    } catch (error) {
        console.error("GHL API submission error:", error.message);
        console.error("Full error:", error);
        
        // Return a more specific error message for debugging
        let userMessage = error.message || "Submission failed. Please try again or contact support.";
        // Hide server details in production
        if (process.env.NODE_ENV === 'production') {
          userMessage = "Submission failed. Please try again or contact support.";
        }
        return NextResponse.json({ 
            success: false, 
            message: userMessage 
        }, { status: 500 });
    }
}
