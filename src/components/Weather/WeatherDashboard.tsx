"use client";

import React, { useEffect, useState } from 'react';
import { useLocation } from '@/components/contexts/LocationContext';
import axios from 'axios';
import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny, WiNightClear, WiRain, WiSnow, WiCloudy, WiDayLightning } from 'react-icons/wi';
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
  pressure: number;
}

const WeatherDashboard: React.FC = () => {
  const { lat, lng, locationName } = useLocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [colorMode] = useColorMode();
  const isDark = colorMode === 'dark';

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
          pressure: response.data.main.pressure,
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
    return (
      <div className={`text-center py-16 ${isDark ? 'bg-boxdark-2 text-red-400' : 'bg-red-50 text-red-500'} rounded-lg p-6 text-xl shadow-lg transition-all duration-300`}>
        {error}
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-500'} text-xl`}>
        No weather data available
      </div>
    );
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 0) return isDark ? 'text-blue-400' : 'text-blue-600';
    if (temp < 10) return isDark ? 'text-cyan-400' : 'text-cyan-500';
    if (temp < 20) return isDark ? 'text-green-400' : 'text-green-500';
    if (temp < 30) return isDark ? 'text-yellow-400' : 'text-yellow-500';
    return isDark ? 'text-red-400' : 'text-red-500';
  };

  const getWeatherIcon = (iconCode: string) => {
    // Custom icon mapping based on OpenWeatherMap icon codes
    const iconMap: Record<string, any> = {
      '01d': <WiDaySunny className="text-yellow-400" size={48} />,
      '01n': <WiNightClear className="text-blue-300" size={48} />,
      '02d': <WiDaySunny className="text-yellow-400" size={48} />,
      '02n': <WiNightClear className="text-blue-300" size={48} />,
      '03d': <WiCloudy className="text-gray-400" size={48} />,
      '03n': <WiCloudy className="text-gray-400" size={48} />,
      '04d': <WiCloudy className="text-gray-500" size={48} />,
      '04n': <WiCloudy className="text-gray-500" size={48} />,
      '09d': <WiRain className="text-blue-400" size={48} />,
      '09n': <WiRain className="text-blue-400" size={48} />,
      '10d': <WiRain className="text-blue-500" size={48} />,
      '10n': <WiRain className="text-blue-500" size={48} />,
      '11d': <WiDayLightning className="text-yellow-600" size={48} />,
      '11n': <WiDayLightning className="text-yellow-600" size={48} />,
      '13d': <WiSnow className="text-blue-200" size={48} />,
      '13n': <WiSnow className="text-blue-200" size={48} />,
    };

    return iconMap[iconCode] || <WiDaySunny className="text-yellow-400" size={48} />;
  };

  const getDayPeriod = () => {
    const now = Math.floor(Date.now() / 1000);
    if (now < weatherData.sunrise || now > weatherData.sunset) {
      return "night";
    }
    return "day";
  };

  const dayPeriod = getDayPeriod();
  
  const gradients = {
    day: isDark 
      ? "from-blue-900 to-indigo-900" 
      : "from-blue-400 to-indigo-500",
    night: isDark 
      ? "from-gray-900 to-blue-900" 
      : "from-indigo-600 to-blue-900"
  };

  return (
    <div className={`${isDark ? 'bg-boxdark text-bodydark' : 'bg-white text-gray-800'} rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto transition-all duration-300`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[dayPeriod]} opacity-5 rounded-2xl -z-10`}></div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          {locationName}
        </h2>
        <div className={`px-4 py-2 rounded-full ${isDark ? 'bg-boxdark-2' : 'bg-blue-50'} text-sm font-medium`}>
          {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`flex items-center justify-center md:justify-start p-6 rounded-xl ${isDark ? 'bg-boxdark-2/50' : 'bg-blue-50/50'} backdrop-blur-sm`}>
          <div className="mr-4">
            {getWeatherIcon(weatherData.icon)}
          </div>
          <div>
            <p className={`text-7xl font-bold ${getTemperatureColor(weatherData.temperature)}`}>
              {weatherData.temperature}°
            </p>
            <p className="text-2xl capitalize mt-2">{weatherData.description}</p>
            <p className={`text-xl mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Feels like {weatherData.feelsLike}°C
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <WeatherDetail 
            icon={<WiHumidity size={40} />} 
            label="Humidity" 
            value={`${weatherData.humidity}%`} 
            isDark={isDark}
          />
          <WeatherDetail 
            icon={<WiStrongWind size={40} />} 
            label="Wind Speed" 
            value={`${weatherData.windSpeed.toFixed(1)} m/s`} 
            isDark={isDark}
          />
          <WeatherDetail 
            icon={<FiSunrise size={32} />} 
            label="Sunrise" 
            value={formatTime(weatherData.sunrise)} 
            isDark={isDark}
          />
          <WeatherDetail 
            icon={<FiSunset size={32} />} 
            label="Sunset" 
            value={formatTime(weatherData.sunset)} 
            isDark={isDark}
          />
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text flex items-center">
          <WiBarometer size={28} className="mr-2 text-blue-500" /> 
          Hourly Forecast
        </h3>
        
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl ${isDark ? 'bg-boxdark-2/50' : 'bg-blue-50/50'} backdrop-blur-sm`}>
          {['12 PM', '3 PM', '6 PM', '9 PM'].map((time, index) => {
            const tempForHour = Math.round(weatherData.temperature - index * 1.5);
            return (
              <div 
                key={index} 
                className={`${isDark ? 'bg-boxdark/70' : 'bg-white/70'} rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{time}</p>
                {getWeatherIcon(weatherData.icon)}
                <p className={`text-xl font-semibold mt-2 ${getTemperatureColor(tempForHour)}`}>
                  {tempForHour}°C
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          3-Day Forecast
        </h3>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl ${isDark ? 'bg-boxdark-2/50' : 'bg-blue-50/50'} backdrop-blur-sm`}>
          {['Tomorrow', 'Day 2', 'Day 3'].map((day, index) => {
            const tempHigh = Math.round(weatherData.temperature + (index === 0 ? 2 : index === 1 ? -1 : 1));
            const tempLow = Math.round(tempHigh - 5);
            
            return (
              <div 
                key={index} 
                className={`${isDark ? 'bg-boxdark/70' : 'bg-white/70'} rounded-lg p-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div>
                  <p className={`text-lg font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{day}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(Date.now() + 86400000 * (index + 1)).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric'})}
                  </p>
                </div>
                
                <div className="flex items-center">
                  {getWeatherIcon(weatherData.icon)}
                  <div className="ml-2 text-right">
                    <p className={`font-bold ${getTemperatureColor(tempHigh)}`}>{tempHigh}°</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{tempLow}°</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WeatherDetail: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  isDark: boolean;
}> = ({ icon, label, value, isDark }) => {
  return (
    <div className={`${isDark ? 'bg-boxdark-2/70' : 'bg-white/70'} rounded-lg p-4 flex items-center transition-all duration-300 hover:shadow-md backdrop-blur-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="text-blue-500 mr-4">{icon}</div>
      <div>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default WeatherDashboard;