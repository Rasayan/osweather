// src/app/weather/page.js
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Weather() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    } else {
      setLoading(false);
    }
  }, [location]);

  const fetchWeatherData = async (location) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/weather?location=${encodeURIComponent(location)}`
      );

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || 'Failed to fetch weather data'
        );
      }

      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className='w-screen h-screen flex justify-center items-center text-4xl italic font-medium'>Loading...</div>;
  }

  if (error) {
    return <div className='w-screen h-screen flex justify-center items-center text-4xl italic font-medium'>Error: {error}</div>;
  }

  if (!location) {
    return <div className='w-screen h-screen flex justify-center items-center text-4xl text-red-500 font-medium'>Please provide a location</div>;
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {weatherData && (
        

        <div className='w-[90%] h-95vh flex flex-col justify-start items-center gap-10'>
          <div className='w-[95%] h-[20vh] rounded-lg flex flex-col justify-between items-start gap-10 border px-2'>
            <h2 className='text-6xl font-bold'>Weather for {location}</h2>

            <div className='w-fit h-fit flex flex-col justify-center items-start'>
              <p className='text-5xl font-extrabold text-white'>{weatherData.temperatureAvg}°C</p>
              <p className='text-3xl'>{weatherData.temperatureMin} / {weatherData.temperatureMax}</p>
            </div> 
          </div>

          <div className='w-[95%] h-[20vh] rounded-lg flex justify-between items-start'>
            <div 
            className='w-[20%] h-[20vh] rounded-lg flex flex-col justify-between items-start 
            gap-10 border border-black hover:border-yellow-900 px-2 bg-gradient-to-r from-teal-400 to-blue-500 duration-100'>
              <h2 className='text-3xl font-bold text-black'>UV Index</h2>

              <div className='w-fit h-fit flex flex-col justify-center items-start text-black'>
                <p className='text-4xl font-extrabold'>{weatherData.uvIndexAvg}</p>
                <p className='text-2xl'>Max - {weatherData.uvIndexMax} / Min - {weatherData.uvIndexMin}</p>
              </div> 
            </div>

            <div className='w-[20%] h-[20vh] rounded-lg flex flex-col justify-between items-start 
            gap-10 border border-black hover:border-yellow-900 bg-gradient-to-r from-orange-400 to-purple-600 duration-100 px-2'>
              <h2 className='text-3xl font-bold text-black'>Visibility</h2>

              <div className='w-fit h-fit flex flex-col justify-center items-start text-black'>
                <p className='text-4xl font-extrabold'>{weatherData.visibilityAvg} KMs</p>
                <p className='text-xl'>Max - {weatherData.visibilityMax} KMs / Min - {weatherData.visibilityMin} KMs</p>
              </div> 
            </div>

            <div 
            className='w-[20%] h-[20vh] rounded-lg flex flex-col justify-between items-start 
            gap-10 border border-black hover:border-yellow-900 bg-gradient-to-r from-green-400 to-emerald-600 duration-100 px-2'>
              <h2 className='text-3xl font-bold text-black'>Wind Speed</h2>

              <div className='w-fit h-fit flex flex-col justify-center items-start text-black'>
                <p className='text-4xl font-extrabold'>{weatherData.windGustAvg} m/s</p>
                <p className='text-xl'>Max - {weatherData.windGustMax} m/s / Min - {weatherData.windGustMin} m/s</p>
              </div> 
            </div>

            <div className='w-[20%] h-[20vh] rounded-lg flex flex-col justify-center items-start gap-10 px-2'>
              <div className='flex flex-col justify-center items-start'>
                <h6 className='text-xl font-bold flex justify-start'>Sunrise</h6>
                <p className='font-normal text-2xl'>{weatherData.sunriseTime}</p>
              </div>
              <div className='flex flex-col justify-center items-start'>
                <h6 className='text-xl font-bold flex justify-start'>Sunset</h6>
                <p className='font-normal text-2xl'>{weatherData.sunsetTime}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col justify-center items-center'>
            <p className='text-lg italic'>Sorry if the data is incorrect, free API it is!</p>
            <p>Shoutout to <a href="https://app.tomorrow.io/home" className='text-blue-400'>Tomorrow.io</a></p>
          </div>
          
          
        </div>
      )}
    </div>
  );
}