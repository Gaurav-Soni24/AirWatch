import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from '../../components/contexts/LocationContext';

interface WeatherData {
    temperature: number;
    description: string;
}

const WeatherWidget: React.FC = () => {
    const { lat, lng } = useLocation();
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (lat === null || lng === null) {
                setError('No location selected');
                return;
            }
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b8bf61da6ffe2cdd969b0df05d40c897&units=metric`
                );
                setWeather({
                    temperature: Math.round(response.data.main.temp),
                    description: response.data.weather[0].main,
                });
                setError(null);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setError('Failed to fetch weather data');
            }
        };

        fetchWeather();
    }, [lat, lng]);

    if (error) return <div className="text-sm text-red-500 dark:text-red-400">{error}</div>;
    if (!weather) return <div className="text-sm text-gray-500 dark:text-gray-400">Loading weather...</div>;

    const getWeatherIcon = (description: string) => {
        switch (description.toLowerCase()) {
            case 'clear':
                return '☀️';
            case 'clouds':
                return '☁️';
            case 'rain':
                return '🌧️';
            case 'snow':
                return '❄️';
            default:
                return '🌤️';
        }
    };

    return (
        <div className="flex items-center space-x-2 rounded-full px-3 py-1 text-sm">
            <div className="relative">
                <span className="text-2xl">{getWeatherIcon(weather.description)}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-medium">{weather.temperature}°C</span>
                <span className="text-xs">{weather.description}</span>
            </div>
        </div>
    );
};

export default WeatherWidget;
