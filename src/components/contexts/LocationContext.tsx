import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from "@/components/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

interface LocationContextType {
  lat: number | null;
  lng: number | null;
  locationName: string;
  setLocation: (lat: number, lng: number, name: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [locationName, setLocationName] = useState<string>('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setLat(userData.latitude || null);
          setLng(userData.longitude || null);
          setLocationName(userData.defaultLocation || '');
        }
      } else {
        setLat(null);
        setLng(null);
        setLocationName('');
      }
    });

    return () => unsubscribe();
  }, []);

  const setLocation = (newLat: number, newLng: number, name: string) => {
    setLat(newLat);
    setLng(newLng);
    setLocationName(name);
  };

  return (
    <LocationContext.Provider value={{ lat, lng, locationName, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};