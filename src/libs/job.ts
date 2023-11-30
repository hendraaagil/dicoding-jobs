import type { JobSchema } from '@/schemas/job'
import type { JobDetail, JobQuery } from '@/types/job'

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
 * Update an existing job to database
 */
export const updateJob = async (job: JobSchema, slug: string) => {
  return await prisma.job.update({ where: { slug }, data: job })
}

/**
 * Delete an existing job from database
 */
export const deleteJob = async (slug: string) => {
  return await prisma.job.delete({ where: { slug } })
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

/**
 * Get a job by slug from database
 */
export const getJobBySlug = async (slug: string, hasSalary?: boolean) => {
  const job = await prisma.job.findUnique({
    where: { slug },
    include: {
      experience: true,
      jobType: true,
      location: true,
      position: true,
    },
  })
  if (!job) return null

  const jobDetail: JobDetail = {
    ...job,
    expiresAt: job.expiresAt.toISOString(),
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  }
  if (!hasSalary && !jobDetail.isSalaryVisible) {
    delete jobDetail.minSalary
    delete jobDetail.maxSalary
  }

  return jobDetail
}
