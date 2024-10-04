import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaPng from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { useLocation } from "../context/LocationContext";
import axios from "axios";
import "../assets/utils.css"
import { API_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const { location } = useLocation();
  const navigate = useNavigate();

  const fetchReportCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts/${location.address}`, {
        withCredentials: true,
      });
      const reportCount = response.data.length;
      if (markerRef.current !== null) {
        markerRef.current
          .bindTooltip(
            `
          <div class="font-bold">
           <div>Hello from <span class="text-blue-600 dark:text-yellow-500">${location.address}</span> </div>
           <div> No. of Reports Here : <span class="text-blue-600 dark:text-yellow-500">${reportCount}</span></div>
          </div>
     
            `
          )
          .openTooltip()
          .addEventListener("click", () => navigate("/posts"));
      }
    } catch (error) {
      console.error("Error fetching report count:", error);
    }
  };

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
    if (!location.lat || !location.lng) return;

    if (mapRef.current === null) {
      const map = L.map("map").setView([location.lat, location.lng], 15);
      const marker = L.marker([location.lat, location.lng], {
        icon: customIcon,
      }).addTo(map);
      mapRef.current = map;
      markerRef.current = marker;
      markerRef.current.bindTooltip(` <div>Hello from <span class="text-blue-600 dark:text-yellow-500">${location.address}</span> </div>`);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 2,
      }).addTo(map);
    } else if (markerRef.current !== null) {
      markerRef.current.setLatLng([location.lat, location.lng]);

      mapRef.current.setView([location.lat, location.lng]);
      fetchReportCount();
    }
  }, [location, customIcon]);
//Have to do something reg this - Ved
  return <div id="map" className="fixed h-screen w-[100%]"></div>;
};

export default Map;
