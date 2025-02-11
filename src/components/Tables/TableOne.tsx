'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CityData {
  name: string;
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
}

interface Country {
  name: string;
  lat: number;
  lon: number;
}

const countries: Country[] = [
  { name: "Afghanistan", lat: 33.9391, lon: 67.7099 },
  { name: "Albania", lat: 41.1533, lon: 20.1683 },
  { name: "Algeria", lat: 28.0339, lon: 1.6596 },
  // ... (add all countries here)
  { name: "Zimbabwe", lat: -19.0154, lon: 29.1549 }
];

const TableOne: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  
  const fetchTopPollutedCities = async (selectedCountry: Country) => {
    try {
      const response = await axios.get(`https://api.waqi.info/v2/map/bounds/?latlng=${selectedCountry.lat - 5},${selectedCountry.lon - 5},${selectedCountry.lat + 5},${selectedCountry.lon + 5}&token=57b74b070c5f096f0f45fc49954843db05043616`);
      if (response.data.status === 'ok') {
        const allCities = response.data.data
          .map((city: any) => ({
            name: city.station.name,
            aqi: city.aqi,
            pm25: city.iaqi.pm25?.v || 0,
            pm10: city.iaqi.pm10?.v || 0,
            o3: city.iaqi.o3?.v || 0,
            no2: city.iaqi.no2?.v || 0,
          }))
          .sort((a: CityData, b: CityData) => b.aqi - a.aqi)
          .slice(0, 6);
        setCitiesData(allCities);
      }
    } catch (error) {
      console.error('Error fetching top polluted cities:', error);
    }
  };

  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find(c => c.name === country);
      if (selectedCountry) {
        fetchTopPollutedCities(selectedCountry);
      }
    }
  }, [country]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top 6 Polluted Cities
        </h4>
        <div className="mt-4 sm:mt-0">
          <select
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            value={country}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">City</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">AQI</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">PM2.5</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">PM10</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">O3</h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">NO2</h5>
          </div>
        </div>

        {citiesData.map((city, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${
              index === citiesData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {city.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{city.aqi}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{city.pm25}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{city.pm10}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{city.o3}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{city.no2}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

TableOne.displayName = 'TableOne';

export default TableOne;
