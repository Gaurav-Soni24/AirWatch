"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SigninImage from "@/components/Auth/auth.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/firebase/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import useColorMode from "@/hooks/useColorMode";
import { FiEye, FiEyeOff } from "react-icons/fi";
import SigninWithGoogle from "@/components/Auth/SigninWithGoogle/SigninWithGoogle";
import app from "@/components/firebase/firebase";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [colorMode] = useColorMode();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Sign in successful", { position: "top-center" });
      router.push("/profile");
    } catch (error) {
      toast.error("Invalid email or password", { position: "top-center" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-2 sm:p-4 lg:p-6 animate-gradient-x`}>
      <div className={`w-full max-w-5xl overflow-hidden rounded-3xl ${colorMode === 'dark' ? 'bg-boxdark' : 'bg-white'} shadow-2xl`}>
        <div className="flex flex-col md:flex-row">
          <div className={`flex flex-col items-center justify-center ${colorMode === 'dark' ? 'bg-boxdark-2' : 'bg-green-100'} p-6 md:w-1/2`}>
            <Link href="/" className="mb-6 text-center transition-transform hover:scale-105">
              <div className="mb-3 flex items-center">
                <span className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-800'} text-4xl font-extrabold`}>Air</span>
                <span className="text-4xl font-extrabold text-green-600">Watch</span>
              </div>
            </Link>
            <Image
              src={SigninImage}
              alt="Signin"
              width={200}
              height={200}
              className="mb-6 transition-transform hover:scale-105 md:w-[300px] md:h-[300px]"
            />
            <p className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-600'} max-w-sm text-center text-base font-medium md:text-base`}>
              Welcome back to AirWatch. Sign in for real-time air quality data and insights.
            </p>
          </div>
          <div className="p-6 md:w-1/2">
            <h2 className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-800'} mb-6 text-3xl font-bold`}>Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-4 py-3 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-4 py-3 pr-10 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${colorMode === 'dark' ? 'text-bodydark hover:text-white' : 'text-gray-500 hover:text-gray-700'} focus:outline-none`}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className={`ml-2 block text-sm ${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-900'}`}>
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-gray-300 w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className={`${colorMode === 'dark' ? 'text-bodydark bg-boxdark' : 'text-gray bg-white'} px-2`}>Or sign in with</span>
                </div>
              </div>
              <SigninWithGoogle />
            </div>
            <p className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-600'} mt-4 text-center text-sm`}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-green-600 hover:text-green-500 transition duration-200">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Signin;
