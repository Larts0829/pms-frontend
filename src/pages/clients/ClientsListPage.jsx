import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import clientService from '../../services/clientService'
import { 
  Plus, 
  Search, 
  Eye,
  Edit,
  Trash2,
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
} from 'lucide-react'
import { usePermissions } from '../../hooks/usePermissions'
import { Card, CardBody, CardHeader } from '../../components/common/Card'
import Button from '../../components/common/Button'
import { FormInput } from '../../components/forms/FormFields'

// Mock clients data
const mockClients = [
  {
    id: 'client_001',
    name: 'Westwood Holdings Inc.',
    type: 'corporation',
    contactPerson: 'Robert Chen',
    email: 'r.chen@westwoodholdings.com',
    phone: '+63 2 8888 1234',
    address: '123 Business Center, Makati City',
    activeProjects: 2,
    totalProjects: 5,
    totalValue: 85000000,
    status: 'active',
  },
  {
    id: 'client_002',
    name: 'Metro Properties Corp.',
    type: 'corporation',
    contactPerson: 'Maria Santos',
    email: 'm.santos@metroproperties.ph',
    phone: '+63 2 8765 4321',
    address: '456 Metro Tower, BGC Taguig',
    activeProjects: 1,
    totalProjects: 3,
    totalValue: 45000000,
    status: 'active',
  },
  {
    id: 'client_003',
    name: 'Green Development Ltd.',
    type: 'corporation',
    contactPerson: 'James Lee',
    email: 'james.lee@greendev.com',
    phone: '+63 2 8555 9876',
    address: '789 Green Tower, Quezon City',
    activeProjects: 1,
    totalProjects: 1,
    totalValue: 35000000,
    status: 'active',
  },
  {
    id: 'client_004',
    name: 'Harbor Industries Inc.',
    type: 'corporation',
    contactPerson: 'Patricia Reyes',
    email: 'p.reyes@harborindustries.com',
    phone: '+63 47 252 1234',
    address: '321 Industrial Zone, Subic Bay',
    activeProjects: 0,
    totalProjects: 2,
    totalValue: 24000000,
    status: 'inactive',
  },
  {
    id: 'client_005',
    name: 'Skyview Corporation',
    type: 'corporation',
    contactPerson: 'Michael Tan',
    email: 'm.tan@skyview.ph',
    phone: '+63 2 8333 4567',
    address: '555 Sky Avenue, BGC Taguig',
    activeProjects: 0,
    totalProjects: 1,
    totalValue: 50000000,
    status: 'active',
  },
]

/**
 * Clients List Page Component
 */
function ClientsListPage() {
  const navigate = useNavigate()
  const { canCreate, canEdit, canDelete, MODULES } = usePermissions()
  
  const [searchQuery, setSearchQuery] = useState('')

  // Filter clients
  const filteredClients = mockClients.filter(client => {
    return (
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Summary stats
  const activeClients = mockClients.filter(c => c.status === 'active').length
  const totalActiveProjects = mockClients.reduce((acc, c) => acc + c.activeProjects, 0)
  const totalValue = mockClients.reduce((acc, c) => acc + c.totalValue, 0)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Delete/archive client handler
  async function handleDelete(clientId) {
    if (window.confirm('Are you sure you want to delete/archive this client?')) {
      // Simulate API call
      try {
        await clientService.delete(clientId)
        window.location.reload() // Or optimistically remove from state
      } catch (err) {
        alert('Failed to delete client.')
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-dark-400 mt-1">
            Manage client information and relationships
          </p>
        </div>
        {canCreate(MODULES.CLIENTS) && (
          <Link to="/clients/create">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Add Client
            </Button>
          </Link>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Building2 className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Active Clients</p>
                <p className="text-2xl font-bold text-white">{activeClients}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Active Projects</p>
                <p className="text-2xl font-bold text-white">{totalActiveProjects}</p>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Building2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Total Portfolio Value</p>
                <p className="text-xl font-bold text-white">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardBody className="py-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <FormInput
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <p className="text-dark-500">No clients found</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:border-dark-600 transition-colors">
              <CardBody>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                      <span className="text-yellow-500 font-bold text-lg">
                        {client.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-white hover:text-yellow-500 cursor-pointer"
                        onClick={e => { e.stopPropagation(); navigate(`/clients/${client.id}`) }}
                        tabIndex={0}
                        role="button"
                        onKeyDown={e => { if (e.key === 'Enter') { e.stopPropagation(); navigate(`/clients/${client.id}`) } }}
                      >
                        {client.name}
                      </span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                        client.status === 'active' 
                          ? 'bg-green-500/10 text-green-400' 
                          : 'bg-dark-600 text-dark-400'
                      }`}>
                        {client.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-dark-400">
                    <User className="h-4 w-4" />
                    <span>{client.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-400">
                    <Mail className="h-4 w-4" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-400">
                    <Phone className="h-4 w-4" />
                    <span>{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-dark-400">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{client.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                  <div className="text-sm">
                    <span className="text-dark-400">Projects: </span>
                    <span className="text-white font-medium">{client.activeProjects}</span>
                    <span className="text-dark-500"> / {client.totalProjects}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={e => { e.stopPropagation(); console.log('View client', client.id); navigate(`/clients/${client.id}`) }}
                      className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg"
                      title="View"
                      type="button"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {canEdit(MODULES.CLIENTS) && (
                      <button
                        onClick={e => { e.stopPropagation(); console.log('Edit client', client.id); navigate(`/clients/${client.id}/edit`) }}
                        className="p-2 text-dark-400 hover:text-yellow-500 hover:bg-dark-700 rounded-lg"
                        title="Edit"
                        type="button"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    {canDelete(MODULES.CLIENTS) && (
                      <button
                        onClick={e => { e.stopPropagation(); console.log('Delete client', client.id); handleDelete(client.id) }}
                        className="p-2 text-dark-400 hover:text-error hover:bg-dark-700 rounded-lg"
                        title="Delete"
                        type="button"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-dark-400">
          Showing {filteredClients.length} of {mockClients.length} clients
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

export default ClientsListPage

