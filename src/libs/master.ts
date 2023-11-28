import prisma from '@/libs/db'

export const getPositions = async () =>
  await prisma.position.findMany({ orderBy: { sequence: 'asc' } })

export const getJobTypes = async () =>
  await prisma.jobType.findMany({ orderBy: { sequence: 'asc' } })

export const getLocations = async () =>
  await prisma.location.findMany({ orderBy: { sequence: 'asc' } })

export const getExperiences = async () =>
  await prisma.experience.findMany({ orderBy: { sequence: 'asc' } })
