/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Location {
  lat: number | null;
  lng: number | null;
  address: string;
}

interface LocationContextProps {
  location: Location;
  updateLocation: (lat: number, lng: number, address: string) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined
);

export const useLocation = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location>(() => {
    const savedLocation = sessionStorage.getItem("location");
    return savedLocation
      ? JSON.parse(savedLocation)
      : { lat: null, lng: null, address: "" };
  });

  const updateLocation = (lat: number, lng: number, address: string) => {
    const newLocation = { lat, lng, address };
    setLocation(newLocation);
    sessionStorage.setItem("location", JSON.stringify(newLocation)); 
  };

  const isLocationChanged = (
    newLat: number | null,
    newLng: number | null
  ): boolean => {
    return (
      newLat !== location.lat || newLng !== location.lng
    );
  };

  useEffect(() => {
    
    if (!location.lat || !location.lng) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchAddress(latitude, longitude).then((address) => {
              updateLocation(latitude, longitude, address);
            });
          },
          (error) => console.error("Error fetching location:", error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }
    } else {
    
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (isLocationChanged(latitude, longitude)) {
            fetchAddress(latitude, longitude).then((address) => {
              updateLocation(latitude, longitude, address);
            });
          }
        },
        (error) => console.error("Error watching location:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [location.lat, location.lng]);

  const fetchAddress = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      const { address } = data;

      if (!address) return "Unknown Location";

      const addressParts: string[] = [];

      if (address.city) {
        addressParts.push(address.city);
      } else if (address.state_district) {
        addressParts.push(address.state_district);
      }

      if (address.state) {
        addressParts.push(address.state);
      }

      if (!address.state && address.country) {
        addressParts.push(address.country);
      }

      const prioritizedAddress = addressParts.join(", ");

      return prioritizedAddress || "Unknown Location";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown Location";
    }
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
