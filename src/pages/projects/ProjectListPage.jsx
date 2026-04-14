import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
} from 'lucide-react'
import { usePermissions } from '../../hooks/usePermissions'
import { useAuth } from '../../hooks/useAuth'
import { Card, CardBody } from '../../components/common/Card'
import { StatusBadge } from '../../components/common/Badge'
import { ProgressBar } from '../../components/common/Progress'
import Button from '../../components/common/Button'
import { FormInput, FormSelect } from '../../components/forms/FormFields'
import { formatDate, formatCurrency } from '../../utils/formatters'
import { PROJECT_STATUS, PROJECT_STATUS_LABELS } from '../../utils/constants'

// Mock data
export const mockProjects = [
  {
    id: 'prj_001',
    name: 'Westwood Tower Phase 1',
    code: 'WT-P1',
    status: 'in_progress',
    progress: 75,
    client: { name: 'Westwood Holdings Inc.' },
    projectManager: { name: 'John Doe' },
    startDate: '2025-01-15',
    endDate: '2026-06-30',
    budget: 15000000,
    location: 'Metro Manila',
    type: 'commercial',
  },
  {
    id: 'prj_002',
    name: 'Metro Square Commercial',
    code: 'MSC-01',
    status: 'in_progress',
    progress: 45,
    client: { name: 'Metro Properties Corp.' },
    projectManager: { name: 'Jane Smith' },
    startDate: '2025-03-01',
    endDate: '2027-03-15',
    budget: 28000000,
    location: 'Makati City',
    type: 'commercial',
  },
  {
    id: 'prj_003',
    name: 'Greenfield Residences',
    code: 'GR-01',
    status: 'planning',
    progress: 10,
    client: { name: 'Green Development Ltd.' },
    projectManager: { name: 'Mike Johnson' },
    startDate: '2025-06-01',
    endDate: '2028-01-20',
    budget: 35000000,
    location: 'Quezon City',
    type: 'residential',
  },
  {
    id: 'prj_004',
    name: 'Harbor Bay Industrial',
    code: 'HBI-01',
    status: 'on_hold',
    progress: 62,
    client: { name: 'Harbor Industries Inc.' },
    projectManager: { name: 'Sarah Wilson' },
    startDate: '2024-08-01',
    endDate: '2026-09-30',
    budget: 12000000,
    location: 'Subic Bay',
    type: 'industrial',
  },
  {
    id: 'prj_005',
    name: 'Skyview Towers',
    code: 'SVT-01',
    status: 'completed',
    progress: 100,
    client: { name: 'Skyview Corp.' },
    projectManager: { name: 'John Doe' },
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    budget: 50000000,
    location: 'BGC Taguig',
    type: 'residential',
  },
]

/**
 * Project List Page Component
 */
function ProjectListPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { canCreate, canEdit, canDelete, hasRole, MODULES, ROLES } = usePermissions()

  const isFinancialRole = hasRole([ROLES.ADMIN, ROLES.OPERATIONS_STAFF])
  const isProjectEngineer = hasRole(ROLES.PROJECT_ENGINEER)
  const isClientViewer = hasRole(ROLES.VIEWER)
  
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // Filter and sort projects
  const assignedProjectIds = user?.assignedProjectIds?.length
    ? user.assignedProjectIds
    : ['prj_001']

  const allowedProjectIds = isFinancialRole
    ? null
    : isProjectEngineer
      ? [assignedProjectIds[0]] // enforce 1 project assignment for engineer in UI
      : assignedProjectIds

  const roleScopedProjects = allowedProjectIds
    ? mockProjects.filter((project) => allowedProjectIds.includes(project.id))
    : mockProjects


  const filteredProjects = roleScopedProjects
    .filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = !statusFilter || project.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1
      }
      return aVal < bVal ? 1 : -1
    })

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  const statusOptions = Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => ({
    value,
    label,
  }))

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Projects</h1>
          <p className="text-dark-600 mt-1">
            Manage and monitor all construction projects
          </p>
        </div>
        {canCreate(MODULES.PROJECTS) && (
          <Link to="/projects/create">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              New Project
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormInput
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="w-full md:w-48">
              <FormSelect
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                placeholder="All Status"
              />
            </div>
            {/* More Filters button removed for clean UI */}
          </div>
        </CardBody>
      </Card>

      {/* Projects Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-50 border-b border-dark-200">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700 cursor-pointer hover:text-dark-900"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Project
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                  Progress
                </th>
                {isFinancialRole && (
                  <th 
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700 cursor-pointer hover:text-dark-900"
                    onClick={() => toggleSort('budget')}
                  >
                    <div className="flex items-center gap-2">
                      Budget
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                )}
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                  Deadline
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-dark-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-200">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={isFinancialRole ? 7 : 6} className="px-6 py-12 text-center text-dark-600">
                    No projects found
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-dark-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <Link 
                          to={`/projects/${project.id}`}
                          className="text-sm font-medium text-dark-900 hover:text-yellow-700"
                        >
                          {project.name}
                        </Link>
                        <p className="text-xs text-dark-600">{project.code}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-dark-700">{project.client.name}</p>
                        <p className="text-xs text-dark-600">{project.location}</p>
                      </div>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/projects/${project.id}`)}
                          className="p-2 text-dark-600 hover:text-dark-900 hover:bg-dark-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {canEdit(MODULES.PROJECTS) && (
                          <button
                            onClick={() => navigate(`/projects/${project.id}/edit`)}
                            className="p-2 text-dark-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        )}
                        {canDelete(MODULES.PROJECTS) && (
                          <button
                            className="p-2 text-dark-600 hover:text-error hover:bg-dark-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-dark-600">
          Showing {filteredProjects.length} of {roleScopedProjects.length} projects
        </p>
        {/* Pagination controls removed for cleaner UI */}
      </div>
    </div>
  )
}

export default ProjectListPage

