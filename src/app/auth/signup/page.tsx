import React from "react";
import { Metadata } from "next";
import SignupComponent from "@/components/Auth/Signup/Signup";

export const metadata: Metadata = {
  title: "Signup AirWatch",
  description: "Signup AirWatch",
};

const SignupPage = () => {
  return <SignupComponent />;
};

export default SignupPage;