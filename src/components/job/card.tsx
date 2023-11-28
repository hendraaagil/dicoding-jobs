import type { JobItem } from '@/types/job'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { Box, BoxProps, Button, Stack, Text } from '@chakra-ui/react'
import {
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Pencil,
  Trash2,
  Upload,
} from 'lucide-react'

import { formatDate } from '@/libs/format'
import { Link } from '@chakra-ui/next-js'

const CardContainer = ({ children, ...rest }: BoxProps) => (
  <Box
    p={6}
    display="flex"
    justifyContent="space-between"
    border="1px"
    borderColor="gray.200"
    rounded="md"
    {...rest}
  >
    {children}
  </Box>
)

export const JobCardDashboard = ({ job }: { job: JobItem }) => {
  const router = useRouter()

  // TODO: Add delete handler

  return (
    <CardContainer alignItems="end">
      <Stack direction="row" alignItems="center" columnGap={4}>
        <Image
          src="/cover.png"
          alt="Job's cover image"
          width={128}
          height={128}
          style={{ borderRadius: '0.25rem' }}
          priority
        />
        <Stack>
          <Text mb={2} fontWeight="700">
            {job.title}
          </Text>
          <Stack direction="row" alignItems="center">
            <Upload size={16} />
            <Text>Dibuat: {formatDate(job.createdAt)}</Text>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Clock size={16} />
            <Text>Aktif hingga: {formatDate(job.expiresAt)}</Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <Button
          onClick={() => router.push(`/dashboard/edit/${job.id}`)}
          leftIcon={<Pencil size={16} />}
          variant="outline"
          colorScheme="gray"
          bg="gray.50"
          rounded="sm"
        >
          Edit
        </Button>
        <Button
          leftIcon={<Trash2 size={16} />}
          variant="outline"
          colorScheme="red"
          bg="red.100"
          rounded="sm"
          border="none"
          _hover={{ bg: 'red.200' }}
        >
          Hapus
        </Button>
      </Stack>
    </CardContainer>
  )
}

export const JobCard = ({ job }: { job: JobItem }) => (
  <Link
    w="full"
    href={`/jobs/${job.id}`}
    _hover={{ textDecoration: 'none', bg: 'gray.50' }}
  >
    <CardContainer w="full">
      <Stack direction="row" alignItems="center" columnGap={4}>
        <Image
          src="/cover.png"
          alt="Job's cover image"
          width={128}
          height={128}
          style={{ borderRadius: '0.25rem' }}
          priority
        />
        <Stack>
          <Text mb={2} fontWeight="700">
            {job.title}
          </Text>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Stack direction="row" alignItems="center">
              <Building2 size={16} />
              <Text>Dicoding Indonesia</Text>
            </Stack>
            <Text>{job.jobType.name}</Text>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={4}>
            <Stack direction="row" alignItems="center">
              <MapPin size={16} />
              <Text>{job.location.name}</Text>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Briefcase size={16} />
              <Text>{job.experience.name}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems="end" justifyContent="end">
        <Text>Dibuat pada {formatDate(job.createdAt)}</Text>
        <Text>Lamar sebelum {formatDate(job.expiresAt)}</Text>
      </Stack>
    </CardContainer>
  </Link>
)
