import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  MapPin, 
  DollarSign,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  MoreVertical,
  Plus,
  BarChart3,
} from 'lucide-react'
import { usePermissions } from '../../hooks/usePermissions'
import { useAuth } from '../../hooks/useAuth'
import { Card, CardHeader, CardBody } from '../../components/common/Card'
import { StatusBadge, Badge } from '../../components/common/Badge'
import { ProgressBar } from '../../components/common/Progress'
import Button from '../../components/common/Button'
import { formatDate, formatCurrency, formatPercentage } from '../../utils/formatters'

// Mock project data
const mockProject = {
  id: 'prj_001',
  name: 'Westwood Tower Phase 1',
  code: 'WT-P1',
  status: 'in_progress',
  progress: 75,
  description: 'A 25-story commercial building complex featuring modern office spaces, retail areas, and underground parking. This flagship project showcases sustainable construction practices.',
  client: { 
    id: 'client_001',
    name: 'Westwood Holdings Inc.',
    contact: 'Robert Chen',
    email: 'r.chen@westwood.com',
    phone: '+63 2 8888 1234',
  },
  projectManager: { 
    id: 'user_001',
    name: 'John Doe',
    email: 'john.doe@company.com',
  },
  engineerInCharge: {
    id: 'user_002',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
  },
  startDate: '2025-01-15',
  endDate: '2026-06-30',
  actualEndDate: null,
  budget: 15000000,
  spent: 11250000,
  location: 'Metro Manila',
  address: '123 Business District, Makati City, Metro Manila',
  type: 'commercial',
  floors: 25,
  totalArea: 45000,
  createdAt: '2024-12-01',
  updatedAt: '2025-01-16',
}

const projectPhases = [
  { id: 1, name: 'Pre-Construction', progress: 100, status: 'completed', startDate: '2025-01-15', endDate: '2025-02-28' },
  { id: 2, name: 'Foundation', progress: 100, status: 'completed', startDate: '2025-03-01', endDate: '2025-05-15' },
  { id: 3, name: 'Structural Work', progress: 85, status: 'in_progress', startDate: '2025-05-16', endDate: '2025-10-30' },
  { id: 4, name: 'MEP Installation', progress: 45, status: 'in_progress', startDate: '2025-08-01', endDate: '2026-01-31' },
  { id: 5, name: 'Finishing Works', progress: 0, status: 'not_started', startDate: '2025-12-01', endDate: '2026-05-15' },
  { id: 6, name: 'Final Inspection', progress: 0, status: 'not_started', startDate: '2026-05-16', endDate: '2026-06-30' },
]

const recentDocuments = [
  { id: 1, name: 'Structural Design Rev3.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2025-01-14' },
  { id: 2, name: 'MEP Layout Plans.dwg', type: 'DWG', size: '15.8 MB', uploadedAt: '2025-01-13' },
  { id: 3, name: 'Budget Report Q1.xlsx', type: 'XLSX', size: '580 KB', uploadedAt: '2025-01-10' },
]

const recentReports = [
  { id: 1, title: 'Daily Progress Report', date: '2025-01-16', author: 'Mike Johnson' },
  { id: 2, title: 'Weekly Safety Inspection', date: '2025-01-15', author: 'Sarah Wilson' },
  { id: 3, title: 'Material Delivery Log', date: '2025-01-14', author: 'Mike Johnson' },
]

const teamMembers = [
  { id: 1, name: 'John Doe', role: 'Project Manager', avatar: null },
  { id: 2, name: 'Mike Johnson', role: 'Site Engineer', avatar: null },
  { id: 3, name: 'Sarah Wilson', role: 'Safety Officer', avatar: null },
  { id: 4, name: 'Alex Chen', role: 'Architect', avatar: null },
]

/**
 * Project Details Page Component
 */
function ProjectDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { canEdit, canDelete, hasRole, MODULES, ROLES } = usePermissions()

  const isFinancialRole = hasRole([ROLES.ADMIN, ROLES.OPERATIONS_STAFF])
  const isProjectEngineer = hasRole(ROLES.PROJECT_ENGINEER)
  const isClientViewer = hasRole(ROLES.VIEWER)
  const assignedProjectIds = user?.assignedProjectIds?.length
    ? user.assignedProjectIds
    : ['prj_001']
  // Restrict engineer to only their assigned project
  const canViewCurrentProject = isProjectEngineer
    ? id === assignedProjectIds[0]
    : (!isClientViewer || assignedProjectIds.includes(id))

  const [activeTab, setActiveTab] = useState('overview')

  // Calculate project metrics
  const budgetUtilization = (mockProject.spent / mockProject.budget) * 100
  const daysRemaining = Math.ceil(
    (new Date(mockProject.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  )
  const visibleRecentDocuments = isFinancialRole
    ? recentDocuments
    : recentDocuments.filter((doc) => !doc.name.toLowerCase().includes('budget'))

  // Utility for always visible text
  const alwaysVisible = 'text-dark-900'

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'progress', label: 'Progress' },
    { id: 'documents', label: 'Documents' },
    { id: 'reports', label: 'Reports' },
    { id: 'team', label: 'Team' },
  ]

  if (!canViewCurrentProject) {
    return (
      <Card>
        <CardBody className="py-16 text-center">
          <p className="text-lg font-semibold text-dark-900">Access Restricted</p>
          <p className="mt-2 text-dark-600">Client/Viewer accounts can only view their own assigned project.</p>
          <div className="mt-6">
            <Link to="/projects">
              <Button>Back to My Projects</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-dark-900">{mockProject.name}</h1>
              <StatusBadge status={mockProject.status} />
            </div>
            <p className="text-dark-700 mt-1">
              Code: {mockProject.code} • {mockProject.type.charAt(0).toUpperCase() + mockProject.type.slice(1)} Project
            </p>
          </div>
          <div className="flex items-center gap-2">
            {canEdit(MODULES.PROJECTS) && (
              <Link to={`/projects/${id}/edit`}>
                <Button variant="outline" leftIcon={<Edit className="h-4 w-4" />}>
                  Edit
                </Button>
              </Link>
            )}
            {canDelete(MODULES.PROJECTS) && (
              <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className={`text-sm ${alwaysVisible}`}>Progress</p>
                <p className={`text-xl font-bold ${alwaysVisible}`}>{mockProject.progress}%</p>
              </div>
            </div>
          </CardBody>
        </Card>
        {isFinancialRole && (
          <Card>
            <CardBody className="py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className={`text-sm ${alwaysVisible}`}>Budget Used</p>
                  <p className={`text-xl font-bold ${alwaysVisible}`}>{formatPercentage(budgetUtilization)}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className={`text-sm ${alwaysVisible}`}>Days Remaining</p>
                <p className={`text-xl font-bold ${alwaysVisible}`}>{daysRemaining}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Users className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className={`text-sm ${alwaysVisible}`}>Team Size</p>
                <p className={`text-xl font-bold ${alwaysVisible}`}>{teamMembers.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-dark-700 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'text-yellow-500 border-yellow-500'
                : 'text-dark-400 border-transparent hover:text-white hover:border-dark-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader title="Description" />
              <CardBody>
                <p className="text-dark-300">{mockProject.description}</p>
              </CardBody>
            </Card>

            {/* Project Details */}
            <Card>
              <CardHeader title="Project Details" />
              <CardBody>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-dark-500">Start Date</p>
                    <p className="text-dark-900">{formatDate(mockProject.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-dark-500">Target End Date</p>
                    <p className="text-dark-900">{formatDate(mockProject.endDate)}</p>
                  </div>
                  {isFinancialRole && (
                    <>
                      <div>
                        <p className="text-sm text-dark-500">Total Budget</p>
                        <p className="text-dark-900">{formatCurrency(mockProject.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-dark-500">Amount Spent</p>
                        <p className="text-dark-900">{formatCurrency(mockProject.spent)}</p>
                      </div>
                    </>
                  )}
                  <div>
                    <p className="text-sm text-dark-500">Building Floors</p>
                    <p className="text-dark-900">{mockProject.floors}</p>
                  </div>
                  <div>
                    <p className="text-sm text-dark-500">Total Area</p>
                    <p className="text-dark-900">{mockProject.totalArea.toLocaleString()} sqm</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader title="Location" />
              <CardBody>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-dark-400 mt-0.5" />
                  <div>
                    <p className="text-dark-900">{mockProject.address}</p>
                    <p className="text-sm text-dark-500 mt-1">{mockProject.location}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card>
              <CardHeader title="Client" />
              <CardBody>
                <p className="text-lg font-medium text-white">{mockProject.client.name}</p>
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-dark-300">
                    Contact: {mockProject.client.contact}
                  </p>
                  <p className="text-sm text-dark-300">{mockProject.client.email}</p>
                  <p className="text-sm text-dark-300">{mockProject.client.phone}</p>
                </div>
              </CardBody>
            </Card>

            {/* Project Manager */}
            <Card>
              <CardHeader title="Project Manager" />
              <CardBody>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 font-medium">
                      {mockProject.projectManager.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{mockProject.projectManager.name}</p>
                    <p className="text-sm text-dark-400">{mockProject.projectManager.email}</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Recent Documents */}
            <Card>
              <CardHeader
                title="Recent Documents"
                action={
                  <Link to={`/documents?project=${id}`} className="text-sm text-yellow-500 hover:text-yellow-400">
                    View All
                  </Link>
                }
              />
              <CardBody className="space-y-3">
                {visibleRecentDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-dark-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-dark-400" />
                      <div>
                        <p className="text-sm text-dark-900">{doc.name}</p>
                        <p className="text-xs text-dark-500">{doc.size}</p>
                      </div>
                    </div>
                    <button className="p-1 text-dark-400 hover:text-yellow-500">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <Card>
          <CardHeader
            title="Project Phases"
            action={
              <Link to={`/projects/${id}/timeline`}>
                <Button variant="outline" size="sm">
                  View Timeline
                </Button>
              </Link>
            }
          />
          <CardBody>
            <div className="space-y-4">
              {projectPhases.map((phase, index) => (
                <div
                  key={phase.id}
                  className="p-4 bg-dark-800 rounded-lg border border-dark-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        phase.status === 'completed' 
                          ? 'bg-green-500/10 text-green-400' 
                          : phase.status === 'in_progress'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-dark-700 text-dark-400'
                      }`}>
                        {phase.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{phase.name}</p>
                        <p className="text-xs text-dark-500">
                          {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={phase.status} />
                  </div>
                  <div className="flex items-center gap-3">
                    <ProgressBar
                      value={phase.progress}
                      variant={phase.status === 'completed' ? 'success' : 'gold'}
                      size="sm"
                      className="flex-1"
                    />
                    <span className="text-sm text-dark-400 w-10">{phase.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'documents' && (
        <Card>
          <CardHeader
            title="Project Documents"
            action={
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Upload Document
              </Button>
            }
          />
          <CardBody>
            <p className="text-dark-400 text-center py-8">
              Document management interface will be rendered here.
            </p>
          </CardBody>
        </Card>
      )}

      {activeTab === 'reports' && (
        <Card>
          <CardHeader
            title="Site Reports"
            action={
              <Link to={`/site-reports/create?project=${id}`}>
                <Button leftIcon={<Plus className="h-4 w-4" />}>
                  New Report
                </Button>
              </Link>
            }
          />
          <CardBody>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 bg-dark-800 rounded-lg border border-dark-700 hover:border-dark-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{report.title}</p>
                      <p className="text-sm text-dark-500 mt-1">
                        By {report.author} • {formatDate(report.date)}
                      </p>
                    </div>
                    <MoreVertical className="h-4 w-4 text-dark-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'team' && (
        <Card>
          <CardHeader
            title="Project Team"
            action={
              canEdit(MODULES.PROJECTS) && (
                <Button variant="outline" leftIcon={<Plus className="h-4 w-4" />}>
                  Add Member
                </Button>
              )
            }
          />
          {isFinancialRole && mockProject.engineerInCharge && (
            <CardBody className="border-b border-dark-700">
              <p className="text-sm text-dark-400 mb-2">Engineer In-Charge</p>
              <p className="text-base text-white font-semibold">{mockProject.engineerInCharge.name}</p>
              <p className="text-sm text-dark-500">{mockProject.engineerInCharge.email}</p>
            </CardBody>
          )}
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 bg-dark-800 rounded-lg border border-dark-700 flex items-center gap-4"
                >
                  <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 font-medium">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-sm text-dark-400">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}

export default ProjectDetailsPage

