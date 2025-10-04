import { useEffect, useRef } from 'react';

const SimpleMap = ({ 
  center = [10.8231, 106.6297], 
  zoom = 13,
  markers = [],
  onMapClick,
  className = "h-96"
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    // Dynamically load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        cssLink.crossOrigin = '';
        document.head.appendChild(cssLink);
      }

      // Load Leaflet JS
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        
        script.onload = () => {
          initializeMap();
        };
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current && window.L && !mapInstance.current) {
        try {
          // Initialize map
          mapInstance.current = window.L.map(mapRef.current).setView(center, zoom);

          // Add OpenStreetMap tiles
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }).addTo(mapInstance.current);

          // Add markers if any
          markers.forEach((marker) => {
            const leafletMarker = window.L.marker([marker.lat, marker.lng]);
            if (marker.popup || marker.title) {
              leafletMarker.bindPopup(marker.popup || marker.title);
            }
            leafletMarker.addTo(mapInstance.current);
          });

          // Handle map click
          if (onMapClick) {
            mapInstance.current.on('click', (e) => {
              onMapClick(e.latlng);
            });
          }

        } catch (error) {
          console.error('Error initializing map:', error);
          // Show fallback message
          if (mapRef.current) {
            mapRef.current.innerHTML = `
              <div class="flex items-center justify-center h-full bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg">
                <div class="text-center">
                  <div class="text-4xl mb-2">🗺️</div>
                  <p class="text-blue-600 font-semibold">Bản đồ tuyến xe buýt</p>
                  <p class="text-blue-500 text-sm mt-1">Đang tải bản đồ...</p>
                  <div class="mt-4 space-y-2">
                    ${markers.map((marker, index) => 
                      `<div class="bg-white px-3 py-2 rounded shadow text-sm">
                        📍 ${marker.title || `Điểm ${index + 1}`}
                      </div>`
                    ).join('')}
                  </div>
                </div>
              </div>
            `;
          }
        }
      }
    };

    loadLeaflet();

    return () => {
      if (mapInstance.current) {
        try {
          mapInstance.current.remove();
          mapInstance.current = null;
        } catch (error) {
          console.error('Error cleaning up map:', error);
        }
      }
    };
  }, []);

  // Update markers when they change
  useEffect(() => {
    if (mapInstance.current && window.L) {
      try {
        // Clear existing markers
        mapInstance.current.eachLayer((layer) => {
          if (layer instanceof window.L.Marker) {
            mapInstance.current.removeLayer(layer);
          }
        });

        // Add new markers
        markers.forEach((marker) => {
          const leafletMarker = window.L.marker([marker.lat, marker.lng]);
          if (marker.popup || marker.title) {
            leafletMarker.bindPopup(marker.popup || marker.title);
          }
          leafletMarker.addTo(mapInstance.current);
        });
      } catch (error) {
        console.error('Error updating markers:', error);
      }
    }
  }, [markers]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full ${className} border rounded-lg shadow-md bg-gray-100`}
      style={{ minHeight: '300px' }}
    />
  );
};

export default SimpleMap;