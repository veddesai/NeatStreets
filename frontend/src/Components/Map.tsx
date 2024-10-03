import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaPng from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { useLocation } from "../context/LocationContext";

const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const { location } = useLocation();
  const customIcon = L.icon({
    iconUrl: markerIconPng,
    iconRetinaUrl: markerIconRetinaPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    if (!location.lat || !location.lng) return; // Wait until location is available

    if (mapRef.current === null) {
      const map = L.map("map").setView([location.lat, location.lng], 15);
      const marker = L.marker([location.lat, location.lng], {
        icon: customIcon,
      }).addTo(map);
      mapRef.current = map;
      markerRef.current = marker;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 2,
      }).addTo(map);
    } else if (markerRef.current !== null) {
      markerRef.current.setLatLng([location.lat, location.lng]);
      mapRef.current.setView([location.lat, location.lng]);
    }
  }, [location, customIcon]);

  return <div id="map" className="fixed h-screen w-[100%]"></div>;
};

export default Map;
