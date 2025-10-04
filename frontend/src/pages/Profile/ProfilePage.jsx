import React, { useState, useEffect } from 'react'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Key, 
  Save, 
  Edit, 
  Camera,
  Calendar,
  Clock,
  Activity,
  Settings,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAuthStore } from '../../hooks/useAuthStore'

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditing, setIsEditing] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    scheduleUpdates: true,
    emergencyAlerts: true
  })

  // Demo user data with more details
  const [userProfile, setUserProfile] = useState({
    id: 1,
    name: 'Nguyễn Văn Admin',
    email: 'admin@busmanager.com',
    phone: '0901234567',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    role: 'admin',
    avatar: null,
    createdAt: '2024-01-15',
    lastLogin: '2024-10-04 09:30',
    loginCount: 156,
    profileCompleted: 90,
    twoFactorEnabled: false,
    preferences: {
      language: 'vi',
      timezone: 'Asia/Ho_Chi_Minh',
      theme: 'light'
    },
    statistics: {
      totalLogins: 156,
      averageSessionTime: '2h 30m',
      lastActive: '2024-10-04 09:30',
      deviceCount: 3
    }
  })

  useEffect(() => {
    // In real app, this would fetch user data from API
    if (user) {
      const updatedProfile = {
        ...userProfile,
        name: user.name || userProfile.name,
        email: user.email || userProfile.email,
        role: user.role || userProfile.role
      }
      setUserProfile(updatedProfile)
      setEditForm({
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        address: updatedProfile.address
      })
    }
  }, [user])

  const handleSaveProfile = () => {
    // In real app, this would make an API call
    setUserProfile(prev => ({
      ...prev,
      ...editForm
    }))
    updateUser(editForm)
    setIsEditing(false)
    alert('Thông tin cá nhân đã được cập nhật!')
  }

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!')
      return
    }
    if (passwordForm.newPassword.length < 6) {
      alert('Mật khẩu mới phải có ít nhất 6 ký tự!')
      return
    }
    // In real app, this would make an API call
    alert('Mật khẩu đã được thay đổi thành công!')
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setShowChangePassword(false)
  }

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    // In real app, this would make an API call to save preferences
  }

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

  const tabs = [
    { id: 'personal', label: 'Thông tin cá nhân', icon: User },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'activity', label: 'Hoạt động', icon: Activity }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userProfile.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
            <p className="text-gray-600">{userProfile.email}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRoleColor(userProfile.role)}`}>
                {getRoleName(userProfile.role)}
              </span>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                Tham gia: {new Date(userProfile.createdAt).toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{userProfile.profileCompleted}%</div>
            <div className="text-sm text-gray-500">Hồ sơ hoàn thiện</div>
            <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${userProfile.profileCompleted}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Thông tin cá nhân</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Họ tên
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userProfile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userProfile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Số điện thoại
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userProfile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Shield className="h-4 w-4 inline mr-2" />
                    Vai trò
                  </label>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRoleColor(userProfile.role)}`}>
                    {getRoleName(userProfile.role)}
                  </span>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Địa chỉ
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{userProfile.address}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu thay đổi
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Cài đặt bảo mật</h2>

              {/* Change Password */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Thay đổi mật khẩu</h3>
                    <p className="text-sm text-gray-600">Cập nhật mật khẩu để bảo mật tài khoản</p>
                  </div>
                  <button
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Thay đổi
                  </button>
                </div>

                {showChangePassword && (
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        placeholder="Mật khẩu hiện tại"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        placeholder="Mật khẩu mới"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        placeholder="Xác nhận mật khẩu mới"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowChangePassword(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleChangePassword}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                      >
                        Cập nhật mật khẩu
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Two Factor Authentication */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">Xác thực 2 bước</h3>
                    <p className="text-sm text-gray-600">Thêm lớp bảo mật cho tài khoản</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm ${userProfile.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'} mr-3`}>
                      {userProfile.twoFactorEnabled ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
                    </span>
                    <button
                      onClick={() => setUserProfile(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        userProfile.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`${
                          userProfile.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Cài đặt thông báo</h2>

              <div className="space-y-4">
                {Object.entries({
                  emailNotifications: 'Thông báo qua Email',
                  smsNotifications: 'Thông báo qua SMS',
                  pushNotifications: 'Thông báo đẩy',
                  scheduleUpdates: 'Cập nhật lịch trình',
                  emergencyAlerts: 'Cảnh báo khẩn cấp'
                }).map(([key, label]) => (
                  <div key={key} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">{label}</p>
                      <p className="text-sm text-gray-600">
                        {key === 'emailNotifications' && 'Nhận thông báo qua email'}
                        {key === 'smsNotifications' && 'Nhận thông báo qua tin nhắn SMS'}
                        {key === 'pushNotifications' && 'Nhận thông báo đẩy trên trình duyệt'}
                        {key === 'scheduleUpdates' && 'Thông báo khi có thay đổi lịch trình'}
                        {key === 'emergencyAlerts' && 'Thông báo khẩn cấp và quan trọng'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNotificationChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications[key] ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`${
                          notifications[key] ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">Hoạt động gần đây</h2>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Activity className="h-8 w-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-900">Tổng đăng nhập</p>
                      <p className="text-2xl font-bold text-blue-900">{userProfile.statistics.totalLogins}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-900">Thời gian TB</p>
                      <p className="text-lg font-bold text-green-900">{userProfile.statistics.averageSessionTime}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-purple-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-purple-900">Hoạt động cuối</p>
                      <p className="text-sm font-bold text-purple-900">{userProfile.statistics.lastActive}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Settings className="h-8 w-8 text-orange-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-orange-900">Thiết bị</p>
                      <p className="text-2xl font-bold text-orange-900">{userProfile.statistics.deviceCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Log */}
              <div className="bg-white border rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Nhật ký hoạt động</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    { action: 'Đăng nhập hệ thống', time: '2024-10-04 09:30', ip: '192.168.1.100' },
                    { action: 'Cập nhật thông tin cá nhân', time: '2024-10-03 14:15', ip: '192.168.1.100' },
                    { action: 'Thay đổi mật khẩu', time: '2024-10-02 10:20', ip: '192.168.1.100' },
                    { action: 'Đăng nhập hệ thống', time: '2024-10-02 08:45', ip: '192.168.1.100' },
                    { action: 'Kích hoạt xác thực 2 bước', time: '2024-10-01 16:30', ip: '192.168.1.100' }
                  ].map((activity, index) => (
                    <div key={index} className="px-6 py-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">IP: {activity.ip}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage