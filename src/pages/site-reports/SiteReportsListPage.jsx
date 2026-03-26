import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  FileText,
  Download,
  AlertTriangle,
  Building2,
} from 'lucide-react'
import { usePermissions } from '../../hooks/usePermissions'
import { useAuth } from '../../hooks/useAuth'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import { Badge } from '../../components/common/Badge'
import Button from '../../components/common/Button'
import { FormInput, FormSelect } from '../../components/forms/FormFields'
import { formatDate } from '../../utils/formatters'

// Mock site reports data
const mockSiteReports = [
  {
    id: 'sr_001',
    title: 'Daily Progress Report',
    type: 'daily_progress',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    date: '2025-01-16',
    author: { name: 'Mike Johnson', role: 'Site Engineer' },
    status: 'submitted',
    summary: 'Completed concrete pouring for floors 18-20. Steel reinforcement started on floor 21. Weather conditions favorable.',
    hasIssues: false,
    attachments: 3,
  },
  {
    id: 'sr_002',
    title: 'Weekly Safety Inspection',
    type: 'safety',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    date: '2025-01-15',
    author: { name: 'Sarah Wilson', role: 'Safety Officer' },
    status: 'approved',
    summary: 'Routine weekly safety inspection completed. All safety equipment in working condition. Minor issues with scaffolding on floor 16.',
    hasIssues: true,
    attachments: 5,
  },
  {
    id: 'sr_003',
    title: 'Material Inspection Report',
    type: 'inspection',
    project: { id: 'prj_002', name: 'Metro Square Commercial' },
    date: '2025-01-15',
    author: { name: 'Alex Chen', role: 'Quality Inspector' },
    status: 'submitted',
    summary: 'Inspected delivery of reinforcement steel. All materials pass quality standards. Certificate of compliance received.',
    hasIssues: false,
    attachments: 2,
  },
  {
    id: 'sr_004',
    title: 'Incident Report - Equipment Malfunction',
    type: 'incident',
    project: { id: 'prj_004', name: 'Harbor Bay Industrial' },
    date: '2025-01-14',
    author: { name: 'John Doe', role: 'Project Manager' },
    status: 'under_review',
    summary: 'Crane hydraulic system malfunction during operation. No injuries reported. Equipment taken offline for repair.',
    hasIssues: true,
    attachments: 8,
  },
  {
    id: 'sr_005',
    title: 'Daily Progress Report',
    type: 'daily_progress',
    project: { id: 'prj_003', name: 'Greenfield Residences' },
    date: '2025-01-14',
    author: { name: 'Mike Johnson', role: 'Site Engineer' },
    status: 'draft',
    summary: 'Site clearing and soil testing in progress. Preliminary survey data compiled. Awaiting permit approval.',
    hasIssues: false,
    attachments: 0,
  },
]

const reportTypes = {
  daily_progress: { label: 'Daily Progress', color: 'bg-blue-100 text-blue-700' },
  safety: { label: 'Safety', color: 'bg-green-100 text-green-700' },
  inspection: { label: 'Inspection', color: 'bg-purple-100 text-purple-700' },
  incident: { label: 'Incident', color: 'bg-red-100 text-red-700' },
  quality: { label: 'Quality', color: 'bg-yellow-100 text-yellow-700' },
}

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-dark-100 text-dark-700' },
  submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700' },
  under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700' },
}

const typeOptions = Object.entries(reportTypes).map(([value, { label }]) => ({ value, label }))
const statusOptions = Object.entries(statusConfig).map(([value, { label }]) => ({ value, label }))

/**
 * Site Reports List Page Component
 */
function SiteReportsListPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { canCreate, canEdit, canDelete, hasRole, MODULES, ROLES } = usePermissions()

  const isClientViewer = hasRole(ROLES.VIEWER)
  const assignedProjectIds = user?.assignedProjectIds?.length
    ? user.assignedProjectIds
    : ['prj_001']
  
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const accessibleReports = mockSiteReports.filter((report) => {
    if (isClientViewer && !assignedProjectIds.includes(report.project.id)) {
      return false
    }
    return true
  })

  // Filter reports
  const filteredReports = accessibleReports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !typeFilter || report.type === typeFilter
    const matchesStatus = !statusFilter || report.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Site Reports</h1>
          <p className="text-dark-600 mt-1">
            Manage daily progress, safety, and inspection reports
          </p>
        </div>
        {canCreate(MODULES.SITE_REPORTS) && (
          <Link to="/site-reports/create">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              New Report
            </Button>
          </Link>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(reportTypes).slice(0, 4).map(([type, config]) => (
          <Card key={type}>
            <CardBody className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-dark-400">{config.label}</p>
                  <p className="text-2xl font-bold text-dark-900 mt-1">
                    {accessibleReports.filter(r => r.type === type).length}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <FileText className="h-5 w-5" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardBody className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <FormInput
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="w-full md:w-40">
              <FormSelect
                options={typeOptions}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                placeholder="All Types"
              />
            </div>
            <div className="w-full md:w-40">
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

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <Card>
            <CardBody className="py-12 text-center">
              <p className="text-dark-500">No reports found</p>
            </CardBody>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="hover:border-yellow-300 transition-colors">
              <CardBody>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link 
                        to={`/site-reports/${report.id}`}
                        className="text-lg font-medium text-dark-900 hover:text-yellow-500"
                      >
                        {report.title}
                      </Link>
                      {report.hasIssues && (
                        <span className="flex items-center gap-1 text-yellow-400 text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          Issues Reported
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-dark-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <Link 
                          to={`/projects/${report.project.id}`}
                          className="hover:text-yellow-500"
                        >
                          {report.project.name}
                        </Link>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(report.date)}
                      </div>
                      <span>•</span>
                      <span>{report.author.name} ({report.author.role})</span>
                    </div>

                    <p className="text-dark-700 line-clamp-2">{report.summary}</p>

                    <div className="flex items-center gap-2 mt-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${reportTypes[report.type]?.color}`}>
                        {reportTypes[report.type]?.label}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[report.status]?.color}`}>
                        {statusConfig[report.status]?.label}
                      </span>
                      {report.attachments > 0 && (
                        <span className="text-xs text-dark-500">
                          {report.attachments} attachment{report.attachments > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/site-reports/${report.id}`)}
                      className="p-2 text-dark-600 hover:text-dark-900 hover:bg-dark-100 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {canEdit(MODULES.SITE_REPORTS) && report.status === 'draft' && (
                      <button
                        onClick={() => navigate(`/site-reports/${report.id}/edit`)}
                        className="p-2 text-dark-600 hover:text-yellow-500 hover:bg-dark-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      className="p-2 text-dark-600 hover:text-blue-500 hover:bg-dark-100 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    {canDelete(MODULES.SITE_REPORTS) && report.status === 'draft' && (
                      <button
                        className="p-2 text-dark-600 hover:text-error hover:bg-dark-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
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
          Showing {filteredReports.length} of {accessibleReports.length} reports
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

export default SiteReportsListPage

