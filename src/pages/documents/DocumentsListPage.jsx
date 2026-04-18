
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  FolderOpen,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Eye,
  Download,
  Trash2,
  MoreVertical,
  List,
  Grid,
  Search
} from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { FormInput, FormSelect } from '../../components/forms/FormFields';
import { formatDate } from '../../utils/formatters';

// Dummy/mock data for demonstration (replace with real data/fetch in production)
const mockDocuments = [
  {
    id: 'doc_001',
    name: 'Blueprint.pdf',
    type: 'pdf',
    category: 'design',
    size: '2.1 MB',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    uploadedBy: { name: 'Jane Smith' },
    uploadedAt: '2025-01-01',
    version: 1,
  },
  {
    id: 'doc_002',
    name: 'Budget.xlsx',
    type: 'xlsx',
    category: 'financial',
    size: '890 KB',
    project: { id: 'prj_001', name: 'Westwood Tower Phase 1' },
    uploadedBy: { name: 'Mike Johnson' },
    uploadedAt: '2025-01-03',
    version: 2,
  },
];

const categories = {
  design: { label: 'Design', color: 'bg-blue-100 text-blue-700' },
  financial: { label: 'Financial', color: 'bg-green-100 text-green-700' },
  permits: { label: 'Permits', color: 'bg-purple-100 text-purple-700' },
  contracts: { label: 'Contracts', color: 'bg-yellow-100 text-yellow-700' },
  photos: { label: 'Photos', color: 'bg-pink-100 text-pink-700' },
  specifications: { label: 'Specifications', color: 'bg-orange-100 text-orange-700' },
};

const getFileIcon = (type) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-8 w-8 text-red-500" />;
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
    case 'jpg':
    case 'png':
    case 'jpeg':
      return <FileImage className="h-8 w-8 text-blue-500" />;
    default:
      return <File className="h-8 w-8 text-dark-400" />;
  }
};

const categoryOptions = (categories && typeof categories === 'object') 
  ? Object.entries(categories).map(([value, { label }]) => ({ value, label }))
  : [];

function DocumentsListPage() {
  // Permissions and user context
  const { user } = useAuth();
  const { canCreate, canDelete, hasRole, MODULES, ROLES } = usePermissions();
  const isFinancialRole = hasRole([ROLES.ADMIN, ROLES.OPERATIONS_STAFF]);
  const isClientViewer = hasRole(ROLES.VIEWER);
  const assignedProjectIds = user?.assignedProjectIds?.length ? user.assignedProjectIds : ['prj_001'];

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Filtered documents
  const accessibleDocuments = mockDocuments.filter((doc) => {
    if (isClientViewer && !assignedProjectIds.includes(doc.project.id)) return false;
    if (!isFinancialRole && doc.category === 'financial') return false;
    return true;
  });
  const filteredDocuments = accessibleDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  const categoryCount = accessibleDocuments.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {});
  const visibleCategories = Object.entries(categories).filter(([key]) => {
    if (!isFinancialRole && key === 'financial') return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-900">Documents</h1>
          <p className="text-dark-600 mt-1">Manage project files, drawings, and documents</p>
        </div>
        {canCreate(MODULES.DOCUMENTS) && (
          <Button leftIcon={<Upload className="h-4 w-4" />} onClick={() => setIsUploadModalOpen(true)}>
            Upload Document
          </Button>
        )}
        <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload Document" size="lg">
          <UploadDocumentModalContent onClose={() => setIsUploadModalOpen(false)} />
        </Modal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader title="Categories" />
            <CardBody className="p-0">
              <button
                onClick={() => setCategoryFilter('')}
                className={`w-full px-4 py-3 flex items-center justify-between hover:bg-dark-50 ${!categoryFilter ? 'bg-yellow-50 border-l-2 border-yellow-500' : ''}`}
              >
                <span className="flex items-center gap-3">
                  <FolderOpen className="h-4 w-4 text-dark-600" />
                  <span className="text-dark-700">All Documents</span>
                </span>
                <span className="text-dark-500 text-sm">{accessibleDocuments.length}</span>
              </button>
              {visibleCategories.map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-dark-50 ${categoryFilter === key ? 'bg-yellow-50 border-l-2 border-yellow-500' : ''}`}
                >
                  <span className="flex items-center gap-3">
                    <FolderOpen className="h-4 w-4 text-dark-600" />
                    <span className="text-dark-700">{label}</span>
                  </span>
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
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-yellow-500/10 text-yellow-500' : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-yellow-500/10 text-yellow-500' : 'text-dark-600 hover:text-dark-900 hover:bg-dark-100'}`}
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
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">Project</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">Size</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-700">Uploaded</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-dark-700">Actions</th>
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
                          <span className="text-sm text-dark-700">{doc.project.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${categories[doc.category]?.color}`}>{categories[doc.category]?.label}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-dark-600">{doc.size}</td>
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
                      <div className="p-3 bg-dark-50 border border-dark-200 rounded-lg">{getFileIcon(doc.type)}</div>
                      <button className="p-1 text-dark-600 hover:text-dark-900">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                    <h4 className="font-medium text-dark-900 mb-1 truncate" title={doc.name}>{doc.name}</h4>
                    <p className="text-sm text-dark-600 mb-3">{doc.project.name}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${categories[doc.category]?.color}`}>{categories[doc.category]?.label}</span>
                      <span className="text-xs text-dark-500">{doc.size}</span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-dark-600">Showing {filteredDocuments.length} of {accessibleDocuments.length} documents</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Upload Modal Content

function UploadDocumentModalContent({ onClose }) {
  const [file, setFile] = useState(null);
  const [project, setProject] = useState('');
  const [category, setCategory] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  // Prevent modal close on dropdown click
  const stopPropagation = e => e.stopPropagation();

  const handleDrop = e => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };
  const handleDragOver = e => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = e => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleBrowse = () => inputRef.current && inputRef.current.click();

  return (
    <form
      className="space-y-7 px-8 py-8 sm:px-12 sm:py-10 bg-white rounded-3xl shadow-2xl border border-dark-100 max-w-lg mx-auto"
      style={{ minWidth: 340 }}
      onSubmit={e => { e.preventDefault(); /* handle upload */ onClose(); }}
    >
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer relative ${dragActive ? 'border-yellow-500 bg-yellow-50/40' : 'border-dark-200 hover:border-yellow-500 bg-dark-50/40'}`}
        onClick={handleBrowse}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        tabIndex={0}
        role="button"
        aria-label="File upload area"
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={e => setFile(e.target.files[0])}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,image/*"
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-14 w-14 text-yellow-500 mb-2 pointer-events-none" />
          <p className="text-dark-800 font-medium mb-1 pointer-events-none text-base">
            {file ? file.name : 'Drag and drop files here, or click to browse'}
          </p>
          <p className="text-xs text-dark-500 pointer-events-none">Supports PDF, DOC, XLS, DWG, Images (Max 50MB)</p>
        </div>
      </div>
      <div onClick={stopPropagation} className="space-y-2">
        <FormSelect
          label={<span>Project <span className="text-error">*</span></span>}
          options={[
            { value: 'prj_001', label: 'Westwood Tower Phase 1' },
            { value: 'prj_002', label: 'Metro Square Commercial' },
            { value: 'prj_003', label: 'Greenfield Residences' },
          ]}
          placeholder="Select project"
          value={project}
          onChange={e => setProject(e.target.value)}
          required
          className="shadow-none bg-white"
        />
      </div>
      <div onClick={stopPropagation} className="space-y-2">
        <FormSelect
          label={<span>Category <span className="text-error">*</span></span>}
          options={categoryOptions}
          placeholder="Select category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
          className="shadow-none bg-white"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
        <Button
          variant="outline"
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto px-6 py-2 rounded-lg border border-yellow-500 text-yellow-700 hover:bg-yellow-50 transition"
        >
          Cancel
        </Button>
        <Button
          leftIcon={<Upload className="h-4 w-4" />}
          type="submit"
          disabled={!file || !project || !category}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition disabled:opacity-60"
        >
          Upload
        </Button>
      </div>
    </form>
  );
}

export default DocumentsListPage;

