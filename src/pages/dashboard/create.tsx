import type { Experience, JobType, Location, Position } from '@prisma/client'

import React from 'react'
import { NextSeo } from 'next-seo'
import { Flex, Heading, Text } from '@chakra-ui/react'

import {
  getExperiences,
  getJobTypes,
  getLocations,
  getPositions,
} from '@/libs/master'
import { Hero } from '@/components/layout'
import { JobForm } from '@/components/job'

export const getStaticProps = async () => {
  const [positions, jobTypes, locations, experiences] = await Promise.all([
    getPositions(),
    getJobTypes(),
    getLocations(),
    getExperiences(),
  ])

  return {
    props: { positions, jobTypes, locations, experiences },
  }
}

type PageProps = {
  positions: Position[]
  jobTypes: JobType[]
  locations: Location[]
  experiences: Experience[]
}

export default function Page({
  positions,
  jobTypes,
  locations,
  experiences,
}: PageProps) {
  return (
    <>
      <NextSeo title="Buat Lowongan" />
      <Flex as="main" pt={14} minH="100vh" direction="column">
        <Hero>
          <Heading as="h1" size="2xl">
            Buat lowongan pekerjaan
          </Heading>
          <Text maxW="lg" fontWeight="500">
            Dicoding Jobs menghubungkan industri dengan talenta yang tepat.
            Mencari tim baru tidak harus melelahkan dan boros biaya.
          </Text>
        </Hero>
        <JobForm
          choices={{ experiences, jobTypes, locations, positions }}
          mode="create"
        />
      </Flex>
    </>
  )
}
