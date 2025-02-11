"use client";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import TableOne from "../Tables/TableOne";
import HealthRecommendationCard from "../HealthRecommendationCard";
import AQICard from "../AQICard";
import CircularProgressBar from "../CircularProgressBar";
import { ApexOptions } from "apexcharts";
const MapOne = dynamic(() => import("@/components/Maps/MapOne"), { ssr: false });
const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), { ssr: false });
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useLocation } from '../../components/contexts/LocationContext';
import HistoricalAverageAirQualityDataOfMetropolitanCities from '../HistoricalAverageAirQualityDataOfMetropolitanCities/HistoricalAverageAirQualityDataOfMetropolitanCities';
import TopPollutedCities from '../TopPollutedCities/TopPollutedCities';
import LeastPollutedCities from '../LeastPollutedCities/LeastPollutedCities';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AQIHeatMap from '../HeatMap/HeatMap';

interface PollutionDistributionCardProps {
  pm25: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
}

const PollutionDistributionCard: React.FC<PollutionDistributionCardProps> = ({ pm25, o3, no2, so2, co }) => {
  const series = [{
    data: [pm25, o3, no2, so2, co]
  }];
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['PM2.5', 'O3', 'NO2', 'SO2', 'CO'],
    },
    colors: ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f97316'],
    title: {
      text: 'Pollution Distribution',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333'
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " µg/m³";
        }
      }
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Pollution Distribution
        </h4>
      </div>
      <div className="mb-2">
        <div id="pollutionDistribution" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
            width={380}
          />
        </div>
      </div>
    </div>
  );
};
PollutionDistributionCard.displayName = 'PollutionDistributionCard';

const AirQualityDashboard: React.FC = () => {
  const { lat, lng } = useLocation();
  const [aqi, setAqi] = useState<number | null>(null);
  const [pm25, setPm25] = useState<number>(0);
  const [pm10, setPm10] = useState<number>(0);
  const [o3, setO3] = useState<number>(0);
  const [no2, setNo2] = useState<number>(0);
  const [so2, setSo2] = useState<number>(0);
  const [co, setCo] = useState<number>(0);
  const [trendData, setTrendData] = useState<any[]>([]);

  const showAQIAlert = (aqi: number) => {
    let message = '';
    let type: 'info' | 'success' | 'warning' | 'error' = 'info';

    if (aqi <= 50) {
      message = 'Air quality is Good';
      type = 'success';
    } else if (aqi <= 100) {
      message = 'Air quality is Moderate';
      type = 'info';
    } else if (aqi <= 150) {
      message = 'Air quality is Unhealthy for Sensitive Groups';
      type = 'warning';
    } else if (aqi <= 200) {
      message = 'Air quality is Unhealthy';
      type = 'error';
    } else if (aqi <= 300) {
      message = 'Air quality is Very Unhealthy';
      type = 'error';
    } else {
      message = 'Air quality is Hazardous';
      type = 'error';
    }

    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const fetchAirQualityData = useCallback(async () => {
    if (lat === null || lng === null) {
      setAqi(null);
      return;
    }

    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 5);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    try {
      const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`);
      const data = await response.json();
      if (data.hourly) {
        const latestIndex = data.hourly.time.length - 1;
        const calculateAQI = (pm25: number) => {
          // This is a simplified AQI calculation based on PM2.5
          if (pm25 <= 12) return Math.round((50 - 0) / (12 - 0) * (pm25 - 0) + 0);
          if (pm25 <= 35.4) return Math.round((100 - 51) / (35.4 - 12.1) * (pm25 - 12.1) + 51);
          if (pm25 <= 55.4) return Math.round((150 - 101) / (55.4 - 35.5) * (pm25 - 35.5) + 101);
          if (pm25 <= 150.4) return Math.round((200 - 151) / (150.4 - 55.5) * (pm25 - 55.5) + 151);
          if (pm25 <= 250.4) return Math.round((300 - 201) / (250.4 - 150.5) * (pm25 - 150.5) + 201);
          return Math.round((500 - 301) / (500.4 - 250.5) * (pm25 - 250.5) + 301);
        };

        const pm25 = data.hourly.pm2_5[latestIndex];
        const calculatedAQI = calculateAQI(pm25);
        setAqi(calculatedAQI);
        showAQIAlert(calculatedAQI);
        setPm25(pm25);
        setPm10(data.hourly.pm10[latestIndex]);
        setO3(data.hourly.ozone[latestIndex]);
        setNo2(data.hourly.nitrogen_dioxide[latestIndex]);
        setSo2(data.hourly.sulphur_dioxide[latestIndex]);
        setCo(data.hourly.carbon_monoxide[latestIndex]);

        // Process data for the past 5 days
        const dailyData = processDailyData(data.hourly);
        setTrendData(dailyData);
      }
    } catch (error) {
      console.error("Error fetching air quality data:", error);
    }
  }, [lat, lng]);

  const processDailyData = (hourlyData: any) => {
    const dailyAverages = [];
    const daysCount = 5;

    for (let i = 0; i < daysCount; i++) {
      const startIndex = hourlyData.time.length - (i + 1) * 24;
      const endIndex = hourlyData.time.length - i * 24;

      const dayData = {
        pm25: average(hourlyData.pm2_5.slice(startIndex, endIndex)),
        pm10: average(hourlyData.pm10.slice(startIndex, endIndex)),
        o3: average(hourlyData.ozone.slice(startIndex, endIndex)),
        no2: average(hourlyData.nitrogen_dioxide.slice(startIndex, endIndex)),
        so2: average(hourlyData.sulphur_dioxide.slice(startIndex, endIndex)),
        co: average(hourlyData.carbon_monoxide.slice(startIndex, endIndex)),
      };

      dailyAverages.push(dayData);
    }

    return dailyAverages.reverse(); // Most recent day first
  };

  const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  useEffect(() => {
    fetchAirQualityData();
  }, [fetchAirQualityData]);

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 2xl:gap-7.5">
        <AQICard
          value={aqi !== null ? aqi : 0}
          text="Air Quality Index"
          subText={aqi !== null ? (aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : aqi <= 150 ? "Unhealthy for Sensitive Groups" : aqi <= 200 ? "Unhealthy" : aqi <= 300 ? "Very Unhealthy" : "Hazardous") : "No location selected"}
          color={aqi !== null ? (aqi <= 50 ? "#4ade80" : aqi <= 100 ? "#facc15" : aqi <= 150 ? "#fb923c" : aqi <= 200 ? "#f87171" : aqi <= 300 ? "#7c3aed" : "#881337") : "#9ca3af"}
        />
        <div className="md:col-span-1 bg-white dark:bg-boxdark rounded-sm shadow-default p-4">
          <h2 className="text-xl font-bold mb-4">Other Pollutants</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <CircularProgressBar value={pm25} maxValue={250} size={100} strokeWidth={10} text="PM2.5" subText="µg/m³" color="#3b82f6" textSize="small" />
            <CircularProgressBar value={pm10} maxValue={430} size={100} strokeWidth={10} text="PM10" subText="µg/m³" color="#10b981" textSize="small" />
            <CircularProgressBar value={o3} maxValue={240} size={100} strokeWidth={10} text="O3" subText="µg/m³" color="#ef4444" textSize="small" />
            <CircularProgressBar value={no2} maxValue={400} size={100} strokeWidth={10} text="NO2" subText="µg/m³" color="#8b5cf6" textSize="small" />
            <CircularProgressBar value={so2} maxValue={350} size={100} strokeWidth={10} text="SO2" subText="µg/m³" color="#f97316" textSize="small" />
            <CircularProgressBar value={co} maxValue={15400} size={100} strokeWidth={10} text="CO" subText="µg/m³" color="#6b7280" textSize="small" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartTwo trendData={trendData} />
        <HealthRecommendationCard aqi={aqi !== null ? aqi : 0} />
        <MapOne/>
        <PollutionDistributionCard pm25={pm25} o3={o3} no2={no2} so2={so2} co={co} />
        <div className="col-span-7">
          <HistoricalAverageAirQualityDataOfMetropolitanCities />
        </div>
        <TopPollutedCities /> 
        <LeastPollutedCities />
        <AQIHeatMap />
      </div>
    </>
  );
};
AirQualityDashboard.displayName = 'AirQualityDashboard';

export default AirQualityDashboard;