import React from 'react';
import { FaMask, FaHome, FaWindowClose, FaAirFreshener, FaBan } from 'react-icons/fa';

interface HealthRecommendation {
  general: string;
  sensitive: string;
  children: string;
  elderly: string;
  icons: {
    mask: string;
    indoor: string;
    windows: string;
    purifier: string;
    outdoor: string;
  };
}

const getRecommendation = (aqi: number): HealthRecommendation => {
  if (aqi <= 50) {
    return {
      general: "Air quality is satisfactory, and air pollution poses little or no risk.",
      sensitive: "Unusually sensitive people should consider reducing prolonged or heavy exertion.",
      children: "It's a great day for outdoor activities!",
      elderly: "Enjoy your normal outdoor activities.",
      icons: {
        mask: "Optional",
        indoor: "Optional",
        windows: "Open",
        purifier: "Optional",
        outdoor: "Allow",
      }
    };
  } else if (aqi <= 100) {
    return {
      general: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
      sensitive: "People with respiratory or heart conditions should limit prolonged outdoor exertion.",
      children: "It's okay to be active outside, but take more breaks and do less intense activities.",
      elderly: "Reduce prolonged or heavy exertion. Take more breaks during outdoor activities.",
      icons: {
        mask: "Recommended",
        indoor: "Preferred",
        windows: "Close",
        purifier: "Recommended",
        outdoor: "Limit",
      }
    };
  } else if (aqi <= 150) {
    return {
      general: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      sensitive: "Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling.",
      children: "Take more breaks and do less intense activities. Watch for symptoms such as coughing or shortness of breath.",
      elderly: "Avoid prolonged or heavy exertion. Move activities indoors or reschedule to a time when the air quality is better.",
      icons: {
        mask: "Required",
        indoor: "Required",
        windows: "Keep Close",
        purifier: "Required",
        outdoor: "Avoid",
      }
    };
  } else {
    return {
      general: "Health alert: The risk of health effects is increased for everyone.",
      sensitive: "Avoid all physical activity outdoors.",
      children: "Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when air quality is better.",
      elderly: "Avoid all physical activity outdoors. Move activities indoors or reschedule to a time when air quality is better.",
      icons: {
        mask: "Required",
        indoor: "Required",
        windows: "Keep Close",
        purifier: "Required",
        outdoor: "Avoid",
      }
    };
  }
};

interface HealthRecommendationCardProps {
  aqi: number;
}

const HealthRecommendationCard: React.FC<HealthRecommendationCardProps> = ({ aqi }) => {
  const recommendation = getRecommendation(aqi);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <h4 className="text-lg font-semibold text-black dark:text-white mb-4">
        Health Recommendations (AQI: {aqi})
      </h4>
      <div className="grid grid-cols-5 gap-3 mb-5">
        {Object.entries(recommendation.icons).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center">
            {key === 'mask' && <FaMask className="text-3xl mb-1 text-blue-500" />}
            {key === 'indoor' && <FaHome className="text-3xl mb-1 text-green-500" />}
            {key === 'windows' && <FaWindowClose className="text-3xl mb-1 text-red-500" />}
            {key === 'purifier' && <FaAirFreshener className="text-3xl mb-1 text-purple-500" />}
            {key === 'outdoor' && <FaBan className="text-3xl mb-1 text-yellow-500" />}
            <span className="text-xs font-medium capitalize">{key}</span>
            <span className="text-xs font-medium">{value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-4 text-sm">
        {Object.entries(recommendation).map(([key, value]) => {
          if (key !== 'icons') {
            return (
              <div key={key} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-sm">
                <h5 className="font-semibold text-black dark:text-white mb-1 capitalize">
                  {key}:
                </h5>
                <p className="text-gray-700 dark:text-gray-300">{value}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default HealthRecommendationCard;
