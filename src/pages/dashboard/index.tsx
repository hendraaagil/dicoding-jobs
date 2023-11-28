import { Link } from '@chakra-ui/next-js'
import { Flex, Heading, Stack } from '@chakra-ui/react'
import { Plus } from 'lucide-react'

import { Container } from '@/components/layout'

export default function Page() {
  return (
    <Flex as="main" pt={14} minH="100vh">
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
            display="flex"
            alignItems="center"
            columnGap={2}
            py={2}
            px={4}
            bg="navy"
            color="white"
            _hover={{ textDecoration: 'none' }}
          >
            <Plus size={20} />
            Buat Lowongan
          </Link>
        </Stack>
      </Container>
    </Flex>
  )
}
