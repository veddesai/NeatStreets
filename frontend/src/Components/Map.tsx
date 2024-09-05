import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect, useRef, useState } from "react";

import "maplibre-gl/dist/maplibre-gl.css";

import markerIconPng from "leaflet/dist/images/marker-icon.png"; // Default marker icon
import markerIconRetinaPng from "leaflet/dist/images/marker-icon-2x.png"; // Retina version
import markerShadowPng from "leaflet/dist/images/marker-shadow.png"; // Shadow

const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const customIcon = L.icon({
    iconUrl: markerIconPng,
    iconRetinaUrl: markerIconRetinaPng,
    shadowUrl: markerShadowPng, // Remove or leave depending on shadow
    iconSize: [25, 41], // Default size
    iconAnchor: [12, 41], // Position of the "tip"
    popupAnchor: [1, -34],
    shadowSize: [41, 41], // Shadow size
  });

  useEffect(() => {
    if (mapRef.current === null) {
      const map = L.map("map").setView([position.lat, position.lng], 15);
      const marker = L.marker([position.lat,position.lng],{icon: customIcon}).addTo(map);
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

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        localStorage.setItem(
          "latitude",
          position.coords.latitude.toString()
        );
        localStorage.setItem(
          "longitude",
          position.coords.longitude.toString()
        );
        if (markerRef.current) {
          markerRef.current.setLatLng([position.coords.latitude, position.coords.longitude]);
        }
        if (mapRef.current) {
          mapRef.current.setView([position.coords.latitude, position.coords.longitude]);
        }
      },
      (error) => {
        console.error("Error getting live location: ", error);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      if (mapRef.current !== null) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      navigator.geolocation.clearWatch(watchId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return <div className={`fixed h-screen w-[100%] z-10 `} id="map"></div>;
};
export default Map;
