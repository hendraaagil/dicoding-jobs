import type { Job } from '@prisma/client'
import type { JobSchema } from '@/schemas/job'
import type { JobList, JobQuery } from '@/types/job'

import axios from 'axios'

/**
 * Create a new job from API
 */
export const createJob = async (job: JobSchema): Promise<Job> => {
  // Fake delay
  await new Promise((r) => setTimeout(r, 500))

  const response = await axios.post<Job>('/api/jobs', job)
  return response.data
}

/**
 * Update an existing job from API
 */
export const updateJob = async (job: JobSchema, slug: string): Promise<Job> => {
  // Fake delay
  await new Promise((r) => setTimeout(r, 500))

  const response = await axios.put<Job>('/api/jobs/' + slug, job)
  return response.data
}

/**
 * Delete an existing job from API
 */
export const deleteJob = async (slug: string): Promise<void> => {
  // Fake delay
  await new Promise((r) => setTimeout(r, 500))
  await axios.delete<Job>('/api/jobs/' + slug)
}

/**
 * Get list of jobs from API
 */
export const getJobs = async (query?: JobQuery): Promise<JobList> => {
  // Fake delay
  await new Promise((r) => setTimeout(r, 500))

  const response = await axios.get<JobList>('/api/jobs', { params: query })
  return response.data
}
