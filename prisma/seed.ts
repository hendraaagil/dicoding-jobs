import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const positions = await prisma.position.createMany({
    data: [
      'Software Engineer',
      'Mobile Engineer',
      'Web Engineer',
      'Frontend Engineer',
      'Backend Engineer',
    ].map((name, index) => ({ name, sequence: index + 1 })),
    skipDuplicates: true,
  })

  const jobTypes = await prisma.jobType.createMany({
    data: ['Full-Time', 'Part-Time', 'Kontrak', 'Intern'].map(
      (name, index) => ({ name, sequence: index + 1 }),
    ),
    skipDuplicates: true,
  })

  const locations = await prisma.location.createMany({
    data: [
      'Jakarta',
      'Bandung',
      'Surabaya',
      'Yogyakarta',
      'Surakarta',
      'Bali',
    ].map((name, index) => ({ name, sequence: index + 1 })),
    skipDuplicates: true,
  })

  const experiences = await prisma.experience.createMany({
    data: [
      'Kurang dari 1 tahun',
      '1 - 3 tahun',
      '4 - 5 tahun',
      '6 - 10 tahun',
      'Lebih dari 10 tahun',
    ].map((name, index) => ({ name, sequence: index + 1 })),
    skipDuplicates: true,
  })

  console.log({ positions, jobTypes, locations, experiences })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
