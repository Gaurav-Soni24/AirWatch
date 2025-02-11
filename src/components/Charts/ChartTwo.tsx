"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "line",
    height: 335,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ["#3C50E0", "#80CAEE", "#10B981", "#F59E0B", "#EF4444"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    show: true,
    borderColor: "#e0e0e0",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  xaxis: {
    categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    max: 100,
    title: {
      text: "Concentration",
      style: {
        fontSize: "14px",
        fontWeight: 500,
      },
    },
  },
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",
    markers: {
      radius: 99,
    },
  },
  tooltip: {
    y: {
      formatter: function (value) {
        return Math.round(value * 10) / 10 + " µg/m³";
      }
    }
  },
};

interface ChartTwoProps {
  trendData: any[];
}

const ChartTwo: React.FC<ChartTwoProps> = ({ trendData }) => {
  const series = [
    {
      name: "PM2.5",
      data: trendData.map(day => Math.round(day.pm25 * 10) / 10),
    },
    {
      name: "O3",
      data: trendData.map(day => Math.round(day.o3 * 10) / 10),
    },
    {
      name: "NO2",
      data: trendData.map(day => Math.round(day.no2 * 10) / 10),
    },
    {
      name: "SO2",
      data: trendData.map(day => Math.round(day.so2 * 10) / 10),
    },
    {
      name: "CO",
      data: trendData.map(day => Math.round(day.co * 10) / 10),
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
    colors: ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f97316'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['5 days ago', '4 days ago', '3 days ago', '2 days ago', 'Yesterday'],
    },
    yaxis: {
      title: {
        text: 'Concentration (µg/m³)',
      },
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: true,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Pollutant Trends (Last 5 Days)
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
