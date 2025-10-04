import React, { useState, useEffect } from 'react';

const RouteListPage = () => {
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [newRoute, setNewRoute] = useState({
    name: '',
    code: '',
    description: '',
    distance: '',
    estimatedTime: '',
    stops: [],
    status: 'active',
    fare: ''
  });

  // Demo routes data
  useEffect(() => {
    const demoRoutes = [
      {
        id: 1,
        name: 'Bến Thành - Sân Bay',
        code: 'BT-SB-01',
        description: 'Tuyến từ bến xe Bến Thành đến sân bay Tân Sơn Nhất',
        distance: '15.2 km',
        estimatedTime: '45 phút',
        stops: [
          { id: 1, name: 'Bến xe Bến Thành', order: 1, lat: 10.8231, lng: 106.6297 },
          { id: 2, name: 'Chợ Tân Định', order: 2, lat: 10.7890, lng: 106.6850 },
          { id: 3, name: 'Công viên Tao Đàn', order: 3, lat: 10.7769, lng: 106.6909 },
          { id: 4, name: 'Sân bay Tân Sơn Nhất', order: 4, lat: 10.8187, lng: 106.6519 }
        ],
        status: 'active',
        fare: '15,000 VND',
        busCount: 3,
        dailyTrips: 12,
        createdAt: '2024-01-15',
        lastUpdated: '2024-10-01'
      },
      {
        id: 2,
        name: 'Quận 1 - Quận 7',
        code: 'Q1-Q7-02',
        description: 'Tuyến kết nối trung tâm Quận 1 với Quận 7',
        distance: '18.5 km',
        estimatedTime: '60 phút',
        stops: [
          { id: 5, name: 'Nhà thờ Đức Bà', order: 1, lat: 10.7798, lng: 106.6990 },
          { id: 6, name: 'Cầu Sài Gòn', order: 2, lat: 10.7624, lng: 106.6832 },
          { id: 7, name: 'TTTM Crescent Mall', order: 3, lat: 10.7292, lng: 106.7197 }
        ],
        status: 'active',
        fare: '18,000 VND',
        busCount: 2,
        dailyTrips: 8,
        createdAt: '2024-02-10',
        lastUpdated: '2024-09-28'
      },
      {
        id: 3,
        name: 'Thủ Đức - Quận 3',
        code: 'TD-Q3-03',
        description: 'Tuyến từ Thủ Đức về trung tâm Quận 3',
        distance: '22.8 km',
        estimatedTime: '75 phút',
        stops: [
          { id: 8, name: 'ĐH Quốc gia TP.HCM', order: 1, lat: 10.8700, lng: 106.8030 },
          { id: 9, name: 'Chợ Thủ Đức', order: 2, lat: 10.8506, lng: 106.7717 },
          { id: 10, name: 'Bệnh viện Chợ Rẫy', order: 3, lat: 10.7554, lng: 106.6665 }
        ],
        status: 'maintenance',
        fare: '20,000 VND',
        busCount: 1,
        dailyTrips: 6,
        createdAt: '2024-03-05',
        lastUpdated: '2024-10-02'
      },
      {
        id: 4,
        name: 'Gò Vấp - Bình Thạnh',
        code: 'GV-BT-04',
        description: 'Tuyến nối liền Gò Vấp và Bình Thạnh',
        distance: '12.3 km',
        estimatedTime: '40 phút',
        stops: [
          { id: 11, name: 'Chợ Gò Vấp', order: 1, lat: 10.8142, lng: 106.6438 },
          { id: 12, name: 'Đầm Sen', order: 2, lat: 10.7889, lng: 106.6542 },
          { id: 13, name: 'Vincom Bình Thạnh', order: 3, lat: 10.8012, lng: 106.7109 }
        ],
        status: 'inactive',
        fare: '12,000 VND',
        busCount: 0,
        dailyTrips: 0,
        createdAt: '2024-01-20',
        lastUpdated: '2024-08-15'
      }
    ];
    setRoutes(demoRoutes);
  }, []);

  // Filter routes based on search and status
  useEffect(() => {
    let filtered = routes;
    
    if (searchTerm) {
      filtered = filtered.filter(route => 
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(route => route.status === statusFilter);
    }
    
    setFilteredRoutes(filtered);
  }, [routes, searchTerm, statusFilter]);

  const handleCreateRoute = () => {
    if (!newRoute.name || !newRoute.code) {
      alert('Vui lòng điền tên tuyến và mã tuyến!');
      return;
    }

    const route = {
      id: Math.max(...routes.map(r => r.id)) + 1,
      ...newRoute,
      stops: [],
      busCount: 0,
      dailyTrips: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setRoutes([...routes, route]);
    setNewRoute({
      name: '',
      code: '',
      description: '',
      distance: '',
      estimatedTime: '',
      stops: [],
      status: 'active',
      fare: ''
    });
    setIsCreating(false);
    alert('Đã tạo tuyến mới thành công!');
  };

  const handleUpdateRoute = () => {
    if (!editingRoute.name || !editingRoute.code) {
      alert('Vui lòng điền tên tuyến và mã tuyến!');
      return;
    }

    setRoutes(routes.map(route => 
      route.id === editingRoute.id 
        ? { ...editingRoute, lastUpdated: new Date().toISOString().split('T')[0] }
        : route
    ));
    setEditingRoute(null);
    alert('Đã cập nhật tuyến thành công!');
  };

  const handleDeleteRoute = (id) => {
    if (confirm('Bạn có chắc muốn xóa tuyến này?')) {
      setRoutes(routes.filter(route => route.id !== id));
      alert('Đã xóa tuyến thành công!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'maintenance': return 'Bảo trì';
      case 'inactive': return 'Ngưng hoạt động';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <span>🛣️</span>
            <span>Quản lý tuyến đường</span>
          </h1>
          <p className="text-gray-600 mt-1">Quản lý các tuyến xe buýt và điểm dừng</p>
        </div>
        
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <span>➕</span>
          <span>Thêm tuyến mới</span>
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">🛣️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng tuyến</p>
              <p className="text-2xl font-bold text-gray-900">{routes.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {routes.filter(r => r.status === 'active').length}
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
              <p className="text-sm font-medium text-gray-500">Đang bảo trì</p>
              <p className="text-2xl font-bold text-gray-900">
                {routes.filter(r => r.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🚌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tổng xe hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {routes.reduce((sum, route) => sum + route.busCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm tuyến</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập tên tuyến, mã tuyến hoặc mô tả..."
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
              <option value="active">Đang hoạt động</option>
              <option value="maintenance">Đang bảo trì</option>
              <option value="inactive">Ngưng hoạt động</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🔄 Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRoutes.map((route) => (
          <div key={route.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(route.status)}`}>
                      {getStatusText(route.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Mã: {route.code}</p>
                  <p className="text-sm text-gray-700">{route.description}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Khoảng cách:</span>
                  <span className="font-medium">{route.distance}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Thời gian dự kiến:</span>
                  <span className="font-medium">{route.estimatedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giá vé:</span>
                  <span className="font-medium text-green-600">{route.fare}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số điểm dừng:</span>
                  <span className="font-medium">{route.stops.length} điểm</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Xe hoạt động:</span>
                  <span className="font-medium">{route.busCount} xe</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Chuyến/ngày:</span>
                  <span className="font-medium">{route.dailyTrips} chuyến</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingRoute(route)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDeleteRoute(route.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm font-medium transition-colors"
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredRoutes.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl">🛣️</span>
          <p className="text-gray-500 text-lg mt-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Không tìm thấy tuyến nào phù hợp' 
              : 'Chưa có tuyến nào'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <button
              onClick={() => setIsCreating(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Tạo tuyến đầu tiên
            </button>
          )}
        </div>
      )}

      {/* Create/Edit Route Modal */}
      {(isCreating || editingRoute) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingRoute ? 'Sửa tuyến đường' : 'Tạo tuyến mới'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingRoute(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên tuyến *</label>
                <input
                  type="text"
                  value={editingRoute ? editingRoute.name : newRoute.name}
                  onChange={(e) => {
                    if (editingRoute) {
                      setEditingRoute({...editingRoute, name: e.target.value});
                    } else {
                      setNewRoute({...newRoute, name: e.target.value});
                    }
                  }}
                  placeholder="VD: Bến Thành - Sân Bay"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã tuyến *</label>
                <input
                  type="text"
                  value={editingRoute ? editingRoute.code : newRoute.code}
                  onChange={(e) => {
                    if (editingRoute) {
                      setEditingRoute({...editingRoute, code: e.target.value});
                    } else {
                      setNewRoute({...newRoute, code: e.target.value});
                    }
                  }}
                  placeholder="VD: BT-SB-01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={editingRoute ? editingRoute.description : newRoute.description}
                  onChange={(e) => {
                    if (editingRoute) {
                      setEditingRoute({...editingRoute, description: e.target.value});
                    } else {
                      setNewRoute({...newRoute, description: e.target.value});
                    }
                  }}
                  placeholder="Mô tả chi tiết về tuyến đường..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Khoảng cách</label>
                  <input
                    type="text"
                    value={editingRoute ? editingRoute.distance : newRoute.distance}
                    onChange={(e) => {
                      if (editingRoute) {
                        setEditingRoute({...editingRoute, distance: e.target.value});
                      } else {
                        setNewRoute({...newRoute, distance: e.target.value});
                      }
                    }}
                    placeholder="VD: 15.2 km"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian dự kiến</label>
                  <input
                    type="text"
                    value={editingRoute ? editingRoute.estimatedTime : newRoute.estimatedTime}
                    onChange={(e) => {
                      if (editingRoute) {
                        setEditingRoute({...editingRoute, estimatedTime: e.target.value});
                      } else {
                        setNewRoute({...newRoute, estimatedTime: e.target.value});
                      }
                    }}
                    placeholder="VD: 45 phút"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá vé</label>
                  <input
                    type="text"
                    value={editingRoute ? editingRoute.fare : newRoute.fare}
                    onChange={(e) => {
                      if (editingRoute) {
                        setEditingRoute({...editingRoute, fare: e.target.value});
                      } else {
                        setNewRoute({...newRoute, fare: e.target.value});
                      }
                    }}
                    placeholder="VD: 15,000 VND"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    value={editingRoute ? editingRoute.status : newRoute.status}
                    onChange={(e) => {
                      if (editingRoute) {
                        setEditingRoute({...editingRoute, status: e.target.value});
                      } else {
                        setNewRoute({...newRoute, status: e.target.value});
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="maintenance">Bảo trì</option>
                    <option value="inactive">Ngưng hoạt động</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingRoute(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={editingRoute ? handleUpdateRoute : handleCreateRoute}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                {editingRoute ? 'Cập nhật' : 'Tạo tuyến'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteListPage;