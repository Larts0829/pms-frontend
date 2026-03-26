import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  Grid,
  List,
  Download,
  Eye,
  Trash2,
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  FolderOpen,
  Upload,
  MoreVertical,
} from 'lucide-react'
import { usePermissions } from '../../hooks/usePermissions'
import { useAuth } from '../../hooks/useAuth'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import { FormInput, FormSelect } from '../../components/forms/FormFields'
import { formatDate } from '../../utils/formatters'

// Mock documents data
const mockDocuments = [
  {
    id: 'doc_001',
    name: 'Structural Design Rev3.pdf',
    type: 'pdf',
    category: 'design',
    size: '2.4 MB',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    uploadedBy: { name: 'Alex Chen' },
    uploadedAt: '2025-01-14',
    version: 3,
  },
  {
    id: 'doc_002',
    name: 'MEP Layout Plans.dwg',
    type: 'dwg',
    category: 'design',
    size: '15.8 MB',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    uploadedBy: { name: 'Mike Johnson' },
    uploadedAt: '2025-01-13',
    version: 1,
  },
  {
    id: 'doc_003',
    name: 'Budget Report Q1.xlsx',
    type: 'xlsx',
    category: 'financial',
    size: '580 KB',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    uploadedBy: { name: 'John Doe' },
    uploadedAt: '2025-01-10',
    version: 2,
  },
  {
    id: 'doc_004',
    name: 'Site Photos - Week 3.zip',
    type: 'zip',
    category: 'photos',
    size: '45.2 MB',
    project: { id: 'prj_002', name: 'Metro Square Commercial' },
    uploadedBy: { name: 'Sarah Wilson' },
    uploadedAt: '2025-01-15',
    version: 1,
  },
  {
    id: 'doc_005',
    name: 'Building Permit.pdf',
    type: 'pdf',
    category: 'permits',
    size: '1.2 MB',
    project: { id: 'prj_003', name: 'Greenfield Residences' },
    uploadedBy: { name: 'John Doe' },
    uploadedAt: '2025-01-12',
    version: 1,
  },
  {
    id: 'doc_006',
    name: 'Floor Plan - Level 1-5.pdf',
    type: 'pdf',
    category: 'design',
    size: '8.5 MB',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    uploadedBy: { name: 'Alex Chen' },
    uploadedAt: '2025-01-08',
    version: 1,
  },
  {
    id: 'doc_007',
    name: 'Contract - Main Contractor.pdf',
    type: 'pdf',
    category: 'contracts',
    size: '3.1 MB',
    project: { id: 'prj_002', name: 'Metro Square Commercial' },
    uploadedBy: { name: 'John Doe' },
    uploadedAt: '2025-01-05',
    version: 1,
  },
  {
    id: 'doc_008',
    name: 'Material Specifications.docx',
    type: 'docx',
    category: 'specifications',
    size: '890 KB',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    uploadedBy: { name: 'Mike Johnson' },
    uploadedAt: '2025-01-03',
    version: 2,
  },
]

const categories = {
  design: { label: 'Design', color: 'bg-blue-100 text-blue-700' },
  financial: { label: 'Financial', color: 'bg-green-100 text-green-700' },
  permits: { label: 'Permits', color: 'bg-purple-100 text-purple-700' },
  contracts: { label: 'Contracts', color: 'bg-yellow-100 text-yellow-700' },
  photos: { label: 'Photos', color: 'bg-pink-100 text-pink-700' },
  specifications: { label: 'Specifications', color: 'bg-orange-100 text-orange-700' },
}

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-8 w-8 text-red-500" />
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="h-8 w-8 text-green-500" />
    case 'jpg':
    case 'png':
    case 'jpeg':
      return <FileImage className="h-8 w-8 text-blue-500" />
    default:
      return <File className="h-8 w-8 text-dark-400" />
  }
}

const categoryOptions = Object.entries(categories).map(([value, { label }]) => ({ value, label }))

/**
 * Documents List Page Component
 */
function DocumentsListPage() {
  const [searchParams] = useSearchParams()
  const projectFilter = searchParams.get('project') || ''
  
  const { user } = useAuth()
  const { canCreate, canDelete, hasRole, MODULES, ROLES } = usePermissions()

  const isFinancialRole = hasRole([ROLES.ADMIN, ROLES.OPERATIONS_STAFF])
  const isClientViewer = hasRole(ROLES.VIEWER)
  const assignedProjectIds = user?.assignedProjectIds?.length
    ? user.assignedProjectIds
    : ['prj_001']
  
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'grid'
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  const accessibleDocuments = mockDocuments.filter((doc) => {
    if (isClientViewer && !assignedProjectIds.includes(doc.project.id)) {
      return false
    }
    if (!isFinancialRole && doc.category === 'financial') {
      return false
    }
    return true
  })

  // Filter documents
  const filteredDocuments = accessibleDocuments.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryFilter || doc.category === categoryFilter
    const matchesProject = !projectFilter || doc.project.id === projectFilter
    return matchesSearch && matchesCategory && matchesProject
  })

  // Group by category for sidebar count
  const categoryCount = accessibleDocuments.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1
    return acc
  }, {})

  const visibleCategories = Object.entries(categories).filter(([key]) => {
    if (!isFinancialRole && key === 'financial') return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Documents</h1>
          <p className="text-dark-600 mt-1">
            Manage project files, drawings, and documents
          </p>
        </div>
        {canCreate(MODULES.DOCUMENTS) && (
          <Button 
            leftIcon={<Upload className="h-4 w-4" />}
            onClick={() => setIsUploadModalOpen(true)}
          >
            Upload Document
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader title="Categories" />
            <CardBody className="p-0">
              <button
                onClick={() => setCategoryFilter('')}
                className={`w-full px-4 py-3 flex items-center justify-between hover:bg-dark-50 ${
                  !categoryFilter ? 'bg-yellow-50 border-l-2 border-yellow-500' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-4 w-4 text-dark-600" />
                  <span className="text-dark-700">All Documents</span>
                </div>
                <span className="text-dark-500 text-sm">{accessibleDocuments.length}</span>
              </button>
              {visibleCategories.map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-dark-50 ${
                    categoryFilter === key ? 'bg-yellow-50 border-l-2 border-yellow-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-4 w-4 text-dark-600" />
                    <span className="text-dark-700">{label}</span>
                  </div>
                  <span className="text-dark-500 text-sm">{categoryCount[key] || 0}</span>
                </button>
              ))}
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Filters & View Toggle */}
          <Card>
            <CardBody className="py-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <FormInput
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    leftIcon={<Search className="h-4 w-4" />}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-yellow-500/10 text-yellow-500' 
                        : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-yellow-500/10 text-yellow-500' 
                        : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Documents */}
          {filteredDocuments.length === 0 ? (
            <Card>
              <CardBody className="py-12 text-center">
                <p className="text-dark-500">No documents found</p>
              </CardBody>
            </Card>
          ) : viewMode === 'list' ? (
            // List View
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-dark-50 border-b border-dark-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                        Project
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                        Size
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">
                        Uploaded
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-dark-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-200">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-dark-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {getFileIcon(doc.type)}
                            <div>
                              <p className="text-sm font-medium text-dark-900">{doc.name}</p>
                              <p className="text-xs text-dark-500">v{doc.version}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Link 
                            to={`/projects/${doc.project.id}`}
                            className="text-sm text-dark-700 hover:text-yellow-500"
                          >
                            {doc.project.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${categories[doc.category]?.color}`}>
                            {categories[doc.category]?.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-dark-600">
                          {doc.size}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-dark-700">{formatDate(doc.uploadedAt)}</p>
                            <p className="text-xs text-dark-500">{doc.uploadedBy.name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-dark-600 hover:text-dark-900 hover:bg-dark-100 rounded-lg">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-dark-600 hover:text-blue-500 hover:bg-dark-100 rounded-lg">
                              <Download className="h-4 w-4" />
                            </button>
                            {canDelete(MODULES.DOCUMENTS) && (
                              <button className="p-2 text-dark-600 hover:text-error hover:bg-dark-100 rounded-lg">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:border-yellow-300 transition-colors">
                  <CardBody>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-dark-50 border border-dark-200 rounded-lg">
                        {getFileIcon(doc.type)}
                      </div>
                      <button className="p-1 text-dark-600 hover:text-dark-900">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    <h4 className="font-medium text-dark-900 mb-1 truncate" title={doc.name}>
                      {doc.name}
                    </h4>
                    <p className="text-sm text-dark-600 mb-3">{doc.project.name}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${categories[doc.category]?.color}`}>
                        {categories[doc.category]?.label}
                      </span>
                      <span className="text-xs text-dark-500">{doc.size}</span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-dark-600">
              Showing {filteredDocuments.length} of {accessibleDocuments.length} documents
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
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Document"
        size="lg"
      >
        <div className="space-y-4">
          <div className="border-2 border-dashed border-dark-300 rounded-lg p-8 text-center hover:border-yellow-500 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-dark-500 mx-auto mb-4" />
            <p className="text-dark-700 mb-2">Drag and drop files here, or click to browse</p>
            <p className="text-sm text-dark-500">Supports PDF, DOC, XLS, DWG, Images (Max 50MB)</p>
          </div>
          
          <FormSelect
            label="Project"
            options={[
              { value: 'prj_001', label: 'Westwood Tower Phase 1' },
              { value: 'prj_002', label: 'Metro Square Commercial' },
              { value: 'prj_003', label: 'Greenfield Residences' },
            ]}
            placeholder="Select project"
            required
          />
          
          <FormSelect
            label="Category"
            options={categoryOptions}
            placeholder="Select category"
            required
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button leftIcon={<Upload className="h-4 w-4" />}>
              Upload
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DocumentsListPage

