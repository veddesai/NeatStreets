import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect, useRef } from "react";

import "maplibre-gl/dist/maplibre-gl.css";
/**
 * Central map component
 */
const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  console.log(mapRef);
  useEffect(() => {
    const lat = 27.176469131898898;
    const long = 30.90805854342192;

    if (mapRef.current === null) {
      const map = L.map("map").setView([lat, long], 8);
      console.log(map)
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
    }

    // Cleanup function to remove the map when the component is unmounted
    return () => {
      if (mapRef.current !== null) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div className="fixed h-screen w-[100%] z-10" id="map"></div>;
};
export default Map;
