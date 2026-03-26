import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Layouts
import DashboardLayout from './layouts/DashboardLayout'
import AuthLayout from './layouts/AuthLayout'

// Route Guards
import ProtectedRoute from './routes/ProtectedRoute'
import RoleGuard from './routes/RoleGuard'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import LandingPage from './pages/LandingPage'
import InquiryPage from './pages/InquiryPage'

// Dashboard
import DashboardPage from './pages/dashboard/DashboardPage'

// Projects
import ProjectListPage from './pages/projects/ProjectListPage'
import ProjectDetailsPage from './pages/projects/ProjectDetailsPage'
import ProjectFormPage from './pages/projects/ProjectFormPage'

// Progress
import ProgressListPage from './pages/progress/ProgressListPage'
import ProgressUpdatePage from './pages/progress/ProgressUpdatePage'

// Site Reports
import SiteReportsListPage from './pages/site-reports/SiteReportsListPage'

// Documents
import DocumentsListPage from './pages/documents/DocumentsListPage'

// Clients
import ClientsListPage from './pages/clients/ClientsListPage'

// Reports
import ReportsPage from './pages/reports/ReportsPage'

// Users (Admin)
import UsersPage from './pages/users/UsersPage'

// Settings (Admin)
import SettingsPage from './pages/settings/SettingsPage'

// Role Constants
import { ROLES } from './config/permissions'

function App() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin h-12 w-12 border-4 border-yellow-200 border-t-yellow-600 rounded-full"></div>
          <p className="text-dark-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Landing Page - Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/inquire" element={<InquiryPage />} />

      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Dashboard - All Roles */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Projects - All Roles Can View */}
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          
          {/* Projects - Create/Edit (Admin, Operations Staff) */}
          <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.OPERATIONS_STAFF]} />}>
            <Route path="/projects/create" element={<ProjectFormPage />} />
            <Route path="/projects/:id/edit" element={<ProjectFormPage />} />
          </Route>

          {/* Progress - All Roles Can View */}
          <Route path="/progress" element={<ProgressListPage />} />
          
          {/* Progress - Update (Admin, Project Engineer) */}
          <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.PROJECT_ENGINEER]} />}>
            <Route path="/progress/update" element={<ProgressUpdatePage />} />
          </Route>

          {/* Site Reports - All Roles Can View */}
          <Route path="/site-reports" element={<SiteReportsListPage />} />
          
          {/* Site Reports - Create (Admin, Project Engineer) */}
          <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.PROJECT_ENGINEER]} />}>
            <Route path="/site-reports/create" element={<SiteReportsListPage />} />
          </Route>

          {/* Documents - All Roles Can View */}
          <Route path="/documents" element={<DocumentsListPage />} />

          {/* Clients - Admin, Operations Staff */}
          <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.OPERATIONS_STAFF]} />}>
            <Route path="/clients" element={<ClientsListPage />} />
          </Route>

          {/* Reports - Admin, Operations Staff, Project Engineer, Viewer */}
          <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.OPERATIONS_STAFF, ROLES.PROJECT_ENGINEER, ROLES.VIEWER]} />}>
            <Route path="/reports" element={<ReportsPage />} />
          </Route>

          {/* User Management - Admin Only */}
          <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>

          {/* Settings - Admin Only */}
          <Route element={<RoleGuard allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Catch all - redirect to dashboard or login */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

export default App

