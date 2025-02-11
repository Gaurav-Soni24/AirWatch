"use client";

import React, { useEffect, useState } from 'react';
import { useLocation } from '@/components/contexts/LocationContext';
import axios from 'axios';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import useColorMode from "@/hooks/useColorMode";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
  sunrise: number;
  sunset: number;
}

const WeatherDashboard: React.FC = () => {
  const { lat, lng, locationName } = useLocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [colorMode] = useColorMode();

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (lat === null || lng === null) {
        setError("Location data is not available. Please ensure you've selected a location.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b8bf61da6ffe2cdd969b0df05d40c897&units=metric`
        );

        setWeatherData({
          temperature: Math.round(response.data.main.temp),
          description: response.data.weather[0].description,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          feelsLike: Math.round(response.data.main.feels_like),
          icon: response.data.weather[0].icon,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
        });
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError("Failed to fetch weather data. Please try again later.");
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lng]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-16 text-red-500 bg-red-100 rounded-lg p-6 text-xl">{error}</div>;
  }

  if (!weatherData) {
    return <div className="text-center py-16 text-gray-500 text-xl">No weather data available</div>;
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 0) return 'text-blue-600';
    if (temp < 10) return 'text-cyan-500';
    if (temp < 20) return 'text-green-500';
    if (temp < 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark' : 'bg-white text-gray-800'} rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto transition-all duration-300`}>
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">{locationName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center md:justify-start">
          <img 
            src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
            alt={weatherData.description}
            className="w-40 h-40 filter drop-shadow-lg"
          />
          <div>
            <p className={`text-8xl font-bold ${getTemperatureColor(weatherData.temperature)}`}>{weatherData.temperature}°C</p>
            <p className="text-2xl capitalize mt-2">{weatherData.description}</p>
            <p className="text-xl mt-1">Feels like {weatherData.feelsLike}°C</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <WeatherDetail icon={<WiHumidity size={40} />} label="Humidity" value={`${weatherData.humidity}%`} />
          <WeatherDetail icon={<WiStrongWind size={40} />} label="Wind Speed" value={`${weatherData.windSpeed.toFixed(2)} m/s`} />
          <WeatherDetail icon={<FiSunrise size={32} />} label="Sunrise" value={formatTime(weatherData.sunrise)} />
          <WeatherDetail icon={<FiSunset size={32} />} label="Sunset" value={formatTime(weatherData.sunset)} />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Hourly Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['12 PM', '3 PM', '6 PM', '9 PM'].map((time, index) => {
            const tempForHour = Math.round(weatherData.temperature - index * 2);
            return (
              <div key={index} className={`${colorMode === 'dark' ? 'bg-boxdark-2' : 'bg-gray-100'} rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg`}>
                <p className="text-lg">{time}</p>
                <img 
                  src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt={weatherData.description}
                  className="w-16 h-16 mx-auto filter drop-shadow"
                />
                <p className={`text-xl font-semibold ${getTemperatureColor(tempForHour)}`}>{tempForHour}°C</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WeatherDetail: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => {
  const [colorMode] = useColorMode();
  return (
    <div className={`${colorMode === 'dark' ? 'bg-boxdark-2' : 'bg-gray-100'} rounded-lg p-4 flex items-center transition-all duration-300 hover:shadow-md`}>
      <div className="text-blue-500 mr-4">{icon}</div>
      <div>
        <p className="text-lg">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default WeatherDashboard;
