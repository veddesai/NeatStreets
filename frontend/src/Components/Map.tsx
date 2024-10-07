import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster";  // Import marker cluster
import { useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaPng from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { useLocation } from "../context/LocationContext";

enum Role {
  END_USER = "END_USER",
  ADMIN = "ADMIN",
  HELPER = "HELPER",
}



interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  fullname: string;
  points: number;
}


interface Post {
  id: string;
  description: string;
  imageUrl: string;
  lat: number;
  lng: number;
  address: string;
  reportedAt: string;
  status: "NEW" | "IN_PROGRESS" | "COMPLETED";
  reportedBy: User;
  assignedTo?: User;
  completionTime?: string;
}

const Map: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerClusterGroup = useRef<any>(null); // Cluster Group

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts/all`, {
        withCredentials: true,
      });

      response.data.forEach((report:Post) => {
        const marker = L.marker([report.lat, report.lng], {
          icon: L.icon({
            iconUrl: markerIconPng,
            iconRetinaUrl: markerIconRetinaPng,
            shadowUrl: markerShadowPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        }).bindPopup(`
          <div>
            <h3>${report.description}</h3>
            <p>Status: ${report.status}</p>
            <p>Reported At: ${new Date(report.reportedAt).toLocaleDateString()}</p>
            <a href="/posts">View Report</a>
          </div>
        `);

        markerClusterGroup.current?.addLayer(marker); // Add marker to cluster group
      });

      mapRef.current?.addLayer(markerClusterGroup.current); // Add cluster group to map
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  useEffect(() => {
    if (mapRef.current === null) {
      const map = L.map("map").setView([location.location.lat ?? 0, location.location.lng ?? 0], 13);
      mapRef.current = map;
      markerClusterGroup.current = L.markerClusterGroup();

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      fetchReportData();
    }
  }, []);

  return <div id="map" className="h-screen w-full z-10"></div>;
};

export default Map;
