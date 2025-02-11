'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';

const Page: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentActiveSection = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 50 && window.pageYOffset < sectionTop + sectionHeight - 50) {
          currentActiveSection = section.id;
        }
      });

      setActiveSection(currentActiveSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-green-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mr-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Air Pollution
          </h1>
          
          <nav className="mb-8 sticky top-0 bg-white z-10 p-4 shadow-md rounded-lg">
            <ul className="flex flex-wrap justify-center gap-4">
              {['why-care', 'what-is-air-pollution', 'indoor-outdoor', 'is-it-an-issue', 'data-insights'].map((sectionId) => (
                <li key={sectionId}>
                  <button
                    onClick={() => scrollToSection(sectionId)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeSection === sectionId ? 'bg-green-500 text-white' : 'text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {sectionId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <section id="why-care" className="mb-12 bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Why should we care about air?
            </h2>
            <p className="mb-4 text-green-700">Air is what you breathe in, and is mainly made of gases (nitrogen and oxygen, just less than 78% and 21% each, argon 0.9%, and then carbon dioxide makes up around 0.04%!). You can survive about a month without food, a few days without water, but only a few minutes without air - that is why air is so important…</p>
          </section>

          <section id="what-is-air-pollution" className="mb-12 bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              What is air pollution?
            </h2>
            <p className="mb-4 text-green-700">Air pollution is the combination of tiny airborne particles (solid or liquid) and certain gases that are mixed into the air around us, making it less healthy to breathe. These air pollutants mostly come from human activities such as car and lorry exhausts, factory smoke, and even from the furniture in our buildings and paint on our walls. However, some of the particles, such as desert dust (which can travel from the Sahara!) and mould spores, come from natural sources.</p>
            <p className="mb-4 text-green-700">The main air pollutants that we are concerned about are:</p>
            <ul className="list-disc list-inside mb-4 text-green-700">
              <li>Particulate matter (PM2.5 and PM10)</li>
              <li>Nitrogen dioxide (NO2)</li>
              <li>Ozone (O3)</li>
              <li>Carbon monoxide (CO)</li>
              <li>Sulphur dioxide (SO2)</li>
            </ul>
            <p className="text-green-700">There are also other pollutants such as volatile organic compounds (VOCs) which can be found indoors.</p>
          </section>

          <section id="indoor-outdoor" className="mb-12 bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Indoor vs. outdoor air quality
            </h2>
            <p className="mb-4 text-green-700">When people think about air pollution, they often think about the quality of the air outdoors. However, indoor air quality is also very important as most of us spend more than 80% of our time indoors.</p>
            <p className="mb-4 text-green-700">Indoor air quality can be affected by outdoor air pollution entering buildings, as well as by indoor sources of pollution such as:</p>
            <ul className="list-disc list-inside mb-4 text-green-700">
              <li>Cooking</li>
              <li>Cleaning products</li>
              <li>Furniture and building materials</li>
              <li>Mould</li>
              <li>People breathing out carbon dioxide</li>
            </ul>
            <p className="text-green-700">Poor ventilation can make indoor air quality worse by allowing pollutants to build up.</p>
          </section>

          <section id="is-it-an-issue" className="mb-12 bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Is air pollution an issue?
            </h2>
            <p className="mb-4 text-green-700">Air pollutants can affect people&apos;s health, as well as the health of the environment. We breathe them in, they enter our lungs and then can move into the bloodstream where they can reach other organs such as our hearts and brains.</p>
            <p className="mb-4 text-green-700">Air pollution can cause or worsen a range of health problems including:</p>
            <ul className="list-disc list-inside mb-4 text-green-700">
              <li>Respiratory diseases such as asthma and chronic obstructive pulmonary disease (COPD)</li>
              <li>Heart disease</li>
              <li>Stroke</li>
              <li>Lung cancer</li>
            </ul>
            <p className="text-green-700">It can also affect children&apos;s lung development and may be linked to other health issues such as diabetes and dementia.</p>
          </section>

          <section id="data-insights" className="mb-12 bg-green-50 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              What to look for in air quality data
            </h2>
            <p className="mb-4 text-green-700">Sharp increases in the level of any of the indoor air quality metrics we&apos;re measuring (CO2, PM2.5 or TVOCs), may look alarming even if they are short-lived, but it is much more important to look at averages and the overall trend.</p>
            <p className="mb-4 text-green-700">For example, CO2 levels may spike when a room is full of people, but if they quickly return to normal levels when the room is ventilated, this is not necessarily a cause for concern. However, if CO2 levels remain consistently high throughout the day, this could indicate a need for improved ventilation.</p>
            <p className="text-green-700">Similarly, for PM2.5 and TVOCs, occasional spikes are less concerning than consistently elevated levels. It&apos;s important to look at the data over time and consider any patterns or trends that emerge.</p>
          </section>

          <div className="text-center">
            <Link href="/awareness">
              <button className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors text-lg font-semibold inline-flex items-center shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Awareness
              </button>
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
