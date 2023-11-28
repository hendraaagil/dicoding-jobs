import prisma from './db'

export const getPositions = () =>
  prisma.position.findMany({ orderBy: { sequence: 'asc' } })

export const getJobTypes = () =>
  prisma.jobType.findMany({ orderBy: { sequence: 'asc' } })

export const getLocations = () =>
  prisma.location.findMany({ orderBy: { sequence: 'asc' } })

export const getExperiences = () =>
  prisma.experience.findMany({ orderBy: { sequence: 'asc' } })
