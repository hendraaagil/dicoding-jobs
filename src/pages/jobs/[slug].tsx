import type { GetServerSidePropsContext } from 'next'
import type { JobDetail } from '@/types/job'

import htmr from 'htmr'
import { NextSeo } from 'next-seo'
import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { Building2, MapPin, Users } from 'lucide-react'

import { getJobBySlug } from '@/libs/job'
import { formatCurrency } from '@/libs/format'
import { Container } from '@/components/layout'
import { JobCoverImage } from '@/components/job'
import { Badge } from '@/components/ui'

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { slug } = context.query
  const job = await getJobBySlug(slug as string)

  return { props: { job } }
}

export default function Page({ job }: { job: JobDetail }) {
  let salaryText = `Gaji: ${formatCurrency(job.minSalary ?? 0)}`
  if (job.maxSalary) {
    salaryText += ` - ${formatCurrency(job.maxSalary)}`
  }

  return (
    <>
      <NextSeo title={job.title} />
      <Container as="main" pt={14} minH="100vh">
        <Stack
          as="section"
          direction="row"
          spacing={4}
          py={8}
          w="full"
          borderBottom="2px"
          borderBottomColor="gray.200"
        >
          <JobCoverImage />
          <Stack>
            <Heading as="h1" fontSize="2xl">
              {job.title}
            </Heading>
            <Text fontSize="sm">Sektor Bisnis: Technology</Text>
            {job.isSalaryVisible && (
              <Text fontSize="sm">{salaryText + ' per bulan'}</Text>
            )}
            <Stack spacing={4} direction="row">
              <Stack spacing={1} direction="row">
                <Building2 size={16} />
                <Text
                  as="a"
                  fontSize="xs"
                  href="https://www.dicoding.com/"
                  rel="noopener noreferrer"
                  _hover={{ cursor: 'pointer' }}
                >
                  Dicoding Indonesia
                </Text>
              </Stack>
              <Stack spacing={1} direction="row">
                <MapPin size={16} />
                <Text fontSize="xs" data-testid="job-location">
                  {job.location.name}
                </Text>
              </Stack>
              <Stack spacing={1} direction="row">
                <Users size={16} />
                <Text fontSize="xs">50-100 Karyawan</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          as="section"
          spacing={8}
          mx="auto"
          py={8}
          w="full"
          maxW="container.md"
        >
          <Stack spacing={4} direction="row">
            <Badge py={2} fontSize="sm" data-testid="job-type">
              {job.jobType.name}
            </Badge>
            {job.isCanRemote && (
              <Badge py={2} fontSize="sm">
                Bisa Remote
              </Badge>
            )}
          </Stack>
          <Box data-testid="job-description">{htmr(job.description)}</Box>
          <Stack>
            <Heading as="h4" size="md">
              Informasi Tambahan
            </Heading>
            <Stack direction="row" justifyContent="space-between" maxW="xl">
              <Stack>
                <Text fontWeight="700">Pengalaman bekerja</Text>
                <Text data-testid="job-experience">{job.experience.name}</Text>
              </Stack>
              <Stack>
                <Text fontWeight="700">Kandidat yang dibutuhkan</Text>
                <Text data-testid="job-candidate">{job.maxCandidates}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
