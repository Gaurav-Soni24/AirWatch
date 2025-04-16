'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import useColorMode from '@/hooks/useColorMode';

const Page: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode() as [string, (value: string) => void];
  
  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent">
            Air Quality Awareness
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Air Pollution Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-700/30 dark:from-blue-500/20 dark:to-blue-700/40 opacity-80 z-0"></div>
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="p-4 bg-white/90 dark:bg-gray-700/90 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
                  Understanding Air Pollution
                </h2>
                
                <p className="mb-8 text-center text-gray-600 dark:text-gray-300 flex-grow">
                  Discover why air quality matters for your health and the environment, and what actions can make a difference.
                </p>
                
                <Link href="/awareness/about" className="block mt-auto">
                  <button className="w-full bg-blue-600 dark:bg-blue-700 text-white px-6 py-4 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-lg font-semibold flex items-center justify-center group-hover:shadow-lg">
                    Learn about air pollution
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>

            {/* Ventilation Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-700/30 dark:from-green-500/20 dark:to-green-700/40 opacity-80 z-0"></div>
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="p-4 bg-white/90 dark:bg-gray-700/90 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
                  Ventilation Solutions
                </h2>
                
                <p className="mb-8 text-center text-gray-600 dark:text-gray-300 flex-grow">
                  Get personalized recommendations and expert guidance on improving airflow and ventilation in your space.
                </p>
                
                <Link href="/awareness/guidance" className="block mt-auto">
                  <button className="w-full bg-green-600 dark:bg-green-700 text-white px-6 py-4 rounded-xl hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-lg font-semibold flex items-center justify-center group-hover:shadow-lg">
                    Get practical guidance
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Additional feature section */}
          <div className="mt-16 bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-inner">
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
              Why Focus on Air Quality?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="bg-blue-100 dark:bg-blue-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-black dark:text-white">Health Impact</h3>
                <p className="text-gray-600 dark:text-gray-300">Poor air quality is linked to respiratory issues, heart disease, and reduced cognitive function.</p>
              </div>
              
              <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="bg-green-100 dark:bg-green-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-black dark:text-white">Environmental Impact</h3>
                <p className="text-gray-600 dark:text-gray-300">Air pollution contributes to climate change and damages ecosystems worldwide.</p>
              </div>
              
              <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                <div className="bg-purple-100 dark:bg-purple-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold mb-2 text-black dark:text-white">Take Action</h3>
                <p className="text-gray-600 dark:text-gray-300">Simple changes in daily habits can significantly improve the air quality around you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;