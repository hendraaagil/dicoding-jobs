import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@chakra-ui/next-js'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

import { getJobs } from '@/apis/job'
import { Container } from '@/components/layout'
import {
  CardSkeletonDashboard,
  Empty,
  JobCardDashboard,
  Pagination,
} from '@/components/job'

export default function Page() {
  const router = useRouter()
  const page = router.query.page as string | undefined

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', page],
    queryFn: () => getJobs({ page: page ?? undefined }),
  })

  return (
    <Flex as="main" pt={14} minH="100vh">
      <Container spacing={8}>
        <Stack
          w="full"
          justify="space-between"
          direction={{ base: 'column', sm: 'row' }}
          alignItems={{ base: 'start', sm: 'center' }}
          spacing={{ base: 4, sm: 2 }}
        >
          <Heading as="h3" size="lg">
            Lowongan Saya
          </Heading>
          <Link
            href="/dashboard/create"
            display="flex"
            alignItems="center"
            justifyContent="center"
            columnGap={2}
            py={2}
            px={4}
            w={{ base: 'full', sm: 'auto' }}
            bg="navy.500"
            color="white"
            rounded="sm"
            _hover={{ textDecoration: 'none', bg: 'gray.600' }}
          >
            <Plus size={20} />
            <Text>Buat Lowongan</Text>
          </Link>
        </Stack>
        <Stack w="full" spacing={6}>
          {isLoading
            ? Array.from(Array(10).keys()).map((i) => (
                <CardSkeletonDashboard key={i} />
              ))
            : data?.data.map((job) => (
                <JobCardDashboard key={job.id} job={job} router={router} />
              ))}
          {data?.data.length === 0 && <Empty />}
          {data?.pagination && (
            <Pagination router={router} pagination={data?.pagination} />
          )}
        </Stack>
      </Container>
    </Flex>
  )
}
