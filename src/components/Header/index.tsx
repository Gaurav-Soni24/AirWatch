import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import WeatherWidget from "./WeatherWidget";
import Image from "next/image";
import React from "react";
import { useLocationSearch } from "@/hooks/useLocationSearch";

const Header: React.FC<{
  sidebarOpen: boolean;
  setSidebarOpen: (arg0: boolean) => void;
}> = ({ sidebarOpen, setSidebarOpen }) => {
  const {
    query,
    isSearchActive,
    setIsSearchActive,
    results,
    activeIndex,
    inputRef,
    toggleSearch,
    handleInputChange,
    handleLocationSelect,
    handleKeyDown,
    clearInput
  } = useLocationSearch();

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "!w-full delay-300"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "delay-400 !w-full"
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "!w-full delay-500"
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "!h-0 !delay-[0]"
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!sidebarOpen && "!h-0 !delay-200"
                    }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

        </div>

        <div className="w-full">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search location..."
              className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsSearchActive(true)}
            />
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2"
              onClick={toggleSearch}
            >
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>
            {query && isSearchActive && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2"
                onClick={clearInput}
              >
                <svg
                  className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.68342 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z"
                    fill=""
                  />
                </svg>
              </button>
            )}
          </div>
          {isSearchActive && results.length > 0 && (
            <div className="absolute z-10 mt-2 w-full max-w-[300px] rounded-md bg-white shadow-lg dark:bg-boxdark">
              {results.map((result: any, index: number) => (
                <div
                  key={index}
                  className={`cursor-pointer px-4 py-2 transition-colors duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-meta-4 ${index === activeIndex ? "bg-gray-100 dark:bg-meta-4" : ""
                    }`}
                  onClick={() => handleLocationSelect(result)}
                >
                  <p className="text-sm text-black dark:text-white">
                    {result.properties.formatted}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}

            <div className="flex items-center">
              {/* Other header items */}
              <WeatherWidget />
            </div>

          </ul>

        </div>
      </div>
    </header>
  );
};

export default Header;
