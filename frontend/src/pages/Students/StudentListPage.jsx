import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  GraduationCap,
  User,
  MapPin,
  Calendar,
  Phone,
  Home,
  Bus,
  Route,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { useAuthStore } from '../../hooks/useAuthStore'

const StudentListPage = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [selectedRoute, setSelectedRoute] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    grade: '1',
    parentName: '',
    parentPhone: '',
    address: '',
    route: '',
    pickupPoint: '',
    status: 'active'
  })

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
      medicalNotes: 'Không có',
      createdAt: '2024-01-15',
      attendance: {
        present: 45,
        absent: 3,
        late: 2
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
      medicalNotes: 'Dị ứng với đậu phộng',
      createdAt: '2024-02-01',
      attendance: {
        present: 42,
        absent: 5,
        late: 3
      }
    },
    {
      id: 3,
      name: 'Lê Văn Cao',
      studentId: 'HS003',
      grade: '3',
      parentName: 'Lê Thị Dung',
      parentPhone: '0903456789',
      parentEmail: 'parent3@gmail.com',
      address: '789 Đường GHI, Quận 3, TP.HCM',
      route: 'Tuyến A',
      routeId: 'route-1',
      pickupPoint: 'Điểm đón A3 - Công viên Tao Đàn',
      pickupTime: '07:30',
      dropoffTime: '17:00',
      status: 'inactive',
      avatar: null,
      emergencyContact: '0987654323',
      medicalNotes: 'Không có',
      createdAt: '2024-02-15',
      attendance: {
        present: 38,
        absent: 8,
        late: 4
      }
    },
    {
      id: 4,
      name: 'Phạm Thị Diễm',
      studentId: 'HS004',
      grade: '1',
      parentName: 'Phạm Văn Em',
      parentPhone: '0904567890',
      parentEmail: 'parent4@gmail.com',
      address: '321 Đường JKL, Quận 4, TP.HCM',
      route: 'Tuyến C',
      routeId: 'route-3',
      pickupPoint: 'Điểm đón C1 - Chợ Tân Định',
      pickupTime: '06:45',
      dropoffTime: '16:15',
      status: 'active',
      avatar: null,
      emergencyContact: '0987654324',
      medicalNotes: 'Cần thuốc hen suyễn',
      createdAt: '2024-03-01',
      attendance: {
        present: 40,
        absent: 6,
        late: 4
      }
    },
    {
      id: 5,
      name: 'Hoàng Văn Phong',
      studentId: 'HS005',
      grade: '4',
      parentName: 'Hoàng Thị Giang',
      parentPhone: '0905678901',
      parentEmail: 'parent5@gmail.com',
      address: '654 Đường MNO, Quận 5, TP.HCM',
      route: 'Tuyến B',
      routeId: 'route-2',
      pickupPoint: 'Điểm đón B4 - Bệnh viện Nhi Đồng 1',
      pickupTime: '07:00',
      dropoffTime: '16:30',
      status: 'active',
      avatar: null,
      emergencyContact: '0987654325',
      medicalNotes: 'Không có',
      createdAt: '2024-03-15',
      attendance: {
        present: 44,
        absent: 4,
        late: 2
      }
    }
  ]

  const routes = [
    { id: 'route-1', name: 'Tuyến A' },
    { id: 'route-2', name: 'Tuyến B' },
    { id: 'route-3', name: 'Tuyến C' }
  ]

  useEffect(() => {
    // Filter students based on user role
    let filteredByRole = demoStudents
    if (user?.role === 'parent') {
      // In real app, this would filter by parent's children
      filteredByRole = demoStudents.filter(student => 
        student.parentEmail === user.email
      )
    }
    setStudents(filteredByRole)
    setFilteredStudents(filteredByRole)
  }, [user])

  useEffect(() => {
    let filtered = students

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.parentPhone.includes(searchTerm)
      )
    }

    // Filter by grade
    if (selectedGrade !== 'all') {
      filtered = filtered.filter(student => student.grade === selectedGrade)
    }

    // Filter by route
    if (selectedRoute !== 'all') {
      filtered = filtered.filter(student => student.routeId === selectedRoute)
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(student => student.status === selectedStatus)
    }

    setFilteredStudents(filtered)
  }, [students, searchTerm, selectedGrade, selectedRoute, selectedStatus])

  const handleCreateStudent = () => {
    const student = {
      id: students.length + 1,
      ...newStudent,
      createdAt: new Date().toISOString().split('T')[0],
      attendance: {
        present: 0,
        absent: 0,
        late: 0
      },
      emergencyContact: '',
      medicalNotes: 'Không có'
    }
    setStudents([...students, student])
    setShowCreateModal(false)
    setNewStudent({
      name: '',
      studentId: '',
      grade: '1',
      parentName: '',
      parentPhone: '',
      address: '',
      route: '',
      pickupPoint: '',
      status: 'active'
    })
  }

  const handleEditStudent = () => {
    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ))
    setShowEditModal(false)
    setEditingStudent(null)
  }

  const handleDeleteStudent = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa học sinh này?')) {
      setStudents(students.filter(student => student.id !== id))
    }
  }

  const toggleStudentStatus = (id) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, status: student.status === 'active' ? 'inactive' : 'active' }
        : student
    ))
  }

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

  // Statistics
  const stats = [
    {
      name: 'Tổng học sinh',
      value: students.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Đang học',
      value: students.filter(s => s.status === 'active').length,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      name: 'Tạm nghỉ',
      value: students.filter(s => s.status === 'inactive').length,
      icon: XCircle,
      color: 'bg-red-500'
    },
    {
      name: 'Có ghi chú y tế',
      value: students.filter(s => s.medicalNotes && s.medicalNotes !== 'Không có').length,
      icon: AlertCircle,
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý học sinh</h1>
          <p className="mt-1 text-sm text-gray-600">
            Quản lý thông tin và theo dõi học sinh
          </p>
        </div>
        {(user?.role === 'admin' || user?.role === 'dispatch') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm học sinh
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm học sinh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả lớp</option>
            <option value="1">Lớp 1</option>
            <option value="2">Lớp 2</option>
            <option value="3">Lớp 3</option>
            <option value="4">Lớp 4</option>
            <option value="5">Lớp 5</option>
          </select>

          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả tuyến</option>
            {routes.map(route => (
              <option key={route.id} value={route.id}>{route.name}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang học</option>
            <option value="inactive">Tạm nghỉ</option>
          </select>

          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-2" />
            Tìm thấy {filteredStudents.length} kết quả
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học sinh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phụ huynh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tuyến đường
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm danh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">MSHS: {student.studentId} • Lớp {student.grade}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.parentName}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {student.parentPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Route className="h-4 w-4 mr-2 text-gray-400" />
                      {student.route}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {student.pickupTime} - {student.dropoffTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        getAttendanceRate(student.attendance) >= 90 
                          ? 'bg-green-400' 
                          : getAttendanceRate(student.attendance) >= 75 
                          ? 'bg-yellow-400' 
                          : 'bg-red-400'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-900">
                        {getAttendanceRate(student.attendance)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {student.attendance.present}P/{student.attendance.absent}V/{student.attendance.late}M
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                      {student.status === 'active' ? 'Đang học' : 'Tạm nghỉ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => navigate(`/students/${student.id}`)}
                        className="text-gray-600 hover:text-gray-900"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {(user?.role === 'admin' || user?.role === 'dispatch') && (
                        <>
                          <button
                            onClick={() => {
                              setEditingStudent(student)
                              setShowEditModal(true)
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            title="Chỉnh sửa"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => toggleStudentStatus(student.id)}
                            className={`${student.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                            title={student.status === 'active' ? 'Tạm nghỉ' : 'Kích hoạt'}
                          >
                            {student.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Student Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Thêm học sinh mới</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Họ tên học sinh"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Mã số học sinh"
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent({ ...newStudent, studentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newStudent.grade}
                  onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
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
                  value={newStudent.parentName}
                  onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại phụ huynh"
                  value={newStudent.parentPhone}
                  onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newStudent.route}
                  onChange={(e) => setNewStudent({ ...newStudent, route: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn tuyến đường</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.name}>{route.name}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Địa chỉ"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                  className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                />
                <input
                  type="text"
                  placeholder="Điểm đón"
                  value={newStudent.pickupPoint}
                  onChange={(e) => setNewStudent({ ...newStudent, pickupPoint: e.target.value })}
                  className="col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateStudent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <select
                  value={editingStudent.route}
                  onChange={(e) => setEditingStudent({ ...editingStudent, route: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn tuyến đường</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.name}>{route.name}</option>
                  ))}
                </select>
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

export default StudentListPage