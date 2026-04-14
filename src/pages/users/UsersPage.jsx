import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Eye,
  Edit,
  Trash2,
  Mail,
  Shield,
  UserCheck,
  UserX,
  MoreVertical,
} from 'lucide-react'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import { Badge } from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import { FormInput, FormSelect } from '../../components/forms/FormFields'
import { formatDate } from '../../utils/formatters'
import { ROLE_LABELS } from '../../config/permissions'

// Mock users data
const mockUsers = [
  {
    id: 'user_001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@westwoodpms.com',
    role: 'admin',
    department: 'Management',
    status: 'active',
    lastLogin: '2025-01-16T08:30:00',
    createdAt: '2024-01-15',
    assignedProjects: 3,
  },
  {
    id: 'user_002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@westwoodpms.com',
    role: 'project_engineer',
    department: 'Engineering',
    status: 'active',
    lastLogin: '2025-01-16T09:15:00',
    createdAt: '2024-03-20',
    assignedProjects: 2,
  },
  {
    id: 'user_003',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@westwoodpms.com',
    role: 'project_engineer',
    department: 'Engineering',
    status: 'active',
    lastLogin: '2025-01-15T16:45:00',
    createdAt: '2024-04-10',
    assignedProjects: 2,
  },
  {
    id: 'user_004',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@westwoodpms.com',
    role: 'operations_staff',
    department: 'Operations',
    status: 'active',
    lastLogin: '2025-01-16T07:00:00',
    createdAt: '2024-05-05',
    assignedProjects: 4,
  },
  {
    id: 'user_005',
    firstName: 'Alex',
    lastName: 'Chen',
    email: 'alex.chen@westwoodpms.com',
    role: 'operations_staff',
    department: 'Quality',
    status: 'active',
    lastLogin: '2025-01-14T14:30:00',
    createdAt: '2024-06-15',
    assignedProjects: 2,
  },
  {
    id: 'user_006',
    firstName: 'Robert',
    lastName: 'Lee',
    email: 'robert.lee@westwoodpms.com',
    role: 'viewer',
    department: 'Finance',
    status: 'active',
    lastLogin: '2025-01-13T10:00:00',
    createdAt: '2024-07-20',
    assignedProjects: 5,
  },
  {
    id: 'user_007',
    firstName: 'Patricia',
    lastName: 'Garcia',
    email: 'patricia.garcia@westwoodpms.com',
    role: 'viewer',
    department: 'Stakeholder',
    status: 'inactive',
    lastLogin: '2024-12-15T09:00:00',
    createdAt: '2024-08-10',
    assignedProjects: 1,
  },
]

const roleColors = {
  admin: 'bg-red-500/10 text-red-400',
  project_engineer: 'bg-blue-500/10 text-blue-400',
  operations_staff: 'bg-green-500/10 text-green-400',
  viewer: 'bg-purple-500/10 text-purple-400',
}

const roleOptions = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }))
const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

/**
 * Users Management Page Component (Admin Only)
 */
function UsersPage() {
  const navigate = useNavigate()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Filter users
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = !roleFilter || user.role === roleFilter
    const matchesStatus = !statusFilter || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  // Summary stats
  const activeUsers = mockUsers.filter(u => u.status === 'active').length
  const adminCount = mockUsers.filter(u => u.role === 'admin').length
  const engineerCount = mockUsers.filter(u => u.role === 'project_engineer').length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-dark-400 mt-1">
            Manage system users and their access roles
          </p>
        </div>
        <Button 
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add User
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <UserCheck className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Total Users</p>
                <p className="text-2xl font-bold text-white">{mockUsers.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <UserCheck className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Active</p>
                <p className="text-2xl font-bold text-white">{activeUsers}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Shield className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Admins</p>
                <p className="text-2xl font-bold text-white">{adminCount}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Engineers</p>
                <p className="text-2xl font-bold text-white">{engineerCount}</p>
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
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="w-full md:w-48">
              <FormSelect
                options={roleOptions}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                placeholder="All Roles"
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
          </div>
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800 border-b border-dark-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-400">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-400">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-400">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-dark-400">
                  Last Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-dark-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-dark-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-dark-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-yellow-500/10 rounded-full flex items-center justify-center">
                          <span className="text-yellow-500 font-medium">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-dark-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${roleColors[user.role]}`}>
                        {ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-dark-300">
                      {user.department}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.status === 'active' ? (
                          <>
                            <span className="h-2 w-2 bg-green-500 rounded-full" />
                            <span className="text-green-400 text-sm">Active</span>
                          </>
                        ) : (
                          <>
                            <span className="h-2 w-2 bg-dark-500 rounded-full" />
                            <span className="text-dark-400 text-sm">Inactive</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-dark-400">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/users/${user.id}`)}
                          className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/users/${user.id}/edit`)}
                          className="p-2 text-dark-400 hover:text-yellow-500 hover:bg-dark-700 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 text-dark-400 hover:text-error hover:bg-dark-700 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
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
        <p className="text-sm text-dark-400">
          Showing {filteredUsers.length} of {mockUsers.length} users
        </p>
        {/* Pagination controls removed for cleaner UI */}
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add New User"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="First Name"
              placeholder="John"
              required
            />
            <FormInput
              label="Last Name"
              placeholder="Doe"
              required
            />
          </div>
          <FormInput
            label="Email"
            type="email"
            placeholder="john.doe@company.com"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Role"
              options={roleOptions}
              placeholder="Select role"
              required
            />
            <FormInput
              label="Department"
              placeholder="Engineering"
            />
          </div>
          <FormInput
            label="Temporary Password"
            type="password"
            placeholder="Min. 8 characters"
            required
          />
          <p className="text-sm text-dark-400">
            User will be prompted to change password on first login.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Create User
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UsersPage

