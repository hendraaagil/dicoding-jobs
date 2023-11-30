import Image from 'next/image'
import { Box } from '@chakra-ui/react'

export const JobCoverImage = () => (
  <Box>
    <Image
      src="/cover.png"
      alt="Job's cover image"
      width={96}
      height={96}
      style={{ borderRadius: '0.25rem' }}
      priority
    />
  </Box>
)
