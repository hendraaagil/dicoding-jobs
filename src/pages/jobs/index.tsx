import { Flex, Heading, Text } from '@chakra-ui/react'
import { Container, Hero } from '@/components/layout'

export default function Page() {
  return (
    <Flex as="main" pt={14} minH="100vh" direction="column">
      <Hero>
        <Heading as="h4" size="md">
          Dicoding Jobs
        </Heading>
        <Text
          fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
          fontWeight="500"
        >
          Temukan lowongan yang cocok untuk kamu
        </Text>
      </Hero>
      <Container>
        <Text>List Jobs</Text>
      </Container>
    </Flex>
  )
}
