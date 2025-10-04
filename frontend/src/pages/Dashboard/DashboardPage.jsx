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
                <span className="text-sm font-medium text-gray-900">Track Buses</span>
              </a>
              
              <a
                href="/schedule"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Clock className="h-8 w-8 text-success-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">View Schedule</span>
              </a>
              
              <a
                href="/buses"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Bus className="h-8 w-8 text-warning-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Manage Buses</span>
              </a>
              
              <a
                href="/notifications"
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <AlertTriangle className="h-8 w-8 text-danger-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">
                  Alerts ({stats.alerts})
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Role-specific content */}
      {user?.role === 'admin' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">System Overview</h3>
          </div>
          <div className="card-body">
            <p className="text-gray-600">
              As an administrator, you have full access to all system features including user management, 
              system configuration, and detailed analytics.
            </p>
          </div>
        </div>
      )}

      {user?.role === 'driver' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Today's Schedule</h3>
          </div>
          <div className="card-body">
            <p className="text-gray-600">
              Your next route starts in 30 minutes. Make sure to check your bus inspection 
              checklist before departure.
            </p>
          </div>
        </div>
      )}

      {user?.role === 'parent' && (
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Your Children</h3>
          </div>
          <div className="card-body">
            <p className="text-gray-600">
              Track your children's bus location and receive real-time notifications 
              about pickup and drop-off times.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardPage