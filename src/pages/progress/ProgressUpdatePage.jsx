import { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Loader2, Camera, Upload, X } from 'lucide-react'
import { Card, CardHeader, CardBody } from '../../components/common/Card'
import { ProgressBar } from '../../components/common/Progress'
import Button from '../../components/common/Button'
import { FormInput, FormSelect, FormTextarea } from '../../components/forms/FormFields'

// Form validation schema
const progressSchema = z.object({
  projectId: z.string().min(1, 'Project is required'),
  phaseId: z.string().min(1, 'Phase is required'),
  reportDate: z.string().min(1, 'Report date is required'),
  currentProgress: z.number().min(0).max(100, 'Progress must be between 0-100'),
  status: z.string().min(1, 'Status is required'),
  workCompleted: z.string().min(10, 'Please describe work completed (min 10 characters)'),
  workPlanned: z.string().optional(),
  issues: z.string().optional(),
  weatherCondition: z.string().optional(),
  workersOnSite: z.number().min(0).optional(),
})

// Mock data
const mockProjects = [
  { value: 'prj_001', label: 'Westwood Tower Phase 1 (WT-P1)', phases: [
    { value: 'phase_1', label: 'Pre-Construction', progress: 100 },
    { value: 'phase_2', label: 'Foundation', progress: 100 },
    { value: 'phase_3', label: 'Structural Work', progress: 75 },
    { value: 'phase_4', label: 'MEP Installation', progress: 45 },
  ]},
  { value: 'prj_002', label: 'Metro Square Commercial (MSC-01)', phases: [
    { value: 'phase_1', label: 'Pre-Construction', progress: 100 },
    { value: 'phase_2', label: 'Foundation', progress: 45 },
  ]},
  { value: 'prj_003', label: 'Greenfield Residences (GR-01)', phases: [
    { value: 'phase_1', label: 'Pre-Construction', progress: 10 },
  ]},
]

