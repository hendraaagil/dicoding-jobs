import Image from 'next/image'
import { Box, Text, VStack } from '@chakra-ui/react'

export const Footer = () => (
  <VStack
    as="footer"
    mx="auto"
    px={4}
    py={8}
    spacing={6}
    maxW="container.xl"
    align="start"
    color="gray.500"
    borderTop="2px"
    borderColor="gray.200"
  >
    <Image src="/dicoding.png" alt="Dicoding's logo" width={138} height={34} />
    <Box>
      <Text>Dicoding Space</Text>
      <Text maxW="md">
        Jl. Batik Kumeli No.50, Sukaluyu, Kec. Cibeunying Kaler, Kota Bandung
        Jawa Barat 40123
      </Text>
    </Box>
  </VStack>
)
