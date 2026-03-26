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
import { ProgressBar } from '../../components/common/Progress'
import { StatusBadge } from '../../components/common/Badge'
import Button from '../../components/common/Button'
import { formatDate, formatCurrency } from '../../utils/formatters'

// Mock data for demonstration
const mockStats = {
  totalProjects: 47,
  activeProjects: 23,
  completedProjects: 18,
  onHoldProjects: 6,
  totalProgress: 72,
  documentsUploaded: 1234,
  activeUsers: 45,
}

const mockRecentProjects = [
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

const mockRecentActivity = [
  {
    id: 1,
    type: 'progress_update',
    message: 'Progress updated to 75% for Westwood Tower Phase 1',
    user: 'John Doe',
    time: '10 minutes ago',
  },
  {
    id: 2,
    type: 'document_upload',
    message: 'Engineering plans uploaded for Metro Square Commercial',
    user: 'Jane Smith',
    time: '1 hour ago',
  },
  {
    id: 3,
    type: 'milestone_complete',
    message: 'Foundation work milestone completed',
    user: 'Mike Johnson',
    time: '2 hours ago',
  },
  {
    id: 4,
    type: 'new_project',
    message: 'New project created: Greenfield Residences',
    user: 'Admin',
    time: '5 hours ago',
  },
]

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

  const assignedProjectIds = user?.assignedProjectIds?.length
    ? user.assignedProjectIds
    : ['prj_001']
  const visibleRecentProjects = isClientViewer
    ? mockRecentProjects.filter((project) => assignedProjectIds.includes(project.id))
    : mockRecentProjects

  return (
    <div className="space-y-8 reveal-up">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 reveal-up reveal-delay-1">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-dark-600 mt-1">
            {currentRoleConfig.title}
          </p>
        </div>
        {canCreate(MODULES.PROJECTS) && (
          <Link to="/projects/create">
            <Button leftIcon={<FolderKanban className="h-4 w-4" />}>
              New Project
            </Button>
          </Link>
        )}
      </div>

      <Card className="reveal-up reveal-delay-1">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentRoleConfig.actions.map((action) => (
              <div key={action} className="rounded-lg border border-dark-200 bg-dark-50 px-4 py-3 text-sm font-medium text-dark-700">
                {action}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal-up reveal-delay-1">
        <KPICard
          title="Total Projects"
          value={mockStats.totalProjects}
          icon={FolderKanban}
          trend="up"
          trendValue="+12%"
          description="8 new projects this month"
        />
        <KPICard
          title="Active Projects"
          value={mockStats.activeProjects}
          icon={Activity}
          variant="warning"
          trend="up"
          trendValue="+5%"
        />
        <KPICard
          title="Documents"
          value={mockStats.documentsUploaded.toLocaleString()}
          icon={FileText}
          variant="info"
          trend="up"
          trendValue="+23"
          description="This week"
        />
        <KPICard
          title="Team Members"
          value={mockStats.activeUsers}
          icon={Users}
          variant="success"
        />
      </div>

      {/* Charts and Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal-up reveal-delay-2">
        {/* Project Status Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Project Status Overview</CardTitle>
              <Link to="/projects" className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center gap-1">
                View All <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-dark-50 rounded-xl border border-dark-200">
                <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <p className="text-2xl font-bold text-dark-900">{mockStats.activeProjects}</p>
                <p className="text-xs text-dark-600">In Progress</p>
              </div>
              <div className="text-center p-4 bg-dark-50 rounded-xl border border-dark-200">
                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <p className="text-2xl font-bold text-dark-900">{mockStats.completedProjects}</p>
                <p className="text-xs text-dark-600">Completed</p>
              </div>
              <div className="text-center p-4 bg-dark-50 rounded-xl border border-dark-200">
                <div className="h-10 w-10 rounded-full bg-info/10 flex items-center justify-center mx-auto mb-2">
                  <FolderKanban className="h-5 w-5 text-info" />
                </div>
                <p className="text-2xl font-bold text-dark-900">6</p>
                <p className="text-xs text-dark-600">Planning</p>
              </div>
              <div className="text-center p-4 bg-dark-50 rounded-xl border border-dark-200">
                <div className="h-10 w-10 rounded-full bg-dark-600 flex items-center justify-center mx-auto mb-2">
                  <AlertCircle className="h-5 w-5 text-dark-400" />
                </div>
                <p className="text-2xl font-bold text-dark-900">{mockStats.onHoldProjects}</p>
                <p className="text-xs text-dark-600">On Hold</p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="p-4 bg-dark-50 rounded-xl border border-dark-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-dark-900">Overall Portfolio Progress</span>
                <span className="text-sm font-bold text-yellow-500">{mockStats.totalProgress}%</span>
              </div>
              <ProgressBar value={mockStats.totalProgress} variant="gold" size="lg" />
            </div>
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-dark-200">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="px-6 py-4 hover:bg-dark-50 transition-colors">
                  <p className="text-sm text-dark-900 line-clamp-2">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-dark-600">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Projects Table */}
      <Card className="reveal-up reveal-delay-3">
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

