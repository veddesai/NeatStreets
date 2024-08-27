import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect, useRef, useState } from "react";

import "maplibre-gl/dist/maplibre-gl.css";



const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

 

  useEffect(() => {
    const storedLatitude = localStorage.getItem("latitude");
    const storedLongitude = localStorage.getItem("longitude");

    if (storedLatitude && storedLongitude) {
      setPosition({
        lat: parseFloat(storedLatitude),
        lng: parseFloat(storedLongitude),
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          localStorage.setItem("latitude", position.coords.latitude.toString());
          localStorage.setItem("longitude", position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error getting location : ", error);
        }
      );
    }

    if (mapRef.current === null) {
      const map = L.map("map").setView([position.lat, position.lng], 15);
      const marker = L.marker([position.lat,position.lng]).addTo(map);
      mapRef.current = map;
      markerRef.current = marker;
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 2
      }).addTo(map);
    }
    else if (markerRef.current !== null) {
      
      markerRef.current.setLatLng([position.lat, position.lng]);
      mapRef.current.setView([position.lat, position.lng]);
    }

    return () => {
      if (mapRef.current !== null) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [position.lat, position.lng]);

  
  return <div className={`fixed h-screen w-[100%] z-10 `} id="map"></div>;
};
export default Map;
