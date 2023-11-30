import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteJob, updateJob } from '@/libs/job'
import { jobSchema } from '@/schemas/job'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    try {
      const validation = jobSchema.safeParse(req.body)
      if (!validation.success) {
        return res.status(400).json(validation.error.formErrors.fieldErrors)
      }

      const { slug } = req.query
      const job = await updateJob(validation.data, slug as string)
      return res.status(202).json(job)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Something went wrong!' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const { slug } = req.query
      await deleteJob(slug as string)
      return res.status(200).json({ message: 'Lowongan berhasil dihapus!' })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Something went wrong!' })
    }
  }

  res.status(404).json({ message: 'Not found!' })
}
