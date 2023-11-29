import type { NextRouter } from 'next/router'
import type { JobItem } from '@/types/job'

import Image from 'next/image'
import { Link } from '@chakra-ui/next-js'
import {
  Box,
  BoxProps,
  Button,
  Skeleton,
  SkeletonText,
  Stack,
  Tag,
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

export const JobCardDashboard = ({
  job,
  router,
}: {
  job: JobItem
  router: NextRouter
}) => {
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
          onClick={() => router.push(`/dashboard/edit/${job.slug}`)}
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

export const CardSkeletonDashboard = () => (
  <CardContainer w="full">
    <Stack direction="row" alignItems="center" columnGap={4}>
      <Skeleton w={32} h={32} />
      <Stack>
        <SkeletonText noOfLines={1} skeletonHeight={8} mb={2} w={72} />
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
          <Stack direction="row" alignItems="center">
            <Building2 size={16} />
            <Text>Dicoding Indonesia</Text>
          </Stack>
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
      <Stack alignItems="end" justifyContent="space-between">
        <Tag
          px={4}
          w="fit-content"
          variant="outline"
          colorScheme="blue"
          bg="blue.50"
          borderRadius="full"
        >
          {job.jobType.name}
        </Tag>
        <Stack alignItems="end">
          <Text>Dibuat pada {formatDate(job.createdAt)}</Text>
          <Text>Lamar sebelum {formatDate(job.expiresAt)}</Text>
        </Stack>
      </Stack>
    </CardContainer>
  </Link>
)

export const CardSkeleton = () => (
  <CardContainer w="full">
    <Stack direction="row" alignItems="center" columnGap={4}>
      <Skeleton w={32} h={32} />
      <Stack h="full" justifyContent="space-between">
        <SkeletonText noOfLines={1} skeletonHeight={8} mb={2} w={72} />
        <Stack>
          <SkeletonText noOfLines={1} skeletonHeight={4} w={32} />
          <SkeletonText noOfLines={1} skeletonHeight={4} w={36} />
          <SkeletonText noOfLines={1} skeletonHeight={4} w={40} />
        </Stack>
      </Stack>
    </Stack>
    <Stack alignItems="end" justifyContent="space-between">
      <SkeletonText noOfLines={1} skeletonHeight={4} w={20} />
      <Stack alignItems="end">
        <SkeletonText noOfLines={1} skeletonHeight={4} w={36} />
        <SkeletonText noOfLines={1} skeletonHeight={4} w={40} />
      </Stack>
    </Stack>
  </CardContainer>
)
