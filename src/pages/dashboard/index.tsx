import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@chakra-ui/next-js'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

import { getJobs } from '@/apis/job'
import { Container } from '@/components/layout'
import { CardSkeletonDashboard, JobCardDashboard } from '@/components/job'

export default function Page() {
  const router = useRouter()
  const page = router.query.page as string | undefined

  const { data, isLoading } = useQuery({
    queryKey: ['jobs', page],
    queryFn: () => getJobs({ page: page ?? undefined }),
  })
  console.log(data)

  // TODO: Add skeleton loading

  return (
    <Flex as="main" pt={14} minH="100vh">
      <Container spacing={8}>
        <Stack
          direction="row"
          w="full"
          justify="space-between"
          alignItems="center"
        >
          <Heading as="h3" size="lg">
            Lowongan Saya
          </Heading>
          <Link
            href="/dashboard/create"
            display="flex"
            alignItems="center"
            columnGap={2}
            py={2}
            px={4}
            bg="navy.500"
            color="white"
            rounded="sm"
            _hover={{ textDecoration: 'none', bg: 'gray.600' }}
          >
            <Plus size={20} />
            Buat Lowongan
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
        </Stack>

        {/* TODO: Add pagination */}
      </Container>
    </Flex>
  )
}
