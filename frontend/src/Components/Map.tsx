import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect, useRef, useState } from "react";

import "maplibre-gl/dist/maplibre-gl.css";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaPng from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

import LocationFetcher from "./LocationFetcher"; // Import the combined component

const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [address, setAddress] = useState<string>("");
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

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
    if (mapRef.current === null) {
      const map = L.map("map").setView([position.lat, position.lng], 15);
      const marker = L.marker([position.lat, position.lng], {
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
      markerRef.current.setLatLng([position.lat, position.lng]);
      mapRef.current.setView([position.lat, position.lng]);
    }
  }, [position, customIcon]);

  return (
    <div id="map" className="fixed h-screen w-[100%]">
      <LocationFetcher
        onLocationChange={(lat, lng) => setPosition({ lat, lng })}
        onAddressChange={(newAddress) => setAddress(newAddress)}
      />
      <div className="absolute top-0 left-8 m-4 p-2 bg-slate-50 dark:bg-slate-900 dark:text-white rounded shadow z-[1000]">
        <h3>Current Location:</h3>
        <p>{address || "Fetching address..."}</p>
      </div>
    </div>
  );
};

export default Map;
