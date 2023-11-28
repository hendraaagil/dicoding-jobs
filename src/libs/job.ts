import { Prisma } from '@prisma/client'
import prisma from '@/libs/db'

export const createJob = async (job: Prisma.JobCreateInput) =>
  await prisma.job.create({ data: job })

export const getJobs = async () =>
  await prisma.job.findMany({
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
  })
