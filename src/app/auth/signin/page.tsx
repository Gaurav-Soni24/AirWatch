import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Signin from "@/components/Auth/Signin/Signin";

export const metadata: Metadata = {
  title: "Signin AirWatch",
  description: "Signin AirWatch",
};

const SignIn: React.FC = () => {
  return (
      <Signin/>
  );
};

export default SignIn;
