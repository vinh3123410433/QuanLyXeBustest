import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ 
  center = [10.8231, 106.6297], // Ho Chi Minh City coordinates
  zoom = 13,
  markers = [],
  onMapClick,
  className = "h-96"
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersLayer = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize map
      mapInstance.current = L.map(mapRef.current).setView(center, zoom);

      // Add OpenStreetMap tiles (Free!)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstance.current);

      // Create markers layer
      markersLayer.current = L.layerGroup().addTo(mapInstance.current);

      // Handle map click
      if (onMapClick) {
        mapInstance.current.on('click', (e) => {
          onMapClick(e.latlng);
        });
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Update markers
  useEffect(() => {
    if (markersLayer.current) {
      markersLayer.current.clearLayers();

      markers.forEach((marker) => {
        const { lat, lng, title, popup } = marker;
        const leafletMarker = L.marker([lat, lng]);
        
        if (title || popup) {
          leafletMarker.bindPopup(popup || title);
        }
        
        leafletMarker.addTo(markersLayer.current);
      });
    }
  }, [markers]);

  // Update map center
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full ${className} border rounded-lg shadow-md`}
    />
  );
};

export default Map;