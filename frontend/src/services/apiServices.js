import apiClient from './api'

// Auth API
export const authAPI = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  logout: () => apiClient.post('/auth/logout'),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
  changePassword: (data) => apiClient.put('/auth/change-password', data),
  refreshToken: (refreshToken) => apiClient.post('/auth/refresh', { refreshToken }),
}

// User API
export const userAPI = {
  getUsers: (params) => apiClient.get('/users', { params }),
  getUser: (id) => apiClient.get(`/users/${id}`),
  createUser: (data) => apiClient.post('/users', data),
  updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
}

// Bus API
export const busAPI = {
  getBuses: (params) => apiClient.get('/buses', { params }),
  getBus: (id) => apiClient.get(`/buses/${id}`),
  createBus: (data) => apiClient.post('/buses', data),
  updateBus: (id, data) => apiClient.put(`/buses/${id}`, data),
  deleteBus: (id) => apiClient.delete(`/buses/${id}`),
}

// Route API
export const routeAPI = {
  getRoutes: (params) => apiClient.get('/routes', { params }),
  getRoute: (id) => apiClient.get(`/routes/${id}`),
  createRoute: (data) => apiClient.post('/routes', data),
  updateRoute: (id, data) => apiClient.put(`/routes/${id}`, data),
  deleteRoute: (id) => apiClient.delete(`/routes/${id}`),
}

// Stop API
export const stopAPI = {
  getStops: (params) => apiClient.get('/stops', { params }),
  getStop: (id) => apiClient.get(`/stops/${id}`),
  createStop: (data) => apiClient.post('/stops', data),
  updateStop: (id, data) => apiClient.put(`/stops/${id}`, data),
  deleteStop: (id) => apiClient.delete(`/stops/${id}`),
}

// Schedule API
export const scheduleAPI = {
  getSchedules: (params) => apiClient.get('/schedules', { params }),
  getSchedule: (id) => apiClient.get(`/schedules/${id}`),
  createSchedule: (data) => apiClient.post('/schedules', data),
  updateSchedule: (id, data) => apiClient.put(`/schedules/${id}`, data),
  deleteSchedule: (id) => apiClient.delete(`/schedules/${id}`),
}

// Tracking API
export const trackingAPI = {
  updateLocation: (data) => apiClient.post('/tracking/location', data),
  getBusLocation: (id) => apiClient.get(`/tracking/bus/${id}`),
  getBusHistory: (id, params) => apiClient.get(`/tracking/bus/${id}/history`, { params }),
  getAllBusesLocations: (params) => apiClient.get('/tracking/buses', { params }),
  getRouteBusesLocations: (routeId) => apiClient.get(`/tracking/route/${routeId}/buses`),
}

// Notification API
export const notificationAPI = {
  getNotifications: (params) => apiClient.get('/notifications', { params }),
  getNotification: (id) => apiClient.get(`/notifications/${id}`),
  markAsRead: (id) => apiClient.put(`/notifications/${id}/read`),
  deleteNotification: (id) => apiClient.delete(`/notifications/${id}`),
}

// Student API
export const studentAPI = {
  getStudents: (params) => apiClient.get('/students', { params }),
  getStudent: (id) => apiClient.get(`/students/${id}`),
  createStudent: (data) => apiClient.post('/students', data),
  updateStudent: (id, data) => apiClient.put(`/students/${id}`, data),
  deleteStudent: (id) => apiClient.delete(`/students/${id}`),
}