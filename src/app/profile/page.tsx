"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { FiCalendar, FiActivity } from 'react-icons/fi';
import { auth, db } from "@/components/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const DynamicFiShare2 = dynamic(() => import('react-icons/fi').then((mod) => mod.FiShare2), { ssr: false });
const DynamicFiEdit2 = dynamic(() => import('react-icons/fi').then((mod) => mod.FiEdit2), { ssr: false });
const DynamicFiLogOut = dynamic(() => import('react-icons/fi').then((mod) => mod.FiLogOut), { ssr: false });
const DynamicFiUser = dynamic(() => import('react-icons/fi').then((mod) => mod.FiUser), { ssr: false });
const DynamicFiMapPin = dynamic(() => import('react-icons/fi').then((mod) => mod.FiMapPin), { ssr: false });
const DynamicFiCalendar = dynamic(() => import('react-icons/fi').then((mod) => mod.FiCalendar), { ssr: false });
const DynamicFiHeart = dynamic(() => import('react-icons/fi').then((mod) => mod.FiHeart), { ssr: false });

const isUserDataComplete = (data: any) => {
  return data && data.dob && data.gender && data.defaultLocation;
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsGoogleAuth(authUser.providerData[0]?.providerId === 'google.com');
        const userRef = doc(db, "users", authUser.uid);
        let userSnap = await getDoc(userRef);

        if (!userSnap.exists() || !isUserDataComplete(userSnap.data())) {
          router.push("/auth/additional-details");
        } else {
          const data = userSnap.data();
          const birthDate = data.dob ? new Date(data.dob) : null;
          const today = new Date();
          let calculatedAge = null;
          if (birthDate) {
            calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              calculatedAge--;
            }
          }
          setUserData({
            ...data,
            age: calculatedAge || data.age,
            lastActive: today.toLocaleDateString(),
            email: authUser.email,
            name: authUser.displayName,
            photoURL: authUser.photoURL
          });
        }
      } else {
        setUser(null);
        setUserData(null);
        router.push("/auth/signin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </DefaultLayout>
    );
  }

  if (!user || !userData) {
    return null;
  }

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 dark:bg-gray-900 dark:text-white">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-lg bg-white dark:bg-black shadow">
          <div className="relative h-48 sm:h-68 bg-gradient-to-r from-green-400 to-blue-500">
            <div className="absolute top-0 right-0 p-2 sm:p-4 flex flex-col sm:flex-row items-end sm:items-center z-10">
              {/* Modified buttons with tooltips below instead of to the side */}
              <div className="relative m-1 group">
                <button
                  className="rounded-full bg-white dark:bg-black text-green-600 dark:text-white p-2 sm:p-3 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Edit Profile"
                >
                  <DynamicFiEdit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Edit Profile
                </span>
              </div>
              
              <div className="relative m-1 group">
                <button
                  className="rounded-full bg-white dark:bg-black text-green-600 dark:text-white p-2 sm:p-3 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label="Share Profile"
                >
                  <DynamicFiShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Share Profile
                </span>
              </div>
              
              <div className="relative m-1 group">
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-white dark:bg-black text-red-600 dark:text-red-500 p-2 sm:p-3 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Logout"
                >
                  <DynamicFiLogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Logout
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row items-center sm:items-end p-4 sm:p-6">
              {userData.photoURL && (
                <Image
                  src={userData.photoURL}
                  alt={userData.name}
                  width={120}
                  height={120}
                  className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white bg-white object-cover shadow-lg mb-2 sm:mb-0 sm:mr-5"
                  unoptimized
                />
              )}
              <div className="text-white text-center sm:text-left">
                <h1 className="text-xl sm:text-4xl font-bold">{userData.name}</h1>
                <p className="text-sm sm:text-xl">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-4 sm:mb-6">Personal Information</h2>
                <dl className="space-y-4 sm:space-y-6">
                  <div className="flex items-center">
                    <DynamicFiUser className="mr-3 text-green-500 w-5 h-5 flex-shrink-0" />
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 sm:w-24">Age:</dt>
                    <dd className="text-base sm:text-lg text-black dark:text-white">{userData.age || 'Not specified'}</dd>
                  </div>
                  <div className="flex items-center">
                    <DynamicFiUser className="mr-3 text-green-500 w-5 h-5 flex-shrink-0" />
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 sm:w-24">Gender:</dt>
                    <dd className="text-base sm:text-lg text-black dark:text-white">{userData.gender || 'Not specified'}</dd>
                  </div>
                  <div className="flex items-center">
                    <DynamicFiMapPin className="mr-3 text-green-500 w-5 h-5 flex-shrink-0" />
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 sm:w-24">Location:</dt>
                    <dd className="text-base sm:text-lg text-black dark:text-white">{userData.defaultLocation || 'Not specified'}</dd>
                  </div>
                  <div className="flex items-center">
                    <DynamicFiCalendar className="mr-3 text-green-500 w-5 h-5 flex-shrink-0" />
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20 sm:w-24">Birthdate:</dt>
                    <dd className="text-base sm:text-lg text-black dark:text-white">
                      {userData.dob ? new Date(userData.dob).toLocaleDateString() : 'Not specified'}
                    </dd>
                  </div>
                </dl>
                <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mt-6 sm:mt-8 mb-4 sm:mb-6">Share AirWatch</h2>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Image
                    src="/path/to/qr-code.png"
                    alt="AirWatch QR Code"
                    width={160}
                    height={160}
                    className="rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Scan this QR code to join AirWatch</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-black dark:text-white mb-4 sm:mb-6">Additional Information</h2>
                <dl className="space-y-4 sm:space-y-6">
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      <DynamicFiHeart className="mr-3 text-green-500 w-5 h-5 flex-shrink-0" />
                      Interests
                    </dt>
                    <dd className="text-base sm:text-lg text-black dark:text-white">
                      {userData.interests && userData.interests.length > 0 ? (
                        userData.interests.slice(0, 5).map((interest: string, index: number) => (
                          <span key={index} className="inline-block bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full px-2 py-1 text-xs sm:text-sm font-semibold mr-2 mb-2">
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span>No interests specified</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      <FiCalendar className="mr-3 text-green-500 w-5 h-5 flex-shrink-0" />
                      Joined AirWatch
                    </dt>
                    <dd className="text-base sm:text-lg text-black dark:text-white">{new Date(userData.joinedDate).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      <FiActivity className="mr-3 text-green-500 w-5 h-5 flex-shrink-0" />
                      Last Active
                    </dt>
                    <dd className="text-base sm:text-lg text-black dark:text-white">{userData.lastActive}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;