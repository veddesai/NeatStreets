import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';
const Map:React.FC = () => {
    const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
   
    if (mapRef.current === null) {
      const map = L.map('map').setView([51.505, -0.09], 35);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
}


export default Map