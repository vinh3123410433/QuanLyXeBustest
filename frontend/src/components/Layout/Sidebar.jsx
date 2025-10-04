import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Bus, 
  Route, 
  Users, 
  MapPin, 
  Calendar, 
  Bell, 
  User,
  GraduationCap,
  X
} from 'lucide-react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { clsx } from 'clsx'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { user, hasAnyRole } = useAuthStore()

  const navigation = [
    {
      name: 'Trang chủ',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'dispatch', 'driver', 'parent']
    },
    {
      name: 'Quản lý xe buýt',
      href: '/buses',
      icon: Bus,
      roles: ['admin', 'dispatch', 'driver']
    },
    {
      name: 'Tuyến đường',
      href: '/routes',
      icon: Route,
      roles: ['admin', 'dispatch', 'driver', 'parent']
    },
    {
      name: 'Học sinh',
      href: '/students',
      icon: GraduationCap,
      roles: ['admin', 'dispatch', 'parent']
    },
    {
      name: 'Theo dõi GPS',
      href: '/tracking',
      icon: MapPin,
      roles: ['admin', 'dispatch', 'driver', 'parent']
    },
    {
      name: 'Lịch trình',
      href: '/schedule',
      icon: Calendar,
      roles: ['admin', 'dispatch', 'driver', 'parent']
    },
    {
      name: 'Người dùng',
      href: '/users',
      icon: Users,
      roles: ['admin']
    },
    {
      name: 'Thông báo',
      href: '/notifications',
      icon: Bell,
      roles: ['admin', 'dispatch', 'driver', 'parent']
    }
  ]

  const filteredNavigation = navigation.filter(item => 
    hasAnyRole(item.roles)
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Bus className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-semibold text-gray-900">
              Quản lý xe buýt
            </span>
          </div>
          
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'mr-3 flex-shrink-0 h-5 w-5',
                      isActive
                        ? 'text-primary-600'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          <div className="flex-shrink-0 px-2">
            <Link
              to="/profile"
              className={clsx(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                location.pathname === '/profile'
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <User className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={clsx(
        'lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between flex-shrink-0 px-4 py-5 border-b border-gray-200">
            <div className="flex items-center">
              <Bus className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Bus Manager
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={clsx(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={clsx(
                      'mr-3 flex-shrink-0 h-5 w-5',
                      isActive
                        ? 'text-primary-600'
                        : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          
          <div className="flex-shrink-0 px-2 py-4 border-t border-gray-200">
            <Link
              to="/profile"
              onClick={onClose}
              className={clsx(
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                location.pathname === '/profile'
                  ? 'bg-primary-100 text-primary-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <User className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar