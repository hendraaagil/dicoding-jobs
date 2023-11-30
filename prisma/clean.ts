import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.job.deleteMany()
  await Promise.all([
    prisma.position.deleteMany(),
    prisma.jobType.deleteMany(),
    prisma.location.deleteMany(),
    prisma.experience.deleteMany(),
  ])

  console.log('Done!')
}

/**
 * Initially, wanted to use this to clean the database after running tests.
 * Ref: https://playwright.dev/docs/test-global-setup-teardown
 * But, it can't be used because it's not possible to run this script in parallel.
 */
export const cleanData = async () => {
  try {
    await main()
    await prisma.$disconnect()
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

cleanData()
