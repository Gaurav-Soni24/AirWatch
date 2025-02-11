import React, { useState, useEffect } from 'react';
import { FaCity, FaWind, FaSmog, FaCloudMeatball, FaCloud, FaCloudSun, FaCloudRain, FaCloudMoon, FaCloudShowersHeavy, FaEllipsisH } from 'react-icons/fa';
import data0 from './HistoricalAverageAirQualityDataOfMetropolitanCitiesData0.json';
import data6 from './HistoricalAverageAirQualityDataOfMetropolitanCitiesData6.json';
import data14 from './HistoricalAverageAirQualityDataOfMetropolitanCitiesData14.json';
import data29 from './HistoricalAverageAirQualityDataOfMetropolitanCitiesData29.json';

interface CityData {
  City: string;
  AQI: number;
  PM25: number;
  PM10: number;
  CO: number;
  OZONE: number;
  SO2: number;
  NO2: number;
  NH3: number;
}

const HistoricalAverageAirQualityDataOfMetropolitanCities: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<string>('Last Day');
  const [cityData, setCityData] = useState<CityData[]>([]);
  const [showDetails, setShowDetails] = useState<number | null>(null);

  useEffect(() => {
    switch (selectedRange) {
      case 'Last Day':
        setCityData(data0);
        break;
      case 'Last Week':
        setCityData(data6);
        break;
      case 'Last 2 Weeks':
        setCityData(data14);
        break;
      case 'Last Month':
        setCityData(data29);
        break;
      default:
        setCityData(data0);
    }
  }, [selectedRange]);

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-[#4ade80]';
    if (aqi <= 100) return 'bg-[#facc15]';
    if (aqi <= 150) return 'bg-[#fb923c]';
    if (aqi <= 200) return 'bg-[#f87171]';
    if (aqi <= 300) return 'bg-[#7c3aed]';
    return 'bg-[#881337]';
  };

  return (
    <div className="col-span-7 rounded-sm border border-stroke bg-white p-4 md:p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h4 className="text-lg md:text-xl font-semibold text-black dark:text-white flex items-center mb-2 md:mb-0">
          <FaCity className="mr-2" />
          Historical Average Air Quality Data Of Metropolitan Cities
        </h4>
        <select
          className="w-full md:w-auto bg-white dark:bg-boxdark border border-stroke dark:border-strokedark text-black dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary p-2.5 mt-2 md:mt-0"
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
        >
          <option value="Last Day">Last Day</option>
          <option value="Last Week">Last Week</option>
          <option value="Last 2 Weeks">Last 2 Weeks</option>
          <option value="Last Month">Last Month</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm text-left text-black dark:text-white">
          <thead className="text-xs uppercase bg-gray-2 dark:bg-meta-4">
            <tr>
              <th scope="col" className="py-2 md:py-4 px-2 md:px-4 font-medium"><FaCity className="inline mr-1 md:mr-2" />City</th>
              <th scope="col" className="py-2 md:py-4 px-2 md:px-4 font-medium"><FaWind className="inline mr-1 md:mr-2" />AQI</th>
              <th scope="col" className="hidden md:table-cell py-2 md:py-4 px-2 md:px-4 font-medium"><FaSmog className="inline mr-1 md:mr-2" />PM2.5</th>
              <th scope="col" className="hidden md:table-cell py-2 md:py-4 px-2 md:px-4 font-medium"><FaCloudMeatball className="inline mr-1 md:mr-2" />PM10</th>
              <th scope="col" className="hidden md:table-cell py-2 md:py-4 px-2 md:px-4 font-medium"><FaCloud className="inline mr-1 md:mr-2" />CO</th>
              <th scope="col" className="hidden md:table-cell py-2 md:py-4 px-2 md:px-4 font-medium"><FaCloudSun className="inline mr-1 md:mr-2" />OZONE</th>
              <th scope="col" className="hidden md:table-cell py-2 md:py-4 px-2 md:px-4 font-medium"><FaCloudRain className="inline mr-1 md:mr-2" />SO2</th>
              <th scope="col" className="hidden md:table-cell py-2 md:py-4 px-2 md:px-4 font-medium"><FaCloudMoon className="inline mr-1 md:mr-2" />NO2</th>
              <th scope="col" className="hidden md:table-cell py-2 md:py-4 px-2 md:px-4 font-medium"><FaCloudShowersHeavy className="inline mr-1 md:mr-2" />NH3</th>
              <th scope="col" className="md:hidden py-2 md:py-4 px-2 md:px-4 font-medium"><FaEllipsisH className="inline" /></th>
            </tr>
          </thead>
          <tbody>
            {cityData.map((city, index) => (
              <React.Fragment key={index}>
                <tr className={`${index % 2 === 0 ? 'bg-white dark:bg-boxdark' : 'bg-gray-2 dark:bg-meta-4'}`}>
                  <td className="py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">{city.City}</td>
                  <td className={`py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark ${getAQIColor(city.AQI)} text-white font-medium rounded`}>{city.AQI}</td>
                  <td className="hidden md:table-cell py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">{city.PM25}</td>
                  <td className="hidden md:table-cell py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">{city.PM10}</td>
                  <td className="hidden md:table-cell py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">{city.CO}</td>
                  <td className="hidden md:table-cell py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">{city.OZONE}</td>
                  <td className="hidden md:table-cell py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">{city.SO2}</td>
                  <td className="hidden md:table-cell py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">{city.NO2}</td>
                  <td className="hidden md:table-cell py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">{city.NH3}</td>
                  <td className="md:hidden py-3 md:py-5 px-2 md:px-4 border-b border-[#eee] dark:border-strokedark">
                    <button onClick={() => setShowDetails(prev => prev === index ? null : index)} className="text-blue-500">
                      {showDetails === index ? 'Hide' : 'Show'} Details
                    </button>
                  </td>
                </tr>
                {showDetails === index && (
                  <tr className="md:hidden">
                    <td colSpan={3} className="py-2 px-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>PM2.5: {city.PM25}</div>
                        <div>PM10: {city.PM10}</div>
                        <div>CO: {city.CO}</div>
                        <div>OZONE: {city.OZONE}</div>
                        <div>SO2: {city.SO2}</div>
                        <div>NO2: {city.NO2}</div>
                        <div>NH3: {city.NH3}</div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalAverageAirQualityDataOfMetropolitanCities;
