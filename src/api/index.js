import { NextResponse } from 'next/server';
import axios from 'axios';

export async function getAQI(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
  }

  try {
    const apiUrl = `https://atlas.microsoft.com/weather/airQuality/current/json`;
    const subscriptionKey = process.env.MICROSOFT_SECONDARY_KEY;

    const response = await axios.get(apiUrl, {
      params: {
        "api-version": "1.1",
        query: `${lat},${lng}`,
        "subscription-key": subscriptionKey,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Failed to fetch AQI data:", error.message);
    return NextResponse.json(
      { error: 'Failed to fetch air quality data' }, 
      { status: error.response?.status || 500 }
    );
  }
}