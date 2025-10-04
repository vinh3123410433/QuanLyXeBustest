import { useState, useEffect } from 'react';
import Map from './Map';
import { getBusTracking } from '../../services/apiServices';

const TrackingMap = ({ busId, className }) => {
  const [busLocation, setBusLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        setLoading(true);
        
        if (busId) {
          // Fetch real bus tracking data
          const trackingData = await getBusTracking(busId);
          setBusLocation({
            lat: trackingData.latitude,
            lng: trackingData.longitude,
            title: `Xe buýt ${trackingData.busNumber}`,
            popup: `
              <div>
                <h3>Xe buýt ${trackingData.busNumber}</h3>
                <p>Tốc độ: ${trackingData.speed || 0} km/h</p>
                <p>Cập nhật: ${new Date(trackingData.timestamp).toLocaleString()}</p>
              </div>
            `
          });
        } else {
          // Demo data for testing
          setBusLocation({
            lat: 10.8231,
            lng: 106.6297,
            title: 'Xe buýt Demo',
            popup: `
              <div>
                <h3>Xe buýt Demo</h3>
                <p>Tốc độ: 45 km/h</p>
                <p>Trạng thái: Đang vận hành</p>
              </div>
            `
          });
        }
      } catch (error) {
        console.error('Error fetching bus data:', error);
        // Fallback to demo location
        setBusLocation({
          lat: 10.8231,
          lng: 106.6297,
          title: 'Xe buýt (Demo)',
          popup: 'Không thể tải dữ liệu thực tế'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBusData();

    // Auto refresh every 30 seconds
    const interval = setInterval(fetchBusData, 30000);

    return () => clearInterval(interval);
  }, [busId]);

  const markers = busLocation ? [busLocation] : [];
  const center = busLocation ? [busLocation.lat, busLocation.lng] : [10.8231, 106.6297];

  if (loading) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải bản đồ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Map
        center={center}
        zoom={15}
        markers={markers}
        className={className}
      />
      
      {/* Refresh button */}
      <button
        onClick={() => window.location.reload()}
        className="absolute top-2 right-2 bg-white hover:bg-gray-100 p-2 rounded-lg shadow-md transition-colors"
        title="Làm mới"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Status indicator */}
      <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-lg shadow-md">
        <span className="flex items-center text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Đang theo dõi
        </span>
      </div>
    </div>
  );
};

export default TrackingMap;