'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';

const Page: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentActiveSection = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150 && window.pageYOffset < sectionTop + sectionHeight - 150) {
          currentActiveSection = section.id;
        }
      });

      setActiveSection(currentActiveSection);
      setShowScrollTop(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const sections = [
    {
      id: 'why-care',
      title: 'Why Care?',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      heading: 'Why should we care about air?',
      content: [
        'Air is what you breathe in, and is mainly made of gases (nitrogen and oxygen, just less than 78% and 21% each, argon 0.9%, and then carbon dioxide makes up around 0.04%!). You can survive about a month without food, a few days without water, but only a few minutes without air - that is why air is so important…'
      ]
    },
    {
      id: 'what-is-air-pollution',
      title: 'What Is It?',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      heading: 'What is air pollution?',
      content: [
        'Air pollution is the combination of tiny airborne particles (solid or liquid) and certain gases that are mixed into the air around us, making it less healthy to breathe. These air pollutants mostly come from human activities such as car and lorry exhausts, factory smoke, and even from the furniture in our buildings and paint on our walls. However, some of the particles, such as desert dust (which can travel from the Sahara!) and mould spores, come from natural sources.',
        'The main air pollutants that we are concerned about are:',
        ['Particulate matter (PM2.5 and PM10)', 'Nitrogen dioxide (NO2)', 'Ozone (O3)', 'Carbon monoxide (CO)', 'Sulphur dioxide (SO2)'],
        'There are also other pollutants such as volatile organic compounds (VOCs) which can be found indoors.'
      ]
    },
    {
      id: 'indoor-outdoor',
      title: 'Indoor vs Outdoor',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      heading: 'Indoor vs. outdoor air quality',
      content: [
        'When people think about air pollution, they often think about the quality of the air outdoors. However, indoor air quality is also very important as most of us spend more than 80% of our time indoors.',
        'Indoor air quality can be affected by outdoor air pollution entering buildings, as well as by indoor sources of pollution such as:',
        ['Cooking', 'Cleaning products', 'Furniture and building materials', 'Mould', 'People breathing out carbon dioxide'],
        'Poor ventilation can make indoor air quality worse by allowing pollutants to build up.'
      ]
    },
    {
      id: 'is-it-an-issue',
      title: 'Health Impact',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      heading: 'Is air pollution an issue?',
      content: [
        'Air pollutants can affect people\'s health, as well as the health of the environment. We breathe them in, they enter our lungs and then can move into the bloodstream where they can reach other organs such as our hearts and brains.',
        'Air pollution can cause or worsen a range of health problems including:',
        ['Respiratory diseases such as asthma and chronic obstructive pulmonary disease (COPD)', 'Heart disease', 'Stroke', 'Lung cancer'],
        'It can also affect children\'s lung development and may be linked to other health issues such as diabetes and dementia.'
      ]
    },
    {
      id: 'data-insights',
      title: 'Data Insights',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      heading: 'What to look for in air quality data',
      content: [
        'Sharp increases in the level of any of the indoor air quality metrics we\'re measuring (CO2, PM2.5 or TVOCs), may look alarming even if they are short-lived, but it is much more important to look at averages and the overall trend.',
        'For example, CO2 levels may spike when a room is full of people, but if they quickly return to normal levels when the room is ventilated, this is not necessarily a cause for concern. However, if CO2 levels remain consistently high throughout the day, this could indicate a need for improved ventilation.',
        'Similarly, for PM2.5 and TVOCs, occasional spikes are less concerning than consistently elevated levels. It\'s important to look at the data over time and consider any patterns or trends that emerge.'
      ]
    }
  ];

  return (
    <DefaultLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-50 to-green-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-3 bg-white rounded-full shadow-lg mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">Air Pollution Awareness</h1>
            <p className="text-xl text-green-700 mb-8">Understanding the air we breathe and how it affects our health and environment</p>
            <button 
              onClick={() => scrollToSection('why-care')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center overflow-x-auto py-2 md:py-0">
            <ul className="flex space-x-1 md:space-x-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id 
                        ? 'bg-green-600 text-white shadow-md' 
                        : 'text-green-700 hover:bg-green-100'
                    }`}
                  >
                    <span className="mr-2">{section.icon}</span>
                    <span className="hidden md:inline">{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <section 
              id={section.id} 
              key={section.id} 
              className={`mb-16 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${
                activeSection === section.id ? 'ring-2 ring-green-400' : ''
              }`}
            >
              <div className="bg-green-600 text-white p-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <span className="mr-3 p-2 bg-white text-green-600 rounded-full">
                    {section.icon}
                  </span>
                  {section.heading}
                </h2>
              </div>
              <div className="p-6 md:p-8">
                {section.content.map((item, itemIndex) => {
                  if (Array.isArray(item)) {
                    return (
                      <ul key={itemIndex} className="list-disc list-inside mb-4 text-gray-700 pl-4 grid md:grid-cols-2 gap-2">
                        {item.map((listItem, listItemIndex) => (
                          <li key={listItemIndex} className="mb-1 bg-green-50 p-2 rounded-lg">{listItem}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={itemIndex} className="mb-4 text-gray-700 leading-relaxed">{item}</p>;
                })}
              </div>
              
              {index < sections.length - 1 && (
                <div className="px-8 pb-6 flex justify-end">
                  <button 
                    onClick={() => scrollToSection(sections[index + 1].id)}
                    className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
                  >
                    Next: {sections[index + 1].title}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              )}
            </section>
          ))}

          {/* Call to Action */}
          <div className="bg-green-50 rounded-2xl p-8 text-center shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Ready to take action?</h2>
            <p className="text-green-700 mb-6">Learn how you can improve air quality in your home and community</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md">
                Get Air Quality Tips
              </button>
              <button className="bg-white text-green-700 border-2 border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors shadow-md">
                Find Local Resources
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link href="/awareness">
              <button className="bg-white border-2 border-green-600 text-green-700 px-8 py-4 rounded-full hover:bg-green-50 transition-all transform hover:scale-105 text-lg font-semibold inline-flex items-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Awareness Hub
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all z-30"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </DefaultLayout>
  );
};

export default Page;