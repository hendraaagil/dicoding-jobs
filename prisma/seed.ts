import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()

const createMasterData = async () => {
  await prisma.position.createMany({
    data: [
      'Software Engineer',
      'Mobile Engineer',
      'Web Engineer',
      'Frontend Engineer',
      'Backend Engineer',
    ].map((name, index) => ({ name, sequence: index + 1 })),
    skipDuplicates: true,
  })

  await prisma.jobType.createMany({
    data: ['Full-Time', 'Part-Time', 'Kontrak', 'Intern'].map(
      (name, index) => ({ name, sequence: index + 1 }),
    ),
    skipDuplicates: true,
  })

  await prisma.location.createMany({
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

  await prisma.experience.createMany({
    data: [
      'Kurang dari 1 tahun',
      '1 - 3 tahun',
      '4 - 5 tahun',
      '6 - 10 tahun',
      'Lebih dari 10 tahun',
    ].map((name, index) => ({ name, sequence: index + 1 })),
    skipDuplicates: true,
  })
}

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[\W_]/g, '-') +
  '-' +
  crypto.randomBytes(4).toString('hex')

async function main() {
  await createMasterData()

  const [positions, jobTypes, locations, experiences] = await Promise.all([
    prisma.position.findMany({ orderBy: { sequence: 'asc' } }),
    prisma.jobType.findMany({ orderBy: { sequence: 'asc' } }),
    prisma.location.findMany({ orderBy: { sequence: 'asc' } }),
    prisma.experience.findMany({ orderBy: { sequence: 'asc' } }),
  ])

  const description =
    '<h3>Deskripsi Pekerjaan</h3><p>Sebagai [Posisi Lowongan], Anda akan berpartisipasi dalam proses pembangunan aplikasi yang sedang dibangun dalam perusahaan [Nama Perusahaan]. Anda juga diharapkan mampu bekerja dalam tim.</p><p></p><h3>Tanggung Jawab</h3><ul><li><p>Membuat atau memodifikasi program yang sudah ada.</p></li><li><p>Bertanggung jawab dalam mengelola program.</p></li></ul><p></p><h1>Tes H1</h1><h2>Tes H2</h2><h3>Tes H3</h3><p></p><p><strong>Ini tebal <em>dan miring <u>dan underline</u></em><u> tebal underline</u></strong></p><p><em>miring aja <u>sama garis bawah</u></em></p><p><u>ini garis bawah doang</u></p><p></p><ol><li><p>Tes 1</p></li><li><p>Tes 2</p><ol><li><p>Nested 1</p></li><li><p>Nested 2</p><ol><li><p>Nested lagi 1</p></li><li><p>Nested lagi 2</p></li></ol></li></ol></li></ol><p></p><ul><li><p>Test 1</p></li><li><p>Test 2</p><ul><li><p>Nested 1</p></li><li><p>Nested 2</p><ul><li><p>Nested lagi 1</p></li><li><p>Nested lagi 2</p></li></ul></li></ul></li></ul><p></p><p>Ini link ke webnya <a target="_blank" rel="noopener noreferrer nofollow" href="https://hendraaagil.dev/">Hendra Agil</a></p><p>Open graphnya kaya gini:</p><img src="https://hendraaagil.dev/og-image.png"><p></p><p><code>Ini kode yang kayanya bakal jarang dipake.</code></p><p></p><p>Udah itu aja.</p>'

  const jobs = [
    {
      title: 'Software Engineer',
      description,
      positionId: positions[0].id,
      jobTypeId: jobTypes[0].id,
      locationId: locations[0].id,
      experienceId: experiences[0].id,
    },
    {
      title: 'Mobile Engineer',
      description,
      positionId: positions[1].id,
      jobTypeId: jobTypes[1].id,
      locationId: locations[1].id,
      experienceId: experiences[1].id,
    },
    {
      title: 'Web Engineer',
      description,
      positionId: positions[2].id,
      jobTypeId: jobTypes[2].id,
      locationId: locations[2].id,
      experienceId: experiences[2].id,
    },
    {
      title: 'Frontend Engineer',
      description,
      positionId: positions[3].id,
      jobTypeId: jobTypes[3].id,
      locationId: locations[3].id,
      experienceId: experiences[3].id,
    },
    {
      title: 'Backend Engineer',
      description,
      positionId: positions[4].id,
      jobTypeId: jobTypes[1].id,
      locationId: locations[4].id,
      experienceId: experiences[4].id,
    },
    {
      title: 'Backend Engineer',
      description,
      positionId: positions[4].id,
      jobTypeId: jobTypes[1].id,
      locationId: locations[5].id,
      experienceId: experiences[4].id,
    },
    {
      title: 'Product Engineer',
      description,
      positionId: positions[0].id,
      jobTypeId: jobTypes[1].id,
      locationId: locations[1].id,
      experienceId: experiences[1].id,
    },
    {
      title: 'iOS Engineer',
      description,
      positionId: positions[1].id,
      jobTypeId: jobTypes[2].id,
      locationId: locations[2].id,
      experienceId: experiences[2].id,
    },
    {
      title: 'Web Engineer',
      description,
      positionId: positions[2].id,
      jobTypeId: jobTypes[3].id,
      locationId: locations[3].id,
      experienceId: experiences[3].id,
    },
    {
      title: 'Frontend Engineer',
      description,
      positionId: positions[3].id,
      jobTypeId: jobTypes[0].id,
      locationId: locations[4].id,
      experienceId: experiences[4].id,
    },
    {
      title: 'Product Engineer',
      description,
      positionId: positions[0].id,
      jobTypeId: jobTypes[1].id,
      locationId: locations[1].id,
      experienceId: experiences[1].id,
    },
    {
      title: 'iOS Engineer',
      description,
      positionId: positions[1].id,
      jobTypeId: jobTypes[2].id,
      locationId: locations[2].id,
      experienceId: experiences[2].id,
    },
    {
      title: 'Web Engineer',
      description,
      positionId: positions[2].id,
      jobTypeId: jobTypes[3].id,
      locationId: locations[3].id,
      experienceId: experiences[3].id,
    },
    {
      title: 'Frontend Engineer',
      description,
      positionId: positions[3].id,
      jobTypeId: jobTypes[0].id,
      locationId: locations[4].id,
      experienceId: experiences[4].id,
    },
  ].map((job, index) => ({
    ...job,
    slug: generateSlug(job.title),
    maxCandidates: 5,
    minSalary: 8000000,
    maxSalary: index % 2 === 0 ? 10000000 : null,
    isSalaryVisible: index % 2 === 0,
    isCanRemote: index % 2 === 0,
    expiresAt: new Date('2023-12-10').toISOString(),
  }))

  await prisma.job.createMany({
    data: jobs,
    skipDuplicates: true,
  })

  console.log('Done!')
}

/**
 * Initially, wanted to use this to seed the database before running tests.
 * Ref: https://playwright.dev/docs/test-global-setup-teardown
 * But, it can't be used because it's not possible to run this script in parallel.
 */
export const runSeeder = async () => {
  try {
    await main()
    await prisma.$disconnect()
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

runSeeder()
