import { Container } from '@/components/layout'
import { Link } from '@chakra-ui/next-js'
import { Flex, Heading, Stack } from '@chakra-ui/react'

export default function Page() {
  return (
    <Flex as="main" pt={14} minH="100vh" color="navy">
      <Container>
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
            py={2}
            px={4}
            bg="navy"
            color="white"
            _hover={{ textDecoration: 'none' }}
          >
            Buat Lowongan
          </Link>
        </Stack>
      </Container>
    </Flex>
  )
}
