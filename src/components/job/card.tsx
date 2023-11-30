import type { NextRouter } from 'next/router'
import type { JobItem } from '@/types/job'

import { Link } from '@chakra-ui/next-js'
import {
  Box,
  BoxProps,
  Button,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from '@chakra-ui/react'
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
import { JobCoverImage } from '@/components/job'
import { Badge } from '@/components/ui'

const CardContainer = ({ children, ...rest }: BoxProps) => (
  <Box
    p={{ base: 2, sm: 4 }}
    w="full"
    display="flex"
    flexDirection={{ base: 'column', md: 'row' }}
    justifyContent="space-between"
    rowGap={{ base: 4, md: 0 }}
    border="1px"
    borderColor="gray.200"
    rounded="md"
    {...rest}
  >
    {children}
  </Box>
)

export const JobCardDashboard = ({
  job,
  router,
  onOpen,
}: {
  job: JobItem
  router: NextRouter
  onOpen: (slug: string) => void
}) => (
  <CardContainer
    alignItems={{ base: 'unset', md: 'end' }}
    data-testid="job-card"
  >
    <Stack direction="row" alignItems="center" columnGap={4}>
      <JobCoverImage />
      <Stack>
        <Text mb={2} fontWeight="700">
          {job.title}
        </Text>
        <Stack direction="row" alignItems="center">
          <Upload size={16} />
          <Text fontSize="sm">Dibuat: {formatDate(job.createdAt)}</Text>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Clock size={16} />
          <Text fontSize="sm">Aktif hingga: {formatDate(job.expiresAt)}</Text>
        </Stack>
      </Stack>
    </Stack>
    <Stack direction={{ base: 'row', md: 'column' }}>
      <Button
        onClick={() => router.push(`/dashboard/edit/${job.slug}`)}
        leftIcon={<Pencil size={16} />}
        variant="outline"
        colorScheme="gray"
        w="full"
        bg="gray.50"
        rounded="sm"
      >
        Edit
      </Button>
      <Button
        onClick={() => onOpen(job.slug)}
        leftIcon={<Trash2 size={16} />}
        variant="outline"
        colorScheme="red"
        w="full"
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

export const CardSkeletonDashboard = () => (
  <CardContainer w="full">
    <Stack direction="row" alignItems="center" columnGap={4}>
      <Skeleton w={24} h={24} />
      <Stack>
        <SkeletonText
          noOfLines={1}
          skeletonHeight={8}
          mb={2}
          w={{ base: 36, md: 72 }}
        />
        <SkeletonText noOfLines={1} skeletonHeight={4} w={36} />
        <SkeletonText noOfLines={1} skeletonHeight={4} w={40} />
      </Stack>
    </Stack>
  </CardContainer>
)

export const JobCard = ({ job }: { job: JobItem }) => (
  <Link
    w="full"
    href={`/jobs/${job.slug}`}
    _hover={{ textDecoration: 'none', bg: 'gray.50' }}
  >
    <CardContainer>
      <Stack direction="row" alignItems="center" columnGap={4}>
        <JobCoverImage />
        <Stack>
          <Text
            mb={{ base: 0, sm: 2 }}
            fontWeight="700"
            data-testid="job-card-title"
          >
            {job.title}
          </Text>
          <Stack direction="row" alignItems="center">
            <Building2 size={16} />
            <Text fontSize="xs">Dicoding Indonesia</Text>
          </Stack>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            alignItems={{ base: 'start', sm: 'center' }}
          >
            <Stack direction="row" alignItems="center">
              <MapPin size={16} />
              <Text fontSize="xs">{job.location.name}</Text>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Briefcase size={16} />
              <Text fontSize="xs">{job.experience.name}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        alignItems={{ base: 'start', md: 'end' }}
        justifyContent="space-between"
      >
        <Badge>{job.jobType.name}</Badge>
        <Stack alignItems={{ base: 'start', md: 'end' }}>
          <Text fontSize="xs">Dibuat pada {formatDate(job.createdAt)}</Text>
          <Text fontSize="xs">Lamar sebelum {formatDate(job.expiresAt)}</Text>
        </Stack>
      </Stack>
    </CardContainer>
  </Link>
)

export const CardSkeleton = () => (
  <CardContainer>
    <Stack direction="row" alignItems="center" columnGap={4}>
      <Skeleton w={24} h={24} />
      <Stack h="full" justifyContent="space-between">
        <SkeletonText
          noOfLines={1}
          skeletonHeight={8}
          mb={2}
          w={{ base: 36, md: 72 }}
        />
        <Stack>
          <SkeletonText noOfLines={1} skeletonHeight={4} w={32} />
          <SkeletonText noOfLines={1} skeletonHeight={4} w={36} />
        </Stack>
      </Stack>
    </Stack>
    <Stack
      alignItems={{ base: 'start', md: 'end' }}
      justifyContent="space-between"
    >
      <SkeletonText noOfLines={1} skeletonHeight={4} w={20} />
      <Stack alignItems={{ base: 'start', md: 'end' }}>
        <SkeletonText noOfLines={1} skeletonHeight={4} w={36} />
        <SkeletonText noOfLines={1} skeletonHeight={4} w={40} />
      </Stack>
    </Stack>
  </CardContainer>
)
