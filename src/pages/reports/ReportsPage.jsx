import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Download, 
  Calendar,
  BarChart3,
  TrendingUp,
  DollarSign,
  ClipboardCheck,
  Users,
  Building2,
  Loader2,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'
import ScheduleReportModal from './ScheduleReportModal'
import { FormInput, FormSelect } from '../../components/forms/FormFields'
import { usePermissions } from '../../hooks/usePermissions'
import { useAuth } from '../../hooks/useAuth'

// Mock report templates
const reportTemplates = [
  {
    id: 'project_summary',
    name: 'Project Summary Report',
    description: 'Overview of all projects with status, progress, and financial summary',
    icon: Building2,
    category: 'project',
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'progress_report',
    name: 'Progress Report',
    description: 'Detailed progress updates for selected project or all projects',
    icon: TrendingUp,
    category: 'project',
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'financial_report',
    name: 'Financial Report',
    description: 'Budget vs. actual spending, cost breakdown, and projections',
    icon: DollarSign,
    category: 'financial',
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'safety_report',
    name: 'Safety Compliance Report',
    description: 'Safety incidents, inspections, and compliance status',
    icon: ClipboardCheck,
    category: 'safety',
    formats: ['PDF'],
  },
  {
    id: 'resource_report',
    name: 'Resource Utilization Report',
    description: 'Workforce allocation and equipment usage across projects',
    icon: Users,
    category: 'resource',
    formats: ['PDF', 'Excel'],
  },
  {
    id: 'executive_dashboard',
    name: 'Executive Dashboard',
    description: 'High-level KPIs and portfolio overview for stakeholders',
    icon: BarChart3,
    category: 'executive',
    formats: ['PDF', 'PowerPoint'],
  },
]

// Mock generated reports
const recentReports = [
  {
    id: 'rpt_001',
    name: 'Project Summary - January 2025',
    type: 'Project Summary Report',
    generatedAt: '2025-01-16T10:30:00',
    generatedBy: 'John Doe',
    format: 'PDF',
    size: '2.4 MB',
  },
  {
    id: 'rpt_002',
    name: 'Financial Report Q4 2024',
    type: 'Financial Report',
    generatedAt: '2025-01-15T14:20:00',
    generatedBy: 'Jane Smith',
    format: 'Excel',
    size: '1.8 MB',
  },
  {
    id: 'rpt_003',
    name: 'Weekly Progress - Week 3',
    type: 'Progress Report',
    generatedAt: '2025-01-14T09:00:00',
    generatedBy: 'Mike Johnson',
    format: 'PDF',
    size: '3.2 MB',
  },
]

const projectOptions = [
  { value: '', label: 'All Projects' },
  { value: 'prj_001', label: 'Westwood Tower Phase 1' },
  { value: 'prj_002', label: 'Metro Square Commercial' },
  { value: 'prj_003', label: 'Greenfield Residences' },
]

const categoryColors = {
  project: 'bg-blue-500/10 text-blue-400',
  financial: 'bg-green-500/10 text-green-400',
  safety: 'bg-yellow-500/10 text-yellow-400',
  resource: 'bg-purple-500/10 text-purple-400',
  executive: 'bg-yellow-500/10 text-yellow-500',
}

/**
 * Reports Page Component
 */
function ReportsPage() {
  const { user } = useAuth();
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const { hasRole, ROLES } = usePermissions()
  const [selectedReport, setSelectedReport] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [filters, setFilters] = useState({
    project: '',
    startDate: '',
    endDate: '',
    format: 'PDF',
  })

  const isFinancialRole = hasRole([ROLES.ADMIN, ROLES.OPERATIONS_STAFF])
  const isClientViewer = hasRole(ROLES.VIEWER)
  // Allow Operations Staff to generate reports, just like Engineer and Admin
  const canGenerateReports = !isClientViewer || hasRole(ROLES.OPERATIONS_STAFF)

  const visibleTemplates = reportTemplates.filter((template) => {
    if (!isFinancialRole && template.category === 'financial') return false
    return true
  })

  const visibleRecentReports = recentReports.filter((report) => {
    if (!isFinancialRole && report.type === 'Financial Report') return false
    return true
  })


  // Engineer: only see their assigned project
  let scopedProjectOptions = Array.isArray(projectOptions) ? projectOptions : [];
  let engineerProject = null;
  const isEngineer = hasRole(ROLES.PROJECT_ENGINEER);
  if (isEngineer && user?.assignedProjectIds && user.assignedProjectIds.length === 1) {
    engineerProject = scopedProjectOptions.find(opt => opt.value === user.assignedProjectIds[0]);
    scopedProjectOptions = engineerProject ? [engineerProject] : [];
  } else if (isClientViewer) {
    scopedProjectOptions = (Array.isArray(projectOptions) && projectOptions.length > 1) ? [projectOptions[1]] : [];
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleGenerateReport = async () => {
    if (!selectedReport) return
    
    setIsGenerating(true)
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsGenerating(false)
    
    // Reset selection
    setSelectedReport(null)
    alert('Report generated successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Reports</h1>
          <p className="text-dark-600 mt-1">
            Fit-out reporting for progress, site deliverables, and client visibility
          </p>
        </div>
        {/* Upload Document button removed as requested */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Report Templates" />
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleTemplates.map((template) => {
                  const Icon = template.icon
                  const isSelected = selectedReport?.id === template.id
                  
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedReport(template)}
                      className={`p-4 text-left rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-dark-200 hover:border-yellow-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${categoryColors[template.category]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-dark-900 mb-1">{template.name}</h4>
                          <p className="text-sm text-dark-600 mb-2">{template.description}</p>
                          <div className="flex gap-2">
                            {template.formats.map((format) => (
                              <span
                                key={format}
                                className="px-2 py-0.5 bg-yellow-50 rounded text-xs text-yellow-700"
                              >
                                {format}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardBody>
          </Card>

          {/* Recent Reports */}
          <Card>
            <CardHeader
              title="Recent Reports"
              action={
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              }
            />
            <CardBody>
              <div className="space-y-3">
                {visibleRecentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-dark-50 border border-dark-200 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white border border-dark-200 rounded-lg">
                        <FileText className="h-5 w-5 text-dark-600" />
                      </div>
                      <div>
                        <p className="font-medium text-dark-900">{report.name}</p>
                        <div className="flex items-center gap-3 mt-1 text-sm text-dark-600">
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{formatDate(report.generatedAt)}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download className="h-4 w-4" />}
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Report Generator */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Generate Report" />
            <CardBody className="space-y-4">
              {!canGenerateReports ? (
                <div className="rounded-lg border border-dark-200 bg-dark-50 p-4 text-sm text-dark-700">
                  Client / Viewer accounts can view and download approved reports for their project only.
                </div>
              ) : selectedReport ? (
                <>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700 font-medium mb-1">Selected Report</p>
                    <p className="text-dark-900">{selectedReport.name}</p>
                  </div>

                  {/* Engineer sees only their project as plain text, no dropdown */}
                  {isEngineer && engineerProject ? (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-dark-700 mb-1">Project</label>
                      <div className="px-3 py-2 bg-dark-50 border border-dark-200 rounded-lg text-dark-900">
                        {engineerProject.label}
                      </div>
                    </div>
                  ) : (
                    <FormSelect
                      label="Project"
                      options={scopedProjectOptions}
                      value={filters.project}
                      onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                    />
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="Start Date"
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    />
                    <FormInput
                      label="End Date"
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    />
                  </div>

                  <FormSelect
                    label="Format"
                    options={selectedReport.formats.map(f => ({ value: f, label: f }))}
                    value={filters.format}
                    onChange={(e) => setFilters({ ...filters, format: e.target.value })}
                  />

                  <Button
                    className="w-full"
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                    leftIcon={isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Report'}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedReport(null)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-dark-400 mx-auto mb-4" />
                  <p className="text-dark-600">
                    Select a report template to get started
                  </p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader title="Report Statistics" />
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-dark-600">Reports This Month</span>
                  <span className="text-dark-900 font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-600">Total Downloads</span>
                  <span className="text-dark-900 font-medium">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-600">Most Generated</span>
                  <span className="text-dark-900 font-medium">Progress Report</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Schedule Reports */}
          <Card className="bg-dark-50">
            <CardBody>
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-dark-900">Schedule Reports</h4>
              </div>
              <p className="text-sm text-dark-600 mb-4">
                Automate report generation on a daily, weekly, or monthly basis.
              </p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setShowScheduleModal(true)}>
                Set Up Schedule
              </Button>
              {showScheduleModal && <ScheduleReportModal onClose={() => setShowScheduleModal(false)} />}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage

