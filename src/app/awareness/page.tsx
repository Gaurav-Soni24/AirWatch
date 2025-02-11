'use client'
import Link from 'next/link';
import DefaultLayout from '../../components/Layouts/DefaultLayout';

const Page: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            <div className="bg-blue-100 p-6 rounded-lg shadow-md transition-transform hover:scale-105 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-center">What is air pollution?</h2>
                <p className="mb-6 text-center">Why does air quality matter and what can we do about it?</p>
              </div>
              <Link href="/awareness/about" className="block">
                <button className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors text-lg font-semibold">
                  Learn about air pollution
                </button>
              </Link>
            </div>

            <div className="bg-green-100 p-6 rounded-lg shadow-md transition-transform hover:scale-105 flex flex-col justify-between">
              <div>
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-3 text-center">Ventilation</h2>
                <p className="mb-6 text-center">Develop your understanding of Ventilation options and get tailored practical guidance.</p>
              </div>
              <Link href="/awareness/guidance" className="block">
                <button className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors text-lg font-semibold">
                  Get practical guidance
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
