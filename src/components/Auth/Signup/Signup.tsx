
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignupImage from "@/components/Auth/auth.svg";
import { auth, db } from "@/components/firebase/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import useColorMode from "@/hooks/useColorMode";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import app from "@/components/firebase/firebase";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [colorMode] = useColorMode();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
      });
      toast.success("Signup successful! Please sign in.");
      router.push("/auth/signin");
    } catch (error: any) {
      console.error("Error during signup:", error);
      setError(error.message);
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
      }, { merge: true });
      toast.success("Google sign-up successful! Please sign in.");
      router.push("/auth/signin");
    } catch (error: any) {
      console.error("Error during Google sign-up:", error);
      setError(error.message);
      toast.error("An error occurred during Google sign-up. Please try again.");
    }
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
              src={SignupImage}
              alt="Signup"
              width={200}
              height={200}
              className="mb-6 transition-transform hover:scale-105 md:w-[300px] md:h-[300px]"
            />
            <p className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-600'} max-w-sm text-center text-base font-medium md:text-base`}>
              Join AirWatch to get personalized air quality insights.
            </p>
          </div>
          <div className="p-6 md:w-1/2">
            <h2 className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-800'} mb-6 text-3xl font-bold`}>Create Your Account</h2>
            {error && <p className="text-danger mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}>Full name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-3 py-2 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                    required
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}>Email address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-3 py-2 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}>Password</label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-3 py-2 pr-10 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                    required
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-gray-400 focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                <div className="relative">
                  <label htmlFor="confirmPassword" className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}>Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-3 py-2 pr-10 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                    required
                    placeholder="Confirm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-8 text-gray-400 focus:outline-none"
                  >
                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </form>
            <div className="mt-4 flex items-center justify-center">
              <hr className="w-full border-t border-gray-300" />
              <span className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-500'} mx-4 text-sm`}>OR</span>
              <hr className="w-full border-t border-gray-300" />
            </div>
            <button
              onClick={handleGoogleSignIn}
              className={`mt-4 w-full flex items-center justify-center rounded-lg ${colorMode === 'dark' ? 'bg-boxdark-2 text-bodydark' : 'bg-white text-gray-700'} border border-gray-300 px-4 py-3 font-semibold transition duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
            >
              <FcGoogle className="mr-2" size={20} />
              Sign up with Google
            </button>
            <p className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-600'} mt-4 text-center`}>
              Already have an account? <Link href="/auth/signin" className="text-green-600 hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Signup;