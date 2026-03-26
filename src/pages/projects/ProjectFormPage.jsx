import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/common/Card'
import Button from '../../components/common/Button'
import { FormInput, FormSelect, FormTextarea } from '../../components/forms/FormFields'
import { PROJECT_TYPE_LABELS, PROJECT_STATUS_LABELS } from '../../utils/constants'

// Form validation schema
const projectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  code: z.string().min(2, 'Project code is required'),
  type: z.string().min(1, 'Project type is required'),
  status: z.string().min(1, 'Status is required'),
  description: z.string().optional(),
  clientId: z.string().min(1, 'Client is required'),
  projectManagerId: z.string().min(1, 'Project manager is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  budget: z.number().min(0, 'Budget must be positive'),
  location: z.string().min(1, 'Location is required'),
  address: z.string().min(1, 'Address is required'),
  floors: z.number().min(1, 'Number of floors is required').optional(),
  totalArea: z.number().min(0, 'Total area must be positive').optional(),
})

// Mock data for dropdowns
const mockClients = [
  { value: 'client_001', label: 'Westwood Holdings Inc.' },
  { value: 'client_002', label: 'Metro Properties Corp.' },
  { value: 'client_003', label: 'Green Development Ltd.' },
  { value: 'client_004', label: 'Harbor Industries Inc.' },
]

const mockManagers = [
  { value: 'user_001', label: 'John Doe' },
  { value: 'user_002', label: 'Jane Smith' },
  { value: 'user_003', label: 'Mike Johnson' },
]

const projectTypeOptions = Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}))

const statusOptions = Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}))

/**
 * Project Form Page (Create/Edit)
 */
function ProjectFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = Boolean(id)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      code: '',
      type: 'commercial',
      status: 'planning',
      description: '',
      clientId: '',
      projectManagerId: '',
      startDate: '',
      endDate: '',
      budget: 0,
      location: '',
      address: '',
      floors: 1,
      totalArea: 0,
    },
  })

  // Load project data in edit mode
  useEffect(() => {
    if (isEditMode) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        // Mock data for editing
        reset({
          name: 'Westwood Tower Phase 1',
          code: 'WT-P1',
          type: 'commercial',
          status: 'in_progress',
          description: 'A 25-story commercial building complex featuring modern office spaces.',
          clientId: 'client_001',
          projectManagerId: 'user_001',
          startDate: '2025-01-15',
          endDate: '2026-06-30',
          budget: 15000000,
          location: 'Metro Manila',
          address: '123 Business District, Makati City',
          floors: 25,
          totalArea: 45000,
        })
        setIsLoading(false)
      }, 500)
    }
  }, [isEditMode, id, reset])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      console.log('Submitting:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Navigate back to projects list
      navigate('/projects')
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/projects"
          className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEditMode ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-dark-400 mt-1">
            {isEditMode ? 'Update project information' : 'Fill in the details to create a new project'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader title="Basic Information" />
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Project Name"
                    placeholder="Enter project name"
                    error={errors.name?.message}
                    required
                    {...register('name')}
                  />
                  <FormInput
                    label="Project Code"
                    placeholder="e.g., WT-P1"
                    error={errors.code?.message}
                    required
                    {...register('code')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Project Type"
                    options={projectTypeOptions}
                    error={errors.type?.message}
                    required
                    {...register('type')}
                  />
                  <FormSelect
                    label="Status"
                    options={statusOptions}
                    error={errors.status?.message}
                    required
                    {...register('status')}
                  />
                </div>

                <FormTextarea
                  label="Description"
                  placeholder="Enter project description"
                  rows={4}
                  error={errors.description?.message}
                  {...register('description')}
                />
              </CardBody>
            </Card>

            {/* Schedule & Budget */}
            <Card>
              <CardHeader title="Schedule & Budget" />
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Start Date"
                    type="date"
                    error={errors.startDate?.message}
                    required
                    {...register('startDate')}
                  />
                  <FormInput
                    label="Target End Date"
                    type="date"
                    error={errors.endDate?.message}
                    required
                    {...register('endDate')}
                  />
                </div>

                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <FormInput
                      label="Total Budget (PHP)"
                      type="number"
                      placeholder="0"
                      error={errors.budget?.message}
                      required
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </CardBody>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader title="Location" />
              <CardBody className="space-y-4">
                <FormInput
                  label="Location"
                  placeholder="e.g., Metro Manila"
                  error={errors.location?.message}
                  required
                  {...register('location')}
                />
                <FormTextarea
                  label="Full Address"
                  placeholder="Enter complete address"
                  rows={2}
                  error={errors.address?.message}
                  required
                  {...register('address')}
                />
              </CardBody>
            </Card>

            {/* Building Details */}
            <Card>
              <CardHeader title="Building Details" />
              <CardBody className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="floors"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Number of Floors"
                        type="number"
                        placeholder="1"
                        error={errors.floors?.message}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                  <Controller
                    name="totalArea"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Total Area (sqm)"
                        type="number"
                        placeholder="0"
                        error={errors.totalArea?.message}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Assignment */}
            <Card>
              <CardHeader title="Assignment" />
              <CardBody className="space-y-4">
                <FormSelect
                  label="Client"
                  options={mockClients}
                  placeholder="Select a client"
                  error={errors.clientId?.message}
                  required
                  {...register('clientId')}
                />
                <FormSelect
                  label="Project Manager"
                  options={mockManagers}
                  placeholder="Select a manager"
                  error={errors.projectManagerId?.message}
                  required
                  {...register('projectManagerId')}
                />
              </CardBody>
            </Card>

            {/* Actions */}
            <Card>
              <CardBody className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  leftIcon={isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/projects')}
                >
                  Cancel
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProjectFormPage

