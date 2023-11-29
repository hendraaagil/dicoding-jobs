import type { GetServerSidePropsContext } from 'next'

import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
import { Search } from 'lucide-react'

import { useDebounce } from '@/hooks/use-debounce'
import { getJobs } from '@/apis/job'
import { Container, Hero } from '@/components/layout'
import { CardSkeleton, Empty, JobCard, Pagination } from '@/components/job'

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { keyword } = context.query

  return { props: { keyword: keyword ?? null } }
}

export default function Page({ keyword }: { keyword?: string }) {
  const router = useRouter()
  const page = router.query.page as string | undefined

  const [isSearchChanged, setIsSearchChanged] = useState(false)
  const [search, setSearch] = useState<string>((keyword as string) ?? '')
  const debouncedSearch = useDebounce<string>(search)

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', debouncedSearch, page],
    queryFn: () =>
      getJobs({ page: page ?? undefined, keyword: debouncedSearch }),
  })

  useEffect(() => {
    if (isSearchChanged && debouncedSearch !== router.query.keyword) {
      router.replace({ query: { keyword: debouncedSearch } }, undefined, {
        shallow: true,
      })
    }
  }, [debouncedSearch, isSearchChanged, router])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSearchChanged(true)
    setSearch(event.target.value)
  }

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
      <Container as="section" spacing={6}>
        <Stack
          w="full"
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'start', md: 'center' }}
          spacing={{ base: 4, md: 2 }}
        >
          <Heading as="h3" size="lg">
            Daftar Pekerjaan Terbaru
          </Heading>
          <InputGroup maxW={{ base: 'full', md: 'sm' }}>
            <InputLeftElement pointerEvents="none">
              <Search size={20} />
            </InputLeftElement>
            <Input
              type="search"
              name="search"
              placeholder="Pekerjaan apa yang sedang kamu cari?"
              fontSize="sm"
              rounded="md"
              value={search}
              onChange={handleChange}
            />
          </InputGroup>
        </Stack>
        {isLoading
          ? Array.from(Array(10).keys()).map((i) => <CardSkeleton key={i} />)
          : data?.data.map((job) => <JobCard key={job.id} job={job} />)}
        {data?.data.length === 0 && <Empty keyword={debouncedSearch} />}
        {data?.pagination && (
          <Pagination router={router} pagination={data?.pagination} />
        )}
      </Container>
    </Flex>
  )
}
