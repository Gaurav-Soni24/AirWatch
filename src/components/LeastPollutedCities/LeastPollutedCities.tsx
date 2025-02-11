import React from 'react';
import { FaCity, FaWind, FaLeaf } from 'react-icons/fa';
import data from './LeastPollutedCities.json';

interface CityData {
  City: string;
  AQI: number;
}

const LeastPollutedCities: React.FC = () => {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-success';
    if (aqi <= 100) return 'bg-warning';
    if (aqi <= 150) return 'bg-danger';
    if (aqi <= 200) return 'bg-danger-dark';
    if (aqi <= 300) return 'bg-purple';
    return 'bg-danger-darker';
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <FaLeaf className="text-success mr-2 text-2xl" />
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Cleanest Air Cities
          </h4>
        </div>
        <div className="flex items-center space-x-2">
          <FaCity className="text-primary dark:text-white" />
          <FaWind className="text-primary dark:text-white" />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                City
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                AQI
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((city: CityData, index: number) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {city.City}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full ${getAQIColor(city.AQI)} py-1 px-3 text-sm font-medium text-white`}>
                    {city.AQI}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeastPollutedCities;
