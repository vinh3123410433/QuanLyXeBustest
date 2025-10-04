import React, { useState } from 'react';
import SimpleMap from '../../components/Map/SimpleMap';

const TrackingPage = () => {
  const [selectedBus, setSelectedBus] = useState(1);

  // Demo data để test
  const demoBuses = [
    { id: 1, busNumber: 'BUS-001', route: 'Bến Thành - Sân Bay' },
    { id: 2, busNumber: 'BUS-002', route: 'Quận 1 - Quận 7' },
    { id: 3, busNumber: 'BUS-003', route: 'Thủ Đức - Quận 3' }
  ];

  // Demo stops và driver confirmations
  const [confirmedStops, setConfirmedStops] = useState([]);
  
  const demoStops = [
    { id: 1, name: 'Bến xe Bến Thành', lat: 10.8231, lng: 106.6297, confirmed: false },
    { id: 2, name: 'Chợ Tân Định', lat: 10.7890, lng: 106.6850, confirmed: true },
    { id: 3, name: 'Công viên Tao Đàn', lat: 10.7769, lng: 106.6909, confirmed: true },
    { id: 4, name: 'Sân bay Tân Sơn Nhất', lat: 10.8187, lng: 106.6519, confirmed: false }
  ];

  // Tìm thông tin xe buýt được chọn
  const selectedBusData = demoBuses.find(bus => bus.id === selectedBus);

  // Tạo markers cho các điểm dừng
  const demoMarkers = demoStops.map((stop, index) => {
    const isConfirmed = stop.confirmed || confirmedStops.includes(stop.id);
    return {
      lat: stop.lat,
      lng: stop.lng,
      title: stop.name,
      popup: `
        <div style="font-family: Arial, sans-serif; min-width: 200px;">
          <h3 style="color: #1f2937; margin-bottom: 8px; font-weight: bold;">📍 ${stop.name}</h3>
          <p style="margin: 4px 0; color: ${isConfirmed ? '#059669' : '#d97706'}; font-weight: 600;">
            ${isConfirmed ? '✅ Xe đã đến điểm này' : '🚌 Xe đang trên đường đến'}
          </p>
          <p style="margin: 4px 0; color: #4b5563;">
            <strong>Xe buýt:</strong> ${selectedBusData?.busNumber || 'Chưa xác định'}
          </p>
          <p style="margin: 4px 0; color: #4b5563;">
            <strong>Tuyến:</strong> ${selectedBusData?.route || 'Chưa xác định'}
          </p>
        </div>
      `
    };
  });

  // Function để tài xế xác nhận điểm đến
  const confirmStop = (stopId) => {
    setConfirmedStops(prev => {
      if (!prev.includes(stopId)) {
        const stop = demoStops.find(s => s.id === stopId);
        alert(`✅ Đã xác nhận đến "${stop.name}"! Đang thông báo phụ huynh...`);
        return [...prev, stopId];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header đơn giản */}
      <div className="bg-white shadow-md px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
              <span>🚌</span>
              <span>Điều khiển xe buýt</span>
            </h1>
            <p className="text-gray-600">Giao diện tài xế - Theo dõi và xác nhận điểm đến</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Xe hiện tại:</label>
            <select
              value={selectedBus}
              onChange={(e) => setSelectedBus(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {demoBuses.map((bus) => (
                <option key={bus.id} value={bus.id}>
                  {bus.busNumber} - {bus.route}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main content - Map ở giữa, Controls bên phải */}
      <div className="flex h-screen">
        {/* Map section - chiếm phần lớn */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow-lg h-full">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <span>🗺️</span>
                <span>Bản đồ tuyến đường</span>
              </h3>
              <p className="text-sm text-gray-600">
                Tuyến: {selectedBusData?.route} | Xe: {selectedBusData?.busNumber}
              </p>
            </div>
            <div className="h-full p-0">
              <SimpleMap 
                center={[10.8231, 106.6297]}
                zoom={13}
                markers={demoMarkers}
                className="w-full h-5/6 rounded-b-lg"
              />
            </div>
          </div>
        </div>

        {/* Right sidebar - Controls */}
        <div className="w-80 p-4">
          <div className="bg-white rounded-lg shadow-lg h-full">
            {/* Header */}
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <span>🚏</span>
                <span>Xác nhận điểm đến</span>
              </h3>
              <p className="text-sm opacity-90">Nhấn khi xe đã đến điểm dừng</p>
            </div>

            {/* Progress */}
            <div className="p-4 bg-gray-50 border-b">
              <div className="text-center mb-3">
                <span className="text-2xl font-bold text-blue-600">
                  {demoStops.filter(s => s.confirmed).length + confirmedStops.length}
                </span>
                <span className="text-gray-500"> / {demoStops.length}</span>
                <p className="text-sm text-gray-600">Điểm đã hoàn thành</p>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${((demoStops.filter(s => s.confirmed).length + confirmedStops.length) / demoStops.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>

            {/* Stop list */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {demoStops.map((stop, index) => {
                  const isConfirmed = stop.confirmed || confirmedStops.includes(stop.id);
                  return (
                    <div 
                      key={stop.id}
                      className={`p-3 rounded-lg border-2 ${
                        isConfirmed 
                          ? 'bg-green-50 border-green-300' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            isConfirmed ? 'bg-green-500' : 'bg-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-800 text-sm">{stop.name}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-600 mb-2">
                        {isConfirmed ? '✅ Đã hoàn thành - Phụ huynh đã được thông báo' : '⏳ Chờ xe đến điểm này'}
                      </div>
                      
                      {!isConfirmed ? (
                        <button
                          onClick={() => confirmStop(stop.id)}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
                        >
                          📍 Xác nhận đã đến
                        </button>
                      ) : (
                        <div className="text-center py-2 bg-green-100 rounded-md">
                          <span className="text-green-700 font-medium text-sm">✓ Hoàn thành</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
              <div className="space-y-2">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium text-sm">
                  📱 Thông báo tất cả phụ huynh
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium text-sm"
                >
                  🔄 Làm mới
                </button>
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-2">
                Cập nhật: {new Date().toLocaleTimeString('vi-VN')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;