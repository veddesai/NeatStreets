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
  locationGranted: boolean;
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
  const [locationGranted, setLocationGranted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const updateLocation = (lat: number, lng: number, address: string) => {
    const newLocation = { lat, lng, address };
    setLocation(newLocation);
    sessionStorage.setItem("location", JSON.stringify(newLocation));
    setLocationGranted(true); // Location access granted
  };

  const isLocationChanged = (
    newLat: number | null,
    newLng: number | null
  ): boolean => {
    return newLat !== location.lat || newLng !== location.lng;
  };

  useEffect(() => {
    let watchId: number;
  
    if (!location.lat || !location.lng) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchAddress(latitude, longitude).then((address) => {
              updateLocation(latitude, longitude, address);
              setShowAlert(false);
            });
          },
          (error) => {
            console.error("Error fetching location:", error);
            setShowAlert(true);
          },
          {
            enableHighAccuracy: true, // Use high accuracy
            timeout: 10000,           // 10 seconds timeout
            maximumAge: 60000,        // Cache for 1 minute
          }
        );
      }
    } else {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (isLocationChanged(latitude, longitude)) {
            fetchAddress(latitude, longitude).then((address) => {
              updateLocation(latitude, longitude, address);
            });
          }
        },
        (error) => console.error("Error watching location:", error),
        {
          enableHighAccuracy: true, // Use high accuracy
          timeout: 10000,           // 10 seconds timeout
          maximumAge: 60000,        // Cache for 1 minute
        }
      );
    }
  
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [location.lat, location.lng]);
  

  const fetchAddress = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const { address } = data;

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
      return addressParts.join(", ") || "Unknown Location";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown Location";
    }
  };

  return (
    <LocationContext.Provider
      value={{ location, updateLocation, locationGranted }}
    >
      {showAlert && (
        <div className="h-screen w-full flex justify-center items-center text-4xl dark:text-white">
          Please allow location access to use this website.
        </div>
      )}
      {!showAlert && children}
    </LocationContext.Provider>
  );
};
