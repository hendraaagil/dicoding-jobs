import type { Job, Prisma } from '@prisma/client'

export const createJob = async (job: Prisma.JobCreateInput): Promise<Job> => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(job),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await response.json()
}

export const getJobs = async (): Promise<Job[]> => {
  const response = await fetch('/api/jobs')
  return await response.json()
}
