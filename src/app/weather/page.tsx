"use client";

import React from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import WeatherDashboard from "@/components/Weather/WeatherDashboard";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const WeatherPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Weather" />
      <div className="container mx-auto px-4 py-8">
        <WeatherDashboard />
      </div>
    </DefaultLayout>
  );
};

export default WeatherPage;
