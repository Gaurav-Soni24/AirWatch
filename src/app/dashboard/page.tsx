import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AirQualityDashboard from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title: "AirWatch - Air Pollution Dashboard",
  description: "Real-time air quality monitoring and analysis dashboard",
};

const AirPollutionDashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <AirQualityDashboard />
    </DefaultLayout>
  );
};

export default AirPollutionDashboard;