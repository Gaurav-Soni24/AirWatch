'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import Image from 'next/image';

const Page: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'what-is-ventilation', title: 'What is ventilation?' },
    { id: 'types-of-ventilation', title: 'Types of ventilation' },
    { id: 'recommendations', title: 'Recommendations' },
    { id: 'co2-monitors', title: 'CO2 monitors' },
    { id: 'covid-19', title: 'COVID-19 and ventilation' },
  ];

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-green-800 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mr-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ventilation Guidance
        </h1>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-xl p-6 mb-12">
          <nav className="mb-8 sticky top-0 bg-green-50 p-4 rounded-lg shadow-md z-10">
            <ul className="flex flex-wrap justify-center gap-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-green-600 text-white shadow-lg transform scale-105'
                        : 'bg-green-200 text-green-800 hover:bg-green-300'
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <section id="what-is-ventilation" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">What is ventilation and why does it matter?</h2>
            <p className="text-green-600 mb-4">
              Ventilation is the process of refreshing indoor air by allowing air to flow into a space whilst letting air (which may be stale) out. Ventilation helps us maintain good air quality in indoor spaces by diluting and removing pollutants from the air indoors. Ventilation is therefore important for promoting good health, including reducing the spread of respiratory infections such as COVID-19 or the flu, and it has been linked to better sleep and better concentration for learning.
            </p>
          </section>
          
          <section id="types-of-ventilation" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Types of ventilation</h2>
            <p className="text-green-600 mb-4">
              There are two main types of ventilation commonly found in UK rooms:
            </p>
            <ol className="list-decimal list-inside text-green-600 mb-4">
              <li className="mb-2">
                <strong>Natural ventilation:</strong> This is the most common type in UK rooms. It relies on natural processes such as wind and temperature differences to drive air movement. Natural ventilation works through openings like windows, doors, chimneys, and wind catchers. It functions based on pressure differences: air moves from high pressure to low pressure areas. In schools, warm air rises and escapes through upper portions of windows and high-level vents, drawing in fresh air from outside through lower openings.
              </li>
              <li className="mb-2">
                <strong>Mechanical ventilation:</strong> This system uses fans to move fresh air in and stale air out of spaces. Air travels through ducts to vents (often with grills) on ceilings, walls, or floors. It&apos;s important to note that extract ventilation systems (commonly found in toilets and kitchens) that only remove stale air without managing incoming air are not considered full mechanical ventilation.
              </li>
            </ol>
            <p className="text-green-600 mb-4">
              Some rooms use a mixed-mode or hybrid system, combining both natural and mechanical ventilation methods.
            </p>
            <p className="text-green-600 mb-4">
              If your room has openable windows or a door to the outdoors, it has at least some natural ventilation. However, it&apos;s important to note that fire doors should not be propped open and cannot be considered as a source of ventilation.
            </p>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-green-700 font-semibold">Did you know?</p>
              <p className="text-green-600">
                In naturally ventilated rooms, the physics of air movement creates a natural flow: warm air rises and escapes through upper windows and vents, while cooler, fresh air is drawn in through lower openings. This continuous cycle helps maintain air quality and temperature balance.
              </p> 
            </div>
          </section>
          <section id="recommendations" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Recommendations to improve ventilation</h2>
            <p className="text-green-600 mb-4">
              Improving ventilation is crucial for maintaining good indoor air quality. Here are some recommendations for different scenarios:
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-green-700">General recommendations:</h3>
            <ul className="list-disc list-inside text-green-600 mb-6">
              <li>Open windows and doors when possible, especially during breaks or when the room is empty</li>
              <li>Use window restrictors to allow for secure ventilation overnight</li>
              <li>Consider installing trickle vents in windows for constant background ventilation</li>
              <li>Ensure mechanical ventilation systems are properly maintained and running</li>
              <li>Use portable air purifiers in areas with poor ventilation</li>
              <li>Avoid recirculation of air in mechanical systems; use 100% outdoor air if possible</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-green-700">Improving ventilation in naturally ventilated rooms:</h3>
            <p className="text-green-600 mb-4">
              The SAMHE monitor&apos;s CO2 and temperature readings can help balance thermal comfort, heating costs, and air quality. Consider checking readings before occupants arrive and during breaks to assess ventilation needs.
            </p>

            <h4 className="text-lg font-semibold mb-2 text-green-700">Recommendations for different natural ventilation systems:</h4>
            
            <div className="mb-4">
              <h5 className="text-md font-semibold mb-2 text-green-700">All windows on one side, at similar heights:</h5>
              <ul className="list-disc list-inside text-green-600 ml-4">
                <li>Warm months: Open all windows wide to increase ventilation and keep indoors cool</li>
                <li>Cool months: Open different windows to varying extents to avoid cold drafts. Increase opening gradually if CO2 levels rise</li>
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="text-md font-semibold mb-2 text-green-700">High and low windows/openings:</h5>
              <ul className="list-disc list-inside text-green-600 ml-4">
                <li>Warm months: Open both high and low windows to increase airflow</li>
                <li>Cool months: Start with high windows, then open low windows if CO2 levels need further reduction</li>
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="text-md font-semibold mb-2 text-green-700">Windows/doors on different sides of the room:</h5>
              <ul className="list-disc list-inside text-green-600 ml-4">
                <li>Open windows/doors on opposite sides for cross-ventilation</li>
                <li>In colder months, open all windows slightly rather than one window widely</li>
              </ul>
            </div>

            <div className="mb-4">
              <h5 className="text-md font-semibold mb-2 text-green-700">Sash windows:</h5>
              <ul className="list-disc list-inside text-green-600 ml-4">
                <li>Cool months: Open high-level sash first, then low-level if needed</li>
                <li>Warm months: Open both top and bottom levels</li>
              </ul>
            </div>

            <p className="text-green-600 mt-4">
              Remember to balance ventilation with thermal comfort. In colder months, consider periodic ventilation during breaks to maintain a comfortable temperature while ensuring good air quality.
            </p>
          </section>
          
          <section id="co2-monitors" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">CO2 monitors and ventilation levels</h2>
            <p className="text-green-600 mb-4">
              CO2 levels can be used as a proxy for ventilation effectiveness. Here&apos;s a general guide:
            </p>
            <ul className="list-disc list-inside text-green-600">
              <li>Below 800ppm: Good ventilation</li>
              <li>800-1000ppm: Adequate ventilation</li>
              <li>1000-1500ppm: Poor ventilation, action should be considered</li>
              <li>Above 1500ppm: Very poor ventilation, immediate action required</li>
            </ul>
          </section>
          
          <section id="covid-19" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Ventilation and the COVID-19 pandemic</h2>
            <p className="text-green-600 mb-4">
              The COVID-19 pandemic has highlighted the importance of good ventilation in reducing the spread of airborne viruses. Improved ventilation can help dilute virus particles in the air, reducing the risk of transmission.
            </p>
            <p className="text-green-600">
              While ventilation alone cannot eliminate the risk of COVID-19 transmission, it is an important part of a comprehensive strategy that includes mask-wearing, social distancing, and hand hygiene.
            </p>
          </section>
        </div>
        
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
    </DefaultLayout>
  );
};

export default Page;
