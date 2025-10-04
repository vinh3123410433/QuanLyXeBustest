import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  GraduationCap,
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Route,
  Bus,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  BarChart3,
  FileText,
  Camera
} from 'lucide-react'
import { useAuthStore } from '../../hooks/useAuthStore'

const StudentDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('info')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)

  // Demo data
  const demoStudents = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      studentId: 'HS001',
      grade: '1',
      parentName: 'Nguyễn Thị Bình',
      parentPhone: '0901234567',
      parentEmail: 'parent1@gmail.com',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      route: 'Tuyến A',
      routeId: 'route-1',
      pickupPoint: 'Điểm đón A1 - Chợ Bến Thành',
      pickupTime: '07:00',
      dropoffTime: '16:30',
      status: 'active',
      avatar: null,
      emergencyContact: '0987654321',
      emergencyContactName: 'Nguyễn Văn Cường (Ông nội)',
      medicalNotes: 'Không có',
      allergies: [],
      bloodType: 'O+',
      createdAt: '2024-01-15',
      enrollmentDate: '2024-01-15',
      attendance: {
        present: 45,
        absent: 3,
        late: 2,
        excused: 1
      },
      monthlyAttendance: [
        { month: 'Tháng 9', present: 18, absent: 1, late: 1, total: 20 },
        { month: 'Tháng 8', present: 22, absent: 0, late: 1, total: 23 },
        { month: 'Tháng 7', present: 5, absent: 2, late: 0, total: 7 }
      ],
      recentActivities: [
        { date: '2024-10-04', action: 'Đi học đúng giờ', type: 'attendance', status: 'success' },
        { date: '2024-10-03', action: 'Đi học muộn 15 phút', type: 'attendance', status: 'warning' },
        { date: '2024-10-02', action: 'Đi học đúng giờ', type: 'attendance', status: 'success' },
        { date: '2024-10-01', action: 'Vắng mặt có phép', type: 'attendance', status: 'info' },
        { date: '2024-09-30', action: 'Cập nhật thông tin y tế', type: 'medical', status: 'info' }
      ],
      grades: {
        math: 8.5,
        literature: 9.0,
        science: 8.0,
        english: 7.5,
        average: 8.25
      },
      behavior: {
        discipline: 'Tốt',
        participation: 'Tích cực',
        homework: 'Đầy đủ',
        notes: 'Học sinh ngoan, tích cực tham gia các hoạt động'
      }
    },
    {
      id: 2,
      name: 'Trần Thị Bảo',
      studentId: 'HS002',
      grade: '2',
      parentName: 'Trần Văn Cường',
      parentPhone: '0902345678',
      parentEmail: 'parent2@gmail.com',
      address: '456 Đường DEF, Quận 2, TP.HCM',
      route: 'Tuyến B',
      routeId: 'route-2',
      pickupPoint: 'Điểm đón B2 - Trường THCS Nam Sài Gòn',
      pickupTime: '07:15',
      dropoffTime: '16:45',
      status: 'active',
      avatar: null,
      emergencyContact: '0987654322',
      emergencyContactName: 'Trần Thị Dung (Bà nội)',
      medicalNotes: 'Dị ứng với đậu phộng',
      allergies: ['Đậu phộng', 'Tôm'],
      bloodType: 'A+',
      createdAt: '2024-02-01',
      enrollmentDate: '2024-02-01',
      attendance: {
        present: 42,
        absent: 5,
        late: 3,
        excused: 2
      },
      monthlyAttendance: [
        { month: 'Tháng 9', present: 16, absent: 2, late: 2, total: 20 },
        { month: 'Tháng 8', present: 20, absent: 2, late: 1, total: 23 },
        { month: 'Tháng 7', present: 6, absent: 1, late: 0, total: 7 }
      ],
      recentActivities: [
        { date: '2024-10-04', action: 'Đi học đúng giờ', type: 'attendance', status: 'success' },
        { date: '2024-10-03', action: 'Vắng mặt không phép', type: 'attendance', status: 'error' },
        { date: '2024-10-02', action: 'Đi học đúng giờ', type: 'attendance', status: 'success' },
        { date: '2024-10-01', action: 'Đi học muộn 20 phút', type: 'attendance', status: 'warning' },
        { date: '2024-09-30', action: 'Cập nhật thông tin dị ứng', type: 'medical', status: 'info' }
      ],
      grades: {
        math: 7.5,
        literature: 8.5,
        science: 7.0,
        english: 8.0,
        average: 7.75
      },
      behavior: {
        discipline: 'Khá',
        participation: 'Bình thường',
        homework: 'Thỉnh thoảng thiếu',
        notes: 'Cần cải thiện tính tự giác'
      }
    }
  ]

  useEffect(() => {
    const foundStudent = demoStudents.find(s => s.id === parseInt(id))
    setStudent(foundStudent)
    setLoading(false)
  }, [id])

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  }

  const getAttendanceRate = (attendance) => {
    const total = attendance.present + attendance.absent + attendance.late
    if (total === 0) return 0
    return Math.round((attendance.present / total) * 100)
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'attendance': return Clock
      case 'medical': return AlertCircle
      case 'academic': return FileText
      default: return Activity
    }
  }

  const getActivityColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50'
      case 'warning': return 'text-yellow-600 bg-yellow-50'
      case 'error': return 'text-red-600 bg-red-50'
      case 'info': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const handleEditStudent = () => {
    setStudent(editingStudent)
    setShowEditModal(false)
    setEditingStudent(null)
  }

  const handleDeleteStudent = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
      navigate('/students')
    }
  }

  const toggleStudentStatus = () => {
    const newStatus = student.status === 'active' ? 'inactive' : 'active'
    setStudent({ ...student, status: newStatus })
  }

  const tabs = [
    { id: 'info', label: 'Thông tin cơ bản', icon: User },
    { id: 'attendance', label: 'Điểm danh', icon: Calendar },
    { id: 'grades', label: 'Học tập', icon: BarChart3 },
    { id: 'medical', label: 'Y tế', icon: AlertCircle },
    { id: 'activity', label: 'Hoạt động', icon: Activity }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Không tìm thấy học sinh</h2>
        <p className="mt-2 text-gray-600">Học sinh với ID {id} không tồn tại.</p>
        <button
          onClick={() => navigate('/students')}
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
            onClick={() => navigate('/students')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thông tin học sinh</h1>
            <p className="mt-1 text-sm text-gray-600">Chi tiết và theo dõi học sinh</p>
          </div>
        </div>
        {(user?.role === 'admin' || user?.role === 'dispatch') && (
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setEditingStudent(student)
                setShowEditModal(true)
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa
            </button>
            <button
              onClick={toggleStudentStatus}
              className={`inline-flex items-center px-4 py-2 rounded-lg text-white ${
                student.status === 'active' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {student.status === 'active' ? (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Tạm nghỉ
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Kích hoạt
                </>
              )}
            </button>
            <button
              onClick={handleDeleteStudent}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa
            </button>
          </div>
        )}
      </div>

      {/* Student Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {student.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(student.status)}`}>
                {student.status === 'active' ? 'Đang học' : 'Tạm nghỉ'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Mã số học sinh</p>
                <p className="font-medium">{student.studentId}</p>
              </div>
              <div>
                <p className="text-gray-500">Lớp</p>
                <p className="font-medium">Lớp {student.grade}</p>
              </div>
              <div>
                <p className="text-gray-500">Tuyến đường</p>
                <p className="font-medium">{student.route}</p>
              </div>
              <div>
                <p className="text-gray-500">Tỷ lệ điểm danh</p>
                <p className="font-medium text-blue-600">{getAttendanceRate(student.attendance)}%</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{student.attendance.present}</div>
              <div className="text-xs text-green-800">Có mặt</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-600">{student.attendance.absent}</div>
              <div className="text-xs text-red-800">Vắng mặt</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-yellow-600">{student.attendance.late}</div>
              <div className="text-xs text-yellow-800">Muộn</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
          {/* Basic Info Tab */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin học sinh</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Họ tên</p>
                      <p className="font-medium">{student.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Mã số học sinh</p>
                      <p className="font-medium">{student.studentId}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Ngày nhập học</p>
                      <p className="font-medium">{new Date(student.enrollmentDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Địa chỉ</p>
                      <p className="font-medium">{student.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin phụ huynh</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Tên phụ huynh</p>
                      <p className="font-medium">{student.parentName}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Số điện thoại</p>
                      <p className="font-medium">{student.parentPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Liên hệ khẩn cấp</p>
                      <p className="font-medium">{student.emergencyContact}</p>
                      <p className="text-sm text-gray-500">{student.emergencyContactName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin đưa đón</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Route className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Tuyến đường</p>
                      <p className="font-medium">{student.route}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Điểm đón</p>
                      <p className="font-medium">{student.pickupPoint}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Thời gian</p>
                      <p className="font-medium">{student.pickupTime} - {student.dropoffTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-900">Có mặt</p>
                      <p className="text-2xl font-bold text-green-900">{student.attendance.present}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <XCircle className="h-8 w-8 text-red-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-900">Vắng mặt</p>
                      <p className="text-2xl font-bold text-red-900">{student.attendance.absent}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-yellow-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-yellow-900">Muộn</p>
                      <p className="text-2xl font-bold text-yellow-900">{student.attendance.late}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-900">Tỷ lệ</p>
                      <p className="text-2xl font-bold text-blue-900">{getAttendanceRate(student.attendance)}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Điểm danh theo tháng</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tháng</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Có mặt</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vắng mặt</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Muộn</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tỷ lệ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {student.monthlyAttendance.map((month, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {month.month}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            {month.present}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                            {month.absent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                            {month.late}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {Math.round((month.present / month.total) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Grades Tab */}
          {activeTab === 'grades' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-blue-900">Toán</p>
                    <p className="text-3xl font-bold text-blue-900">{student.grades.math}</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-green-900">Văn</p>
                    <p className="text-3xl font-bold text-green-900">{student.grades.literature}</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-purple-900">Khoa học</p>
                    <p className="text-3xl font-bold text-purple-900">{student.grades.science}</p>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-orange-900">Tiếng Anh</p>
                    <p className="text-3xl font-bold text-orange-900">{student.grades.english}</p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-white">Trung bình</p>
                    <p className="text-3xl font-bold text-white">{student.grades.average}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hạnh kiểm & Đánh giá</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Kỷ luật</p>
                    <p className="font-medium text-gray-900">{student.behavior.discipline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tham gia</p>
                    <p className="font-medium text-gray-900">{student.behavior.participation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bài tập</p>
                    <p className="font-medium text-gray-900">{student.behavior.homework}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Ghi chú</p>
                    <p className="font-medium text-gray-900">{student.behavior.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Medical Tab */}
          {activeTab === 'medical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin y tế</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Nhóm máu</p>
                      <p className="font-medium text-gray-900">{student.bloodType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ghi chú y tế</p>
                      <p className="font-medium text-gray-900">{student.medicalNotes}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-red-900 mb-4">Dị ứng</h3>
                  {student.allergies && student.allergies.length > 0 ? (
                    <div className="space-y-2">
                      {student.allergies.map((allergy, index) => (
                        <div key={index} className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                          <span className="font-medium text-red-900">{allergy}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-red-700">Không có dị ứng đã biết</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Hoạt động gần đây</h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {student.recentActivities.map((activity, index) => {
                    const IconComponent = getActivityIcon(activity.type)
                    return (
                      <li key={index}>
                        <div className="relative pb-8">
                          {index !== student.recentActivities.length - 1 && (
                            <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" />
                          )}
                          <div className="relative flex items-start space-x-3">
                            <div className={`relative px-1 ${getActivityColor(activity.status)} rounded-full`}>
                              <div className="h-8 w-8 flex items-center justify-center">
                                <IconComponent className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleDateString('vi-VN')}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Student Modal */}
      {showEditModal && editingStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Chỉnh sửa thông tin học sinh</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Họ tên học sinh"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Mã số học sinh"
                  value={editingStudent.studentId}
                  onChange={(e) => setEditingStudent({ ...editingStudent, studentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={editingStudent.grade}
                  onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">Lớp 1</option>
                  <option value="2">Lớp 2</option>
                  <option value="3">Lớp 3</option>
                  <option value="4">Lớp 4</option>
                  <option value="5">Lớp 5</option>
                </select>
                <input
                  type="text"
                  placeholder="Tên phụ huynh"
                  value={editingStudent.parentName}
                  onChange={(e) => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại phụ huynh"
                  value={editingStudent.parentPhone}
                  onChange={(e) => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Liên hệ khẩn cấp"
                  value={editingStudent.emergencyContact}
                  onChange={(e) => setEditingStudent({ ...editingStudent, emergencyContact: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Địa chỉ"
                  value={editingStudent.address}
                  onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                  className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                />
                <input
                  type="text"
                  placeholder="Điểm đón"
                  value={editingStudent.pickupPoint}
                  onChange={(e) => setEditingStudent({ ...editingStudent, pickupPoint: e.target.value })}
                  className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleEditStudent}
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

export default StudentDetailsPage