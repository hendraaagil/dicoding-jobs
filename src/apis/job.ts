import type { Job } from '@prisma/client'
import type { JobSchema } from '@/schemas/job'
import type { JobList, JobQuery } from '@/types/job'

import axios from 'axios'

/**
 * Create a new job from API
 */
export const createJob = async (job: JobSchema): Promise<Job> => {
  // Fake delay
  // await new Promise((r) => setTimeout(r, 1500))

  const response = await axios.post<Job>('/api/jobs', job)
  return response.data
}

/**
 * Get list of jobs from API
 */
export const getJobs = async (query?: JobQuery): Promise<JobList> => {
  // Fake delay
  // await new Promise((r) => setTimeout(r, 1500))

  const response = await axios.get<JobList>('/api/jobs', { params: query })
  return response.data
}
