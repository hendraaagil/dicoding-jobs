import type { JobSchema } from '@/schemas/job'
import type { JobQuery } from '@/types/job'

import { Prisma } from '@prisma/client'
import crypto from 'crypto'
import prisma from '@/libs/db'

/**
 * Create a new job to database
 */
export const createJob = async (job: JobSchema) => {
  const randomString = crypto.randomBytes(4).toString('hex')
  const slug =
    job.title.toLowerCase().replace(/[\W_]/g, '-') + '-' + randomString

  return await prisma.job.create({ data: { ...job, slug } })
}

/**
 * Get list of jobs from database
 */
export const getJobs = async (query: JobQuery) => {
  const page = query.page || 1
  const keyword = query.keyword || ''
  const skip = (Number(page) - 1) * 10

  const where: Prisma.JobCountArgs['where'] = {
    OR: [
      { title: { contains: keyword, mode: 'insensitive' } },
      {
        position: {
          name: { contains: keyword, mode: 'insensitive' },
        },
      },
    ],
  }

  return await Promise.all([
    prisma.job.count({ where }),
    prisma.job.findMany({
      where,
      select: {
        id: true,
        slug: true,
        title: true,
        createdAt: true,
        expiresAt: true,
        experience: { select: { name: true } },
        jobType: { select: { name: true } },
        location: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: skip,
      take: 10,
    }),
  ])
}
