import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Calendar,
  Eye,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardBody } from '../../components/common/Card'
import { StatusBadge } from '../../components/common/Badge'
import { ProgressBar } from '../../components/common/Progress'
import Button from '../../components/common/Button'
import { FormInput, FormSelect } from '../../components/forms/FormFields'
import { formatDate } from '../../utils/formatters'
import { usePermissions } from '../../hooks/usePermissions'
import { useAuth } from '../../hooks/useAuth'

// Mock progress data
const mockProgressEntries = [
  {
    id: 'prog_001',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1', code: 'WT-P1' },
    phase: 'Structural Work',
    reportDate: '2025-01-16',
    previousProgress: 70,
    currentProgress: 75,
    status: 'on_track',
    reportedBy: { name: 'Mike Johnson' },
    workCompleted: 'Completed concrete pouring for floors 18-20. Steel reinforcement on floor 21.',
  },
  {
    id: 'prog_002',
    project: { id: 'prj_002', name: 'Metro Square Commercial', code: 'MSC-01' },
    phase: 'Foundation',
    reportDate: '2025-01-16',
    previousProgress: 40,
    currentProgress: 45,
    status: 'on_track',
    reportedBy: { name: 'Sarah Wilson' },
    workCompleted: 'Foundation piling work 80% complete. Starting on pile heads.',
  },
  {
    id: 'prog_003',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1', code: 'WT-P1' },
    phase: 'MEP Installation',
    reportDate: '2025-01-15',
    previousProgress: 42,
    currentProgress: 45,
    status: 'delayed',
    reportedBy: { name: 'Alex Chen' },
    workCompleted: 'Electrical conduit installation on floors 10-15. HVAC ductwork delayed due to material shortage.',
  },
  {
    id: 'prog_004',
    project: { id: 'prj_003', name: 'Greenfield Residences', code: 'GR-01' },
    phase: 'Pre-Construction',
    reportDate: '2025-01-15',
    previousProgress: 8,
    currentProgress: 10,
    status: 'on_track',
    reportedBy: { name: 'John Doe' },
    workCompleted: 'Site survey completed. Soil testing in progress. Permits under review.',
  },
  {
    id: 'prog_005',
    project: { id: 'prj_004', name: 'Harbor Bay Industrial', code: 'HBI-01' },
    phase: 'Structural Work',
    reportDate: '2025-01-14',
    previousProgress: 62,
    currentProgress: 62,
    status: 'on_hold',
    reportedBy: { name: 'Mike Johnson' },
    workCompleted: 'Work paused pending permit renewal and additional funding.',
  },
]

const statusIcons = {
  on_track: <TrendingUp className="h-4 w-4 text-green-400" />,
  delayed: <AlertTriangle className="h-4 w-4 text-yellow-400" />,
  on_hold: <Clock className="h-4 w-4 text-orange-400" />,
  completed: <CheckCircle className="h-4 w-4 text-blue-400" />,
}

const statusLabels = {
  on_track: 'On Track',
  delayed: 'Delayed',
  on_hold: 'On Hold',
  completed: 'Completed',
}

const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({
  value,
  label,
}))

/**
 * Progress List Page Component
 */
function ProgressListPage() {
  const { user } = useAuth()
  const { canCreate, hasRole, MODULES, ROLES } = usePermissions()

  const isClientViewer = hasRole(ROLES.VIEWER)
  const assignedProjectIds = user?.assignedProjectIds?.length
    ? user.assignedProjectIds
    : ['prj_001']
  
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const accessibleEntries = mockProgressEntries.filter((entry) => {
    if (isClientViewer && !assignedProjectIds.includes(entry.project.id)) {
      return false
    }
    return true
  })

  // Filter progress entries
  const filteredEntries = accessibleEntries.filter(entry => {
    const matchesSearch = 
      entry.project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.phase.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || entry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Progress Updates</h1>
          <p className="text-dark-600 mt-1">
            Track and monitor project progress across all phases
          </p>
        </div>
        {canCreate(MODULES.PROGRESS) && (
          <Link to="/progress/update">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Log Progress
            </Button>
          </Link>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-500/10 border-green-500/20">
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-sm text-green-300">On Track</p>
                <p className="text-xl font-bold text-dark-900">
                  {accessibleEntries.filter(e => e.status === 'on_track').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-sm text-yellow-300">Delayed</p>
                <p className="text-xl font-bold text-dark-900">
                  {accessibleEntries.filter(e => e.status === 'delayed').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-orange-500/10 border-orange-500/20">
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-sm text-orange-300">On Hold</p>
                <p className="text-xl font-bold text-dark-900">
                  {accessibleEntries.filter(e => e.status === 'on_hold').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-blue-300">Completed</p>
                <p className="text-xl font-bold text-dark-900">
                  {accessibleEntries.filter(e => e.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormInput
                placeholder="Search by project or phase..."
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
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              More Filters
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Progress Entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardBody className="py-12 text-center">
              <p className="text-dark-500">No progress updates found</p>
            </CardBody>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="hover:border-yellow-300 transition-colors">
              <CardBody>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link 
                        to={`/projects/${entry.project.id}`}
                        className="text-lg font-medium text-dark-900 hover:text-yellow-500"
                      >
                        {entry.project.name}
                      </Link>
                      <span className="text-dark-500">•</span>
                      <span className="text-dark-600">{entry.phase}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-dark-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(entry.reportDate)}
                      </div>
                      <span>by {entry.reportedBy.name}</span>
                    </div>

                    <p className="text-dark-700 mb-4">{entry.workCompleted}</p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <ProgressBar
                          value={entry.currentProgress}
                          variant={entry.status === 'on_track' ? 'success' : entry.status === 'delayed' ? 'warning' : 'gold'}
                          size="md"
                        />
                      </div>
                      <div className="text-right min-w-[100px]">
                        <span className="text-lg font-bold text-dark-900">{entry.currentProgress}%</span>
                        {entry.currentProgress > entry.previousProgress && (
                          <span className="text-sm text-green-400 ml-2">
                            +{entry.currentProgress - entry.previousProgress}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className={`px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                      entry.status === 'on_track' ? 'bg-green-500/10 text-green-400' :
                      entry.status === 'delayed' ? 'bg-yellow-500/10 text-yellow-400' :
                      entry.status === 'on_hold' ? 'bg-orange-500/10 text-orange-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {statusIcons[entry.status]}
                      <span className="text-sm font-medium">{statusLabels[entry.status]}</span>
                    </div>
                    <Link to={`/progress/${entry.id}`}>
                      <Button variant="ghost" size="sm" leftIcon={<Eye className="h-4 w-4" />}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-dark-600">
          Showing {filteredEntries.length} of {accessibleEntries.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProgressListPage

