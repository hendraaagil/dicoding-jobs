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
import { CardSkeleton, JobCard, Pagination } from '@/components/job'

export default function Page() {
  const router = useRouter()
  const page = router.query.page as string | undefined

  const [search, setSearch] = useState<string>(
    (router.query.keyword as string) ?? '',
  )
  const debouncedSearch = useDebounce<string | undefined>(search || undefined)

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', debouncedSearch, page],
    queryFn: () =>
      getJobs({ page: page ?? undefined, keyword: debouncedSearch }),
  })

  useEffect(() => {
    if (
      debouncedSearch !== undefined &&
      debouncedSearch !== router.query.keyword
    ) {
      router.replace({ query: { keyword: debouncedSearch } }, undefined, {
        shallow: true,
      })
    }
  }, [debouncedSearch, router])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
              value={search}
              onChange={handleChange}
            />
          </InputGroup>
        </Stack>
        {isLoading
          ? Array.from(Array(10).keys()).map((i) => <CardSkeleton key={i} />)
          : data?.data.map((job) => <JobCard key={job.id} job={job} />)}

        {/* TODO: Add empty state */}

        {data?.pagination && (
          <Pagination router={router} pagination={data?.pagination} />
        )}
      </Container>
    </Flex>
  )
}
