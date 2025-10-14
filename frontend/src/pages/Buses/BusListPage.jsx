import React, { useState, useEffect } from 'react';

const BusListPage = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [routeFilter, setRouteFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [newBus, setNewBus] = useState({
    number: '',
    licensePlate: '',
    capacity: '',
    model: '',
    year: '',
    route: '',
    driver: '',
    status: 'active',
    fuelType: 'diesel'
  });

  // Demo routes for selection
  const routes = [
    { id: 1, name: 'Bến Thành - Sân Bay', code: 'BT-SB-01' },
    { id: 2, name: 'Quận 1 - Quận 7', code: 'Q1-Q7-02' },
    { id: 3, name: 'Thủ Đức - Quận 3', code: 'TD-Q3-03' },
    { id: 4, name: 'Gò Vấp - Bình Thạnh', code: 'GV-BT-04' }
  ];

  const drivers = [
    { id: 1, name: 'Nguyễn Văn A', license: 'B2-123456' },
    { id: 2, name: 'Trần Văn B', license: 'B2-789012' },
    { id: 3, name: 'Lê Văn C', license: 'B2-345678' },
    { id: 4, name: 'Phạm Văn D', license: 'B2-901234' }
  ];

  // Demo buses data
  useEffect(() => {
    const demoBuses = [
      {
        id: 1,
        number: 'BUS-001',
        licensePlate: '51B-123.45',
        capacity: 40,
        model: 'Thaco TB120S',
        year: 2022,
        route: 'Bến Thành - Sân Bay',
        routeCode: 'BT-SB-01',
        driver: 'Nguyễn Văn A',
        driverLicense: 'B2-123456',
        status: 'active',
        fuelType: 'diesel',
        mileage: '45,230 km',
        lastMaintenance: '2024-09-15',
        nextMaintenance: '2024-11-15',
        dailyTrips: 4,
        monthlyRevenue: '12,500,000 VND',
        fuelConsumption: '8.5 L/100km',
        createdAt: '2022-03-15'
      },
      {
        id: 2,
        number: 'BUS-002',
        licensePlate: '51B-678.90',
        capacity: 35,
        model: 'Hyundai County',
        year: 2021,
        route: 'Quận 1 - Quận 7',
        routeCode: 'Q1-Q7-02',
        driver: 'Trần Văn B',
        driverLicense: 'B2-789012',
        status: 'active',
        fuelType: 'diesel',
        mileage: '62,150 km',
        lastMaintenance: '2024-08-20',
        nextMaintenance: '2024-10-20',
        dailyTrips: 3,
        monthlyRevenue: '10,200,000 VND',
        fuelConsumption: '9.2 L/100km',
        createdAt: '2021-05-10'
      },
      {
        id: 3,
        number: 'BUS-003',
        licensePlate: '51B-234.56',
        capacity: 45,
        model: 'Isuzu NQR75',
        year: 2023,
        route: 'Thủ Đức - Quận 3',
        routeCode: 'TD-Q3-03',
        driver: 'Lê Văn C',
        driverLicense: 'B2-345678',
        status: 'maintenance',
        fuelType: 'CNG',
        mileage: '28,900 km',
        lastMaintenance: '2024-10-01',
        nextMaintenance: '2024-10-15',
        dailyTrips: 0,
        monthlyRevenue: '0 VND',
        fuelConsumption: '12.5 m³/100km',
        createdAt: '2023-01-20'
      },
      {
        id: 4,
        number: 'BUS-004',
        licensePlate: '51B-789.01',
        capacity: 32,
        model: 'Ford Transit',
        year: 2020,
        route: '',
        routeCode: '',
        driver: '',
        driverLicense: '',
        status: 'inactive',
        fuelType: 'diesel',
        mileage: '89,450 km',
        lastMaintenance: '2024-06-10',
        nextMaintenance: '2024-12-10',
        dailyTrips: 0,
        monthlyRevenue: '0 VND',
        fuelConsumption: '7.8 L/100km',
        createdAt: '2020-08-05'
      },
      {
        id: 5,
        number: 'BUS-005',
        licensePlate: '51B-345.67',
        capacity: 50,
        model: 'Daewoo BU120',
        year: 2024,
        route: 'Gò Vấp - Bình Thạnh',
        routeCode: 'GV-BT-04',
        driver: 'Phạm Văn D',
        driverLicense: 'B2-901234',
        status: 'active',
        fuelType: 'electric',
        mileage: '5,200 km',
        lastMaintenance: '2024-09-01',
        nextMaintenance: '2024-12-01',
        dailyTrips: 2,
        monthlyRevenue: '8,800,000 VND',
        fuelConsumption: '1.2 kWh/km',
        createdAt: '2024-02-28'
      }
    ];
    setBuses(demoBuses);
  }, []);

  // Filter buses
  useEffect(() => {
    let filtered = buses;

    if (searchTerm) {
      filtered = filtered.filter(bus =>
        bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.driver.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(bus => bus.status === statusFilter);
    }

    if (routeFilter !== 'all') {
      filtered = filtered.filter(bus => bus.routeCode === routeFilter);
    }

    setFilteredBuses(filtered);
  }, [buses, searchTerm, statusFilter, routeFilter]);

  const handleCreateBus = () => {
    if (!newBus.number || !newBus.licensePlate || !newBus.capacity) {
      alert('Vui lòng điền đầy đủ thông tin cơ bản!');
      return;
    }

    const selectedRoute = routes.find(r => r.id.toString() === newBus.route);
    const selectedDriver = drivers.find(d => d.id.toString() === newBus.driver);

    const bus = {
      id: Math.max(...buses.map(b => b.id)) + 1,
      ...newBus,
      capacity: parseInt(newBus.capacity),
      year: parseInt(newBus.year),
      route: selectedRoute?.name || '',
      routeCode: selectedRoute?.code || '',
      driver: selectedDriver?.name || '',
      driverLicense: selectedDriver?.license || '',
      mileage: '0 km',
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dailyTrips: 0,
      monthlyRevenue: '0 VND',
      fuelConsumption: '0',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setBuses([...buses, bus]);
    setNewBus({
      number: '',
      licensePlate: '',
      capacity: '',
      model: '',
      year: '',
      route: '',
      driver: '',
      status: 'active',
      fuelType: 'diesel'
    });
    setIsCreating(false);
    alert('Đã thêm xe buýt mới thành công!');
  };

  const handleUpdateBus = () => {
    if (!editingBus.number || !editingBus.licensePlate || !editingBus.capacity) {
      alert('Vui lòng điền đầy đủ thông tin cơ bản!');
      return;
    }

    const selectedRoute = routes.find(r => r.id.toString() === editingBus.route);
    const selectedDriver = drivers.find(d => d.id.toString() === editingBus.driver);

    setBuses(buses.map(bus =>
      bus.id === editingBus.id
        ? {
          ...editingBus,
          capacity: parseInt(editingBus.capacity),
          year: parseInt(editingBus.year),
          route: selectedRoute?.name || '',
          routeCode: selectedRoute?.code || '',
          driver: selectedDriver?.name || '',
          driverLicense: selectedDriver?.license || ''
        }
        : bus
    ));
    setEditingBus(null);
    alert('Đã cập nhật xe buýt thành công!');
  };

  const handleDeleteBus = (id) => {
    if (confirm('Bạn có chắc muốn xóa xe buýt này?')) {
      setBuses(buses.filter(bus => bus.id !== id));
      alert('Đã xóa xe buýt thành công!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'repair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'maintenance': return 'Bảo trì';
      case 'inactive': return 'Ngưng hoạt động';
      case 'repair': return 'Sửa chữa';
      default: return status;
    }
  };

  const getFuelTypeText = (fuelType) => {
    switch (fuelType) {
      case 'diesel': return 'Diesel';
      case 'gasoline': return 'Xăng';
      case 'CNG': return 'CNG';
      case 'electric': return 'Điện';
      default: return fuelType;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <span>🚌</span>
            <span>Quản lý xe buýt</span>
          </h1>
          <p className="text-gray-600 mt-1">Quản lý đội xe buýt và thông tin vận hành</p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Thêm xe mới</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🚌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng xe</p>
              <p className="text-2xl font-bold text-gray-900">{buses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {buses.filter(b => b.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">🔧</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Bảo trì</p>
              <p className="text-2xl font-bold text-gray-900">
                {buses.filter(b => b.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sức chứa</p>
              <p className="text-2xl font-bold text-gray-900">
                {buses.reduce((sum, bus) => sum + bus.capacity, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-indigo-100 rounded-full">
              <span className="text-2xl">🚗</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Chuyến/ngày</p>
              <p className="text-2xl font-bold text-gray-900">
                {buses.reduce((sum, bus) => sum + bus.dailyTrips, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm số xe, biển số, model, tài xế..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="maintenance">Bảo trì</option>
              <option value="repair">Sửa chữa</option>
              <option value="inactive">Ngưng hoạt động</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tuyến</label>
            <select
              value={routeFilter}
              onChange={(e) => setRouteFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả tuyến</option>
              {routes.map((route) => (
                <option key={route.id} value={route.code}>
                  {route.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setRouteFilter('all');
              }}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🔄 Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Buses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBuses.map((bus) => (
          <div key={bus.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{bus.number}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bus.status)}`}>
                      {getStatusText(bus.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Biển số: {bus.licensePlate}</p>
                  <p className="text-sm text-gray-600">{bus.model} ({bus.year})</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sức chứa:</span>
                  <span className="font-medium">{bus.capacity} chỗ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tuyến:</span>
                  <span className="font-medium">{bus.route || 'Chưa phân công'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tài xế:</span>
                  <span className="font-medium">{bus.driver || 'Chưa phân công'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nhiên liệu:</span>
                  <span className="font-medium">{getFuelTypeText(bus.fuelType)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quãng đường:</span>
                  <span className="font-medium">{bus.mileage}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Chuyến/ngày:</span>
                  <span className="font-medium">{bus.dailyTrips} chuyến</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bảo trì tiếp theo:</span>
                  <span className="font-medium text-orange-600">{bus.nextMaintenance}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingBus(bus)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDeleteBus(bus.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBuses.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl">🚌</span>
          <p className="text-gray-500 text-lg mt-4">
            {searchTerm || statusFilter !== 'all' || routeFilter !== 'all'
              ? 'Không tìm thấy xe buýt nào phù hợp'
              : 'Chưa có xe buýt nào'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && routeFilter === 'all' && (
            <button
              onClick={() => setIsCreating(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Thêm xe buýt đầu tiên
            </button>
          )}
        </div>
      )}

      {/* Create/Edit Bus Modal */}
      {(isCreating || editingBus) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingBus ? 'Sửa thông tin xe buýt' : 'Thêm xe buýt mới'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingBus(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số hiệu xe *</label>
                <input
                  type="text"
                  value={editingBus ? editingBus.number : newBus.number}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, number: e.target.value });
                    } else {
                      setNewBus({ ...newBus, number: e.target.value });
                    }
                  }}
                  placeholder="VD: BUS-001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biển số xe *</label>
                <input
                  type="text"
                  value={editingBus ? editingBus.licensePlate : newBus.licensePlate}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, licensePlate: e.target.value });
                    } else {
                      setNewBus({ ...newBus, licensePlate: e.target.value });
                    }
                  }}
                  placeholder="VD: 51B-123.45"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model xe</label>
                <input
                  type="text"
                  value={editingBus ? editingBus.model : newBus.model}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, model: e.target.value });
                    } else {
                      setNewBus({ ...newBus, model: e.target.value });
                    }
                  }}
                  placeholder="VD: Thaco TB120S"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Năm sản xuất</label>
                <input
                  type="number"
                  value={editingBus ? editingBus.year : newBus.year}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, year: e.target.value });
                    } else {
                      setNewBus({ ...newBus, year: e.target.value });
                    }
                  }}
                  placeholder="2024"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sức chứa *</label>
                <input
                  type="number"
                  value={editingBus ? editingBus.capacity : newBus.capacity}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, capacity: e.target.value });
                    } else {
                      setNewBus({ ...newBus, capacity: e.target.value });
                    }
                  }}
                  placeholder="40"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại nhiên liệu</label>
                <select
                  value={editingBus ? editingBus.fuelType : newBus.fuelType}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, fuelType: e.target.value });
                    } else {
                      setNewBus({ ...newBus, fuelType: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="diesel">Diesel</option>
                  <option value="gasoline">Xăng</option>
                  <option value="CNG">CNG</option>
                  <option value="electric">Điện</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tuyến</label>
                <select
                  value={editingBus ? editingBus.route : newBus.route}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, route: e.target.value });
                    } else {
                      setNewBus({ ...newBus, route: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chưa phân công</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tài xế</label>
                <select
                  value={editingBus ? editingBus.driver : newBus.driver}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, driver: e.target.value });
                    } else {
                      setNewBus({ ...newBus, driver: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chưa phân công</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.license}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  value={editingBus ? editingBus.status : newBus.status}
                  onChange={(e) => {
                    if (editingBus) {
                      setEditingBus({ ...editingBus, status: e.target.value });
                    } else {
                      setNewBus({ ...newBus, status: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Hoạt động</option>
                  <option value="maintenance">Bảo trì</option>
                  <option value="repair">Sửa chữa</option>
                  <option value="inactive">Ngưng hoạt động</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingBus(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={editingBus ? handleUpdateBus : handleCreateBus}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {editingBus ? 'Cập nhật' : 'Thêm xe'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusListPage;