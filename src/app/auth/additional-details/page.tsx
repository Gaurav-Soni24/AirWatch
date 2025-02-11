import React from "react";
import { Metadata } from "next";
import AdditionalDetails from "@/components/Auth/AdditionalDetails/AdditionalDetails";

export const metadata: Metadata = {
  title: "Complete Your Profile - AirWatch",
  description: "Complete your AirWatch profile with additional details",
};

const AdditionalDetailsPage = () => {
  return <AdditionalDetails />;
};

export default AdditionalDetailsPage;