import React, { useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bus,
  Route,
  Users,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useAuthStore } from '../../hooks/useAuthStore'

const DriverSchedulePage = () => {
  const { user } = useAuthStore()
  const [schedule, setSchedule] = useState([])
  const [currentTrip, setCurrentTrip] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDriverSchedule()
  }, [])

  const fetchDriverSchedule = async () => {
    try {
      // Mock data cho lịch trình tài xế
      const mockSchedule = [
        {
          id: 1,
          date: '2024-01-15',
          shifts: [
            {
              id: 'shift-1',
              type: 'morning',
              startTime: '06:30',
              endTime: '08:30',
              route: {
                id: 1,
                name: 'Tuyến A - Trường THPT ABC',
                distance: '12.5 km'
              },
              bus: {
                id: 1,
                licensePlate: '29A-12345',
                model: 'Hyundai Universe'
              },
              stops: [
                { id: 1, name: 'Bến xe Mỹ Đình', time: '06:30', status: 'pending' },
                { id: 2, name: 'Cầu Nhật Tân', time: '06:45', status: 'pending' },
                { id: 3, name: 'Trường THPT ABC', time: '07:15', status: 'pending' }
              ],
              students: 25,
              status: 'scheduled'
            },
            {
              id: 'shift-2',
              type: 'afternoon',
              startTime: '16:00',
              endTime: '18:00',
              route: {
                id: 1,
                name: 'Tuyến A - Trường THPT ABC (Chiều)',
                distance: '12.5 km'
              },
              bus: {
                id: 1,
                licensePlate: '29A-12345',
                model: 'Hyundai Universe'
              },
              stops: [
                { id: 3, name: 'Trường THPT ABC', time: '16:00', status: 'pending' },
                { id: 2, name: 'Cầu Nhật Tân', time: '16:30', status: 'pending' },
                { id: 1, name: 'Bến xe Mỹ Đình', time: '17:00', status: 'pending' }
              ],
              students: 28,
              status: 'scheduled'
            }
          ]
        }
      ]
      
      setSchedule(mockSchedule)
      
      // Tìm chuyến hiện tại
      const now = new Date()
      const currentHour = now.getHours()
      const currentMinute = now.getMinutes()
      const currentTime = currentHour * 60 + currentMinute
      
      for (const day of mockSchedule) {
        for (const shift of day.shifts) {
          const [startHour, startMinute] = shift.startTime.split(':').map(Number)
          const [endHour, endMinute] = shift.endTime.split(':').map(Number)
          const startTime = startHour * 60 + startMinute
          const endTime = endHour * 60 + endMinute
          
          if (currentTime >= startTime && currentTime <= endTime) {
            setCurrentTrip(shift)
            break
          }
        }
      }
      
    } catch (error) {
      console.error('Lỗi khi tải lịch trình:', error)
    } finally {
      setLoading(false)
    }
  }

  const getShiftTypeLabel = (type) => {
    return type === 'morning' ? 'Ca sáng' : 'Ca chiều'
  }

  const getShiftTypeColor = (type) => {
    return type === 'morning' 
      ? 'bg-yellow-100 text-yellow-800' 
      : 'bg-purple-100 text-purple-800'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'in-progress':
        return 'text-blue-600'
      case 'scheduled':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5" />
      case 'in-progress':
        return <Clock className="w-5 h-5" />
      case 'scheduled':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lịch trình của tôi</h1>
            <p className="mt-1 text-gray-600">
              Xin chào, {user?.name}! Đây là lịch trình làm việc của bạn.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </div>

      {/* Chuyến hiện tại */}
      {currentTrip && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Chuyến đang thực hiện</h2>
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex items-center">
                  <Bus className="w-4 h-4 mr-2" />
                  <span>{currentTrip.bus.licensePlate}</span>
                </div>
                <div className="flex items-center">
                  <Route className="w-4 h-4 mr-2" />
                  <span>{currentTrip.route.name}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>{currentTrip.students} học sinh</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getShiftTypeColor(currentTrip.type)}`}>
                {getShiftTypeLabel(currentTrip.type)}
              </div>
              <p className="mt-2 text-blue-100">
                {currentTrip.startTime} - {currentTrip.endTime}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lịch trình hàng ngày */}
      <div className="space-y-6">
        {schedule.map((day) => (
          <div key={day.date} className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {new Date(day.date).toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              {day.shifts.map((shift) => (
                <div key={shift.id} className="border border-gray-200 rounded-lg p-4">
                  {/* Thông tin ca */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getShiftTypeColor(shift.type)}`}>
                        {getShiftTypeLabel(shift.type)}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{shift.startTime} - {shift.endTime}</span>
                      </div>
                    </div>
                    <div className={`flex items-center ${getStatusColor(shift.status)}`}>
                      {getStatusIcon(shift.status)}
                      <span className="ml-1 text-sm font-medium">
                        {shift.status === 'completed' && 'Hoàn thành'}
                        {shift.status === 'in-progress' && 'Đang thực hiện'}
                        {shift.status === 'scheduled' && 'Đã lên lịch'}
                      </span>
                    </div>
                  </div>

                  {/* Thông tin xe và tuyến */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Bus className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{shift.bus.licensePlate}</p>
                        <p className="text-xs text-gray-500">{shift.bus.model}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Route className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{shift.route.name}</p>
                        <p className="text-xs text-gray-500">{shift.route.distance}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{shift.students} học sinh</p>
                        <p className="text-xs text-gray-500">Dự kiến</p>
                      </div>
                    </div>
                  </div>

                  {/* Danh sách điểm dừng */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Lộ trình:</h4>
                    <div className="space-y-2">
                      {shift.stops.map((stop, index) => (
                        <div key={stop.id} className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className={`w-3 h-3 rounded-full ${
                              stop.status === 'completed' ? 'bg-green-500' :
                              stop.status === 'in-progress' ? 'bg-blue-500' :
                              'bg-gray-300'
                            }`} />
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900">{stop.name}</span>
                            </div>
                            <span className="text-sm text-gray-500">{stop.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DriverSchedulePage