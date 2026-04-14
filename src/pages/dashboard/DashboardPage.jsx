import { Link } from 'react-router-dom'
import {
  FolderKanban,
  TrendingUp,
  FileText,
  Users,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { usePermissions } from '../../hooks/usePermissions'
import { Card, CardHeader, CardTitle, CardBody } from '../../components/common/Card'
import { KPICard } from '../../components/common/KPICard'
import { ProjectStatusBar, PortfolioPie, ProgressLine } from '../../components/charts/DashboardCharts'
import { ProgressBar } from '../../components/common/Progress'
import { StatusBadge } from '../../components/common/Badge'
import { useEffect, useRef, useState } from 'react'
// Slideshow images (client-specific, local images)
const progressImages = [
  '/src/images/portfolio-images/client-images/Interior cafe design.jpg',
  '/src/images/portfolio-images/client-images/download.jpg',
  '/src/images/portfolio-images/client-images/download (1).jpg',
  '/src/images/portfolio-images/client-images/download (2).jpg',
  '/src/images/portfolio-images/client-images/House.jpg',
  '/src/images/portfolio-images/client-images/terrace deck decor idea lighting plants boho trendy classy.jpg',
  '/src/images/portfolio-images/client-images/Doheny Estates - Modern - Bedroom - Los Angeles - by Foundation Landscape Design _ Houzz.jpg',
]

function ProgressSlideshow() {
  const [current, setCurrent] = useState(0)
  const timeoutRef = useRef(null)

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrent((prev) => (prev - 1 + progressImages.length) % progressImages.length)
      } else if (e.key === 'ArrowRight') {
        setCurrent((prev) => (prev + 1) % progressImages.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-advance
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % progressImages.length)
    }, 3500)
    return () => clearTimeout(timeoutRef.current)
  }, [current])

  // Manual navigation buttons
  const goToPrev = () => setCurrent((prev) => (prev - 1 + progressImages.length) % progressImages.length)
  const goToNext = () => setCurrent((prev) => (prev + 1) % progressImages.length)

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white animate-fade-in relative">
      <img
        src={progressImages[current]}
        alt={`Site Progress ${current + 1}`}
        className="w-full h-72 object-cover object-center transition-all duration-700"
        draggable={false}
      />
      {/* Left Arrow */}
      <button
        onClick={goToPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-yellow-100 rounded-full p-2 shadow transition-all"
        style={{ zIndex: 2 }}
      >
        <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      {/* Right Arrow */}
      <button
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-yellow-100 rounded-full p-2 shadow transition-all"
        style={{ zIndex: 2 }}
      >
        <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {progressImages.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full ${idx === current ? 'bg-yellow-500' : 'bg-dark-200'} transition-all`}
          />
        ))}
      </div>
    </div>
  )
}
import Button from '../../components/common/Button'
import { formatDate, formatCurrency } from '../../utils/formatters'

// --- DEMO DATA LOGIC: Filtered per user role/assignment ---
const allProjects = [
  {
    id: 'prj_001',
    name: 'Westwood Tower Phase 1',
    code: 'WT-P1',
    status: 'in_progress',
    progress: 75,
    client: 'Westwood Holdings Inc.',
    endDate: '2026-06-30',
    budget: 15000000,
  },
  {
    id: 'prj_002',
    name: 'Metro Square Commercial',
    code: 'MSC-01',
    status: 'in_progress',
    progress: 45,
    client: 'Metro Properties Corp.',
    endDate: '2027-03-15',
    budget: 28000000,
  },
  {
    id: 'prj_003',
    name: 'Greenfield Residences',
    code: 'GR-01',
    status: 'planning',
    progress: 10,
    client: 'Green Development Ltd.',
    endDate: '2028-01-20',
    budget: 35000000,
  },
  {
    id: 'prj_004',
    name: 'Harbor Bay Industrial',
    code: 'HBI-01',
    status: 'on_hold',
    progress: 62,
    client: 'Harbor Industries Inc.',
    endDate: '2026-09-30',
    budget: 12000000,
  },
]

// Demo activities, filtered by project assignment for demo
const allActivities = [
  {
    id: 1,
    type: 'progress_update',
    message: 'Progress updated to 75% for Westwood Tower Phase 1',
    user: 'John Doe',
    projectId: 'prj_001',
    time: '10 minutes ago',
  },
  {
    id: 2,
    type: 'document_upload',
    message: 'Engineering plans uploaded for Metro Square Commercial',
    user: 'Jane Smith',
    projectId: 'prj_002',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'milestone_complete',
    message: 'Foundation work milestone completed',
    user: 'Mike Johnson',
    projectId: 'prj_003',
    time: '2 hours ago',
  },
  {
    id: 4,
    type: 'new_project',
    message: 'New project created: Greenfield Residences',
    user: 'Admin',
    projectId: 'prj_003',
    time: '5 hours ago',
  },
]

// Helper to get assigned projects for demo
function getAssignedProjects(user) {
  if (!user) return []
  if (user.role === 'admin' || user.role === 'operations_staff') return allProjects
  if (user.assignedProjectIds) {
    return allProjects.filter(p => user.assignedProjectIds.includes(p.id))
  }
  return []
}

function getStats(projects) {
  // Calculate stats based on visible projects
  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status === 'in_progress').length
  const completedProjects = projects.filter(p => p.status === 'completed').length
  const onHoldProjects = projects.filter(p => p.status === 'on_hold').length
  const planningProjects = projects.filter(p => p.status === 'planning').length
  const totalProgress = totalProjects
    ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / totalProjects)
    : 0
  // Demo: documents and users are static for now
  return {
    totalProjects,
    activeProjects,
    completedProjects,
    onHoldProjects,
    planningProjects,
    totalProgress,
    documentsUploaded: 1234,
    activeUsers: 45,
  }
}

/**
 * Dashboard Page Component
 */
function DashboardPage() {
  const { user } = useAuth()
  const { canCreate, hasRole, MODULES, ROLES } = usePermissions()

  const isFinancialRole = hasRole([ROLES.ADMIN, ROLES.OPERATIONS_STAFF])
  const isClientViewer = hasRole(ROLES.VIEWER)

  const roleConfig = {
    [ROLES.ADMIN]: {
      title: 'Full system oversight for fit-out operations',
      actions: ['Manage Users', 'Manage Settings', 'Review Portfolio Health'],
    },
    [ROLES.PROJECT_ENGINEER]: {
      title: 'Technical execution: progress, milestones, and site reporting',
      actions: ['Update Progress', 'Upload Site Report', 'Request Materials'],
    },
    [ROLES.OPERATIONS_STAFF]: {
      title: 'Operations coordination: clients, billing, and procurement tracking',
      actions: ['Manage Clients', 'Track Billing and Budget', 'Handle Procurement'],
    },
    [ROLES.VIEWER]: {
      title: 'Client portal: transparent project updates and reports',
      actions: ['View Project Progress', 'View Site Reports', 'View Shared Documents'],
    },
  }

  const currentRoleConfig = roleConfig[user?.role] || {
    title: 'Project delivery workspace',
    actions: ['Review Projects', 'Monitor Progress', 'Coordinate Updates'],
  }


  // --- DEMO: Filter projects and activities based on user role/assignment ---
  const visibleProjects = getAssignedProjects(user)
  const visibleRecentProjects = visibleProjects.slice(0, 4)
  const visibleActivities = allActivities.filter(a => visibleProjects.some(p => p.id === a.projectId))
  const mockStats = getStats(visibleProjects)

  // Prepare progress analytics and schedule
  const statusList = [
    { label: 'In Progress', value: mockStats.activeProjects, color: 'bg-yellow-400' },
    { label: 'Completed', value: mockStats.completedProjects, color: 'bg-green-400' },
    { label: 'Planning', value: mockStats.planningProjects, color: 'bg-blue-300' },
    { label: 'On Hold', value: mockStats.onHoldProjects, color: 'bg-gray-300' },
  ];
  const schedule = visibleProjects
    .map((p) => ({
      name: p.name,
      deadline: p.endDate,
      status: p.status,
      progress: p.progress,
    }))
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-yellow-100 via-white to-yellow-50 shadow-lg mb-6 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <FolderKanban className="h-14 w-14 text-yellow-500 drop-shadow-lg" />
          <div>
            <h1 className="text-3xl font-extrabold text-dark-900 tracking-tight mb-1">Welcome back, {user?.firstName}!</h1>
            <p className="text-lg text-dark-600 font-medium">{currentRoleConfig.title}</p>
          </div>
        </div>
        {canCreate(MODULES.PROJECTS) && !isClientViewer && (
          <Link to="/projects/create">
            <Button leftIcon={<FolderKanban className="h-5 w-5" />} size="lg" className="shadow-md">
              New Project
            </Button>
          </Link>
        )}
      </div>

      {/* Slideshow for client (viewer) role */}
      {isClientViewer ? (
        <div className="mb-8">
          <ProgressSlideshow />
        </div>
      ) : (
        <>
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            {currentRoleConfig.actions.map((action) => (
              <div key={action} className="rounded-xl border border-dark-100 bg-white px-6 py-5 text-base font-semibold text-dark-800 shadow-sm hover:shadow-md transition-all flex items-center gap-3 animate-fade-in">
                <CheckCircle className="h-5 w-5 text-yellow-500" />
                {action}
              </div>
            ))}
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Projects"
              value={mockStats.totalProjects}
              icon={FolderKanban}
              trend="up"
              trendValue={mockStats.totalProjects > 0 ? '+12%' : '0%'}
              description={mockStats.totalProjects > 0 ? '8 new projects this month' : 'No projects assigned'}
            />
            <KPICard
              title="Active Projects"
              value={mockStats.activeProjects}
              icon={Activity}
              variant="warning"
              trend="up"
              trendValue={mockStats.activeProjects > 0 ? '+5%' : '0%'}
            />
            <KPICard
              title="Documents"
              value={mockStats.documentsUploaded.toLocaleString()}
              icon={FileText}
              variant="info"
              trend="up"
              trendValue={mockStats.documentsUploaded > 0 ? '+23' : '0'}
              description="This week"
            />
            <KPICard
              title="Team Members"
              value={mockStats.activeUsers}
              icon={Users}
              variant="success"
            />
          </div>

          {/* Analytics & Schedule Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Status Progress Bars */}
            <Card className="lg:col-span-2 shadow-md animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Status Analytics</CardTitle>
                  <Link to="/projects" className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center gap-1">
                    View All <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-5">
                  {statusList.map((s) => (
                    <div key={s.label} className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-dark-700">{s.label}</span>
                        <span className="text-sm font-semibold text-dark-900">{s.value}</span>
                      </div>
                      <div className="w-full bg-dark-100 rounded-full h-3">
                        <div
                          className={`${s.color} h-3 rounded-full transition-all`}
                          style={{ width: `${Math.max(5, Math.min(100, (s.value / (mockStats.totalProjects || 1)) * 100))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            {/* Project Schedule Timeline */}
            <Card className="shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle>Upcoming Project Deadlines</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="divide-y divide-dark-100">
                  {schedule.length === 0 ? (
                    <li className="py-4 text-dark-400 text-sm">No projects scheduled.</li>
                  ) : (
                    schedule.map((item) => (
                      <li key={item.name} className="py-4 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-dark-900">{item.name}</span>
                          <span className="text-xs text-dark-500">{formatDate(item.deadline)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-dark-100 text-dark-700 capitalize">{item.status.replace('_', ' ')}</span>
                          <span className="text-xs text-dark-500">Progress:</span>
                          <span className="text-xs font-semibold text-yellow-600">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-dark-100 rounded-full h-2 mt-1">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </CardBody>
            </Card>
            {/* Recent Activity */}
            <Card className="lg:col-span-3 shadow-md animate-fade-in">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-dark-200">
                  {visibleActivities.length === 0 ? (
                    <div className="px-6 py-4 text-dark-400 text-sm">No recent activity for your projects.</div>
                  ) : (
                    visibleActivities.map((activity) => (
                      <div key={activity.id} className="px-6 py-4 hover:bg-yellow-50 transition-all duration-300 animate-fade-in">
                        <p className="text-sm text-dark-900 line-clamp-2">{activity.message}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-dark-600">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}

      {/* Recent Projects Table (still shown for all) */}
      <Card className="shadow-md animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Projects</CardTitle>
            <Link to="/projects" className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center gap-1">
              View All <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-50 border-y border-dark-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                    Progress
                  </th>
                  {isFinancialRole && (
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                      Budget
                    </th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                    Deadline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-200">
                {visibleRecentProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-dark-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <Link to={`/projects/${project.id}`} className="hover:text-yellow-500">
                        <p className="text-sm font-medium text-dark-900 hover:text-yellow-500">
                          {project.name}
                        </p>
                        <p className="text-xs text-dark-600">{project.code}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-700">
                      {project.client}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-6 py-4 w-40">
                      <div className="flex items-center gap-3">
                        <ProgressBar
                          value={project.progress}
                          variant="gold"
                          size="sm"
                          className="flex-1"
                        />
                        <span className="text-sm text-dark-700 w-10">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    {isFinancialRole && (
                      <td className="px-6 py-4 text-sm text-dark-700">
                        {formatCurrency(project.budget)}
                      </td>
                    )}
                    <td className="px-6 py-4 text-sm text-dark-700">
                      {formatDate(project.endDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default DashboardPage

