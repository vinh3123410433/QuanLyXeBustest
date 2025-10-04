import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './hooks/useAuthStore'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/Auth/ProtectedRoute'

// Auth pages
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'

// Dashboard
import DashboardPage from './pages/Dashboard/DashboardPage'

// Bus Management
import BusListPage from './pages/Buses/BusListPage'
import BusDetailsPage from './pages/Buses/BusDetailsPage'

// Route Management
import RouteListPage from './pages/Routes/RouteListPage'
import RouteDetailsPage from './pages/Routes/RouteDetailsPage'

// Student Management
import StudentListPage from './pages/Students/StudentListPage'
import StudentDetailsPage from './pages/Students/StudentDetailsPage'

// Tracking
import TrackingPage from './pages/Tracking/TrackingPage'

// Schedule
import SchedulePage from './pages/Schedule/SchedulePage'

// Driver Schedule
import DriverSchedulePage from './pages/Driver/DriverSchedulePage'

// Notifications
import NotificationsPage from './pages/Notifications/NotificationsPage'

// User Management
import UserListPage from './pages/Users/UserListPage'
import UserDetailsPage from './pages/Users/UserDetailsPage'

// Profile
import ProfilePage from './pages/Profile/ProfilePage'

// Error pages
import NotFoundPage from './pages/Error/NotFoundPage'

function App() {
  const { user, isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <RegisterPage />
            )
          }
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard */}
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* Bus Management - Admin and Dispatch only */}
          <Route 
            path="buses" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'dispatch']}>
                <BusListPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="buses/:id" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'dispatch']}>
                <BusDetailsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Route Management - Admin and Dispatch only */}
          <Route 
            path="routes" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'dispatch']}>
                <RouteListPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="routes/:id" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'dispatch']}>
                <RouteDetailsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Student Management - Admin and Parents only */}
          <Route
            path="students"
            element={
              <ProtectedRoute allowedRoles={['admin', 'dispatch', 'parent']}>
                <StudentListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="students/:id"
            element={
              <ProtectedRoute allowedRoles={['admin', 'dispatch', 'parent']}>
                <StudentDetailsPage />
              </ProtectedRoute>
            }
          />
          
          {/* Tracking */}
          <Route path="tracking" element={<TrackingPage />} />
          
          {/* Schedule - Different for drivers */}
          <Route 
            path="schedule" 
            element={
              user?.role === 'driver' ? <DriverSchedulePage /> : (
                <ProtectedRoute allowedRoles={['admin', 'dispatch', 'parent']}>
                  <SchedulePage />
                </ProtectedRoute>
              )
            } 
          />
          
          {/* Notifications - Admin, Dispatch and Parents only */}
          <Route 
            path="notifications" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'dispatch', 'parent']}>
                <NotificationsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* User Management - Admin only */}
          <Route 
            path="users" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserListPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="users/:id" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserDetailsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Profile */}
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App