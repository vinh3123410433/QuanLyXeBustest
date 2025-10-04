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
          <p style="margin: 4px 0; color: #6b7280; font-size: 12px;">
            <strong>Thứ tự:</strong> Điểm dừng số ${index + 1}
          </p>
          <p style="margin: 4px 0; color: #6b7280; font-size: 12px;">
            <strong>Cập nhật:</strong> ${new Date().toLocaleString('vi-VN')}
          </p>
          ${isConfirmed ? 
            '<p style="margin: 8px 0; padding: 4px 8px; background: #d1fae5; color: #065f46; border-radius: 4px; font-size: 11px; text-align: center;">📱 Phụ huynh đã được thông báo</p>' : 
            '<p style="margin: 8px 0; padding: 4px 8px; background: #fef3c7; color: #92400e; border-radius: 4px; font-size: 11px; text-align: center;">⏳ Chờ xe đến điểm này</p>'
          }
        </div>
      `
    };
  });

  // Function để tài xế xác nhận điểm đến
  const confirmStop = (stopId) => {
    setConfirmedStops(prev => {
      if (!prev.includes(stopId)) {
        const stop = demoStops.find(s => s.id === stopId);
        // Thông báo bằng tiếng Việt
        alert(`📍 Đã xác nhận đến "${stop.name}"\n📱 Đang gửi thông báo tới phụ huynh...\n✅ Thông báo đã được gửi thành công!`);
        return [...prev, stopId];
      }
      return prev;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🚌 Bảng điều khiển tài xế</h1>
          <p className="text-gray-600 mt-1">Xác nhận điểm đến và thông báo phụ huynh</p>
        </div>
        
        {/* Bus selector */}
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border">
          <label className="text-sm font-medium text-gray-700">Xe buýt hiện tại:</label>
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
          >
            {demoBuses.map((bus) => (
              <option key={bus.id} value={bus.id}>
                {bus.busNumber} - {bus.route}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-800">🗺️ Bản đồ tuyến đường</h3>
              <p className="text-sm text-gray-600">Vị trí các điểm dừng trên tuyến</p>
            </div>
            <div className="card-body p-0">
              <SimpleMap 
                center={[10.8231, 106.6297]}
                zoom={13}
                markers={demoMarkers}
                className="h-96 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="lg:col-span-1">
          {/* Thông tin xe buýt */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-blue-700">📊 Thông tin chuyến đi</h3>
            </div>
            <div className="card-body">
              {selectedBusData && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <label className="text-sm font-medium text-blue-600">Số hiệu xe</label>
                    <p className="text-xl font-bold text-blue-800">
                      {selectedBusData.busNumber}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Tuyến đường</label>
                    <p className="text-sm font-semibold text-gray-900">
                      {selectedBusData.route}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Trạng thái hoạt động</label>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm font-medium text-green-600">Đang vận hành</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Tiến độ hành trình</label>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${((demoStops.filter(s => s.confirmed).length + confirmedStops.length) / demoStops.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        <span className="font-semibold">{demoStops.filter(s => s.confirmed).length + confirmedStops.length}</span>
                        <span className="text-gray-400"> / </span>
                        <span className="font-semibold">{demoStops.length}</span> điểm đã hoàn thành
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <label className="text-sm font-medium text-gray-500">Cập nhật lần cuối</label>
                    <p className="text-sm text-gray-700 font-medium">
                      {new Date().toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Driver confirmation panel */}
          <div className="card mt-4">
            <div className="card-header bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <h3 className="text-lg font-semibold">🚏 Bảng điều khiển tài xế</h3>
              <p className="text-sm opacity-90">Xác nhận điểm đến và gửi thông báo</p>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                {demoStops.map((stop, index) => {
                  const isConfirmed = stop.confirmed || confirmedStops.includes(stop.id);
                  return (
                    <div 
                      key={stop.id}
                      className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                        isConfirmed 
                          ? 'bg-green-50 border-green-300 shadow-sm' 
                          : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              isConfirmed ? 'bg-green-500' : 'bg-gray-400'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{stop.name}</p>
                              <p className={`text-sm font-medium ${
                                isConfirmed ? 'text-green-600' : 'text-orange-500'
                              }`}>
                                {isConfirmed ? '✅ Đã đến - Phụ huynh đã được thông báo' : '🚌 Đang di chuyển đến điểm này'}
                              </p>
                            </div>
                          </div>
                        </div>
                        {!isConfirmed && (
                          <button
                            onClick={() => confirmStop(stop.id)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                          >
                            📍 Đã đến
                          </button>
                        )}
                        {isConfirmed && (
                          <div className="text-green-600 font-semibold">
                            ✓ Hoàn thành
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                <div className="text-center">
                  <p className="text-blue-700 font-semibold mb-2">📱 Hệ thống thông báo tự động</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-blue-600">
                    <div className="flex items-center justify-center space-x-1">
                      <span>📧</span>
                      <span>Gửi tin nhắn SMS</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <span>�</span>
                      <span>Thông báo ứng dụng</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-500 mt-2">
                    Phụ huynh sẽ nhận thông báo ngay khi xe đến điểm đón/trả
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Thông báo phụ huynh */}
          <div className="card mt-4">
            <div className="card-header bg-purple-500 text-white">
              <h3 className="text-lg font-semibold">📱 Thông báo phụ huynh</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-700 mb-2">Thông báo gần đây:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">SMS gửi thành công:</span>
                      <span className="font-semibold text-green-600">15 phụ huynh</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Thông báo ứng dụng:</span>
                      <span className="font-semibold text-blue-600">12 thiết bị</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors">
                    📢 Gửi thông báo thủ công
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Gửi thông báo đặc biệt tới tất cả phụ huynh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Làm mới */}
          <div className="card mt-4">
            <div className="card-body">
              <button 
                onClick={() => window.location.reload()}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>🔄</span>
                <span>Làm mới dữ liệu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingPage