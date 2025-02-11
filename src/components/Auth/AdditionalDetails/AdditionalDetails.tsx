"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SignupImage from "@/components/Auth/auth.svg";
import { FiMapPin } from "react-icons/fi";
import { auth, db } from "@/components/firebase/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from '@/components/contexts/LocationContext';
import { useLocationSearch } from '@/hooks/useLocationSearch';
import { useRouter } from 'next/navigation';
import useColorMode from "@/hooks/useColorMode";
import app from "@/components/firebase/firebase";

const AdditionalDetails: React.FC = () => {
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [defaultLocation, setDefaultLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");
  const [colorMode] = useColorMode();
  const router = useRouter();

  const { setLocation } = useLocation();
  const {
    query,
    isSearchActive,
    setIsSearchActive,
    results,
    activeIndex,
    handleInputChange,
    handleKeyDown,
  } = useLocationSearch();

  const locationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsSearchActive]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setDob(data.dob || "");
          setGender(data.gender || "");
          setDefaultLocation(data.defaultLocation || "");
          setLatitude(data.latitude || "");
          setLongitude(data.longitude || "");
        }
      } else {
        router.push("/auth/signin");
      }
    };

    fetchUserData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          dob,
          gender,
          defaultLocation,
          latitude,
          longitude,
          joinedDate: new Date().toISOString(),
        }, { merge: true });
        toast.success("Additional details saved successfully");
        router.push("/profile");
      } else {
        setError("No user found. Please sign up again.");
        toast.error("No user found. Please sign up again.");
      }
    } catch (error: any) {
      console.error("Error saving additional details:", error);
      setError("An error occurred while saving your details. Please try again.");
      toast.error("An error occurred while saving your details. Please try again.");
    }
  };

  const handleLocationSelection = (location: any) => {
    const formattedName = location.properties.formatted;
    setDefaultLocation(formattedName);
    setLatitude(location.properties.lat);
    setLongitude(location.properties.lon);
    setLocation(location.properties.lat, location.properties.lon, formattedName);
    setIsSearchActive(false);
  };

  return (
    <>
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
                alt="Additional Details"
                width={200}
                height={200}
                className="mb-6 transition-transform hover:scale-105 md:w-[300px] md:h-[300px]"
              />
              <p className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-600'} max-w-sm text-center text-base font-medium md:text-base`}>
                Complete your profile to get personalized air quality insights.
              </p>
            </div>
            <div className="p-6 md:w-1/2">
              <h2 className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-800'} mb-6 text-3xl font-bold`}>Additional Details</h2>
              {error && <p className="text-danger mb-3">{error}</p>}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="dob" className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}>Date of Birth</label>
                  <input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-3 py-2 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="gender" className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}>Gender</label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg px-3 py-2 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="defaultLocation" className={`${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-700'} mb-1 block text-sm font-medium`}>Default Location</label>
                  <div className="relative" ref={locationDropdownRef}>
                    <div className="relative">
                      <input
                        id="defaultLocation"
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsSearchActive(true)}
                        placeholder="Search for a location"
                        className={`${colorMode === 'dark' ? 'bg-boxdark text-bodydark border-strokedark' : 'bg-gray-50 text-gray-800 border-gray-300'} border-2 w-full rounded-lg pl-8 pr-3 py-2 transition duration-200 focus:border-green-500 focus:ring-2 focus:ring-green-200`}
                        required
                      />
                      <FiMapPin className={`absolute left-2 top-1/2 -translate-y-1/2 ${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-400'}`} size={16} />
                    </div>
                    {isSearchActive && results.length > 0 && (
                      <div className={`absolute z-10 mt-1 w-full ${colorMode === 'dark' ? 'bg-boxdark' : 'bg-white'} rounded-md shadow-lg max-h-48 overflow-y-auto`}>
                        {results.map((result: any, index: number) => (
                          <div
                            key={index}
                            className={`cursor-pointer px-3 py-2 ${colorMode === 'dark' ? 'hover:bg-boxdark-2' : 'hover:bg-gray-100'} ${
                              index === activeIndex ? (colorMode === 'dark' ? 'bg-boxdark-2' : 'bg-gray-100') : ''
                            }`}
                            onClick={() => handleLocationSelection(result)}
                          >
                            <div className="flex items-center">
                              <FiMapPin className={`mr-2 ${colorMode === 'dark' ? 'text-bodydark' : 'text-gray-400'}`} size={14} />
                              <span className={colorMode === 'dark' ? 'text-bodydark' : ''}>{result.properties.formatted}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Save Additional Details
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
};

export default AdditionalDetails;
