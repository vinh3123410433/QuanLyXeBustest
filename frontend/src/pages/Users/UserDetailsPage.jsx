import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  User,
  UserCheck,
  UserX,
  Shield,
  Clock,
  Activity
} from 'lucide-react'

const UserDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  // Demo data
  const demoUsers = [
    {
      id: 1,
      name: 'Nguyễn Văn Admin',
      email: 'admin@busmanager.com',
      phone: '0901234567',
      role: 'admin',
      status: 'active',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      createdAt: '2024-01-15',
      lastLogin: '2024-10-04',
      loginHistory: [
        { date: '2024-10-04', time: '09:30', ip: '192.168.1.100' },
        { date: '2024-10-03', time: '14:15', ip: '192.168.1.100' },
        { date: '2024-10-02', time: '08:45', ip: '192.168.1.100' }
      ],
      permissions: ['user_management', 'bus_management', 'route_management', 'system_config'],
      avatar: null
    },
    {
      id: 2,
      name: 'Trần Thị Dispatch',
      email: 'dispatch@busmanager.com',
      phone: '0902345678',
      role: 'dispatch',
      status: 'active',
      address: '456 Đường DEF, Quận 2, TP.HCM',
      createdAt: '2024-02-01',
      lastLogin: '2024-10-03',
      loginHistory: [
        { date: '2024-10-03', time: '08:00', ip: '192.168.1.101' },
        { date: '2024-10-02', time: '07:30', ip: '192.168.1.101' },
        { date: '2024-10-01', time: '08:15', ip: '192.168.1.101' }
      ],
      permissions: ['bus_management', 'route_management', 'schedule_management'],
      avatar: null
    },
    {
      id: 3,
      name: 'Lê Văn Tài Xế',
      email: 'driver1@busmanager.com',
      phone: '0903456789',
      role: 'driver',
      status: 'active',
      address: '789 Đường GHI, Quận 3, TP.HCM',
      createdAt: '2024-02-15',
      lastLogin: '2024-10-04',
      loginHistory: [
        { date: '2024-10-04', time: '06:00', ip: '192.168.1.102' },
        { date: '2024-10-03', time: '05:45', ip: '192.168.1.102' },
        { date: '2024-10-02', time: '06:15', ip: '192.168.1.102' }
      ],
      permissions: ['tracking', 'schedule_view'],
      avatar: null,
      busAssigned: 'BS-001',
      routeAssigned: 'Tuyến A'
    },
    {
      id: 4,
      name: 'Phạm Thị Phụ Huynh',
      email: 'parent1@gmail.com',
      phone: '0904567890',
      role: 'parent',
      status: 'active',
      address: '321 Đường JKL, Quận 4, TP.HCM',
      createdAt: '2024-03-01',
      lastLogin: '2024-10-02',
      loginHistory: [
        { date: '2024-10-02', time: '18:30', ip: '192.168.1.103' },
        { date: '2024-10-01', time: '19:00', ip: '192.168.1.103' },
        { date: '2024-09-30', time: '17:45', ip: '192.168.1.103' }
      ],
      permissions: ['tracking_view', 'notification_receive'],
      avatar: null,
      children: ['Phạm Văn A', 'Phạm Thị B']
    },
    {
      id: 5,
      name: 'Hoàng Văn Driver 2',
      email: 'driver2@busmanager.com',
      phone: '0905678901',
      role: 'driver',
      status: 'inactive',
      address: '654 Đường MNO, Quận 5, TP.HCM',
      createdAt: '2024-03-15',
      lastLogin: '2024-09-30',
      loginHistory: [
        { date: '2024-09-30', time: '16:00', ip: '192.168.1.104' },
        { date: '2024-09-29', time: '15:30', ip: '192.168.1.104' },
        { date: '2024-09-28', time: '16:15', ip: '192.168.1.104' }
      ],
      permissions: ['tracking', 'schedule_view'],
      avatar: null
    }
  ]

  useEffect(() => {
    const foundUser = demoUsers.find(u => u.id === parseInt(id))
    setUser(foundUser)
    setLoading(false)
  }, [id])

  const getRoleName = (role) => {
    const roleMap = {
      admin: 'Quản trị viên',
      dispatch: 'Điều phối',
      driver: 'Tài xế',
      parent: 'Phụ huynh'
    }
    return roleMap[role] || role
  }

  const getRoleColor = (role) => {
    const colorMap = {
      admin: 'bg-red-100 text-red-800',
      dispatch: 'bg-blue-100 text-blue-800',
      driver: 'bg-green-100 text-green-800',
      parent: 'bg-yellow-100 text-yellow-800'
    }
    return colorMap[role] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const getPermissionName = (permission) => {
    const permissionMap = {
      user_management: 'Quản lý người dùng',
      bus_management: 'Quản lý xe buýt',
      route_management: 'Quản lý tuyến đường',
      system_config: 'Cấu hình hệ thống',
      schedule_management: 'Quản lý lịch trình',
      tracking: 'Theo dõi GPS',
      schedule_view: 'Xem lịch trình',
      tracking_view: 'Xem vị trí',
      notification_receive: 'Nhận thông báo'
    }
    return permissionMap[permission] || permission
  }

  const handleEditUser = () => {
    // In real app, this would make an API call
    console.log('Updating user:', editingUser)
    setUser(editingUser)
    setShowEditModal(false)
    setEditingUser(null)
  }

  const handleDeleteUser = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      // In real app, this would make an API call
      navigate('/users')
    }
  }

  const toggleUserStatus = () => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    setUser({ ...user, status: newStatus })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Không tìm thấy người dùng</h2>
        <p className="mt-2 text-gray-600">Người dùng với ID {id} không tồn tại.</p>
        <button
          onClick={() => navigate('/users')}
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/users')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thông tin người dùng</h1>
            <p className="mt-1 text-sm text-gray-600">Chi tiết và lịch sử hoạt động</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setEditingUser(user)
              setShowEditModal(true)
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            <Edit className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </button>
          <button
            onClick={toggleUserStatus}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-white ${
              user.status === 'active' 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {user.status === 'active' ? (
              <>
                <UserX className="h-4 w-4 mr-2" />
                Khóa tài khoản
              </>
            ) : (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Kích hoạt
              </>
            )}
          </button>
          <button
            onClick={handleDeleteUser}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Xóa
          </button>
        </div>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Thông tin cơ bản</h2>
          
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <div className="flex items-center space-x-3 mt-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                    {getRoleName(user.role)}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                    {user.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-3 text-gray-400" />
                  {user.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-3 text-gray-400" />
                  {user.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600 md:col-span-2">
                  <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                  {user.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                  Tham gia: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-3 text-gray-400" />
                  Đăng nhập cuối: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('vi-VN') : 'Chưa đăng nhập'}
                </div>
              </div>

              {/* Role-specific info */}
              {user.role === 'driver' && (
                <div className="bg-green-50 rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-green-900 mb-2">Thông tin tài xế</h4>
                  <div className="space-y-1 text-sm text-green-800">
                    {user.busAssigned && <p>Xe được phân công: {user.busAssigned}</p>}
                    {user.routeAssigned && <p>Tuyến đường: {user.routeAssigned}</p>}
                  </div>
                </div>
              )}

              {user.role === 'parent' && user.children && (
                <div className="bg-yellow-50 rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Thông tin phụ huynh</h4>
                  <div className="space-y-1 text-sm text-yellow-800">
                    <p>Số con: {user.children.length}</p>
                    <p>Tên các con: {user.children.join(', ')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Quyền hạn</h2>
          <div className="space-y-3">
            {user.permissions.map((permission, index) => (
              <div key={index} className="flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-3" />
                <span className="text-sm text-gray-700">{getPermissionName(permission)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Lịch sử đăng nhập</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giờ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa chỉ IP
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {user.loginHistory.map((login, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(login.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {login.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {login.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Chỉnh sửa người dùng</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Họ tên"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={editingUser.phone}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  value={editingUser.address}
                  onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="parent">Phụ huynh</option>
                  <option value="driver">Tài xế</option>
                  <option value="dispatch">Điều phối</option>
                  <option value="admin">Quản trị viên</option>
                </select>
                <select
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm khóa</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleEditUser}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetailsPage