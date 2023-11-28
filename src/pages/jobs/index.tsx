import type { GetServerSidePropsContext } from 'next'

import { useQuery } from '@tanstack/react-query'
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from '@chakra-ui/react'

import { getJobs } from '@/apis/job'
import { Container, Hero } from '@/components/layout'
import { JobCard } from '@/components/job'
import { Search } from 'lucide-react'

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  let page = context.query.page || null
  if (page && Array.isArray(page)) {
    page = page[0]
  }

  return {
    props: { page },
  }
}

export default function Page({ page }: { page: string | null }) {
  const query = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobs({ page: page ?? undefined }),
  })
  console.log(query.data)

  // TODO: Add skeleton loading

  return (
    <Flex as="main" pt={14} minH="100vh" direction="column">
      <Hero>
        <Heading as="h3" size="md">
          Dicoding Jobs
        </Heading>
        <Text
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
          fontWeight="500"
        >
          Temukan lowongan yang cocok untuk kamu
        </Text>
      </Hero>
      <Container spacing={6}>
        <Stack
          direction="row"
          w="full"
          justify="space-between"
          alignItems="center"
        >
          <Heading as="h3" size="lg">
            Daftar Pekerjaan Terbaru
          </Heading>
          <InputGroup maxW="sm">
            <InputLeftElement pointerEvents="none">
              <Search size={20} />
            </InputLeftElement>
            <Input
              type="text"
              name="search"
              placeholder="Pekerjaan apa yang sedang kamu cari?"
              rounded="md"
            />
          </InputGroup>
        </Stack>
        {query.data?.data.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}

        {/* TODO: Add pagination */}
      </Container>
    </Flex>
  )
}
