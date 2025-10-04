import React, { useState } from 'react';
import Map from '../../components/Map/Map';

const TrackingPage = () => {
  const [selectedBus, setSelectedBus] = useState(1);

  // Demo data để test
  const demoBuses = [
    { id: 1, busNumber: 'BUS-001', route: 'Bến Thành - Sân Bay' },
    { id: 2, busNumber: 'BUS-002', route: 'Quận 1 - Quận 7' },
    { id: 3, busNumber: 'BUS-003', route: 'Thủ Đức - Quận 3' }
  ];

  // Demo markers
  const demoMarkers = [
    {
      lat: 10.8231,
      lng: 106.6297,
      title: 'Xe buýt BUS-001',
      popup: `
        <div>
          <h3>Xe buýt BUS-001</h3>
          <p>Tốc độ: 45 km/h</p>
          <p>Trạng thái: Đang vận hành</p>
          <p>Cập nhật: ${new Date().toLocaleString('vi-VN')}</p>
        </div>
      `
    },
    {
      lat: 10.7769,
      lng: 106.7009,
      title: 'Xe buýt BUS-002',
      popup: `
        <div>
          <h3>Xe buýt BUS-002</h3>
          <p>Tốc độ: 32 km/h</p>
          <p>Trạng thái: Đang vận hành</p>
          <p>Cập nhật: ${new Date().toLocaleString('vi-VN')}</p>
        </div>
      `
    }
  ];

  const selectedBusData = demoBuses.find(bus => bus.id === selectedBus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">🚌 Theo dõi GPS Xe Buýt</h1>
        
        {/* Bus selector */}
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Chọn xe buýt:</label>
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {demoBuses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.busNumber} - {bus.route}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="card-body p-0">
              <Map 
                center={[10.8231, 106.6297]}
                zoom={13}
                markers={demoMarkers}
                className="h-96 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Bus info sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Thông tin xe buýt</h3>
            </div>
            <div className="card-body">
              {selectedBusData && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Số hiệu</label>
                    <p className="text-lg font-semibold text-blue-600">
                      {selectedBusData.busNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tuyến đường</label>
                    <p className="text-sm text-gray-900">
                      {selectedBusData.route}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Trạng thái</label>
                    <div className="flex items-center mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm text-green-600">Đang hoạt động</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Cập nhật lần cuối</label>
                    <p className="text-sm text-gray-600">
                      {new Date().toLocaleString('vi-VN')}
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <button 
                      onClick={() => window.location.reload()}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      🔄 Làm mới
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map provider info */}
          <div className="card mt-4">
            <div className="card-body">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">🗺️ Bản đồ miễn phí</h4>
                <p className="text-xs text-gray-500">
                  Sử dụng OpenStreetMap
                  <br />
                  <span className="text-green-600">✅ Hoàn toàn miễn phí</span>
                </p>
                <div className="mt-2 p-2 bg-blue-50 rounded">
                  <p className="text-xs text-blue-600">
                    📍 Demo: 2 xe buýt đang hoạt động tại TP.HCM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;