import { useState, useRef, useEffect } from 'react';
import { useLocation } from '../components/contexts/LocationContext';

const API_KEY = "2c746d271c1a4632b04eebccb46442dd"; // Consider moving this to an environment variable

export const useLocationSearch = () => {
  const { setLocation, locationName } = useLocation();
  const [query, setQuery] = useState(locationName);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => setIsSearchActive((prev) => !prev);

  const fetchLocations = async (searchQuery: string) => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${searchQuery}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setResults(data.features || []);
      setActiveIndex(-1);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() !== "") {
      fetchLocations(searchQuery);
    } else {
      setResults([]);
    }
  };

  const handleLocationSelect = (location: any) => {
    const formattedName = location.properties.formatted;
    setQuery(formattedName);
    setIsSearchActive(false);
    setResults([]);
    setLocation(location.properties.lat, location.properties.lon, formattedName);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleLocationSelect(results[activeIndex]);
    }
  };

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    setQuery(locationName);
  }, [locationName]);

  const clearInput = () => {
    setQuery("");
    setResults([]);
    setIsSearchActive(false);
  };

  return {
    query,
    setQuery,
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
  };
};
