import type { Job } from '@prisma/client'
import type { JobSchema } from '@/schemas/job'
import type { JobList, JobQuery } from '@/types/job'

import axios from 'axios'

export const createJob = async (job: JobSchema): Promise<Job> => {
  const response = await axios.post<Job>('/api/jobs', job)
  return response.data
}

export const getJobs = async (query?: JobQuery): Promise<JobList> => {
  const response = await axios.get<JobList>('/api/jobs', { params: query })
  return response.data
}
