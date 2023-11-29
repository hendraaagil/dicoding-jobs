import type { JobSchema } from '@/schemas/job'
import type { JobQuery } from '@/types/job'
import prisma from '@/libs/db'

/**
 * Create a new job to database
 */
export const createJob = async (job: JobSchema) =>
  await prisma.job.create({ data: job })

/**
 * Get list of jobs from database
 */
export const getJobs = async (query: JobQuery) => {
  const page = query.page || 1
  const skip = (Number(page) - 1) * 10

  return await Promise.all([
    prisma.job.count(),
    prisma.job.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        expiresAt: true,
        experience: { select: { name: true } },
        jobType: { select: { name: true } },
        location: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      // TODO: Enable pagination
      // skip: skip,
      // take: 10,
    }),
  ])
}
