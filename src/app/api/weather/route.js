// src/app/api/weather/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');

  if (!location) {
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 }
    );
  }

  try {
    // Step 1: Convert Location Name to Latitude and Longitude
    const geocodeApiKey = process.env.GEOCODE_API_KEY;
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      location
    )}&key=${geocodeApiKey}`;

    console.log("Fetching coordinates from:", geocodeUrl);
    const geocodeResponse = await fetch(geocodeUrl);
    const geocodeData = await geocodeResponse.json();

    if (!geocodeResponse.ok || !geocodeData.results?.length) {
      console.error("Geocode Error:", geocodeData);
      return NextResponse.json(
        { error: "Unable to find location coordinates" },
        { status: 404 }
      );
    }

    const { lat, lng } = geocodeData.results[0].geometry;
    console.log(`Coordinates for ${location}:`, { lat, lng });

    // Step 2: Fetch Weather Data Using Latitude and Longitude
    const weatherApiKey = process.env.WEATHER_API_KEY;
    
    // Exactly matching the working curl command format
    const weatherUrl = new URL('https://api.tomorrow.io/v4/weather/forecast');
    weatherUrl.searchParams.append('location', `${lat},${lng}`);
    weatherUrl.searchParams.append('apikey', weatherApiKey);

    const options = {
      method: 'GET'
    };

    console.log("Fetching weather from:", weatherUrl.toString());
    const weatherResponse = await fetch(weatherUrl.toString(), options);
    console.log("Weather Response Status:", weatherResponse.status);
    
    const weatherData = await weatherResponse.json();
    console.log("Weather API Response:", weatherData);

    if (!weatherResponse.ok) {
      console.error("Weather API Error:", weatherData);
      return NextResponse.json(
        { error: weatherData.message || "API error" },
        { status: weatherResponse.status }
      );
    }

    const forecast = weatherData.timelines.daily[0].values;
    console.log(forecast);
    
    return NextResponse.json({
      temperatureMax: forecast.temperatureMax,
      temperatureMin: forecast.temperatureMin,
      temperatureAvg: forecast.temperatureAvg,
      uvIndexMax: forecast.uvIndexMax,
      uvIndexMin: forecast.uvIndexMin,
      uvIndexAvg: forecast.uvIndexAvg,
      visibilityAvg: forecast.visibilityAvg,
      visibilityMin: forecast.visibilityMin,
      visibilityMax: forecast.visibilityMax,
      windGustAvg: forecast.windGustAvg,
      windGustMax: forecast.windGustMax,
      windGustMin: forecast.windGustMin,
      sunriseTime: forecast.sunriseTime,
      sunsetTime: forecast.sunsetTime,
      
      description: forecast.weatherCodeMax || forecast.weatherCode,
    });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data", details: error.message },
      { status: 500 }
    );
  }
}