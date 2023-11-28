import { Prisma } from '@prisma/client'
import prisma from '@/libs/db'

export const createJob = async (job: Prisma.JobCreateInput) =>
  await prisma.job.create({ data: job })

export const getJobs = async () =>
  await prisma.job.findMany({ orderBy: { createdAt: 'desc' } })
