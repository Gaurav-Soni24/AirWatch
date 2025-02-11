import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

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

export default PollutionDistributionCard;
