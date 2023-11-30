import type { GetServerSidePropsContext } from 'next'
import type { Experience, JobType, Location, Position } from '@prisma/client'
import type { JobDetail } from '@/types/job'

import { NextSeo } from 'next-seo'
import { Flex, Heading, Text } from '@chakra-ui/react'

import {
  getExperiences,
  getJobTypes,
  getLocations,
  getPositions,
} from '@/libs/master'
import { getJobBySlug } from '@/libs/job'
import { Hero } from '@/components/layout'
import { JobForm } from '@/components/job'

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { slug } = context.query
  const [positions, jobTypes, locations, experiences, job] = await Promise.all([
    getPositions(),
    getJobTypes(),
    getLocations(),
    getExperiences(),
    getJobBySlug(slug as string, true),
  ])

  return { props: { positions, jobTypes, locations, experiences, job } }
}

type PageProps = {
  positions: Position[]
  jobTypes: JobType[]
  locations: Location[]
  experiences: Experience[]
  job: JobDetail
}

export default function Page({
  positions,
  jobTypes,
  locations,
  experiences,
  job,
}: PageProps) {
  return (
    <>
      <NextSeo title="Edit Lowongan" />
      <Flex as="main" pt={14} minH="100vh" direction="column">
        <Hero>
          <Heading as="h1" size="2xl">
            Edit lowongan pekerjaan
          </Heading>
          <Text maxW="lg" fontWeight="500">
            Dicoding Jobs menghubungkan industri dengan talenta yang tepat.
            Mencari tim baru tidak harus melelahkan dan boros biaya.
          </Text>
        </Hero>
        <JobForm
          mode="edit"
          job={job}
          choices={{ experiences, jobTypes, locations, positions }}
        />
      </Flex>
    </>
  )
}
