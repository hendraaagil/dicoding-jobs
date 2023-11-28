import type { JobQuery } from '@/types/job'
import { Prisma } from '@prisma/client'
import prisma from '@/libs/db'

export const createJob = async (job: Prisma.JobCreateInput) =>
  await prisma.job.create({ data: job })

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
