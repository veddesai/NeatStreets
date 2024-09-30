/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

const LocationFetcher: React.FC<{
  onLocationChange: (lat: number, lng: number) => void;
  onAddressChange: (address: string) => void;
}> = ({ onLocationChange, onAddressChange }) => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.address.state_district) {
        onAddressChange(data.address.state_district);
      } else if (data && data.address.state) {
        onAddressChange(data.address.state);
      } else {
        onAddressChange("Location not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      onAddressChange("Error fetching address");
    }
  };
//left on position stuff - ved
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({
          lat: latitude,
          lng: longitude,
        });

        onLocationChange(latitude, longitude);
        fetchAddress(latitude, longitude);
      },
      (error) => {
        console.error("Error getting live location: ", error);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null; 
};

export default LocationFetcher;