const statusOptions = [
  { value: 'on_track', label: 'On Track' },
  { value: 'delayed', label: 'Delayed' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
]

const weatherOptions = [
  { value: 'sunny', label: 'Sunny' },
  { value: 'cloudy', label: 'Cloudy' },
  { value: 'rainy', label: 'Rainy' },
  { value: 'stormy', label: 'Stormy' },
]

/**
 * Progress Update Page Component
 */
function ProgressUpdatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const preselectedProject = searchParams.get('project')
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProject, setSelectedProject] = useState(preselectedProject || '')
  const [photos, setPhotos] = useState([])
  const [previousProgress, setPreviousProgress] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(progressSchema),
    defaultValues: {
      projectId: preselectedProject || '',
      phaseId: '',
      reportDate: new Date().toISOString().split('T')[0],
      currentProgress: 0,
      status: 'on_track',
      workCompleted: '',
      workPlanned: '',
      issues: '',
      weatherCondition: 'sunny',
      workersOnSite: 0,
    },
  })

  const currentProgress = watch('currentProgress')
  const phaseId = watch('phaseId')

  // Get phases for selected project
  const selectedProjectData = mockProjects.find(p => p.value === selectedProject)
  const phases = selectedProjectData?.phases || []

  // Update previous progress when phase changes
  const handlePhaseChange = (e) => {
    const phase = phases.find(p => p.value === e.target.value)
    if (phase) {
      setPreviousProgress(phase.progress)
      setValue('currentProgress', phase.progress)
    }
  }

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value)
    setValue('projectId', e.target.value)
    setValue('phaseId', '')
    setPreviousProgress(0)
  }

  // Handle photo upload
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files)
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      preview: URL.createObjectURL(file),
    }))
    setPhotos([...photos, ...newPhotos])
  }

  const removePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id))
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      console.log('Submitting progress:', { ...data, photos })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Navigate back to progress list
      navigate('/progress')
    } catch (error) {
      console.error('Error logging progress:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/progress"
          className="p-2 text-dark-400 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Log Progress Update</h1>
          <p className="text-dark-400 mt-1">
            Record the current progress for a project phase
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Selection */}
            <Card>
              <CardHeader title="Project & Phase" />
              <CardBody className="space-y-4">
                <FormSelect
                  label="Project"
                  options={mockProjects.map(p => ({ value: p.value, label: p.label }))}
                  placeholder="Select a project"
                  value={selectedProject}
                  onChange={handleProjectChange}
                  error={errors.projectId?.message}
                  required
                />
                <FormSelect
                  label="Phase"
                  options={phases.map(p => ({ value: p.value, label: p.label }))}
                  placeholder="Select a phase"
                  disabled={!selectedProject}
                  error={errors.phaseId?.message}
                  required
                  {...register('phaseId')}
                  onChange={(e) => {
                    register('phaseId').onChange(e)
                    handlePhaseChange(e)
                  }}
                />
                <FormInput
                  label="Report Date"
                  type="date"
                  error={errors.reportDate?.message}
                  required
                  {...register('reportDate')}
                />
              </CardBody>
            </Card>

            {/* Progress Update */}
            <Card>
              <CardHeader title="Progress Update" />
              <CardBody className="space-y-6">
                {/* Progress Slider */}
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">
                    Current Progress <span className="text-error">*</span>
                  </label>
                  <div className="bg-dark-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-dark-400">Previous: {previousProgress}%</span>
                      <span className="text-2xl font-bold text-yellow-500">{currentProgress}%</span>
                    </div>
                    <ProgressBar
                      value={currentProgress}
                      variant="gold"
                      size="lg"
                      className="mb-4"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                      {...register('currentProgress', { valueAsNumber: true })}
                    />
                    <div className="flex justify-between text-xs text-dark-500 mt-2">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  {currentProgress > previousProgress && (
                    <p className="text-sm text-green-400 mt-2">
                      +{currentProgress - previousProgress}% progress from last update
                    </p>
                  )}
                </div>

                <FormSelect
                  label="Status"
                  options={statusOptions}
                  error={errors.status?.message}
                  required
                  {...register('status')}
                />

                <FormTextarea
                  label="Work Completed"
                  placeholder="Describe the work completed since last update..."
                  rows={4}
                  error={errors.workCompleted?.message}
                  required
                  {...register('workCompleted')}
                />

                <FormTextarea
                  label="Work Planned (Next)"
                  placeholder="Describe planned work for the next period..."
                  rows={3}
                  {...register('workPlanned')}
                />

                <FormTextarea
                  label="Issues / Blockers"
                  placeholder="Report any issues, delays, or blockers..."
                  rows={3}
                  {...register('issues')}
                />
              </CardBody>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader title="Progress Photos" />
              <CardBody>
                <div className="flex flex-wrap gap-4 mb-4">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative w-24 h-24 border border-dark-700 rounded-lg overflow-hidden group"
                    >
                      <img
                        src={photo.preview}
                        alt={photo.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-1 right-1 p-1 bg-dark-900/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Upload Button */}
                  <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-dark-600 rounded-lg cursor-pointer hover:border-yellow-500 hover:bg-dark-800 transition-colors">
                    <Camera className="h-6 w-6 text-dark-400" />
                    <span className="text-xs text-dark-400 mt-1">Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-dark-500">
                  Upload photos to document progress. Max 10 photos, 5MB each.
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Site Conditions */}
            <Card>
              <CardHeader title="Site Conditions" />
              <CardBody className="space-y-4">
                <FormSelect
                  label="Weather"
                  options={weatherOptions}
                  {...register('weatherCondition')}
                />
                <FormInput
                  label="Workers on Site"
                  type="number"
                  min="0"
                  {...register('workersOnSite', { valueAsNumber: true })}
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
                  {isSubmitting ? 'Saving...' : 'Save Progress'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/progress')}
                >
                  Cancel
                </Button>
              </CardBody>
            </Card>

            {/* Tips */}
            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardBody>
                <h4 className="font-medium text-yellow-500 mb-2">Tips</h4>
                <ul className="text-sm text-dark-400 space-y-1.5">
                  <li>• Be specific about work completed</li>
                  <li>• Include measurements when possible</li>
                  <li>• Document any delays or issues</li>
                  <li>• Upload photos for reference</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProgressUpdatePage

