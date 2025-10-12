import React from 'react'
import { 
  Bus, 
  Users, 
  Route as RouteIcon, 
  MapPin, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { useAuthStore } from '../../hooks/useAuthStore'

const DashboardPage = () => {
  const { user } = useAuthStore()

  // Mock data - replace with real API calls
  const stats = {
    totalBuses: 24,
    activeBuses: 18,
    totalRoutes: 12,
    totalStudents: 450,
    onTimePerformance: 85,
    alerts: 3
  }
  

  const recentActivity = [
    { id: 1, type: 'info', message: 'Bus #101 completed Route A', time: '2 minutes ago' },
    { id: 2, type: 'warning', message: 'Bus #205 is running 5 minutes late', time: '10 minutes ago' },
    { id: 3, type: 'success', message: 'All morning routes completed successfully', time: '1 hour ago' },
    { id: 4, type: 'info', message: 'New student John Doe assigned to Route B', time: '2 hours ago' }
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning-500" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-500" />
      default:
        return <Clock className="h-5 w-5 text-primary-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold">
          {getGreeting()}, {user?.firstName}!
        </h1>
        <p className="mt-2 text-primary-100">
          Welcome to your Bus Management Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Bus className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Buses</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalBuses}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">
                {stats.activeBuses} active, {stats.totalBuses - stats.activeBuses} inactive
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <RouteIcon className="h-8 w-8 text-success-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Routes</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalRoutes}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">All routes operational</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Students</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Across all routes</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-warning-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">On-Time Rate</h3>
                <p className="text-2xl font-semibold text-gray-900">{stats.onTimePerformance}%</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Last 30 days</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/tracking"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MapPin className="h-8 w-8 text-primary-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  {user?.role === 'driver' ? 'Điều khiển xe' : 'Theo dõi GPS'}
                </span>
              </a>
              
              <a
                href="/schedule"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Clock className="h-8 w-8 text-success-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  {user?.role === 'driver' ? 'Lịch trình của tôi' : 'Lịch trình'}
                </span>
              </a>
              
              {(user?.role === 'admin' || user?.role === 'dispatch') && (
                <a
                  href="/buses"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Bus className="h-8 w-8 text-warning-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Quản lý xe</span>
                </a>
              )}

              {(user?.role === 'admin' || user?.role === 'dispatch') && (
                <a
                  href="/routes"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RouteIcon className="h-8 w-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Quản lý tuyến</span>
                </a>
              )}
              
              {(user?.role === 'admin' || user?.role === 'dispatch' || user?.role === 'parent') && (
                <a
                  href="/notifications"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <AlertTriangle className="h-8 w-8 text-danger-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">
                    Thông báo ({stats.alerts})
                  </span>
                </a>
              )}

              {(user?.role === 'admin' || user?.role === 'dispatch' || user?.role === 'parent') && (
                <a
                  href="/students"
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-gray-900">Học sinh</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Role-specific content */}
      {user?.role === 'admin' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Tổng quan hệ thống</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">98.5%</p>
                <p className="text-sm text-green-700">Tỷ lệ hoạt động</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">24/7</p>
                <p className="text-sm text-blue-700">Giám sát thời gian thực</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">150+</p>
                <p className="text-sm text-purple-700">Chuyến/ngày</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              Với quyền quản trị viên, bạn có thể truy cập đầy đủ tất cả chức năng hệ thống bao gồm 
              quản lý người dùng, cấu hình hệ thống và phân tích chi tiết.
            </p>
          </div>
        </div>
      )}

      {user?.role === 'dispatch' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Điều hành vận tải</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-lg font-semibold text-orange-600">5 xe</p>
                <p className="text-sm text-orange-700">Đang hoạt động</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-lg font-semibold text-red-600">2 cảnh báo</p>
                <p className="text-sm text-red-700">Cần xử lý</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              Bạn có thể theo dõi và điều phối tất cả các xe buýt, quản lý lịch trình và 
              xử lý các tình huống khẩn cấp.
            </p>
          </div>
        </div>
      )}

      {user?.role === 'driver' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Lịch trình hôm nay</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Ca sáng - Tuyến A</p>
                  <p className="text-sm text-blue-700">06:30 - 08:30 | Xe 29A-12345</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">Sắp tới</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Ca chiều - Tuyến A</p>
                  <p className="text-sm text-gray-600">16:00 - 18:00 | Xe 29A-12345</p>
                </div>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm">Đã lên lịch</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-700">
                <strong>Lưu ý:</strong> Hãy kiểm tra xe trước khi xuất phát và đảm bảo tuân thủ lịch trình.
              </p>
            </div>
          </div>
        </div>
      )}

      {user?.role === 'parent' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Theo dõi con em</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-green-900">Nguyễn Minh An</p>
                    <p className="text-sm text-green-700">Xe 29A-12345 • Tuyến A</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">Đã lên xe</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-blue-900">Nguyễn Minh Hà</p>
                    <p className="text-sm text-blue-700">Xe 29B-67890 • Tuyến B</p>
                  </div>
                </div>
                <span className="text-sm text-blue-600">Đang di chuyển</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400">
              <p className="text-sm text-blue-700">
                Bạn sẽ nhận được thông báo khi con em được đón/trả tại điểm dừng. 
                Có thể theo dõi vị trí xe buýt real-time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage