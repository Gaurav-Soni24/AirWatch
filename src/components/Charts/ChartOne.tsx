"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartOneProps {
  trendData: any[];
}

const ChartOne: React.FC<ChartOneProps> = ({ trendData }) => {
  const series = [
    {
      name: "AQI",
      data: trendData.map(day => day.aqi),
    },
    {
      name: "PM2.5",
      data: trendData.map(day => day.pm25),
    },
    {
      name: "NO2",
      data: trendData.map(day => day.no2),
    },
    {
      name: "SO2",
      data: trendData.map(day => day.so2),
    },
    {
      name: "CO",
      data: trendData.map(day => day.co),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ['#3C50E0', '#80CAEE', '#10B981', '#F59E0B', '#EF4444'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday'],
    },
    legend: {
      show: true,
      position: 'top',
    },
    grid: {
      show: true,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">AQI Trend</p>
              <p className="text-sm font-medium">Last 5 days</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
