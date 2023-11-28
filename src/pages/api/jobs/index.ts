import type { NextApiRequest, NextApiResponse } from 'next'
import { createJob, getJobs } from '@/libs/job'
import { jobSchema } from '@/schemas/job'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const validation = jobSchema.safeParse(req.body)
      if (!validation.success) {
        return res.status(400).json(validation.error.formErrors.fieldErrors)
      }

      const job = await createJob(req.body)
      return res.status(201).json(job)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Something went wrong!' })
    }
  } else if (req.method === 'GET') {
    try {
      const jobs = await getJobs()
      return res.status(200).json(jobs)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Something went wrong!' })
    }
  }

  res.status(404).json({ message: 'Not found!' })
}
