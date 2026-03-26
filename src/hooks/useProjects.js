import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { projectService, progressService, milestoneService } from '../services/projectService'

// Query keys
export const projectKeys = {
  all: ['projects'],
  list: (filters) => ['projects', 'list', filters],
  detail: (id) => ['projects', 'detail', id],
  team: (id) => ['projects', 'team', id],
  timeline: (id) => ['projects', 'timeline', id],
  documents: (id) => ['projects', 'documents', id],
  progress: (id) => ['projects', 'progress', id],
  milestones: (id) => ['projects', 'milestones', id],
  siteReports: (id) => ['projects', 'site-reports', id],
}

/**
 * Hook to fetch all projects
 * @param {Object} filters - Query filters
 * @returns {Object} Query result
 */
export function useProjects(filters = {}) {
  return useQuery({
    queryKey: projectKeys.list(filters),
    queryFn: async () => {
      const response = await projectService.getAll(filters)
      return response.data.data
    },
  })
}

/**
 * Hook to fetch a single project
 * @param {string} id - Project ID
 * @returns {Object} Query result
 */
export function useProject(id) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async () => {
      const response = await projectService.getById(id)
      return response.data.data
    },
    enabled: !!id,
  })
}

/**
 * Hook to fetch project team
 * @param {string} id - Project ID
 * @returns {Object} Query result
 */
export function useProjectTeam(id) {
  return useQuery({
    queryKey: projectKeys.team(id),
    queryFn: async () => {
      const response = await projectService.getTeam(id)
      return response.data.data
    },
    enabled: !!id,
  })
}

/**
 * Hook to fetch project timeline
 * @param {string} id - Project ID
 * @returns {Object} Query result
 */
export function useProjectTimeline(id) {
  return useQuery({
    queryKey: projectKeys.timeline(id),
    queryFn: async () => {
      const response = await projectService.getTimeline(id)
      return response.data.data
    },
    enabled: !!id,
  })
}

/**
 * Hook to fetch project progress
 * @param {string} id - Project ID
 * @returns {Object} Query result
 */
export function useProjectProgress(id) {
  return useQuery({
    queryKey: projectKeys.progress(id),
    queryFn: async () => {
      const response = await projectService.getProgress(id)
      return response.data.data
    },
    enabled: !!id,
  })
}

/**
 * Hook to fetch project milestones
 * @param {string} id - Project ID
 * @returns {Object} Query result
 */
export function useProjectMilestones(id) {
  return useQuery({
    queryKey: projectKeys.milestones(id),
    queryFn: async () => {
      const response = await projectService.getMilestones(id)
      return response.data.data
    },
    enabled: !!id,
  })
}

/**
 * Hook to create a project
 * @returns {Object} Mutation result
 */
export function useCreateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data) => projectService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      toast.success('Project created successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create project')
    },
  })
}

/**
 * Hook to update a project
 * @returns {Object} Mutation result
 */
export function useUpdateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => projectService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) })
      toast.success('Project updated successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update project')
    },
  })
}

/**
 * Hook to delete a project
 * @returns {Object} Mutation result
 */
export function useDeleteProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id) => projectService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
      toast.success('Project deleted successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete project')
    },
  })
}

/**
 * Hook to create progress update
 * @returns {Object} Mutation result
 */
export function useCreateProgressUpdate() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ projectId, data }) => progressService.create(projectId, data),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.progress(projectId) })
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) })
      toast.success('Progress updated successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update progress')
    },
  })
}

/**
 * Hook to create milestone
 * @returns {Object} Mutation result
 */
export function useCreateMilestone() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ projectId, data }) => milestoneService.create(projectId, data),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.milestones(projectId) })
      toast.success('Milestone created successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create milestone')
    },
  })
}

/**
 * Hook to update milestone
 * @returns {Object} Mutation result
 */
export function useUpdateMilestone() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }) => milestoneService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Milestone updated successfully')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update milestone')
    },
  })
}

