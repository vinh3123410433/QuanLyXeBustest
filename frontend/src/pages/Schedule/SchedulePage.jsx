import React, { useState, useEffect } from 'react';

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [schedules, setSchedules] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    busNumber: '',
    route: '',
    departureTime: '',
    arrivalTime: '',
    driverId: '',
    status: 'scheduled'
  });

  // Demo data
  const demoRoutes = [
    { id: 1, name: 'Bến Thành - Sân Bay', code: 'BT-SB' },
    { id: 2, name: 'Quận 1 - Quận 7', code: 'Q1-Q7' },
    { id: 3, name: 'Thủ Đức - Quận 3', code: 'TD-Q3' }
  ];

  const demoBuses = [
    { id: 1, number: 'BUS-001', capacity: 40, status: 'active' },
    { id: 2, number: 'BUS-002', capacity: 35, status: 'active' },
    { id: 3, number: 'BUS-003', capacity: 45, status: 'maintenance' }
  ];

  const demoDrivers = [
    { id: 1, name: 'Nguyễn Văn A', license: 'B2-123456', phone: '0901234567' },
    { id: 2, name: 'Trần Văn B', license: 'B2-789012', phone: '0907654321' },
    { id: 3, name: 'Lê Văn C', license: 'B2-345678', phone: '0903456789' }
  ];

  // Demo schedules data
  useEffect(() => {
    const demoSchedules = [
      {
        id: 1,
        busNumber: 'BUS-001',
        route: 'Bến Thành - Sân Bay',
        departureTime: '06:00',
        arrivalTime: '07:30',
        driver: 'Nguyễn Văn A',
        status: 'running',
        passengers: 25,
        capacity: 40,
        date: selectedDate
      },
      {
        id: 2,
        busNumber: 'BUS-002',
        route: 'Quận 1 - Quận 7',
        departureTime: '07:00',
        arrivalTime: '08:45',
        driver: 'Trần Văn B',
        status: 'scheduled',
        passengers: 0,
        capacity: 35,
        date: selectedDate
      },
      {
        id: 3,
        busNumber: 'BUS-001',
        route: 'Bến Thành - Sân Bay',
        departureTime: '08:30',
        arrivalTime: '10:00',
        driver: 'Nguyễn Văn A',
        status: 'completed',
        passengers: 38,
        capacity: 40,
        date: selectedDate
      },
      {
        id: 4,
        busNumber: 'BUS-003',
        route: 'Thủ Đức - Quận 3',
        departureTime: '09:15',
        arrivalTime: '11:00',
        driver: 'Lê Văn C',
        status: 'delayed',
        passengers: 20,
        capacity: 45,
        date: selectedDate
      }
    ];
    
    const filtered = selectedRoute === 'all' 
      ? demoSchedules 
      : demoSchedules.filter(s => s.route.includes(selectedRoute));
    
    setSchedules(filtered);
  }, [selectedDate, selectedRoute]);

  const handleCreateSchedule = () => {
    if (!newSchedule.busNumber || !newSchedule.route || !newSchedule.departureTime) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const schedule = {
      id: schedules.length + 1,
      ...newSchedule,
      driver: demoDrivers.find(d => d.id.toString() === newSchedule.driverId)?.name || 'Chưa phân công',
      passengers: 0,
      capacity: demoBuses.find(b => b.number === newSchedule.busNumber)?.capacity || 40,
      date: selectedDate
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      busNumber: '',
      route: '',
      departureTime: '',
      arrivalTime: '',
      driverId: '',
      status: 'scheduled'
    });
    setIsCreating(false);
    alert('Đã tạo lịch trình mới thành công!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'running': return 'Đang chạy';
      case 'completed': return 'Hoàn thành';
      case 'scheduled': return 'Đã lên lịch';
      case 'delayed': return 'Trễ giờ';
      case 'cancelled': return 'Hủy bỏ';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <span>📅</span>
            <span>Quản lý lịch trình</span>
          </h1>
          <p className="text-gray-600 mt-1">Lập lịch và theo dõi các chuyến xe buýt</p>
        </div>
        
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Tạo lịch trình mới</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tuyến đường</label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả tuyến</option>
              {demoRoutes.map((route) => (
                <option key={route.id} value={route.code}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🔄 Làm mới
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🚌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng chuyến</p>
              <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">
                {schedules.filter(s => s.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Đang chạy</p>
              <p className="text-2xl font-bold text-gray-900">
                {schedules.filter(s => s.status === 'running').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Trễ giờ</p>
              <p className="text-2xl font-bold text-gray-900">
                {schedules.filter(s => s.status === 'delayed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Danh sách lịch trình</h3>
          <p className="text-sm text-gray-600">Ngày: {new Date(selectedDate).toLocaleDateString('vi-VN')}</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Xe buýt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tuyến đường
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giờ khởi hành
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giờ đến
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tài xế
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành khách
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">🚌</span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{schedule.busNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.route}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.departureTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.arrivalTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{schedule.driver}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {schedule.passengers}/{schedule.capacity}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(schedule.passengers / schedule.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                      {getStatusText(schedule.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">✏️</button>
                      <button className="text-red-600 hover:text-red-900">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {schedules.length === 0 && (
            <div className="text-center py-12">
              <span className="text-6xl">📅</span>
              <p className="text-gray-500 text-lg mt-4">Không có lịch trình nào cho ngày đã chọn</p>
              <button
                onClick={() => setIsCreating(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Tạo lịch trình mới
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Schedule Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tạo lịch trình mới</h3>
              <button
                onClick={() => setIsCreating(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Xe buýt</label>
                <select
                  value={newSchedule.busNumber}
                  onChange={(e) => setNewSchedule({...newSchedule, busNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn xe buýt</option>
                  {demoBuses.filter(bus => bus.status === 'active').map((bus) => (
                    <option key={bus.id} value={bus.number}>
                      {bus.number} (Sức chứa: {bus.capacity})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tuyến đường</label>
                <select
                  value={newSchedule.route}
                  onChange={(e) => setNewSchedule({...newSchedule, route: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn tuyến đường</option>
                  {demoRoutes.map((route) => (
                    <option key={route.id} value={route.name}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giờ khởi hành</label>
                  <input
                    type="time"
                    value={newSchedule.departureTime}
                    onChange={(e) => setNewSchedule({...newSchedule, departureTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giờ đến</label>
                  <input
                    type="time"
                    value={newSchedule.arrivalTime}
                    onChange={(e) => setNewSchedule({...newSchedule, arrivalTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tài xế</label>
                <select
                  value={newSchedule.driverId}
                  onChange={(e) => setNewSchedule({...newSchedule, driverId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn tài xế</option>
                  {demoDrivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.license}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsCreating(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateSchedule}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Tạo lịch trình
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;